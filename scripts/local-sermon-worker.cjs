#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, no-undef */

const { execFile } = require('child_process');
const { createReadStream, existsSync, mkdtempSync, readdirSync, rmSync, statSync } = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');

const admin = require('../functions/node_modules/firebase-admin');
const OpenAI = require('../functions/node_modules/openai').default;

const execFileAsync = promisify(execFile);

const projectId = process.env.FIREBASE_PROJECT_ID || 'autonateai-learning-hub';
const openAiTextModel = process.env.OPENAI_TEXT_MODEL || 'gpt-4.1-mini';
const openAiTranscriptionModel = process.env.OPENAI_TRANSCRIPTION_MODEL || 'whisper-1';
const maxTranscriptionBytes = 24 * 1024 * 1024;
const defaultCookiesPath = path.resolve(process.cwd(), '.secrets/youtube-cookies-trimmed.txt');
const audioFormat =
  'bestaudio[format_id=249-drc]/bestaudio[format_id=250-drc]/bestaudio[format_id=140-drc]/bestaudio[format_id=251-drc]/bestaudio[format_id^=249]/bestaudio[format_id^=250]/bestaudio[format_id^=140]/bestaudio[format_id^=251]/bestaudio/worstaudio/best/worst';

function usage() {
  console.error('Usage: npm run process:sermon -- <sermonId> [--cookies .secrets/youtube-cookies-trimmed.txt] [--keep-audio]');
}

function parseArgs(argv) {
  const args = { sermonId: '', cookiesPath: defaultCookiesPath, keepAudio: false };
  const rest = [...argv];
  while (rest.length) {
    const item = rest.shift();
    if (item === '--cookies') args.cookiesPath = path.resolve(process.cwd(), rest.shift() || '');
    else if (item === '--keep-audio') args.keepAudio = true;
    else if (!args.sermonId) args.sermonId = item || '';
    else throw new Error(`Unknown argument: ${item}`);
  }
  if (!args.sermonId) {
    usage();
    process.exit(2);
  }
  return args;
}

function slugify(value) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'concept'
  );
}

function parseJsonObject(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    try {
      return JSON.parse(match[0]);
    } catch {
      return fallback;
    }
  }
}

function findAudioFile(directory) {
  const supported = new Set(['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm']);
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    const stat = statSync(fullPath);
    if (stat.isFile() && supported.has(path.extname(entry).toLowerCase())) {
      return { fullPath, size: stat.size };
    }
  }
  return null;
}

async function downloadAudio({ sourceUrl, videoId, cookiesPath }) {
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), `well-nest-local-${videoId || 'sermon'}-`));
  const outputTemplate = path.join(tmpDir, '%(id)s.%(ext)s');
  const args = [
    sourceUrl,
    '--no-playlist',
    '--format',
    audioFormat,
    '--output',
    outputTemplate,
    '--no-warnings',
    '--no-progress',
    '--force-ipv4',
    '--retries',
    '2',
  ];
  if (cookiesPath && existsSync(cookiesPath)) args.push('--cookies', cookiesPath);

  try {
    await execFileAsync('yt-dlp', args, { timeout: 420000, maxBuffer: 10 * 1024 * 1024 });
    const audio = findAudioFile(tmpDir);
    if (!audio) throw new Error('yt-dlp did not produce a supported audio file.');
    const normalizedPath = path.join(tmpDir, `${videoId || 'sermon'}-transcribe.m4a`);
    await execFileAsync(
      'ffmpeg',
      ['-y', '-i', audio.fullPath, '-vn', '-c:a', 'aac', '-ac', '1', '-ar', '24000', '-b:a', '32k', '-movflags', '+faststart', normalizedPath],
      { timeout: 420000, maxBuffer: 10 * 1024 * 1024 },
    );
    const normalized = { fullPath: normalizedPath, size: statSync(normalizedPath).size };
    if (normalized.size > maxTranscriptionBytes) {
      throw new Error(`Normalized audio is ${(normalized.size / 1024 / 1024).toFixed(1)} MB, over the 24 MB transcription limit.`);
    }
    return { ...normalized, tmpDir };
  } catch (error) {
    rmSync(tmpDir, { recursive: true, force: true });
    throw error;
  }
}

async function transcribeAudio(openai, audioPath, title) {
  const transcription = await openai.audio.transcriptions.create({
    file: createReadStream(audioPath),
    model: openAiTranscriptionModel,
    response_format: 'json',
    prompt: `This is a Christian church sermon titled "${title}". Transcribe names, scripture references, and ministry language accurately.`,
  });
  const text = String(transcription.text || '').trim();
  if (!text) throw new Error('OpenAI transcription returned an empty transcript.');
  return text;
}

async function analyzeSermon(openai, { title, churchName, transcript }) {
  const fallback = {
    summary: `${title} from ${churchName} was transcribed locally and needs manual review.`,
    whyItMatters: 'This sermon is a candidate source for community-specific carousel content for Well Nest.',
    scriptureReferences: [],
    themes: ['Faith community', 'Reflection'],
    audiencePainPoints: ['Spiritual fatigue', 'Need for trusted community'],
    retreatAngles: ['Invite women into rest and reflection'],
    contentConcepts: [
      {
        id: slugify(title),
        title: `Reflection from ${title}`,
        summary: 'Use this sermon as a starting point for a carousel after reviewing the transcript.',
        retreatAngle: 'Frame the retreat as a quiet place to process what the local faith community is discussing.',
      },
    ],
    discussionPrompts: ['What part of this message feels most relevant for women who need rest and renewal?'],
  };

  const prompt = `
You are the Well Nest sermon intelligence assistant.

Context:
- Well Nest is preparing the second women's retreat and needs 20-40 bookings.
- The portal turns public Atlanta-area church sermon themes into respectful Facebook group discussion and carousel content.
- Leadership is an entryway, but the real audience is the congregation, especially women who may need rest, renewal, community, and care.

Analyze this sermon and return strict JSON with this shape:
{
  "summary": "short sermon summary",
  "whyItMatters": "why this sermon can support Well Nest content",
  "scriptureReferences": ["reference"],
  "themes": ["theme"],
  "audiencePainPoints": ["pain point"],
  "retreatAngles": ["angle"],
  "contentConcepts": [{"id":"slug","title":"concept title","summary":"concept summary","retreatAngle":"retreat angle"}],
  "discussionPrompts": ["prompt"]
}

Church: ${churchName}
Sermon title: ${title}
Transcript:
${transcript.slice(0, 18000)}
`;

  const response = await openai.responses.create({
    model: openAiTextModel,
    input: prompt,
    text: { format: { type: 'json_object' } },
  });
  const raw =
    response.output_text ||
    (response.output || [])
      .flatMap((item) => item.content || [])
      .map((item) => item.text || '')
      .join('\n');
  const review = parseJsonObject(raw, fallback);
  return {
    ...fallback,
    ...review,
    contentConcepts: (review.contentConcepts || fallback.contentConcepts).map((concept) => ({
      ...concept,
      id: concept.id || slugify(concept.title || title),
    })),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required in this shell.');

  admin.initializeApp({ projectId });
  const db = admin.firestore();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const sermonRef = db.collection('wellNestSermons').doc(args.sermonId);
  const sermonSnap = await sermonRef.get();
  if (!sermonSnap.exists) throw new Error(`Sermon not found: ${args.sermonId}`);

  const sermon = sermonSnap.data() || {};
  const title = String(sermon.title || 'Untitled sermon');
  const churchName = String(sermon.churchName || 'Unknown church');
  const sourceUrl = String(sermon.sourceUrl || '').trim();
  const videoId = String(sermon.youtubeVideoId || '').trim();
  if (!sourceUrl) throw new Error('Sermon is missing sourceUrl.');

  console.log(`Processing sermon locally: ${title}`);
  await sermonRef.set({ status: 'Downloading', errorMessage: admin.firestore.FieldValue.delete(), updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

  const audio = await downloadAudio({ sourceUrl, videoId, cookiesPath: args.cookiesPath });
  console.log(`Downloaded audio: ${(audio.size / 1024 / 1024).toFixed(1)} MB`);

  try {
    await sermonRef.set({ status: 'Transcribing', transcriptSource: 'Local yt-dlp audio download', updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    const transcript = await transcribeAudio(openai, audio.fullPath, title);
    console.log(`Transcribed ${transcript.length.toLocaleString()} characters`);

    await sermonRef.set({ status: 'Analyzing', transcript, transcriptSource: `Local yt-dlp + ${openAiTranscriptionModel}`, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    const review = await analyzeSermon(openai, { title, churchName, transcript });

    await sermonRef.set(
      {
        status: 'Review Ready',
        transcript,
        transcriptSource: `Local yt-dlp + ${openAiTranscriptionModel}`,
        review,
        themes: review.themes,
        contentAngles: review.retreatAngles,
        errorMessage: admin.firestore.FieldValue.delete(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    console.log(`Review ready: ${args.sermonId}`);
  } finally {
    if (args.keepAudio) console.log(`Kept audio directory: ${audio.tmpDir}`);
    else rmSync(audio.tmpDir, { recursive: true, force: true });
  }
}

main().catch(async (error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});

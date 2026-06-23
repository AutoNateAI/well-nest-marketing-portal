import cors from 'cors';
import { randomUUID } from 'crypto';
import { createReadStream, promises as fs } from 'fs';
import * as admin from 'firebase-admin';
import { defineSecret } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';
import OpenAI from 'openai';
import os from 'os';
import path from 'path';
import YTDlpWrap from 'yt-dlp-wrap';

admin.initializeApp();

const db = admin.firestore();
const corsHandler = cors({ origin: true });
const adminEmail = 'autonate.ai@gmail.com';
const openAiApiKey = defineSecret('OPENAI_API_KEY');
const youtubeCookies = defineSecret('YOUTUBE_COOKIES');
const facebookPageId = defineSecret('FACEBOOK_PAGE_ID');
const facebookPageAccessToken = defineSecret('FACEBOOK_PAGE_ACCESS_TOKEN');
const openAiTextModel = process.env.OPENAI_TEXT_MODEL || 'gpt-4.1-mini';
const openAiImageModel = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';
const openAiTranscriptionModel = process.env.OPENAI_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe';
const maxTranscriptionBytes = 24 * 1024 * 1024;
const ytDlpBinaryPath = path.join(os.tmpdir(), 'well-nest-yt-dlp');
const denoBinaryPath = path.join(process.cwd(), 'node_modules', 'deno-bin', 'bin', process.platform === 'win32' ? 'deno.exe' : 'deno');
let ytDlpBinaryReady: Promise<string> | null = null;

type AuthedRequest = {
  get(name: string): string | undefined;
  body?: Record<string, unknown>;
  path: string;
  method: string;
  user?: admin.auth.DecodedIdToken;
};

type SermonConcept = {
  id: string;
  title: string;
  summary: string;
  retreatAngle: string;
};

type SermonReview = {
  summary: string;
  whyItMatters: string;
  scriptureReferences: string[];
  themes: string[];
  audiencePainPoints: string[];
  retreatAngles: string[];
  contentConcepts: SermonConcept[];
  discussionPrompts: string[];
};

type CarouselSlide = {
  slideNumber: number;
  headline: string;
  body: string;
  imagePrompt: string;
};

type CarouselDraft = {
  title: string;
  caption: string;
  rationale: string;
  slides: CarouselSlide[];
};

type Confidence = 'High' | 'Medium' | 'Low';

type EstimateInput = {
  id: string;
  name: string;
  area: string;
  denomination: string;
  websiteUrl: string;
  youtubeUrl: string;
  livestreamUrl: string;
};

async function requireAdmin(req: AuthedRequest) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  if (!token) throw new Error('Missing bearer token');

  const decoded = await admin.auth().verifyIdToken(token);
  if (decoded.email !== adminEmail) throw new Error('Forbidden');
  req.user = decoded;
  return decoded;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'concept';
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}

function parseRoute(path: string) {
  return path.replace(/^\/+/, '').split('/').filter(Boolean);
}

function extractVideoId(url: string) {
  const patterns = [
    /youtube\.com\/watch\?[^#]*v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return '';
}

function extractVideoIds(pageHtml: string, sourceUrl: string) {
  const ids = new Set<string>();
  const directId = extractVideoId(sourceUrl);
  if (directId) ids.add(directId);

  for (const pattern of [/"videoId":"([a-zA-Z0-9_-]{11})"/g, /watch\?v=([a-zA-Z0-9_-]{11})/g, /\/shorts\/([a-zA-Z0-9_-]{11})/g]) {
    let match = pattern.exec(pageHtml);
    while (match) {
      ids.add(match[1]);
      match = pattern.exec(pageHtml);
    }
  }

  return [...ids];
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countMatches(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  return terms.reduce((total, term) => total + (lower.match(new RegExp(`\\b${term}\\b`, 'g'))?.length || 0), 0);
}

async function fetchText(url: string) {
  if (!url) return { text: '', html: '', ok: false };
  try {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) return { text: '', html: '', ok: false };
    const html = await response.text();
    return { text: stripHtml(html), html, ok: true };
  } catch {
    return { text: '', html: '', ok: false };
  }
}

async function fetchYoutubeVideoCount(url: string) {
  const channelId = url.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/)?.[1];
  if (channelId) {
    try {
      const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
      const xml = response.ok ? await response.text() : '';
      const count = [...xml.matchAll(/<entry>/g)].length;
      if (count) {
        return {
          count,
          source: `YouTube channel RSS feed for channel ${channelId}.`,
        };
      }
    } catch {
      return { count: 0, source: '' };
    }
  }
  return { count: 0, source: '' };
}

function estimateCongregationSize(text: string, videoCount: number) {
  const officialPatterns = [
    /(?:membership|members|attendance|attenders|congregation|worshipers|worshippers|people)[^\d]{0,40}(\d{1,3}(?:,\d{3})+|\d{3,5})/i,
    /(\d{1,3}(?:,\d{3})+|\d{3,5})[^\w]{0,20}(?:members|attenders|worshipers|worshippers|people each week|weekly attendance)/i,
  ];
  for (const pattern of officialPatterns) {
    const match = text.match(pattern);
    const value = match?.[1] ? Number(match[1].replace(/,/g, '')) : 0;
    if (value >= 100 && value <= 50000) {
      return {
        value,
        source: 'Official-looking membership/attendance language found on the church website.',
        confidence: 'Medium' as Confidence,
      };
    }
  }

  const ministryTerms = countMatches(text, ['groups', 'ministries', 'events', 'kids', 'students', 'care', 'serve', 'classes']);
  const serviceTerms = countMatches(text, ['service', 'services', 'campus', 'campuses', 'worship']);
  let value = 400;
  if (videoCount >= 25 || ministryTerms >= 40 || serviceTerms >= 30) value = 2500;
  else if (videoCount >= 12 || ministryTerms >= 20 || serviceTerms >= 15) value = 1200;
  else if (videoCount >= 5 || ministryTerms >= 10 || serviceTerms >= 8) value = 700;

  return {
    value,
    source: `Low-confidence heuristic from public website footprint and ${videoCount} visible YouTube videos; replace when an official attendance/membership source is found.`,
    confidence: 'Low' as Confidence,
  };
}

function scoreWomenSignal(text: string) {
  const strongTerms = ['women', 'women’s', "women's", 'moms', 'motherhood', 'sisters', 'grief', 'counseling', 'care ministry', 'support group', 'retreat'];
  const moderateTerms = ['groups', 'community', 'care', 'prayer', 'classes', 'discipleship', 'healing', 'recovery'];
  const strongCount = countMatches(text, strongTerms);
  const moderateCount = countMatches(text, moderateTerms);
  if (strongCount >= 3) return { signal: 'Strong' as const, score: 20, source: `${strongCount} women/care/retreat-specific terms found on public website pages.` };
  if (strongCount >= 1 || moderateCount >= 8) return { signal: 'Moderate' as const, score: 14, source: `${strongCount} women-specific and ${moderateCount} care/community terms found on public website pages.` };
  if (moderateCount >= 3) return { signal: 'Emerging' as const, score: 8, source: `${moderateCount} broad care/community terms found on public website pages.` };
  return { signal: 'Unknown' as const, score: 0, source: 'No strong women/care/community ministry signal found from the fetched public website text.' };
}

function scoreEventActivity(text: string) {
  const eventCount = countMatches(text, ['event', 'events', 'calendar', 'class', 'classes', 'group', 'groups', 'register', 'registration', 'upcoming']);
  if (eventCount >= 25) return { label: 'High' as const, score: 10, source: `${eventCount} event/calendar/group terms found on public website pages.` };
  if (eventCount >= 10) return { label: 'Medium' as const, score: 6, source: `${eventCount} event/calendar/group terms found on public website pages.` };
  if (eventCount >= 3) return { label: 'Low' as const, score: 3, source: `${eventCount} event/calendar/group terms found on public website pages.` };
  return { label: 'Unknown' as const, score: 0, source: 'No event activity signal found from the fetched public website text.' };
}

function scoreLivestream(videoCount: number, sourceUrl: string) {
  if (videoCount >= 20) return { score: 20, source: `${videoCount} public YouTube video IDs found from ${sourceUrl}.` };
  if (videoCount >= 10) return { score: 16, source: `${videoCount} public YouTube video IDs found from ${sourceUrl}.` };
  if (videoCount >= 5) return { score: 10, source: `${videoCount} public YouTube video IDs found from ${sourceUrl}.` };
  if (videoCount >= 1) return { score: 5, source: `${videoCount} public YouTube video IDs found from ${sourceUrl}.` };
  return { score: 0, source: `No public YouTube video IDs found from ${sourceUrl || 'the stored YouTube URL'}.` };
}

async function fetchMedianIncome(area: string) {
  if (!area) return null;
  const normalizedArea = area.toLowerCase().replace(/[^a-z]/g, '');

  for (const year of ['2023', '2022']) {
    try {
      const placesUrl = `https://api.census.gov/data/${year}/acs/acs5/profile?get=NAME,DP03_0062E&for=place:*&in=state:13`;
      const placesResponse = await fetch(placesUrl);
      if (!placesResponse.ok) continue;
      const rows = (await placesResponse.json()) as string[][];
      const match = rows
        .slice(1)
        .find((row) => row[0]?.toLowerCase().replace(/ city, georgia| town, georgia|, georgia|[^a-z]/g, '') === normalizedArea);
      const value = Number(match?.[1]);
      if (match && Number.isFinite(value) && value > 0) {
        return {
          income: value,
          source: `U.S. Census ACS ${year} 5-year profile DP03_0062E for ${match[0]}.`,
          confidence: 'Medium' as Confidence,
        };
      }
    } catch {
      // Fall back to geocoder route below.
    }
  }

  const neighborhoodAffluence: Record<string, { income: number; source: string }> = {
    buckhead: {
      income: 175000,
      source: 'Configured Buckhead affluent-neighborhood baseline; replace with ZIP/tract-level Census data when added.',
    },
  };
  if (neighborhoodAffluence[normalizedArea]) {
    return {
      income: neighborhoodAffluence[normalizedArea].income,
      source: neighborhoodAffluence[normalizedArea].source,
      confidence: 'Low' as Confidence,
    };
  }

  try {
    const geoUrl = `https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=${encodeURIComponent(`${area}, GA`)}&benchmark=Public_AR_Current&vintage=Current_Current&format=json`;
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) return null;
    const geo = (await geoResponse.json()) as {
      result?: { addressMatches?: Array<{ geographies?: Record<string, Array<Record<string, string>>> }> };
    };
    const geographies = geo.result?.addressMatches?.[0]?.geographies || {};
    const place = geographies['Incorporated Places']?.[0] || geographies['County Subdivisions']?.[0];
    const state = place?.STATE;
    const placeCode = place?.PLACE;
    if (!state || !placeCode) return null;

    for (const year of ['2023', '2022']) {
      const acsUrl = `https://api.census.gov/data/${year}/acs/acs5/profile?get=NAME,DP03_0062E&for=place:${placeCode}&in=state:${state}`;
      const acsResponse = await fetch(acsUrl);
      if (!acsResponse.ok) continue;
      const data = (await acsResponse.json()) as string[][];
      const value = Number(data?.[1]?.[1]);
      if (Number.isFinite(value) && value > 0) {
        return {
          income: value,
          source: `U.S. Census ACS ${year} 5-year profile DP03_0062E for ${data[1][0]}.`,
          confidence: area.toLowerCase() === 'buckhead' ? ('Low' as Confidence) : ('Medium' as Confidence),
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

function scoreAffluence(income: number | undefined, area: string) {
  if (!income) {
    return {
      score: 0,
      source: `No Census place-level median household income could be resolved for ${area}.`,
      confidence: 'Low' as Confidence,
    };
  }
  if (income >= 150000) return { score: 25, source: '', confidence: 'Medium' as Confidence };
  if (income >= 125000) return { score: 22, source: '', confidence: 'Medium' as Confidence };
  if (income >= 100000) return { score: 19, source: '', confidence: 'Medium' as Confidence };
  if (income >= 85000) return { score: 15, source: '', confidence: 'Medium' as Confidence };
  if (income >= 70000) return { score: 10, source: '', confidence: 'Medium' as Confidence };
  return { score: 5, source: '', confidence: 'Medium' as Confidence };
}

function scoreSize(size: number) {
  if (size >= 5000) return 20;
  if (size >= 2500) return 17;
  if (size >= 1200) return 13;
  if (size >= 700) return 9;
  if (size >= 300) return 5;
  return 0;
}

async function buildChurchEstimate(church: EstimateInput) {
  const [website, youtube, youtubeRss, income] = await Promise.all([
    fetchText(church.websiteUrl),
    fetchText(church.youtubeUrl || church.livestreamUrl),
    fetchYoutubeVideoCount(church.youtubeUrl || church.livestreamUrl),
    fetchMedianIncome(church.area),
  ]);
  const videoIds = extractVideoIds(youtube.html, church.youtubeUrl || church.livestreamUrl).slice(0, 50);
  const videoCount = Math.max(videoIds.length, youtubeRss.count);
  const size = estimateCongregationSize(website.text, videoCount);
  const women = scoreWomenSignal(website.text);
  const events = scoreEventActivity(website.text);
  const livestream = scoreLivestream(videoCount, youtubeRss.source || church.youtubeUrl || church.livestreamUrl);
  const affluence = scoreAffluence(income?.income, church.area);
  const affluenceSource = income ? income.source : affluence.source;
  const affluenceConfidence = income ? income.confidence : affluence.confidence;
  const relationshipFit = church.websiteUrl && (church.youtubeUrl || church.livestreamUrl) ? 5 : 0;
  const opportunityScore = Math.min(100, affluence.score + scoreSize(size.value) + livestream.score + women.score + events.score + relationshipFit);
  const confidence: Confidence = size.confidence === 'Medium' && income && website.ok && videoIds.length ? 'Medium' : 'Low';

  return {
    congregationSize: size.value,
    affluenceScore: affluence.score,
    eventActivity: events.label,
    womenMinistrySignal: women.signal,
    opportunityScore,
    estimates: {
      congregationSizeEstimate: size.value,
      congregationSizeSource: size.source,
      congregationSizeConfidence: size.confidence,
      medianHouseholdIncome: income?.income || null,
      affluenceScore: affluence.score,
      affluenceSource,
      affluenceConfidence,
      livestreamActivityScore: livestream.score,
      livestreamSource: livestream.source,
      eventActivityScore: events.score,
      eventActivitySource: events.source,
      womenMinistrySignal: women.signal,
      womenMinistrySource: women.source,
      opportunityScore,
      confidence,
      notes: [
        website.ok ? `Fetched website: ${church.websiteUrl}` : `Could not fetch website: ${church.websiteUrl || 'missing'}`,
        videoCount ? `Found ${videoCount} public YouTube video signals.` : 'No public YouTube video IDs found.',
        'Scores are sourced estimates for prioritization and should be reviewed before outreach.',
      ],
      lastEstimatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

async function fetchVideoTitle(videoId: string) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`);
    if (!response.ok) return `YouTube sermon ${videoId}`;
    const data = (await response.json()) as { title?: string };
    return data.title || `YouTube sermon ${videoId}`;
  } catch {
    return `YouTube sermon ${videoId}`;
  }
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function fetchYoutubeTranscript(videoId: string) {
  const listUrl = `https://video.google.com/timedtext?type=list&v=${videoId}`;
  try {
    const listResponse = await fetch(listUrl);
    const listXml = listResponse.ok ? await listResponse.text() : '';
    const trackMatch = listXml.match(/lang_code="([^"]+)"/);
    const lang = trackMatch?.[1] || 'en';
    const transcriptResponse = await fetch(`https://video.google.com/timedtext?v=${videoId}&lang=${encodeURIComponent(lang)}&fmt=json3`);
    if (transcriptResponse.ok) {
      const json = (await transcriptResponse.json()) as { events?: Array<{ segs?: Array<{ utf8?: string }> }> };
      const transcript = json.events
        ?.flatMap((event) => event.segs || [])
        .map((segment) => segment.utf8 || '')
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (transcript) return { transcript, source: `YouTube captions (${lang})` };
    }

    const xmlResponse = await fetch(`https://video.google.com/timedtext?v=${videoId}&lang=en`);
    const xml = xmlResponse.ok ? await xmlResponse.text() : '';
    const text = [...xml.matchAll(/<text[^>]*>(.*?)<\/text>/g)]
      .map((match) => decodeXml(match[1]))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text) return { transcript: text, source: 'YouTube captions (en)' };
  } catch {
    return { transcript: '', source: '' };
  }
  return { transcript: '', source: '' };
}

async function findDownloadedAudioFile(directory: string) {
  const entries = await fs.readdir(directory);
  const supportedExtensions = new Set(['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm']);
  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const stat = await fs.stat(fullPath);
    if (!stat.isFile()) continue;
    if (!supportedExtensions.has(path.extname(entry).toLowerCase())) continue;
    return { fullPath, size: stat.size };
  }
  return null;
}

async function downloadYoutubeAudio(sourceUrl: string, videoId: string) {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), `well-nest-${videoId || 'sermon'}-`));
  const outputTemplate = path.join(tmpDir, '%(id)s.%(ext)s');
  const cookies = getYoutubeCookies();
  const cookiesPath = path.join(tmpDir, 'youtube-cookies.txt');

  try {
    if (cookies) {
      await fs.writeFile(cookiesPath, cookies, { encoding: 'utf8', mode: 0o600 });
    }

    const ytDlp = await getYtDlp();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 420000);
    const args = [
      sourceUrl,
      '--no-playlist',
      '--format',
      'bestaudio[format_id=249-drc]/bestaudio[format_id=250-drc]/bestaudio[format_id=140-drc]/bestaudio[format_id=251-drc]/bestaudio[format_id^=249]/bestaudio[format_id^=250]/bestaudio[format_id^=140]/bestaudio[format_id^=251]/bestaudio/worstaudio/best/worst',
      '--output',
      outputTemplate,
      '--no-warnings',
      '--no-progress',
      '--force-ipv4',
      '--js-runtimes',
      `deno:${denoBinaryPath}`,
      '--retries',
      '2',
    ];
    if (cookies) args.push('--cookies', cookiesPath);

    try {
      await ytDlp.execPromise(args, {}, controller.signal);
    } finally {
      clearTimeout(timeout);
    }

    const audio = await findDownloadedAudioFile(tmpDir);
    if (!audio) throw new Error('yt-dlp did not produce a supported audio file.');
    if (audio.size > maxTranscriptionBytes) {
      throw new Error(`Downloaded audio is ${(audio.size / 1024 / 1024).toFixed(1)} MB, which is over the 24 MB processing limit.`);
    }

    return {
      filePath: audio.fullPath,
      size: audio.size,
      cleanup: () => fs.rm(tmpDir, { recursive: true, force: true }),
    };
  } catch (error) {
    await fs.rm(tmpDir, { recursive: true, force: true });
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('Sign in to confirm') || message.includes('not a bot')) {
      throw new Error('YouTube blocked the Cloud Run download request. Add a YOUTUBE_COOKIES Firebase secret exported from a signed-in browser, then retry processing this sermon.');
    }
    if (message.includes('Requested format is not available')) {
      throw new Error('YouTube did not expose downloadable audio formats to Cloud Run for this video, even with cookies. This usually means the datacenter request is restricted; process this sermon with a local worker or route downloads through an approved proxy.');
    }
    throw error;
  }
}

async function transcribeYoutubeAudio(sourceUrl: string, videoId: string, title: string) {
  const openai = getOpenAiClient();
  const audio = await downloadYoutubeAudio(sourceUrl, videoId);

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: createReadStream(audio.filePath),
      model: openAiTranscriptionModel,
      response_format: 'json',
      prompt: `This is a Christian church sermon titled "${title}". Transcribe names, scripture references, and ministry language accurately.`,
    });
    const text = 'text' in transcription ? String(transcription.text || '').trim() : '';
    if (!text) throw new Error('OpenAI transcription returned an empty transcript.');

    return {
      transcript: text,
      source: `OpenAI ${openAiTranscriptionModel} from yt-dlp audio (${(audio.size / 1024 / 1024).toFixed(1)} MB)`,
    };
  } finally {
    await audio.cleanup();
  }
}

function fallbackReview(title: string, churchName: string, transcript: string): SermonReview {
  const excerpt = transcript.slice(0, 900);
  return {
    summary: excerpt
      ? `${title} from ${churchName} appears to focus on practical faith formation. The available transcript should be reviewed manually because OpenAI analysis was not available.`
      : `${title} from ${churchName} was imported, but no captions were available for automated transcription.`,
    whyItMatters: 'This sermon is a candidate source for community-specific carousel content once OpenAI analysis or a manual summary is added.',
    scriptureReferences: [],
    themes: ['Faith community', 'Reflection', 'Retreat invitation'],
    audiencePainPoints: ['Spiritual fatigue', 'Need for trusted community', 'Desire for restoration'],
    retreatAngles: ['Invite women into rest and reflection', 'Connect the message to a practical next step'],
    contentConcepts: [
      {
        id: slugify(title),
        title: `Reflection from ${title}`,
        summary: 'Use this imported sermon as a starting point for a carousel after adding more context.',
        retreatAngle: 'Frame the retreat as a quiet place to process what the local faith community is already discussing.',
      },
    ],
    discussionPrompts: ['What part of this message feels most relevant for women who need rest and renewal?'],
  };
}

function getOpenAiApiKey() {
  return process.env.OPENAI_API_KEY || openAiApiKey.value();
}

function getYoutubeCookies() {
  const value = process.env.YOUTUBE_COOKIES || youtubeCookies.value();
  return value && value !== 'not-configured' ? value : '';
}

function getOpenAiClient() {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured on the deployed Firebase Function.');
  return new OpenAI({ apiKey });
}

async function getYtDlp() {
  if (!ytDlpBinaryReady) {
    ytDlpBinaryReady = (async () => {
      try {
        await fs.access(ytDlpBinaryPath);
      } catch {
        await YTDlpWrap.downloadFromGithub(ytDlpBinaryPath);
      }
      await fs.chmod(ytDlpBinaryPath, 0o755);
      return ytDlpBinaryPath;
    })();
  }
  return new YTDlpWrap(await ytDlpBinaryReady);
}

function parseJsonObject<T>(raw: string, fallback: T) {
  try {
    return JSON.parse(raw) as T;
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    try {
      return JSON.parse(match[0]) as T;
    } catch {
      return fallback;
    }
  }
}

async function openAiJson<T>(prompt: string, fallback: T, options: { requireOpenAi?: boolean } = {}) {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) {
    if (options.requireOpenAi) {
      throw new Error('OPENAI_API_KEY is not configured on the deployed Firebase Function.');
    }
    return fallback;
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: openAiTextModel,
      input: prompt,
      text: { format: { type: 'json_object' } },
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI text request failed: ${message}`);
  }

  const data = (await response.json()) as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string; type?: string }> }>;
  };
  const text =
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      .map((item) => item.text || '')
      .join('\n') ||
    '';
  return parseJsonObject<T>(text, fallback);
}

async function analyzeSermonWithOpenAi(title: string, churchName: string, transcript: string) {
  const fallback = fallbackReview(title, churchName, transcript);
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
Transcript or notes:
${transcript.slice(0, 18000)}
`;
  const review = await openAiJson<SermonReview>(prompt, fallback, { requireOpenAi: true });
  return {
    ...fallback,
    ...review,
    contentConcepts: (review.contentConcepts || fallback.contentConcepts).map((concept) => ({
      ...concept,
      id: concept.id || slugify(concept.title),
    })),
  };
}

function fallbackCarousel(title: string, concepts: SermonConcept[], slideCount: number): CarouselDraft {
  const conceptTitle = concepts[0]?.title || title;
  return {
    title: `The Quiet Weight Behind ${conceptTitle}`,
    caption: `Some messages name what many women carry quietly: responsibility, love, fatigue, and the desire to stay faithful while still needing room to breathe. This carousel turns that sermon theme into a reflection on strength, rest, and renewal without implying endorsement from the church. The invitation is simple: notice what the message brings up, name what has been heavy, and make space for care before burnout becomes the normal rhythm.`,
    rationale: 'Built as a scroll-stopping sermon-derived reflection that turns selected concepts into a narrative bridge toward Well Nest rest and renewal.',
    slides: Array.from({ length: slideCount }, (_, index) => ({
      slideNumber: index + 1,
      headline: index === 0 ? `What if strength is costing more than you admit?` : `The hidden part ${index + 1}`,
      body: index === 0 ? 'A faith-rooted reflection on carrying love, responsibility, and the need for renewal.' : 'A concise sermon-derived insight that moves the reader from recognition toward rest.',
      imagePrompt: `Square Instagram carousel slide, black editorial background, bold white condensed uppercase typography reading exactly "${index === 0 ? `What if strength is costing more than you admit?` : `The hidden part ${index + 1}`}", cinematic faith-and-wellness visual, dramatic contrast, premium social media design, no extra words`,
    })),
  };
}

async function draftCarouselWithOpenAi(params: {
  churchName: string;
  sermonTitle: string;
  review: SermonReview;
  concepts: SermonConcept[];
  audienceContext: string;
  toneNotes: string;
  retreatContext: string;
  slideCount: number;
}) {
  const fallback = fallbackCarousel(params.sermonTitle, params.concepts, params.slideCount);
  const prompt = `
Create a ${params.slideCount}-slide Instagram/Facebook carousel draft for Well Nest.

Return strict JSON:
{
  "title": "carousel title",
  "caption": "one polished narrative caption for the Facebook group post",
  "rationale": "why this was built from the sermon and Well Nest context",
  "slides": [{"slideNumber":1,"headline":"short headline","body":"short body copy","imagePrompt":"gpt-image-2 prompt for this slide"}]
}

Creative direction:
- Make this a scroll-stopper, not a soft devotional flyer.
- The first slide needs a strong thesis/hook that creates curiosity and emotional tension.
- Think: bold editorial carousel, high contrast, black or deep cinematic backgrounds, large white type, clean hierarchy, one dramatic visual metaphor per slide.
- Package real sermon concepts into a compelling narrative arc: hook -> recognition -> tension -> reframing -> invitation -> reflective next step.
- Use dramatic information, but it must come from the sermon review and selected concepts. Do not invent claims, numbers, endorsements, or church approval.
- Speak to women who are carrying family, faith, work, invisible labor, grief, expectations, or burnout.
- Avoid churchy filler, vague wellness language, and generic "take time for yourself" phrasing.
- The post can be bold, but it must remain respectful, faith-rooted, emotionally intelligent, and not manipulative.

Slide rules:
- Slide 1 headline: 6-11 words, punchy enough to stop a scroll.
- Each slide body: 1-2 short sentences max.
- Headlines should read like a narrative, not labels.
- Final slide should invite reflection or conversation, not hard-sell the retreat.
- Respect the church sermon source. Do not imply endorsement by the church.
- Speak to women in the congregation, not church leadership.

Image prompt rules:
- Each imagePrompt must ask for a finished square social carousel slide, not a background photo.
- Include the exact slide headline as large readable overlay text.
- Use high-contrast editorial layout: black/deep background, bold white typography, cinematic subject, premium Instagram carousel design.
- Keep text sparse and legible. Do not include tiny paragraphs inside images.
- Do not include logos, watermarks, UI screenshots, misspelled extra words, fake app interfaces, or random numbers.
- Images should feel like the examples: dramatic, graphic, premium, and curiosity-driven, but adapted to faith, motherhood, rest, renewal, and community.

Caption rules:
- Write one narrative caption, 120-180 words.
- No bullet list.
- Sound like a thoughtful group post from Well Nest, not an ad.
- Mention the sermon only as inspiration/source context; do not imply the church endorses Well Nest.
- End with one open-ended discussion question.

Church: ${params.churchName}
Sermon: ${params.sermonTitle}
Selected concepts: ${JSON.stringify(params.concepts)}
Sermon review: ${JSON.stringify(params.review)}
Audience context: ${params.audienceContext}
Tone notes: ${params.toneNotes}
Retreat context: ${params.retreatContext}
`;
  return openAiJson<CarouselDraft>(prompt, fallback);
}

async function generateImage(prompt: string, carouselId: string, slideNumber: number) {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) throw new Error('OPENAI_API_KEY is required for gpt-image-2 carousel images.');

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: openAiImageModel,
      prompt,
      size: '1024x1024',
      n: 1,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI image request failed: ${message}`);
  }

  const data = (await response.json()) as { data?: Array<{ b64_json?: string; url?: string }> };
  const image = data.data?.[0];
  if (image?.url) return image.url;
  if (!image?.b64_json) throw new Error('OpenAI image response did not include an image.');

  const buffer = Buffer.from(image.b64_json, 'base64');
  const bucket = admin.storage().bucket();
  const file = bucket.file(`well-nest/carousels/${carouselId}/slide-${slideNumber}.png`);
  const token = randomUUID();
  await file.save(buffer, {
    contentType: 'image/png',
    metadata: {
      metadata: {
        carouselId,
        slideNumber: String(slideNumber),
        model: openAiImageModel,
        firebaseStorageDownloadTokens: token,
      },
    },
  });
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${token}`;
}

async function createSermonJob(body: Record<string, unknown>, user: admin.auth.DecodedIdToken) {
  const sourceUrl = String(body.sourceUrl || '').trim();
  const churchId = String(body.churchId || '').trim();
  const churchName = String(body.churchName || '').trim();
  const title = String(body.title || 'Untitled sermon').trim();

  if (!sourceUrl || !churchId || !churchName) {
    return { status: 400, data: { error: 'churchId, churchName, and sourceUrl are required.' } };
  }

  const ref = await db.collection('wellNestSermons').add({
    churchId,
    churchName,
    title,
    sourceUrl,
    youtubeVideoId: extractVideoId(sourceUrl),
    status: 'Queued',
    themes: [],
    contentAngles: [],
    createdBy: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { status: 201, data: { id: ref.id, status: 'Queued' } };
}

async function loadCollection(name: string) {
  const snapshot = await db.collection(name).orderBy('updatedAt', 'desc').limit(100).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function loadWorkspace() {
  const [churches, sermons, contentIdeas, bookings, carouselSets] = await Promise.all([
    loadCollection('wellNestChurches'),
    loadCollection('wellNestSermons'),
    loadCollection('wellNestContentIdeas'),
    loadCollection('wellNestBookings'),
    loadCollection('wellNestCarouselSets'),
  ]);

  return {
    status: 200,
    data: {
      churches,
      sermons,
      contentIdeas,
      bookings,
      carouselSets,
      loadErrors: [],
    },
  };
}

async function createChurch(body: Record<string, unknown>, user: admin.auth.DecodedIdToken) {
  const name = String(body.name || '').trim();
  const area = String(body.area || '').trim();

  if (!name || !area) {
    return { status: 400, data: { error: 'Church name and area are required.' } };
  }

  const ref = await db.collection('wellNestChurches').add({
    name,
    area,
    neighborhood: String(body.neighborhood || '').trim(),
    denomination: String(body.denomination || '').trim(),
    congregationSize: Number(body.congregationSize) || 0,
    affluenceScore: Number(body.affluenceScore) || 0,
    websiteUrl: String(body.websiteUrl || '').trim(),
    youtubeUrl: String(body.youtubeUrl || '').trim(),
    livestreamUrl: String(body.livestreamUrl || body.youtubeUrl || '').trim(),
    audienceNotes: String(body.audienceNotes || '').trim(),
    relationshipNotes: String(body.relationshipNotes || '').trim(),
    eventActivity: String(body.eventActivity || 'Unknown'),
    womenMinistrySignal: String(body.womenMinistrySignal || 'Unknown'),
    opportunityScore: Number(body.opportunityScore) || 0,
    nextTouchpoint: String(body.nextTouchpoint || 'Import YouTube livestreams and review sermon themes').trim(),
    status: String(body.status || 'Researching'),
    createdBy: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { status: 201, data: { id: ref.id } };
}

async function importYoutubeSermons(churchId: string, body: Record<string, unknown>, user: admin.auth.DecodedIdToken) {
  const youtubeUrl = String(body.youtubeUrl || '').trim();
  const fromDate = String(body.fromDate || '').trim();
  const toDate = String(body.toDate || '').trim();
  const maxVideos = Math.max(1, Math.min(50, Number(body.maxVideos) || 10));

  if (!churchId || !youtubeUrl) {
    return { status: 400, data: { error: 'churchId and youtubeUrl are required.' } };
  }

  const churchDoc = await db.collection('wellNestChurches').doc(churchId).get();
  if (!churchDoc.exists) return { status: 404, data: { error: 'Church not found.' } };
  const church = churchDoc.data() || {};
  const churchName = String(church.name || 'Unknown church');

  const pageResponse = await fetch(youtubeUrl);
  if (!pageResponse.ok) return { status: 400, data: { error: 'Could not fetch the public YouTube page.' } };

  const html = await pageResponse.text();
  const videoIds = extractVideoIds(html, youtubeUrl).slice(0, maxVideos);
  if (!videoIds.length) return { status: 200, data: { imported: 0, skipped: 0, sermons: [] } };

  let imported = 0;
  let skipped = 0;
  const sermons = [];

  for (const videoId of videoIds) {
    const duplicate = await db.collection('wellNestSermons').where('youtubeVideoId', '==', videoId).limit(1).get();
    if (!duplicate.empty) {
      skipped += 1;
      continue;
    }

    const title = await fetchVideoTitle(videoId);
    const ref = await db.collection('wellNestSermons').add({
      churchId,
      churchName,
      title,
      sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
      youtubeVideoId: videoId,
      importRange: { fromDate, toDate },
      status: 'Discovered',
      themes: [],
      contentAngles: [],
      createdBy: user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    imported += 1;
    sermons.push({ id: ref.id, churchId, churchName, title, sourceUrl: `https://www.youtube.com/watch?v=${videoId}`, youtubeVideoId: videoId, status: 'Discovered' });
  }

  return { status: 201, data: { imported, skipped, sermons } };
}

async function processSermon(sermonId: string) {
  const ref = db.collection('wellNestSermons').doc(sermonId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return { status: 404, data: { error: 'Sermon not found.' } };

  const sermon = snapshot.data() || {};
  await ref.set({ status: 'Transcribing', updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

  try {
    const title = String(sermon.title || 'Untitled sermon');
    const churchName = String(sermon.churchName || 'Unknown church');
    const sourceUrl = String(sermon.sourceUrl || '').trim();
    const videoId = String(sermon.youtubeVideoId || extractVideoId(sourceUrl));
    let transcriptResult = videoId ? await fetchYoutubeTranscript(videoId) : { transcript: '', source: '' };

    if (!transcriptResult.transcript && sourceUrl) {
      await ref.set(
        {
          status: 'Downloading',
          transcriptSource: 'No public captions found; downloading audio with yt-dlp',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      transcriptResult = await transcribeYoutubeAudio(sourceUrl, videoId, title);
    }

    await ref.set({ status: 'Analyzing', transcriptSource: transcriptResult.source, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

    const transcript = transcriptResult.transcript;
    if (!transcript) {
      const message = 'No public YouTube captions were found, and audio transcription did not produce a transcript.';
      await ref.set(
        {
          status: 'Failed',
          transcript: '',
          transcriptSource: 'No public captions found',
          review: admin.firestore.FieldValue.delete(),
          themes: [],
          contentAngles: [],
          errorMessage: message,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      return { status: 422, data: { error: message } };
    }
    const review = await analyzeSermonWithOpenAi(title, churchName, transcript);

    await ref.set(
      {
        status: 'Review Ready',
        transcript,
        transcriptSource: transcriptResult.source || 'No public captions found',
        review,
        themes: review.themes,
        contentAngles: review.retreatAngles,
        errorMessage: admin.firestore.FieldValue.delete(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    return { status: 200, data: { id: sermonId, status: 'Review Ready' } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sermon processing failed.';
    await ref.set({ status: 'Failed', errorMessage: message, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    return { status: 500, data: { error: message } };
  }
}

async function createCarouselSet(body: Record<string, unknown>, user: admin.auth.DecodedIdToken) {
  const churchId = String(body.churchId || '').trim();
  const sermonId = String(body.sermonId || '').trim();
  const conceptIds = asStringArray(body.conceptIds);
  const audienceContext = String(body.audienceContext || '').trim();
  const toneNotes = String(body.toneNotes || '').trim();
  const retreatContext = String(body.retreatContext || '').trim();
  const slideCount = Math.max(6, Math.min(9, Number(body.slideCount) || 8));

  if (!churchId || !sermonId || !conceptIds.length) {
    return { status: 400, data: { error: 'churchId, sermonId, and at least one conceptId are required.' } };
  }

  const [churchDoc, sermonDoc] = await Promise.all([
    db.collection('wellNestChurches').doc(churchId).get(),
    db.collection('wellNestSermons').doc(sermonId).get(),
  ]);
  if (!churchDoc.exists) return { status: 404, data: { error: 'Church not found.' } };
  if (!sermonDoc.exists) return { status: 404, data: { error: 'Sermon not found.' } };

  const church = churchDoc.data() || {};
  const sermon = sermonDoc.data() || {};
  const review = sermon.review as SermonReview | undefined;
  if (!review?.contentConcepts?.length) {
    return { status: 400, data: { error: 'Process the sermon before generating a carousel.' } };
  }

  const selectedConcepts = review.contentConcepts.filter((concept) => conceptIds.includes(concept.id));
  if (!selectedConcepts.length) return { status: 400, data: { error: 'Selected concepts were not found on the sermon.' } };

  const draft = await draftCarouselWithOpenAi({
    churchName: String(church.name || sermon.churchName || 'Unknown church'),
    sermonTitle: String(sermon.title || 'Untitled sermon'),
    review,
    concepts: selectedConcepts,
    audienceContext,
    toneNotes,
    retreatContext,
    slideCount,
  });

  const ref = db.collection('wellNestCarouselSets').doc();
  const slidesWithImages = await Promise.all(
    draft.slides.slice(0, slideCount).map(async (slide) => {
      const imageUrl = await generateImage(slide.imagePrompt, ref.id, slide.slideNumber);
      return { ...slide, imageUrl };
    }),
  );

  await ref.set({
    churchId,
    churchName: String(church.name || sermon.churchName || 'Unknown church'),
    sermonId,
    sermonTitle: String(sermon.title || 'Untitled sermon'),
    title: draft.title,
    caption: draft.caption,
    status: 'Needs Review',
    audienceContext,
    toneNotes,
    retreatContext,
    rationale: draft.rationale,
    selectedConcepts,
    slides: slidesWithImages,
    createdBy: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { status: 201, data: { id: ref.id, status: 'Needs Review' } };
}

function getFacebookPageId() {
  return facebookPageId.value() || process.env.FACEBOOK_PAGE_ID || '';
}

function getFacebookPageAccessToken() {
  return facebookPageAccessToken.value() || process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '';
}

async function callFacebookGraph(pathname: string, params: Record<string, string>) {
  const response = await fetch(`https://graph.facebook.com/v25.0/${pathname.replace(/^\/+/, '')}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const data = (await response.json().catch(() => ({}))) as { id?: string; post_id?: string; error?: { message?: string; code?: number; type?: string } };
  if (!response.ok || data.error) {
    const detail = data.error?.message || JSON.stringify(data);
    throw new Error(`Facebook Graph API failed: ${detail}`);
  }
  return data;
}

async function publishCarouselToFacebookPage(carouselId: string) {
  const pageId = getFacebookPageId();
  const accessToken = getFacebookPageAccessToken();
  if (!pageId || !accessToken) return { status: 500, data: { error: 'FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN secrets are required.' } };

  const ref = db.collection('wellNestCarouselSets').doc(carouselId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return { status: 404, data: { error: 'Carousel set not found.' } };

  const carousel = snapshot.data() || {};
  const slides = Array.isArray(carousel.slides) ? carousel.slides : [];
  const imageUrls = slides.map((slide) => String((slide as { imageUrl?: string }).imageUrl || '')).filter(Boolean);
  if (!imageUrls.length) return { status: 400, data: { error: 'Carousel has no generated slide images to publish.' } };

  const fallbackCaption = [
    String(carousel.title || 'Well Nest carousel'),
    '',
    String(carousel.rationale || ''),
    '',
    ...slides.map((slide, index) => {
      const item = slide as { headline?: string; body?: string; slideNumber?: number };
      return `${item.slideNumber || index + 1}. ${item.headline || ''}${item.body ? ` — ${item.body}` : ''}`.trim();
    }),
  ].join('\n');
  const caption = String(carousel.caption || fallbackCaption).trim();

  const uploadedPhotos = await Promise.all(
    imageUrls.map(async (url) => {
      const data = await callFacebookGraph(`${pageId}/photos`, {
        access_token: accessToken,
        url,
        published: 'false',
      });
      if (!data.id) throw new Error('Facebook photo upload did not return a media id.');
      return data.id;
    }),
  );

  const feedParams: Record<string, string> = {
    access_token: accessToken,
    message: caption,
  };
  uploadedPhotos.forEach((photoId, index) => {
    feedParams[`attached_media[${index}]`] = JSON.stringify({ media_fbid: photoId });
  });

  const post = await callFacebookGraph(`${pageId}/feed`, feedParams);
  const postId = post.id || post.post_id || '';
  const postUrl = postId ? `https://www.facebook.com/${postId.replace('_', '/posts/')}` : '';

  await ref.set(
    {
      status: 'Exported',
      facebookPageId: pageId,
      facebookPostId: postId,
      facebookPostUrl: postUrl,
      facebookPublishedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return { status: 200, data: { id: carouselId, status: 'Exported', facebookPostId: postId, facebookPostUrl: postUrl } };
}

async function enrichChurchEstimates(churchId: string) {
  const ref = db.collection('wellNestChurches').doc(churchId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return { status: 404, data: { error: 'Church not found.' } };

  const data = snapshot.data() || {};
  const estimate = await buildChurchEstimate({
    id: snapshot.id,
    name: String(data.name || ''),
    area: String(data.area || ''),
    denomination: String(data.denomination || ''),
    websiteUrl: String(data.websiteUrl || ''),
    youtubeUrl: String(data.youtubeUrl || ''),
    livestreamUrl: String(data.livestreamUrl || ''),
  });
  await ref.set(estimate, { merge: true });

  return {
    status: 200,
    data: {
      id: churchId,
      opportunityScore: estimate.opportunityScore,
      confidence: estimate.estimates.confidence,
    },
  };
}

async function enrichAllChurchEstimates() {
  const snapshot = await db.collection('wellNestChurches').orderBy('updatedAt', 'desc').limit(50).get();
  const results = [];

  for (const doc of snapshot.docs) {
    const data = doc.data() || {};
    const estimate = await buildChurchEstimate({
      id: doc.id,
      name: String(data.name || ''),
      area: String(data.area || ''),
      denomination: String(data.denomination || ''),
      websiteUrl: String(data.websiteUrl || ''),
      youtubeUrl: String(data.youtubeUrl || ''),
      livestreamUrl: String(data.livestreamUrl || ''),
    });
    await doc.ref.set(estimate, { merge: true });
    results.push({
      id: doc.id,
      opportunityScore: estimate.opportunityScore,
      confidence: estimate.estimates.confidence,
    });
  }

  return { status: 200, data: { updated: results.length, churches: results } };
}

async function createSocialPost(body: Record<string, unknown>, user: admin.auth.DecodedIdToken) {
  const contentIdeaId = String(body.contentIdeaId || '').trim();
  const caption = String(body.caption || '').trim();
  const scheduledFor = String(body.scheduledFor || '').trim();

  if (!contentIdeaId || !caption) {
    return { status: 400, data: { error: 'contentIdeaId and caption are required.' } };
  }

  const ref = await db.collection('wellNestSocialPosts').add({
    contentIdeaId,
    caption,
    scheduledFor,
    status: scheduledFor ? 'Scheduled' : 'Draft',
    createdBy: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { status: 201, data: { id: ref.id, status: scheduledFor ? 'Scheduled' : 'Draft' } };
}

export const wellNestApi = onRequest({ region: 'us-central1', timeoutSeconds: 540, memory: '1GiB', secrets: [openAiApiKey, youtubeCookies, facebookPageId, facebookPageAccessToken] }, (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const user = await requireAdmin(req as AuthedRequest);
      const route = parseRoute(req.path);
      let result: { status: number; data: unknown } | null = null;

      if (req.method === 'GET' && route.length === 1 && route[0] === 'workspace') {
        result = await loadWorkspace();
      } else if (req.method === 'POST' && route.length === 1 && route[0] === 'churches') {
        result = await createChurch(req.body || {}, user);
      } else if (req.method === 'POST' && route.length === 1 && route[0] === 'sermon-jobs') {
        result = await createSermonJob(req.body || {}, user);
      } else if (req.method === 'POST' && route.length === 2 && route[0] === 'churches' && route[1] === 'enrich-estimates') {
        result = await enrichAllChurchEstimates();
      } else if (req.method === 'POST' && route.length === 3 && route[0] === 'churches' && route[2] === 'youtube-import') {
        result = await importYoutubeSermons(route[1], req.body || {}, user);
      } else if (req.method === 'POST' && route.length === 3 && route[0] === 'churches' && route[2] === 'enrich-estimates') {
        result = await enrichChurchEstimates(route[1]);
      } else if (req.method === 'POST' && route.length === 3 && route[0] === 'sermons' && route[2] === 'process') {
        result = await processSermon(route[1]);
      } else if (req.method === 'POST' && route.length === 1 && route[0] === 'carousel-sets') {
        result = await createCarouselSet(req.body || {}, user);
      } else if (req.method === 'POST' && route.length === 3 && route[0] === 'carousel-sets' && route[2] === 'publish-facebook-page') {
        result = await publishCarouselToFacebookPage(route[1]);
      } else if (req.method === 'POST' && route.length === 1 && route[0] === 'social-posts') {
        result = await createSocialPost(req.body || {}, user);
      }

      if (!result) {
        res.status(404).json({ error: 'Route not found.' });
        return;
      }

      res.status(result.status).json(result.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed.';
      res.status(message === 'Forbidden' ? 403 : 401).json({ error: message });
    }
  });
});

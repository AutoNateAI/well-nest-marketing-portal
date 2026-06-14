import cors from 'cors';
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';

admin.initializeApp();

const db = admin.firestore();
const corsHandler = cors({ origin: true });
const adminEmail = 'autonate.ai@gmail.com';

type AuthedRequest = {
  get(name: string): string | undefined;
  body?: Record<string, unknown>;
  path: string;
  method: string;
  user?: admin.auth.DecodedIdToken;
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
    status: 'Queued',
    themes: [],
    contentAngles: [],
    createdBy: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { status: 201, data: { id: ref.id, status: 'Queued' } };
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

export const wellNestApi = onRequest({ region: 'us-central1' }, (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const user = await requireAdmin(req as AuthedRequest);
      const path = req.path.replace(/^\/+/, '');

      if (req.method === 'POST' && path === 'sermon-jobs') {
        const result = await createSermonJob(req.body || {}, user);
        res.status(result.status).json(result.data);
        return;
      }

      if (req.method === 'POST' && path === 'social-posts') {
        const result = await createSocialPost(req.body || {}, user);
        res.status(result.status).json(result.data);
        return;
      }

      res.status(404).json({ error: 'Route not found.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed.';
      res.status(message === 'Forbidden' ? 403 : 401).json({ error: message });
    }
  });
});

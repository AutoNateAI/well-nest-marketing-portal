'use client';

import { Timestamp } from 'firebase/firestore';
import { authenticatedFetch } from '@/lib/apiClient';

export type Church = {
  id: string;
  name: string;
  area: string;
  neighborhood?: string;
  denomination: string;
  congregationSize: number;
  affluenceScore: number;
  websiteUrl: string;
  youtubeUrl: string;
  livestreamUrl: string;
  audienceNotes: string;
  relationshipNotes: string;
  eventActivity: 'High' | 'Medium' | 'Low' | 'Unknown';
  womenMinistrySignal: 'Strong' | 'Moderate' | 'Emerging' | 'Unknown';
  opportunityScore: number;
  nextTouchpoint: string;
  status: 'Researching' | 'Warm Intro' | 'Content Ready' | 'Follow Up';
  estimates?: ChurchEstimates;
};

export type ChurchEstimates = {
  congregationSizeEstimate: number;
  congregationSizeSource: string;
  congregationSizeConfidence: 'High' | 'Medium' | 'Low';
  medianHouseholdIncome?: number;
  affluenceScore: number;
  affluenceSource: string;
  affluenceConfidence: 'High' | 'Medium' | 'Low';
  livestreamActivityScore: number;
  livestreamSource: string;
  eventActivityScore: number;
  eventActivitySource: string;
  womenMinistrySignal: Church['womenMinistrySignal'];
  womenMinistrySource: string;
  opportunityScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  notes: string[];
  lastEstimatedAt?: Timestamp;
};

export type SermonConcept = {
  id: string;
  title: string;
  summary: string;
  retreatAngle: string;
  selected?: boolean;
};

export type SermonReview = {
  summary: string;
  whyItMatters: string;
  scriptureReferences: string[];
  themes: string[];
  audiencePainPoints: string[];
  retreatAngles: string[];
  contentConcepts: SermonConcept[];
  discussionPrompts: string[];
};

export type Sermon = {
  id: string;
  churchId: string;
  churchName: string;
  title: string;
  sourceUrl: string;
  youtubeVideoId?: string;
  publishedAt?: string;
  importRange?: {
    fromDate?: string;
    toDate?: string;
  };
  status: 'Discovered' | 'Queued' | 'Downloading' | 'Transcribing' | 'Analyzing' | 'Review Ready' | 'Failed';
  themes: string[];
  contentAngles: string[];
  review?: SermonReview;
  transcript?: string;
  transcriptSource?: string;
  errorMessage?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type ContentIdea = {
  id: string;
  churchName: string;
  title: string;
  format: 'Carousel' | 'Discussion Post' | 'Retreat Explainer';
  status: 'Draft' | 'Review' | 'Approved' | 'Scheduled';
  slides: number;
  theme: string;
  scheduledFor: string;
};

export type CarouselSlide = {
  slideNumber: number;
  headline: string;
  body: string;
  imagePrompt: string;
  assetId?: string;
  imageUrl?: string;
};

export type CarouselSet = {
  id: string;
  churchId: string;
  churchName: string;
  sermonId: string;
  sermonTitle: string;
  title: string;
  caption?: string;
  status: 'Draft' | 'Needs Review' | 'Approved' | 'Exported';
  audienceContext: string;
  toneNotes: string;
  retreatContext: string;
  rationale: string;
  selectedConcepts: SermonConcept[];
  slides: CarouselSlide[];
  facebookPageId?: string;
  facebookPostId?: string;
  facebookPostUrl?: string;
  facebookPublishedAt?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type Booking = {
  id: string;
  name: string;
  source: string;
  stage: 'Group Member' | 'Conversation' | 'Booking Page' | 'Deposit' | 'Booked';
  value: number;
};

export type YoutubeImportRequest = {
  churchId: string;
  youtubeUrl: string;
  fromDate: string;
  toDate: string;
  maxVideos: number;
};

export type CarouselRequest = {
  churchId: string;
  sermonId: string;
  conceptIds: string[];
  audienceContext: string;
  toneNotes: string;
  retreatContext: string;
  slideCount: number;
};

export type EnrichEstimatesResult = {
  updated: number;
  churches?: Array<{ id: string; opportunityScore: number; confidence: ChurchEstimates['confidence'] }>;
  id?: string;
  opportunityScore?: number;
  confidence?: ChurchEstimates['confidence'];
};

export async function loadWellNestWorkspace() {
  const response = await authenticatedFetch('/workspace');
  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Workspace load failed.' }));
    return {
      churches: [] as Church[],
      sermons: [] as Sermon[],
      contentIdeas: [] as ContentIdea[],
      bookings: [] as Booking[],
      carouselSets: [] as CarouselSet[],
      loadErrors: [body.error || 'Workspace load failed.'],
    };
  }
  return response.json() as Promise<{
    churches: Church[];
    sermons: Sermon[];
    contentIdeas: ContentIdea[];
    bookings: Booking[];
    carouselSets: CarouselSet[];
    loadErrors: string[];
  }>;
}

export async function addChurch(church: Omit<Church, 'id'>) {
  const response = await authenticatedFetch('/churches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(church),
  });
  if (!response.ok) throw new Error((await response.json()).error || 'Church create failed.');
  return response.json() as Promise<{ id: string }>;
}

export async function importYoutubeSermons(request: YoutubeImportRequest) {
  const response = await authenticatedFetch(`/churches/${request.churchId}/youtube-import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error((await response.json()).error || 'YouTube import failed.');
  return response.json() as Promise<{ imported: number; skipped: number; sermons: Sermon[] }>;
}

export async function enrichChurchEstimates(churchId: string) {
  const response = await authenticatedFetch(`/churches/${churchId}/enrich-estimates`, { method: 'POST' });
  if (!response.ok) throw new Error((await response.json()).error || 'Estimate enrichment failed.');
  return response.json() as Promise<EnrichEstimatesResult>;
}

export async function enrichAllChurchEstimates() {
  const response = await authenticatedFetch('/churches/enrich-estimates', { method: 'POST' });
  if (!response.ok) throw new Error((await response.json()).error || 'Estimate enrichment failed.');
  return response.json() as Promise<EnrichEstimatesResult>;
}

export async function processSermon(sermonId: string) {
  const response = await authenticatedFetch(`/sermons/${sermonId}/process`, { method: 'POST' });
  if (!response.ok) throw new Error((await response.json()).error || 'Sermon processing failed.');
  return response.json() as Promise<{ id: string; status: Sermon['status'] }>;
}

export async function createCarouselSet(request: CarouselRequest) {
  const response = await authenticatedFetch('/carousel-sets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error((await response.json()).error || 'Carousel generation failed.');
  return response.json() as Promise<{ id: string; status: CarouselSet['status'] }>;
}

export async function publishCarouselToFacebookPage(carouselId: string) {
  const response = await authenticatedFetch(`/carousel-sets/${carouselId}/publish-facebook-page`, { method: 'POST' });
  if (!response.ok) throw new Error((await response.json()).error || 'Facebook Page publish failed.');
  return response.json() as Promise<{ id: string; status: CarouselSet['status']; facebookPostId?: string; facebookPostUrl?: string }>;
}

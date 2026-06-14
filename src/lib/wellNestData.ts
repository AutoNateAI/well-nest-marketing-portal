'use client';

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Church = {
  id: string;
  name: string;
  area: string;
  denomination: string;
  congregationSize: number;
  affluenceScore: number;
  livestreamUrl: string;
  eventActivity: 'High' | 'Medium' | 'Low';
  womenMinistrySignal: 'Strong' | 'Moderate' | 'Emerging';
  opportunityScore: number;
  nextTouchpoint: string;
  status: 'Researching' | 'Warm Intro' | 'Content Ready' | 'Follow Up';
};

export type Sermon = {
  id: string;
  churchId: string;
  churchName: string;
  title: string;
  sourceUrl: string;
  status: 'Queued' | 'Transcribed' | 'Summarized' | 'Ideas Ready';
  themes: string[];
  contentAngles: string[];
  createdAt?: Timestamp;
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

export type Booking = {
  id: string;
  name: string;
  source: string;
  stage: 'Group Member' | 'Conversation' | 'Booking Page' | 'Deposit' | 'Booked';
  value: number;
};

const collections = {
  churches: 'wellNestChurches',
  sermons: 'wellNestSermons',
  contentIdeas: 'wellNestContentIdeas',
  bookings: 'wellNestBookings',
};

export const sampleChurches: Church[] = [
  {
    id: 'north-point-alpharetta',
    name: 'North Point Community Church',
    area: 'Alpharetta',
    denomination: 'Non-denominational',
    congregationSize: 9200,
    affluenceScore: 93,
    livestreamUrl: 'https://northpoint.org/messages',
    eventActivity: 'High',
    womenMinistrySignal: 'Strong',
    opportunityScore: 96,
    nextTouchpoint: 'Review Sunday livestream themes',
    status: 'Researching',
  },
  {
    id: 'johns-creek-baptist',
    name: 'Johns Creek Baptist Church',
    area: 'Johns Creek',
    denomination: 'Baptist',
    congregationSize: 1800,
    affluenceScore: 91,
    livestreamUrl: 'https://jcbc.org/watch',
    eventActivity: 'Medium',
    womenMinistrySignal: 'Moderate',
    opportunityScore: 87,
    nextTouchpoint: 'Map women ministry event calendar',
    status: 'Warm Intro',
  },
  {
    id: 'roswell-united-methodist',
    name: 'Roswell United Methodist',
    area: 'Roswell',
    denomination: 'Methodist',
    congregationSize: 4200,
    affluenceScore: 88,
    livestreamUrl: 'https://www.rumc.com/media',
    eventActivity: 'High',
    womenMinistrySignal: 'Strong',
    opportunityScore: 90,
    nextTouchpoint: 'Draft renewal carousel concept',
    status: 'Content Ready',
  },
  {
    id: 'peachtree-city-christian',
    name: 'Peachtree City Christian Church',
    area: 'Peachtree City',
    denomination: 'Christian',
    congregationSize: 1300,
    affluenceScore: 86,
    livestreamUrl: 'https://ptc3.com/messages',
    eventActivity: 'Medium',
    womenMinistrySignal: 'Emerging',
    opportunityScore: 81,
    nextTouchpoint: 'Identify discussion group entry points',
    status: 'Follow Up',
  },
];

export const sampleSermons: Sermon[] = [
  {
    id: 'sermon-rest-renewal',
    churchId: 'north-point-alpharetta',
    churchName: 'North Point Community Church',
    title: 'Rest as a Practice of Trust',
    sourceUrl: 'https://northpoint.org/messages',
    status: 'Ideas Ready',
    themes: ['rest', 'trust', 'renewal'],
    contentAngles: ['Why high-capacity women need sacred margin', 'A six-slide reflection on rest without guilt'],
  },
  {
    id: 'sermon-healing-community',
    churchId: 'roswell-united-methodist',
    churchName: 'Roswell United Methodist',
    title: 'Healing Happens in Community',
    sourceUrl: 'https://www.rumc.com/media',
    status: 'Summarized',
    themes: ['healing', 'community', 'belonging'],
    contentAngles: ['Retreat as a place to be witnessed', 'Discussion prompt for women carrying quiet grief'],
  },
];

export const sampleContentIdeas: ContentIdea[] = [
  {
    id: 'idea-sacred-margin',
    churchName: 'North Point Community Church',
    title: 'Sacred Margin for Women Who Carry Everyone',
    format: 'Carousel',
    status: 'Approved',
    slides: 8,
    theme: 'Rest and renewal',
    scheduledFor: 'This week',
  },
  {
    id: 'idea-healing-room',
    churchName: 'Roswell United Methodist',
    title: 'What Healing Looks Like When You Stop Performing',
    format: 'Discussion Post',
    status: 'Review',
    slides: 1,
    theme: 'Healing in community',
    scheduledFor: 'Needs approval',
  },
  {
    id: 'idea-retreat-explainer',
    churchName: 'Well Nest',
    title: 'Second Retreat: What the Weekend Creates',
    format: 'Retreat Explainer',
    status: 'Draft',
    slides: 9,
    theme: 'Booking page education',
    scheduledFor: 'Before launch',
  },
];

export const sampleBookings: Booking[] = [
  { id: 'lead-1', name: 'FB group members', source: 'Community posts', stage: 'Group Member', value: 138 },
  { id: 'lead-2', name: 'Warm conversations', source: 'DMs and comments', stage: 'Conversation', value: 26 },
  { id: 'lead-3', name: 'Booking page visits', source: 'Retreat explainer', stage: 'Booking Page', value: 44 },
  { id: 'lead-4', name: 'Confirmed bookings', source: 'Deposits', stage: 'Booked', value: 11 },
];

async function loadCollection<T extends { id: string }>(name: string, fallback: T[]) {
  try {
    const snapshot = await getDocs(query(collection(db, name), orderBy('updatedAt', 'desc'), limit(50)));
    if (snapshot.empty) return fallback;
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as T);
  } catch {
    return fallback;
  }
}

export async function loadWellNestWorkspace() {
  const [churches, sermons, contentIdeas, bookings] = await Promise.all([
    loadCollection<Church>(collections.churches, sampleChurches),
    loadCollection<Sermon>(collections.sermons, sampleSermons),
    loadCollection<ContentIdea>(collections.contentIdeas, sampleContentIdeas),
    loadCollection<Booking>(collections.bookings, sampleBookings),
  ]);

  return { churches, sermons, contentIdeas, bookings };
}

export async function addChurch(church: Omit<Church, 'id'>) {
  return addDoc(collection(db, collections.churches), {
    ...church,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function seedWorkspace() {
  await Promise.all([
    ...sampleChurches.map(({ id, ...church }) => setDoc(doc(db, collections.churches, id), { ...church, updatedAt: serverTimestamp() }, { merge: true })),
    ...sampleSermons.map(({ id, ...sermon }) => setDoc(doc(db, collections.sermons, id), { ...sermon, updatedAt: serverTimestamp() }, { merge: true })),
    ...sampleContentIdeas.map(({ id, ...idea }) => setDoc(doc(db, collections.contentIdeas, id), { ...idea, updatedAt: serverTimestamp() }, { merge: true })),
    ...sampleBookings.map(({ id, ...booking }) => setDoc(doc(db, collections.bookings, id), { ...booking, updatedAt: serverTimestamp() }, { merge: true })),
  ]);
}

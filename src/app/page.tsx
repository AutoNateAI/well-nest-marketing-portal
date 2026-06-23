'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Copy,
  FileText,
  Images,
  Library,
  LinkIcon,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Sprout,
  Target,
  Users,
  Video,
  X,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import AuthGate from '@/components/AuthGate';
import { auth } from '@/lib/firebase';
import {
  CarouselSet,
  Church,
  Sermon,
  addChurch,
  createCarouselSet,
  enrichAllChurchEstimates,
  enrichChurchEstimates,
  importYoutubeSermons,
  loadWellNestWorkspace,
  processSermon,
  publishCarouselToFacebookPage,
} from '@/lib/wellNestData';

type Workspace = Awaited<ReturnType<typeof loadWellNestWorkspace>>;
type Tab = 'matrix' | 'sermons' | 'studio' | 'library' | 'funnel';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'matrix', label: 'Market Matrix', icon: BarChart3 },
  { id: 'sermons', label: 'Sermon Intelligence', icon: BookOpenText },
  { id: 'studio', label: 'Carousel Builder', icon: Sparkles },
  { id: 'library', label: 'Carousel Library', icon: Images },
  { id: 'funnel', label: 'Retreat Funnel', icon: Target },
];

const starterChurch: Omit<Church, 'id'> = {
  name: '',
  area: '',
  neighborhood: '',
  denomination: '',
  congregationSize: 0,
  affluenceScore: 0,
  websiteUrl: '',
  youtubeUrl: '',
  livestreamUrl: '',
  audienceNotes: '',
  relationshipNotes: '',
  eventActivity: 'Unknown',
  womenMinistrySignal: 'Unknown',
  opportunityScore: 0,
  nextTouchpoint: 'Import YouTube livestreams and review sermon themes',
  status: 'Researching',
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[var(--surface-container)] px-2.5 py-1 text-xs font-bold text-[var(--on-surface-variant)]">{children}</span>;
}

function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: React.ElementType }) {
  return (
    <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">{label}</p>
          <p className="mt-2 text-3xl font-extrabold text-[var(--primary)]">{value}</p>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--primary-fixed)] text-[var(--primary)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-sm text-[var(--on-surface-variant)]">{detail}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid min-w-0 gap-1.5">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">{label}</span>
      {children}
    </label>
  );
}

const inputClass = 'min-w-0 w-full rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:bg-white';
const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60';

function AddChurchForm({ onCreated, onCancel }: { onCreated: (id?: string) => void; onCancel: () => void }) {
  const [church, setChurch] = useState(starterChurch);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!church.name.trim() || !church.area.trim()) return;
    setSaving(true);
    const created = await addChurch({ ...church, congregationSize: Number(church.congregationSize) || 0 });
    setChurch(starterChurch);
    setSaving(false);
    onCreated(created.id);
  };

  return (
    <form onSubmit={submit} className="grid max-h-[calc(100vh-72px)] gap-5 overflow-y-auto p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">New market record</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[var(--primary)]">Add church</h3>
        </div>
        <button type="button" onClick={onCancel} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)]" aria-label="Close add church dialog">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid gap-4">
        <Field label="Church name">
          <input value={church.name} onChange={(event) => setChurch({ ...church, name: event.target.value })} className={inputClass} />
        </Field>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          <Field label="Area">
            <input value={church.area} onChange={(event) => setChurch({ ...church, area: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Denomination">
            <input value={church.denomination} onChange={(event) => setChurch({ ...church, denomination: event.target.value })} className={inputClass} />
          </Field>
        </div>
        <Field label="Website">
          <input value={church.websiteUrl} onChange={(event) => setChurch({ ...church, websiteUrl: event.target.value })} placeholder="https://church.org" className={inputClass} />
        </Field>
        <Field label="YouTube livestream/messages page">
          <input value={church.youtubeUrl} onChange={(event) => setChurch({ ...church, youtubeUrl: event.target.value, livestreamUrl: event.target.value })} placeholder="https://youtube.com/@church/streams" className={inputClass} />
        </Field>
        <Field label="Audience notes">
          <textarea value={church.audienceNotes} onChange={(event) => setChurch({ ...church, audienceNotes: event.target.value })} className={`${inputClass} min-h-24 resize-y`} />
        </Field>
        <Field label="Relationship/context notes">
          <textarea value={church.relationshipNotes} onChange={(event) => setChurch({ ...church, relationshipNotes: event.target.value })} className={`${inputClass} min-h-24 resize-y`} />
        </Field>
        <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--outline-variant)] pt-4">
          <button type="button" onClick={onCancel} className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)]`}>
            Cancel
          </button>
          <button type="submit" disabled={saving} className={`${buttonClass} bg-[var(--primary)] text-white hover:bg-[var(--primary-container)]`}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save church'}
          </button>
        </div>
      </div>
    </form>
  );
}

function AddChurchDialog({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: (id?: string) => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-8">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-white shadow-xl">
        <AddChurchForm
          onCancel={onClose}
          onCreated={(id) => {
            onCreated(id);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

function ChurchListPanel({ churches, selectedChurchId, onSelect }: { churches: Church[]; selectedChurchId?: string; onSelect: (id: string) => void }) {
  return (
    <aside className="overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-white shadow-sm xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)]">
      <div className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Church list</p>
        <p className="mt-1 text-sm text-[var(--on-surface-variant)]">{churches.length} records</p>
      </div>
      {churches.length === 0 && (
        <div className="grid min-h-72 place-items-center px-5 py-8 text-center">
          <div>
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[var(--primary-fixed)] text-[var(--primary)]">
              <Sprout className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--primary)]">No churches yet</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--on-surface-variant)]">Add the first church to start the matrix.</p>
          </div>
        </div>
      )}
      <div className="max-h-[calc(100vh-9rem)] overflow-y-auto">
        {churches.map((church) => (
          <button key={church.id} onClick={() => onSelect(church.id)} className={`w-full border-b border-[var(--outline-variant)] px-4 py-4 text-left transition last:border-b-0 hover:bg-[var(--surface-container-low)] ${selectedChurchId === church.id ? 'bg-[var(--primary-fixed)]' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold leading-snug text-[var(--on-surface)]">{church.name}</div>
                <div className="mt-1 text-sm text-[var(--on-surface-variant)]">{church.area} · {church.congregationSize.toLocaleString()} est.</div>
              </div>
              <span className="text-sm font-extrabold text-[var(--secondary)]">{church.opportunityScore}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-container-highest)]">
              <div className="h-full rounded-full bg-[var(--secondary)]" style={{ width: `${church.opportunityScore}%` }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {church.websiteUrl && <Badge>Website</Badge>}
              {(church.youtubeUrl || church.livestreamUrl) && <Badge>YouTube</Badge>}
              {church.estimates?.confidence && <Badge>{church.estimates.confidence}</Badge>}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

function EstimatePanel({ church, onOpenSermons, onEnrich, enriching }: { church?: Church; onOpenSermons: () => void; onEnrich: () => void; enriching: boolean }) {
  if (!church) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-lg border border-[var(--outline-variant)] bg-white p-8 text-center shadow-sm">
        <div className="max-w-md">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[var(--primary-fixed)] text-[var(--primary)]">
            <Sprout className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--primary)]">Select a church</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--on-surface-variant)]">Choose a record from the right panel to review estimates, sources, and next actions.</p>
        </div>
      </div>
    );
  }
  const estimates = church.estimates;

  return (
    <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">Selected estimate</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[var(--primary)]">{church.name}</h3>
          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">{church.area} · {church.denomination || 'Denomination unknown'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={onEnrich} disabled={enriching} className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)]`}>
            {enriching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Enrich
          </button>
          <button onClick={onOpenSermons} className={`${buttonClass} bg-[var(--primary)] text-white hover:bg-[var(--primary-container)]`}>
            Sermons
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      {!estimates ? (
        <p className="mt-3 text-sm text-[var(--on-surface-variant)]">Run enrichment to populate sourced estimate notes, confidence, and scoring.</p>
      ) : (
        <div className="mt-5 grid gap-4 text-sm md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded bg-[var(--surface-container-low)] p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Congregation</p>
            <p className="mt-1 text-2xl font-extrabold text-[var(--primary)]">{estimates.congregationSizeEstimate.toLocaleString()}</p>
            <p className="mt-1 text-xs text-[var(--on-surface-variant)]">{estimates.congregationSizeConfidence} confidence</p>
          </div>
          <div className="rounded bg-[var(--surface-container-low)] p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Affluence</p>
            <p className="mt-1 text-2xl font-extrabold text-[var(--primary)]">{estimates.affluenceScore}/25</p>
            <p className="mt-1 text-xs text-[var(--on-surface-variant)]">{estimates.medianHouseholdIncome ? `$${estimates.medianHouseholdIncome.toLocaleString()} median income` : 'No Census match'}</p>
          </div>
          <div className="rounded bg-[var(--surface-container-low)] p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Livestream</p>
            <p className="mt-1 text-2xl font-extrabold text-[var(--primary)]">{estimates.livestreamActivityScore}/20</p>
            <p className="mt-1 text-xs text-[var(--on-surface-variant)]">{estimates.womenMinistrySignal} ministry signal</p>
          </div>
          <div className="rounded bg-[var(--surface-container-low)] p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Opportunity</p>
            <p className="mt-1 text-2xl font-extrabold text-[var(--primary)]">{estimates.opportunityScore}</p>
            <p className="mt-1 text-xs text-[var(--on-surface-variant)]">Review before outreach</p>
          </div>
          <div className="md:col-span-2 xl:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Source notes</p>
            <div className="mt-2 grid gap-2">
              {[estimates.congregationSizeSource, estimates.affluenceSource, estimates.livestreamSource, estimates.eventActivitySource, estimates.womenMinistrySource].map((note) => (
                <p key={note} className="rounded bg-[var(--surface-container-low)] p-2 text-xs leading-5 text-[var(--on-surface-variant)]">{note}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-5 grid gap-3 border-t border-[var(--outline-variant)] pt-5 md:grid-cols-2">
        <a href={church.websiteUrl || '#'} target="_blank" rel="noreferrer" className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)] ${church.websiteUrl ? '' : 'pointer-events-none opacity-50'}`}>
          Website
        </a>
        <a href={church.youtubeUrl || church.livestreamUrl || '#'} target="_blank" rel="noreferrer" className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)] ${church.youtubeUrl || church.livestreamUrl ? '' : 'pointer-events-none opacity-50'}`}>
          YouTube
        </a>
      </div>
    </div>
  );
}

function YoutubeImportPanel({ church, onImported }: { church?: Church; onImported: () => void }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [maxVideos, setMaxVideos] = useState(10);
  const [working, setWorking] = useState(false);
  const [notice, setNotice] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!church) return;
    setWorking(true);
    setNotice('');
    try {
      const result = await importYoutubeSermons({
        churchId: church.id,
        youtubeUrl: church.youtubeUrl || church.livestreamUrl,
        fromDate,
        toDate,
        maxVideos,
      });
      setNotice(`Imported ${result.imported}; skipped ${result.skipped} duplicates.`);
      onImported();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Import failed.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-lg border border-[var(--outline-variant)] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-[var(--primary)]">YouTube import</h3>
        <Video className="h-5 w-5 text-[var(--secondary)]" />
      </div>
      <p className="mt-2 text-sm text-[var(--on-surface-variant)]">Pull public videos from the selected church&apos;s YouTube page and queue them as sermon records. V1 stores the date range as context; strict date filtering needs the YouTube Data API.</p>
      <div className="mt-4 grid gap-3">
        <Field label="Selected church">
          <div className="rounded bg-[var(--surface-container-low)] px-3 py-2 text-sm font-bold">{church?.name || 'Select a church first'}</div>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="From">
            <input value={fromDate} onChange={(event) => setFromDate(event.target.value)} type="date" className={inputClass} />
          </Field>
          <Field label="To">
            <input value={toDate} onChange={(event) => setToDate(event.target.value)} type="date" className={inputClass} />
          </Field>
        </div>
        <Field label="Max videos">
          <input value={maxVideos} onChange={(event) => setMaxVideos(Number(event.target.value) || 1)} type="number" min={1} max={50} className={inputClass} />
        </Field>
        <button type="submit" disabled={!church || working || !(church.youtubeUrl || church.livestreamUrl)} className={`${buttonClass} bg-[var(--secondary)] text-white`}>
          {working ? <Loader2 className="h-4 w-4 animate-spin" /> : <Video className="h-4 w-4" />}
          {working ? 'Importing...' : 'Grab YouTube sermons'}
        </button>
        {notice && <div className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-2 text-xs text-[var(--on-surface-variant)]">{notice}</div>}
      </div>
    </form>
  );
}

function SermonList({ sermons, selectedSermonId, onSelect, onProcess }: { sermons: Sermon[]; selectedSermonId?: string; onSelect: (id: string) => void; onProcess: (id: string) => void }) {
  return (
    <div className="rounded-lg border border-[var(--outline-variant)] bg-white shadow-sm">
      {sermons.length === 0 && <div className="p-5 text-sm text-[var(--on-surface-variant)]">No sermons imported for this church yet.</div>}
      {sermons.map((sermon) => (
        <div key={sermon.id} className={`border-b border-[var(--outline-variant)] p-4 last:border-b-0 ${selectedSermonId === sermon.id ? 'bg-[var(--primary-fixed)]' : ''}`}>
          <button onClick={() => onSelect(sermon.id)} className="w-full text-left">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-[var(--on-surface)]">{sermon.title}</h3>
                <p className="mt-1 text-xs text-[var(--on-surface-variant)]">{sermon.sourceUrl}</p>
              </div>
              <Badge>{sermon.status}</Badge>
            </div>
          </button>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={sermon.sourceUrl} target="_blank" rel="noreferrer" className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)]`}>
              <LinkIcon className="h-4 w-4" />
              Source
            </a>
            <button onClick={() => onProcess(sermon.id)} disabled={sermon.status === 'Analyzing' || sermon.status === 'Transcribing'} className={`${buttonClass} bg-[var(--primary)] text-white`}>
              <Sparkles className="h-4 w-4" />
              Process sermon
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SermonReviewPanel({ sermon, selectedConceptIds, setSelectedConceptIds }: { sermon?: Sermon; selectedConceptIds: string[]; setSelectedConceptIds: (ids: string[]) => void }) {
  if (!sermon) {
    return <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 text-sm text-[var(--on-surface-variant)] shadow-sm">Select a sermon to review extracted themes and concepts.</div>;
  }

  const review = sermon.review;
  return (
    <article className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">{sermon.churchName}</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--primary)]">{sermon.title}</h3>
        </div>
        <Badge>{sermon.status}</Badge>
      </div>
      {sermon.errorMessage && <div className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">{sermon.errorMessage}</div>}
      {!review && <p className="mt-4 text-sm text-[var(--on-surface-variant)]">Process this sermon to populate the structured review.</p>}
      {review && (
        <div className="mt-5 grid gap-5">
          <section>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Review</h4>
            <p className="mt-2 text-sm leading-6">{review.summary}</p>
            <p className="mt-3 rounded bg-[var(--surface-container-low)] p-3 text-sm leading-6"><strong>Why it was built:</strong> {review.whyItMatters}</p>
          </section>
          <section className="grid gap-3 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Themes</h4>
              <div className="mt-2 flex flex-wrap gap-2">{review.themes.map((theme) => <Badge key={theme}>{theme}</Badge>)}</div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Retreat angles</h4>
              <div className="mt-2 flex flex-wrap gap-2">{review.retreatAngles.map((angle) => <Badge key={angle}>{angle}</Badge>)}</div>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--on-surface-variant)]">Extracted concepts</h4>
            <div className="mt-3 grid gap-3">
              {review.contentConcepts.map((concept) => {
                const checked = selectedConceptIds.includes(concept.id);
                return (
                  <label key={concept.id} className={`flex cursor-pointer gap-3 rounded border p-3 ${checked ? 'border-[var(--primary)] bg-[var(--primary-fixed)]' : 'border-[var(--outline-variant)] bg-white'}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => {
                        setSelectedConceptIds(event.target.checked ? [...selectedConceptIds, concept.id] : selectedConceptIds.filter((id) => id !== concept.id));
                      }}
                    />
                    <span>
                      <span className="block font-bold">{concept.title}</span>
                      <span className="mt-1 block text-sm text-[var(--on-surface-variant)]">{concept.summary}</span>
                      <span className="mt-2 block text-sm text-[var(--secondary)]">{concept.retreatAngle}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </article>
  );
}

function CarouselBuilder({ church, sermon, selectedConceptIds, onCreated }: { church?: Church; sermon?: Sermon; selectedConceptIds: string[]; onCreated: () => void }) {
  const [audienceContext, setAudienceContext] = useState('');
  const [toneNotes, setToneNotes] = useState('Warm, grounded, faith-rooted, emotionally intelligent, not salesy.');
  const [retreatContext, setRetreatContext] = useState('This is the second Well Nest retreat. The goal is 20-40 booked women, reached through trust-building Facebook group content.');
  const [slideCount, setSlideCount] = useState(8);
  const [working, setWorking] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (church?.audienceNotes) setAudienceContext(church.audienceNotes);
  }, [church?.audienceNotes]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!church || !sermon) return;
    setWorking(true);
    setNotice('');
    try {
      const result = await createCarouselSet({
        churchId: church.id,
        sermonId: sermon.id,
        conceptIds: selectedConceptIds,
        audienceContext,
        toneNotes,
        retreatContext,
        slideCount,
      });
      setNotice(`Carousel ${result.status.toLowerCase()} and saved to the library.`);
      onCreated();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Carousel generation failed.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">gpt-image-2 carousel generation</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[var(--primary)]">Build from selected concepts</h3>
        </div>
        <Sparkles className="h-6 w-6 text-[var(--primary)]" />
      </div>
      <div className="mt-5 grid gap-4">
        <Field label="Audience context">
          <textarea value={audienceContext} onChange={(event) => setAudienceContext(event.target.value)} className={`${inputClass} min-h-24`} />
        </Field>
        <Field label="Tone notes">
          <textarea value={toneNotes} onChange={(event) => setToneNotes(event.target.value)} className={`${inputClass} min-h-20`} />
        </Field>
        <Field label="Retreat context">
          <textarea value={retreatContext} onChange={(event) => setRetreatContext(event.target.value)} className={`${inputClass} min-h-24`} />
        </Field>
        <Field label="Slides">
          <input value={slideCount} onChange={(event) => setSlideCount(Number(event.target.value) || 8)} min={6} max={9} type="number" className={inputClass} />
        </Field>
        <button type="submit" disabled={!church || !sermon?.review || selectedConceptIds.length === 0 || working} className={`${buttonClass} bg-[var(--primary)] text-white`}>
          {working ? <Loader2 className="h-4 w-4 animate-spin" /> : <Images className="h-4 w-4" />}
          {working ? 'Generating images...' : 'Generate carousel'}
        </button>
        {notice && <div className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3 text-sm text-[var(--on-surface-variant)]">{notice}</div>}
      </div>
    </form>
  );
}

function CarouselLibrary({ carousels, onSelect }: { carousels: CarouselSet[]; onSelect?: (carousel: CarouselSet) => void }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {carousels.length === 0 && <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 text-sm text-[var(--on-surface-variant)] shadow-sm">No carousels generated yet.</div>}
      {carousels.map((carousel) => (
        <article key={carousel.id} className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">{carousel.churchName}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[var(--primary)]">{carousel.title}</h3>
            </div>
            <Badge>{carousel.status}</Badge>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--on-surface-variant)]">{carousel.rationale}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {carousel.slides.slice(0, 6).map((slide) => (
              <div key={slide.slideNumber} className="aspect-square overflow-hidden rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                {slide.imageUrl ? <img src={slide.imageUrl} alt={slide.headline} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center p-2 text-center text-xs">{slide.headline}</div>}
              </div>
            ))}
          </div>
          <button onClick={() => onSelect?.(carousel)} className={`${buttonClass} mt-4 border border-[var(--outline-variant)] bg-white text-[var(--primary)]`}>
            <Library className="h-4 w-4" />
            View slides
          </button>
        </article>
      ))}
    </div>
  );
}

function CarouselDetail({ carousel, onPublished }: { carousel?: CarouselSet; onPublished?: () => Promise<void> | void }) {
  const [copied, setCopied] = useState('');
  const [posting, setPosting] = useState(false);
  const [postNotice, setPostNotice] = useState('');
  if (!carousel) return null;
  const fallbackCaption = [
    carousel.title,
    '',
    carousel.rationale,
    '',
    ...carousel.slides.map((slide) => `${slide.slideNumber}. ${slide.headline} — ${slide.body}`),
  ].join('\n');
  const caption = carousel.caption || fallbackCaption;
  const imageLinks = carousel.slides.map((slide) => slide.imageUrl).filter(Boolean).join('\n');
  const copyText = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1800);
  };
  const publishToFacebook = async () => {
    setPosting(true);
    setPostNotice('');
    try {
      const result = await publishCarouselToFacebookPage(carousel.id);
      setPostNotice(result.facebookPostUrl ? 'Posted to Facebook Page.' : 'Posted to Facebook Page, but no post URL was returned.');
      await onPublished?.();
    } catch (error) {
      setPostNotice(error instanceof Error ? error.message : 'Facebook Page publish failed.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-5 rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
      <h3 className="font-serif text-2xl font-semibold text-[var(--primary)]">{carousel.title}</h3>
      <p className="mt-2 text-sm text-[var(--on-surface-variant)]">{carousel.sermonTitle}</p>
      <p className="mt-4 rounded bg-[var(--surface-container-low)] p-3 text-sm"><strong>Why it was built:</strong> {carousel.rationale}</p>
      <div className="mt-5 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">Facebook group posting pack</p>
            <h4 className="mt-1 font-serif text-xl font-semibold text-[var(--primary)]">Carousel copy and assets</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={publishToFacebook} disabled={posting || carousel.slides.every((slide) => !slide.imageUrl)} className={`${buttonClass} bg-[var(--primary)] text-white`}>
              {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {posting ? 'Posting...' : 'Post to Page'}
            </button>
            <button onClick={() => copyText('caption', caption)} className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)]`}>
              <Copy className="h-4 w-4" />
              {copied === 'caption' ? 'Copied' : 'Copy caption'}
            </button>
            <button onClick={() => copyText('images', imageLinks)} className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)]`}>
              <LinkIcon className="h-4 w-4" />
              {copied === 'images' ? 'Copied' : 'Copy image links'}
            </button>
          </div>
        </div>
        {postNotice && <div className="mt-3 rounded border border-[var(--outline-variant)] bg-white p-3 text-sm text-[var(--on-surface-variant)]">{postNotice}</div>}
        {carousel.facebookPostUrl && (
          <a href={carousel.facebookPostUrl} target="_blank" rel="noreferrer" className={`${buttonClass} mt-3 inline-flex border border-[var(--outline-variant)] bg-white text-[var(--primary)]`}>
            <LinkIcon className="h-4 w-4" />
            Open Facebook post
          </a>
        )}
        <textarea readOnly value={caption} className={`${inputClass} mt-4 min-h-48 bg-white`} />
        <div className="mt-3 flex flex-wrap gap-2">
          {carousel.slides.map((slide) => (
            slide.imageUrl && (
              <a key={slide.slideNumber} href={slide.imageUrl} target="_blank" rel="noreferrer" className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)]`}>
                <Images className="h-4 w-4" />
                Slide {slide.slideNumber}
              </a>
            )
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {carousel.slides.map((slide) => (
          <article key={slide.slideNumber} className="overflow-hidden rounded-lg border border-[var(--outline-variant)]">
            <div className="aspect-square bg-[var(--surface-container-low)]">
              {slide.imageUrl && <img src={slide.imageUrl} alt={slide.headline} className="h-full w-full object-cover" />}
            </div>
            <div className="p-4">
              <Badge>Slide {slide.slideNumber}</Badge>
              <h4 className="mt-3 font-bold">{slide.headline}</h4>
              <p className="mt-2 text-sm leading-6 text-[var(--on-surface-variant)]">{slide.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Funnel({ workspace }: { workspace: Workspace }) {
  const bookings = workspace.bookings;
  const booked = bookings.find((item) => item.stage === 'Booked')?.value ?? 0;
  const progress = Math.min(100, Math.round((booked / 40) * 100));

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">Second retreat target</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-[var(--primary)]">20-40 bookings</h3>
          </div>
          <CircleDollarSign className="h-9 w-9 text-[var(--secondary)]" />
        </div>
        <div className="mt-6 h-4 overflow-hidden rounded-full bg-[var(--surface-container-highest)]">
          <div className="h-full rounded-full bg-[var(--secondary)]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-[var(--on-surface-variant)]">{booked} confirmed bookings tracked toward the high target.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {bookings.map((item) => (
            <div key={item.id} className="rounded bg-[var(--surface-container-low)] p-4">
              <p className="text-2xl font-extrabold text-[var(--primary)]">{item.value}</p>
              <p className="mt-1 text-sm font-bold">{item.name}</p>
              <p className="mt-1 text-xs text-[var(--on-surface-variant)]">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--primary)] p-5 text-white shadow-sm">
        <h3 className="font-serif text-2xl font-semibold">Operating rhythm</h3>
        <div className="mt-5 space-y-4 text-sm">
          {['Add priority churches with website and YouTube links', 'Import and process recent public sermons', 'Select sermon concepts for carousel generation', 'Review the carousel library before posting'].map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('matrix');
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [query, setQuery] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [selectedChurchId, setSelectedChurchId] = useState<string>('');
  const [selectedSermonId, setSelectedSermonId] = useState<string>('');
  const [selectedConceptIds, setSelectedConceptIds] = useState<string[]>([]);
  const [selectedCarousel, setSelectedCarousel] = useState<CarouselSet | undefined>();
  const [busySermonId, setBusySermonId] = useState('');
  const [addChurchOpen, setAddChurchOpen] = useState(false);
  const [enriching, setEnriching] = useState<'all' | 'selected' | ''>('');
  const [enrichNotice, setEnrichNotice] = useState('');

  const refresh = async () => {
    setSyncing(true);
    const loaded = await loadWellNestWorkspace();
    setWorkspace(loaded);
    setSyncing(false);
    if (!selectedChurchId && loaded.churches[0]) setSelectedChurchId(loaded.churches[0].id);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const churches = workspace?.churches ?? [];
  const sermons = workspace?.sermons ?? [];
  const carousels = workspace?.carouselSets ?? [];
  const selectedChurch = churches.find((church) => church.id === selectedChurchId);
  const churchSermons = sermons.filter((sermon) => sermon.churchId === selectedChurchId);
  const selectedSermon = sermons.find((sermon) => sermon.id === selectedSermonId) || churchSermons[0];

  useEffect(() => {
    setSelectedConceptIds([]);
  }, [selectedSermon?.id]);

  useEffect(() => {
    if (!carousels.length) {
      setSelectedCarousel(undefined);
      return;
    }
    const updatedSelection = selectedCarousel ? carousels.find((carousel) => carousel.id === selectedCarousel.id) : undefined;
    if (updatedSelection && updatedSelection !== selectedCarousel) {
      setSelectedCarousel(updatedSelection);
    } else if (!selectedCarousel || !updatedSelection) {
      setSelectedCarousel(carousels[0]);
    }
  }, [carousels, selectedCarousel]);

  const filteredChurches = useMemo(() => {
    if (!query.trim()) return churches;
    const needle = query.toLowerCase();
    return churches.filter((church) => [church.name, church.area, church.denomination, church.status, church.websiteUrl, church.youtubeUrl].join(' ').toLowerCase().includes(needle));
  }, [query, churches]);

  const handleProcess = async (sermonId: string) => {
    setBusySermonId(sermonId);
    try {
      await processSermon(sermonId);
      await refresh();
      setSelectedSermonId(sermonId);
    } finally {
      setBusySermonId('');
    }
  };

  const handleEnrichSelected = async () => {
    if (!selectedChurchId) return;
    setEnriching('selected');
    setEnrichNotice('');
    try {
      const result = await enrichChurchEstimates(selectedChurchId);
      setEnrichNotice(`Updated selected church estimate: score ${result.opportunityScore}, ${result.confidence} confidence.`);
      await refresh();
    } catch (error) {
      setEnrichNotice(error instanceof Error ? error.message : 'Estimate enrichment failed.');
    } finally {
      setEnriching('');
    }
  };

  const handleEnrichAll = async () => {
    setEnriching('all');
    setEnrichNotice('');
    try {
      const result = await enrichAllChurchEstimates();
      setEnrichNotice(`Updated ${result.updated} church estimate records.`);
      await refresh();
    } catch (error) {
      setEnrichNotice(error instanceof Error ? error.message : 'Estimate enrichment failed.');
    } finally {
      setEnriching('');
    }
  };

  return (
    <main className="shell-grid min-h-screen">
      <aside className="border-r border-[var(--outline-variant)] bg-white p-5 max-lg:border-b max-lg:border-r-0">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--primary-fixed)] text-[var(--primary)]">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[var(--primary)]">Well Nest</h1>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">Marketing Portal</p>
          </div>
        </div>

        <nav className="mt-8 grid gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold transition ${active ? 'bg-[var(--primary)] text-white' : 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] hover:text-[var(--primary)]'}`}>
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 rounded-lg bg-[var(--surface-container-low)] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">Selected church</p>
          <p className="mt-2 text-sm font-bold text-[var(--primary)]">{selectedChurch?.name || 'None selected'}</p>
          <button onClick={() => signOut(auth)} className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <section className="min-w-0">
        <header className="border-b border-[var(--outline-variant)] bg-[var(--surface)] px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--secondary)]">Atlanta faith-community content engine</p>
              <h2 className="mt-1 font-serif text-4xl font-semibold text-[var(--primary)]">{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--outline-variant)] bg-white px-3 py-2">
                <Search className="h-4 w-4 text-[var(--on-surface-variant)]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search churches" className="w-44 bg-transparent text-sm outline-none" />
              </div>
              <button onClick={refresh} className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)]" aria-label="Refresh data">
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-5 lg:p-8">
          {workspace?.loadErrors?.length ? (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-bold">Firestore read failed</p>
              <p className="mt-1">{workspace.loadErrors[0]}</p>
            </div>
          ) : null}

          {activeTab === 'matrix' && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Priority churches" value={String(churches.length)} detail="Website and YouTube sources attached." icon={Users} />
              <StatCard label="Sermons tracked" value={String(sermons.length)} detail="Public streams become structured reviews." icon={BookOpenText} />
              <StatCard label="Carousels" value={String(carousels.length)} detail="Generated slide sets saved in the library." icon={Library} />
              <StatCard label="Bookings target" value="20-40" detail="Second retreat goal with funnel tracking." icon={Target} />
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--outline-variant)] bg-white px-4 py-3 shadow-sm">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--primary)]">Church workbench</h3>
                <p className="mt-1 text-sm text-[var(--on-surface-variant)]">Review one church in the main panel and switch records from the list on the right.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={handleEnrichAll} disabled={!churches.length || Boolean(enriching)} className={`${buttonClass} border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)]`}>
                  {enriching === 'all' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Enrich all
                </button>
                <button onClick={() => setAddChurchOpen(true)} className={`${buttonClass} bg-[var(--primary)] text-white hover:bg-[var(--primary-container)]`}>
                  <Plus className="h-4 w-4" />
                  Add church
                </button>
              </div>
            </div>
          )}

          {activeTab === 'matrix' && enrichNotice && (
            <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3 text-sm text-[var(--on-surface-variant)]">{enrichNotice}</div>
          )}

          {activeTab === 'matrix' && (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
              <EstimatePanel
                church={selectedChurch}
                enriching={enriching === 'selected'}
                onEnrich={handleEnrichSelected}
                onOpenSermons={() => setActiveTab('sermons')}
              />
              <ChurchListPanel churches={filteredChurches} selectedChurchId={selectedChurchId} onSelect={setSelectedChurchId} />
            </div>
          )}

          {activeTab === 'sermons' && (
            <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
              <div className="grid gap-5 content-start">
                <YoutubeImportPanel church={selectedChurch} onImported={refresh} />
                <SermonList sermons={churchSermons} selectedSermonId={selectedSermon?.id} onSelect={setSelectedSermonId} onProcess={handleProcess} />
                {busySermonId && <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-3 text-sm text-[var(--on-surface-variant)] shadow-sm">Processing sermon. This may take a moment.</div>}
              </div>
              <SermonReviewPanel sermon={selectedSermon} selectedConceptIds={selectedConceptIds} setSelectedConceptIds={setSelectedConceptIds} />
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
              <SermonReviewPanel sermon={selectedSermon} selectedConceptIds={selectedConceptIds} setSelectedConceptIds={setSelectedConceptIds} />
              <CarouselBuilder church={selectedChurch} sermon={selectedSermon} selectedConceptIds={selectedConceptIds} onCreated={refresh} />
            </div>
          )}

          {activeTab === 'library' && (
            <div>
              <CarouselLibrary carousels={carousels} onSelect={setSelectedCarousel} />
              <CarouselDetail carousel={selectedCarousel} onPublished={refresh} />
            </div>
          )}

          {activeTab === 'funnel' && workspace && <Funnel workspace={workspace} />}

          {activeTab !== 'funnel' && (
            <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 text-sm text-[var(--on-surface-variant)]">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
                <p>This V1 keeps posting manual: the portal builds church-specific sermon reviews and carousel assets, then the library gives you the copy/images/context to review before using them in the Facebook group.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <AddChurchDialog open={addChurchOpen} onClose={() => setAddChurchOpen(false)} onCreated={async (id) => { await refresh(); if (id) setSelectedChurchId(id); }} />
    </main>
  );
}

export default function Page() {
  return (
    <AuthGate>
      <Dashboard />
    </AuthGate>
  );
}

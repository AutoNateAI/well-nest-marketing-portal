'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Library,
  LogOut,
  MessageSquareText,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Sprout,
  Target,
  Users,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import AuthGate from '@/components/AuthGate';
import { auth } from '@/lib/firebase';
import { addChurch, Church, ContentIdea, Sermon, loadWellNestWorkspace, seedWorkspace } from '@/lib/wellNestData';

type Workspace = Awaited<ReturnType<typeof loadWellNestWorkspace>>;
type Tab = 'matrix' | 'sermons' | 'studio' | 'calendar' | 'funnel';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'matrix', label: 'Market Matrix', icon: BarChart3 },
  { id: 'sermons', label: 'Sermon Intelligence', icon: BookOpenText },
  { id: 'studio', label: 'Content Studio', icon: Sparkles },
  { id: 'calendar', label: 'Social Calendar', icon: CalendarClock },
  { id: 'funnel', label: 'Retreat Funnel', icon: Target },
];

const starterChurch = {
  name: '',
  area: '',
  denomination: '',
  congregationSize: 0,
  affluenceScore: 75,
  livestreamUrl: '',
  eventActivity: 'Medium' as Church['eventActivity'],
  womenMinistrySignal: 'Moderate' as Church['womenMinistrySignal'],
  opportunityScore: 75,
  nextTouchpoint: 'Research livestream and ministry calendar',
  status: 'Researching' as Church['status'],
};

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

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[var(--surface-container)] px-2.5 py-1 text-xs font-bold text-[var(--on-surface-variant)]">{children}</span>;
}

function MatrixTable({ churches }: { churches: Church[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-white shadow-sm">
      <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr_1fr] gap-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--on-surface-variant)] max-lg:hidden">
        <span>Church</span>
        <span>Area</span>
        <span>Signals</span>
        <span>Score</span>
        <span>Next Action</span>
      </div>
      {churches.map((church) => (
        <div key={church.id} className="grid grid-cols-1 gap-3 border-b border-[var(--outline-variant)] px-4 py-4 last:border-b-0 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr_1fr] lg:items-center">
          <div>
            <div className="font-bold text-[var(--on-surface)]">{church.name}</div>
            <div className="text-sm text-[var(--on-surface-variant)]">{church.denomination} · {church.congregationSize.toLocaleString()} est.</div>
          </div>
          <div className="text-sm font-semibold">{church.area}</div>
          <div className="flex flex-wrap gap-2">
            <Badge>{church.eventActivity} events</Badge>
            <Badge>{church.womenMinistrySignal}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[var(--surface-container-highest)]">
              <div className="h-full rounded-full bg-[var(--secondary)]" style={{ width: `${church.opportunityScore}%` }} />
            </div>
            <span className="text-sm font-extrabold text-[var(--secondary)]">{church.opportunityScore}</span>
          </div>
          <div className="text-sm text-[var(--on-surface-variant)]">{church.nextTouchpoint}</div>
        </div>
      ))}
    </div>
  );
}

function AddChurchForm({ onCreated }: { onCreated: () => void }) {
  const [church, setChurch] = useState(starterChurch);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!church.name.trim() || !church.area.trim()) return;
    setSaving(true);
    await addChurch({ ...church, congregationSize: Number(church.congregationSize) || 0 });
    setChurch(starterChurch);
    setSaving(false);
    onCreated();
  };

  return (
    <form onSubmit={submit} className="rounded-lg border border-[var(--outline-variant)] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-[var(--primary)]">Add church</h3>
        <Plus className="h-5 w-5 text-[var(--primary)]" />
      </div>
      <div className="mt-4 grid gap-3">
        <input value={church.name} onChange={(event) => setChurch({ ...church, name: event.target.value })} placeholder="Church name" className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
        <div className="grid grid-cols-2 gap-3">
          <input value={church.area} onChange={(event) => setChurch({ ...church, area: event.target.value })} placeholder="Area" className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
          <input value={church.denomination} onChange={(event) => setChurch({ ...church, denomination: event.target.value })} placeholder="Denomination" className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
        </div>
        <input value={church.livestreamUrl} onChange={(event) => setChurch({ ...church, livestreamUrl: event.target.value })} placeholder="Livestream or messages URL" className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
        <textarea value={church.nextTouchpoint} onChange={(event) => setChurch({ ...church, nextTouchpoint: event.target.value })} className="min-h-20 rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
        <button type="submit" disabled={saving} className="rounded bg-[var(--primary)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--primary-container)] disabled:opacity-60">
          {saving ? 'Saving...' : 'Save to Firestore'}
        </button>
      </div>
    </form>
  );
}

function SermonPanel({ sermons }: { sermons: Sermon[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {sermons.map((sermon) => (
        <article key={sermon.id} className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">{sermon.churchName}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--primary)]">{sermon.title}</h3>
            </div>
            <Badge>{sermon.status}</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {sermon.themes.map((theme) => <Badge key={theme}>{theme}</Badge>)}
          </div>
          <div className="mt-5 space-y-3">
            {sermon.contentAngles.map((angle) => (
              <div key={angle} className="flex items-start gap-3 rounded bg-[var(--surface-container-low)] p-3 text-sm">
                <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                <span>{angle}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
      <div className="rounded-lg border border-dashed border-[var(--outline)] bg-[var(--surface-container-low)] p-5">
        <h3 className="font-serif text-2xl font-semibold text-[var(--primary)]">Processing service stub</h3>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">The Firebase Functions API client is ready for a sermon ingestion endpoint. The next step is wiring audio/video transcription and summary jobs behind `wellNestApi`.</p>
      </div>
    </div>
  );
}

function ContentStudio({ ideas }: { ideas: ContentIdea[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {ideas.map((idea) => (
        <article key={idea.id} className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <Badge>{idea.format}</Badge>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">{idea.status}</span>
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[var(--primary)]">{idea.title}</h3>
          <p className="mt-3 text-sm text-[var(--on-surface-variant)]">{idea.churchName} · {idea.theme}</p>
          <div className="mt-5 flex items-center justify-between rounded bg-[var(--surface-container-low)] p-3 text-sm">
            <span>{idea.slides} slides</span>
            <span>{idea.scheduledFor}</span>
          </div>
        </article>
      ))}
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
          {['Process three sermons per priority church', 'Generate five content angles per church', 'Approve two carousel sets per week', 'Capture comments, DMs, clicks, and deposits'].map((item) => (
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

  const refresh = async () => {
    setSyncing(true);
    setWorkspace(await loadWellNestWorkspace());
    setSyncing(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const filteredChurches = useMemo(() => {
    const source = workspace?.churches ?? [];
    if (!query.trim()) return source;
    const needle = query.toLowerCase();
    return source.filter((church) => [church.name, church.area, church.denomination, church.status].join(' ').toLowerCase().includes(needle));
  }, [query, workspace]);

  const churches = workspace?.churches ?? [];
  const ideas = workspace?.contentIdeas ?? [];
  const sermons = workspace?.sermons ?? [];

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
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]">Access</p>
          <p className="mt-2 text-sm text-[var(--on-surface-variant)]">Email-only Firebase Auth is restricted to autonate.ai@gmail.com.</p>
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
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--secondary)]">Atlanta faith-community acquisition engine</p>
              <h2 className="mt-1 font-serif text-4xl font-semibold text-[var(--primary)]">Market Matrix</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--outline-variant)] bg-white px-3 py-2">
                <Search className="h-4 w-4 text-[var(--on-surface-variant)]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search churches" className="w-44 bg-transparent text-sm outline-none" />
              </div>
              <button onClick={refresh} className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--outline-variant)] bg-white text-[var(--primary)] hover:bg-[var(--surface-container-low)]" aria-label="Refresh data">
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              </button>
              <button onClick={async () => { setSyncing(true); await seedWorkspace(); await refresh(); }} className="flex items-center gap-2 rounded-lg bg-[var(--secondary)] px-4 py-2.5 text-sm font-bold text-white">
                <Send className="h-4 w-4" />
                Seed data
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-5 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Priority churches" value={String(churches.length)} detail="Focused on affluent Atlanta-area communities." icon={Users} />
            <StatCard label="Sermons tracked" value={String(sermons.length)} detail="Livestreams become themes and content angles." icon={BookOpenText} />
            <StatCard label="Content ideas" value={String(ideas.length)} detail="Carousel, discussion, and retreat explainer concepts." icon={Library} />
            <StatCard label="Bookings target" value="20-40" detail="Second retreat goal with funnel tracking." icon={Target} />
          </div>

          {activeTab === 'matrix' && (
            <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
              <MatrixTable churches={filteredChurches} />
              <AddChurchForm onCreated={refresh} />
            </div>
          )}

          {activeTab === 'sermons' && <SermonPanel sermons={sermons} />}
          {activeTab === 'studio' && <ContentStudio ideas={ideas} />}
          {activeTab === 'calendar' && (
            <div className="rounded-lg border border-[var(--outline-variant)] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-[var(--primary)]" />
                <h3 className="font-serif text-2xl font-semibold text-[var(--primary)]">Publishing queue</h3>
              </div>
              <div className="mt-5 grid gap-3">
                {ideas.map((idea) => (
                  <div key={idea.id} className="flex flex-wrap items-center justify-between gap-3 rounded bg-[var(--surface-container-low)] p-4">
                    <div>
                      <p className="font-bold">{idea.title}</p>
                      <p className="text-sm text-[var(--on-surface-variant)]">{idea.format} · {idea.scheduledFor}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'funnel' && workspace && <Funnel workspace={workspace} />}
        </div>
      </section>
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

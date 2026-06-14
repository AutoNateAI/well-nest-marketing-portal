'use client';

import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { User, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { LockKeyhole, Sprout } from 'lucide-react';
import { auth } from '@/lib/firebase';

const allowedEmail = 'autonate.ai@gmail.com';

export default function AuthGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(allowedEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 2500);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      window.clearTimeout(timeout);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      window.clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const submitEmail = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');

    if (email.trim().toLowerCase() !== allowedEmail) {
      setError('This portal is restricted to the Well Nest admin account.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email sign-in failed.');
    }
  };

  const resetPassword = async () => {
    if (email.trim().toLowerCase() !== allowedEmail) {
      setError('Enter the Well Nest admin email first.');
      return;
    }
    setError('');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setNotice('Password reset email sent.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed.');
    }
  };

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[var(--surface)] text-[var(--on-surface)]">
        <div className="rounded-lg border border-[var(--outline-variant)] bg-white px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)] shadow-sm">
          Verifying Well Nest access
        </div>
      </main>
    );
  }

  if (!user || user.email?.toLowerCase() !== allowedEmail) {
    if (user && user.email?.toLowerCase() !== allowedEmail) {
      void signOut(auth);
    }

    return (
      <main className="grid min-h-screen place-items-center bg-[var(--surface)] px-4 text-[var(--on-surface)]">
        <div className="w-full max-w-md rounded-lg border border-[var(--outline-variant)] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--primary-fixed)] text-[var(--primary)]">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold text-[var(--primary)]">Well Nest</h1>
              <p className="text-sm text-[var(--on-surface-variant)]">Marketing portal access</p>
            </div>
          </div>

          <form onSubmit={submitEmail} className="mt-6 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)]" />
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">Password</label>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="w-full rounded border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)]" />
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--primary-container)]">
              <LockKeyhole className="h-4 w-4" />
              Sign in
            </button>
          </form>

          <button onClick={resetPassword} className="mt-3 text-xs text-[var(--on-surface-variant)] hover:text-[var(--primary)]">
            Send password reset
          </button>
          {error && <div className="mt-3 rounded border border-red-300 bg-red-50 p-2 text-xs text-red-800">{error}</div>}
          {notice && <div className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-2 text-xs text-emerald-800">{notice}</div>}
        </div>
      </main>
    );
  }

  return children;
}

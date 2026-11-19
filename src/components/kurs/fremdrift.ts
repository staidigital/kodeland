"use client";

/**
 * Elevens fremdrift, lagret i nettleseren (localStorage).
 * Senere: synkes til Supabase når eleven er innlogget.
 */

import { useSyncExternalStore } from "react";

export type LeksjonStatus = { status: "started" | "completed"; completedAt?: string };
export type OppgaveStatus = {
  passed: boolean;
  attempts: number;
  html?: string;
  css?: string;
};
export type Fremdrift = {
  leksjoner: Record<string, LeksjonStatus>;
  oppgaver: Record<string, OppgaveStatus>;
  sjekklister: Record<string, boolean[]>;
};

const KEY = "kodeland:fremdrift:v1";
const TOM: Fremdrift = { leksjoner: {}, oppgaver: {}, sjekklister: {} };

let cache: Fremdrift | null = null;
const lyttere = new Set<() => void>();

function les(): Fremdrift {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...TOM, ...JSON.parse(raw) } : TOM;
  } catch {
    cache = TOM;
  }
  return cache!;
}

function skriv(neste: Fremdrift) {
  cache = neste;
  try {
    localStorage.setItem(KEY, JSON.stringify(neste));
  } catch {
    // Privat modus eller full lagring: fremdriften lever bare i denne økten.
  }
  lyttere.forEach((l) => l());
}

function abonner(l: () => void) {
  lyttere.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    lyttere.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useFremdrift(): Fremdrift {
  return useSyncExternalStore(abonner, les, () => TOM);
}

export function startLeksjon(id: string) {
  const f = les();
  if (f.leksjoner[id]) return;
  skriv({ ...f, leksjoner: { ...f.leksjoner, [id]: { status: "started" } } });
}

export function fullforLeksjon(id: string, ferdig = true) {
  const f = les();
  skriv({
    ...f,
    leksjoner: {
      ...f.leksjoner,
      [id]: ferdig
        ? { status: "completed", completedAt: new Date().toISOString() }
        : { status: "started" },
    },
  });
}

export function lagreOppgave(id: string, data: Partial<OppgaveStatus>) {
  const f = les();
  const forrige = f.oppgaver[id] ?? { passed: false, attempts: 0 };
  skriv({ ...f, oppgaver: { ...f.oppgaver, [id]: { ...forrige, ...data } } });
}

export function lagreSjekkliste(id: string, verdier: boolean[]) {
  const f = les();
  skriv({ ...f, sjekklister: { ...f.sjekklister, [id]: verdier } });
}

/** Leser lagret oppgave direkte (kun i nettleseren). */
export function hentOppgave(id: string): OppgaveStatus | undefined {
  return les().oppgaver[id];
}

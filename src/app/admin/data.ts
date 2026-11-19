import "server-only";
import { leksjonsNr, MODULER } from "@/content/webutvikling/kurs";
import { OPPGAVER } from "@/content/webutvikling/oppgaver";
import { createClient } from "@/lib/supabase/server";

/** Alle leksjoner som finnes i kurset, i rekkefølge. */
export const ALLE_LEKSJONER = MODULER.flatMap((m) =>
  m.leksjoner.map((l, i) => ({
    id: `${m.slug}/${l.slug}`,
    kort: leksjonsNr(m, i),
    tittel: l.tittel,
    modul: m,
  })),
);
export const ANTALL_OPPGAVER = Object.keys(OPPGAVER).length;

export type Student = {
  id: string;
  brukernavn: string;
  navn: string;
  leksjoner: Record<string, { status: string; completed_at: string | null; updated_at: string }>;
  oppgaver: Record<
    string,
    {
      passed: boolean;
      attempts: number;
      html: string | null;
      css: string | null;
      /** Ekstra HTML-sider (filnavn → kode), for oppgaver med flere sider. */
      pages?: Record<string, string> | null;
      updated_at: string;
    }
  >;
  sistAktiv: string | null;
};

/** Studenter med fremdrift. Leses med lærerens egen tilgang (RLS). */
export async function hentStudenter(filter: { klasseId?: string; studentId?: string }): Promise<Student[]> {
  const supabase = await createClient();
  let q = supabase.from("profiles").select("id, username, display_name").eq("role", "student");
  if (filter.klasseId) q = q.eq("class_id", filter.klasseId);
  if (filter.studentId) q = q.eq("id", filter.studentId);
  const { data: profiler } = await q.order("display_name");
  if (!profiler?.length) return [];

  const ider = profiler.map((p) => p.id);
  const [{ data: l }, { data: o }, { data: medSider }] = await Promise.all([
    supabase.from("lesson_progress").select("user_id, lesson_id, status, completed_at, updated_at").in("user_id", ider),
    supabase.from("exercise_results").select("user_id, exercise_id, passed, attempts, html, css, updated_at").in("user_id", ider),
    // Egen spørring, så panelet virker selv om migrasjonen for pages ikke er kjørt.
    supabase.from("exercise_results").select("user_id, exercise_id, pages").in("user_id", ider).not("pages", "is", null),
  ]);
  const sider = new Map(
    ((medSider ?? []) as { user_id: string; exercise_id: string; pages: Record<string, string> }[]).map((r) => [
      `${r.user_id}/${r.exercise_id}`,
      r.pages,
    ]),
  );

  return profiler.map((p) => {
    const leksjoner: Student["leksjoner"] = {};
    const oppgaver: Student["oppgaver"] = {};
    let sist: string | null = null;
    for (const r of l ?? []) {
      if (r.user_id !== p.id) continue;
      leksjoner[r.lesson_id] = r;
      if (!sist || r.updated_at > sist) sist = r.updated_at;
    }
    for (const r of o ?? []) {
      if (r.user_id !== p.id) continue;
      oppgaver[r.exercise_id] = { ...r, pages: sider.get(`${p.id}/${r.exercise_id}`) };
      if (!sist || r.updated_at > sist) sist = r.updated_at;
    }
    return {
      id: p.id,
      brukernavn: p.username,
      navn: p.display_name || p.username,
      leksjoner,
      oppgaver,
      sistAktiv: sist,
    };
  });
}

export function tidSiden(iso: string | null) {
  if (!iso) return "aldri";
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "nå";
  if (min < 60) return `${min} min siden`;
  const t = Math.round(min / 60);
  if (t < 24) return `${t} t siden`;
  const d = Math.round(t / 24);
  return d === 1 ? "i går" : `${d} dager siden`;
}

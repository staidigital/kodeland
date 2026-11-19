"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { brukernavnTilEpost, hentBruker } from "@/lib/auth";
import { foreslaBrukernavn, lagPassord } from "@/lib/brukernavn";
import { dekrypter, krypter } from "@/lib/passordkrypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// Alle handlinger sjekker selv at innlogget bruker er lærer, og at klassen/studenten
// er lærerens egen (via vanlig klient, der databasens tilgangsregler gjelder).
// Først da brukes admin-klienten, som omgår tilgangsreglene.

type AdminKlient = ReturnType<typeof createAdminClient>;

/** Lagrer passordet kryptert, så læreren kan vise det igjen senere. */
async function lagrePassord(admin: AdminKlient, userId: string, passord: string) {
  const { error } = await admin
    .from("student_passwords")
    .upsert({ user_id: userId, encrypted: krypter(passord), updated_at: new Date().toISOString() });
  if (error) throw new Error("Kunne ikke lagre passordet: " + error.message);
}

async function laerer() {
  const bruker = await hentBruker();
  if (!bruker || bruker.rolle !== "teacher") throw new Error("Bare lærere har tilgang.");
  return bruker;
}

async function egenKlasse(klasseId: string) {
  const b = await laerer();
  const supabase = await createClient();
  const { data } = await supabase
    .from("classes")
    .select("id")
    .eq("id", klasseId)
    .eq("teacher_id", b.id)
    .maybeSingle();
  if (!data) throw new Error("Fant ikke klassen.");
  return b;
}

async function egenStudent(studentId: string) {
  await laerer();
  const supabase = await createClient();
  // RLS: læreren ser bare profiler til studenter i egne klasser.
  const { data } = await supabase
    .from("profiles")
    .select("id, class_id")
    .eq("id", studentId)
    .eq("role", "student")
    .maybeSingle();
  if (!data) throw new Error("Fant ikke studenten.");
  return data as { id: string; class_id: string };
}

export type Skjematilstand = { feil?: string };

export async function lagKlasse(_: Skjematilstand, form: FormData): Promise<Skjematilstand> {
  const b = await laerer();
  const navn = String(form.get("navn") ?? "").trim();
  if (!navn) return { feil: "Klassen må ha et navn." };
  const { data, error } = await createAdminClient()
    .from("classes")
    .insert({ name: navn, teacher_id: b.id })
    .select("id")
    .single();
  if (error) return { feil: "Kunne ikke lage klassen: " + error.message };
  redirect(`/admin/klasse/${data.id}`);
}

export async function slettKlasse(klasseId: string) {
  await egenKlasse(klasseId);
  const admin = createAdminClient();
  const { count } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("class_id", klasseId);
  if (count) throw new Error("Slett eller flytt studentene først.");
  await admin.from("classes").delete().eq("id", klasseId);
  redirect("/admin");
}

export type NyStudent = { navn: string; brukernavn: string; passord: string };
export type LagStudenterTilstand = { feil?: string; nye?: NyStudent[]; mislyktes?: string[] };

export async function lagStudenter(
  klasseId: string,
  _: LagStudenterTilstand,
  form: FormData,
): Promise<LagStudenterTilstand> {
  await egenKlasse(klasseId);
  const navnene = String(form.get("navn") ?? "")
    .split("\n")
    .map((n) => n.trim().replace(/\s+/g, " "))
    .filter(Boolean);
  if (navnene.length === 0) return { feil: "Skriv inn minst ett navn." };
  if (navnene.length > 60) return { feil: "Maks 60 studenter om gangen." };

  const admin = createAdminClient();
  const { data: finnes } = await admin.from("profiles").select("username");
  const opptatt = new Set((finnes ?? []).map((r) => r.username as string));

  const nye: NyStudent[] = [];
  const mislyktes: string[] = [];
  for (const navn of navnene) {
    const base = foreslaBrukernavn(navn);
    let brukernavn = base;
    for (let i = 2; opptatt.has(brukernavn); i++) brukernavn = `${base}${i}`;
    opptatt.add(brukernavn);

    const passord = lagPassord();
    const { data, error } = await admin.auth.admin.createUser({
      email: brukernavnTilEpost(brukernavn),
      password: passord,
      email_confirm: true,
      app_metadata: { role: "student", username: brukernavn },
    });
    if (error || !data.user) {
      mislyktes.push(`${navn} (${error?.message ?? "ukjent feil"})`);
      continue;
    }
    const { error: pFeil } = await admin
      .from("profiles")
      .update({ username: brukernavn, display_name: navn, role: "student", class_id: klasseId })
      .eq("id", data.user.id);
    try {
      if (pFeil) throw new Error(pFeil.message);
      await lagrePassord(admin, data.user.id, passord);
    } catch (e) {
      await admin.auth.admin.deleteUser(data.user.id);
      mislyktes.push(`${navn} (${e instanceof Error ? e.message : "ukjent feil"})`);
      continue;
    }
    nye.push({ navn, brukernavn, passord });
  }

  refresh();
  return { nye, mislyktes };
}

export async function nullstillPassord(studentId: string): Promise<{ passord?: string; feil?: string }> {
  await egenStudent(studentId);
  const passord = lagPassord();
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(studentId, { password: passord });
  if (error) return { feil: error.message };
  try {
    await lagrePassord(admin, studentId, passord);
  } catch (e) {
    return { passord, feil: e instanceof Error ? e.message : "Passordet ble ikke lagret." };
  }
  return { passord };
}

export type Innlogging = { navn: string; brukernavn: string; passord: string | null };

/** Henter og dekrypterer lagrede passord for studenter læreren har tilgang til. */
async function hentInnlogginger(studentIder: string[]): Promise<Innlogging[]> {
  if (studentIder.length === 0) return [];
  const supabase = await createClient();
  // RLS: bare lærerens egne studenter kommer med.
  const { data: profiler } = await supabase
    .from("profiles")
    .select("id, username, display_name")
    .in("id", studentIder)
    .eq("role", "student")
    .order("display_name");
  if (!profiler?.length) return [];
  const { data: lagret } = await createAdminClient()
    .from("student_passwords")
    .select("user_id, encrypted")
    .in("user_id", profiler.map((p) => p.id));
  const passord = new Map<string, string>();
  for (const r of lagret ?? []) {
    try {
      passord.set(r.user_id, dekrypter(r.encrypted));
    } catch {
      // Feil nøkkel eller ødelagt verdi: vises som «ikke lagret».
    }
  }
  return profiler.map((p) => ({
    navn: p.display_name || p.username,
    brukernavn: p.username,
    passord: passord.get(p.id) ?? null,
  }));
}

export async function visPassord(studentId: string): Promise<Innlogging | null> {
  await egenStudent(studentId);
  const [r] = await hentInnlogginger([studentId]);
  return r ?? null;
}

export async function visKlassensPassord(klasseId: string): Promise<Innlogging[]> {
  await egenKlasse(klasseId);
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("id").eq("class_id", klasseId).eq("role", "student");
  return hentInnlogginger((data ?? []).map((p) => p.id));
}

export async function slettStudent(studentId: string) {
  const student = await egenStudent(studentId);
  const { error } = await createAdminClient().auth.admin.deleteUser(studentId);
  if (error) throw new Error(error.message);
  redirect(`/admin/klasse/${student.class_id}`);
}

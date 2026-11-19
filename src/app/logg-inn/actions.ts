"use server";

import { redirect } from "next/navigation";
import { brukernavnTilEpost } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type LoggInnTilstand = { feil?: string; brukernavn?: string };

function tryggNeste(neste: unknown) {
  // Bare lokale stier, så innloggingen ikke kan sende noen videre til en annen side.
  return typeof neste === "string" && neste.startsWith("/") && !neste.startsWith("//") ? neste : null;
}

export async function loggInn(_: LoggInnTilstand, form: FormData): Promise<LoggInnTilstand> {
  const brukernavn = String(form.get("brukernavn") ?? "").trim();
  const passord = String(form.get("passord") ?? "");
  if (!brukernavn || !passord) return { feil: "Skriv inn brukernavn og passord.", brukernavn };

  const epost = brukernavn.includes("@") ? brukernavn : brukernavnTilEpost(brukernavn);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email: epost, password: passord });
  if (error || !data.user) return { feil: "Feil brukernavn eller passord.", brukernavn };

  const { data: p } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
  redirect(tryggNeste(form.get("neste")) ?? (p?.role === "teacher" ? "/admin" : "/webutvikling"));
}

export async function loggUt() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/webutvikling");
}

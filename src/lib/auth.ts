import "server-only";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

/** Elever har ingen e-post. Bak brukernavnet ligger en intern adresse som aldri brukes til e-post. */
export const ELEV_DOMENE = "elev.kodeland.invalid";

export function brukernavnTilEpost(brukernavn: string) {
  return `${brukernavn.trim().toLowerCase()}@${ELEV_DOMENE}`;
}

export type Bruker = {
  id: string;
  brukernavn: string;
  navn: string;
  rolle: "student" | "teacher";
  klasseId: string | null;
};

/** Innlogget bruker, eller null. Leser cookies – må brukes bak <Suspense>. */
export async function hentBruker(): Promise<Bruker | null> {
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const id = data?.claims?.sub;
  if (!id) return null;
  const { data: p } = await supabase
    .from("profiles")
    .select("username, display_name, role, class_id")
    .eq("id", id)
    .single();
  if (!p) return null;
  return {
    id,
    brukernavn: p.username,
    navn: p.display_name || p.username,
    rolle: p.role,
    klasseId: p.class_id,
  };
}

/** Krever innlogget lærer. Sender andre til innloggingen. */
export async function kreverLaerer(): Promise<Bruker> {
  const bruker = await hentBruker();
  if (!bruker) redirect("/logg-inn?neste=/admin");
  if (bruker.rolle !== "teacher") redirect("/webutvikling");
  return bruker;
}

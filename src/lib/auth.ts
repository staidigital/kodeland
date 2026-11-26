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
  /** Brukernavnet for studenter, og det som står før @ i e-postadressen for lærere. */
  brukernavn: string;
  /** Visningsnavnet hvis det er satt, ellers det samme som brukernavn. */
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
  const epost = typeof data.claims.email === "string" ? data.claims.email : "";
  const { data: p } = await supabase
    .from("profiles")
    .select("username, display_name, role, class_id")
    .eq("id", id)
    .single();
  if (!p) return null;
  // Studenter logger inn med brukernavnet (bak det ligger en intern adresse).
  // Lærere logger inn med en ekte e-postadresse – vis det som står før @, ikke det interne brukernavnet.
  const brukernavn = epost && !epost.endsWith(`@${ELEV_DOMENE}`) ? epost.split("@")[0] : p.username;
  return {
    id,
    brukernavn,
    navn: p.display_name || brukernavn,
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

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./env";

/**
 * Admin-klient med secret key. Omgår all RLS!
 * Kun for lærerhandlinger på serveren (lage elever, nullstille passord),
 * og alltid etter at vi har sjekket at innlogget bruker er lærer.
 */
export function createAdminClient() {
  return createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  erstattFremdrift,
  type Fremdrift,
  type LeksjonStatus,
  lesFremdrift,
  lyttPaEndringer,
  type OppgaveStatus,
} from "./fremdrift";

type LeksjonRad = { lesson_id: string; status: LeksjonStatus["status"]; completed_at: string | null };
type OppgaveRad = {
  exercise_id: string;
  passed: boolean;
  attempts: number;
  html: string | null;
  css: string | null;
};

const TOM: Fremdrift = { leksjoner: {}, oppgaver: {}, sjekklister: {} };

/**
 * Kobler fremdriften i nettleseren til den innloggede brukeren:
 * 1. Henter det som ligger i databasen.
 * 2. Slår det sammen med det eleven gjorde før innlogging (fullført/bestått vinner).
 * 3. Lagrer endringer fortløpende i databasen.
 */
export function FremdriftSync({ brukerId }: { brukerId: string }) {
  useEffect(() => {
    const supabase = createClient();
    let avbrutt = false;
    let stopp: (() => void) | undefined;
    let tidtaker: ReturnType<typeof setTimeout> | undefined;
    // Det som sist ble lagret i databasen, for å sende bare endringer.
    let lagret: Fremdrift = TOM;

    async function lagreEndringer() {
      const naa = lesFremdrift();
      if (naa.eier !== brukerId) return;
      const leksjoner = Object.entries(naa.leksjoner)
        .filter(([id, l]) => JSON.stringify(l) !== JSON.stringify(lagret.leksjoner[id]))
        .map(([id, l]) => ({
          user_id: brukerId,
          lesson_id: id,
          status: l.status,
          completed_at: l.completedAt ?? null,
        }));
      const oppgaver = Object.entries(naa.oppgaver)
        .filter(([id, o]) => JSON.stringify(o) !== JSON.stringify(lagret.oppgaver[id]))
        .map(([id, o]) => ({
          user_id: brukerId,
          exercise_id: id,
          passed: o.passed,
          attempts: o.attempts,
          html: o.html ?? null,
          css: o.css ?? null,
        }));
      // Ekstra sider lagres i kolonnen pages for seg, så resten virker selv om
      // migrasjonen som legger den til, ikke er kjørt ennå.
      const medSider = Object.entries(naa.oppgaver)
        .filter(([id, o]) => o.sider && JSON.stringify(o) !== JSON.stringify(lagret.oppgaver[id]))
        .map(([id, o]) => ({ user_id: brukerId, exercise_id: id, pages: o.sider }));
      lagret = naa;
      const svar = await Promise.all([
        leksjoner.length ? supabase.from("lesson_progress").upsert(leksjoner) : null,
        oppgaver.length ? supabase.from("exercise_results").upsert(oppgaver) : null,
      ]);
      for (const s of svar) if (s?.error) console.error("Kunne ikke lagre fremdrift:", s.error.message);
      if (medSider.length && !svar[1]?.error) {
        const { error } = await supabase.from("exercise_results").upsert(medSider);
        if (error) console.error("Kunne ikke lagre sidene i oppgaven (er migrasjonen for pages kjørt?):", error.message);
      }
    }

    async function start() {
      const [l, o, p] = await Promise.all([
        supabase.from("lesson_progress").select("lesson_id, status, completed_at"),
        supabase.from("exercise_results").select("exercise_id, passed, attempts, html, css"),
        // Egen spørring: feiler bare denne om pages-kolonnen mangler.
        supabase.from("exercise_results").select("exercise_id, pages").not("pages", "is", null),
      ]);
      if (avbrutt || l.error || o.error) return;
      const siderFraDb = new Map(
        ((p.data ?? []) as { exercise_id: string; pages: Record<string, string> }[]).map((r) => [
          r.exercise_id,
          r.pages,
        ]),
      );

      const fraDb: Fremdrift = {
        ...TOM,
        eier: brukerId,
        leksjoner: Object.fromEntries(
          (l.data as LeksjonRad[]).map((r) => [
            r.lesson_id,
            { status: r.status, completedAt: r.completed_at ?? undefined },
          ]),
        ),
        oppgaver: Object.fromEntries(
          (o.data as OppgaveRad[]).map((r) => [
            r.exercise_id,
            {
              passed: r.passed,
              attempts: r.attempts,
              html: r.html ?? undefined,
              css: r.css ?? undefined,
              sider: siderFraDb.get(r.exercise_id),
            },
          ]),
        ),
      };

      // Lokal fremdrift fra en annen bruker på samme maskin tas ikke med.
      const lokal = lesFremdrift();
      const egen = !lokal.eier || lokal.eier === brukerId ? lokal : TOM;

      const leksjoner: Record<string, LeksjonStatus> = { ...fraDb.leksjoner };
      for (const [id, s] of Object.entries(egen.leksjoner)) {
        if (!leksjoner[id] || (s.status === "completed" && leksjoner[id].status !== "completed")) {
          leksjoner[id] = s;
        }
      }
      const oppgaver: Record<string, OppgaveStatus> = { ...fraDb.oppgaver };
      for (const [id, s] of Object.entries(egen.oppgaver)) {
        const db = oppgaver[id];
        oppgaver[id] = db
          ? {
              passed: db.passed || s.passed,
              attempts: Math.max(db.attempts, s.attempts),
              html: s.html ?? db.html,
              css: s.css ?? db.css,
              sider: s.sider ?? db.sider,
            }
          : s;
      }

      lagret = fraDb;
      erstattFremdrift({ leksjoner, oppgaver, sjekklister: egen.sjekklister, eier: brukerId });
      await lagreEndringer();

      stopp = lyttPaEndringer(() => {
        clearTimeout(tidtaker);
        tidtaker = setTimeout(lagreEndringer, 800);
      });
    }

    start();
    const lagreFørLukking = () => {
      if (tidtaker) lagreEndringer();
    };
    window.addEventListener("pagehide", lagreFørLukking);
    return () => {
      avbrutt = true;
      stopp?.();
      clearTimeout(tidtaker);
      window.removeEventListener("pagehide", lagreFørLukking);
    };
  }, [brukerId]);

  return null;
}

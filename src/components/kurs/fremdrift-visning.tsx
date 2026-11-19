"use client";

import { useFremdrift } from "./fremdrift";

/** Antall fullførte leksjoner av totalt, for en liste med leksjons-id-er. */
export function FremdriftTeller({ ider }: { ider: string[] }) {
  const f = useFremdrift();
  const ferdige = ider.filter((id) => f.leksjoner[id]?.status === "completed").length;
  const pst = ider.length ? Math.round((ferdige / ider.length) * 100) : 0;
  return (
    <span className="fremdrift">
      <span className="fremdrift__bar">
        <span style={{ width: `${pst}%` }} />
      </span>
      <span className="fremdrift__tekst">
        {ferdige}/{ider.length}
      </span>
    </span>
  );
}

/** Hake eller tom sirkel for én leksjon. */
export function LeksjonHake({ id }: { id: string }) {
  const s = useFremdrift().leksjoner[id]?.status;
  return (
    <span className={`hake hake--${s ?? "ny"}`} aria-label={s === "completed" ? "Fullført" : s === "started" ? "Påbegynt" : "Ikke startet"}>
      {s === "completed" ? "✓" : ""}
    </span>
  );
}

import type { ReactNode } from "react";

/** Kort teoriboks: «Kikk under panseret». */
export function UnderPanseret({ tittel, children }: { tittel: string; children: ReactNode }) {
  return (
    <aside className="boks boks--teori">
      <p className="boks__etikett">🔧 Kikk under panseret</p>
      <p className="boks__tittel">{tittel}</p>
      <div className="boks__innhold">{children}</div>
    </aside>
  );
}

export function Tips({ children }: { children: ReactNode }) {
  return (
    <aside className="boks boks--tips">
      <p className="boks__etikett">💡 Tips</p>
      <div className="boks__innhold">{children}</div>
    </aside>
  );
}

/** Oppgave eleven gjør i sitt eget prosjekt i VSCodium. */
export function GjorDetSelv({ children }: { children: ReactNode }) {
  return (
    <aside className="boks boks--selv">
      <p className="boks__etikett">🛠️ Gjør det i ditt eget prosjekt</p>
      <div className="boks__innhold">{children}</div>
    </aside>
  );
}

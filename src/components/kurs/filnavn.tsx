"use client";

import { useState } from "react";

type Fil = { navn: string; ok: boolean; hvorfor: string };

/** Spill: er dette et godt filnavn på nett? */
export function Filnavn({ filer }: { filer: Fil[] }) {
  const [svar, setSvar] = useState<Record<number, boolean>>({});
  const antallRiktig = Object.entries(svar).filter(([i, v]) => filer[+i].ok === v).length;
  const ferdig = Object.keys(svar).length === filer.length;

  return (
    <div className="filnavn">
      <p className="quiz__etikett">🗂️ Godt eller dårlig filnavn?</p>
      <ul>
        {filer.map((f, i) => {
          const s = svar[i];
          const besvart = s !== undefined;
          const riktig = besvart && s === f.ok;
          return (
            <li key={f.navn} className={besvart ? (riktig ? "riktig" : "feil") : ""}>
              <code className="filnavn__navn">{f.navn}</code>
              {besvart ? (
                <span className="filnavn__hvorfor">
                  <strong>{riktig ? "✓" : "✗"} {f.ok ? "Godt." : "Dårlig."}</strong> {f.hvorfor}
                </span>
              ) : (
                <span className="filnavn__knapper">
                  <button onClick={() => setSvar({ ...svar, [i]: true })}>👍 Godt</button>
                  <button onClick={() => setSvar({ ...svar, [i]: false })}>👎 Dårlig</button>
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {ferdig && (
        <p className="filnavn__resultat" role="status">
          {antallRiktig} av {filer.length} riktige.{" "}
          <button className="lenkeknapp" onClick={() => setSvar({})}>
            Prøv igjen
          </button>
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

type Props = {
  sporsmal: string;
  /** Kode som vises over svaralternativene (valgfritt). */
  kode?: string;
  alternativer: string[];
  riktig: number;
  forklaring: string;
};

/** Gjett-først-spørsmål: eleven velger, og får forklaringen etterpå. */
export function Quiz({ sporsmal, kode, alternativer, riktig, forklaring }: Props) {
  const [valgt, setValgt] = useState<number | null>(null);
  const svart = valgt !== null;

  return (
    <div className="quiz">
      <p className="quiz__etikett">🤔 Gjett først</p>
      <p className="quiz__sporsmal">{sporsmal}</p>
      {kode && (
        <pre className="quiz__kode">
          <code>{kode}</code>
        </pre>
      )}
      <div className="quiz__alternativer">
        {alternativer.map((a, i) => {
          const klasse = !svart
            ? ""
            : i === riktig
              ? "riktig"
              : i === valgt
                ? "feil"
                : "dempet";
          return (
            <button
              key={i}
              className={`quiz__alt ${klasse}`}
              onClick={() => !svart && setValgt(i)}
              disabled={svart}
            >
              <span className="quiz__bokstav">{String.fromCharCode(65 + i)}</span>
              <span>{a}</span>
            </button>
          );
        })}
      </div>
      {svart && (
        <div className={`quiz__svar ${valgt === riktig ? "riktig" : "feil"}`} role="status">
          <strong>{valgt === riktig ? "Riktig!" : "Ikke helt."}</strong> {forklaring}
          <button className="lenkeknapp" onClick={() => setValgt(null)}>
            Prøv igjen
          </button>
        </div>
      )}
    </div>
  );
}

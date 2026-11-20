"use client";

import { useState } from "react";
import { Kode } from "./kodefarger";

const VERDIER = ["inline", "block", "inline-block", "none"] as const;
type Display = (typeof VERDIER)[number];

const BOKSER = [
  { navn: "A", farge: "#e63946" },
  { navn: "B", farge: "#457b9d" },
  { navn: "C", farge: "#2a9d8f" },
] as const;

const FORKLARING: Record<Display, string> = {
  inline: "Ligger inni linja som et ord. width og margin oppe/nede blir ignorert.",
  block: "Tar hele bredden og starter på ny linje. width virker.",
  "inline-block": "Ligger i linja, men er en ekte boks: width, padding og margin virker.",
  none: "Borte – tar ingen plass i det hele tatt.",
};

/** Bytt display på tre bokser midt i en tekst, og se hvordan de legger seg i flyten. */
export function Flytlab() {
  const [display, setDisplay] = useState<Display[]>(["inline", "block", "inline-block"]);

  const css = BOKSER.map(
    (b, i) => `.${b.navn.toLowerCase()} {\n  display: ${display[i]};\n  width: 120px;\n  padding: 10px;\n  margin: 10px;\n}`,
  ).join("\n\n");

  return (
    <div className="flytlab">
      <p className="quiz__etikett">🌊 Normal flyt</p>
      <div className="fl-kontroller">
        {BOKSER.map((b, i) => (
          <label key={b.navn} className="fl-velg">
            <span className="fl-merke" style={{ background: b.farge }}>
              {b.navn}
            </span>
            <select
              value={display[i]}
              onChange={(e) => setDisplay(display.map((d, j) => (j === i ? (e.target.value as Display) : d)))}
            >
              {VERDIER.map((v) => (
                <option key={v} value={v}>
                  display: {v}
                </option>
              ))}
            </select>
            <span className="fl-forklaring">{FORKLARING[display[i]]}</span>
          </label>
        ))}
      </div>

      <div className="fl-ark">
        Her er litt tekst før boksene, så du ser hvordan de legger seg i linja.{" "}
        {BOKSER.map((b, i) => (
          <span key={b.navn}>
            <span
              className="fl-boks"
              style={{
                display: display[i],
                width: 120,
                padding: 10,
                margin: 10,
                background: b.farge,
              }}
            >
              Boks {b.navn}
            </span>{" "}
            {i < 2 ? "og litt mer tekst " : ""}
          </span>
        ))}
        – og her slutter avsnittet.
      </div>

      <pre className="bm-kode">
        <Kode sprak="css" kode={css} />
      </pre>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Kode } from "./kodefarger";

const VALG = {
  "flex-direction": ["row", "row-reverse", "column", "column-reverse"],
  "justify-content": ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
  "align-items": ["stretch", "flex-start", "center", "flex-end"],
  "flex-wrap": ["nowrap", "wrap"],
} as const;
type Egenskap = keyof typeof VALG;

const FARGER = ["#e63946", "#f4a261", "#2a9d8f", "#457b9d", "#8338ec", "#1d3557", "#e9c46a", "#264653"];
// Litt forskjellig størrelse, så align-items og wrap synes.
const STØRRELSE = [
  [70, 46],
  [56, 70],
  [90, 34],
  [60, 56],
  [76, 40],
  [50, 64],
  [84, 50],
  [64, 36],
];

/** Sandkasse for flexbox: endre containerens egenskaper og se boksene flytte seg. Aksene tegnes inn. */
export function Flekslab() {
  const [v, setV] = useState<Record<Egenskap, string>>({
    "flex-direction": "row",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "flex-wrap": "nowrap",
  });
  const [gap, setGap] = useState(10);
  const [antall, setAntall] = useState(4);

  const kolonne = v["flex-direction"].startsWith("column");
  const omvendt = v["flex-direction"].endsWith("reverse");
  const css = `.container {\n  display: flex;\n${(Object.keys(v) as Egenskap[])
    .map((e) => `  ${e}: ${v[e]};`)
    .join("\n")}\n  gap: ${gap}px;\n}`;

  return (
    <div className="flekslab">
      <p className="quiz__etikett">🧩 Fleks-lab</p>
      <div className="fx-kontroller">
        {(Object.keys(VALG) as Egenskap[]).map((e) => (
          <label key={e} className="fx-valg">
            <code>{e}</code>
            <select value={v[e]} onChange={(ev) => setV({ ...v, [e]: ev.target.value })}>
              {VALG[e].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        ))}
        <label className="bm-glider">
          <span className="bm-glider__navn">
            <code>gap</code>
          </span>
          <input type="range" min={0} max={40} value={gap} onChange={(e) => setGap(Number(e.target.value))} />
          <span className="bm-glider__verdi">{gap}px</span>
        </label>
        <label className="bm-glider">
          <span className="bm-glider__navn">Antall bokser</span>
          <input type="range" min={1} max={8} value={antall} onChange={(e) => setAntall(Number(e.target.value))} />
          <span className="bm-glider__verdi">{antall}</span>
        </label>
      </div>

      <div className={`fx-scene ${kolonne ? "fx-scene--kolonne" : ""}`}>
        <span className={`fx-akse fx-akse--hoved ${kolonne ? "loddrett" : "vannrett"} ${omvendt ? "omvendt" : ""}`}>
          hovedakse
        </span>
        <span className={`fx-akse fx-akse--tverr ${kolonne ? "vannrett" : "loddrett"}`}>tverrakse</span>
        <div
          className="fx-container"
          style={{
            display: "flex",
            flexDirection: v["flex-direction"] as React.CSSProperties["flexDirection"],
            justifyContent: v["justify-content"],
            alignItems: v["align-items"],
            flexWrap: v["flex-wrap"] as React.CSSProperties["flexWrap"],
            gap,
          }}
        >
          {Array.from({ length: antall }, (_, i) => (
            <div
              key={i}
              className="fx-boks"
              style={{
                background: FARGER[i],
                // Med stretch skal størrelsen på tverraksen ikke være låst.
                width: kolonne && v["align-items"] === "stretch" ? undefined : STØRRELSE[i][0],
                height: !kolonne && v["align-items"] === "stretch" ? undefined : STØRRELSE[i][1],
                minHeight: 30,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <pre className="bm-kode">
        <Kode sprak="css" kode={css} />
      </pre>
    </div>
  );
}

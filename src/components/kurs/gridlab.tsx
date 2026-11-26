"use client";

import { useState } from "react";
import { Kode } from "./kodefarger";

const KOLONNER = [
  "1fr 1fr 1fr",
  "200px 1fr",
  "1fr 2fr 1fr",
  "repeat(4, 1fr)",
  "repeat(auto-fit, minmax(100px, 1fr))",
];

const OMRÅDER_START = `"topp topp"
"meny innhold"
"bunn bunn"`;

const DELER = [
  { navn: "topp", farge: "#1d3557" },
  { navn: "meny", farge: "#457b9d" },
  { navn: "innhold", farge: "#2a9d8f" },
  { navn: "side", farge: "#e9c46a" },
  { navn: "bunn", farge: "#264653" },
];
const FARGER = ["#e63946", "#f4a261", "#2a9d8f", "#457b9d", "#8338ec", "#1d3557", "#e9c46a", "#264653", "#6d597a"];

/** CSS.supports finnes bare i nettleseren; uten den godtar vi verdien. */
const gyldig = (egenskap: string, verdi: string) =>
  typeof CSS === "undefined" || CSS.supports(egenskap, verdi);

/** Sandkasse for grid: kolonner med fr og repeat, eller et helt sideoppsett med grid-template-areas. */
export function Gridlab() {
  const [modus, setModus] = useState<"kolonner" | "omrader">("kolonner");
  const [kolonner, setKolonner] = useState(KOLONNER[0]);
  const [antall, setAntall] = useState(6);
  const [gap, setGap] = useState(10);
  const [bredde, setBredde] = useState(100);
  const [områder, setOmråder] = useState(OMRÅDER_START);
  const [områdeKolonner, setOmrådeKolonner] = useState("150px 1fr");

  const kolonnerOk = gyldig("grid-template-columns", kolonner);
  const områderTekst = områder.replace(/\s*\n\s*/g, " ");
  const områderOk = gyldig("grid-template-areas", områderTekst) && gyldig("grid-template-columns", områdeKolonner);
  const brukteNavn = new Set(områder.match(/[a-zæøå-]+/gi) ?? []);

  const css =
    modus === "kolonner"
      ? `.rutenett {\n  display: grid;\n  grid-template-columns: ${kolonner};\n  gap: ${gap}px;\n}`
      : `.side {\n  display: grid;\n  grid-template-columns: ${områdeKolonner};\n  grid-template-areas:\n    ${områder.split("\n").join("\n    ")};\n  gap: ${gap}px;\n}\n\n${DELER.filter((d) => brukteNavn.has(d.navn))
          .map((d) => `.${d.navn} { grid-area: ${d.navn}; }`)
          .join("\n")}`;

  return (
    <div className="gridlab">
      <p className="quiz__etikett">🔲 Grid-lab</p>
      <div className="kt-faner" role="tablist">
        <button role="tab" aria-selected={modus === "kolonner"} className="fv-fane" onClick={() => setModus("kolonner")}>
          Kolonner
        </button>
        <button role="tab" aria-selected={modus === "omrader"} className="fv-fane" onClick={() => setModus("omrader")}>
          Områder
        </button>
      </div>

      {modus === "kolonner" ? (
        <div className="gl-kontroller">
          <label className="gl-felt">
            <code>grid-template-columns</code>
            <input value={kolonner} onChange={(e) => setKolonner(e.target.value)} spellCheck={false} />
            {!kolonnerOk && <span className="gl-feil">Ikke en gyldig verdi (ennå).</span>}
          </label>
          <div className="sv-eksempler">
            {KOLONNER.map((k) => (
              <button key={k} className="fv-fane" aria-pressed={kolonner === k} onClick={() => setKolonner(k)}>
                <code>{k}</code>
              </button>
            ))}
          </div>
          <label className="bm-glider">
            <span className="bm-glider__navn">Antall bokser</span>
            <input type="range" min={1} max={9} value={antall} onChange={(e) => setAntall(Number(e.target.value))} />
            <span className="bm-glider__verdi">{antall}</span>
          </label>
          <label className="bm-glider">
            <span className="bm-glider__navn">Bredden på containeren</span>
            <input type="range" min={30} max={100} value={bredde} onChange={(e) => setBredde(Number(e.target.value))} />
            <span className="bm-glider__verdi">{bredde}%</span>
          </label>
        </div>
      ) : (
        <div className="gl-kontroller">
          <label className="gl-felt">
            <code>grid-template-areas</code>
            <textarea value={områder} onChange={(e) => setOmråder(e.target.value)} rows={4} spellCheck={false} />
          </label>
          <label className="gl-felt">
            <code>grid-template-columns</code>
            <input value={områdeKolonner} onChange={(e) => setOmrådeKolonner(e.target.value)} spellCheck={false} />
          </label>
          <p className="gl-hjelp">
            Navnene du kan bruke: {DELER.map((d) => <code key={d.navn}>{d.navn}</code>)}. Hver rad står i
            anførselstegn, og alle radene må ha like mange kolonner. Et punktum <code>.</code> er en tom rute.
          </p>
          {!områderOk && <span className="gl-feil">Områdene henger ikke sammen ennå – sjekk at radene har like mange ord, og at hvert område er et rektangel.</span>}
        </div>
      )}

      <label className="bm-glider gl-gap">
        <span className="bm-glider__navn">
          <code>gap</code>
        </span>
        <input type="range" min={0} max={30} value={gap} onChange={(e) => setGap(Number(e.target.value))} />
        <span className="bm-glider__verdi">{gap}px</span>
      </label>

      <div className="gl-scene">
        {modus === "kolonner" ? (
          <div
            className="gl-rutenett"
            style={{ width: `${bredde}%`, display: "grid", gridTemplateColumns: kolonnerOk ? kolonner : undefined, gap }}
          >
            {Array.from({ length: antall }, (_, i) => (
              <div key={i} className="gl-boks" style={{ background: FARGER[i] }}>
                {i + 1}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="gl-rutenett gl-rutenett--side"
            style={
              områderOk
                ? { display: "grid", gridTemplateColumns: områdeKolonner, gridTemplateAreas: områderTekst, gap }
                : { display: "grid", gap }
            }
          >
            {DELER.filter((d) => brukteNavn.has(d.navn)).map((d) => (
              <div key={d.navn} className="gl-boks" style={{ background: d.farge, gridArea: områderOk ? d.navn : undefined }}>
                {d.navn}
              </div>
            ))}
          </div>
        )}
      </div>

      <pre className="bm-kode">
        <Kode sprak="css" kode={css} />
      </pre>
    </div>
  );
}

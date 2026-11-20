"use client";

import { useEffect, useRef, useState } from "react";
import { Kode } from "./kodefarger";

const GRUNN = `body { margin: 0; font: 15px/1.5 system-ui, sans-serif; color: #1d3557; }
header { display: flex; flex-direction: column; gap: 6px; padding: 12px 16px; background: #1d3557; color: #fff; }
header b { font-size: 18px; }
nav { display: flex; flex-wrap: wrap; gap: 12px; }
main { padding: 12px 16px; }
.kort { display: grid; gap: 10px; }
.kort div { padding: 16px; border-radius: 8px; background: #a8dadc; }`;

const SPØRRINGER = [
  {
    min: 600,
    css: `header {\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.kort {\n  grid-template-columns: 1fr 1fr;\n}`,
    tekst: "Logo og meny på én linje, to kolonner med kort",
  },
  {
    min: 900,
    css: `.kort {\n  grid-template-columns: repeat(3, 1fr);\n}`,
    tekst: "Tre kolonner med kort",
  },
];

const HTML = `<header><b>Fjellklubben</b><nav><span>Turer</span><span>Om oss</span><span>Kontakt</span></nav></header>
<main><div class="kort"><div>Fløyen</div><div>Ulriken</div><div>Stoltzen</div><div>Lyderhorn</div><div>Rundemanen</div><div>Sandviken</div></div></main>`;

const srcDoc = `<style>${GRUNN}\n${SPØRRINGER.map((s) => `@media (min-width: ${s.min}px) {\n${s.css}\n}`).join("\n")}</style>${HTML}`;

const FORHÅNDSVALG = [
  { navn: "Liten mobil", px: 320 },
  { navn: "Mobil", px: 390 },
  { navn: "Nettbrett", px: 768 },
  { navn: "PC", px: 1200 },
];

/** Dra i bredden på en mobil-først-side, og se hvilke media queries som slår inn. */
export function Skjermbredde() {
  const [bredde, setBredde] = useState(390);
  const flate = useRef<HTMLDivElement>(null);
  const [plass, setPlass] = useState(700);

  useEffect(() => {
    const el = flate.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setPlass(e.contentRect.width));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const skala = Math.min(1, plass / bredde);
  const høyde = 300;

  return (
    <div className="skjermbredde">
      <p className="quiz__etikett">📱 Skjermbredde</p>
      <label className="bm-glider">
        <span className="bm-glider__navn">Bredden på skjermen</span>
        <input type="range" min={280} max={1300} step={10} value={bredde} onChange={(e) => setBredde(Number(e.target.value))} />
        <span className="bm-glider__verdi">{bredde}px</span>
      </label>
      <div className="sv-eksempler">
        {FORHÅNDSVALG.map((f) => (
          <button key={f.navn} className="fv-fane" aria-pressed={bredde === f.px} onClick={() => setBredde(f.px)}>
            {f.navn} <span className="sb-px">{f.px}</span>
          </button>
        ))}
      </div>

      <div ref={flate} className="sb-flate" style={{ height: høyde * skala + 4 }}>
        <iframe
          title="Responsiv eksempelside"
          sandbox=""
          srcDoc={srcDoc}
          className="sb-ramme"
          style={{ width: bredde, height: høyde, transform: `scale(${skala})` }}
        />
      </div>
      {skala < 1 && <p className="sb-skala">Vist i {Math.round(skala * 100)} % – siden tror den er {bredde} piksler bred.</p>}

      <ul className="sb-sporringer">
        <li className="aktiv">
          <span className="sb-merke">Alltid</span>
          Mobiloppsettet: alt under hverandre, ett kort i bredden
        </li>
        {SPØRRINGER.map((s) => (
          <li key={s.min} className={bredde >= s.min ? "aktiv" : ""}>
            <span className="sb-merke">
              <code>min-width: {s.min}px</code>
            </span>
            {s.tekst}
          </li>
        ))}
      </ul>

      <details className="sl-kode">
        <summary>Se media queriene</summary>
        <pre className="bm-kode">
          <Kode
            sprak="css"
            kode={SPØRRINGER.map((s) => `@media (min-width: ${s.min}px) {\n${s.css.replace(/^/gm, "  ")}\n}`).join("\n\n")}
          />
        </pre>
      </details>
    </div>
  );
}

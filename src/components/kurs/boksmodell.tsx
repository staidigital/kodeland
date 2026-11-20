"use client";

import { useState } from "react";
import { Kode } from "./kodefarger";

const BREDDE = 160;
const GLIDERE = [
  { navn: "padding", tekst: "Padding – luft inni", maks: 40 },
  { navn: "border", tekst: "Border – kanten", maks: 16 },
  { navn: "margin", tekst: "Margin – luft utenfor", maks: 40 },
] as const;
type Navn = (typeof GLIDERE)[number]["navn"];

/**
 * Lekeplass for boksmodellen: glidere for padding, border og margin, et diagram som i
 * utviklerverktøyet, en ekte boks som endrer seg, og regnestykket for bredden.
 */
export function Boksmodell() {
  const [v, setV] = useState<Record<Navn, number>>({ padding: 16, border: 4, margin: 16 });
  const [borderBox, setBorderBox] = useState(false);

  const totalt = borderBox ? BREDDE : BREDDE + 2 * v.padding + 2 * v.border;
  const innhold = borderBox ? Math.max(0, BREDDE - 2 * v.padding - 2 * v.border) : BREDDE;
  const css = `.boks {\n  width: ${BREDDE}px;\n  padding: ${v.padding}px;\n  border: ${v.border}px solid #1d3557;\n  margin: ${v.margin}px;${borderBox ? "\n  box-sizing: border-box;" : ""}\n}`;

  return (
    <div className="boksmodell">
      <p className="quiz__etikett">📦 Boksmodellen</p>

      <div className="bm-flate">
        <div className="bm-glidere">
          {GLIDERE.map((g) => (
            <label key={g.navn} className={`bm-glider bm-glider--${g.navn}`}>
              <span className="bm-glider__navn">{g.tekst}</span>
              <input
                type="range"
                min={0}
                max={g.maks}
                value={v[g.navn]}
                onChange={(e) => setV({ ...v, [g.navn]: Number(e.target.value) })}
              />
              <span className="bm-glider__verdi">{v[g.navn]}px</span>
            </label>
          ))}
          <label className="bm-bryter">
            <input type="checkbox" checked={borderBox} onChange={(e) => setBorderBox(e.target.checked)} />
            <span>
              <code>box-sizing: border-box</code>
            </span>
          </label>
        </div>

        <div className="bm-diagram" aria-hidden="true">
          <div className="bm-lag bm-lag--margin">
            <span className="bm-etikett">margin</span>
            <span className="bm-tall bm-tall--topp">{v.margin}</span>
            <div className="bm-lag bm-lag--border">
              <span className="bm-etikett">border</span>
              <span className="bm-tall bm-tall--topp">{v.border}</span>
              <div className="bm-lag bm-lag--padding">
                <span className="bm-etikett">padding</span>
                <span className="bm-tall bm-tall--topp">{v.padding}</span>
                <div className="bm-lag bm-lag--innhold">{innhold} × auto</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bm-scene" aria-label="Forhåndsvisning av boksen">
        <div
          className="bm-boks"
          style={{
            width: BREDDE,
            padding: v.padding,
            borderWidth: v.border,
            margin: v.margin,
            boxSizing: borderBox ? "border-box" : "content-box",
          }}
        >
          Teksten i boksen
        </div>
        <div className="bm-nabo">En boks til</div>
      </div>

      <p className="bm-regnestykke">
        Bredde på skjermen:{" "}
        {borderBox ? (
          <>
            <strong>{totalt}px</strong> – padding og border ligger <em>inni</em> de {BREDDE}px, så innholdet
            krymper til {innhold}px.
          </>
        ) : (
          <>
            {BREDDE} + {v.padding} + {v.padding} + {v.border} + {v.border} = <strong>{totalt}px</strong>
            <span className="bm-forklaring"> (width + padding på begge sider + border på begge sider)</span>
          </>
        )}
      </p>

      <pre className="bm-kode">
        <Kode sprak="css" kode={css} />
      </pre>
    </div>
  );
}

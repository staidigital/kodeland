"use client";

import { useState } from "react";
import { type Hsl, hslTilRgb, kontrast, tilHex } from "@/lib/farger";
import { Kode } from "./kodefarger";

type Hvilken = "tekst" | "bakgrunn";

const NAVN: Record<Hvilken, string> = { tekst: "Tekstfarge", bakgrunn: "Bakgrunnsfarge" };
const GLIDERE = [
  { i: 0, navn: "Fargetone", kort: "h", maks: 360, enhet: "" },
  { i: 1, navn: "Metning", kort: "s", maks: 100, enhet: "%" },
  { i: 2, navn: "Lyshet", kort: "l", maks: 100, enhet: "%" },
] as const;

const hslTekst = ([h, s, l]: Hsl) => `hsl(${h}, ${s}%, ${l}%)`;

/** Bakgrunnen til en glider: viser hva som skjer når akkurat den verdien endres. */
function gliderSpor(hsl: Hsl, i: 0 | 1 | 2) {
  const steg = i === 0 ? [0, 60, 120, 180, 240, 300, 360] : [0, 25, 50, 75, 100];
  return `linear-gradient(to right, ${steg
    .map((v) => {
      const f = [...hsl] as Hsl;
      f[i] = v;
      return hslTekst(f);
    })
    .join(", ")})`;
}

/**
 * Lekeplass for farger: velg tekst- og bakgrunnsfarge med HSL-glidere,
 * se hex- og hsl-koden, og mål kontrasten mellom dem.
 */
export function Fargevelger() {
  const [farger, setFarger] = useState<Record<Hvilken, Hsl>>({
    tekst: [220, 60, 25],
    bakgrunn: [45, 90, 92],
  });
  const [aktiv, setAktiv] = useState<Hvilken>("tekst");

  const rgb = { tekst: hslTilRgb(farger.tekst), bakgrunn: hslTilRgb(farger.bakgrunn) };
  const hex = { tekst: tilHex(rgb.tekst), bakgrunn: tilHex(rgb.bakgrunn) };
  const forhold = kontrast(rgb.tekst, rgb.bakgrunn);
  const vurdering =
    forhold >= 7
      ? { klasse: "ok", tekst: "Utmerket – lett å lese for alle." }
      : forhold >= 4.5
        ? { klasse: "ok", tekst: "Godkjent for vanlig tekst." }
        : forhold >= 3
          ? { klasse: "middels", tekst: "Bare godt nok for stor tekst, som overskrifter." }
          : { klasse: "feil", tekst: "For lav kontrast – vanskelig å lese." };

  const sett = (i: 0 | 1 | 2, v: number) =>
    setFarger((f) => {
      const ny = [...f[aktiv]] as Hsl;
      ny[i] = v;
      return { ...f, [aktiv]: ny };
    });

  return (
    <div className="fargevelger">
      <p className="quiz__etikett">🎨 Fargevelger</p>

      <div
        className="fv-forhandsvisning"
        style={{ color: hex.tekst, backgroundColor: hex.bakgrunn }}
      >
        <p className="fv-stor">Overskrift</p>
        <p>Slik ser vanlig tekst ut med disse fargene.</p>
      </div>

      <div className="fv-kontrast">
        <span className="fv-tall">{forhold.toFixed(1).replace(".", ",")}:1</span>
        <span className={`fv-vurdering fv-vurdering--${vurdering.klasse}`}>{vurdering.tekst}</span>
      </div>

      <div className="fv-faner" role="tablist">
        {(["tekst", "bakgrunn"] as const).map((h) => (
          <button
            key={h}
            role="tab"
            aria-selected={aktiv === h}
            className="fv-fane"
            onClick={() => setAktiv(h)}
          >
            <span className="fv-prikk" style={{ backgroundColor: hex[h] }} />
            {NAVN[h]}
          </button>
        ))}
      </div>

      <div className="fv-glidere">
        {GLIDERE.map((g) => (
          <label key={g.kort} className="fv-glider">
            <span className="fv-glider__navn">
              {g.navn} <code>{g.kort}</code>
            </span>
            <input
              type="range"
              min={0}
              max={g.maks}
              value={farger[aktiv][g.i]}
              onChange={(e) => sett(g.i, Number(e.target.value))}
              style={{ background: gliderSpor(farger[aktiv], g.i) }}
            />
            <span className="fv-glider__verdi">
              {farger[aktiv][g.i]}
              {g.enhet}
            </span>
          </label>
        ))}
      </div>

      <dl className="fv-koder">
        {(["tekst", "bakgrunn"] as const).map((h) => (
          <div key={h}>
            <dt>{NAVN[h]}</dt>
            <dd>
              <code>{hex[h]}</code> <span aria-hidden="true">=</span>{" "}
              <code>{hslTekst(farger[h])}</code>
            </dd>
          </div>
        ))}
      </dl>

      <pre className="fv-kode">
        <Kode
          sprak="css"
          kode={`body {\n  color: ${hex.tekst};\n  background-color: ${hex.bakgrunn};\n}`}
        />
      </pre>
    </div>
  );
}

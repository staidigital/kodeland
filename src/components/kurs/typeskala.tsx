"use client";

import { useState } from "react";
import { Kode } from "./kodefarger";

const FORHOLD = [
  { tall: 1.125, navn: "1,125 – svak" },
  { tall: 1.2, navn: "1,2 – liten ters" },
  { tall: 1.25, navn: "1,25 – stor ters" },
  { tall: 1.333, navn: "1,333 – kvart" },
  { tall: 1.5, navn: "1,5 – kvint" },
  { tall: 1.618, navn: "1,618 – det gylne snitt" },
];

const NIVÅER = [
  { tag: "h1", tekst: "Fjellturer i Vestland", trinn: 3 },
  { tag: "h2", tekst: "Ulriken fra sør", trinn: 2 },
  { tag: "h3", tekst: "Hva du trenger", trinn: 1 },
  { tag: "p", tekst: "Gode sko, niste og vann. Turen tar rundt tre timer.", trinn: 0 },
] as const;

const rund = (n: number) => Number(n.toFixed(3)).toString();

/** Velg grunnstørrelse og forhold, og se overskriftene vokse i en typografisk skala. */
export function Typeskala() {
  const [grunn, setGrunn] = useState(16);
  const [forhold, setForhold] = useState(2);
  const r = FORHOLD[forhold].tall;
  const rem = (trinn: number) => r ** trinn;

  const css = NIVÅER.map((n) => `${n.tag} { font-size: ${rund(rem(n.trinn))}rem; }`).join("\n");

  return (
    <div className="typeskala">
      <p className="quiz__etikett">📐 Typografisk skala</p>
      <div className="ts-kontroller">
        <label className="bm-glider">
          <span className="bm-glider__navn">Grunnstørrelse (1rem)</span>
          <input type="range" min={14} max={20} value={grunn} onChange={(e) => setGrunn(Number(e.target.value))} />
          <span className="bm-glider__verdi">{grunn}px</span>
        </label>
        <label className="ts-forhold">
          <span className="bm-glider__navn">Forhold mellom trinnene</span>
          <select value={forhold} onChange={(e) => setForhold(Number(e.target.value))}>
            {FORHOLD.map((f, i) => (
              <option key={f.tall} value={i}>
                {f.navn}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="ts-ark">
        {NIVÅER.map((n) => {
          const px = grunn * rem(n.trinn);
          return (
            <div key={n.tag} className="ts-rad">
              <span className="ts-merke">
                <code>{n.tag}</code>
                <span>
                  {rund(rem(n.trinn))}rem · {Math.round(px)}px
                </span>
              </span>
              <span className="ts-tekst" style={{ fontSize: px, fontWeight: n.tag === "p" ? 400 : 700 }}>
                {n.tekst}
              </span>
            </div>
          );
        })}
      </div>

      <p className="ts-forklaring">
        Hvert trinn er {String(r).replace(".", ",")} ganger større enn trinnet under:{" "}
        {grunn}px × {String(r).replace(".", ",")} = {Math.round(grunn * r)}px, × {String(r).replace(".", ",")} ={" "}
        {Math.round(grunn * r * r)}px …
      </p>

      <pre className="bm-kode">
        <Kode sprak="css" kode={css} />
      </pre>
    </div>
  );
}

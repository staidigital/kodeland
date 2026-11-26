"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Kode } from "./kodefarger";

const SKRIFTER = [
  { navn: "Georgia", css: "Georgia, serif" },
  { navn: "Verdana", css: "Verdana, sans-serif" },
  { navn: "System", css: "system-ui, sans-serif" },
  { navn: "Courier", css: '"Courier New", monospace' },
];

const TEKST =
  "Fjellet ligger stille i morgenlyset. Vi pakker sekken med niste, ekstra sokker og en termos med kakao, og begynner å gå før sola har rukket over toppen. Stien er bratt i starten, men når vi kommer over tregrensen, åpner landskapet seg, og vi ser helt ut til havet. Det er slike dager man husker hele vinteren.";

/**
 * Lekeplass for lesbar tekst: skriftstørrelse, linjeavstand, linjelengde og skrift,
 * med tegn per linje regnet ut av nettleseren.
 */
export function Typografilab() {
  const [storrelse, setStorrelse] = useState(17);
  const [linje, setLinje] = useState(1.2);
  const [bredde, setBredde] = useState(110);
  const [skrift, setSkrift] = useState(0);
  const [tegn, setTegn] = useState<number | null>(null);
  const avsnitt = useRef<HTMLParagraphElement>(null);
  const null0 = useRef<HTMLSpanElement>(null);

  // Tegn per linje: bredden på avsnittet delt på bredden av ett tegn («0», som er det CSS kaller 1ch).
  useLayoutEffect(() => {
    const p = avsnitt.current;
    const n = null0.current;
    if (!p || !n) return;
    const regn = () => setTegn(Math.round(p.getBoundingClientRect().width / n.getBoundingClientRect().width));
    regn();
    const obs = new ResizeObserver(regn);
    obs.observe(p);
    return () => obs.disconnect();
  }, [storrelse, bredde, skrift]);

  const linjeOk = linje >= 1.4 && linje <= 1.8;
  const tegnOk = tegn !== null && tegn >= 45 && tegn <= 80;
  const fontCss = SKRIFTER[skrift].css;
  const css = `p {\n  font-family: ${fontCss};\n  font-size: ${(storrelse / 16).toFixed(3).replace(/\.?0+$/, "")}rem;\n  line-height: ${linje};\n  max-width: ${bredde}ch;\n}`;

  return (
    <div className="typografilab">
      <p className="quiz__etikett">🔤 Typografilab</p>

      <div className="tl-kontroller">
        <label className="bm-glider">
          <span className="bm-glider__navn">Skriftstørrelse</span>
          <input type="range" min={12} max={24} value={storrelse} onChange={(e) => setStorrelse(Number(e.target.value))} />
          <span className="bm-glider__verdi">{storrelse}px</span>
        </label>
        <label className="bm-glider">
          <span className="bm-glider__navn">Linjeavstand (line-height)</span>
          <input type="range" min={0.9} max={2.4} step={0.1} value={linje} onChange={(e) => setLinje(Number(e.target.value))} />
          <span className="bm-glider__verdi">{linje.toFixed(1).replace(".", ",")}</span>
        </label>
        <label className="bm-glider">
          <span className="bm-glider__navn">Linjelengde (max-width)</span>
          <input type="range" min={20} max={140} step={5} value={bredde} onChange={(e) => setBredde(Number(e.target.value))} />
          <span className="bm-glider__verdi">{bredde}ch</span>
        </label>
        <div className="tl-skrifter" role="radiogroup" aria-label="Skrift">
          {SKRIFTER.map((s, i) => (
            <button
              key={s.navn}
              role="radio"
              aria-checked={skrift === i}
              className="fv-fane"
              style={{ fontFamily: s.css }}
              onClick={() => setSkrift(i)}
            >
              {s.navn}
            </button>
          ))}
        </div>
      </div>

      <div className="tl-ark">
        <p
          ref={avsnitt}
          style={{ fontFamily: fontCss, fontSize: storrelse, lineHeight: linje, maxWidth: `${bredde}ch` }}
        >
          {TEKST}
        </p>
        <span ref={null0} className="tl-maal" style={{ fontFamily: fontCss, fontSize: storrelse }} aria-hidden="true">
          0
        </span>
      </div>

      <ul className="tl-dom">
        <li className={tegnOk ? "ok" : "feil"}>
          {tegn === null ? "…" : `Ca. ${tegn} tegn per linje`} –{" "}
          {tegn === null
            ? ""
            : tegn < 45
              ? "for kort: øyet må hoppe til ny linje hele tiden."
              : tegn > 80
                ? "for lang: det er vanskelig å finne starten på neste linje."
                : "fint! 45–75 tegn er lettest å lese."}
        </li>
        <li className={linjeOk ? "ok" : "feil"}>
          Linjeavstand {linje.toFixed(1).replace(".", ",")} –{" "}
          {linje < 1.4 ? "for tett: linjene klistrer seg til hverandre." : linje > 1.8 ? "for luftig: teksten faller fra hverandre." : "fint! 1,4–1,7 passer for brødtekst."}
        </li>
        <li className={storrelse >= 16 ? "ok" : "feil"}>
          {storrelse}px – {storrelse >= 16 ? "god størrelse for brødtekst." : "litt smått for brødtekst. 16px er nettleserens standard."}
        </li>
      </ul>

      <pre className="bm-kode">
        <Kode sprak="css" kode={css} />
      </pre>
    </div>
  );
}

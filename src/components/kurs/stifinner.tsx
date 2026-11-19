"use client";

import { useState } from "react";

/** Prosjektmappen i stifinneren. Mapper slutter på «/». */
const TRE = [
  "index.html",
  "om-meg.html",
  "style.css",
  "bilder/",
  "bilder/katt.jpg",
  "bilder/logo.png",
  "sider/",
  "sider/kontakt.html",
  "sider/hobbyer.html",
];
const SIDER = TRE.filter((f) => f.endsWith(".html"));

const mappeAv = (fil: string) => fil.split("/").slice(0, -1);

/** Relativ sti fra `fra` til `til`, med en forklaring for hvert ledd. */
function relativSti(fra: string, til: string) {
  const fraMappe = mappeAv(fra);
  const tilDeler = til.split("/");
  let felles = 0;
  while (felles < fraMappe.length && felles < tilDeler.length - 1 && fraMappe[felles] === tilDeler[felles]) {
    felles++;
  }
  const ledd: { del: string; forklaring: string }[] = [];
  let her = fraMappe.slice();
  for (let i = felles; i < fraMappe.length; i++) {
    her = her.slice(0, -1);
    ledd.push({ del: "../", forklaring: `opp ett nivå, til ${her.length ? her.join("/") + "/" : "webkurs/"}` });
  }
  for (const d of tilDeler.slice(felles, -1)) {
    ledd.push({ del: `${d}/`, forklaring: `inn i mappen ${d}` });
  }
  const navn = tilDeler.at(-1)!;
  ledd.push({ del: navn, forklaring: `fila ${navn}` });
  return ledd;
}

/** Velg hvor du står og hvor du skal, og se den relative stien bygges opp ledd for ledd. */
export function Stifinner() {
  const [fra, setFra] = useState("sider/kontakt.html");
  const [til, setTil] = useState("bilder/katt.jpg");
  const ledd = relativSti(fra, til);
  const startMappe = mappeAv(fra);

  return (
    <div className="stifinner">
      <p className="quiz__etikett">🧭 Stifinner</p>
      <p className="sf-instruks">
        Velg siden du står på, og klikk på fila du vil lenke til i mappen.
      </p>

      <div className="sf-rad">
        <span className="sf-etikett">Du står i</span>
        <div className="sf-valg">
          {SIDER.map((s) => (
            <button key={s} className="fv-fane" aria-pressed={fra === s} onClick={() => setFra(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="sf-flate">
        <ul className="sf-tre" aria-label="Prosjektmappen webkurs">
          <li className="sf-mappe">webkurs/</li>
          {TRE.map((f) => {
            const dybde = f.split("/").length - (f.endsWith("/") ? 1 : 0);
            const navn = f.endsWith("/") ? f.split("/").at(-2) + "/" : f.split("/").at(-1);
            const klasse = [
              f.endsWith("/") ? "sf-mappe" : "",
              f === fra ? "sf-her" : "",
              f === til ? "sf-mal" : "",
            ].join(" ");
            return (
              <li key={f} className={klasse} style={{ paddingLeft: `${dybde * 18}px` }}>
                {f.endsWith("/") ? (
                  navn
                ) : (
                  <button onClick={() => setTil(f)} disabled={f === fra} aria-pressed={f === til}>
                    {navn}
                    {f === fra && <span className="sf-merke">du er her</span>}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <div className="sf-resultat">
          <p className="sf-etikett">Relativ sti fra {fra} til {til}</p>
          <p className="sf-sti">
            {ledd.map((l, i) => (
              <span key={i} className={l.del.startsWith("..") ? "sf-opp" : l.del.endsWith("/") ? "sf-inn" : "sf-fil"}>
                {l.del}
              </span>
            ))}
          </p>
          <ol className="sf-ledd">
            <li>
              Start i mappen der {fra.split("/").at(-1)} ligger:{" "}
              <code>{startMappe.length ? startMappe.join("/") + "/" : "webkurs/"}</code>
            </li>
            {ledd.map((l, i) => (
              <li key={i}>
                <code>{l.del}</code> – {l.forklaring}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

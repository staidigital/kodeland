"use client";

import { useState } from "react";
import { sammenlign, spesifisitet } from "@/lib/spesifisitet";
import { Kode } from "./kodefarger";

type Runde = {
  html: string;
  regler: [string, string];
  /** Forklaring når reglene har lik spesifisitet (rekkefølgen avgjør). */
  hint?: string;
};

// Hver regel setter color; den som vinner, bestemmer fargen. Begge reglene skal treffe det
// innerste elementet i HTML-en – ellers handler runden ikke om spesifisitet.
const FARGER = ["crimson", "royalblue"] as const;

const RUNDER: Runde[] = [
  { html: '<p class="ingress">Hei!</p>', regler: ["p", ".ingress"] },
  { html: '<a id="kontakt" class="knapp">Kontakt</a>', regler: ["#kontakt", ".knapp"] },
  { html: "<h1>Fjellklubben</h1>", regler: ["h1", "h1"], hint: "Like sterke – da vinner den som står sist." },
  { html: '<nav>\n  <a href="#">Turer</a>\n</nav>', regler: ["nav a", "a"] },
  { html: '<nav>\n  <ul>\n    <li class="aktiv">\n      <a href="#">Turer</a>\n    </li>\n  </ul>\n</nav>', regler: [".aktiv a", "nav ul li a"] },
  { html: '<article>\n  <p class="ny ingress">Nyhet!</p>\n</article>', regler: [".ny.ingress", "article p.ingress"] },
  { html: '<header>\n  <nav>\n    <ul>\n      <li><a id="logo" href="#">Logo</a></li>\n    </ul>\n  </nav>\n</header>', regler: ["header nav ul li a", "#logo"] },
  { html: '<button class="knapp">Send</button>', regler: ["button.knapp", ".knapp"] },
];

const vis = (s: [number, number, number]) => `(${s.join(", ")})`;

/** Gjett-spill: to CSS-regler treffer samme element. Hvilken farge får det? */
export function Spesifisitetsspill() {
  const [nr, setNr] = useState(0);
  const [valgt, setValgt] = useState<number | null>(null);
  const [poeng, setPoeng] = useState(0);
  const ferdig = nr >= RUNDER.length;

  if (ferdig) {
    return (
      <div className="spesifisitetsspill">
        <p className="quiz__etikett">⚔️ Hvem vinner?</p>
        <p className="ss-ferdig">
          Du fikk <strong>{poeng} av {RUNDER.length}</strong> riktige.{" "}
          {poeng === RUNDER.length ? "Perfekt – du tenker som en nettleser!" : "Les forklaringene en gang til, og prøv igjen."}
        </p>
        <button className="kt-knapp kt-knapp--neste" onClick={() => { setNr(0); setPoeng(0); setValgt(null); }}>
          ↺ Spill igjen
        </button>
      </div>
    );
  }

  const r = RUNDER[nr];
  const s = r.regler.map(spesifisitet) as [ReturnType<typeof spesifisitet>, ReturnType<typeof spesifisitet>];
  const diff = sammenlign(s[0], s[1]);
  const vinner = diff > 0 ? 0 : 1; // likt: den siste vinner
  const css = r.regler.map((sel, i) => `${sel} {\n  color: ${FARGER[i]};\n}`).join("\n\n");

  return (
    <div className="spesifisitetsspill">
      <p className="quiz__etikett">
        ⚔️ Hvem vinner? <span className="ss-teller">Runde {nr + 1} av {RUNDER.length} · {poeng} poeng</span>
      </p>
      <div className="ss-flate">
        <div>
          <span className="sf-etikett">HTML</span>
          <pre className="bm-kode"><Kode sprak="html" kode={r.html} /></pre>
          <span className="sf-etikett">CSS</span>
          <pre className="bm-kode"><Kode sprak="css" kode={css} /></pre>
        </div>
        <div className="ss-valg">
          <p className="sf-etikett">Hvilken farge får teksten?</p>
          {FARGER.map((f, i) => {
            const klasse = valgt === null ? "" : i === vinner ? "riktig" : i === valgt ? "feil" : "dempet";
            return (
              <button
                key={f}
                className={`quiz__alt ${klasse}`}
                disabled={valgt !== null}
                onClick={() => {
                  setValgt(i);
                  if (i === vinner) setPoeng((p) => p + 1);
                }}
              >
                <span className="ss-prikk" style={{ background: f }} />
                <span>
                  {f} <code>{r.regler[i]}</code>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {valgt !== null && (
        <div className={`quiz__svar ${valgt === vinner ? "riktig" : "feil"}`} role="status">
          <strong>{valgt === vinner ? "Riktig!" : "Ikke helt."}</strong>{" "}
          <code>{r.regler[0]}</code> har {vis(s[0])}, og <code>{r.regler[1]}</code> har {vis(s[1])}.{" "}
          {diff === 0
            ? r.hint ?? "De er like sterke, så den som står sist i CSS-en vinner."
            : `Den med høyest tall lengst til venstre vinner: ${FARGER[vinner]}.`}
          <button className="lenkeknapp" onClick={() => { setNr(nr + 1); setValgt(null); }}>
            {nr + 1 < RUNDER.length ? "Neste runde →" : "Se resultatet →"}
          </button>
        </div>
      )}
    </div>
  );
}

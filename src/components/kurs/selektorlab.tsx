"use client";

import { useEffect, useRef, useState } from "react";

const SIDE = `<nav>
  <ul class="meny">
    <li><a href="#">Forside</a></li>
    <li><a href="#">Turer</a>
      <ul>
        <li><a href="#">Fjell</a></li>
        <li><a href="#">Skog</a></li>
      </ul>
    </li>
    <li><a href="#" id="kontakt">Kontakt</a></li>
  </ul>
</nav>
<article>
  <h2>Ulriken</h2>
  <p class="ingress">Bergens høyeste fjell.</p>
  <p>Ta <a href="#">Ulriksbanen</a> opp, og gå ned.</p>
  <p class="ny">Ny rute åpnet i år!</p>
</article>
<table>
  <tr><th>Tur</th><th>Timer</th></tr>
  <tr><td>Fløyen</td><td>1</td></tr>
  <tr><td>Ulriken</td><td>3</td></tr>
  <tr><td>Stoltzen</td><td>1</td></tr>
</table>`;

const EKSEMPLER = [
  "a",
  "nav a",
  ".meny > li",
  "h2 + p",
  "h2 ~ p",
  "li:first-child",
  "tr:nth-child(even)",
  "article p:last-child",
  "#kontakt",
  "h2, .ny",
];

const STIL = `<style>
body { font: 14px/1.4 system-ui, sans-serif; margin: 10px; color: #222; }
ul { margin: 2px 0; padding-left: 18px; }
h2 { font-size: 17px; margin: 8px 0 2px; }
p { margin: 2px 0; }
table { border-collapse: collapse; margin-top: 8px; }
td, th { border: 1px solid #ccc; padding: 2px 8px; }
[data-treff] { outline: 2px solid #e63946; outline-offset: 1px; background: rgb(230 57 70 / .15); }
</style>`;

/** Skriv en selektor, og se hvilke elementer i eksempelsiden den treffer. */
export function Selektorlab() {
  const [selektor, setSelektor] = useState("nav a");
  const [svar, setSvar] = useState<{ antall: number; feil: boolean }>({ antall: 0, feil: false });
  const iframe = useRef<HTMLIFrameElement>(null);

  /** Marker elementene selektoren treffer i eksempelsiden. */
  function marker(sel: string) {
    const doc = iframe.current?.contentDocument;
    if (!doc?.body) return;
    doc.querySelectorAll("[data-treff]").forEach((e) => e.removeAttribute("data-treff"));
    if (!sel.trim()) {
      setSvar({ antall: 0, feil: false });
      return;
    }
    try {
      const treff = doc.body.querySelectorAll(sel);
      treff.forEach((e) => e.setAttribute("data-treff", ""));
      setSvar({ antall: treff.length, feil: false });
    } catch {
      setSvar({ antall: 0, feil: true });
    }
  }

  // Iframen kan bli ferdig lastet før React kobler på onLoad. Marker da startselektoren her.
  useEffect(() => {
    const t = setTimeout(() => {
      if (iframe.current?.contentDocument?.readyState === "complete") marker(selektor);
    }, 0);
    return () => clearTimeout(t);
    // Bare ved oppstart: senere endringer markeres i velg().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function velg(sel: string) {
    setSelektor(sel);
    marker(sel);
  }

  return (
    <div className="selektorlab">
      <p className="quiz__etikett">🎯 Selektorlab</p>
      <label className="sv-felt">
        <span className="sf-etikett">Selektor</span>
        <input
          value={selektor}
          onChange={(e) => velg(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          aria-describedby="sv-resultat"
        />
      </label>
      <div className="sv-eksempler">
        {EKSEMPLER.map((e) => (
          <button key={e} className="fv-fane" aria-pressed={selektor === e} onClick={() => velg(e)}>
            <code>{e}</code>
          </button>
        ))}
      </div>
      <p id="sv-resultat" className={`sv-resultat ${svar.feil ? "sv-resultat--feil" : ""}`} aria-live="polite">
        {svar.feil
          ? "Det er ikke en gyldig selektor (ennå)."
          : svar.antall === 0
            ? "Treffer ingen elementer."
            : `Treffer ${svar.antall} ${svar.antall === 1 ? "element" : "elementer"}.`}
      </p>
      <div className="sv-flate">
        <iframe
          ref={iframe}
          title="Eksempelside"
          sandbox="allow-same-origin"
          srcDoc={STIL + SIDE}
          onLoad={() => marker(selektor)}
          className="sv-visning"
        />
        <details className="sl-kode">
          <summary>Se HTML-en</summary>
          <pre>
            <code>{SIDE}</code>
          </pre>
        </details>
      </div>
    </div>
  );
}

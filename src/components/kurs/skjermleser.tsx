"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

const MED_DIV = `<div class="topp">
  <div class="tittel">Fjellklubben</div>
  <div class="meny">
    <a href="#">Turer</a> <a href="#">Om oss</a> <a href="#">Kontakt</a>
  </div>
</div>
<div class="innhold">
  <div class="stor">Neste tur: Fløyen</div>
  <div>Vi møtes ved Fløibanen lørdag klokka 11.</div>
  <div class="stor">Utstyr</div>
  <div>Ta med niste og gode sko. <a href="#">Klikk her</a>.</div>
</div>
<div class="bunn">Fjellklubben 2026</div>`;

const SEMANTISK = `<header>
  <h1>Fjellklubben</h1>
  <nav>
    <ul>
      <li><a href="#">Turer</a></li>
      <li><a href="#">Om oss</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>
</header>
<main>
  <h2>Neste tur: Fløyen</h2>
  <p>Vi møtes ved Fløibanen lørdag klokka 11.</p>
  <h2>Utstyr</h2>
  <p>Ta med niste og gode sko. <a href="#">Se pakkelista</a>.</p>
</main>
<footer>
  <p>Fjellklubben 2026</p>
</footer>`;

const LANDEMERKER: Record<string, string> = {
  header: "banner",
  nav: "navigasjon",
  main: "hovedinnhold",
  footer: "informasjon om innholdet",
  aside: "tilleggsinformasjon",
};

/**
 * Viser hva en skjermleser «ser» av samme side, bygget med div-er eller med semantiske tagger:
 * landemerker, overskrifter og lenker – det brukeren kan hoppe mellom.
 */
export function Skjermleser() {
  const [versjon, setVersjon] = useState<"div" | "semantisk">("div");
  const html = versjon === "div" ? MED_DIV : SEMANTISK;
  // DOMParser finnes bare i nettleseren: analyser først når komponenten er der.
  const iNettleseren = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const funn = useMemo(() => {
    if (!iNettleseren) return null;
    const d = new DOMParser().parseFromString(html, "text/html");
    return {
      landemerker: [...d.body.querySelectorAll("header, nav, main, footer, aside")]
        .filter((e) => !(e.tagName === "HEADER" || e.tagName === "FOOTER") || !e.closest("article, section, main"))
        .map((e) => LANDEMERKER[e.tagName.toLowerCase()]),
      overskrifter: [...d.body.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => ({
        nivå: Number(h.tagName[1]),
        tekst: h.textContent?.trim() ?? "",
      })),
      lenker: [...d.body.querySelectorAll("a")].map((a) => a.textContent?.trim() ?? ""),
      lister: d.body.querySelectorAll("ul, ol").length,
    };
  }, [html, iNettleseren]);

  return (
    <div className="skjermleser">
      <p className="quiz__etikett">🔊 Slik «ser» en skjermleser siden</p>
      <div className="kt-faner" role="tablist">
        <button role="tab" aria-selected={versjon === "div"} className="fv-fane" onClick={() => setVersjon("div")}>
          Bygget med div-er
        </button>
        <button role="tab" aria-selected={versjon === "semantisk"} className="fv-fane" onClick={() => setVersjon("semantisk")}>
          Bygget med semantiske tagger
        </button>
      </div>

      <p className="sl-forklaring">
        Begge versjonene <em>ser</em> nesten like ut når CSS-en er på plass. Men en skjermleser bryr seg ikke om
        utseendet – den leser taggene. Brukeren hopper mellom landemerker, overskrifter og lenker for å finne fram:
      </p>

      {funn && (
        <div className="sl-paneler">
          <section className="sl-panel">
            <h3>Landemerker</h3>
            {funn.landemerker.length ? (
              <ol>{funn.landemerker.map((l, i) => <li key={i}>{l}</li>)}</ol>
            ) : (
              <p className="sl-tom">Ingen. Brukeren må lytte gjennom hele siden fra toppen.</p>
            )}
          </section>
          <section className="sl-panel">
            <h3>Overskrifter</h3>
            {funn.overskrifter.length ? (
              <ol>
                {funn.overskrifter.map((h, i) => (
                  <li key={i} style={{ paddingLeft: (h.nivå - 1) * 12 }}>
                    <span className="sl-niva">nivå {h.nivå}</span> {h.tekst}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="sl-tom">Ingen. «Store» div-er er bare tekst for skjermleseren.</p>
            )}
          </section>
          <section className="sl-panel">
            <h3>Lenker</h3>
            <ol>
              {funn.lenker.map((l, i) => (
                <li key={i} className={/klikk her|^her$/i.test(l) ? "sl-darlig" : ""}>
                  {l}
                </li>
              ))}
            </ol>
            {funn.lister > 0 && <p className="sl-ekstra">Menyen leses som «liste, {funn.lenker.length - 1} punkter».</p>}
          </section>
        </div>
      )}

      <details className="sl-kode">
        <summary>Se HTML-en</summary>
        <pre>
          <code>{html}</code>
        </pre>
      </details>
    </div>
  );
}

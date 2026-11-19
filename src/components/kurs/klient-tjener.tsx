"use client";

import { useState } from "react";

type Skjerm = "gammel" | "tom" | "uten-stil" | "ferdig" | "404";
type Steg = {
  tekst: string;
  /** Melding som går mellom nettleseren og tjeneren i dette steget. */
  melding?: { tekst: string; til: "tjener" | "klient"; feil?: boolean };
  /** Fil som lyser opp i tjenerens mappe. */
  fil?: { navn: string; funnet: boolean };
  skjerm: Skjerm;
};

const SCENARIER: Record<"finnes" | "mangler", { lenke: string; steg: Steg[] }> = {
  finnes: {
    lenke: "om-meg.html",
    steg: [
      {
        tekst: "Du klikker på lenken «Om meg». Lenken peker på om-meg.html, så det er den fila nettleseren skal hente.",
        skjerm: "gammel",
      },
      {
        tekst: "Nettleseren din – klienten – sender en forespørsel over nettet til tjeneren: «Kan jeg få om-meg.html?»",
        melding: { tekst: "GET /om-meg.html", til: "tjener" },
        skjerm: "tom",
      },
      {
        tekst: "Tjeneren er bare en datamaskin med en mappe – akkurat som webkurs-mappen din. Den leter etter fila, og finner den.",
        fil: { navn: "om-meg.html", funnet: true },
        skjerm: "tom",
      },
      {
        tekst: "Tjeneren sender et svar tilbake: koden 200 (alt i orden) og hele innholdet i om-meg.html.",
        melding: { tekst: "200 OK + om-meg.html", til: "klient" },
        fil: { navn: "om-meg.html", funnet: true },
        skjerm: "uten-stil",
      },
      {
        tekst: "Nettleseren leser HTML-en ovenfra og ned. I <head> finner den <link href=\"style.css\"> – og må spørre tjeneren én gang til.",
        melding: { tekst: "GET /style.css", til: "tjener" },
        skjerm: "uten-stil",
      },
      {
        tekst: "Tjeneren finner style.css og sender den.",
        melding: { tekst: "200 OK + style.css", til: "klient" },
        fil: { navn: "style.css", funnet: true },
        skjerm: "uten-stil",
      },
      {
        tekst: "Nå har nettleseren alt den trenger, og tegner siden. To forespørsler, to svar – på en brøkdel av et sekund.",
        skjerm: "ferdig",
      },
    ],
  },
  mangler: {
    lenke: "Om-Meg.html",
    steg: [
      {
        tekst: "Denne gangen er lenken skrevet med store bokstaver: Om-Meg.html.",
        skjerm: "gammel",
      },
      {
        tekst: "Nettleseren spør tjeneren nøyaktig etter det som står i lenken.",
        melding: { tekst: "GET /Om-Meg.html", til: "tjener" },
        skjerm: "tom",
      },
      {
        tekst: "Tjeneren leter i mappen. Den har om-meg.html, men ikke Om-Meg.html – på en tjener er det to forskjellige filnavn.",
        fil: { navn: "Om-Meg.html", funnet: false },
        skjerm: "tom",
      },
      {
        tekst: "Tjeneren svarer med koden 404: «Fant ikke». Det er den berømte 404-siden.",
        melding: { tekst: "404 Not Found", til: "klient", feil: true },
        fil: { navn: "Om-Meg.html", funnet: false },
        skjerm: "404",
      },
    ],
  },
};

const MAPPE = ["index.html", "om-meg.html", "style.css"];

/** Steg-for-steg: hva skjer mellom nettleseren og tjeneren når du klikker på en lenke? */
export function KlientTjener() {
  const [scenario, setScenario] = useState<"finnes" | "mangler">("finnes");
  const [i, setI] = useState(0);
  const { lenke, steg } = SCENARIER[scenario];
  const s = steg[i];

  const byttScenario = (n: "finnes" | "mangler") => {
    setScenario(n);
    setI(0);
  };

  const adresse = s.skjerm === "gammel" ? "minside.no/index.html" : `minside.no/${lenke}`;

  return (
    <div className="klient-tjener">
      <p className="quiz__etikett">🌐 Klient og tjener</p>
      <div className="kt-faner" role="tablist">
        <button role="tab" aria-selected={scenario === "finnes"} className="fv-fane" onClick={() => byttScenario("finnes")}>
          Lenke som virker
        </button>
        <button role="tab" aria-selected={scenario === "mangler"} className="fv-fane" onClick={() => byttScenario("mangler")}>
          Lenke med feil
        </button>
      </div>

      <div className="kt-scene">
        <div className="kt-boks">
          <p className="kt-boks__tittel">Din nettleser <span>(klient)</span></p>
          <div className="kt-adresse">{adresse}</div>
          <div className={`kt-skjerm kt-skjerm--${s.skjerm}`} aria-hidden="true">
            {s.skjerm === "gammel" && (
              <>
                <b>Forsiden</b>
                <u>Om meg</u>
              </>
            )}
            {s.skjerm === "tom" && <i>venter …</i>}
            {s.skjerm === "uten-stil" && (
              <>
                <b>Om meg</b>
                <span>Jeg heter Kim …</span>
              </>
            )}
            {s.skjerm === "ferdig" && (
              <>
                <b>Om meg</b>
                <span>Jeg heter Kim …</span>
              </>
            )}
            {s.skjerm === "404" && (
              <>
                <b>404</b>
                <span>Fant ikke siden</span>
              </>
            )}
          </div>
        </div>

        <div className="kt-bane">
          {s.melding && (
            <span
              key={`${scenario}-${i}`}
              className={`kt-melding kt-melding--til-${s.melding.til} ${s.melding.feil ? "kt-melding--feil" : ""}`}
            >
              {s.melding.tekst}
            </span>
          )}
          <span className="kt-linje" aria-hidden="true" />
        </div>

        <div className="kt-boks">
          <p className="kt-boks__tittel">Tjener <span>minside.no</span></p>
          <ul className="kt-mappe">
            {MAPPE.map((f) => (
              <li key={f} className={s.fil?.funnet && s.fil.navn === f ? "funnet" : ""}>
                {f}
              </li>
            ))}
            {s.fil && !s.fil.funnet && <li className="mangler">{s.fil.navn} ?</li>}
          </ul>
        </div>
      </div>

      <p className="kt-tekst" aria-live="polite">
        <span className="kt-nr">
          {i + 1}/{steg.length}
        </span>{" "}
        {s.tekst}
      </p>

      <div className="kt-knapper">
        <button className="kt-knapp" onClick={() => setI(i - 1)} disabled={i === 0}>
          ← Forrige
        </button>
        {i < steg.length - 1 ? (
          <button className="kt-knapp kt-knapp--neste" onClick={() => setI(i + 1)}>
            Neste →
          </button>
        ) : (
          <button className="kt-knapp" onClick={() => setI(0)}>
            ↺ Se igjen
          </button>
        )}
      </div>
    </div>
  );
}

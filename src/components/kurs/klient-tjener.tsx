"use client";

import { useState } from "react";

type Skjerm = "gammel" | "tom" | "uten-stil" | "ferdig" | "404";
type Steg = {
  tekst: string;
  /** Hvem nettleseren snakker med i dette steget. Standard er tjeneren med nettstedet. */
  motpart?: "dns";
  /** Melding som går mellom nettleseren og tjeneren i dette steget. */
  melding?: { tekst: string; til: "tjener" | "klient"; feil?: boolean };
  /** Fil som lyser opp i tjenerens mappe. */
  fil?: { navn: string; funnet: boolean };
  skjerm: Skjerm;
};

type Scenario = "dns" | "finnes" | "mangler";

const NAVN: Record<Scenario, string> = {
  dns: "Skriv inn en adresse",
  finnes: "Lenke som virker",
  mangler: "Lenke med feil",
};

// Oppdiktede domener og IP-adresser fra adresseområdene som er satt av til eksempler (RFC 5737).
const DNS_REGISTER = [
  ["skolen.no", "198.51.100.7"],
  ["minside.no", "192.0.2.44"],
  ["klubben.no", "203.0.113.12"],
];

const SCENARIER: Record<Scenario, { lenke: string; side: string; tekst: string; steg: Steg[] }> = {
  dns: {
    lenke: "",
    side: "Velkommen!",
    tekst: "Vi går på tur hver helg …",
    steg: [
      {
        tekst: "Du skriver minside.no i adressefeltet og trykker Enter. Men nettleseren vet ikke hvor minside.no er – datamaskiner på nettet finner hverandre med tall, IP-adresser.",
        skjerm: "tom",
      },
      {
        tekst: "Nettleseren spør derfor en DNS-tjener – en slags telefonkatalog for internett: «Hvilken IP-adresse har minside.no?»",
        motpart: "dns",
        melding: { tekst: "Hvor er minside.no?", til: "tjener" },
        skjerm: "tom",
      },
      {
        tekst: "DNS-tjeneren slår opp i registeret sitt. Der står domenet ditt, med IP-adressen til tjeneren der nettstedet ditt ligger.",
        motpart: "dns",
        fil: { navn: "minside.no", funnet: true },
        skjerm: "tom",
      },
      {
        tekst: "DNS-tjeneren svarer med IP-adressen.",
        motpart: "dns",
        melding: { tekst: "192.0.2.44", til: "klient" },
        fil: { navn: "minside.no", funnet: true },
        skjerm: "tom",
      },
      {
        tekst: "Nå vet nettleseren hvor den skal. Den spør tjeneren på 192.0.2.44 om forsiden. Adressen har ikke noe filnavn – så tjeneren sender index.html (husker du modul 1?).",
        melding: { tekst: "GET /", til: "tjener" },
        skjerm: "tom",
      },
      {
        tekst: "Tjeneren er en datamaskin hos firmaet du har lagt nettstedet hos. I mappen ligger akkurat de filene du lastet opp fra webkurs.",
        fil: { navn: "index.html", funnet: true },
        skjerm: "tom",
      },
      {
        tekst: "Tjeneren sender index.html. Så hentes style.css og bildene, akkurat som i modul 4 – og siden vises.",
        melding: { tekst: "200 OK + index.html", til: "klient" },
        fil: { navn: "index.html", funnet: true },
        skjerm: "ferdig",
      },
      {
        tekst: "Neste gang du besøker siden, husker nettleseren IP-adressen en stund, og slipper å spørre DNS-tjeneren igjen. Alt dette skjer på en brøkdel av et sekund.",
        skjerm: "ferdig",
      },
    ],
  },
  finnes: {
    lenke: "om-meg.html",
    side: "Om meg",
    tekst: "Jeg heter Kim …",
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
    side: "Om meg",
    tekst: "Jeg heter Kim …",
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

/**
 * Steg-for-steg: hva skjer mellom nettleseren og tjeneren når du klikker på en lenke?
 * Med scenarier={["dns", …]} vises også DNS-oppslaget når du skriver inn en adresse.
 */
export function KlientTjener({ scenarier = ["finnes", "mangler"] }: { scenarier?: Scenario[] }) {
  const [scenario, setScenario] = useState<Scenario>(scenarier[0]);
  const [i, setI] = useState(0);
  const { lenke, side, tekst: sidetekst, steg } = SCENARIER[scenario];
  const s = steg[i];

  const byttScenario = (n: Scenario) => {
    setScenario(n);
    setI(0);
  };

  const adresse = s.skjerm === "gammel" ? "minside.no/index.html" : `minside.no/${lenke}`;

  return (
    <div className="klient-tjener">
      <p className="quiz__etikett">🌐 Klient og tjener</p>
      <div className="kt-faner" role="tablist">
        {scenarier.map((n) => (
          <button key={n} role="tab" aria-selected={scenario === n} className="fv-fane" onClick={() => byttScenario(n)}>
            {NAVN[n]}
          </button>
        ))}
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
                <b>{side}</b>
                <span>{sidetekst}</span>
              </>
            )}
            {s.skjerm === "ferdig" && (
              <>
                <b>{side}</b>
                <span>{sidetekst}</span>
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

        {s.motpart === "dns" ? (
          <div className="kt-boks kt-boks--dns">
            <p className="kt-boks__tittel">DNS-tjener <span>(katalogen)</span></p>
            <ul className="kt-mappe">
              {DNS_REGISTER.map(([domene, ip]) => (
                <li key={domene} className={s.fil?.funnet && s.fil.navn === domene ? "funnet" : ""}>
                  {domene} → {ip}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="kt-boks">
            <p className="kt-boks__tittel">
              Tjener <span>{scenario === "dns" ? "192.0.2.44" : "minside.no"}</span>
            </p>
            <ul className="kt-mappe">
              {MAPPE.map((f) => (
                <li key={f} className={s.fil?.funnet && s.fil.navn === f ? "funnet" : ""}>
                  {f}
                </li>
              ))}
              {s.fil && !s.fil.funnet && <li className="mangler">{s.fil.navn} ?</li>}
            </ul>
          </div>
        )}
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

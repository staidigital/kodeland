import Link from "next/link";
import { Suspense } from "react";
import { KodelandLogo } from "@/components/kodeland-logo";
import { BrukerMeny } from "@/components/kurs/bruker-meny";
import { MODULER } from "@/content/webutvikling/kurs";
import { ForsideTerminal } from "./forside-terminal";
import { ScrambleText } from "./scramble-text";

const FLOATERS = ["{ }", "</>", "=>", "( )", ";", "[ ]", "if", "def", "#", "&&", "==", "fn"];

const antallModuler = MODULER.filter((m) => m.type !== "sjekkpunkt").length;
const antallSjekkpunkter = MODULER.length - antallModuler;

type Kurs = {
  navn: string;
  ikon: string;
  beskrivelse: string;
  /** Lenke til kurset. Uten lenke vises kurset som «kommer snart». */
  href?: string;
  info?: string[];
};

const KURS: Kurs[] = [
  {
    navn: "Webutvikling",
    ikon: "</>",
    beskrivelse: "Lag ditt eget nettsted med HTML og CSS – og legg det ut på nettet.",
    href: "/webutvikling",
    info: [`${antallModuler} moduler`, `${antallSjekkpunkter} sjekkpunkter`],
  },
  {
    navn: "JavaScript",
    ikon: "=>",
    beskrivelse: "Gjør nettsidene dine levende med programmering.",
  },
  {
    navn: "Databaser",
    ikon: "[ ]",
    beskrivelse: "Lagre, finn og koble sammen data med SQL.",
  },
];

const STEG = [
  {
    tittel: "Les og prøv",
    tekst: "Korte leksjoner med eksempler du kan endre – og se resultatet av med en gang.",
  },
  {
    tittel: "Løs oppgaver",
    tekst: "Skriv koden rett i nettleseren. Oppgavene sjekkes automatisk, og du får vite hva som mangler.",
  },
  {
    tittel: "Bygg ditt eget",
    tekst: "Underveis lager du ditt eget prosjekt på din egen maskin – og til slutt legger du det ut på nettet.",
  },
];

export default function Home() {
  return (
    <div className="forside">
      <div className="forside-bakgrunn" aria-hidden="true">
        <div className="forside-grid" />
        <div className="forside-glow" />
        <div className="forside-floaters">
          {FLOATERS.map((g, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 83) % 100}%`,
                animationDelay: `${-i * 2.3}s`,
                animationDuration: `${18 + ((i * 7) % 12)}s`,
                fontSize: `${14 + ((i * 5) % 14)}px`,
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      <header className="forside-topp">
        <KodelandLogo />
        <Suspense fallback={null}>
          <BrukerMeny />
        </Suspense>
      </header>

      <main className="forside-innhold">
        <section className="forside-helt">
          <div className="forside-helt__tekst">
            <p className="forside-merke">
              <span className="forside-merke__dot" /> kodeundervisning for videregående
            </p>
            <h1 className="forside-tittel">
              <ScrambleText text="Lær å kode" />
              <span className="forside-tittel__cursor" aria-hidden="true">_</span>
            </h1>
            <p className="forside-ingress">
              Kurs der du skriver ekte kode fra første minutt – med oppgaver som sjekkes rett i
              nettleseren, og ditt eget prosjekt som vokser fram underveis.
            </p>
            <p className="forside-knapper">
              <Link href="/webutvikling" className="forside-knapp">
                Start med webutvikling <span aria-hidden="true">→</span>
              </Link>
              <a href="#kurs" className="forside-knapp forside-knapp--sekundær">
                Se alle kurs
              </a>
            </p>
          </div>
          <ForsideTerminal />
        </section>

        <section id="kurs" className="forside-del" aria-labelledby="kurs-tittel">
          <h2 id="kurs-tittel" className="forside-del__tittel">
            <span className="c-prompt" aria-hidden="true">$ </span>ls kurs/
          </h2>
          <ul className="forside-kurs">
            {KURS.map((k) => {
              const innhold = (
                <>
                  <span className="forside-kurs__topp">
                    <span className="forside-kurs__ikon" aria-hidden="true">{k.ikon}</span>
                    {k.href ? (
                      <span className="forside-kurs__merke forside-kurs__merke--klar">åpent</span>
                    ) : (
                      <span className="forside-kurs__merke">
                        <span className="forside-merke__dot" aria-hidden="true" /> kommer snart
                      </span>
                    )}
                  </span>
                  <span className="forside-kurs__navn">{k.navn}</span>
                  <span className="forside-kurs__tekst">{k.beskrivelse}</span>
                  {k.info && (
                    <span className="forside-kurs__info">
                      {k.info.map((x, i) => (
                        <span key={x}>
                          {i > 0 && " · "}
                          <span className="forside-kurs__info-del">{x}</span>
                        </span>
                      ))}
                    </span>
                  )}
                  {k.href && (
                    <span className="forside-kurs__start">
                      Start kurset <span aria-hidden="true">→</span>
                    </span>
                  )}
                </>
              );
              return (
                <li key={k.navn}>
                  {k.href ? (
                    <Link href={k.href} className="forside-kurs__kort forside-kurs__kort--klar">
                      {innhold}
                    </Link>
                  ) : (
                    <div className="forside-kurs__kort forside-kurs__kort--snart">{innhold}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="forside-del" aria-labelledby="slik-tittel">
          <h2 id="slik-tittel" className="forside-del__tittel">
            <span className="c-prompt" aria-hidden="true">$ </span>cat slik-fungerer-det.md
          </h2>
          <ol className="forside-steg">
            {STEG.map((s, i) => (
              <li key={s.tittel} className="forside-steg__punkt">
                <span className="forside-steg__nr" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="forside-steg__tittel">{s.tittel}</h3>
                <p className="forside-steg__tekst">{s.tekst}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="forside-del forside-laerer" aria-labelledby="laerer-tittel">
          <div>
            <h2 id="laerer-tittel" className="forside-laerer__tittel">For lærere</h2>
            <p className="forside-laerer__tekst">
              Lag klasser og studentbrukere i lærerpanelet – studentene trenger ingen e-post. Følg
              fremdriften til hver student, leksjon for leksjon.
            </p>
          </div>
          <Link href="/admin" className="forside-knapp forside-knapp--sekundær">
            Til lærerpanelet <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

      <footer className="forside-bunn">
        <span>Kodeland</span>
        <Link href="/text-adventure">Prøv tekstspillet →</Link>
      </footer>
    </div>
  );
}

/**
 * Kodeoppgaver brukt i leksjonene: <Oppgave id="..." /> i MDX.
 *
 * Hver sjekk får dokumentet i forhåndsvisningen og returnerer true når
 * kravet er oppfylt. Sjekkene kjøres på nytt hver gang eleven skriver.
 * Uten sjekker blir oppgaven en fri lekeplass.
 */

import { kontrast, lesRgb, rgbTilHsl, toneAvstand } from "@/lib/farger";
import type { Kursbilde } from "./kursbilder";

export type Sjekk = {
  tekst: string;
  /**
   * `doc` er siden som vises i forhåndsvisningen (med CSS, så getComputedStyle virker).
   * `sider` er alle HTML-filene i oppgaven, lest inn uten CSS (filnavn → dokument).
   */
  test: (doc: Document, sider: Record<string, Document>) => boolean;
};

export type OppgaveDef = {
  html: string;
  /** Ta med css (også tom streng) for å vise CSS-fanen. */
  css?: string;
  sjekker?: Sjekk[];
  /** Hint som kan vises når eleven står fast. */
  hint?: string;
  /**
   * CSS-en brukes bare når HTML-en har <link rel="stylesheet" href="style.css">,
   * slik som i en ekte nettleser. Ellers kobles den til automatisk.
   */
  lenketCss?: boolean;
  /**
   * Flere HTML-sider i tillegg til index.html (filnavn → startkode), f.eks. "om-meg.html"
   * eller "sider/kontakt.html". Lenker mellom sidene virker i forhåndsvisningen.
   */
  sider?: Record<string, string>;
  /** Bildene som ligger i prosjektet (se kursbilder.ts). Brukes av <img src> og url() i CSS. */
  bilder?: Kursbilde[];
};

const PROSJEKT = "https://prosjekt.invalid/";

/**
 * Hvilken fil i prosjektet peker `href` på, sett fra siden `fra`? Følger samme regler som
 * nettleseren (relative stier, ../, mappe/ → mappe/index.html). Gir null for lenker ut av
 * prosjektet (https://…, mailto: …).
 */
export function løsSti(href: string, fra: string): string | null {
  let url: URL;
  try {
    url = new URL(href.trim(), PROSJEKT + fra);
  } catch {
    return null;
  }
  if (url.origin !== new URL(PROSJEKT).origin) return null;
  let sti = decodeURIComponent(url.pathname.slice(1));
  if (sti === "" || sti.endsWith("/")) sti += "index.html";
  return sti;
}

/** Filene lenkene på en side peker på (lenker ut av prosjektet er tatt bort). */
const lenkerTil = (side: Document | undefined, fra: string) =>
  [...(side?.querySelectorAll("a[href]") ?? [])]
    .map((a) => løsSti(a.getAttribute("href") ?? "", fra))
    .filter((x): x is string => x !== null);

/** Vises bildet i forhåndsvisningen (ikke ødelagt)? */
const vises = (img: Element) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0;

/** Peker alle <img> på siden på bilder i `bilder`, og er hvert av dem brukt minst én gang? */
const bilderFinnes = (side: Document | undefined, fra: string, bilder: string[]) => {
  const brukt = [...(side?.querySelectorAll("img") ?? [])].map((i) => løsSti(i.getAttribute("src") ?? "", fra));
  return brukt.length > 0 && brukt.every((b) => b !== null && bilder.includes(b)) && bilder.every((b) => brukt.includes(b));
};

/** Alt-tekst som beskriver bildet – ikke tom, ikke bare «bilde» eller filnavnet. */
const godAlt = (img: Element) => {
  const alt = (img.getAttribute("alt") ?? "").trim();
  return alt.length >= 5 && !/^(bilde|foto|image|picture)$/i.test(alt) && !/\.(jpe?g|png|webp|svg|gif)$/i.test(alt);
};

/** Har siden en <link rel="stylesheet"> som peker på style.css? */
const harStilark = (side: Document | undefined, fra: string) =>
  [...(side?.querySelectorAll('head link[rel="stylesheet"]') ?? [])].some(
    (l) => løsSti(l.getAttribute("href") ?? "", fra) === "style.css",
  );

const tekst = (el: Element | null) => (el?.textContent ?? "").trim();
const stil = (el: Element) => el.ownerDocument.defaultView!.getComputedStyle(el);
const farge = (el: Element | null) => (el ? stil(el).color : "");
const SVART = "rgb(0, 0, 0)";
const GJENNOMSIKTIG = "rgba(0, 0, 0, 0)";
const harBakgrunn = (el: Element | null) =>
  el !== null && stil(el).backgroundColor !== GJENNOMSIKTIG;
const px = (el: Element | null) => (el ? parseFloat(stil(el).fontSize) : NaN);

/** Alle stilregler på siden (fra <style>). */
const regler = (d: Document) =>
  [...d.styleSheets].flatMap((ark) =>
    [...ark.cssRules].filter((r): r is CSSStyleRule => r instanceof d.defaultView!.CSSStyleRule),
  );

/** Bakgrunnsfargen som faktisk vises bak et element (hvit hvis ingen er satt). */
function synligBakgrunn(el: Element | null): number[] {
  for (let e = el; e; e = e.parentElement) {
    const f = lesRgb(stil(e).backgroundColor);
    if (f[3] > 0) return f;
  }
  return [255, 255, 255, 1];
}

/** Fargen som HSL, regnet ut fra den beregnede rgb-verdien. */
const hsl = (c: string) => rgbTilHsl(lesRgb(c));
/** Teksten i stilarket slik studenten skrev det (med kommentarer). */
const stilarkTekst = (d: Document) =>
  [...d.querySelectorAll("style")].map((s) => s.textContent ?? "").join("\n");
const venstre = (el: Element | null) =>
  el !== null && ["start", "left"].includes(stil(el).textAlign);
const FIREBRICK = "rgb(178, 34, 34)";

/** Kontrast mot bakgrunnen er minst 4,5:1 (vanlig tekst) eller et annet krav, f.eks. 3 for stor tekst. */
const lesbar = (el: Element | null, krav = 4.5) =>
  el !== null && kontrast(lesRgb(stil(el).color), synligBakgrunn(el)) >= krav;

export const OPPGAVER: Record<string, OppgaveDef> = {
  "m1-hei": {
    html: `<h1>Hei, verden!</h1>
<p>Dette er min aller første nettside.</p>
`,
    sjekker: [
      {
        tekst: "Overskriften viser navnet ditt i stedet for «Hei, verden!»",
        test: (d) => {
          const t = tekst(d.querySelector("h1"));
          return t.length > 0 && t !== "Hei, verden!";
        },
      },
      {
        tekst: "Det er minst to avsnitt (<p>) på siden",
        test: (d) => d.querySelectorAll("p").length >= 2,
      },
    ],
    hint: "Kopier hele linja med <p> … </p>, lim den inn under, og bytt ut teksten.",
  },

  "m1-smakebit": {
    html: `<h1>Dette er en overskrift</h1>
<p>Og dette er et helt vanlig avsnitt.</p>
`,
    css: `h1 {
  color: tomato;
}
`,
    sjekker: [
      {
        tekst: "Overskriften har fått en annen farge enn tomato",
        test: (d) => {
          const c = farge(d.querySelector("h1"));
          return c !== "" && c !== "rgb(255, 99, 71)" && c !== "rgb(0, 0, 0)";
        },
      },
      {
        tekst: "Avsnittet har også fått en farge",
        test: (d) => {
          const c = farge(d.querySelector("p"));
          return c !== "" && c !== "rgb(0, 0, 0)";
        },
      },
    ],
    hint: "Lag en ny regel under den første: p { color: steelblue; }",
  },

  "m1-overskrifter": {
    html: `<h1>Om meg</h1>
<p>Jeg heter Kim og går på Vg1.</p>
`,
    sjekker: [
      {
        tekst: "Det finnes en <h2>-overskrift",
        test: (d) => tekst(d.querySelector("h2")).length > 0,
      },
      {
        tekst: "Det står et avsnitt etter <h2>-overskriften",
        test: (d) => d.querySelector("h2 ~ p") !== null,
      },
      {
        tekst: "Det er fortsatt bare én <h1>",
        test: (d) => d.querySelectorAll("h1").length === 1,
      },
    ],
    hint: "<h2>Det jeg liker</h2> under avsnittet, og så en ny <p> under den.",
  },

  "m1-finn-feilen": {
    html: `<h1>Min side<h1>
<p>Hvorfor er denne teksten så stor?</p>
`,
    sjekker: [
      {
        tekst: "Det er bare én overskrift, og den inneholder «Min side»",
        test: (d) =>
          d.querySelectorAll("h1").length === 1 && tekst(d.querySelector("h1")) === "Min side",
      },
      {
        tekst: "Avsnittet ligger ikke lenger inni overskriften",
        test: (d) => {
          const p = d.querySelector("p");
          return p !== null && p.closest("h1") === null;
        },
      },
    ],
    hint: "Se nøye på den andre <h1> på første linje. Hva mangler for at det skal bli en sluttag?",
  },

  "m1-grunnstruktur": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Min side</title>
  </head>
  <body>
    <h1>Hei!</h1>
    <p>Her kommer innholdet.</p>
  </body>
</html>
`,
    sjekker: [
      {
        tekst: "Tittelen i <title> er endret til noe med navnet ditt",
        test: (d) => d.title.trim().length > 0 && d.title.trim() !== "Min side",
      },
      {
        tekst: "<h1> sier noe annet enn «Hei!»",
        test: (d) => {
          const t = tekst(d.querySelector("h1"));
          return t.length > 0 && t !== "Hei!";
        },
      },
      {
        tekst: "Siden har minst ett avsnitt du har skrevet selv",
        test: (d) =>
          [...d.querySelectorAll("p")].some(
            (p) => tekst(p).length > 0 && tekst(p) !== "Her kommer innholdet.",
          ),
      },
    ],
  },

  // ── Modul 2: Gi den farge! ──────────────────────────────────────────

  "m2-uthev": {
    html: `<h1>Slik lager du pannekaker</h1>
<p>Du trenger mel, melk, egg og litt salt.</p>
<p>Visp røren godt, og la den svelle en halvtime.</p>
<p>Stek dem i smør på middels varme.</p>
`,
    sjekker: [
      {
        tekst: "Noe viktig er markert med <strong>",
        test: (d) => tekst(d.querySelector("p strong")).length > 0,
      },
      {
        tekst: "Ett ord har trykk med <em>",
        test: (d) => tekst(d.querySelector("p em")).length > 0,
      },
      {
        tekst: "Det er fortsatt tre avsnitt",
        test: (d) => d.querySelectorAll("p").length >= 3,
      },
    ],
    hint: "Prøv: <p>Stek dem i smør på <strong>middels</strong> varme.</p>",
  },

  "m2-nivaaer": {
    html: `<h1>Min hobby: Fotball</h1>
<p>Jeg har spilt fotball siden jeg var seks.</p>

<h2>Laget mitt</h2>
<p>Jeg spiller på G16 i Nordby IL.</p>

<h2>Favorittspillere</h2>
<p>Ada Hegerberg og Martin Ødegaard.</p>
`,
    sjekker: [
      {
        tekst: "Det finnes minst to <h3>-overskrifter",
        test: (d) => [...d.querySelectorAll("h3")].filter((h) => tekst(h).length > 0).length >= 2,
      },
      {
        tekst: "<h3>-overskriftene står etter en <h2>",
        test: (d) => {
          const h2 = [...d.querySelectorAll("h2")];
          const h3 = [...d.querySelectorAll("h3")];
          const etter = (a: Node, b: Node) => (a.compareDocumentPosition(b) & 4) !== 0;
          return h3.length > 0 && h3.every((h) => h2.some((x) => etter(x, h)));
        },
      },
      {
        tekst: "Ingen nivåer er hoppet over (ingen <h4>–<h6>)",
        test: (d) => d.querySelector("h4, h5, h6") === null,
      },
      {
        tekst: "Det er fortsatt bare én <h1>",
        test: (d) => d.querySelectorAll("h1").length === 1,
      },
    ],
    hint: "Under «Laget mitt»: <h3>Treninger</h3> med et avsnitt, og <h3>Kamper</h3> med et avsnitt.",
  },

  "m2-farger": {
    html: `<h1>Dyrene i skogen</h1>
<p>I norske skoger lever det mange dyr.</p>

<h2>Elg</h2>
<p>Elgen er det største landdyret i Norge.</p>

<h2>Rev</h2>
<p>Reven er rask, lur og nysgjerrig.</p>
`,
    css: `h1 {
  color: darkgreen;
}
`,
    sjekker: [
      {
        tekst: "<h2>-overskriftene har fått en farge",
        test: (d) => {
          const c = farge(d.querySelector("h2"));
          return c !== "" && c !== SVART;
        },
      },
      {
        tekst: "<h2> har en annen farge enn <h1>",
        test: (d) => farge(d.querySelector("h2")) !== farge(d.querySelector("h1")),
      },
      {
        tekst: "Avsnittene har fått en farge",
        test: (d) => {
          const c = farge(d.querySelector("p"));
          return c !== "" && c !== SVART;
        },
      },
    ],
    hint: "Lag to nye regler under den første: én med selektoren h2, og én med selektoren p.",
  },

  "m2-css-feil": {
    html: `<h1>Stor og rød</h1>
<p>Og jeg skal være grønnblå.</p>
`,
    css: `h1 {
  color: crimson
  font-size: 48px;
}

p {
  colour: teal;
}
`,
    sjekker: [
      {
        tekst: "Overskriften er crimson",
        test: (d) => farge(d.querySelector("h1")) === "rgb(220, 20, 60)",
      },
      {
        tekst: "Overskriften er 48px stor",
        test: (d) => px(d.querySelector("h1")) === 48,
      },
      {
        tekst: "Avsnittet er teal",
        test: (d) => farge(d.querySelector("p")) === "rgb(0, 128, 128)",
      },
    ],
    hint: "Se etter et tegn som mangler på slutten av en linje – og et ord som er stavet på britisk.",
  },

  "m2-bakgrunn": {
    html: `<h1>Velkommen til kafeen</h1>
<p>Vi serverer kaffe, te og hjemmebakte boller.</p>
<p>Åpent hver dag fra 8 til 16.</p>
`,
    css: `body {
  background-color: oldlace;
}
`,
    sjekker: [
      {
        tekst: "Siden har en annen bakgrunnsfarge enn oldlace",
        test: (d) =>
          harBakgrunn(d.body) && stil(d.body).backgroundColor !== "rgb(253, 245, 230)",
      },
      {
        tekst: "Overskriften har en egen bakgrunnsfarge",
        test: (d) => {
          const h1 = d.querySelector("h1");
          return harBakgrunn(h1) && stil(h1!).backgroundColor !== stil(d.body).backgroundColor;
        },
      },
      {
        tekst: "Avsnittene er lette å lese (kontrast minst 4,5:1)",
        test: (d) => {
          const p = [...d.querySelectorAll("p")];
          return p.length > 0 && p.every((x) => lesbar(x));
        },
      },
      {
        tekst: "Overskriften er lett å lese mot sin egen bakgrunn",
        test: (d) => lesbar(d.querySelector("h1")),
      },
    ],
    hint: "Velger du en mørk bakgrunn, må teksten bli lys: body { background-color: midnightblue; color: white; }",
  },

  "m2-skrift": {
    html: `<h1>Ukas oppskrift</h1>
<h2>Tomatsuppe</h2>
<p>En varm suppe som passer perfekt en kald høstdag.</p>
<p>Den tar bare tjue minutter å lage.</p>
`,
    css: `body {
  background-color: ivory;
}
`,
    sjekker: [
      {
        tekst: "body har fått en font-family",
        test: (d) => regler(d).some((r) => r.style.fontFamily !== "" && d.body.matches(r.selectorText)),
      },
      {
        tekst: "Skriftlista slutter med en skriftfamilie (serif, sans-serif eller monospace)",
        test: (d) =>
          /(^|,)\s*(sans-serif|serif|monospace)\s*$/.test(stil(d.body).fontFamily),
      },
      {
        tekst: "Avsnittene har en annen størrelse enn 16px",
        test: (d) => {
          const s = px(d.querySelector("p"));
          return !Number.isNaN(s) && s !== 16;
        },
      },
      {
        tekst: "<h1> er fortsatt større enn <h2>, og <h2> større enn avsnittene",
        test: (d) =>
          px(d.querySelector("h1")) > px(d.querySelector("h2")) &&
          px(d.querySelector("h2")) > px(d.querySelector("p")),
      },
    ],
    hint: "Legg font-family inni body-regelen, og lag en ny regel: p { font-size: 18px; }",
  },

  "m2-link": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Bokklubben</title>
  </head>
  <body>
    <h1>Bokklubben</h1>
    <p>Vi møtes første tirsdag i måneden og snakker om en bok vi alle har lest.</p>
  </body>
</html>
`,
    css: `body {
  background-color: #1e2a38;
  color: #f4ecd8;
  font-family: Georgia, "Times New Roman", serif;
}

h1 {
  color: #f2b134;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Det finnes en <link> til style.css inni <head>",
        test: (d) => d.querySelector("head style[data-lenke]") !== null,
      },
      {
        tekst: "Siden har fått bakgrunnsfargen fra stilarket",
        test: (d) => stil(d.body).backgroundColor === "rgb(30, 42, 56)",
      },
    ],
    hint: `Skriv <link rel="stylesheet" href="style.css"> på en ny linje rett over </head>.`,
  },

  "m2-link-feil": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Turlaget</title>
    <link rel="stylesheet" href="Style.css">
  </head>
  <body>
    <h1>Turlaget</h1>
    <p>Bli med på tur i skog og fjell hver søndag!</p>
  </body>
</html>
`,
    css: `body {
  background-color: honeydew;
  font-family: Verdana, Arial, sans-serif;
}

h1 {
  color: forestgreen;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Stilarket er koblet til, og overskriften er grønn",
        test: (d) => farge(d.querySelector("h1")) === "rgb(34, 139, 34)",
      },
    ],
    hint: "Fila heter style.css. Se nøye på filnavnet i href – bokstav for bokstav.",
  },

  // ── Modul 3: Mer innhold, mer stil ──────────────────────────────────

  "m3-handleliste": {
    html: `<h1>Handleliste</h1>
<p>Til taco på fredag:</p>
`,
    sjekker: [
      {
        tekst: "Det finnes en <ul>",
        test: (d) => d.querySelector("ul") !== null,
      },
      {
        tekst: "Lista har minst tre punkter (<li>) med tekst",
        test: (d) => [...d.querySelectorAll("ul > li")].filter((li) => tekst(li).length > 0).length >= 3,
      },
      {
        tekst: "Alle <li> ligger inni lista",
        test: (d) => {
          const li = [...d.querySelectorAll("li")];
          return li.length > 0 && li.every((x) => x.parentElement?.matches("ul, ol"));
        },
      },
    ],
    hint: "Start med <ul> på én linje og </ul> på en annen. Mellom dem: <li>Lefser</li>, <li>Kjøttdeig</li> …",
  },

  "m3-liste-feil": {
    html: `<h1>Pannekaker</h1>
<ul>
  <li>1. Visp sammen mel og melk</li>
  <li>2. Visp inn eggene</li>
  <li>3. La røren svelle en halvtime</li>
  <li>4. Stek i smør</li>
</ul>
`,
    sjekker: [
      {
        tekst: "Stegene står i en nummerert liste (<ol>)",
        test: (d) => d.querySelectorAll("ol > li").length >= 4,
      },
      {
        tekst: "Det er ingen <ul> igjen",
        test: (d) => d.querySelector("ul") === null,
      },
      {
        tekst: "Tallene er fjernet fra teksten – nettleseren teller selv",
        test: (d) => {
          const li = [...d.querySelectorAll("li")];
          return li.length >= 4 && li.every((x) => !/^\d/.test(tekst(x)));
        },
      },
    ],
    hint: "Bytt <ul> og </ul> med <ol> og </ol>, og slett «1. », «2. » osv. foran hvert steg.",
  },

  "m3-klasse": {
    html: `<h1>Turtips for helga</h1>
<p>Lørdag blir det sol og 12 grader.</p>
<p>Søndag kommer det mye regn og sterk vind.</p>
<p>Ta med niste og varme klær.</p>
<p>Ikke gå over Langfjellet alene på søndag.</p>
`,
    css: `.advarsel {
  color: firebrick;
  font-weight: bold;
}
`,
    sjekker: [
      {
        tekst: "De to avsnittene om søndag er advarsler (røde og fete)",
        test: (d) => {
          const p = [...d.querySelectorAll("p")].filter((x) => /søndag/i.test(tekst(x)));
          return p.length === 2 && p.every((x) => farge(x) === FIREBRICK);
        },
      },
      {
        tekst: "De andre avsnittene er som før",
        test: (d) => {
          const p = [...d.querySelectorAll("p")].filter((x) => !/søndag/i.test(tekst(x)));
          return p.length >= 2 && p.every((x) => farge(x) !== FIREBRICK);
        },
      },
    ],
    hint: `Skriv class="advarsel" inni starttaggen: <p class="advarsel">Søndag kommer …</p>`,
  },

  "m3-span": {
    html: `<h1>Ukeplan</h1>
<p>På mandag har vi gym, og på torsdag er det prøve i matte.</p>
<p>Husk at fredag er siste frist for innleveringen.</p>
`,
    css: ``,
    sjekker: [
      {
        tekst: "Minst to <span> med en klasse ligger inni avsnittene",
        test: (d) =>
          [...d.querySelectorAll("p span[class]")].filter((s) => s.className.trim() !== "").length >= 2,
      },
      {
        tekst: "Spanene har fått bakgrunnsfarge",
        test: (d) => {
          const s = [...d.querySelectorAll("p span")];
          return s.length > 0 && s.every(harBakgrunn);
        },
      },
      {
        tekst: "Resten av avsnittene har ikke bakgrunnsfarge",
        test: (d) => [...d.querySelectorAll("p")].every((p) => !harBakgrunn(p)),
      },
    ],
    hint: `<span class="merket">prøve i matte</span> i HTML, og .merket { background-color: yellow; } i CSS.`,
  },

  "m3-klasse-feil": {
    html: `<h1>Viktig beskjed</h1>
<p class=".advarsel">Skolen er stengt i morgen på grunn av snøstorm.</p>
<p>Alt annet er som vanlig.</p>
`,
    css: `advarsel {
  color: firebrick;
}
`,
    sjekker: [
      {
        tekst: "Beskjeden om snøstormen er rød",
        test: (d) => farge(d.querySelector("p")) === FIREBRICK,
      },
      {
        tekst: "Det andre avsnittet er ikke rødt",
        test: (d) => {
          const p = d.querySelectorAll("p")[1];
          return p !== undefined && farge(p) !== FIREBRICK;
        },
      },
    ],
    hint: "Punktumet hører hjemme i CSS (.advarsel), ikke i class-attributtet i HTML.",
  },

  "m3-hex": {
    html: `<h1>Sommerfest</h1>
<p>Velkommen til sommerfest i skolegården fredag klokka 18!</p>
<p class="info">Ta med noe å grille.</p>
`,
    css: `body {
  background-color: white;
  color: black;
}

h1 {
  color: red;
}

.info {
  background-color: lightblue;
}
`,
    sjekker: [
      {
        tekst: "Bakgrunnen er #f1faee og teksten #1d3557",
        test: (d) =>
          stil(d.body).backgroundColor === "rgb(241, 250, 238)" && farge(d.body) === "rgb(29, 53, 87)",
      },
      {
        tekst: "Overskriften er #e63946",
        test: (d) => farge(d.querySelector("h1")) === "rgb(230, 57, 70)",
      },
      {
        tekst: ".info har bakgrunnen #a8dadc",
        test: (d) => {
          const el = d.querySelector(".info");
          return el !== null && stil(el).backgroundColor === "rgb(168, 218, 220)";
        },
      },
      {
        tekst: "Det står ingen fargenavn igjen i stilarket",
        test: (d) => !/\b(white|black|red|lightblue)\b/i.test(stilarkTekst(d)),
      },
    ],
    hint: "Bytt ut hvert fargenavn med en kode fra paletten: white → #f1faee, black → #1d3557, red → #e63946, lightblue → #a8dadc.",
  },

  "m3-hsl": {
    html: `<h1>Kaffekroken</h1>
<h2>Dagens kake</h2>
<p>Gulrotkake med kremostglasur.</p>
`,
    css: `h1 {
  color: hsl(25, 70%, 30%);
}
`,
    sjekker: [
      {
        tekst: "<h2> har samme fargetone som <h1>, men er lysere",
        test: (d) => {
          const a = hsl(farge(d.querySelector("h1")));
          const b = hsl(farge(d.querySelector("h2")));
          return b[1] > 10 && toneAvstand(a[0], b[0]) <= 5 && b[2] >= a[2] + 5;
        },
      },
      {
        tekst: "Bakgrunnen har samme fargetone, og er veldig lys (lyshet minst 85%)",
        test: (d) => {
          const a = hsl(farge(d.querySelector("h1")));
          const bg = hsl(stil(d.body).backgroundColor);
          return harBakgrunn(d.body) && bg[1] > 10 && toneAvstand(a[0], bg[0]) <= 5 && bg[2] >= 85;
        },
      },
      {
        tekst: "Alt er lett å lese: overskriftene minst 3:1, avsnittet minst 4,5:1",
        test: (d) =>
          [...d.querySelectorAll("h1, h2")].every((h) => lesbar(h, 3)) &&
          [...d.querySelectorAll("p")].every((p) => lesbar(p)),
      },
    ],
    hint: "Behold 25 og 70%, og endre bare det siste tallet: h2 { color: hsl(25, 70%, 40%); } og body { background-color: hsl(25, 70%, 94%); }",
  },

  "m3-midtstill": {
    html: `<h1>Høstdikt</h1>
<p class="ingress">Skrevet av klasse 1STA</p>
<p>Bladene faller, ett for ett.</p>
<p>Vinden tar dem med seg.</p>
<p>Snart er treet bart.</p>
<p class="signatur">– 1STA, oktober</p>
`,
    css: `body {
  font-family: Georgia, serif;
}
`,
    sjekker: [
      {
        tekst: "Overskriften og ingressen er midtstilt",
        test: (d) =>
          ["h1", ".ingress"].every((s) => {
            const el = d.querySelector(s);
            return el !== null && stil(el).textAlign === "center";
          }),
      },
      {
        tekst: "Signaturen står til høyre",
        test: (d) => {
          const el = d.querySelector(".signatur");
          return el !== null && stil(el).textAlign === "right";
        },
      },
      {
        tekst: "Selve diktet står fortsatt til venstre",
        test: (d) => {
          const p = [...d.querySelectorAll("p:not([class])")];
          return p.length >= 3 && p.every(venstre);
        },
      },
    ],
    hint: "Lag tre regler: h1, .ingress og .signatur – med text-align: center; eller text-align: right;",
  },

  "m3-kommentarer": {
    html: `<h1>Sjakklubben</h1>
<p class="ingress">Velkommen til sjakklubben på skolen!</p>
<p>Vi møtes hver onsdag etter skolen i rom 204.</p>
`,
    css: `h1 {
  color: #2a9d8f;
}
.ingress {
  font-size: 20px;
}
body {
  background-color: #fefae0;
  font-family: Verdana, sans-serif;
}
h1 {
  color: hotpink;
}
`,
    sjekker: [
      {
        tekst: "Hotpink-regelen er kommentert ut, så overskriften er #2a9d8f igjen",
        test: (d) => farge(d.querySelector("h1")) === "rgb(42, 157, 143)",
      },
      {
        tekst: "Hotpink-regelen er ikke slettet, bare kommentert ut",
        test: (d) => /\/\*[^]*hotpink[^]*?\*\//.test(stilarkTekst(d)),
      },
      {
        tekst: "Stilarket har minst to kommentarer i tillegg, som overskrifter",
        test: (d) => (stilarkTekst(d).match(/\/\*[^]*?\*\//g) ?? []).length >= 3,
      },
      {
        tekst: "Det står en kommentar i index.html",
        test: (d) => {
          const w = d.createTreeWalker(d, 128 /* NodeFilter.SHOW_COMMENT */);
          return w.nextNode() !== null;
        },
      },
    ],
    hint: "Skriv /* før h1 { color: hotpink; } og */ etter. Lag overskrifter som /* Hele siden */ og /* Overskrifter */. I HTML: <!-- Om klubben -->",
  },

  // ── Modul 4: Flere sider og lenker ──────────────────────────────────

  "m4-lenke": {
    html: `<h1>Mine favorittsider</h1>
<p>Her er noen nettsider jeg bruker mye.</p>
`,
    sjekker: [
      {
        tekst: "Det er minst to lenker til andre nettsteder (som starter med https://)",
        test: (d) =>
          [...d.querySelectorAll("a[href]")].filter((a) =>
            /^https?:\/\//i.test((a.getAttribute("href") ?? "").trim()),
          ).length >= 2,
      },
      {
        tekst: "Lenketekstene sier hvor lenken går – ikke «klikk her»",
        test: (d) => {
          const a = [...d.querySelectorAll("a")];
          return (
            a.length >= 2 &&
            a.every((x) => tekst(x).length > 1 && !/^(klikk )?her$|^lenke$|^link$/i.test(tekst(x)))
          );
        },
      },
      {
        tekst: "Lenkene står inni et avsnitt eller en liste",
        test: (d) => {
          const a = [...d.querySelectorAll("a")];
          return a.length > 0 && a.every((x) => x.closest("p, li") !== null);
        },
      },
    ],
    hint: `<p>Jeg sjekker været på <a href="https://www.yr.no">Yr</a>.</p>`,
  },

  "m4-lenke-feil": {
    html: `<h1>Før turen</h1>
<p>Sjekk været på <a href="www.yr.no">Yr</a>.</p>
<p>Les om turen på <a href="https://ut.no">UT.no.</p>
<p>Lykke til på tur!</p>
`,
    sjekker: [
      {
        tekst: "Lenken til Yr går til https://www.yr.no",
        test: (d) => {
          const a = [...d.querySelectorAll("a")].find((x) => /yr/i.test(tekst(x)));
          return /^https:\/\/(www\.)?yr\.no\/?$/i.test(a?.getAttribute("href")?.trim() ?? "");
        },
      },
      {
        tekst: "«Lykke til på tur!» er ikke en del av noen lenke",
        test: (d) => [...d.querySelectorAll("a")].every((a) => !/lykke/i.test(tekst(a))),
      },
      {
        tekst: "Det er fortsatt to lenker",
        test: (d) => d.querySelectorAll("a[href]").length === 2,
      },
    ],
    hint: "Adresser til andre nettsteder må starte med https://. Og se etter en lenke som aldri blir lukket med </a>.",
  },

  "m4-to-sider": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Forside</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Velkommen!</h1>
    <p>Dette er forsiden min.</p>
  </body>
</html>
`,
    sider: {
      "om-meg.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Om meg</title>
  </head>
  <body>
    <h1>Om meg</h1>
    <p>Jeg heter Kim og går på Vg1.</p>
  </body>
</html>
`,
    },
    css: `body {
  background-color: #f1faee;
  color: #1d3557;
  font-family: Verdana, sans-serif;
}

h1 {
  color: #e63946;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Forsiden har en lenke til om-meg.html",
        test: (_, s) => lenkerTil(s["index.html"], "index.html").includes("om-meg.html"),
      },
      {
        tekst: "om-meg.html har en lenke tilbake til forsiden",
        test: (_, s) => lenkerTil(s["om-meg.html"], "om-meg.html").includes("index.html"),
      },
      {
        tekst: "om-meg.html bruker også stilarket",
        test: (_, s) => harStilark(s["om-meg.html"], "om-meg.html"),
      },
    ],
    hint: `På forsiden: <a href="om-meg.html">Om meg</a>. På om-meg.html: <a href="index.html">Forside</a> – og kopier <link>-linja fra forsiden inn i <head>.`,
  },

  "m4-sti-feil": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Forside</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Velkommen!</h1>
    <ul>
      <li><a href="Om-meg.html">Om meg</a></li>
      <li><a href="hobbyer">Hobbyer</a></li>
    </ul>
    <p>Dette er forsiden min.</p>
  </body>
</html>
`,
    sider: {
      "om-meg.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Om meg</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Om meg</h1>
    <p><a href="index.htm">Tilbake til forsiden</a></p>
    <p>Jeg heter Kim og går på Vg1.</p>
  </body>
</html>
`,
      "hobbyer.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Hobbyer</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hobbyer</h1>
    <p><a href="index.html">Tilbake til forsiden</a></p>
    <p>Jeg liker fotball og gaming.</p>
  </body>
</html>
`,
    },
    css: `body {
  background-color: #f1faee;
  color: #1d3557;
  font-family: Verdana, sans-serif;
}

h1 {
  color: #e63946;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Forsiden lenker til både om-meg.html og hobbyer.html",
        test: (_, s) => {
          const l = lenkerTil(s["index.html"], "index.html");
          return l.includes("om-meg.html") && l.includes("hobbyer.html");
        },
      },
      {
        tekst: "Begge undersidene lenker tilbake til index.html",
        test: (_, s) =>
          ["om-meg.html", "hobbyer.html"].every((f) => lenkerTil(s[f], f).includes("index.html")),
      },
      {
        tekst: "Ingen lenker gir 404",
        test: (_, s) => Object.entries(s).every(([f, side]) => lenkerTil(side, f).every((m) => m in s)),
      },
    ],
    hint: "Klikk på lenkene i forhåndsvisningen og se hvilke som gir 404. Sjekk store bokstaver og filendelsen .html – på alle tre sidene.",
  },

  "m4-meny": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Forside</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li><a href="index.html">Forside</a></li>
      <li><a href="om-meg.html">Om meg</a></li>
      <li><a href="hobbyer.html">Hobbyer</a></li>
    </ul>
    <h1>Velkommen!</h1>
    <p>Dette er forsiden min.</p>
  </body>
</html>
`,
    sider: {
      "om-meg.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Om meg</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Om meg</h1>
    <p>Jeg heter Kim og går på Vg1.</p>
  </body>
</html>
`,
      "hobbyer.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Hobbyer</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hobbyer</h1>
    <p>Jeg liker fotball og gaming.</p>
  </body>
</html>
`,
    },
    css: `body {
  background-color: #f1faee;
  color: #1d3557;
  font-family: Verdana, sans-serif;
}

h1 {
  color: #e63946;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Alle tre sidene har en meny (<ul>) med lenker til alle tre sidene",
        test: (_, s) =>
          Object.entries(s).every(([f, side]) => {
            const l = [...side.querySelectorAll("ul a[href]")].map((a) =>
              løsSti(a.getAttribute("href") ?? "", f),
            );
            return Object.keys(s).every((m) => l.includes(m));
          }),
      },
      {
        tekst: "Menyen står øverst, før <h1>, på alle sidene",
        test: (_, s) =>
          Object.values(s).every((side) => {
            const ul = side.querySelector("ul");
            const h1 = side.querySelector("h1");
            return ul !== null && h1 !== null && (ul.compareDocumentPosition(h1) & 4) !== 0;
          }),
      },
      {
        tekst: "Ingen lenker gir 404",
        test: (_, s) => Object.entries(s).every(([f, side]) => lenkerTil(side, f).every((m) => m in s)),
      },
    ],
    hint: "Kopier hele <ul> … </ul> fra forsiden, og lim den inn rett under <body> på de to andre sidene.",
  },

  "m4-hover": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Forside</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li><a href="index.html">Forside</a></li>
      <li><a href="om-meg.html">Om meg</a></li>
      <li><a href="hobbyer.html">Hobbyer</a></li>
    </ul>
    <h1>Velkommen!</h1>
    <p>Dette er forsiden min.</p>
  </body>
</html>
`,
    css: `body {
  background-color: #f1faee;
  color: #1d3557;
  font-family: Verdana, sans-serif;
}

h1 {
  color: #e63946;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Lenkene i menyen er ikke understreket",
        test: (d) => {
          const a = [...d.querySelectorAll("ul a")];
          return a.length > 0 && a.every((x) => stil(x).textDecorationLine === "none");
        },
      },
      {
        tekst: "Lenkene har fått en egen farge",
        test: (d) => {
          const a = d.querySelector("ul a");
          // Nettleserens standardfarger for lenker: blå, og lilla for besøkte.
          return a !== null && !["rgb(0, 0, 238)", "rgb(85, 26, 139)"].includes(farge(a));
        },
      },
      {
        tekst: "En a:hover-regel endrer noe når musa er over lenken",
        test: (d) =>
          regler(d).some(
            (r) =>
              /\ba:hover\b/.test(r.selectorText) &&
              ["color", "background-color", "text-decoration", "text-decoration-line", "font-weight"].some(
                (e) => r.style.getPropertyValue(e) !== "",
              ),
          ),
      },
    ],
    hint: "a { color: #1d3557; text-decoration: none; } og a:hover { color: #e63946; text-decoration: underline; }",
  },

  "m4-mapper": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Forside</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Velkommen!</h1>
    <p>Har du spørsmål? Ta kontakt!</p>
  </body>
</html>
`,
    sider: {
      "sider/kontakt.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Kontakt</title>
  </head>
  <body>
    <h1>Kontakt</h1>
    <p>Send meg en e-post, så svarer jeg så fort jeg kan.</p>
  </body>
</html>
`,
    },
    css: `body {
  background-color: #f1faee;
  color: #1d3557;
  font-family: Verdana, sans-serif;
}

h1 {
  color: #e63946;
}
`,
    lenketCss: true,
    sjekker: [
      {
        tekst: "Forsiden lenker til sider/kontakt.html",
        test: (_, s) => lenkerTil(s["index.html"], "index.html").includes("sider/kontakt.html"),
      },
      {
        tekst: "Kontaktsiden lenker tilbake til forsiden",
        test: (_, s) => lenkerTil(s["sider/kontakt.html"], "sider/kontakt.html").includes("index.html"),
      },
      {
        tekst: "Kontaktsiden bruker stilarket",
        test: (_, s) => harStilark(s["sider/kontakt.html"], "sider/kontakt.html"),
      },
    ],
    hint: `Fra index.html: href="sider/kontakt.html". Fra kontakt.html må du først opp én mappe: href="../index.html" og href="../style.css".`,
  },

  // ── Modul 5: Bilder ─────────────────────────────────────────────────

  "m5-bilde": {
    html: `<h1>Turen til fjells</h1>
<p>I sommerferien gikk vi på tur i fjellet.</p>
`,
    bilder: ["bilder/fjell.jpg", "bilder/logo.png", "bilder/profil.jpg"],
    sjekker: [
      {
        tekst: "Siden viser bildet bilder/fjell.jpg",
        test: (d) =>
          [...d.querySelectorAll("img")].some(
            (i) => løsSti(i.dataset.sti ?? "", "index.html") === "bilder/fjell.jpg" && vises(i),
          ),
      },
      {
        tekst: "Bildet har en alt-tekst som forteller hva det viser",
        test: (d) => [...d.querySelectorAll("img")].some(godAlt),
      },
      {
        tekst: "Ingen ødelagte bilder på siden",
        test: (d) => [...d.querySelectorAll("img")].every(vises),
      },
    ],
    hint: `<img src="bilder/fjell.jpg" alt="Solnedgang over fjell og fjord">`,
  },

  "m5-bilde-feil": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Forside</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <img src="Bilder/logo.png" alt="Logoen til Fjellklubben">
    <h1>Fjellklubben</h1>
    <p><a href="sider/galleri.html">Se bilder fra turene våre</a></p>
  </body>
</html>
`,
    sider: {
      "sider/galleri.html": `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Galleri</title>
    <link rel="stylesheet" href="../style.css">
  </head>
  <body>
    <p><a href="../index.html">Tilbake til forsiden</a></p>
    <h1>Galleri</h1>
    <img src="bilder/fjell.jpg" alt="Solnedgang over fjell og fjord">
    <img src="../bilder/profil.jpeg" alt="Tegning av turlederen vår, Kim">
  </body>
</html>
`,
    },
    css: `body {
  background-color: #f1faee;
  color: #1d3557;
  font-family: Verdana, sans-serif;
}

img {
  max-width: 100%;
}
`,
    lenketCss: true,
    bilder: ["bilder/fjell.jpg", "bilder/logo.png", "bilder/profil.jpg"],
    sjekker: [
      {
        tekst: "Logoen vises på forsiden",
        test: (_, s) => bilderFinnes(s["index.html"], "index.html", ["bilder/logo.png"]),
      },
      {
        tekst: "Begge bildene vises på galleri-siden",
        test: (_, s) =>
          bilderFinnes(s["sider/galleri.html"], "sider/galleri.html", ["bilder/fjell.jpg", "bilder/profil.jpg"]),
      },
      {
        tekst: "Alle bildene har fortsatt alt-tekst",
        test: (_, s) => Object.values(s).every((side) => [...side.querySelectorAll("img")].every(godAlt)),
      },
    ],
    hint: "Klikk deg rundt og se hvilke bilder som er ødelagte. Sjekk store bokstaver, filendelsen – og om du må opp én mappe med ../ fra galleri-siden.",
  },

  "m5-storrelse": {
    html: `<h1>Om meg</h1>
<img class="profil" src="bilder/profil.jpg" alt="Tegning av Kim som smiler">
<p>Jeg heter Kim og liker å gå i fjellet.</p>
<img src="bilder/fjell.jpg" alt="Solnedgang over fjell og fjord">
`,
    css: `body {
  font-family: Verdana, sans-serif;
}
`,
    bilder: ["bilder/fjell.jpg", "bilder/profil.jpg"],
    sjekker: [
      {
        tekst: "Fjellbildet er ikke bredere enn siden",
        test: (d) => {
          const img = d.querySelector("img:not(.profil)");
          return img !== null && vises(img) && img.getBoundingClientRect().width <= d.documentElement.clientWidth;
        },
      },
      {
        tekst: "Fjellbildet har riktige proporsjoner – det er ikke strukket",
        test: (d) => {
          const r = d.querySelector("img:not(.profil)")?.getBoundingClientRect();
          return r !== undefined && r.height > 0 && Math.abs(r.width / r.height - 1.6) < 0.05;
        },
      },
      {
        tekst: "Profilbildet er mellom 100 og 200 piksler bredt",
        test: (d) => {
          const b = d.querySelector(".profil")?.getBoundingClientRect().width ?? 0;
          return b >= 100 && b <= 200;
        },
      },
      {
        tekst: "Profilbildet er rundt",
        test: (d) => {
          const img = d.querySelector(".profil");
          if (!img) return false;
          const r = stil(img).borderTopLeftRadius;
          const b = img.getBoundingClientRect().width;
          return r.endsWith("%") ? parseFloat(r) >= 50 : parseFloat(r) >= b / 2;
        },
      },
    ],
    hint: "img { max-width: 100%; } for alle bilder, og .profil { width: 150px; border-radius: 50%; } for profilbildet.",
  },

  "m5-figur": {
    html: `<h1>Turen</h1>
<p>Sånn så det ut da vi kom fram til toppen.</p>
<img src="bilder/fjell.jpg" alt="Solnedgang over fjell og fjord">
<p>Foto: Kim Nordmann</p>
`,
    css: `img {
  max-width: 100%;
}
`,
    bilder: ["bilder/fjell.jpg"],
    sjekker: [
      {
        tekst: "Bildet ligger inni en <figure>",
        test: (d) => d.querySelector("figure img") !== null,
      },
      {
        tekst: "Fotografen er kreditert i en <figcaption> inni samme <figure>",
        test: (d) => /kim/i.test(tekst(d.querySelector("figure figcaption"))),
      },
      {
        tekst: "Kreditteringen står ikke lenger i et eget avsnitt",
        test: (d) => [...d.querySelectorAll("p")].every((p) => !/foto/i.test(tekst(p))),
      },
    ],
    hint: "<figure> rundt både <img> og <figcaption>Foto: Kim Nordmann</figcaption>. Slett det gamle avsnittet.",
  },

  "m5-bakgrunn": {
    html: `<h1 class="topp">Fjellklubben</h1>
<p>Vi går på tur hver helg – bli med!</p>
`,
    css: `/* padding gir luft rundt teksten – det lærer du om i modul 6 */
.topp {
  padding: 60px 20px;
  color: white;
}
`,
    bilder: ["bilder/fjell.jpg", "bilder/monster.png"],
    sjekker: [
      {
        tekst: "Hele siden har mønsteret bilder/monster.png som bakgrunn",
        test: (d) => stil(d.body).backgroundImage.includes("monster.png"),
      },
      {
        tekst: ".topp har fjellbildet som bakgrunn",
        test: (d) => {
          const el = d.querySelector(".topp");
          return el !== null && stil(el).backgroundImage.includes("fjell.jpg");
        },
      },
      {
        tekst: "Fjellbildet dekker hele overskriften (background-size: cover)",
        test: (d) => {
          const el = d.querySelector(".topp");
          return el !== null && stil(el).backgroundSize === "cover";
        },
      },
      {
        tekst: ".topp har en mørk bakgrunnsfarge i reserve, så teksten kan leses før bildet er lastet",
        test: (d) => {
          const el = d.querySelector(".topp");
          return el !== null && harBakgrunn(el) && kontrast(lesRgb(stil(el).color), lesRgb(stil(el).backgroundColor)) >= 4.5;
        },
      },
    ],
    hint: `body { background-image: url("bilder/monster.png"); } og i .topp: background-image: url("bilder/fjell.jpg"); background-size: cover; background-color: #1d3557;`,
  },

  "m5-format": {
    html: `<img class="logo" src="bilder/logo.jpg" alt="Logoen til Fjellklubben">
<h1>Fjellklubben</h1>
<img src="bilder/fjell-original.jpg" alt="Solnedgang over fjell og fjord">
`,
    css: `body {
  background-color: #1d3557;
  color: #f1faee;
  font-family: Verdana, sans-serif;
}

.logo {
  width: 100px;
}

img {
  max-width: 100%;
}
`,
    bilder: [
      "bilder/logo.jpg",
      "bilder/logo.png",
      "bilder/logo.svg",
      "bilder/fjell-original.jpg",
      "bilder/fjell.png",
      "bilder/fjell.jpg",
      "bilder/fjell.webp",
    ],
    sjekker: [
      {
        tekst: "Logoen har gjennomsiktig bakgrunn (PNG eller SVG)",
        test: (d) => {
          const img = d.querySelector(".logo");
          const fil = img && løsSti((img as HTMLElement).dataset.sti ?? "", "index.html");
          return img !== null && vises(img) && (fil === "bilder/logo.png" || fil === "bilder/logo.svg");
        },
      },
      {
        tekst: "Fjellbildet er et komprimert bilde for nettet (JPG eller WebP i 1600 piksler)",
        test: (d) => {
          const img = d.querySelector("img:not(.logo)");
          const fil = img && løsSti((img as HTMLElement).dataset.sti ?? "", "index.html");
          return img !== null && vises(img) && (fil === "bilder/fjell.jpg" || fil === "bilder/fjell.webp");
        },
      },
    ],
    hint: "Se på listen over bilder i prosjektet. Bytt logo.jpg med logo.svg (eller logo.png), og fjell-original.jpg med fjell.webp (eller fjell.jpg).",
  },
};

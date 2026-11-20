/**
 * Kodeoppgaver brukt i leksjonene: <Oppgave id="..." /> i MDX.
 *
 * Hver sjekk får dokumentet i forhåndsvisningen og returnerer true når
 * kravet er oppfylt. Sjekkene kjøres på nytt hver gang eleven skriver.
 * Uten sjekker blir oppgaven en fri lekeplass.
 */

import { kontrast, lesRgb, rgbTilHsl, toneAvstand } from "@/lib/farger";
import { løsSti } from "@/lib/stier";
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
  /** Vis knapper for skjermbredde (mobil, nettbrett, PC) over forhåndsvisningen. */
  responsiv?: boolean;
};

/** Filene lenkene på en side peker på (lenker ut av prosjektet er tatt bort). */
const lenkerTil = (side: Document | undefined, fra: string) =>
  [...(side?.querySelectorAll("a[href]") ?? [])]
    .map((a) => løsSti(a.getAttribute("href") ?? "", fra))
    .filter((x): x is string => x !== null);

/**
 * Kjør `fn` mens forhåndsvisningen er `bredde` piksler bred, og sett bredden tilbake etterpå.
 * Media queries i siden svarer på den nye bredden.
 */
function iBredde<T>(d: Document, bredde: number, fn: () => T): T {
  const ramme = d.defaultView?.frameElement as HTMLElement | null;
  if (!ramme) return fn();
  const før = { width: ramme.style.width, transform: ramme.style.transform };
  ramme.style.width = `${bredde}px`;
  ramme.style.transform = "none";
  void d.documentElement.getBoundingClientRect(); // tving ny layout med den nye bredden
  try {
    return fn();
  } finally {
    ramme.style.width = før.width;
    ramme.style.transform = før.transform;
  }
}

/** Antall kolonner elementene står i (forskjellige venstrekanter). */
const kolonner = (d: Document, selektor: string) =>
  new Set([...d.querySelectorAll(selektor)].map((x) => Math.round(x.getBoundingClientRect().left))).size;

/** Alle @media-regler i stilarkene. */
const mediaRegler = (d: Document) =>
  [...d.styleSheets].flatMap((ark) =>
    [...ark.cssRules].filter((r): r is CSSMediaRule => r instanceof d.defaultView!.CSSMediaRule),
  );

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

  // ── Modul 6: Boksmodellen ───────────────────────────────────────────

  "m6-se-boksene": {
    html: `<h1>Alt er bokser</h1>
<p>Hvert element på siden er en firkant – også de du ikke ser.</p>
<ul>
  <li>Overskrifter</li>
  <li>Avsnitt</li>
  <li>Lister og punkter</li>
</ul>
<p>Selv <strong>ord inni tekst</strong> og <a href="#">lenker</a> har en boks.</p>
`,
    css: `* {
  outline: 2px solid tomato;
}
`,
  },

  "m6-div": {
    html: `<h1>Ukas turer</h1>
<h2>Lørdag: Fløyen</h2>
<p>En rolig tur for hele familien. Vi møtes ved Fløibanen klokka 11.</p>
<h2>Søndag: Ulriken</h2>
<p>En brattere tur med flott utsikt. Ta med gode sko!</p>
`,
    css: `.kort {
  background-color: #f1faee;
  border: 2px solid #a8dadc;
}
`,
    sjekker: [
      {
        tekst: "Det er to <div class=\"kort\">",
        test: (d) => d.querySelectorAll("div.kort").length === 2,
      },
      {
        tekst: "Hvert kort har én turbeskrivelse: en <h2> og et avsnitt",
        test: (d) => {
          const k = [...d.querySelectorAll("div.kort")];
          return k.length === 2 && k.every((x) => x.querySelectorAll("h2").length === 1 && x.querySelector("p") !== null);
        },
      },
      {
        tekst: "Hovedoverskriften står utenfor kortene",
        test: (d) => {
          const h1 = d.querySelector("h1");
          return h1 !== null && h1.closest(".kort") === null;
        },
      },
    ],
    hint: `<div class="kort"> rett før <h2>Lørdag …, og </div> rett etter avsnittet. Det samme for søndag.`,
  },

  "m6-padding": {
    html: `<h1>Ukas turer</h1>
<div class="kort">
  <h2>Lørdag: Fløyen</h2>
  <p>En rolig tur for hele familien. Vi møtes ved Fløibanen klokka 11.</p>
</div>
<div class="kort">
  <h2>Søndag: Ulriken</h2>
  <p>En brattere tur med flott utsikt. Ta med gode sko!</p>
</div>
`,
    css: `.kort {
  background-color: #f1faee;
}
`,
    sjekker: [
      {
        tekst: "Kortene har minst 12px padding på alle sider",
        test: (d) => {
          const k = d.querySelector(".kort");
          if (!k) return false;
          const s = stil(k);
          return [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].every((p) => parseFloat(p) >= 12);
        },
      },
      {
        tekst: "Kortene har en kant (border)",
        test: (d) => {
          const k = d.querySelector(".kort");
          return k !== null && parseFloat(stil(k).borderTopWidth) >= 1 && stil(k).borderTopStyle !== "none";
        },
      },
      {
        tekst: "Kortene har runde hjørner",
        test: (d) => {
          const k = d.querySelector(".kort");
          return k !== null && parseFloat(stil(k).borderTopLeftRadius) > 0;
        },
      },
    ],
    hint: ".kort { padding: 16px; border: 2px solid #a8dadc; border-radius: 10px; }",
  },

  "m6-margin": {
    html: `<div class="innhold">
  <h1>Ukas turer</h1>
  <div class="kort">
    <h2>Lørdag: Fløyen</h2>
    <p>En rolig tur for hele familien.</p>
  </div>
  <div class="kort">
    <h2>Søndag: Ulriken</h2>
    <p>En brattere tur med flott utsikt.</p>
  </div>
</div>
`,
    css: `body {
  background-color: #a8dadc;
  font-family: Verdana, sans-serif;
}

.innhold {
  background-color: white;
  padding: 16px;
}

.kort {
  background-color: #f1faee;
  padding: 16px;
  border: 2px solid #1d3557;
  border-radius: 8px;
}
`,
    sjekker: [
      {
        tekst: "Det er minst 16px luft mellom de to kortene",
        test: (d) => {
          const [a, b] = [...d.querySelectorAll(".kort")].map((k) => k.getBoundingClientRect());
          return a !== undefined && b !== undefined && b.top - a.bottom >= 16;
        },
      },
      {
        tekst: ".innhold har en max-width, så den ikke fyller hele bredden",
        test: (d) => {
          const el = d.querySelector(".innhold");
          return el !== null && stil(el).maxWidth !== "none" && el.getBoundingClientRect().width < d.documentElement.clientWidth - 40;
        },
      },
      {
        tekst: ".innhold står midt på siden",
        test: (d) => {
          const r = d.querySelector(".innhold")?.getBoundingClientRect();
          if (!r) return false;
          const venstre = r.left;
          const høyre = d.documentElement.clientWidth - r.right;
          return venstre > 10 && Math.abs(venstre - høyre) <= 2;
        },
      },
    ],
    hint: ".kort { margin-bottom: 20px; } og .innhold { max-width: 240px; margin: 0 auto; }",
  },

  "m6-box-sizing": {
    html: `<h1>Hvorfor stikker den ut?</h1>
<div class="ramme">
  <div class="boks">Jeg skal være akkurat like bred som rammen.</div>
</div>
`,
    css: `.ramme {
  border: 3px dashed #1d3557;
  padding: 10px;
}

.boks {
  width: 100%;
  padding: 20px;
  border: 5px solid #e63946;
  background-color: #f1faee;
}
`,
    sjekker: [
      {
        tekst: "Boksen holder seg innenfor rammen",
        test: (d) => {
          const ramme = d.querySelector(".ramme");
          const boks = d.querySelector(".boks");
          if (!ramme || !boks) return false;
          const r = ramme.getBoundingClientRect();
          const s = stil(ramme);
          const innerHøyre = r.right - parseFloat(s.borderRightWidth) - parseFloat(s.paddingRight);
          return boks.getBoundingClientRect().right <= innerHøyre + 0.5;
        },
      },
      {
        tekst: "Boksen har fortsatt width: 100%, 20px padding og 5px kant",
        test: (d) => {
          const b = d.querySelector(".boks");
          if (!b) return false;
          const s = stil(b);
          const regel = regler(d).some((r) => b.matches(r.selectorText) && r.style.width === "100%");
          return regel && parseFloat(s.paddingLeft) >= 20 && parseFloat(s.borderLeftWidth) >= 5;
        },
      },
      {
        tekst: "Boksen bruker box-sizing: border-box",
        test: (d) => {
          const b = d.querySelector(".boks");
          return b !== null && stil(b).boxSizing === "border-box";
        },
      },
    ],
    hint: "Legg til box-sizing: border-box; – på .boks, eller enda bedre på alle elementer med * { box-sizing: border-box; }",
  },

  // ── Modul 7: Semantisk struktur ─────────────────────────────────────

  "m7-skjelett": {
    html: `<div class="topp">
  <h1>Fjellklubben</h1>
  <div class="meny">
    <ul>
      <li><a href="#">Turer</a></li>
      <li><a href="#">Om oss</a></li>
    </ul>
  </div>
</div>
<div class="innhold">
  <h2>Neste tur</h2>
  <p>Vi går til Fløyen på lørdag. Bli med!</p>
</div>
<div class="bunn">
  <p>Fjellklubben 2026</p>
</div>
`,
    sjekker: [
      {
        tekst: "Toppen er en <header> med <h1> inni",
        test: (d) => d.querySelector("header h1") !== null,
      },
      {
        tekst: "Menyen er en <nav> med lista inni",
        test: (d) => d.querySelector("nav ul a") !== null,
      },
      {
        tekst: "Hovedinnholdet står i én <main>",
        test: (d) => d.querySelectorAll("main").length === 1 && d.querySelector("main h2") !== null,
      },
      {
        tekst: "Bunnteksten står i en <footer>, utenfor <main>",
        test: (d) => {
          const f = d.querySelector("footer");
          return f !== null && f.closest("main") === null && tekst(f).length > 0;
        },
      },
      {
        tekst: "Det er ingen <div> igjen",
        test: (d) => d.querySelectorAll("div").length === 0,
      },
    ],
    hint: "Bytt <div class=\"topp\"> med <header>, <div class=\"meny\"> med <nav>, <div class=\"innhold\"> med <main> og <div class=\"bunn\"> med <footer>. Husk sluttaggene også!",
  },

  "m7-artikler": {
    html: `<header>
  <h1>Kims turblogg</h1>
</header>
<main>
  <h2>Siste innlegg</h2>
  <div class="innlegg">
    <h3>Første tur med ny sekk</h3>
    <p>I helga testet jeg den nye sekken på Ulriken.</p>
  </div>
  <div class="innlegg">
    <h3>Slik pakker du til fjellet</h3>
    <p>Ullundertøy, niste og ekstra sokker. Alltid.</p>
  </div>
  <div class="innlegg">
    <h3>Fem flotte utsiktspunkter</h3>
    <p>Her er favorittene mine rundt Bergen.</p>
  </div>
  <h2>Om bloggen</h2>
  <p>Jeg skriver om tur og friluftsliv.</p>
</main>
`,
    sjekker: [
      {
        tekst: "De tre innleggene er hver sin <article> med overskrift",
        test: (d) => {
          const a = [...d.querySelectorAll("article")];
          return a.length === 3 && a.every((x) => x.querySelector("h3") !== null);
        },
      },
      {
        tekst: "«Siste innlegg» og de tre innleggene står i en <section>",
        test: (d) =>
          [...d.querySelectorAll("section")].some(
            (s) => /siste/i.test(tekst(s.querySelector("h2"))) && s.querySelectorAll("article").length === 3,
          ),
      },
      {
        tekst: "«Om bloggen» er en egen <section>",
        test: (d) =>
          [...d.querySelectorAll("section")].some(
            (s) => /om bloggen/i.test(tekst(s.querySelector("h2"))) && s.querySelector("article") === null,
          ),
      },
      {
        tekst: "Det er ingen <div> igjen",
        test: (d) => d.querySelectorAll("div").length === 0,
      },
    ],
    hint: "Hvert <div class=\"innlegg\"> blir <article>. Pakk så «Siste innlegg» og de tre artiklene inn i én <section>, og «Om bloggen» med avsnittet i en annen.",
  },

  "m7-stil": {
    html: `<header>
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
  <h2>Neste tur</h2>
  <p>Vi går til Fløyen på lørdag. Bli med!</p>
</main>
<footer>
  <p>Fjellklubben 2026 · Laget av Kim</p>
</footer>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
  color: #1d3557;
}

main {
  padding: 16px;
}
`,
    sjekker: [
      {
        tekst: "<header> har bakgrunnsfarge og padding",
        test: (d) => {
          const h = d.querySelector("header");
          return h !== null && harBakgrunn(h) && parseFloat(stil(h).paddingLeft) >= 8;
        },
      },
      {
        tekst: "Menyen har ingen kulepunkter",
        test: (d) => {
          const ul = d.querySelector("nav ul");
          return ul !== null && stil(ul).listStyleType === "none";
        },
      },
      {
        tekst: "Menylenkene er ikke understreket, og er lette å lese mot bakgrunnen",
        test: (d) => {
          const a = [...d.querySelectorAll("nav a")];
          return a.length > 0 && a.every((x) => stil(x).textDecorationLine === "none" && lesbar(x));
        },
      },
      {
        tekst: "<footer> har bakgrunnsfarge, lesbar tekst og mindre skrift enn resten",
        test: (d) => {
          const f = d.querySelector("footer");
          const p = d.querySelector("footer p");
          return f !== null && p !== null && harBakgrunn(f) && lesbar(p) && px(p) < px(d.querySelector("main p"));
        },
      },
    ],
    hint: "header { background-color: #1d3557; color: white; padding: 16px; } nav ul { list-style: none; padding: 0; } nav a { color: white; text-decoration: none; } footer { background-color: #f1faee; padding: 16px; font-size: 14px; }",
  },

  "m7-id": {
    html: `<header>
  <h1>Fjellklubben</h1>
  <nav>
    <ul>
      <li><a href="#">Turer</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>Turer</h2>
    <p>Lørdag: Fløyen. Vi møtes ved Fløibanen klokka 11.</p>
    <p>Søndag: Ulriken. Ta med gode sko, det er bratt.</p>
    <p>Neste helg: Sandviksfjellet. Mer informasjon kommer.</p>
    <p>I høstferien: tre dager i Jotunheimen, med overnatting på hytte.</p>
  </section>
  <section>
    <h2>Kontakt</h2>
    <p>Lurer du på noe? Spør en av turlederne.</p>
  </section>
</main>
`,
    css: `section {
  padding: 12px;
}
`,
    sjekker: [
      {
        tekst: "Seksjonene har id-ene turer og kontakt",
        test: (d) => d.getElementById("turer")?.tagName === "SECTION" && d.getElementById("kontakt")?.tagName === "SECTION",
      },
      {
        tekst: "Menylenkene peker på #turer og #kontakt",
        test: (d) => {
          const h = [...d.querySelectorAll("nav a")].map((a) => a.getAttribute("href"));
          return h.includes("#turer") && h.includes("#kontakt");
        },
      },
      {
        tekst: "Ingen id er brukt to ganger",
        test: (d) => {
          const ider = [...d.querySelectorAll("[id]")].map((e) => e.id);
          return new Set(ider).size === ider.length;
        },
      },
      {
        tekst: "Kontakt-seksjonen er stylet med #kontakt i CSS",
        test: (d) => {
          const k = d.getElementById("kontakt");
          return k !== null && regler(d).some((r) => /#kontakt\b/.test(r.selectorText) && r.style.length > 0) && harBakgrunn(k);
        },
      },
    ],
    hint: `<section id="kontakt"> og <a href="#kontakt">Kontakt</a>. I CSS: #kontakt { background-color: #f1faee; }`,
  },

  "m7-uu": {
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Fjellklubben</title>
  </head>
  <body>
    <div class="topp">
      <h1>Fjellklubben</h1>
    </div>
    <div class="innhold">
      <h3>Neste tur</h3>
      <img src="bilder/fjell.jpg">
      <p>Vi går til Fløyen på lørdag. Påmelding <a href="#">her</a>.</p>
    </div>
  </body>
</html>
`,
    css: `body {
  font-family: Verdana, sans-serif;
  color: #aaaaaa;
}

img {
  max-width: 100%;
}
`,
    bilder: ["bilder/fjell.jpg"],
    sjekker: [
      {
        tekst: "<html> forteller at siden er på norsk",
        test: (d) => /^(no|nb|nn)\b/i.test(d.documentElement.lang),
      },
      {
        tekst: "Siden har <header> og <main> i stedet for div-er",
        test: (d) => d.querySelector("header") !== null && d.querySelector("main") !== null,
      },
      {
        tekst: "Overskriftene hopper ikke over nivåer",
        test: (d) => {
          const nivå = [...d.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
          return nivå[0] === 1 && nivå.every((n, i) => i === 0 || n <= nivå[i - 1] + 1);
        },
      },
      {
        tekst: "Bildet har en alt-tekst som beskriver det",
        test: (d) => {
          const img = [...d.querySelectorAll("img")];
          return img.length > 0 && img.every(godAlt);
        },
      },
      {
        tekst: "Lenketeksten sier hvor lenken går",
        test: (d) => {
          const a = [...d.querySelectorAll("a")];
          return a.length > 0 && a.every((x) => tekst(x).length > 3 && !/^(her|klikk her|les mer|link|lenke)$/i.test(tekst(x)));
        },
      },
      {
        tekst: "Teksten er lett å lese (kontrast minst 4,5:1)",
        test: (d) => [...d.querySelectorAll("p")].every((p) => lesbar(p)),
      },
    ],
    hint: "Seks feil: lang på <html>, header/main, <h3> som skulle vært <h2>, alt på bildet, lenketeksten «her», og den lysegrå tekstfargen.",
  },

  // ── Modul 8: Typografi ──────────────────────────────────────────────

  "m8-lesbar": {
    html: `<main>
  <h1>Turen til Trolltunga – en lang og fin dag i fjellet</h1>
  <p>Vi startet fra Skjeggedal før sola var oppe. Første del av turen er bratt, og vi tok mange pauser for å se utover Ringedalsvatnet. Etter et par timer flatet det ut, og vi gikk over store svaberg med snøflekker her og der.</p>
  <p>Da vi endelig kom fram til Trolltunga, var det kø for å ta bilde. Men det var verdt ventetiden. Utsikten over vannet sju hundre meter under er noe av det fineste jeg har sett.</p>
</main>
`,
    css: `body {
  font-family: Georgia, serif;
  line-height: 1.1;
}
`,
    sjekker: [
      {
        tekst: "Avsnittene har en linjeavstand mellom 1,4 og 1,8",
        test: (d) => {
          const p = d.querySelector("p");
          if (!p) return false;
          const forhold = parseFloat(stil(p).lineHeight) / px(p);
          return forhold >= 1.4 && forhold <= 1.8;
        },
      },
      {
        tekst: "Overskriften har tettere linjeavstand enn avsnittene",
        test: (d) => {
          const h1 = d.querySelector("h1");
          const p = d.querySelector("p");
          if (!h1 || !p) return false;
          return parseFloat(stil(h1).lineHeight) / px(h1) < parseFloat(stil(p).lineHeight) / px(p) - 0.15;
        },
      },
      {
        tekst: "<main> har en max-width mellom 45ch og 75ch",
        test: (d) => {
          const main = d.querySelector("main");
          return (
            main !== null &&
            regler(d).some((r) => {
              const m = /^([\d.]+)ch$/.exec(r.style.maxWidth);
              return m !== null && main.matches(r.selectorText) && Number(m[1]) >= 45 && Number(m[1]) <= 75;
            })
          );
        },
      },
    ],
    hint: "body { line-height: 1.6; } h1 { line-height: 1.2; } main { max-width: 65ch; margin: 0 auto; }",
  },

  "m8-rem": {
    html: `<h1>Klubbavisa</h1>
<h2>Høstens turer</h2>
<p>Vi har planlagt seks turer denne høsten, fra korte ettermiddagsturer til en helgetur med telt.</p>
<p class="liten">Sist oppdatert 1. september</p>
`,
    css: `h1 {
  font-size: 32px;
}

h2 {
  font-size: 24px;
}

p {
  font-size: 18px;
}

.liten {
  font-size: 14px;
}
`,
    sjekker: [
      {
        tekst: "Skriftstørrelsene står i rem – ikke i px",
        test: (d) =>
          !/font-size\s*:\s*[\d.]+px/i.test(stilarkTekst(d)) &&
          regler(d).filter((r) => r.style.fontSize).every((r) => r.style.fontSize.endsWith("rem")),
      },
      {
        tekst: "Størrelsene er de samme som før: 32, 24, 18 og 14 piksler",
        test: (d) =>
          px(d.querySelector("h1")) === 32 &&
          px(d.querySelector("h2")) === 24 &&
          px(d.querySelector("p:not(.liten)")) === 18 &&
          px(d.querySelector(".liten")) === 14,
      },
      {
        tekst: "Når brukeren gjør teksten større i nettleseren, blir alt større",
        test: (d) => {
          const rot = d.documentElement;
          const før = rot.style.fontSize;
          rot.style.fontSize = "20px";
          const ok = px(d.querySelector("h1")) === 40 && px(d.querySelector(".liten")) === 17.5;
          rot.style.fontSize = før;
          return ok;
        },
      },
    ],
    hint: "Del på 16: 32px = 2rem, 24px = 1.5rem, 18px = 1.125rem og 14px = 0.875rem.",
  },

  "m8-skala": {
    html: `<h1>Fjellturer i Vestland</h1>
<h2>Ulriken fra sør</h2>
<h3>Hva du trenger</h3>
<p>Gode sko, niste og vann. Turen tar rundt tre timer.</p>
`,
    css: `p {
  font-size: 1rem;
}

h3 {
  font-size: 1rem;
}

h2 {
  font-size: 2rem;
}

h1 {
  font-size: 2rem;
}
`,
    sjekker: [
      {
        tekst: "Hvert nivå er større enn nivået under: p < h3 < h2 < h1",
        test: (d) => {
          const s = ["p", "h3", "h2", "h1"].map((t) => px(d.querySelector(t)));
          return s.every((x, i) => i === 0 || x > s[i - 1]);
        },
      },
      {
        tekst: "Hvert trinn er mellom 1,1 og 1,65 ganger større enn trinnet under",
        test: (d) => {
          const s = ["p", "h3", "h2", "h1"].map((t) => px(d.querySelector(t)));
          return s.slice(1).every((x, i) => x / s[i] >= 1.1 && x / s[i] <= 1.65);
        },
      },
      {
        tekst: "Forholdet er omtrent det samme hele veien",
        test: (d) => {
          const s = ["p", "h3", "h2", "h1"].map((t) => px(d.querySelector(t)));
          const f = s.slice(1).map((x, i) => x / s[i]);
          return Math.max(...f) - Math.min(...f) <= 0.08;
        },
      },
    ],
    hint: "Med forholdet 1,25: h3 { font-size: 1.25rem; } h2 { font-size: 1.563rem; } h1 { font-size: 1.953rem; }",
  },

  "m8-webfont": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Fjellklubben</title>
  </head>
  <body>
    <h1>Fjellklubben</h1>
    <p>Vi går på tur hver helg, hele året. Alle er velkomne – du trenger bare gode sko.</p>
  </body>
</html>
`,
    css: `body {
  font-family: Georgia, serif;
  line-height: 1.6;
}
`,
    sjekker: [
      {
        tekst: "En <link> i <head> henter en font fra Google Fonts",
        test: (d) => d.querySelector('head link[href*="fonts.googleapis.com"]') !== null,
      },
      {
        tekst: "Overskriften bruker fonten fra lenken, med en reserve til slutt",
        test: (d) => {
          const href = d.querySelector('link[href*="fonts.googleapis.com"]')?.getAttribute("href") ?? "";
          const fonter = [...href.matchAll(/family=([^:&]+)/g)].map((m) => decodeURIComponent(m[1]).replace(/\+/g, " ").toLowerCase());
          const h1 = d.querySelector("h1");
          if (!h1) return false;
          const liste = stil(h1).fontFamily.split(",").map((f) => f.trim().replace(/["']/g, "").toLowerCase());
          return fonter.includes(liste[0]) && /^(serif|sans-serif|monospace|cursive|system-ui)$/.test(liste.at(-1) ?? "");
        },
      },
      {
        tekst: "Brødteksten bruker en annen skrift enn overskriften",
        test: (d) => {
          const h1 = d.querySelector("h1");
          const p = d.querySelector("p");
          return h1 !== null && p !== null && stil(h1).fontFamily !== stil(p).fontFamily;
        },
      },
    ],
    hint: `I <head>: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@700&display=swap">. I CSS: h1 { font-family: "Lora", serif; }`,
  },

  "m8-sitat": {
    html: `<h1>Ukas ordtak</h1>
<p>Før du pakker sekken, er det lurt å huske hva de gamle sa:</p>
<p>Det finnes ikke dårlig vær, bare dårlige klær. – Norsk ordtak</p>
`,
    css: `body {
  font-family: Georgia, serif;
}
`,
    sjekker: [
      {
        tekst: "Sitatet står i en <blockquote>",
        test: (d) => /dårlig vær/i.test(tekst(d.querySelector("blockquote"))),
      },
      {
        tekst: "Hvem som har sagt det, står i en <footer> eller <cite> inni sitatet",
        test: (d) => /ordtak/i.test(tekst(d.querySelector("blockquote footer, blockquote cite"))),
      },
      {
        tekst: "Sitatet har en strek på venstre side, og luft mellom streken og teksten",
        test: (d) => {
          const b = d.querySelector("blockquote");
          if (!b) return false;
          const s = stil(b);
          return parseFloat(s.borderLeftWidth) >= 3 && s.borderLeftStyle !== "none" && parseFloat(s.paddingLeft) >= 8;
        },
      },
    ],
    hint: `<blockquote><p>Det finnes ikke dårlig vær, bare dårlige klær.</p><footer>– Norsk ordtak</footer></blockquote>, og blockquote { border-left: 4px solid #a8dadc; padding-left: 16px; }`,
  },

  "m8-tegn": {
    html: `<h1>HTML-tips</h1>
<p>Et avsnitt starter med <p> og slutter med </p>.</p>
<p>Mindre enn skrives som <, og større enn som >.</p>
<footer>
  <p>(c) 2026 Kim</p>
</footer>
`,
    css: `footer {
  font-size: 0.875rem;
}
`,
    sjekker: [
      {
        tekst: "Teksten viser <p> og </p> som tekst",
        test: (d) => [...d.querySelectorAll("p")].some((p) => tekst(p).includes("<p>") && tekst(p).includes("</p>")),
      },
      {
        tekst: "Det er bare tre avsnitt: to tips og bunnteksten",
        test: (d) => d.querySelectorAll("p").length === 3 && [...d.querySelectorAll("p")].every((p) => tekst(p).length > 2),
      },
      {
        tekst: "Bunnteksten har et ekte ©-tegn",
        test: (d) => tekst(d.querySelector("footer")).includes("©") && !/\(c\)/i.test(tekst(d.querySelector("footer"))),
      },
    ],
    hint: "Skriv &lt; for < og &gt; for >. &copy; blir ©.",
  },

  // ── Modul 9: Selektorer og kaskaden ─────────────────────────────────

  "m9-tabell": {
    html: `<h1>Høstens turer</h1>
<p>5. oktober: Fløyen, 1 time, lett</p>
<p>12. oktober: Ulriken, 3 timer, middels</p>
<p>19. oktober: Stoltzekleiven, 1 time, krevende</p>
`,
    css: `table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #a8dadc;
  padding: 4px 10px;
  text-align: left;
}
`,
    sjekker: [
      {
        tekst: "Turene står i en <table> med en <caption>",
        test: (d) => tekst(d.querySelector("table > caption")).length > 0,
      },
      {
        tekst: "<thead> har overskrifter (<th>) for dato, tur, tid og vanskelighet",
        test: (d) => d.querySelectorAll("thead th").length >= 4,
      },
      {
        tekst: "<tbody> har én rad per tur, med en celle under hver overskrift",
        test: (d) => {
          const th = d.querySelectorAll("thead th").length;
          const rader = [...d.querySelectorAll("tbody tr")];
          return rader.length === 3 && rader.every((r) => r.querySelectorAll("td").length === th);
        },
      },
      {
        tekst: "Turene står ikke lenger i avsnitt",
        test: (d) => [...d.querySelectorAll("p")].every((p) => !/oktober/i.test(tekst(p))),
      },
    ],
    hint: "<table><caption>…</caption><thead><tr><th>Dato</th><th>Tur</th><th>Tid</th><th>Vanskelighet</th></tr></thead><tbody><tr><td>5. oktober</td>…</tr></tbody></table>",
  },

  "m9-dl": {
    html: `<h1>Ordliste for fjellet</h1>
<p>Varde: En steinhaug som viser hvor stien går.</p>
<p>Tregrense: Høyden der skogen slutter.</p>
<p>Dagstur: En tur uten overnatting.</p>
`,
    css: `dt {
  font-weight: bold;
}
`,
    sjekker: [
      {
        tekst: "Ordene står i en <dl> som <dt>",
        test: (d) => {
          const dt = [...d.querySelectorAll("dl > dt")].map((x) => tekst(x).toLowerCase());
          return ["varde", "tregrense", "dagstur"].every((o) => dt.some((x) => x.startsWith(o)));
        },
      },
      {
        tekst: "Hvert ord følges av forklaringen sin i en <dd>",
        test: (d) => {
          const dt = [...d.querySelectorAll("dl > dt")];
          return dt.length === 3 && dt.every((x) => x.nextElementSibling?.tagName === "DD" && tekst(x.nextElementSibling).length > 5);
        },
      },
      {
        tekst: "Ingen kolon eller avsnitt igjen",
        test: (d) => d.querySelectorAll("p").length === 0 && ![...d.querySelectorAll("dt")].some((x) => tekst(x).includes(":")),
      },
    ],
    hint: "<dl><dt>Varde</dt><dd>En steinhaug som viser hvor stien går.</dd> … </dl>",
  },

  "m9-kombinator": {
    html: `<nav>
  <ul class="meny">
    <li><a href="#">Forside</a></li>
    <li><a href="#">Turer</a>
      <ul>
        <li><a href="#">Fjell</a></li>
        <li><a href="#">Skog</a></li>
      </ul>
    </li>
  </ul>
</nav>
<article>
  <h2>Ulriken</h2>
  <p>Bergens høyeste fjell, 643 meter over havet.</p>
  <p>Ta <a href="#">Ulriksbanen</a> opp, og gå ned.</p>
</article>
`,
    css: ``,
    sjekker: [
      {
        tekst: "Lenker inni artikkelen er fete – menylenkene er det ikke",
        test: (d) => {
          const vekt = (a: Element) => Number(stil(a).fontWeight);
          return (
            [...d.querySelectorAll("article a")].every((a) => vekt(a) >= 600) &&
            [...d.querySelectorAll("nav a")].every((a) => vekt(a) < 600)
          );
        },
      },
      {
        tekst: "Bare de øverste menypunktene har bakgrunnsfarge – ikke de i undermenyen",
        test: (d) =>
          [...d.querySelectorAll(".meny > li")].every(harBakgrunn) &&
          [...d.querySelectorAll(".meny li li")].every((li) => !harBakgrunn(li)),
      },
      {
        tekst: "Avsnittet rett etter overskriften er større enn de andre avsnittene",
        test: (d) => {
          const første = d.querySelector("h2 + p");
          const andre = d.querySelector("h2 + p ~ p");
          return første !== null && andre !== null && px(første) > px(andre);
        },
      },
    ],
    hint: "article a { font-weight: bold; } .meny > li { background-color: #f1faee; } h2 + p { font-size: 1.25rem; }",
  },

  "m9-stripete": {
    html: `<table>
  <caption>Turer i høst</caption>
  <thead>
    <tr><th>Tur</th><th>Timer</th></tr>
  </thead>
  <tbody>
    <tr><td>Fløyen</td><td>1</td></tr>
    <tr><td>Ulriken</td><td>3</td></tr>
    <tr><td>Stoltzekleiven</td><td>1</td></tr>
    <tr><td>Rundemanen</td><td>4</td></tr>
    <tr><td>Lyderhorn</td><td>2</td></tr>
  </tbody>
</table>
`,
    css: `table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 6px 10px;
  text-align: left;
}
`,
    sjekker: [
      {
        tekst: "Annenhver rad i <tbody> har en annen bakgrunnsfarge",
        test: (d) => {
          const bg = [...d.querySelectorAll("tbody tr")].map((r) => synligBakgrunn(r.querySelector("td")).join());
          return bg.length === 5 && bg[0] !== bg[1] && bg[0] === bg[2] && bg[2] === bg[4] && bg[1] === bg[3];
        },
      },
      {
        tekst: "Overskriftsraden skiller seg ut fra radene under",
        test: (d) => {
          const th = synligBakgrunn(d.querySelector("th")).join();
          return [...d.querySelectorAll("tbody td")].every((td) => synligBakgrunn(td).join() !== th);
        },
      },
      {
        tekst: "All tekst i tabellen er lett å lese",
        test: (d) => [...d.querySelectorAll("th, td")].every((c) => lesbar(c)),
      },
    ],
    hint: "tbody tr:nth-child(even) { background-color: #f1faee; } th { background-color: #1d3557; color: white; }",
  },

  "m9-focus": {
    html: `<nav>
  <a href="#">Turer</a>
  <a href="#">Om oss</a>
  <a href="#">Kontakt</a>
</nav>
<p>Prøv å klikke i forhåndsvisningen og trykke Tab – ser du hvilken lenke du står på?</p>
`,
    css: `nav a {
  color: #1d3557;
  text-decoration: none;
  margin-right: 12px;
}

nav a:hover {
  text-decoration: underline;
}

a:focus {
  outline: none;
}
`,
    sjekker: [
      {
        tekst: "Ingen regel fjerner fokusmarkeringen",
        test: (d) =>
          !regler(d).some(
            (r) => /:focus/.test(r.selectorText) && (r.style.outlineStyle === "none" || r.style.outlineWidth === "0px"),
          ),
      },
      {
        tekst: "Lenkene har en tydelig egen stil når de har fokus",
        test: (d) =>
          regler(d).some(
            (r) =>
              /\ba:focus(-visible)?\b/.test(r.selectorText) &&
              ["outline-style", "outline", "background-color", "box-shadow", "text-decoration-line"].some(
                (e) => r.style.getPropertyValue(e) !== "" && r.style.getPropertyValue(e) !== "none",
              ),
          ),
      },
    ],
    hint: "Slett a:focus { outline: none; }. Lag heller: a:focus-visible { outline: 3px solid #e63946; outline-offset: 2px; }",
  },

  "m9-kaskade": {
    html: `<nav id="meny">
  <a href="#">Turer</a>
  <a href="#">Om oss</a>
  <a href="#" class="knapp">Bli medlem</a>
</nav>
`,
    css: `#meny a {
  color: #1d3557;
  background-color: transparent;
  padding: 6px 10px;
  text-decoration: none;
}

.knapp {
  color: white;
  background-color: #e63946;
  border-radius: 6px;
}
`,
    sjekker: [
      {
        tekst: "«Bli medlem» er en rød knapp med hvit tekst",
        test: (d) => {
          const k = d.querySelector(".knapp");
          return k !== null && stil(k).backgroundColor === "rgb(230, 57, 70)" && farge(k) === "rgb(255, 255, 255)";
        },
      },
      {
        tekst: "De andre lenkene er som før",
        test: (d) =>
          [...d.querySelectorAll("#meny a:not(.knapp)")].every(
            (a) => farge(a) === "rgb(29, 53, 87)" && !harBakgrunn(a),
          ),
      },
      {
        tekst: "Uten !important",
        test: (d) => !/!\s*important/i.test(stilarkTekst(d)),
      },
    ],
    hint: "#meny a har spesifisiteten (1, 0, 1), og .knapp bare (0, 1, 0). Gjør knapp-regelen sterkere: #meny .knapp har (1, 1, 0).",
  },

  // ── Modul 10: Display og flyt ───────────────────────────────────────

  "m10-merkelapper": {
    html: `<h1>Ulriken</h1>
<p>
  <span class="merke">Bratt</span>
  <span class="merke">3 timer</span>
  <span class="merke">Utsikt</span>
</p>
<p>Bergens høyeste fjell, med utsikt over hele byen.</p>
`,
    css: `p {
  margin: 4px 0;
}

.merke {
  background-color: #a8dadc;
  color: #1d3557;
  padding: 10px 14px;
  margin: 12px 4px;
  border-radius: 999px;
}
`,
    sjekker: [
      {
        tekst: ".merke er inline-block",
        test: (d) => {
          const m = [...d.querySelectorAll(".merke")];
          return m.length === 3 && m.every((x) => stil(x).display === "inline-block");
        },
      },
      {
        tekst: "Merkelappene står fortsatt ved siden av hverandre",
        test: (d) => {
          const t = [...d.querySelectorAll(".merke")].map((x) => x.getBoundingClientRect().top);
          return t.length === 3 && t.every((x) => Math.abs(x - t[0]) < 1);
        },
      },
      {
        tekst: "Avsnittet under blir ikke dekket av merkelappene",
        test: (d) => {
          const bunn = Math.max(...[...d.querySelectorAll(".merke")].map((x) => x.getBoundingClientRect().bottom));
          const p = d.querySelectorAll("p")[1];
          return p !== undefined && p.getBoundingClientRect().top >= bunn;
        },
      },
    ],
    hint: "Legg til display: inline-block; i .merke-regelen.",
  },

  "m10-meny": {
    html: `<header>
  <nav>
    <ul>
      <li><a href="#">Forside</a></li>
      <li><a href="#">Turer</a></li>
      <li><a href="#">Om oss</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>Fjellklubben</h1>
</main>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #1d3557;
}

nav a {
  color: white;
  text-decoration: none;
}
`,
    sjekker: [
      {
        tekst: "Menypunktene står ved siden av hverandre",
        test: (d) => {
          const r = [...d.querySelectorAll("nav li")].map((x) => x.getBoundingClientRect());
          return r.length === 3 && r.every((x) => Math.abs(x.top - r[0].top) < 1) && r[0].left < r[1].left && r[1].left < r[2].left;
        },
      },
      {
        tekst: "Hver lenke er en boks med padding, minst 40 piksler høy",
        test: (d) => {
          const a = [...d.querySelectorAll("nav a")];
          return a.length === 3 && a.every((x) => stil(x).display !== "inline" && x.getBoundingClientRect().height >= 40);
        },
      },
      {
        tekst: "Den blå menylinja er like høy som lenkene",
        test: (d) => {
          const ul = d.querySelector("nav ul")?.getBoundingClientRect();
          const a = d.querySelector("nav a")?.getBoundingClientRect();
          return ul !== undefined && a !== undefined && ul.height >= a.height - 1;
        },
      },
      {
        tekst: "Lenkene endrer seg når musa er over",
        test: (d) =>
          regler(d).some(
            (r) => /\ba:hover\b/.test(r.selectorText) && (r.style.backgroundColor !== "" || r.style.color !== "" || r.style.textDecorationLine !== ""),
          ),
      },
    ],
    hint: "nav li { display: inline-block; } nav a { display: inline-block; padding: 12px 16px; } nav a:hover { background-color: #457b9d; }",
  },

  "m10-overflow": {
    html: `<h1>Gjestebok</h1>
<div class="boks">
  <p>Takk for en fin tur! Vi kommer gjerne igjen.</p>
  <p>Se bildene mine: https://www.eksempel.no/bilder/2026/fjellturmedfjellklubbentilulrikenioktober.html</p>
  <p>Fantastisk utsikt fra toppen. Litt bratt i starten, men verdt det.</p>
  <p>Neste gang tar vi med kakao til alle!</p>
</div>
<p>Skriv gjerne en hilsen du også.</p>
`,
    css: `.boks {
  height: 120px;
  padding: 10px;
  border: 2px solid #1d3557;
}
`,
    sjekker: [
      {
        tekst: "Boksen er fortsatt 120 piksler høy",
        test: (d) => {
          const b = d.querySelector(".boks");
          return b !== null && Math.abs(parseFloat(stil(b).height) - 120) < 1;
        },
      },
      {
        tekst: "Teksten flyter ikke ut av boksen – man kan rulle i den i stedet",
        test: (d) => {
          const b = d.querySelector(".boks");
          return b !== null && ["auto", "scroll"].includes(stil(b).overflowY);
        },
      },
      {
        tekst: "Den lange adressen bryter over flere linjer i stedet for å stikke ut til siden",
        test: (d) => {
          const b = d.querySelector(".boks");
          return b !== null && b.scrollWidth <= b.clientWidth + 1;
        },
      },
    ],
    hint: ".boks { overflow: auto; overflow-wrap: anywhere; }",
  },

  "m10-skjul": {
    html: `<h1>Turer i høst</h1>
<p class="melding">Påmeldingen åpner 1. september.</p>
<p>Lørdag: Fløyen. Vi møtes ved Fløibanen klokka 11.</p>
<p>Søndag: Ulriken. Ta med gode sko!</p>
`,
    css: `.melding {
  background-color: #fdf3d0;
  padding: 10px;
}
`,
    sjekker: [
      {
        tekst: "Meldingen om påmelding vises ikke lenger",
        test: (d) => {
          const m = d.querySelector(".melding");
          return m !== null && (stil(m).display === "none" || stil(m).visibility === "hidden");
        },
      },
      {
        tekst: "Det står ikke igjen noe tomt hull der meldingen var",
        test: (d) => {
          const m = d.querySelector(".melding");
          return m !== null && stil(m).display === "none";
        },
      },
      {
        tekst: "Meldingen er fortsatt i HTML-en – den er bare skjult med CSS",
        test: (d) => tekst(d.querySelector(".melding")).includes("Påmeldingen"),
      },
    ],
    hint: ".melding { display: none; } – ikke visibility: hidden, som lar plassen stå tom.",
  },

  // ── Modul 11: Flexbox ───────────────────────────────────────────────

  "m11-rad": {
    html: `<h1>Ukas turer</h1>
<div class="kort-rad">
  <article class="kort">
    <h2>Fløyen</h2>
    <p>Lett, 1 time.</p>
  </article>
  <article class="kort">
    <h2>Ulriken</h2>
    <p>Middels, 3 timer.</p>
  </article>
  <article class="kort">
    <h2>Stoltzen</h2>
    <p>Krevende, 1 time.</p>
  </article>
</div>
`,
    css: `.kort {
  padding: 10px;
  background-color: #f1faee;
  border: 2px solid #a8dadc;
  border-radius: 8px;
}

.kort h2 {
  margin: 0;
  font-size: 1rem;
}
`,
    sjekker: [
      {
        tekst: ".kort-rad er en flex-container",
        test: (d) => {
          const r = d.querySelector(".kort-rad");
          return r !== null && stil(r).display === "flex";
        },
      },
      {
        tekst: "Kortene står ved siden av hverandre",
        test: (d) => {
          const r = [...d.querySelectorAll(".kort")].map((k) => k.getBoundingClientRect());
          return r.length === 3 && r.every((x) => Math.abs(x.top - r[0].top) < 1) && r[0].left < r[1].left && r[1].left < r[2].left;
        },
      },
      {
        tekst: "Det er minst 12px mellomrom mellom kortene",
        test: (d) => {
          const r = [...d.querySelectorAll(".kort")].map((k) => k.getBoundingClientRect());
          return r.length === 3 && r[1].left - r[0].right >= 12 && r[2].left - r[1].right >= 12;
        },
      },
    ],
    hint: ".kort-rad { display: flex; gap: 16px; }",
  },

  "m11-sentrer": {
    html: `<div class="scene">
  <div class="boks">Midt i!</div>
</div>
`,
    css: `.scene {
  height: 200px;
  background-color: #1d3557;
}

.boks {
  width: 100px;
  padding: 10px;
  background-color: #f4a261;
  text-align: center;
}
`,
    sjekker: [
      {
        tekst: "Boksen står midt på – vannrett",
        test: (d) => {
          const s = d.querySelector(".scene")?.getBoundingClientRect();
          const b = d.querySelector(".boks")?.getBoundingClientRect();
          return s !== undefined && b !== undefined && Math.abs(s.left + s.width / 2 - (b.left + b.width / 2)) <= 1;
        },
      },
      {
        tekst: "Boksen står midt på – loddrett",
        test: (d) => {
          const s = d.querySelector(".scene")?.getBoundingClientRect();
          const b = d.querySelector(".boks")?.getBoundingClientRect();
          return (
            s !== undefined && b !== undefined &&
            b.height < s.height - 20 &&
            Math.abs(s.top + s.height / 2 - (b.top + b.height / 2)) <= 1
          );
        },
      },
      {
        tekst: "Scenen er fortsatt 200 piksler høy, og boksen 100 piksler bred",
        test: (d) => {
          const s = d.querySelector(".scene")?.getBoundingClientRect();
          const b = d.querySelector(".boks");
          return s !== undefined && b !== null && Math.abs(s.height - 200) < 1 && parseFloat(stil(b).width) === 100;
        },
      },
    ],
    hint: ".scene { display: flex; justify-content: center; align-items: center; }",
  },

  "m11-topp": {
    html: `<header>
  <a href="#" class="logo">Fjellklubben</a>
  <nav>
    <a href="#">Turer</a>
    <a href="#">Om oss</a>
  </nav>
</header>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
}

header {
  background-color: #1d3557;
  padding: 12px 16px;
}

header a {
  color: white;
  text-decoration: none;
}

.logo {
  font-size: 1.125rem;
  font-weight: bold;
}
`,
    sjekker: [
      {
        tekst: "Logoen står helt til venstre, og menyen helt til høyre",
        test: (d) => {
          const h = d.querySelector("header");
          const l = d.querySelector(".logo")?.getBoundingClientRect();
          const n = d.querySelector("nav")?.getBoundingClientRect();
          if (!h || !l || !n) return false;
          const r = h.getBoundingClientRect();
          const p = parseFloat(stil(h).paddingLeft);
          return Math.abs(l.left - (r.left + p)) <= 2 && Math.abs(r.right - p - n.right) <= 2 && n.left - l.right >= 8;
        },
      },
      {
        tekst: "Logoen og menyen er midtstilt i høyden (align-items: center)",
        test: (d) => {
          const h = d.querySelector("header");
          const l = d.querySelector(".logo")?.getBoundingClientRect();
          const n = d.querySelector("nav")?.getBoundingClientRect();
          return (
            h !== null && l !== undefined && n !== undefined &&
            stil(h).alignItems === "center" &&
            Math.abs(l.top + l.height / 2 - (n.top + n.height / 2)) <= 2
          );
        },
      },
      {
        tekst: "Menylenkene har minst 10px mellomrom",
        test: (d) => {
          const a = [...d.querySelectorAll("nav a")].map((x) => x.getBoundingClientRect());
          return a.length >= 2 && a.slice(1).every((x, i) => x.left - a[i].right >= 10);
        },
      },
    ],
    hint: "header { display: flex; justify-content: space-between; align-items: center; } nav { display: flex; gap: 16px; }",
  },

  "m11-wrap": {
    html: `<h1>Bilder fra turene</h1>
<div class="galleri">
  <div class="kort">Fløyen</div>
  <div class="kort">Ulriken</div>
  <div class="kort">Stoltzen</div>
  <div class="kort">Lyderhorn</div>
  <div class="kort">Rundemanen</div>
  <div class="kort">Sandviken</div>
</div>
`,
    css: `.galleri {
  display: flex;
  gap: 10px;
}

.kort {
  width: 140px;
  height: 80px;
  flex-shrink: 0;
  padding: 8px;
  background-color: #a8dadc;
  color: #1d3557;
}
`,
    sjekker: [
      {
        tekst: "Ingen kort stikker ut av galleriet",
        test: (d) => {
          const g = d.querySelector(".galleri")?.getBoundingClientRect();
          return g !== undefined && [...d.querySelectorAll(".kort")].every((k) => k.getBoundingClientRect().right <= g.right + 0.5);
        },
      },
      {
        tekst: "Kortene fordeler seg på flere rader",
        test: (d) => new Set([...d.querySelectorAll(".kort")].map((k) => Math.round(k.getBoundingClientRect().top))).size >= 2,
      },
      {
        tekst: "Det er mellomrom mellom radene også",
        test: (d) => {
          const k = [...d.querySelectorAll(".kort")].map((x) => x.getBoundingClientRect());
          const andreRad = k.find((x) => x.top > k[0].bottom - 1);
          return andreRad !== undefined && andreRad.top - k[0].bottom >= 8;
        },
      },
      {
        tekst: "Kortene er fortsatt 140 piksler brede",
        test: (d) => [...d.querySelectorAll(".kort")].every((k) => parseFloat(stil(k).width) === 140),
      },
    ],
    hint: ".galleri { flex-wrap: wrap; }",
  },

  "m11-meny": {
    html: `<nav>
  <ul>
    <li><a href="#">Forside</a></li>
    <li><a href="#">Turer</a></li>
    <li class="logg-inn"><a href="#">Logg inn</a></li>
  </ul>
</nav>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #1d3557;
}

nav a {
  display: block;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
}
`,
    sjekker: [
      {
        tekst: "Lista i menyen er en flex-container",
        test: (d) => {
          const ul = d.querySelector("nav ul");
          return ul !== null && stil(ul).display === "flex";
        },
      },
      {
        tekst: "Menypunktene står på rad",
        test: (d) => {
          const t = [...d.querySelectorAll("nav li")].map((x) => x.getBoundingClientRect().top);
          return t.length === 3 && t.every((x) => Math.abs(x - t[0]) < 1);
        },
      },
      {
        tekst: "«Logg inn» står helt til høyre, med de andre til venstre",
        test: (d) => {
          const ul = d.querySelector("nav ul")?.getBoundingClientRect();
          const li = [...d.querySelectorAll("nav li")].map((x) => x.getBoundingClientRect());
          if (!ul || li.length !== 3) return false;
          const [første, nestSiste, siste] = li;
          return (
            Math.abs(ul.right - siste.right) <= 1 && Math.abs(ul.left - første.left) <= 1 && siste.left - nestSiste.right > 30
          );
        },
      },
    ],
    hint: "nav ul { display: flex; } .logg-inn { margin-left: auto; }",
  },

  // ── Modul 12: Grid og posisjonering ─────────────────────────────────

  "m12-kolonner": {
    html: `<div class="rutenett">
  <div class="boks">Meny</div>
  <div class="boks">Innhold</div>
  <div class="boks">Fakta</div>
</div>
`,
    css: `.boks {
  padding: 12px;
  background-color: #a8dadc;
}
`,
    sjekker: [
      {
        tekst: ".rutenett er et grid",
        test: (d) => {
          const r = d.querySelector(".rutenett");
          return r !== null && stil(r).display === "grid";
        },
      },
      {
        tekst: "De tre boksene står i tre kolonner ved siden av hverandre",
        test: (d) => {
          const b = [...d.querySelectorAll(".boks")].map((x) => x.getBoundingClientRect());
          return b.length === 3 && b.every((x) => Math.abs(x.top - b[0].top) < 1) && b[0].left < b[1].left && b[1].left < b[2].left;
        },
      },
      {
        tekst: "Den midterste kolonnen er dobbelt så bred som de andre",
        test: (d) => {
          const b = [...d.querySelectorAll(".boks")].map((x) => x.getBoundingClientRect().width);
          return b.length === 3 && Math.abs(b[1] / b[0] - 2) < 0.05 && Math.abs(b[1] / b[2] - 2) < 0.05;
        },
      },
      {
        tekst: "Det er minst 10px mellomrom mellom kolonnene",
        test: (d) => {
          const b = [...d.querySelectorAll(".boks")].map((x) => x.getBoundingClientRect());
          return b.length === 3 && b[1].left - b[0].right >= 10 && b[2].left - b[1].right >= 10;
        },
      },
    ],
    hint: ".rutenett { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 12px; }",
  },

  "m12-autofit": {
    html: `<div class="galleri">
  <div class="kort">Fløyen</div>
  <div class="kort">Ulriken</div>
  <div class="kort">Stoltzen</div>
  <div class="kort">Lyderhorn</div>
  <div class="kort">Rundemanen</div>
  <div class="kort">Sandviken</div>
</div>
`,
    css: `.kort {
  height: 70px;
  padding: 8px;
  background-color: #f4a261;
}
`,
    sjekker: [
      {
        tekst: "Galleriet er et grid med repeat(auto-fit, minmax(…))",
        test: (d) =>
          regler(d).some((r) => /repeat\(\s*auto-(fit|fill)\s*,\s*minmax\(/.test(r.style.gridTemplateColumns)) &&
          stil(d.querySelector(".galleri")!).display === "grid",
      },
      {
        tekst: "Ingen kort stikker ut, og de er minst 100 piksler brede",
        test: (d) => {
          const g = d.querySelector(".galleri")?.getBoundingClientRect();
          const k = [...d.querySelectorAll(".kort")].map((x) => x.getBoundingClientRect());
          return g !== undefined && k.length === 6 && k.every((x) => x.right <= g.right + 0.5 && x.width >= 100);
        },
      },
      {
        tekst: "Antallet kolonner tilpasser seg bredden – flere når det er plass, færre når det er trangt",
        test: (d) => {
          const g = d.querySelector<HTMLElement>(".galleri");
          if (!g) return false;
          const kolonner = (bredde: string) => {
            g.style.width = bredde;
            return new Set([...d.querySelectorAll(".kort")].map((x) => Math.round(x.getBoundingClientRect().left))).size;
          };
          const før = g.style.width;
          const smal = kolonner("220px");
          const bred = kolonner("700px");
          g.style.width = før;
          return bred > smal && smal >= 1;
        },
      },
    ],
    hint: ".galleri { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }",
  },

  "m12-oppsett": {
    html: `<div class="side">
  <header class="topp">Fjellklubben</header>
  <nav class="meny">Meny</nav>
  <main class="innhold">Her kommer innholdet.</main>
  <footer class="bunn">© 2026 Fjellklubben</footer>
</div>
`,
    css: `.side {
  min-height: 300px;
  gap: 8px;
}

.topp { background-color: #1d3557; color: white; padding: 12px; }
.meny { background-color: #457b9d; color: white; padding: 12px; }
.innhold { background-color: #f1faee; padding: 12px; }
.bunn { background-color: #264653; color: white; padding: 12px; }
`,
    sjekker: [
      {
        tekst: ".side er et grid med grid-template-areas",
        test: (d) => {
          const s = d.querySelector(".side");
          return s !== null && stil(s).display === "grid" && stil(s).gridTemplateAreas !== "none";
        },
      },
      {
        tekst: "Toppen og bunnen går over hele bredden",
        test: (d) => {
          const s = d.querySelector(".side")?.getBoundingClientRect();
          return (
            s !== undefined &&
            [".topp", ".bunn"].every((k) => {
              const r = d.querySelector(k)?.getBoundingClientRect();
              return r !== undefined && Math.abs(r.left - s.left) < 1 && Math.abs(r.right - s.right) < 1;
            })
          );
        },
      },
      {
        tekst: "Menyen står til venstre for innholdet, på samme rad – og innholdet er bredest",
        test: (d) => {
          const m = d.querySelector(".meny")?.getBoundingClientRect();
          const i = d.querySelector(".innhold")?.getBoundingClientRect();
          return m !== undefined && i !== undefined && Math.abs(m.top - i.top) < 1 && m.right <= i.left && i.width > m.width;
        },
      },
      {
        tekst: "Rekkefølgen er topp, så meny og innhold, så bunn",
        test: (d) => {
          const [t, m, b] = [".topp", ".meny", ".bunn"].map((k) => d.querySelector(k)?.getBoundingClientRect());
          return t !== undefined && m !== undefined && b !== undefined && t.bottom <= m.top && m.bottom <= b.top;
        },
      },
    ],
    hint: `.side { display: grid; grid-template-columns: 100px 1fr; grid-template-areas: "topp topp" "meny innhold" "bunn bunn"; } og .topp { grid-area: topp; } osv.`,
  },

  "m12-merke": {
    html: `<article class="kort">
  <span class="merke">Ny!</span>
  <h2>Rundemanen</h2>
  <p>En ny tur i programmet, med flott utsikt over hele byen.</p>
</article>
`,
    css: `.kort {
  max-width: 260px;
  padding: 16px;
  background-color: #f1faee;
  border: 2px solid #a8dadc;
  border-radius: 10px;
}

.kort h2 {
  margin-top: 0;
}

.merke {
  padding: 4px 10px;
  border-radius: 999px;
  background-color: #e63946;
  color: white;
  font-weight: bold;
}
`,
    sjekker: [
      {
        tekst: ".merke er absolute, og .kort er utgangspunktet (position: relative)",
        test: (d) => {
          const m = d.querySelector(".merke");
          const k = d.querySelector(".kort");
          return m !== null && k !== null && stil(m).position === "absolute" && stil(k).position !== "static";
        },
      },
      {
        tekst: "Merket sitter i øvre høyre hjørne av kortet",
        test: (d) => {
          const m = d.querySelector(".merke")?.getBoundingClientRect();
          const k = d.querySelector(".kort")?.getBoundingClientRect();
          return (
            m !== undefined && k !== undefined &&
            m.right <= k.right + 12 && k.right - m.right <= 16 &&
            m.top >= k.top - 12 && m.top - k.top <= 16
          );
        },
      },
      {
        tekst: "Overskriften er ikke dyttet ned av merket",
        test: (d) => {
          const h = d.querySelector(".kort h2")?.getBoundingClientRect();
          const k = d.querySelector(".kort")?.getBoundingClientRect();
          return h !== undefined && k !== undefined && h.top - k.top <= 22;
        },
      },
    ],
    hint: ".kort { position: relative; } .merke { position: absolute; top: 8px; right: 8px; }",
  },

  "m12-sticky": {
    html: `<header>Fjellklubben</header>
<main>
  <h1>Alle turene våre</h1>
  <p>Fløyen – en rolig tur for hele familien.</p>
  <p>Ulriken – Bergens høyeste fjell.</p>
  <p>Stoltzekleiven – over 800 trappetrinn.</p>
  <p>Lyderhorn – fin utsikt mot havet.</p>
  <p>Rundemanen – med de gamle radiomastene.</p>
  <p>Sandviksfjellet – bratt og kort.</p>
  <p>Løvstakken – utsikt over sentrum.</p>
  <p>Damsgårdsfjellet – en skjult perle.</p>
  <p>Vidden – fra Fløyen til Ulriken.</p>
  <p>Gullfjellet – det høyeste av de sju fjellene.</p>
</main>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
}

header {
  padding: 12px 16px;
  background-color: #1d3557;
  color: white;
  font-weight: bold;
}

main {
  padding: 0 16px;
}

p {
  margin: 0 0 40px;
}
`,
    sjekker: [
      {
        tekst: "<header> er sticky, med top: 0",
        test: (d) => {
          const h = d.querySelector("header");
          return h !== null && stil(h).position === "sticky" && stil(h).top === "0px";
        },
      },
      {
        tekst: "Toppen blir liggende øverst når du ruller nedover",
        test: (d) => {
          const h = d.querySelector("header");
          const rull = d.scrollingElement;
          if (!h || !rull) return false;
          const før = rull.scrollTop;
          rull.scrollTop = 300;
          const ok = rull.scrollTop > 100 && Math.abs(h.getBoundingClientRect().top) < 1;
          rull.scrollTop = før;
          return ok;
        },
      },
    ],
    hint: "header { position: sticky; top: 0; }",
  },

  "m12-velg": {
    html: `<header>
  <a class="logo" href="#">Fjellklubben</a>
  <nav>
    <a href="#">Turer</a>
    <a href="#">Om oss</a>
  </nav>
</header>
<main>
  <div class="turer">
    <article class="kort"><span class="merke">Ny!</span><h2>Fløyen</h2></article>
    <article class="kort"><h2>Ulriken</h2></article>
    <article class="kort"><h2>Stoltzen</h2></article>
    <article class="kort"><h2>Lyderhorn</h2></article>
  </div>
</main>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
}

header {
  padding: 12px 16px;
  background-color: #1d3557;
}

header a {
  color: white;
  text-decoration: none;
}

main {
  padding: 16px;
}

.kort {
  padding: 12px;
  background-color: #f1faee;
  border-radius: 8px;
}

.kort h2 {
  margin: 0;
  font-size: 1rem;
}

.merke {
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #e63946;
  color: white;
  font-size: 0.75rem;
}
`,
    sjekker: [
      {
        tekst: "Toppen: logoen til venstre og menyen til høyre",
        test: (d) => {
          const h = d.querySelector("header");
          const l = d.querySelector(".logo")?.getBoundingClientRect();
          const n = d.querySelector("header nav")?.getBoundingClientRect();
          if (!h || !l || !n) return false;
          const r = h.getBoundingClientRect();
          return Math.abs(l.top - n.top) < 12 && Math.abs(r.right - parseFloat(stil(h).paddingRight) - n.right) <= 2 && n.left > l.right;
        },
      },
      {
        tekst: "Turkortene står i et grid med to kolonner",
        test: (d) => {
          const t = d.querySelector(".turer");
          const venstre = new Set([...d.querySelectorAll(".kort")].map((k) => Math.round(k.getBoundingClientRect().left)));
          return t !== null && stil(t).display === "grid" && venstre.size === 2;
        },
      },
      {
        tekst: "«Ny!»-merket sitter i øvre høyre hjørne av sitt kort",
        test: (d) => {
          const m = d.querySelector(".merke");
          const k = m?.closest(".kort")?.getBoundingClientRect();
          const r = m?.getBoundingClientRect();
          return (
            m !== null && m !== undefined && k !== undefined && r !== undefined &&
            stil(m).position === "absolute" && k.right - r.right <= 16 && r.right <= k.right + 12 && r.top - k.top <= 16
          );
        },
      },
    ],
    hint: "header { display: flex; justify-content: space-between; } .turer { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; } .kort { position: relative; } .merke { position: absolute; top: 8px; right: 8px; }",
  },

  // ── Modul 13: Responsivt design ─────────────────────────────────────

  "m13-viewport": {
    html: `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>Fjellklubben</title>
  </head>
  <body>
    <div class="innhold">
      <h1>Fjellklubben</h1>
      <p>Vi går på tur hver helg, hele året. Alle er velkomne – du trenger bare gode sko og litt niste.</p>
      <img src="bilder/fjell.jpg" alt="Solnedgang over fjell og fjord">
    </div>
  </body>
</html>
`,
    css: `body {
  font-family: Verdana, sans-serif;
}

.innhold {
  width: 800px;
  margin: 0 auto;
}
`,
    bilder: ["bilder/fjell.jpg"],
    responsiv: true,
    sjekker: [
      {
        tekst: "<head> har viewport-taggen med width=device-width og initial-scale=1",
        test: (d) => {
          const m = d.querySelector('head meta[name="viewport"]')?.getAttribute("content")?.replace(/\s/g, "") ?? "";
          return m.includes("width=device-width") && m.includes("initial-scale=1");
        },
      },
      {
        tekst: "På en mobil (360px) må man ikke rulle sidelengs",
        test: (d) => iBredde(d, 360, () => d.documentElement.scrollWidth <= 361),
      },
      {
        tekst: "På en stor skjerm er innholdet fortsatt høyst 800px bredt, og midt på",
        test: (d) =>
          iBredde(d, 1200, () => {
            const r = d.querySelector(".innhold")?.getBoundingClientRect();
            return r !== undefined && r.width <= 801 && Math.abs(r.left - (1200 - r.right)) <= 2;
          }),
      },
    ],
    hint: `<meta name="viewport" content="width=device-width, initial-scale=1"> i <head>. I CSS: bytt width med max-width, og legg til img { max-width: 100%; }.`,
  },

  "m13-media": {
    html: `<h1>Turer i høst</h1>
<div class="kort-rad">
  <article class="kort">Fløyen</article>
  <article class="kort">Ulriken</article>
  <article class="kort">Stoltzen</article>
  <article class="kort">Lyderhorn</article>
</div>
`,
    css: `.kort-rad {
  display: grid;
  gap: 12px;
}

.kort {
  padding: 12px;
  background-color: #a8dadc;
}
`,
    responsiv: true,
    sjekker: [
      {
        tekst: "På mobil (360px) står kortene under hverandre",
        test: (d) => iBredde(d, 360, () => kolonner(d, ".kort") === 1),
      },
      {
        tekst: "Fra 700px står de i to kolonner",
        test: (d) => iBredde(d, 768, () => kolonner(d, ".kort") === 2) && iBredde(d, 690, () => kolonner(d, ".kort") === 1),
      },
      {
        tekst: "Fra 1000px står alle fire på én rad",
        test: (d) => iBredde(d, 1100, () => kolonner(d, ".kort") === 4) && iBredde(d, 990, () => kolonner(d, ".kort") === 2),
      },
      {
        tekst: "Stilarket bruker media queries med min-width",
        test: (d) => mediaRegler(d).filter((r) => /min-width/.test(r.conditionText)).length >= 2,
      },
    ],
    hint: "@media (min-width: 700px) { .kort-rad { grid-template-columns: 1fr 1fr; } } og @media (min-width: 1000px) { .kort-rad { grid-template-columns: repeat(4, 1fr); } }",
  },

  "m13-mobil-forst": {
    html: `<header>
  <a class="logo" href="#">Fjellklubben</a>
  <nav>
    <a href="#">Turer</a>
    <a href="#">Om oss</a>
    <a href="#">Kontakt</a>
  </nav>
</header>
<main>
  <h1>Velkommen på tur!</h1>
  <p>Vi går på tur hver helg, hele året.</p>
</main>
`,
    css: `body {
  margin: 0;
  font-family: Verdana, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #1d3557;
}

header a {
  color: white;
  text-decoration: none;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 24px;
}

main {
  padding: 0 16px;
}

h1 {
  font-size: 3.5rem;
}
`,
    responsiv: true,
    sjekker: [
      {
        tekst: "På mobil (360px) står logoen over menyen, og ingenting stikker ut",
        test: (d) =>
          iBredde(d, 360, () => {
            const l = d.querySelector(".logo")?.getBoundingClientRect();
            const n = d.querySelector("header nav")?.getBoundingClientRect();
            return l !== undefined && n !== undefined && l.bottom <= n.top + 1 && d.documentElement.scrollWidth <= 361;
          }),
      },
      {
        tekst: "På mobil er overskriften høyst 2,25rem (36px)",
        test: (d) => iBredde(d, 360, () => px(d.querySelector("h1")) <= 36),
      },
      {
        tekst: "På PC (1100px) står logoen og menyen på én linje, med menyen til høyre",
        test: (d) =>
          iBredde(d, 1100, () => {
            const h = d.querySelector("header");
            const l = d.querySelector(".logo")?.getBoundingClientRect();
            const n = d.querySelector("header nav")?.getBoundingClientRect();
            if (!h || !l || !n) return false;
            return Math.abs(l.top + l.height / 2 - (n.top + n.height / 2)) <= 3 && 1100 - parseFloat(stil(h).paddingRight) - n.right <= 2;
          }),
      },
      {
        tekst: "På PC er overskriften større enn på mobil",
        test: (d) => iBredde(d, 1100, () => px(d.querySelector("h1"))) > iBredde(d, 360, () => px(d.querySelector("h1"))),
      },
      {
        tekst: "Mobil først: grunnreglene er for mobil, og media queriene bruker min-width",
        test: (d) => {
          const m = mediaRegler(d);
          return m.length > 0 && m.every((r) => /min-width/.test(r.conditionText) && !/max-width/.test(r.conditionText));
        },
      },
    ],
    hint: "Skriv mobiloppsettet først: header { flex-direction: column; align-items: flex-start; } h1 { font-size: 2rem; }. Legg så PC-oppsettet i @media (min-width: 700px) { header { flex-direction: row; align-items: center; } h1 { font-size: 3.5rem; } }.",
  },
};

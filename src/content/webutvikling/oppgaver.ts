/**
 * Kodeoppgaver brukt i leksjonene: <Oppgave id="..." /> i MDX.
 *
 * Hver sjekk får dokumentet i forhåndsvisningen og returnerer true når
 * kravet er oppfylt. Sjekkene kjøres på nytt hver gang eleven skriver.
 * Uten sjekker blir oppgaven en fri lekeplass.
 */

export type Sjekk = {
  tekst: string;
  test: (doc: Document) => boolean;
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
};

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

/** rgb(a)-streng → [r, g, b, a]. */
function rgb(c: string) {
  const [r = 0, g = 0, b = 0, a = 1] = (c.match(/[\d.]+/g) ?? []).map(Number);
  return [r, g, b, a];
}

/** Bakgrunnsfargen som faktisk vises bak et element (hvit hvis ingen er satt). */
function synligBakgrunn(el: Element | null): number[] {
  for (let e = el; e; e = e.parentElement) {
    const f = rgb(stil(e).backgroundColor);
    if (f[3] > 0) return f;
  }
  return [255, 255, 255, 1];
}

/** Kontrastforhold etter WCAG, fra 1 til 21. */
function kontrast(a: number[], b: number[]) {
  const lys = ([r, g, b]: number[]) => {
    const k = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * k[0] + 0.7152 * k[1] + 0.0722 * k[2];
  };
  const [l1, l2] = [lys(a), lys(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const lesbar = (el: Element | null) =>
  el !== null && kontrast(rgb(stil(el).color), synligBakgrunn(el)) >= 4.5;

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
          return p.length > 0 && p.every(lesbar);
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
};

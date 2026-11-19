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
};

const tekst = (el: Element | null) => (el?.textContent ?? "").trim();
const farge = (el: Element | null) =>
  el ? el.ownerDocument.defaultView!.getComputedStyle(el).color : "";

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
};

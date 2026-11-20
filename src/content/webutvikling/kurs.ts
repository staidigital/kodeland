/**
 * Kursstrukturen for /webutvikling.
 *
 * Hver modul har en slug (brukes i URL-en) og en liste med leksjoner.
 * En leksjon peker på en MDX-fil i content/webutvikling/<modul>/<leksjon>.mdx,
 * og må også registreres i lessons.ts.
 *
 * Moduler uten leksjoner vises som «kommer snart».
 *
 * Sjekkpunktene (type: "sjekkpunkt") er egne deler i lista, mellom modulene. De har egne
 * leksjoner og vises som «Sjekkpunkt N» i stedet for «Modul N». Rekkefølgen i lista er
 * rekkefølgen i kurset.
 */

export type Leksjon = {
  slug: string;
  tittel: string;
  /** Omtrentlig tid i minutter. */
  minutter: number;
};

export type Modul = {
  slug: string;
  /** Moduler og sjekkpunkter nummereres hver for seg: Modul 5, Sjekkpunkt 1, Modul 6 … */
  nr: number;
  type?: "sjekkpunkt";
  tittel: string;
  ingress: string;
  /** Det eleven lærer, i stikkord. */
  html: string[];
  css: string[];
  teori: string[];
  leksjoner: Leksjon[];
  /** Målet for modulen, vist som en egen linje under den i oversikten. */
  mål?: string;
};

export const MODULER: Modul[] = [
  {
    slug: "din-forste-nettside",
    nr: 1,
    tittel: "Din første nettside",
    ingress: "Skriv kode, se den bli til en nettside – og sett opp ditt eget prosjekt.",
    html: ["<h1>", "<p>", "grunnstruktur"],
    css: [],
    teori: ["en nettside er en tekstfil", "prosjektmappen", "filnavn", "index.html"],
    leksjoner: [
      { slug: "hei-nettside", tittel: "Hei, nettside!", minutter: 15 },
      { slug: "taggene", tittel: "Merkelapper rundt tekst", minutter: 20 },
      { slug: "prosjektmappen", tittel: "Prosjektmappen", minutter: 20 },
      { slug: "vscodium", tittel: "Din side på din maskin", minutter: 30 },
    ],
  },
  {
    slug: "gi-den-farge",
    nr: 2,
    tittel: "Gi den farge!",
    ingress: "Ditt første stilark: farger, bakgrunn og skrift.",
    html: ["<strong>", "<em>", "<h2>–<h3>"],
    css: ["style.css", "<link>", "color", "background-color", "font-family", "font-size"],
    teori: ["HTML, CSS og JavaScript – tre språk, tre jobber"],
    leksjoner: [
      { slug: "uthev-tekst", tittel: "Viktig, uthevet og underoverskrifter", minutter: 15 },
      { slug: "forste-regel", tittel: "Din første CSS-regel", minutter: 20 },
      { slug: "bakgrunn-og-skrift", tittel: "Bakgrunn og skrift", minutter: 25 },
      { slug: "koble-stilarket", tittel: "Koble til stilarket", minutter: 25 },
    ],
  },
  {
    slug: "mer-innhold-mer-stil",
    nr: 3,
    tittel: "Mer innhold, mer stil",
    ingress: "Lister, klasser og flere måter å skrive farger på.",
    html: ["<ul>", "<ol>", "<span>", "kommentarer"],
    css: [".klasser", "hex og hsl", "text-align"],
    teori: ["tag, element, attributt og verdi"],
    leksjoner: [
      { slug: "lister", tittel: "Lister", minutter: 20 },
      { slug: "klasser", tittel: "Klasser og span", minutter: 30 },
      { slug: "hex-og-hsl", tittel: "Farger med koder", minutter: 30 },
      { slug: "midtstill-og-rydd", tittel: "Midtstill og rydd", minutter: 20 },
    ],
  },
  {
    slug: "lenker",
    nr: 4,
    tittel: "Flere sider og lenker",
    ingress: "Bind sidene sammen til et nettsted med en ekte meny.",
    html: ["<a>", "meny i <ul>", "flere .html-filer"],
    css: [":hover", "text-decoration"],
    teori: ["klient og tjener", "hva skjer når du skriver inn en adresse", "relative og absolutte stier"],
    leksjoner: [
      { slug: "lenker", tittel: "Lenker", minutter: 20 },
      { slug: "flere-sider", tittel: "En side til", minutter: 30 },
      { slug: "meny", tittel: "En meny på alle sider", minutter: 30 },
      { slug: "klient-og-tjener", tittel: "Hva skjer når du klikker?", minutter: 30 },
    ],
  },
  {
    slug: "bilder",
    nr: 5,
    tittel: "Bilder",
    ingress: "Bilder med riktig sti, god alt-tekst og fornuftig størrelse.",
    html: ["<img>", "alt", "<figure>"],
    css: ["width / max-width", "border-radius", "background-image"],
    teori: ["hvert bilde er en egen forespørsel", "bildeformater", "opphavsrett"],
    leksjoner: [
      { slug: "forste-bilde", tittel: "Ditt første bilde", minutter: 25 },
      { slug: "storrelse-og-form", tittel: "Størrelse og form", minutter: 25 },
      { slug: "bakgrunnsbilder", tittel: "Bakgrunnsbilder", minutter: 20 },
      { slug: "formater-og-opphavsrett", tittel: "Formater, filstørrelse og opphavsrett", minutter: 30 },
    ],
  },
  {
    slug: "sjekkpunkt-1",
    nr: 1,
    type: "sjekkpunkt",
    tittel: "Ditt nettsted",
    ingress: "Et nettsted med tre sider, meny, bilder og egen fargepalett.",
    html: [],
    css: [],
    teori: [],
    leksjoner: [{ slug: "ditt-nettsted", tittel: "Ditt nettsted", minutter: 90 }],
  },
  {
    slug: "boksmodellen",
    nr: 6,
    tittel: "Boksmodellen",
    ingress: "Alt er firkanter. Lær å styre luften rundt og inni dem.",
    html: ["<div>"],
    css: ["padding", "margin", "border", "box-sizing"],
    teori: ["alt er firkanter", "utviklerverktøyet"],
    leksjoner: [
      { slug: "alt-er-bokser", tittel: "Alt er bokser", minutter: 20 },
      { slug: "padding-og-border", tittel: "Padding og border", minutter: 25 },
      { slug: "margin", tittel: "Margin og sentrering", minutter: 25 },
      { slug: "box-sizing", tittel: "box-sizing og utviklerverktøyet", minutter: 30 },
    ],
  },
  {
    slug: "semantikk",
    nr: 7,
    tittel: "Semantisk struktur",
    ingress: "Gi siden en struktur både mennesker og maskiner forstår.",
    html: ["<header>", "<nav>", "<main>", "<section>", "<article>", "<footer>"],
    css: ["stil på header, meny og bunntekst"],
    teori: ["DOM-treet", "skjermlesere", "universell utforming", "class og id"],
    leksjoner: [
      { slug: "bokser-med-mening", tittel: "Bokser med mening", minutter: 25 },
      { slug: "section-og-article", tittel: "section og article", minutter: 20 },
      { slug: "stil-pa-strukturen", tittel: "Stil på topp, meny og bunn", minutter: 25 },
      { slug: "dom-treet", tittel: "DOM-treet, class og id", minutter: 25 },
      { slug: "universell-utforming", tittel: "Universell utforming", minutter: 30 },
    ],
  },
  {
    slug: "typografi",
    nr: 8,
    tittel: "Typografi",
    ingress: "Tekst som er god å lese – og som ser bra ut.",
    html: ["<blockquote>", "spesialtegn"],
    css: ["webfonter", "rem og em", "line-height", "linjelengde"],
    teori: ["typografisk skala"],
    leksjoner: [
      { slug: "lesbar-tekst", tittel: "Tekst som er god å lese", minutter: 25 },
      { slug: "rem-og-em", tittel: "rem og em", minutter: 20 },
      { slug: "typografisk-skala", tittel: "Typografisk skala", minutter: 20 },
      { slug: "webfonter", tittel: "Webfonter", minutter: 25 },
      { slug: "sitater-og-tegn", tittel: "Sitater og spesialtegn", minutter: 20 },
    ],
  },
  {
    slug: "selektorer",
    nr: 9,
    tittel: "Selektorer og kaskaden",
    ingress: "Treff akkurat det du vil – og forstå hvorfor CSS «ikke virker».",
    html: ["tabeller", "<dl>"],
    css: ["kombinatorer", ":nth-child", ":focus", "arv", "spesifisitet"],
    teori: ["kaskaden"],
    leksjoner: [
      { slug: "tabeller-og-lister", tittel: "Tabeller og definisjonslister", minutter: 30 },
      { slug: "kombinatorer", tittel: "Kombinatorer", minutter: 25 },
      { slug: "pseudoklasser", tittel: ":nth-child og :focus", minutter: 25 },
      { slug: "kaskaden", tittel: "Arv og kaskaden", minutter: 30 },
    ],
  },
  {
    slug: "sjekkpunkt-2",
    nr: 2,
    type: "sjekkpunkt",
    tittel: "Struktur og stil",
    ingress: "Nettstedet ditt med semantisk struktur, typografi og stil.",
    html: [],
    css: [],
    teori: [],
    leksjoner: [{ slug: "struktur-og-stil", tittel: "Struktur og stil", minutter: 90 }],
  },
  {
    slug: "display",
    nr: 10,
    tittel: "Display og flyt",
    ingress: "Hvorfor legger ting seg der de gjør?",
    html: [],
    css: ["block og inline", "vannrett meny", "overflow"],
    teori: ["normal flyt"],
    leksjoner: [
      { slug: "normal-flyt", tittel: "Normal flyt", minutter: 25 },
      { slug: "vannrett-meny", tittel: "Vannrett meny", minutter: 25 },
      { slug: "skjule-og-overflow", tittel: "Skjule og flyte over", minutter: 25 },
    ],
  },
  {
    slug: "flexbox",
    nr: 11,
    tittel: "Flexbox",
    ingress: "Plasser elementer på rad og rekke – endelig enkelt.",
    html: [],
    css: ["display: flex", "justify-content", "align-items", "gap", "flex-wrap"],
    teori: [],
    leksjoner: [],
  },
  {
    slug: "grid",
    nr: 12,
    tittel: "Grid og posisjonering",
    ingress: "Hele sideoppsett i to dimensjoner, og ting som ligger oppå hverandre.",
    html: [],
    css: ["grid", "fr", "grid-template-areas", "sticky", "relative / absolute"],
    teori: ["når bruker du hva?"],
    leksjoner: [],
  },
  {
    slug: "responsivt",
    nr: 13,
    tittel: "Responsivt design",
    ingress: "Én nettside, alle skjermer.",
    html: ["viewport-meta"],
    css: ["media queries", "mobile first", "relative enheter"],
    teori: ["du vet ikke hvilken skjerm brukeren har"],
    leksjoner: [],
  },
  {
    slug: "publiser",
    nr: 14,
    tittel: "Publiser!",
    ingress: "Legg nettstedet ditt ut på nettet, så alle kan se det.",
    html: ["validering"],
    css: ["kontrastsjekk"],
    teori: ["hosting", "domener og DNS", "nå ligger din side på en tjener"],
    leksjoner: [],
    mål: "Ferdig, publisert nettsted.",
  },
];

export function finnModul(slug: string) {
  return MODULER.find((m) => m.slug === slug);
}

/** «Modul 5» eller «Sjekkpunkt 1». */
export function delNavn(m: Modul) {
  return `${m.type === "sjekkpunkt" ? "Sjekkpunkt" : "Modul"} ${m.nr}`;
}

/** Neste del av kurset (modul eller sjekkpunkt), hvis den har leksjoner. */
export function nesteDel(m: Modul) {
  const neste = MODULER[MODULER.indexOf(m) + 1];
  return neste && neste.leksjoner.length > 0 ? neste : undefined;
}

/** Kortnummer for en leksjon: «5.2» i modul 5, «S1.1» i sjekkpunkt 1. */
export function leksjonsNr(m: Modul, indeks: number) {
  return `${m.type === "sjekkpunkt" ? "S" : ""}${m.nr}.${indeks + 1}`;
}

export function leksjonsId(modul: string, leksjon: string) {
  return `${modul}/${leksjon}`;
}

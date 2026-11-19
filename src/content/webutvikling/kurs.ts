/**
 * Kursstrukturen for /webutvikling.
 *
 * Hver modul har en slug (brukes i URL-en) og en liste med leksjoner.
 * En leksjon peker på en MDX-fil i content/webutvikling/<modul>/<leksjon>.mdx,
 * og må også registreres i lessons.ts.
 *
 * Moduler uten leksjoner vises som «kommer snart».
 */

export type Leksjon = {
  slug: string;
  tittel: string;
  /** Omtrentlig tid i minutter. */
  minutter: number;
};

export type Modul = {
  slug: string;
  nr: number;
  tittel: string;
  ingress: string;
  /** Det eleven lærer, i stikkord. */
  html: string[];
  css: string[];
  teori: string[];
  leksjoner: Leksjon[];
  /** Sjekkpunkt etter denne modulen. */
  sjekkpunkt?: string;
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
      { slug: "sjekkpunkt-1", tittel: "Sjekkpunkt 1: Ditt nettsted", minutter: 90 },
    ],
    sjekkpunkt: "Et nettsted med tre sider, meny, bilder og egen fargepalett.",
  },
  {
    slug: "boksmodellen",
    nr: 6,
    tittel: "Boksmodellen",
    ingress: "Alt er firkanter. Lær å styre luften rundt og inni dem.",
    html: ["<div>"],
    css: ["padding", "margin", "border", "box-sizing"],
    teori: ["utviklerverktøyet"],
    leksjoner: [],
  },
  {
    slug: "semantikk",
    nr: 7,
    tittel: "Semantisk struktur",
    ingress: "Gi siden en struktur både mennesker og maskiner forstår.",
    html: ["<header>", "<nav>", "<main>", "<section>", "<article>", "<footer>"],
    css: ["stil på header, meny og bunntekst"],
    teori: ["DOM-treet", "skjermlesere", "universell utforming", "class og id"],
    leksjoner: [],
  },
  {
    slug: "typografi",
    nr: 8,
    tittel: "Typografi",
    ingress: "Tekst som er god å lese – og som ser bra ut.",
    html: ["<blockquote>", "spesialtegn"],
    css: ["webfonter", "rem og em", "line-height", "linjelengde"],
    teori: ["typografisk skala"],
    leksjoner: [],
  },
  {
    slug: "selektorer",
    nr: 9,
    tittel: "Selektorer og kaskaden",
    ingress: "Treff akkurat det du vil – og forstå hvorfor CSS «ikke virker».",
    html: ["tabeller", "<dl>"],
    css: ["kombinatorer", ":nth-child", ":focus", "arv", "spesifisitet"],
    teori: ["kaskaden"],
    leksjoner: [],
    sjekkpunkt: "Nettstedet ditt med semantisk struktur, typografi og stil.",
  },
  {
    slug: "display",
    nr: 10,
    tittel: "Display og flyt",
    ingress: "Hvorfor legger ting seg der de gjør?",
    html: [],
    css: ["block og inline", "vannrett meny", "overflow"],
    teori: ["normal flyt"],
    leksjoner: [],
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
    sjekkpunkt: "Ferdig, publisert nettsted.",
  },
];

export function finnModul(slug: string) {
  return MODULER.find((m) => m.slug === slug);
}

export function leksjonsId(modul: string, leksjon: string) {
  return `${modul}/${leksjon}`;
}

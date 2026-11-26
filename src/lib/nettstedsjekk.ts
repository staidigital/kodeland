/**
 * Sjekker studentens eget nettsted (webkurs-mappen) mot kravene i et sjekkpunkt.
 * Sjekkpunkt 2 tar med alt fra sjekkpunkt 1, og i tillegg struktur, boksmodell, typografi og selektorer.
 * Sjekkpunkt 3 tar med alt fra 1 og 2, og i tillegg responsivt design, oppsett, stier, validering og kontrast.
 * Kjører i nettleseren: bruker DOMParser og CSSStyleSheet. Ingenting sendes noe sted.
 */

import { kontrast, lesRgb, type Rgb, tilHex } from "./farger";
import { løsSti } from "./stier";

export type NettstedFil = {
  /** Sti fra roten av nettstedet, f.eks. "bilder/katt.jpg". */
  sti: string;
  storrelse: number;
  /** Innholdet, for HTML- og CSS-filer. */
  tekst?: string;
};

export type Status = "ok" | "advarsel" | "feil";

export type Sjekkresultat = {
  gruppe:
    | "Prosjektmappen"
    | "Sidene"
    | "Lenker og meny"
    | "Bilder"
    | "Stil og farger"
    | "Struktur"
    | "Boksmodell og typografi"
    | "Selektorer og universell utforming"
    | "Responsivt design"
    | "Oppsett med flexbox og grid"
    | "Klar for publisering";
  tittel: string;
  status: Status;
  /** Hva som er galt (eller hva som er bra), én linje per funn. */
  detaljer: string[];
  leksjon: { tittel: string; href: string };
};

export type Oversikt = { sider: number; bilder: number; byte: number };

const L = {
  prosjektmappen: { tittel: "Prosjektmappen (modul 1)", href: "/webutvikling/din-forste-nettside/prosjektmappen" },
  grunnstruktur: { tittel: "Din side på din maskin (modul 1)", href: "/webutvikling/din-forste-nettside/vscodium" },
  taggene: { tittel: "Merkelapper rundt tekst (modul 1)", href: "/webutvikling/din-forste-nettside/taggene" },
  stilark: { tittel: "Koble til stilarket (modul 2)", href: "/webutvikling/gi-den-farge/koble-stilarket" },
  farger: { tittel: "Farger med koder (modul 3)", href: "/webutvikling/mer-innhold-mer-stil/hex-og-hsl" },
  sider: { tittel: "En side til (modul 4)", href: "/webutvikling/lenker/flere-sider" },
  meny: { tittel: "En meny på alle sider (modul 4)", href: "/webutvikling/lenker/meny" },
  bilde: { tittel: "Ditt første bilde (modul 5)", href: "/webutvikling/bilder/forste-bilde" },
  storrelse: { tittel: "Størrelse og form (modul 5)", href: "/webutvikling/bilder/storrelse-og-form" },
  formater: { tittel: "Formater og filstørrelse (modul 5)", href: "/webutvikling/bilder/formater-og-opphavsrett" },
  boxSizing: { tittel: "box-sizing og utviklerverktøyet (modul 6)", href: "/webutvikling/boksmodellen/box-sizing" },
  margin: { tittel: "Margin og sentrering (modul 6)", href: "/webutvikling/boksmodellen/margin" },
  semantikk: { tittel: "Bokser med mening (modul 7)", href: "/webutvikling/semantikk/bokser-med-mening" },
  uu: { tittel: "Universell utforming (modul 7)", href: "/webutvikling/semantikk/universell-utforming" },
  lesbar: { tittel: "Tekst som er god å lese (modul 8)", href: "/webutvikling/typografi/lesbar-tekst" },
  rem: { tittel: "rem og em (modul 8)", href: "/webutvikling/typografi/rem-og-em" },
  webfonter: { tittel: "Webfonter (modul 8)", href: "/webutvikling/typografi/webfonter" },
  focus: { tittel: ":nth-child og :focus (modul 9)", href: "/webutvikling/selektorer/pseudoklasser" },
  kaskaden: { tittel: "Arv og kaskaden (modul 9)", href: "/webutvikling/selektorer/kaskaden" },
  flyt: { tittel: "Skjule og flyte over (modul 10)", href: "/webutvikling/display/skjule-og-overflow" },
  flex: { tittel: "Bokser på rad (modul 11)", href: "/webutvikling/flexbox/bokser-pa-rad" },
  hva: { tittel: "Når bruker du hva? (modul 12)", href: "/webutvikling/grid/nar-bruker-du-hva" },
  viewport: { tittel: "Du vet ikke hvilken skjerm (modul 13)", href: "/webutvikling/responsivt/ulike-skjermer" },
  media: { tittel: "Media queries (modul 13)", href: "/webutvikling/responsivt/media-queries" },
  mobilForst: { tittel: "Mobil først (modul 13)", href: "/webutvikling/responsivt/mobil-forst" },
  lokaleStier: { tittel: "Fra mappe til nettsted (modul 14)", href: "/webutvikling/publiser/fra-mappe-til-nettsted" },
  validering: { tittel: "Valider koden (modul 14)", href: "/webutvikling/publiser/validering" },
  sisteSjekk: { tittel: "Siste sjekk (modul 14)", href: "/webutvikling/publiser/siste-sjekk" },
};

/** Nettleseren gjør hex om til rgb(); vis det som hex igjen, slik studenten skrev det. */
const visFarge = (f: string) => (/^rgb\(/i.test(f) ? tilHex(lesRgb(f)) : f);

const BILDE = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
const KB = 1000;
const kb = (b: number) => (b >= 1_000_000 ? `${(b / 1_000_000).toFixed(1).replace(".", ",")} MB` : `${Math.round(b / KB)} kB`);

/**
 * Finner roten til nettstedet: mappen der den øverste index.html ligger.
 * Da virker det også om studenten velger mappen over webkurs.
 */
export function finnRot(stier: string[]): string {
  const index = stier
    .filter((s) => s.split("/").pop() === "index.html")
    .sort((a, b) => a.split("/").length - b.split("/").length)[0];
  return index ? index.slice(0, -"index.html".length) : "";
}

/** Skal fila være med? Skjulte filer og mapper (.DS_Store, .vscode/) hoppes over. */
export const tellerMed = (sti: string) =>
  !sti.split("/").some((d) => d.startsWith(".") || d === "node_modules");

/** CSS-regler i et stilark. Bruker nettleserens egen CSS-tolker. */
function lesCss(tekst: string): CSSStyleRule[] {
  try {
    const ark = new CSSStyleSheet();
    ark.replaceSync(tekst);
    return [...ark.cssRules].filter((r): r is CSSStyleRule => r instanceof CSSStyleRule);
  } catch {
    return [];
  }
}

export function sjekkNettsted(
  filer: NettstedFil[],
  /** Gjør en CSS-farge (navn, hex, hsl …) om til RGB. */
  tilRgb: (farge: string) => Rgb | null,
  /** Hvilket sjekkpunkt det sjekkes mot. Hvert sjekkpunkt tar med alt fra de forrige, og mer. */
  sjekkpunkt: 1 | 2 | 3 = 1,
): { resultater: Sjekkresultat[]; oversikt: Oversikt } {
  const finnes = new Map(filer.map((f) => [f.sti, f]));
  const sm = new Map(filer.map((f) => [f.sti.toLowerCase(), f.sti]));
  const sider = filer.filter((f) => f.sti.toLowerCase().endsWith(".html"));
  const parser = new DOMParser();
  const dom = new Map(sider.map((s) => [s.sti, parser.parseFromString(s.tekst ?? "", "text/html")]));
  const r: Sjekkresultat[] = [];

  /** Forklaring når en sti ikke finnes – med hint om store/små bokstaver. */
  const mangler = (mål: string) => {
    const nesten = sm.get(mål.toLowerCase());
    return nesten
      ? `${mål} finnes ikke – men ${nesten} gjør. Store og små bokstaver må være like, ellers virker det ikke på en tjener.`
      : `${mål} finnes ikke i mappen.`;
  };

  // ── Prosjektmappen ──────────────────────────────────────────────────────
  r.push({
    gruppe: "Prosjektmappen",
    tittel: "Forsiden heter index.html",
    status: finnes.has("index.html") ? "ok" : "feil",
    detaljer: finnes.has("index.html") ? [] : ["Fant ingen index.html i mappen du valgte."],
    leksjon: L.prosjektmappen,
  });

  const dårligeNavn = filer
    .filter((f) => f.sti.split("/").some((d) => !/^[a-z0-9._-]+$/.test(d)))
    .map((f) => {
      const grunn = /[A-ZÆØÅ]/.test(f.sti)
        ? "store bokstaver"
        : / /.test(f.sti)
          ? "mellomrom"
          : /[æøå]/i.test(f.sti)
            ? "æ, ø eller å"
            : "spesialtegn";
      return `${f.sti} (${grunn})`;
    });
  r.push({
    gruppe: "Prosjektmappen",
    tittel: "Filnavn med små bokstaver, uten mellomrom og æ, ø og å",
    status: dårligeNavn.length ? "feil" : "ok",
    detaljer: dårligeNavn,
    leksjon: L.prosjektmappen,
  });

  // ── Sidene ──────────────────────────────────────────────────────────────
  r.push({
    gruppe: "Sidene",
    tittel: "Minst tre sider",
    status: sider.length >= 3 ? "ok" : "feil",
    detaljer: [`Fant ${sider.length} ${sider.length === 1 ? "side" : "sider"}: ${sider.map((s) => s.sti).join(", ") || "ingen"}.`],
    leksjon: L.sider,
  });

  const grunn: string[] = [];
  const titler = new Map<string, string[]>();
  for (const s of sider) {
    const d = dom.get(s.sti)!;
    const mangel: string[] = [];
    if (!/^\s*(<!--[^]*?-->\s*)*<!doctype html>/i.test(s.tekst ?? "")) mangel.push("<!DOCTYPE html>");
    if (!d.documentElement.getAttribute("lang")) mangel.push('lang="no" på <html>');
    if (!d.querySelector("meta[charset]")) mangel.push('<meta charset="utf-8">');
    const tittel = d.title.trim();
    if (!tittel) mangel.push("<title>");
    else titler.set(tittel, [...(titler.get(tittel) ?? []), s.sti]);
    if (mangel.length) grunn.push(`${s.sti} mangler ${mangel.join(", ")}`);
  }
  const like = [...titler].filter(([, s]) => s.length > 1).map(([t, s]) => `«${t}» er tittelen på ${s.join(" og ")}`);
  r.push({
    gruppe: "Sidene",
    tittel: "Grunnstrukturen er på plass, og hver side har sin egen tittel",
    status: grunn.length ? "feil" : like.length ? "advarsel" : "ok",
    detaljer: [...grunn, ...like.map((l) => `${l} – gi hver side en egen tittel.`)],
    leksjon: L.grunnstruktur,
  });

  const h1 = sider
    .map((s) => [s.sti, dom.get(s.sti)!.querySelectorAll("h1").length] as const)
    .filter(([, n]) => n !== 1)
    .map(([s, n]) => `${s} har ${n === 0 ? "ingen" : n} <h1>`);
  r.push({
    gruppe: "Sidene",
    tittel: "Én <h1> på hver side",
    status: h1.length ? "advarsel" : "ok",
    detaljer: h1,
    leksjon: L.taggene,
  });

  const stilark = new Set<string>();
  const utenStil: string[] = [];
  for (const s of sider) {
    const lenker = [...dom.get(s.sti)!.querySelectorAll('link[rel~="stylesheet" i]')].map((l) => l.getAttribute("href") ?? "");
    const mål = lenker.map((h) => løsSti(h, s.sti)).filter((m): m is string => m !== null);
    const ok = mål.filter((m) => finnes.has(m));
    ok.forEach((m) => stilark.add(m));
    if (lenker.length === 0) utenStil.push(`${s.sti} har ingen <link> til et stilark`);
    else if (ok.length === 0) utenStil.push(`${s.sti}: ${mangler(mål[0] ?? lenker[0])}`);
  }
  r.push({
    gruppe: "Sidene",
    tittel: "Alle sidene bruker stilarket",
    status: utenStil.length || stilark.size === 0 ? "feil" : stilark.size > 1 ? "advarsel" : "ok",
    detaljer: [
      ...utenStil,
      ...(stilark.size > 1 ? [`Sidene bruker forskjellige stilark: ${[...stilark].join(", ")}. Ett felles er enklere.`] : []),
    ],
    leksjon: L.stilark,
  });

  // ── Lenker og meny ──────────────────────────────────────────────────────
  const døde: string[] = [];
  for (const s of sider) {
    for (const a of dom.get(s.sti)!.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href")!.trim();
      if (href.startsWith("#")) continue;
      if (/^www\./i.test(href)) {
        døde.push(`${s.sti}: «${href}» mangler https:// foran`);
        continue;
      }
      const mål = løsSti(href, s.sti);
      if (mål !== null && !finnes.has(mål)) døde.push(`${s.sti}: lenken «${href}» – ${mangler(mål)}`);
    }
  }
  r.push({
    gruppe: "Lenker og meny",
    tittel: "Ingen lenker gir 404",
    status: døde.length ? "feil" : "ok",
    detaljer: døde,
    leksjon: L.sider,
  });

  const meny: string[] = [];
  let utenMeny = false;
  for (const s of sider) {
    const til = new Set(
      [...dom.get(s.sti)!.querySelectorAll("ul a[href]")]
        .map((a) => løsSti(a.getAttribute("href") ?? "", s.sti))
        .filter((m): m is string => m !== null),
    );
    if (til.size === 0) {
      utenMeny = true;
      meny.push(`${s.sti} har ingen meny (<ul> med lenker)`);
      continue;
    }
    const savner = sider.map((x) => x.sti).filter((x) => x !== s.sti && !til.has(x));
    if (savner.length) meny.push(`Menyen på ${s.sti} mangler lenke til ${savner.join(", ")}`);
  }
  r.push({
    gruppe: "Lenker og meny",
    tittel: "Menyen står på alle sidene og lenker til alle sidene",
    status: utenMeny ? "feil" : meny.length ? "advarsel" : "ok",
    detaljer: meny,
    leksjon: L.meny,
  });

  // ── Bilder ──────────────────────────────────────────────────────────────
  const bilder = new Set<string>();
  const ødelagte: string[] = [];
  const brukBilde = (src: string, fra: string, hvor: string) => {
    if (/^(https?:|data:)/i.test(src.trim()) || !src.trim()) return;
    const mål = løsSti(src, fra);
    if (mål === null) return;
    if (finnes.has(mål)) bilder.add(mål);
    else ødelagte.push(`${hvor}: «${src}» – ${mangler(mål)}`);
  };
  const altFeil: string[] = [];
  const altSvak: string[] = [];
  for (const s of sider) {
    for (const img of dom.get(s.sti)!.querySelectorAll("img")) {
      const src = img.getAttribute("src") ?? "";
      brukBilde(src, s.sti, s.sti);
      const alt = img.getAttribute("alt");
      if (alt === null) altFeil.push(`${s.sti}: ${src || "<img>"} har ingen alt-tekst`);
      else if (alt.trim() && (alt.trim().length < 4 || /^(bilde|foto|image|logo)$/i.test(alt.trim()) || BILDE.test(alt.trim())))
        altSvak.push(`${s.sti}: alt="${alt}" på ${src} sier lite om bildet`);
    }
  }
  const css = filer.filter((f) => f.sti.toLowerCase().endsWith(".css"));
  for (const c of css) {
    for (const m of (c.tekst ?? "").matchAll(/url\(\s*(["']?)([^"')]*)\1\s*\)/gi)) brukBilde(m[2], c.sti, c.sti);
  }

  r.push({
    gruppe: "Bilder",
    tittel: "Nettstedet har bilder, og alle bildene finnes",
    status: ødelagte.length ? "feil" : bilder.size === 0 ? "feil" : "ok",
    detaljer: bilder.size === 0 && !ødelagte.length ? ["Fant ingen bilder på sidene."] : ødelagte,
    leksjon: L.bilde,
  });
  r.push({
    gruppe: "Bilder",
    tittel: "Alle bildene har alt-tekst",
    status: altFeil.length ? "feil" : altSvak.length ? "advarsel" : "ok",
    detaljer: [...altFeil, ...altSvak],
    leksjon: L.bilde,
  });

  const store = [...bilder]
    .map((b) => finnes.get(b)!)
    .filter((f) => f.storrelse > 200 * KB)
    .sort((a, b) => b.storrelse - a.storrelse);
  r.push({
    gruppe: "Bilder",
    tittel: "Ingen bilder er over 200 kB",
    status: store.some((f) => f.storrelse > 1_000_000) ? "feil" : store.length ? "advarsel" : "ok",
    detaljer: store.map((f) => `${f.sti} er ${kb(f.storrelse)}`),
    leksjon: L.formater,
  });

  // ── Stil og farger ──────────────────────────────────────────────────────
  const regler = [...stilark].flatMap((s) => lesCss(finnes.get(s)?.tekst ?? ""));
  const harMaxWidth = regler.some((x) => /(^|[\s,>+~])img\b/i.test(x.selectorText) && x.style.maxWidth !== "");
  r.push({
    gruppe: "Stil og farger",
    tittel: "Bildene holder seg innenfor (img { max-width: 100%; })",
    status: harMaxWidth ? "ok" : "advarsel",
    detaljer: harMaxWidth ? [] : ["Fant ingen max-width på img i stilarket."],
    leksjon: L.storrelse,
  });

  const cssTekst = [...stilark].map((s) => finnes.get(s)?.tekst ?? "").join("\n");
  const koder = cssTekst.match(/#[0-9a-f]{3,8}\b|hsla?\(|rgba?\(/gi) ?? [];
  r.push({
    gruppe: "Stil og farger",
    tittel: "Fargene er fra en egen palett (hex eller hsl)",
    status: koder.length >= 2 ? "ok" : "advarsel",
    detaljer: koder.length >= 2 ? [] : ["Stilarket bruker for det meste fargenavn. Lag en palett med hex- eller hsl-koder."],
    leksjon: L.farger,
  });

  // Tekstfarge og bakgrunn på body: den siste regelen som setter dem, vinner.
  let tekstfarge = "black";
  let bakgrunn = "white";
  let bakgrunnsbilde = false;
  for (const x of regler) {
    if (!/(^|,)\s*(body|html)\s*(,|$)/i.test(x.selectorText)) continue;
    if (x.style.color) tekstfarge = x.style.color;
    if (x.style.backgroundColor) bakgrunn = x.style.backgroundColor;
    if (x.style.backgroundImage && x.style.backgroundImage !== "none") bakgrunnsbilde = true;
  }
  const a = tilRgb(tekstfarge);
  const b = tilRgb(bakgrunn);
  const forhold = a && b ? kontrast(a, b) : null;
  r.push({
    gruppe: "Stil og farger",
    tittel: "Teksten har god kontrast mot bakgrunnen (minst 4,5:1)",
    status: forhold === null ? "advarsel" : forhold >= 4.5 ? "ok" : "feil",
    detaljer: [
      forhold === null
        ? "Klarte ikke å lese fargene på body."
        : `Tekst ${visFarge(tekstfarge)} på ${visFarge(bakgrunn)}: ${forhold.toFixed(1).replace(".", ",")}:1`,
      ...(bakgrunnsbilde ? ["body har et bakgrunnsbilde – sjekk selv at teksten er lett å lese oppå det."] : []),
    ],
    leksjon: L.farger,
  });

  const sideliste = sider.map((x) => [x.sti, dom.get(x.sti)!, x.tekst ?? ""] as const);
  if (sjekkpunkt >= 2) r.push(...sjekkpunkt2(sideliste, regler, cssTekst));
  if (sjekkpunkt >= 3) r.push(...sjekkpunkt3(sideliste, [...stilark].map((s) => finnes.get(s)!), tilRgb));

  return {
    resultater: r,
    oversikt: {
      sider: sider.length,
      bilder: filer.filter((f) => BILDE.test(f.sti)).length,
      byte: filer.reduce((s, f) => s + f.storrelse, 0),
    },
  };
}

const GENERISK = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-serif|ui-sans-serif|ui-monospace|inherit|initial)$/i;

/** Kravene som kommer i tillegg i sjekkpunkt 2 (modul 6–9). */
function sjekkpunkt2(
  sider: (readonly [string, Document, string])[],
  regler: CSSStyleRule[],
  cssTekst: string,
): Sjekkresultat[] {
  const r: Sjekkresultat[] = [];

  // ── Struktur (modul 7) ─────────────────────────────────────────────────
  const mangler = sider.flatMap(([sti, d]) => {
    const borte = ["header", "nav", "main", "footer"].filter((t) => !d.querySelector(t));
    const flereMain = d.querySelectorAll("main").length > 1;
    return [
      ...(borte.length ? [`${sti} mangler ${borte.map((t) => `<${t}>`).join(", ")}`] : []),
      ...(flereMain ? [`${sti} har mer enn én <main>`] : []),
    ];
  });
  r.push({
    gruppe: "Struktur",
    tittel: "Alle sidene har <header>, <nav>, <main> og <footer>",
    status: mangler.length ? "feil" : "ok",
    detaljer: mangler,
    leksjon: L.semantikk,
  });

  const hopp = sider.flatMap(([sti, d]) => {
    const nivå = [...d.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    const feil = nivå.findIndex((n, i) => (i === 0 ? n !== 1 : n > nivå[i - 1] + 1));
    if (feil < 0) return [];
    return [
      feil === 0
        ? `${sti} starter med <h${nivå[0]}> i stedet for <h1>`
        : `${sti}: <h${nivå[feil]}> kommer rett etter <h${nivå[feil - 1]}>`,
    ];
  });
  r.push({
    gruppe: "Struktur",
    tittel: "Overskriftene hopper ikke over nivåer",
    status: hopp.length ? "feil" : "ok",
    detaljer: hopp,
    leksjon: L.uu,
  });

  // ── Boksmodell og typografi (modul 6 og 8) ─────────────────────────────
  const borderBox = regler.some((x) => x.selectorText.includes("*") && x.style.boxSizing === "border-box");
  r.push({
    gruppe: "Boksmodell og typografi",
    tittel: "box-sizing: border-box på alle elementer",
    status: borderBox ? "ok" : "advarsel",
    detaljer: borderBox ? [] : ["Fant ingen regel som *, *::before, *::after { box-sizing: border-box; }."],
    leksjon: L.boxSizing,
  });

  const sentrert = regler.some(
    (x) =>
      !/(^|[\s,>+~])img\b/i.test(x.selectorText) &&
      x.style.maxWidth !== "" &&
      x.style.maxWidth !== "none" &&
      x.style.marginLeft === "auto" &&
      x.style.marginRight === "auto",
  );
  r.push({
    gruppe: "Boksmodell og typografi",
    tittel: "Innholdet har en maksbredde og står midt på siden",
    status: sentrert ? "ok" : "advarsel",
    detaljer: sentrert ? [] : ["Fant ingen regel med både max-width og margin: 0 auto."],
    leksjon: L.margin,
  });

  let linje = "";
  for (const x of regler) if (/(^|,)\s*(body|html|main)\s*(,|$)/i.test(x.selectorText) && x.style.lineHeight) linje = x.style.lineHeight;
  const linjeTall = /^[\d.]+$/.test(linje) ? Number(linje) : null;
  r.push({
    gruppe: "Boksmodell og typografi",
    tittel: "Brødteksten har god linjeavstand (1,4–1,8)",
    status: linjeTall !== null && linjeTall >= 1.4 && linjeTall <= 1.8 ? "ok" : "advarsel",
    detaljer: !linje
      ? ["Fant ingen line-height på body."]
      : linjeTall === null
        ? [`line-height er ${linje}. Skriv den uten enhet, for eksempel 1.6.`]
        : linjeTall < 1.4 || linjeTall > 1.8
          ? [`line-height er ${String(linjeTall).replace(".", ",")}.`]
          : [],
    leksjon: L.lesbar,
  });

  const pxStørrelser = [...cssTekst.matchAll(/font-size\s*:\s*([\d.]+px)/gi)].map((m) => m[1]);
  r.push({
    gruppe: "Boksmodell og typografi",
    tittel: "Skriftstørrelsene står i rem",
    status: pxStørrelser.length ? "advarsel" : "ok",
    detaljer: pxStørrelser.length ? [`Fant font-size i px: ${[...new Set(pxStørrelser)].join(", ")}.`] : [],
    leksjon: L.rem,
  });

  const utenReserve = [
    ...new Set(
      regler
        .map((x) => x.style.fontFamily)
        .filter((f) => f && !GENERISK.test(f.split(",").at(-1)!.trim().replace(/["']/g, ""))),
    ),
  ];
  r.push({
    gruppe: "Boksmodell og typografi",
    tittel: "Alle skrifter har en reserve til slutt (serif, sans-serif …)",
    status: utenReserve.length ? "advarsel" : "ok",
    detaljer: utenReserve.map((f) => `font-family: ${f}`),
    leksjon: L.webfonter,
  });

  // ── Selektorer og universell utforming (modul 9) ───────────────────────
  const focusRegler = regler.filter((x) => /:focus/.test(x.selectorText));
  const fjernet = focusRegler.filter(
    (x) =>
      (x.style.outlineStyle === "none" || x.style.outlineWidth === "0px") &&
      !x.style.boxShadow &&
      !x.style.backgroundColor &&
      !x.style.textDecorationLine,
  );
  const egenStil = focusRegler.some((x) => x.style.length > 0 && !fjernet.includes(x));
  r.push({
    gruppe: "Selektorer og universell utforming",
    tittel: "Lenkene har en synlig fokusmarkering",
    status: fjernet.length ? "feil" : egenStil ? "ok" : "advarsel",
    detaljer: fjernet.length
      ? fjernet.map((x) => `${x.selectorText} fjerner fokusmarkeringen uten å erstatte den.`)
      : egenStil
        ? []
        : ["Fant ingen :focus- eller :focus-visible-regel. Nettleserens egen markering virker, men en tydelig egen er bedre."],
    leksjon: L.focus,
  });

  const important = (cssTekst.match(/!\s*important/gi) ?? []).length;
  r.push({
    gruppe: "Selektorer og universell utforming",
    tittel: "Stilarket klarer seg uten !important",
    status: important ? "advarsel" : "ok",
    detaljer: important ? [`Fant !important ${important} ${important === 1 ? "gang" : "ganger"}.`] : [],
    leksjon: L.kaskaden,
  });

  return r;
}

/** Alle stilregler i et stilark, også de inni @media – og selve @media-reglene. */
function lesAlleRegler(tekst: string): { toppnivå: CSSStyleRule[]; alle: CSSStyleRule[]; media: CSSMediaRule[] } {
  try {
    const ark = new CSSStyleSheet();
    ark.replaceSync(tekst);
    const toppnivå = [...ark.cssRules].filter((r): r is CSSStyleRule => r instanceof CSSStyleRule);
    const media = [...ark.cssRules].filter((r): r is CSSMediaRule => r instanceof CSSMediaRule);
    const inni = media.flatMap((m) => [...m.cssRules].filter((r): r is CSSStyleRule => r instanceof CSSStyleRule));
    return { toppnivå, alle: [...toppnivå, ...inni], media };
  } catch {
    return { toppnivå: [], alle: [], media: [] };
  }
}

/** Er stien noe som bare finnes på studentens egen maskin, eller som peker på roten (/…)? */
const lokalSti = (sti: string) => /^(file:|[a-z]:[\\/])/i.test(sti.trim());
const rotSti = (sti: string) => sti.trim().startsWith("/") && !sti.trim().startsWith("//");

/** Kravene som kommer i tillegg i sjekkpunkt 3 (modul 10–14). */
function sjekkpunkt3(
  sider: (readonly [string, Document, string])[],
  stilark: NettstedFil[],
  tilRgb: (farge: string) => Rgb | null,
): Sjekkresultat[] {
  const r: Sjekkresultat[] = [];
  const css = stilark.map((f) => ({ sti: f.sti, ...lesAlleRegler(f.tekst ?? "") }));
  const toppnivå = css.flatMap((c) => c.toppnivå);
  const alle = css.flatMap((c) => c.alle);
  const media = css.flatMap((c) => c.media);

  // ── Responsivt design (modul 13) ───────────────────────────────────────
  const utenViewport = sider
    .filter(([, d]) => !/width=device-width/i.test(d.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? ""))
    .map(([sti]) => `${sti} mangler <meta name="viewport" content="width=device-width, initial-scale=1">`);
  r.push({
    gruppe: "Responsivt design",
    tittel: "Alle sidene har viewport-taggen",
    status: utenViewport.length ? "feil" : "ok",
    detaljer: utenViewport,
    leksjon: L.viewport,
  });

  const maxWidth = media.filter((m) => /max-width/i.test(m.conditionText));
  r.push({
    gruppe: "Responsivt design",
    tittel: "Stilarket har media queries, og er mobil først (min-width)",
    status: media.length === 0 || maxWidth.length ? "advarsel" : "ok",
    detaljer:
      media.length === 0
        ? ["Fant ingen @media-regler. Endrer ikke oppsettet seg på store skjermer?"]
        : maxWidth.map((m) => `@media ${m.conditionText} – skriv heller mobiloppsettet først, og bruk min-width`),
    leksjon: media.length === 0 ? L.media : L.mobilForst,
  });

  const faste = toppnivå
    .flatMap((x) =>
      (["width", "min-width"] as const)
        .map((e) => [e, x.style.getPropertyValue(e)] as const)
        .filter(([, v]) => /^\d+(\.\d+)?px$/.test(v) && parseFloat(v) > 400)
        .map(([e, v]) => `${x.selectorText} { ${e}: ${v} } – bredere enn en mobil. Bruk max-width, eller legg den i en media query.`),
    );
  r.push({
    gruppe: "Responsivt design",
    tittel: "Ingen faste bredder som er bredere enn en mobil",
    status: faste.length ? "advarsel" : "ok",
    detaljer: faste,
    leksjon: L.viewport,
  });

  // ── Oppsett med flexbox og grid (modul 10–12) ──────────────────────────
  const oppsett = alle.filter((x) => /^(inline-)?(flex|grid)$/.test(x.style.display));
  r.push({
    gruppe: "Oppsett med flexbox og grid",
    tittel: "Nettstedet bruker flexbox eller grid til oppsettet",
    status: oppsett.length ? "ok" : "advarsel",
    detaljer: oppsett.length ? [] : ["Fant ingen display: flex eller display: grid i stilarket."],
    leksjon: L.hva,
  });

  const toppOppsett = oppsett.some((x) => /(^|[\s,>+~])(header|nav)\b/i.test(x.selectorText));
  r.push({
    gruppe: "Oppsett med flexbox og grid",
    tittel: "Toppen eller menyen er lagt opp med flexbox eller grid",
    status: toppOppsett ? "ok" : "advarsel",
    detaljer: toppOppsett ? [] : ["Fant ingen regel for header eller nav med display: flex eller grid."],
    leksjon: L.flex,
  });

  // ── Klar for publisering (modul 14) ────────────────────────────────────
  const dårligeStier: string[] = [];
  for (const [sti, d] of sider) {
    for (const e of d.querySelectorAll("a[href], link[href], img[src], script[src]")) {
      const verdi = e.getAttribute("href") ?? e.getAttribute("src") ?? "";
      if (lokalSti(verdi)) dårligeStier.push(`${sti}: «${verdi}» finnes bare på din maskin`);
      else if (rotSti(verdi)) dårligeStier.push(`${sti}: «${verdi}» starter med / og virker ikke på GitHub Pages`);
    }
  }
  for (const f of stilark) {
    for (const m of (f.tekst ?? "").matchAll(/url\(\s*(["']?)([^"')]*)\1\s*\)/gi)) {
      if (lokalSti(m[2])) dårligeStier.push(`${f.sti}: «${m[2]}» finnes bare på din maskin`);
      else if (rotSti(m[2])) dårligeStier.push(`${f.sti}: «${m[2]}» starter med / og virker ikke på GitHub Pages`);
    }
  }
  r.push({
    gruppe: "Klar for publisering",
    tittel: "Alle stier er relative – ingen C:/, file: eller / først",
    status: dårligeStier.length ? "feil" : "ok",
    detaljer: dårligeStier,
    leksjon: L.lokaleStier,
  });

  const valideringsfeil = sider.flatMap(([sti, d, kilde]) => {
    const funn: string[] = [];
    const ider = [...d.querySelectorAll("[id]")].map((e) => e.id);
    const doble = [...new Set(ider.filter((id, i) => ider.indexOf(id) !== i))];
    if (doble.length) funn.push(`${sti}: id brukt mer enn én gang: ${doble.map((x) => `#${x}`).join(", ")}`);
    if ([...d.querySelectorAll("li")].some((li) => !li.parentElement?.matches("ul, ol, menu"))) {
      funn.push(`${sti}: en <li> står utenfor <ul> eller <ol>`);
    }
    const åpne = (kilde.match(/<p[\s>]/gi) ?? []).length;
    const lukkede = (kilde.match(/<\/p>/gi) ?? []).length;
    if (åpne !== lukkede) funn.push(`${sti}: ${åpne} <p> men ${lukkede} </p> – et avsnitt er ikke lukket`);
    return funn;
  });
  r.push({
    gruppe: "Klar for publisering",
    tittel: "Ingen vanlige valideringsfeil (doble id-er, <li> uten liste, ulukkede avsnitt)",
    status: valideringsfeil.length ? "feil" : "ok",
    detaljer: valideringsfeil.length
      ? [...valideringsfeil, "Sjekk også sidene på validator.w3.org – den finner mer enn dette."]
      : [],
    leksjon: L.validering,
  });

  // Tekstfarge og bakgrunn på topp, meny og bunn: den siste regelen som setter dem, vinner.
  const deler = ["header", "nav", "footer"].flatMap((del) => {
    let farge = "";
    let bakgrunn = "";
    for (const x of toppnivå) {
      if (!new RegExp(`(^|,)\\s*${del}\\s*(,|$)`, "i").test(x.selectorText)) continue;
      if (x.style.color) farge = x.style.color;
      if (x.style.backgroundColor) bakgrunn = x.style.backgroundColor;
    }
    if (!farge || !bakgrunn) return [];
    const a = tilRgb(farge);
    const b = tilRgb(bakgrunn);
    if (!a || !b) return [];
    const forhold = kontrast(a, b);
    return forhold < 4.5 ? [`${del}: tekst ${visFarge(farge)} på ${visFarge(bakgrunn)} gir ${forhold.toFixed(1).replace(".", ",")}:1`] : [];
  });
  r.push({
    gruppe: "Klar for publisering",
    tittel: "Toppen, menyen og bunnen har god kontrast (minst 4,5:1)",
    status: deler.length ? "advarsel" : "ok",
    detaljer: deler,
    leksjon: L.sisteSjekk,
  });

  return r;
}

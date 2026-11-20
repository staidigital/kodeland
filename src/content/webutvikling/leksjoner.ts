import type { ComponentType } from "react";
import m1HeiNettside from "./din-forste-nettside/hei-nettside.mdx";
import m1Prosjektmappen from "./din-forste-nettside/prosjektmappen.mdx";
import m1Taggene from "./din-forste-nettside/taggene.mdx";
import m1Vscodium from "./din-forste-nettside/vscodium.mdx";
import m2Bakgrunn from "./gi-den-farge/bakgrunn-og-skrift.mdx";
import m2ForsteRegel from "./gi-den-farge/forste-regel.mdx";
import m2KobleStilarket from "./gi-den-farge/koble-stilarket.mdx";
import m2UthevTekst from "./gi-den-farge/uthev-tekst.mdx";
import m3HexOgHsl from "./mer-innhold-mer-stil/hex-og-hsl.mdx";
import m3Klasser from "./mer-innhold-mer-stil/klasser.mdx";
import m3Lister from "./mer-innhold-mer-stil/lister.mdx";
import m3MidtstillOgRydd from "./mer-innhold-mer-stil/midtstill-og-rydd.mdx";
import m4FlereSider from "./lenker/flere-sider.mdx";
import m4KlientOgTjener from "./lenker/klient-og-tjener.mdx";
import m4Lenker from "./lenker/lenker.mdx";
import m4Meny from "./lenker/meny.mdx";
import m5Bakgrunnsbilder from "./bilder/bakgrunnsbilder.mdx";
import m5ForsteBilde from "./bilder/forste-bilde.mdx";
import m5Formater from "./bilder/formater-og-opphavsrett.mdx";
import m5StorrelseOgForm from "./bilder/storrelse-og-form.mdx";
import s1DittNettsted from "./sjekkpunkt-1/ditt-nettsted.mdx";
import m6AltErBokser from "./boksmodellen/alt-er-bokser.mdx";
import m6BoxSizing from "./boksmodellen/box-sizing.mdx";
import m6Margin from "./boksmodellen/margin.mdx";
import m6PaddingOgBorder from "./boksmodellen/padding-og-border.mdx";
import m7BokserMedMening from "./semantikk/bokser-med-mening.mdx";
import m7DomTreet from "./semantikk/dom-treet.mdx";
import m7SectionOgArticle from "./semantikk/section-og-article.mdx";
import m7StilPaStrukturen from "./semantikk/stil-pa-strukturen.mdx";
import m7UniversellUtforming from "./semantikk/universell-utforming.mdx";
import m8LesbarTekst from "./typografi/lesbar-tekst.mdx";
import m8RemOgEm from "./typografi/rem-og-em.mdx";
import m8SitaterOgTegn from "./typografi/sitater-og-tegn.mdx";
import m8TypografiskSkala from "./typografi/typografisk-skala.mdx";
import m8Webfonter from "./typografi/webfonter.mdx";
import m9Kaskaden from "./selektorer/kaskaden.mdx";
import m9Kombinatorer from "./selektorer/kombinatorer.mdx";
import m9Pseudoklasser from "./selektorer/pseudoklasser.mdx";
import m9TabellerOgLister from "./selektorer/tabeller-og-lister.mdx";

/**
 * Kobler leksjons-id (modul/leksjon) til MDX-fila.
 * Ny leksjon: legg den til i kurs.ts OG her.
 * (Statiske importer: dynamiske import() av MDX feiler i Next sin forhåndsvalidering.)
 */
export const LEKSJONER: Record<string, ComponentType> = {
  "din-forste-nettside/hei-nettside": m1HeiNettside,
  "din-forste-nettside/taggene": m1Taggene,
  "din-forste-nettside/prosjektmappen": m1Prosjektmappen,
  "din-forste-nettside/vscodium": m1Vscodium,
  "gi-den-farge/uthev-tekst": m2UthevTekst,
  "gi-den-farge/forste-regel": m2ForsteRegel,
  "gi-den-farge/bakgrunn-og-skrift": m2Bakgrunn,
  "gi-den-farge/koble-stilarket": m2KobleStilarket,
  "mer-innhold-mer-stil/lister": m3Lister,
  "mer-innhold-mer-stil/klasser": m3Klasser,
  "mer-innhold-mer-stil/hex-og-hsl": m3HexOgHsl,
  "mer-innhold-mer-stil/midtstill-og-rydd": m3MidtstillOgRydd,
  "lenker/lenker": m4Lenker,
  "lenker/flere-sider": m4FlereSider,
  "lenker/meny": m4Meny,
  "lenker/klient-og-tjener": m4KlientOgTjener,
  "bilder/forste-bilde": m5ForsteBilde,
  "bilder/storrelse-og-form": m5StorrelseOgForm,
  "bilder/bakgrunnsbilder": m5Bakgrunnsbilder,
  "bilder/formater-og-opphavsrett": m5Formater,
  "sjekkpunkt-1/ditt-nettsted": s1DittNettsted,
  "boksmodellen/alt-er-bokser": m6AltErBokser,
  "boksmodellen/padding-og-border": m6PaddingOgBorder,
  "boksmodellen/margin": m6Margin,
  "boksmodellen/box-sizing": m6BoxSizing,
  "semantikk/bokser-med-mening": m7BokserMedMening,
  "semantikk/section-og-article": m7SectionOgArticle,
  "semantikk/stil-pa-strukturen": m7StilPaStrukturen,
  "semantikk/dom-treet": m7DomTreet,
  "semantikk/universell-utforming": m7UniversellUtforming,
  "typografi/lesbar-tekst": m8LesbarTekst,
  "typografi/rem-og-em": m8RemOgEm,
  "typografi/typografisk-skala": m8TypografiskSkala,
  "typografi/webfonter": m8Webfonter,
  "typografi/sitater-og-tegn": m8SitaterOgTegn,
  "selektorer/tabeller-og-lister": m9TabellerOgLister,
  "selektorer/kombinatorer": m9Kombinatorer,
  "selektorer/pseudoklasser": m9Pseudoklasser,
  "selektorer/kaskaden": m9Kaskaden,
};

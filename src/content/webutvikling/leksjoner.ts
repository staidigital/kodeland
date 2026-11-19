import type { ComponentType } from "react";
import m1HeiNettside from "./din-forste-nettside/hei-nettside.mdx";
import m1Prosjektmappen from "./din-forste-nettside/prosjektmappen.mdx";
import m1Taggene from "./din-forste-nettside/taggene.mdx";
import m1Vscodium from "./din-forste-nettside/vscodium.mdx";
import m2Bakgrunn from "./gi-den-farge/bakgrunn-og-skrift.mdx";
import m2ForsteRegel from "./gi-den-farge/forste-regel.mdx";
import m2KobleStilarket from "./gi-den-farge/koble-stilarket.mdx";
import m2UthevTekst from "./gi-den-farge/uthev-tekst.mdx";

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
};

import type { MDXComponents } from "mdx/types";
import { GjorDetSelv, Tips, UnderPanseret } from "@/components/kurs/bokser";
import { Fargevelger } from "@/components/kurs/fargevelger";
import { Filnavn } from "@/components/kurs/filnavn";
import { KlientTjener } from "@/components/kurs/klient-tjener";
import { MdxKode } from "@/components/kurs/kodefarger";
import { Mappebygger } from "@/components/kurs/mappebygger";
import { Nettstedsjekker } from "@/components/kurs/nettstedsjekker";
import { Nettverksfane } from "@/components/kurs/nettverksfane";
import { Oppgave } from "@/components/kurs/oppgave";
import { Quiz } from "@/components/kurs/quiz";
import { Sjekkliste } from "@/components/kurs/sjekkliste";
import { Stifinner } from "@/components/kurs/stifinner";

/** Komponenter som kan brukes direkte i alle .mdx-leksjoner uten import. */
const components: MDXComponents = {
  code: MdxKode,
  Oppgave,
  Quiz,
  UnderPanseret,
  Tips,
  GjorDetSelv,
  Filnavn,
  Fargevelger,
  KlientTjener,
  Stifinner,
  Nettverksfane,
  Nettstedsjekker,
  Mappebygger,
  Sjekkliste,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

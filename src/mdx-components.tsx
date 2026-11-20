import type { MDXComponents } from "mdx/types";
import { GjorDetSelv, Tips, UnderPanseret } from "@/components/kurs/bokser";
import { Boksmodell } from "@/components/kurs/boksmodell";
import { DomTre } from "@/components/kurs/dom-tre";
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
import { Skjermleser } from "@/components/kurs/skjermleser";
import { Typeskala } from "@/components/kurs/typeskala";
import { Typografilab } from "@/components/kurs/typografilab";
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
  Boksmodell,
  DomTre,
  Skjermleser,
  Typografilab,
  Typeskala,
  Mappebygger,
  Sjekkliste,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

import type { MDXComponents } from "mdx/types";
import { GjorDetSelv, Tips, UnderPanseret } from "@/components/kurs/bokser";
import { Filnavn } from "@/components/kurs/filnavn";
import { MdxKode } from "@/components/kurs/kodefarger";
import { Mappebygger } from "@/components/kurs/mappebygger";
import { Oppgave } from "@/components/kurs/oppgave";
import { Quiz } from "@/components/kurs/quiz";
import { Sjekkliste } from "@/components/kurs/sjekkliste";

/** Komponenter som kan brukes direkte i alle .mdx-leksjoner uten import. */
const components: MDXComponents = {
  code: MdxKode,
  Oppgave,
  Quiz,
  UnderPanseret,
  Tips,
  GjorDetSelv,
  Filnavn,
  Mappebygger,
  Sjekkliste,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

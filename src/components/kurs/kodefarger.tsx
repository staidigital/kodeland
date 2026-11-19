import { parser as cssParser } from "@lezer/css";
import { highlightCode, tagHighlighter, tags as t } from "@lezer/highlight";
import { parser as htmlParser } from "@lezer/html";
import type { ComponentProps, ReactNode } from "react";

/**
 * Fargelegger HTML og CSS med de samme parserne som oppgave-editoren (CodeMirror),
 * så kodeeksemplene får samme farger som editoren. Fargene står i kurs.css (.kf-*).
 */

export type Sprak = "html" | "css";

const PARSERE = { html: htmlParser, css: cssParser };

// Mer spesifikke tagger arver fra disse: attributeName → propertyName, attributeValue → string.
const fargelegger = tagHighlighter([
  { tag: [t.tagName, t.className, t.typeName, t.namespace], class: "kf-tag" },
  { tag: [t.propertyName, t.labelName], class: "kf-egenskap" },
  { tag: [t.atom, t.color, t.keyword, t.modifier, t.bool], class: "kf-verdi" },
  { tag: t.string, class: "kf-streng" },
  { tag: t.number, class: "kf-tall" },
  { tag: t.angleBracket, class: "kf-klammer" },
  { tag: [t.comment, t.meta], class: "kf-kommentar" },
]);

/** Gjetter språket: starter koden med «<», er det HTML, ellers CSS. */
export function gjettSprak(kode: string): Sprak {
  return kode.trimStart().startsWith("<") ? "html" : "css";
}

export function fargelegg(kode: string, sprak: Sprak): ReactNode[] {
  const ut: ReactNode[] = [];
  highlightCode(
    kode,
    PARSERE[sprak].parse(kode),
    fargelegger,
    (tekst, klasser) => {
      ut.push(klasser ? <span key={ut.length} className={klasser}>{tekst}</span> : tekst);
    },
    () => ut.push("\n"),
  );
  return ut;
}

/** Kode med farger, til bruk inni <pre>. */
export function Kode({ kode, sprak }: { kode: string; sprak?: Sprak }) {
  const s = sprak ?? gjettSprak(kode);
  return <code className={`language-${s}`}>{fargelegg(kode, s)}</code>;
}

/**
 * Erstatter <code> i MDX. Kodeblokker merket ```html eller ```css får farger;
 * inline-kode og andre språk vises som før.
 */
export function MdxKode({ className, children, ...rest }: ComponentProps<"code">) {
  const sprak = /language-(html|css)\b/.exec(className ?? "")?.[1] as Sprak | undefined;
  if (sprak && typeof children === "string") {
    return (
      <code className={className} {...rest}>
        {fargelegg(children, sprak)}
      </code>
    );
  }
  return (
    <code className={className} {...rest}>
      {children}
    </code>
  );
}

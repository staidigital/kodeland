/**
 * Spesifisitet for enkle CSS-selektorer, som (id, klasse, element).
 * Dekker det kurset bruker: #id, .klasse, [attributt], :pseudoklasse, ::pseudoelement og tagger.
 * :not(), :is() og :where() regnes ikke spesielt.
 */
export type Spesifisitet = [number, number, number];

export function spesifisitet(selektor: string): Spesifisitet {
  // Fjern innholdet i parenteser (f.eks. :nth-child(2n+1)), så det ikke telles som tagger.
  const s = selektor.replace(/\([^)]*\)/g, "()");
  const id = (s.match(/#[\w-]+/g) ?? []).length;
  const pseudoElement = (s.match(/::[\w-]+/g) ?? []).length;
  const klasse =
    (s.match(/\.[\w-]+/g) ?? []).length +
    (s.match(/\[[^\]]*\]/g) ?? []).length +
    (s.replace(/::[\w-]+/g, "").match(/:[\w-]+/g) ?? []).length;
  const element =
    (s
      .replace(/#[\w-]+|\.[\w-]+|\[[^\]]*\]|::?[\w-]+(\(\))?/g, " ")
      .match(/(^|[\s>+~,(])[a-zA-Z][\w-]*/g) ?? []).length + pseudoElement;
  return [id, klasse, element];
}

/** Positiv hvis a vinner over b, negativ hvis b vinner, 0 ved likt. */
export function sammenlign(a: Spesifisitet, b: Spesifisitet) {
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}

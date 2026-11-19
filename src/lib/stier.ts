/**
 * Stier i et nettsted, slik nettleseren tolker dem. Brukes av oppgave-editoren,
 * sjekkene i oppgaver.ts og nettstedsjekkeren.
 */

const PROSJEKT = "https://prosjekt.invalid/";

/**
 * Hvilken fil i prosjektet peker `href` på, sett fra fila `fra`? Følger samme regler som
 * nettleseren (relative stier, ../, mappe/ → mappe/index.html). Gir null for lenker ut av
 * prosjektet (https://…, mailto: …).
 */
export function løsSti(href: string, fra: string): string | null {
  let url: URL;
  try {
    url = new URL(href.trim(), PROSJEKT + fra);
  } catch {
    return null;
  }
  if (url.origin !== new URL(PROSJEKT).origin) return null;
  let sti: string;
  try {
    sti = decodeURIComponent(url.pathname.slice(1));
  } catch {
    sti = url.pathname.slice(1);
  }
  if (sti === "" || sti.endsWith("/")) sti += "index.html";
  return sti;
}

import "server-only";

const ADJEKTIV = ["rask", "glad", "stor", "liten", "modig", "rolig", "lys", "kul", "vill", "snill", "smart", "sterk"];
const DYR = ["ugle", "rev", "elg", "hval", "katt", "hund", "ulv", "laks", "hare", "ekorn", "maur", "sel", "bjorn", "orn"];

function tilfeldig(n: number) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % n;
}

/** Lett å lese opp og skrive inn, f.eks. «modig-ugle-4721». */
export function lagPassord() {
  const tall = String(1000 + tilfeldig(9000));
  return `${ADJEKTIV[tilfeldig(ADJEKTIV.length)]}-${DYR[tilfeldig(DYR.length)]}-${tall}`;
}

/** «Kari Ødegård» → «kario», «Ola H.» → «olah», «MN» → «mn». Bare a–z og 0–9. */
export function foreslaBrukernavn(navn: string) {
  const ord = navn
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/\s+/)
    .map((o) => o.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);
  if (ord.length === 0) return "student";
  const fornavn = ord[0].slice(0, 12);
  const etternavn = ord.length > 1 ? ord[ord.length - 1][0] : "";
  return fornavn + etternavn;
}

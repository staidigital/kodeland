/**
 * Fargehjelpere for kurset: brukes av sjekkene i oppgaver.ts og av <Fargevelger>.
 * RGB er [r, g, b] (0–255), ev. med alfa som fjerde verdi. HSL er [h (0–360), s (0–100), l (0–100)].
 */

export type Rgb = number[];
export type Hsl = [number, number, number];

/** «rgb(1, 2, 3)» eller «rgba(1, 2, 3, 0.5)» → [r, g, b, a]. */
export function lesRgb(c: string): Rgb {
  const [r = 0, g = 0, b = 0, a = 1] = (c.match(/[\d.]+/g) ?? []).map(Number);
  return [r, g, b, a];
}

/** Relativ luminans etter WCAG. */
function luminans([r, g, b]: Rgb) {
  const k = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * k[0] + 0.7152 * k[1] + 0.0722 * k[2];
}

/** Kontrastforhold etter WCAG, fra 1 til 21. Vanlig tekst bør ha minst 4,5. */
export function kontrast(a: Rgb, b: Rgb) {
  const [l1, l2] = [luminans(a), luminans(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function hslTilRgb([h, s, l]: Hsl): Rgb {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}

export function rgbTilHsl([r, g, b]: Rgb): Hsl {
  r /= 255;
  g /= 255;
  b /= 255;
  const maks = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (maks + min) / 2;
  const d = maks - min;
  if (d === 0) return [0, 0, Math.round(l * 100)];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h =
    maks === r ? ((g - b) / d) % 6 : maks === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [Math.round((h * 60 + 360) % 360), Math.round(s * 100), Math.round(l * 100)];
}

export function tilHex([r, g, b]: Rgb) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** Avstand mellom to fargetoner på fargesirkelen (0–180). */
export function toneAvstand(a: number, b: number) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

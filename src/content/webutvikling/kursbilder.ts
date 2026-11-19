/**
 * Bildene som finnes i oppgavene: sti i studentens prosjekt → fil i public/.
 * En oppgave velger hvilke av dem som ligger i prosjektet med `bilder: [...]` i oppgaver.ts.
 * Bildene er tegnet for kurset (ingen opphavsrett å ta hensyn til).
 */
export const KURSBILDER = {
  "bilder/fjell.jpg": "/kurs/bilder/fjell.jpg",
  "bilder/fjell.png": "/kurs/bilder/fjell.png",
  "bilder/fjell.webp": "/kurs/bilder/fjell.webp",
  "bilder/fjell-original.jpg": "/kurs/bilder/fjell-original.jpg",
  "bilder/logo.png": "/kurs/bilder/logo.png",
  "bilder/logo.jpg": "/kurs/bilder/logo.jpg",
  "bilder/logo.svg": "/kurs/bilder/logo.svg",
  "bilder/monster.png": "/kurs/bilder/monster.png",
  "bilder/profil.jpg": "/kurs/bilder/profil.jpg",
} as const;

export type Kursbilde = keyof typeof KURSBILDER;

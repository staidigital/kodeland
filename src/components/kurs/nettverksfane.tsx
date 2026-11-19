"use client";

import { useEffect, useState } from "react";
import { KURSBILDER, type Kursbilde } from "@/content/webutvikling/kursbilder";

type Fil = { navn: string; type: string; /** Byte, brukes til bildet er hentet. */ anslag: number; url?: string };

const SIDE: Fil[] = [
  { navn: "index.html", type: "html", anslag: 2_100 },
  { navn: "style.css", type: "css", anslag: 900 },
  { navn: "logo.png", type: "png", anslag: 10_300, url: KURSBILDER["bilder/logo.png"] },
];

const STORE_BILDER: { fil: Kursbilde; tekst: string; anslag: number }[] = [
  { fil: "bilder/fjell-original.jpg", tekst: "Rett fra kameraet (4000 × 2500)", anslag: 1_200_000 },
  { fil: "bilder/fjell.png", tekst: "PNG (1600 × 1000)", anslag: 1_130_000 },
  { fil: "bilder/fjell.jpg", tekst: "JPG (1600 × 1000)", anslag: 37_000 },
  { fil: "bilder/fjell.webp", tekst: "WebP (1600 × 1000)", anslag: 15_000 },
];

const NETT = [
  { navn: "Skolenettet", mbit: 50 },
  { navn: "4G", mbit: 10 },
  { navn: "Treg mobil", mbit: 1 },
];

/** Tid før svaret begynner å komme (ventetid per forespørsel), i sekunder. */
const VENTETID = 0.06;

const kb = (b: number) =>
  b >= 1_000_000 ? `${(b / 1_000_000).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(b / 1000))} kB`;
const sek = (s: number) => (s < 1 ? `${Math.round(s * 1000)} ms` : `${s.toFixed(1).replace(".", ",")} s`);

/** Forenklet Network-fane: hver fil er en egen forespørsel, og store bilder tar tid. */
export function Nettverksfane() {
  const [bilde, setBilde] = useState(0);
  const [nett, setNett] = useState(1);
  const [storrelser, setStorrelser] = useState<Record<string, number>>({});
  const [runde, setRunde] = useState(0);

  // Hent de ekte filstørrelsene til bildene (bare hodet av svaret, ikke selve bildet).
  useEffect(() => {
    const urler = [...SIDE.filter((f) => f.url).map((f) => f.url!), ...STORE_BILDER.map((b) => KURSBILDER[b.fil])];
    let avbrutt = false;
    Promise.all(
      urler.map((u) =>
        fetch(u, { method: "HEAD" })
          .then((r) => [u, Number(r.headers.get("content-length")) || 0] as const)
          .catch(() => [u, 0] as const),
      ),
    ).then((svar) => {
      if (!avbrutt) setStorrelser(Object.fromEntries(svar.filter(([, b]) => b > 0)));
    });
    return () => {
      avbrutt = true;
    };
  }, []);

  const valgt = STORE_BILDER[bilde];
  const bytesPerSek = (NETT[nett].mbit * 1_000_000) / 8;
  const filer = [
    ...SIDE,
    { navn: valgt.fil.split("/").pop()!, type: valgt.fil.split(".").pop()!, anslag: valgt.anslag, url: KURSBILDER[valgt.fil] },
  ].map((f) => ({ ...f, byte: (f.url && storrelser[f.url]) || f.anslag }));

  // index.html først. Når den er lest, hentes resten samtidig (og deler på nettet).
  const htmlTid = VENTETID + filer[0].byte / bytesPerSek;
  const resten = filer.slice(1);
  const restTid = VENTETID + resten.reduce((s, f) => s + f.byte, 0) / bytesPerSek;
  const rader = filer.map((f, i) => {
    const start = i === 0 ? 0 : htmlTid;
    const tid = i === 0 ? htmlTid : VENTETID + (f.byte / resten.reduce((s, x) => s + x.byte, 0)) * (restTid - VENTETID);
    return { ...f, start, tid };
  });
  const totalt = Math.max(...rader.map((r) => r.start + r.tid));
  const sumByte = filer.reduce((s, f) => s + f.byte, 0);

  return (
    <div className="nettverksfane">
      <p className="quiz__etikett">📡 Nettverk</p>

      <div className="nf-valg">
        <label>
          <span className="sf-etikett">Det store bildet</span>
          <select value={bilde} onChange={(e) => { setBilde(Number(e.target.value)); setRunde((r) => r + 1); }}>
            {STORE_BILDER.map((b, i) => (
              <option key={b.fil} value={i}>
                {b.tekst}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sf-etikett">Nettet</span>
          <select value={nett} onChange={(e) => { setNett(Number(e.target.value)); setRunde((r) => r + 1); }}>
            {NETT.map((n, i) => (
              <option key={n.navn} value={i}>
                {n.navn} ({n.mbit} Mbit/s)
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="nf-tabell" role="table" aria-label="Forespørsler for å vise siden">
        <div className="nf-rad nf-rad--hode" role="row">
          <span role="columnheader">Navn</span>
          <span role="columnheader">Type</span>
          <span role="columnheader">Størrelse</span>
          <span role="columnheader">Tid</span>
          <span role="columnheader" className="nf-foss-hode">Fossefall</span>
        </div>
        {rader.map((r) => (
          <div key={r.navn} className="nf-rad" role="row">
            <span role="cell" className="nf-navn">{r.navn}</span>
            <span role="cell">{r.type}</span>
            <span role="cell" className={r.byte > 500_000 ? "nf-stor" : ""}>{kb(r.byte)}</span>
            <span role="cell">{sek(r.tid)}</span>
            <span role="cell" className="nf-foss" aria-hidden="true">
              <i
                key={runde}
                className={`nf-strek nf-strek--${r.type}`}
                style={{
                  marginLeft: `${(r.start / totalt) * 100}%`,
                  width: `${Math.max(1.5, (r.tid / totalt) * 100)}%`,
                  animationDuration: `${Math.min(2.5, 0.25 + (r.start + r.tid) / totalt)}s`,
                }}
              />
            </span>
          </div>
        ))}
      </div>

      <p className="nf-sum">
        {rader.length} forespørsler · {kb(sumByte)} overført · ferdig etter <strong>{sek(totalt)}</strong>
      </p>
    </div>
  );
}

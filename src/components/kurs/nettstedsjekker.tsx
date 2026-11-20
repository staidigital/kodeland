"use client";

import Link from "next/link";
import { type DragEvent, useEffect, useRef, useState } from "react";
import { lesRgb, type Rgb } from "@/lib/farger";
import {
  finnRot,
  type NettstedFil,
  type Oversikt,
  type Sjekkresultat,
  sjekkNettsted,
  tellerMed,
} from "@/lib/nettstedsjekk";

/** Filer som leses som tekst (HTML og CSS), opp til en fornuftig størrelse. */
const LES_TEKST = /\.(html?|css)$/i;
const MAKS_TEKST = 2_000_000;
const MAKS_FILER = 2000;

type Innfil = { sti: string; fil: File };

/** CSS-farge → RGB, via nettleseren. Gjennomsiktig blir hvitt (det er det som vises bak). */
function tilRgb(farge: string): Rgb | null {
  const el = document.createElement("span");
  el.style.color = farge;
  if (!el.style.color) return null;
  document.body.append(el);
  const rgb = lesRgb(getComputedStyle(el).color);
  el.remove();
  return rgb[3] === 0 ? [255, 255, 255] : rgb;
}

/** Leser alle filer i en mappe som er dratt inn (rekursivt). */
async function lesMappe(entry: FileSystemEntry, ut: Innfil[]) {
  if (ut.length > MAKS_FILER) return;
  if (entry.isFile) {
    const fil = await new Promise<File>((ok, feil) => (entry as FileSystemFileEntry).file(ok, feil));
    ut.push({ sti: entry.fullPath.replace(/^\//, ""), fil });
    return;
  }
  const leser = (entry as FileSystemDirectoryEntry).createReader();
  for (;;) {
    const del = await new Promise<FileSystemEntry[]>((ok, feil) => leser.readEntries(ok, feil));
    if (del.length === 0) break;
    for (const e of del) if (tellerMed(e.name)) await lesMappe(e, ut);
  }
}

const IKON = { ok: "✓", advarsel: "!", feil: "✗" } as const;
const kb = (b: number) => (b >= 1_000_000 ? `${(b / 1_000_000).toFixed(1).replace(".", ",")} MB` : `${Math.round(b / 1000)} kB`);

/**
 * Sjekker studentens webkurs-mappe mot kravene i et sjekkpunkt (1 eller 2).
 * Filene leses lokalt i nettleseren – ingenting lastes opp.
 */
export function Nettstedsjekker({ sjekkpunkt = 1 }: { sjekkpunkt?: 1 | 2 }) {
  const input = useRef<HTMLInputElement>(null);
  const [svar, setSvar] = useState<{ resultater: Sjekkresultat[]; oversikt: Oversikt; rot: string } | null>(null);
  const [feil, setFeil] = useState<string | null>(null);
  const [jobber, setJobber] = useState(false);
  const [over, setOver] = useState(false);

  // webkitdirectory finnes ikke i Reacts typer, men virker i alle store nettlesere.
  useEffect(() => {
    input.current?.setAttribute("webkitdirectory", "");
  }, []);

  async function sjekk(innfiler: Innfil[]) {
    setJobber(true);
    setFeil(null);
    try {
      const med = innfiler.filter((f) => tellerMed(f.sti));
      const rot = finnRot(med.map((f) => f.sti));
      if (!med.some((f) => f.sti === `${rot}index.html`)) {
        setSvar(null);
        setFeil("Fant ingen index.html i mappen. Velg webkurs-mappen – den som index.html ligger i.");
        return;
      }
      const filer: NettstedFil[] = await Promise.all(
        med
          .filter((f) => f.sti.startsWith(rot))
          .slice(0, MAKS_FILER)
          .map(async (f) => ({
            sti: f.sti.slice(rot.length),
            storrelse: f.fil.size,
            tekst: LES_TEKST.test(f.sti) && f.fil.size < MAKS_TEKST ? await f.fil.text() : undefined,
          })),
      );
      setSvar({ ...sjekkNettsted(filer, tilRgb, sjekkpunkt), rot: rot || "mappen du valgte/" });
    } catch {
      setFeil("Noe gikk galt da mappen skulle leses. Prøv å velge den på nytt.");
    } finally {
      setJobber(false);
    }
  }

  function valgt(liste: FileList | null) {
    if (!liste?.length) return;
    sjekk([...liste].map((fil) => ({ sti: fil.webkitRelativePath || fil.name, fil })));
    if (input.current) input.current.value = "";
  }

  async function slipp(e: DragEvent) {
    e.preventDefault();
    setOver(false);
    const entries = [...e.dataTransfer.items]
      .map((i) => i.webkitGetAsEntry?.())
      .filter((x): x is FileSystemEntry => !!x);
    if (!entries.length) return;
    const ut: Innfil[] = [];
    setJobber(true);
    for (const en of entries) await lesMappe(en, ut);
    sjekk(ut);
  }

  const teller = svar
    ? (["ok", "advarsel", "feil"] as const).map((s) => [s, svar.resultater.filter((r) => r.status === s).length] as const)
    : [];
  // Det som må fikses først (feil før advarsler), og det som er i orden til slutt.
  const problemer = (svar?.resultater ?? [])
    .filter((r) => r.status !== "ok")
    .sort((a, b) => (a.status === b.status ? 0 : a.status === "feil" ? -1 : 1));
  const iOrden = (svar?.resultater ?? []).filter((r) => r.status === "ok");

  const rad = (r: Sjekkresultat) => (
    <li key={r.tittel} className={`ns-sjekk ns-sjekk--${r.status}`}>
      <span className="ns-ikon" aria-hidden="true">
        {IKON[r.status]}
      </span>
      <div>
        <p className="ns-tittel">
          <span className="sr-only">
            {r.status === "ok" ? "OK: " : r.status === "feil" ? "Må fikses: " : "Bør sjekkes: "}
          </span>
          {r.tittel}
          <span className="ns-gruppenavn"> · {r.gruppe}</span>
        </p>
        {r.detaljer.length > 0 && (
          <ul className="ns-detaljer">
            {r.detaljer.slice(0, 8).map((d) => (
              <li key={d}>{d}</li>
            ))}
            {r.detaljer.length > 8 && <li>… og {r.detaljer.length - 8} til</li>}
          </ul>
        )}
        {r.status !== "ok" && (
          <Link href={r.leksjon.href} className="ns-leksjon" target="_blank">
            Les mer: {r.leksjon.tittel} ↗
          </Link>
        )}
      </div>
    </li>
  );

  return (
    <div className="nettstedsjekker">
      <p className="quiz__etikett">🔍 Sjekk nettstedet ditt</p>

      <div
        className={`ns-slipp ${over ? "ns-slipp--over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={slipp}
      >
        <p>
          <strong>Dra webkurs-mappen hit</strong>, eller
        </p>
        <button className="kt-knapp kt-knapp--neste" onClick={() => input.current?.click()} disabled={jobber}>
          {jobber ? "Sjekker …" : svar ? "Velg mappen på nytt" : "Velg mappen"}
        </button>
        <input
          ref={input}
          type="file"
          multiple
          hidden
          onChange={(e) => valgt(e.target.files)}
        />
        <p className="ns-personvern">Filene dine lastes ikke opp. Alt sjekkes her i nettleseren din.</p>
      </div>

      {feil && (
        <p className="ns-feilmelding" role="alert">
          {feil}
        </p>
      )}

      {svar && (
        <div className="ns-resultat" aria-live="polite">
          <p className="ns-oversikt">
            <code>{svar.rot}</code> · {svar.oversikt.sider} sider · {svar.oversikt.bilder} bilder ·{" "}
            {kb(svar.oversikt.byte)} totalt
          </p>
          <p className="ns-teller">
            {teller.map(([s, n]) => (
              <span key={s} className={`ns-merke ns-merke--${s}`}>
                {IKON[s]} {n}
              </span>
            ))}
            <span className="ns-teller__tekst">
              {teller[2][1] === 0 && teller[1][1] === 0
                ? "Alt ser bra ut! Klikk deg likevel gjennom nettstedet selv."
                : teller[2][1] === 0
                  ? "Kravene er oppfylt – men se på det som er merket med !"
                  : "Noe må fikses. Lagre endringene, og velg mappen på nytt."}
            </span>
          </p>

          {problemer.length > 0 && (
            <section className="ns-gruppe">
              <h3>Dette må du se på</h3>
              <ul>{problemer.map(rad)}</ul>
            </section>
          )}
          {iOrden.length > 0 && (
            <details className="ns-gruppe ns-iorden" open={problemer.length === 0}>
              <summary>Dette er i orden ({iOrden.length})</summary>
              <ul>{iOrden.map(rad)}</ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

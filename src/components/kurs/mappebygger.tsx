"use client";

import { useState } from "react";

type Plass = "løs" | "webkurs" | "bilder";

const FILER: { navn: string; mål: Exclude<Plass, "løs"> }[] = [
  { navn: "index.html", mål: "webkurs" },
  { navn: "style.css", mål: "webkurs" },
  { navn: "om-meg.html", mål: "webkurs" },
  { navn: "katt.jpg", mål: "bilder" },
  { navn: "logo.png", mål: "bilder" },
];

const ikon = (navn: string) =>
  navn.endsWith(".html") ? "html" : navn.endsWith(".css") ? "css" : "bilde";

/** Klikk en fil, og klikk så mappen den skal ligge i. */
export function Mappebygger() {
  const [plass, setPlass] = useState<Record<string, Plass>>(
    Object.fromEntries(FILER.map((f) => [f.navn, "løs"])),
  );
  const [valgt, setValgt] = useState<string | null>(null);

  const flytt = (til: Plass) => {
    if (!valgt) return;
    setPlass({ ...plass, [valgt]: til });
    setValgt(null);
  };

  const i = (p: Plass) => FILER.filter((f) => plass[f.navn] === p);
  const ferdig = FILER.every((f) => plass[f.navn] === f.mål);
  const feilplassert = FILER.filter((f) => plass[f.navn] !== "løs" && plass[f.navn] !== f.mål);

  const fil = (navn: string) => (
    <button
      key={navn}
      className={`mb-fil ${valgt === navn ? "valgt" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setValgt(valgt === navn ? null : navn);
      }}
    >
      <span className={`fil-ikon fil-ikon--${ikon(navn)}`} /> {navn}
    </button>
  );

  return (
    <div className="mappebygger">
      <p className="quiz__etikett">📁 Rydd prosjektmappen</p>
      <p className="mb-instruks">
        {valgt
          ? `Klikk på mappen der ${valgt} skal ligge.`
          : "Klikk på en fil, og deretter på mappen den hører hjemme i."}
      </p>
      <div className="mb-flate">
        <div className="mb-lose" onClick={() => flytt("løs")}>
          <p className="mb-tittel">Skrivebordet (rot!)</p>
          {i("løs").map((f) => fil(f.navn))}
          {i("løs").length === 0 && <p className="mb-tom">Tomt – fint!</p>}
        </div>
        <div className={`mb-mappe ${valgt ? "mål" : ""}`} onClick={() => flytt("webkurs")}>
          <p className="mb-tittel">📁 webkurs/</p>
          {i("webkurs").map((f) => fil(f.navn))}
          <div className={`mb-mappe mb-undermappe ${valgt ? "mål" : ""}`} onClick={(e) => { e.stopPropagation(); flytt("bilder"); }}>
            <p className="mb-tittel">📁 bilder/</p>
            {i("bilder").map((f) => fil(f.navn))}
          </div>
        </div>
      </div>
      <div role="status">
        {ferdig ? (
          <p className="oppgave__bra">
            Perfekt! HTML og CSS ligger i <code>webkurs/</code>, bildene i <code>webkurs/bilder/</code>.
          </p>
        ) : feilplassert.length > 0 ? (
          <p className="mb-feil">
            Noe ligger feil: {feilplassert.map((f) => f.navn).join(", ")}. Bilder får sin egen mappe, resten
            ligger rett i <code>webkurs/</code>.
          </p>
        ) : null}
      </div>
    </div>
  );
}

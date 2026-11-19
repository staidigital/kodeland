"use client";

import Link from "next/link";
import { useEffect } from "react";
import { fullforLeksjon, startLeksjon, useFremdrift } from "./fremdrift";

/** Markerer leksjonen som påbegynt, og viser «fullført»-knapp og neste-lenke nederst. */
export function LeksjonBunn({
  id,
  neste,
}: {
  id: string;
  neste?: { href: string; tittel: string };
}) {
  const f = useFremdrift();
  const ferdig = f.leksjoner[id]?.status === "completed";

  useEffect(() => startLeksjon(id), [id]);

  return (
    <div className={`leksjon-bunn ${ferdig ? "ferdig" : ""}`}>
      {ferdig ? (
        <p className="leksjon-bunn__tekst">
          ✓ Leksjonen er fullført.{" "}
          <button className="lenkeknapp" onClick={() => fullforLeksjon(id, false)}>
            Angre
          </button>
        </p>
      ) : (
        <button className="knapp" onClick={() => fullforLeksjon(id)}>
          Jeg er ferdig med leksjonen
        </button>
      )}
      {neste && (
        <Link href={neste.href} className={`knapp ${ferdig ? "" : "knapp--sekundar"}`}>
          Neste: {neste.tittel} →
        </Link>
      )}
    </div>
  );
}

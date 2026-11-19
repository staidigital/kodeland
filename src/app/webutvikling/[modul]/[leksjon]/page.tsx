import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LeksjonHake } from "@/components/kurs/fremdrift-visning";
import { LeksjonBunn } from "@/components/kurs/leksjon-status";
import { delNavn, finnModul, leksjonsId, MODULER, nesteDel } from "@/content/webutvikling/kurs";
import { LEKSJONER } from "@/content/webutvikling/leksjoner";

type Props = PageProps<"/webutvikling/[modul]/[leksjon]">;

export function generateStaticParams() {
  return MODULER.flatMap((m) => m.leksjoner.map((l) => ({ modul: m.slug, leksjon: l.slug })));
}

async function hent(params: Props["params"]) {
  const { modul, leksjon } = await params;
  const m = finnModul(modul);
  const indeks = m?.leksjoner.findIndex((l) => l.slug === leksjon) ?? -1;
  if (!m || indeks < 0) return null;
  return { m, indeks, l: m.leksjoner[indeks] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await hent(params);
  return { title: r ? r.l.tittel : "Fant ikke leksjonen" };
}

export default function LeksjonSide({ params }: Props) {
  return (
    <Suspense fallback={<div className="leksjon-ramme" aria-busy="true" />}>
      <Leksjon params={params} />
    </Suspense>
  );
}

async function Leksjon({ params }: { params: Props["params"] }) {
  const r = await hent(params);
  if (!r) notFound();
  const { m, indeks, l } = r;
  const id = leksjonsId(m.slug, l.slug);
  const Innhold = LEKSJONER[id];
  if (!Innhold) notFound();

  const nesteL = m.leksjoner[indeks + 1];
  const nesteM = nesteDel(m);
  const neste = nesteL
    ? { href: `/webutvikling/${m.slug}/${nesteL.slug}`, tittel: nesteL.tittel }
    : nesteM
      ? { href: `/webutvikling/${nesteM.slug}`, tittel: delNavn(nesteM) }
      : undefined;

  return (
    <div className="leksjon-ramme">
      <nav className="leksjon-meny" aria-label={`Leksjoner i ${delNavn(m).toLowerCase()}`}>
        <Link href={`/webutvikling/${m.slug}`} className="leksjon-meny__modul">
          <span>{delNavn(m)}</span>
          {m.tittel}
        </Link>
        <ol>
          {m.leksjoner.map((x, i) => (
            <li key={x.slug}>
              <Link
                href={`/webutvikling/${m.slug}/${x.slug}`}
                aria-current={i === indeks ? "page" : undefined}
              >
                <LeksjonHake id={leksjonsId(m.slug, x.slug)} />
                {x.tittel}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <main className="leksjon">
        <p className="leksjon__over">
          {delNavn(m)} · Leksjon {indeks + 1} av {m.leksjoner.length} · ca. {l.minutter} min
        </p>
        <h1 className="leksjon__tittel">{l.tittel}</h1>
        <article className="leksjon-tekst">
          <Innhold />
        </article>
        <LeksjonBunn id={id} neste={neste} />
      </main>
    </div>
  );
}

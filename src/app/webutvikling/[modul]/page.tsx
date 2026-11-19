import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FremdriftTeller, LeksjonHake } from "@/components/kurs/fremdrift-visning";
import { finnModul, leksjonsId, MODULER } from "@/content/webutvikling/kurs";

export function generateStaticParams() {
  return MODULER.filter((m) => m.leksjoner.length > 0).map((m) => ({ modul: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/webutvikling/[modul]">): Promise<Metadata> {
  const m = finnModul((await params).modul);
  return { title: m ? `Modul ${m.nr}: ${m.tittel}` : "Fant ikke modulen" };
}

type Props = PageProps<"/webutvikling/[modul]">;

export default function ModulSide({ params }: Props) {
  return (
    <Suspense fallback={<main className="kurs-side kurs-side--smal" aria-busy="true" />}>
      <Modul params={params} />
    </Suspense>
  );
}

async function Modul({ params }: { params: Props["params"] }) {
  const m = finnModul((await params).modul);
  if (!m || m.leksjoner.length === 0) notFound();
  const ider = m.leksjoner.map((l) => leksjonsId(m.slug, l.slug));

  return (
    <main className="kurs-side kurs-side--smal">
      <Link href="/webutvikling" className="tilbake">← Alle moduler</Link>
      <p className="kurs-helt__over">Modul {m.nr}</p>
      <h1 className="modulside__tittel">{m.tittel}</h1>
      <p className="kurs-helt__ingress">{m.ingress}</p>
      <FremdriftTeller ider={ider} />

      <div className="modulside__laerer">
        {m.html.length > 0 && (
          <div>
            <h2>HTML</h2>
            <p>{m.html.map((s) => <code key={s} className="chip chip--html">{s}</code>)}</p>
          </div>
        )}
        {m.css.length > 0 && (
          <div>
            <h2>CSS</h2>
            <p>{m.css.map((s) => <code key={s} className="chip chip--css">{s}</code>)}</p>
          </div>
        )}
        {m.teori.length > 0 && (
          <div>
            <h2>Under panseret</h2>
            <p>{m.teori.map((s) => <span key={s} className="chip chip--teori">{s}</span>)}</p>
          </div>
        )}
      </div>

      <ol className="leksjonsliste">
        {m.leksjoner.map((l, i) => (
          <li key={l.slug}>
            <Link href={`/webutvikling/${m.slug}/${l.slug}`}>
              <LeksjonHake id={ider[i]} />
              <span className="leksjonsliste__nr">{m.nr}.{i + 1}</span>
              <span className="leksjonsliste__tittel">{l.tittel}</span>
              <span className="leksjonsliste__tid">ca. {l.minutter} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}

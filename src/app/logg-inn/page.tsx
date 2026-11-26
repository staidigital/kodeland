import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { KodelandLogo } from "@/components/kodeland-logo";
import "../webutvikling/kurs.css";
import "../admin/admin.css";
import { LoggInnSkjema } from "./skjema";

export const metadata: Metadata = { title: "Logg inn – Kodeland" };

export default function LoggInnSide({ searchParams }: PageProps<"/logg-inn">) {
  return (
    <div className="kurs">
      <main className="innlogging">
        <p className="innlogging__topp">
          <KodelandLogo />
          <span className="kurs-topp__skille" aria-hidden="true">/</span>
          <Link href="/webutvikling" className="kurs-topp__logo">
            <span className="kurs-topp__klamme">&lt;/&gt;</span> Webutvikling
          </Link>
        </p>
        <h1>Logg inn</h1>
        <p className="innlogging__ingress">
          Brukernavn og passord får du av læreren din. Du kan også bruke kurset uten å logge inn –
          da lagres fremdriften bare på denne maskinen.
        </p>
        <Suspense fallback={<div className="skjema" aria-busy="true" />}>
          <Skjema searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}

async function Skjema({ searchParams }: { searchParams: PageProps<"/logg-inn">["searchParams"] }) {
  const neste = (await searchParams).neste;
  return <LoggInnSkjema neste={typeof neste === "string" ? neste : undefined} />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { KodelandLogo } from "@/components/kodeland-logo";
import { BrukerMeny } from "@/components/kurs/bruker-meny";
import "../webutvikling/kurs.css";
import "./admin.css";

// Lærerpanelet er bak innlogging og skal alltid hentes fersk fra serveren.
export const instant = false;

export const metadata: Metadata = {
  title: { default: "Lærerpanel – Kodeland", template: "%s – Lærerpanel – Kodeland" },
  robots: { index: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="kurs">
      <header className="kurs-topp">
        <KodelandLogo />
        <span className="kurs-topp__skille" aria-hidden="true">/</span>
        <Link href="/admin" className="kurs-topp__logo">
          <span className="kurs-topp__klamme">&lt;/&gt;</span> Lærerpanel
        </Link>
        <Link href="/webutvikling" className="kurs-topp__undertittel">
          Til kurset →
        </Link>
        <span className="kurs-topp__hoyre">
          <Suspense fallback={null}>
            <BrukerMeny />
          </Suspense>
        </span>
      </header>
      <main className="admin">
        <Suspense fallback={<p className="admin__laster">Laster …</p>}>{children}</Suspense>
      </main>
    </div>
  );
}

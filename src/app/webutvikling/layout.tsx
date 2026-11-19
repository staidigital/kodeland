import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BrukerMeny } from "@/components/kurs/bruker-meny";
import "./kurs.css";
import "../admin/admin.css";

export const metadata: Metadata = {
  title: { default: "Webutvikling – Kodeland", template: "%s – Webutvikling – Kodeland" },
  description: "Grunnkurs i HTML og CSS med interaktive oppgaver.",
};

export default function KursLayout({ children }: LayoutProps<"/webutvikling">) {
  return (
    <div className="kurs">
      <header className="kurs-topp">
        <Link href="/webutvikling" className="kurs-topp__logo">
          <span className="kurs-topp__klamme">&lt;/&gt;</span> Webutvikling
        </Link>
        <span className="kurs-topp__undertittel">HTML og CSS</span>
        <span className="kurs-topp__hoyre">
          <Suspense fallback={null}>
            <BrukerMeny />
          </Suspense>
        </span>
      </header>
      {children}
    </div>
  );
}

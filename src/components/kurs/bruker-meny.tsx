import Link from "next/link";
import { hentBruker } from "@/lib/auth";
import { FremdriftSync } from "./fremdrift-sync";
import { LoggUtKnapp } from "./logg-ut-knapp";

/** Viser innlogget bruker eller «Logg inn». Leser cookies – legg den bak <Suspense>. */
export async function BrukerMeny() {
  const bruker = await hentBruker();
  if (!bruker) {
    return (
      <Link href="/logg-inn" className="bruker-meny__lenke">
        Logg inn
      </Link>
    );
  }
  return (
    <span className="bruker-meny">
      <FremdriftSync brukerId={bruker.id} />
      {bruker.rolle === "teacher" && (
        <Link href="/admin" className="bruker-meny__lenke">
          Lærerpanel
        </Link>
      )}
      <span className="bruker-meny__navn" title={bruker.brukernavn}>
        {bruker.navn}
      </span>
      <LoggUtKnapp />
    </span>
  );
}

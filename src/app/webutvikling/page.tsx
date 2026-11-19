import Link from "next/link";
import { FremdriftTeller } from "@/components/kurs/fremdrift-visning";
import { leksjonsId, MODULER } from "@/content/webutvikling/kurs";

export default function KursOversikt() {
  return (
    <main className="kurs-side">
      <section className="kurs-helt">
        <p className="kurs-helt__over">Grunnkurs · Vg1</p>
        <h1 className="kurs-helt__tittel">
          Lag ditt eget nettsted <span className="kurs-helt__kode">med HTML og CSS</span>
        </h1>
        <p className="kurs-helt__ingress">
          Du skriver kode fra første minutt. Hver modul gjør nettstedet ditt litt bedre – og litt
          teori dukker opp underveis, akkurat når du trenger den.
        </p>
        <Link href={`/webutvikling/${MODULER[0].slug}/${MODULER[0].leksjoner[0].slug}`} className="knapp knapp--stor">
          Start med modul 1 →
        </Link>
      </section>

      <ol className="modulkart">
        {MODULER.map((m) => {
          const klar = m.leksjoner.length > 0;
          const ider = m.leksjoner.map((l) => leksjonsId(m.slug, l.slug));
          const innhold = (
            <>
              <span className="modul__nr">{String(m.nr).padStart(2, "0")}</span>
              <span className="modul__tekst">
                <span className="modul__tittel">{m.tittel}</span>
                <span className="modul__ingress">{m.ingress}</span>
                <span className="modul__stikkord">
                  {m.html.slice(0, 3).map((s) => (
                    <code key={s} className="chip chip--html">{s}</code>
                  ))}
                  {m.css.slice(0, 3).map((s) => (
                    <code key={s} className="chip chip--css">{s}</code>
                  ))}
                </span>
              </span>
              <span className="modul__status">
                {klar ? <FremdriftTeller ider={ider} /> : <span className="snart">Kommer snart</span>}
              </span>
            </>
          );
          return (
            <li key={m.slug}>
              {klar ? (
                <Link href={`/webutvikling/${m.slug}`} className="modul">
                  {innhold}
                </Link>
              ) : (
                <div className="modul modul--snart">{innhold}</div>
              )}
              {m.sjekkpunkt && (
                <p className="sjekkpunkt">
                  <span>🏁 Sjekkpunkt</span> {m.sjekkpunkt}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}

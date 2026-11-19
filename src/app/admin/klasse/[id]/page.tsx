import Link from "next/link";
import { notFound } from "next/navigation";
import { kreverLaerer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ALLE_LEKSJONER, ANTALL_OPPGAVER, hentStudenter, tidSiden } from "../../data";
import { KlassensInnlogginger, NyeStudenter, SlettKlasse } from "../../skjemaer";

// Bak innlogging: hentes alltid fersk fra serveren.
export const instant = false;

export default async function KlasseSide({ params }: PageProps<"/admin/klasse/[id]">) {
  const laerer = await kreverLaerer();
  const { id } = await params;
  const supabase = await createClient();
  const { data: klasse } = await supabase
    .from("classes")
    .select("id, name")
    .eq("id", id)
    .eq("teacher_id", laerer.id)
    .maybeSingle();
  if (!klasse) notFound();

  const studenter = await hentStudenter({ klasseId: id });

  return (
    <>
      <Link href="/admin" className="tilbake">← Alle klasser</Link>
      <h1 className="admin__tittel">{klasse.name}</h1>
      <p className="admin__ingress">
        {studenter.length} {studenter.length === 1 ? "student" : "studenter"}
      </p>

      {studenter.length > 0 ? (
        <div className="tabell-rulle">
          <table className="tabell fremdriftstabell">
            <thead>
              <tr>
                <th>Student</th>
                {ALLE_LEKSJONER.map((l) => (
                  <th key={l.id} title={`${l.modul.tittel}: ${l.tittel}`} className="smal">
                    {l.kort}
                  </th>
                ))}
                <th>Oppgaver</th>
                <th>Sist aktiv</th>
              </tr>
            </thead>
            <tbody>
              {studenter.map((e) => {
                const bestatt = Object.values(e.oppgaver).filter((o) => o.passed).length;
                return (
                  <tr key={e.id}>
                    <td>
                      <Link href={`/admin/student/${e.id}`} className="studentlenke">
                        {e.navn}
                      </Link>
                      <span className="dempet"> {e.brukernavn}</span>
                    </td>
                    {ALLE_LEKSJONER.map((l) => {
                      const s = e.leksjoner[l.id]?.status;
                      return (
                        <td key={l.id} className="smal">
                          <span
                            className={`hake hake--${s ?? "ny"}`}
                            title={s === "completed" ? "Fullført" : s === "started" ? "Påbegynt" : "Ikke startet"}
                          >
                            {s === "completed" ? "✓" : ""}
                          </span>
                        </td>
                      );
                    })}
                    <td>
                      {bestatt}/{ANTALL_OPPGAVER}
                    </td>
                    <td className="dempet">{tidSiden(e.sistAktiv)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="admin__tom">Ingen studenter i klassen ennå.</p>
      )}

      {studenter.length > 0 && <KlassensInnlogginger klasseId={id} />}

      <NyeStudenter klasseId={id} />

      {studenter.length === 0 && <SlettKlasse klasseId={id} navn={klasse.name} />}
    </>
  );
}

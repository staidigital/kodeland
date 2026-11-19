import Link from "next/link";
import { notFound } from "next/navigation";
import { OPPGAVER } from "@/content/webutvikling/oppgaver";
import { kreverLaerer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ALLE_LEKSJONER, hentStudenter, tidSiden } from "../../data";
import { StudentHandlinger } from "../../skjemaer";

// Bak innlogging: hentes alltid fersk fra serveren.
export const instant = false;

export default async function StudentSide({ params }: PageProps<"/admin/student/[id]">) {
  await kreverLaerer();
  const { id } = await params;
  const [student] = await hentStudenter({ studentId: id });
  if (!student) notFound();

  const supabase = await createClient();
  const { data: profil } = await supabase.from("profiles").select("class_id, classes(name)").eq("id", id).single();
  const klasse = profil?.classes as unknown as { name: string } | null;

  return (
    <>
      {profil?.class_id && (
        <Link href={`/admin/klasse/${profil.class_id}`} className="tilbake">
          ← {klasse?.name ?? "Klassen"}
        </Link>
      )}
      <h1 className="admin__tittel">{student.navn}</h1>
      <p className="admin__ingress">
        Brukernavn <code>{student.brukernavn}</code> · sist aktiv {tidSiden(student.sistAktiv)}
      </p>

      <StudentHandlinger studentId={student.id} navn={student.navn} />

      <h2 className="admin__h2">Leksjoner</h2>
      <ul className="admin-liste">
        {ALLE_LEKSJONER.map((l) => {
          const s = student.leksjoner[l.id];
          return (
            <li key={l.id}>
              <span className={`hake hake--${s?.status ?? "ny"}`}>{s?.status === "completed" ? "✓" : ""}</span>
              <span className="dempet">{l.kort}</span> {l.tittel}
              <span className="admin-liste__hoyre dempet">
                {s?.status === "completed"
                  ? `fullført ${tidSiden(s.completed_at)}`
                  : s
                    ? "påbegynt"
                    : "–"}
              </span>
            </li>
          );
        })}
      </ul>

      <h2 className="admin__h2">Oppgaver</h2>
      <div className="admin-oppgaver">
        {Object.keys(OPPGAVER).map((oid) => {
          const o = student.oppgaver[oid];
          return (
            <details key={oid} className="utvid">
              <summary>
                <span className={`hake hake--${o?.passed ? "completed" : o ? "started" : "ny"}`}>
                  {o?.passed ? "✓" : ""}
                </span>{" "}
                <code>{oid}</code>
                <span className="admin-liste__hoyre dempet">
                  {o ? `${o.passed ? "bestått" : "ikke bestått"} · ${tidSiden(o.updated_at)}` : "ikke startet"}
                </span>
              </summary>
              {o ? (
                <>
                  <p className="dempet">index.html</p>
                  <pre className="quiz__kode"><code>{o.html ?? ""}</code></pre>
                  {o.css !== null && (
                    <>
                      <p className="dempet">style.css</p>
                      <pre className="quiz__kode"><code>{o.css}</code></pre>
                    </>
                  )}
                </>
              ) : (
                <p className="dempet">Studenten har ikke åpnet denne oppgaven.</p>
              )}
            </details>
          );
        })}
      </div>
    </>
  );
}

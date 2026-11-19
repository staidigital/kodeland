import Link from "next/link";
import { kreverLaerer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { NyKlasse } from "./skjemaer";

// Bak innlogging: hentes alltid fersk fra serveren.
export const instant = false;

export default async function AdminForside() {
  const laerer = await kreverLaerer();
  const supabase = await createClient();
  const { data: klasser } = await supabase
    .from("classes")
    .select("id, name, created_at, profiles(count)")
    .eq("teacher_id", laerer.id)
    .order("created_at");

  return (
    <>
      <h1 className="admin__tittel">Hei, {laerer.navn}!</h1>
      <p className="admin__ingress">Her lager du klasser og studentbrukere, og følger med på fremdriften.</p>

      <h2 className="admin__h2">Klassene dine</h2>
      {klasser?.length ? (
        <ul className="klasseliste">
          {klasser.map((k) => {
            const antall = (k.profiles as unknown as { count: number }[])[0]?.count ?? 0;
            return (
              <li key={k.id}>
                <Link href={`/admin/klasse/${k.id}`}>
                  <span className="klasseliste__navn">{k.name}</span>
                  <span className="klasseliste__antall">
                    {antall} {antall === 1 ? "student" : "studenter"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="admin__tom">Du har ingen klasser ennå. Lag den første under.</p>
      )}

      <NyKlasse />
    </>
  );
}

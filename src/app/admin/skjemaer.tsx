"use client";

import { useActionState, useState, useTransition } from "react";
import {
  type Innlogging,
  type LagStudenterTilstand,
  lagStudenter,
  lagKlasse,
  nullstillPassord,
  type Skjematilstand,
  slettStudent,
  slettKlasse,
  visKlassensPassord,
  visPassord,
} from "./actions";

export function NyKlasse() {
  const [t, handling, venter] = useActionState<Skjematilstand, FormData>(lagKlasse, {});
  return (
    <form action={handling} className="admin-kort skjema skjema--rad">
      <label>
        Ny klasse
        <input name="navn" placeholder="F.eks. 1IMA – Webutvikling høst 2026" required />
      </label>
      <button className="knapp" disabled={venter}>
        {venter ? "Lager …" : "Lag klasse"}
      </button>
      {t.feil && <p className="skjema__feil">{t.feil}</p>}
    </form>
  );
}

export function NyeStudenter({ klasseId }: { klasseId: string }) {
  const [t, handling, venter] = useActionState<LagStudenterTilstand, FormData>(
    lagStudenter.bind(null, klasseId),
    {},
  );
  return (
    <div className="admin-kort">
      <h2 className="admin__h2">Legg til studenter</h2>
      <form action={handling} className="skjema">
        <label>
          Fornavn eller initialer, én student per linje
          <textarea name="navn" rows={6} placeholder={"Kari\nOla H.\nMN"} required />
        </label>
        <p className="skjema__hjelp">
          Du trenger ikke fullt navn – bruk gjerne bare fornavn, fornavn og forbokstav, eller
          initialer. Det holder at du kjenner igjen studenten. Jo mindre personinfo vi lagrer, jo bedre.
        </p>
        <p className="skjema__hjelp">
          Brukernavn og passord lages automatisk. Du kan alltid hente dem frem igjen med «Vis
          innlogginger».
        </p>
        <button className="knapp" disabled={venter}>
          {venter ? "Lager brukere …" : "Lag brukere"}
        </button>
        {t.feil && <p className="skjema__feil">{t.feil}</p>}
      </form>
      {t.nye && t.nye.length > 0 && <Innlogginger studenter={t.nye} tittel="Nye innlogginger" />}
      {t.mislyktes && t.mislyktes.length > 0 && (
        <p className="skjema__feil">Kunne ikke lage: {t.mislyktes.join(", ")}</p>
      )}
    </div>
  );
}

const IKKE_LAGRET = "ikke lagret – lag nytt passord";

function Innlogginger({ studenter, tittel }: { studenter: Innlogging[]; tittel: string }) {
  const tekst = studenter
    .map((e) => `${e.navn}\t${e.brukernavn}\t${e.passord ?? IKKE_LAGRET}`)
    .join("\n");
  return (
    <div className="innlogginger" id="utskrift">
      <p className="innlogginger__varsel">🔑 {tittel}</p>
      <table className="tabell">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Brukernavn</th>
            <th>Passord</th>
          </tr>
        </thead>
        <tbody>
          {studenter.map((e) => (
            <tr key={e.brukernavn}>
              <td>{e.navn}</td>
              <td><code>{e.brukernavn}</code></td>
              <td>{e.passord ? <code>{e.passord}</code> : <span className="dempet">{IKKE_LAGRET}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="innlogginger__knapper">
        <button className="knapp knapp--sekundar" onClick={() => navigator.clipboard.writeText(tekst)}>
          Kopier
        </button>
        <button className="knapp knapp--sekundar" onClick={() => window.print()}>
          Skriv ut
        </button>
      </div>
    </div>
  );
}

/** Viser brukernavn og passord for hele klassen, for utskrift eller når noen har glemt. */
export function KlassensInnlogginger({ klasseId }: { klasseId: string }) {
  const [liste, setListe] = useState<Innlogging[] | null>(null);
  const [venter, start] = useTransition();
  return (
    <div className="admin-kort">
      <div className="innlogginger__topp">
        <h2 className="admin__h2">Innlogginger</h2>
        <button
          className="knapp knapp--sekundar"
          disabled={venter}
          onClick={() =>
            liste ? setListe(null) : start(async () => setListe(await visKlassensPassord(klasseId)))
          }
        >
          {venter ? "Henter …" : liste ? "Skjul" : "Vis innlogginger"}
        </button>
      </div>
      {liste && <Innlogginger studenter={liste} tittel="Brukernavn og passord for klassen" />}
    </div>
  );
}

export function StudentHandlinger({ studentId, navn }: { studentId: string; navn: string }) {
  const [passord, setPassord] = useState<string | null>(null);
  const [visning, setVisning] = useState<string | null>(null);
  const [feil, setFeil] = useState<string | null>(null);
  const [venter, start] = useTransition();

  return (
    <div className="student-handlinger">
      <button
        className="knapp knapp--sekundar"
        disabled={venter}
        onClick={() => {
          if (visning) return setVisning(null);
          start(async () => {
            const r = await visPassord(studentId);
            setPassord(null);
            setVisning(r?.passord ?? IKKE_LAGRET);
          });
        }}
      >
        {visning ? "Skjul passord" : "Vis passord"}
      </button>
      <button
        className="knapp knapp--sekundar"
        disabled={venter}
        onClick={() => {
          if (!confirm(`Lage nytt passord for ${navn}? Det gamle slutter å virke.`)) return;
          start(async () => {
            const r = await nullstillPassord(studentId);
            setVisning(null);
            setPassord(r.passord ?? null);
            setFeil(r.feil ?? null);
          });
        }}
      >
        Nytt passord
      </button>
      <button
        className="knapp knapp--fare"
        disabled={venter}
        onClick={() => {
          if (!confirm(`Slette ${navn}? All fremdrift slettes, og det kan ikke angres.`)) return;
          start(() => slettStudent(studentId));
        }}
      >
        Slett student
      </button>
      {visning && (
        <p className="student-handlinger__passord" role="status">
          Passord: {visning === IKKE_LAGRET ? <span>{IKKE_LAGRET}</span> : <code>{visning}</code>}
        </p>
      )}
      {passord && (
        <p className="student-handlinger__passord" role="status">
          Nytt passord: <code>{passord}</code>
        </p>
      )}
      {feil && <p className="skjema__feil">{feil}</p>}
    </div>
  );
}

export function SlettKlasse({ klasseId, navn }: { klasseId: string; navn: string }) {
  const [venter, start] = useTransition();
  const [feil, setFeil] = useState<string | null>(null);
  return (
    <>
      <button
        className="lenkeknapp admin__slett"
        disabled={venter}
        onClick={() => {
          if (!confirm(`Slette klassen «${navn}»?`)) return;
          start(async () => {
            try {
              await slettKlasse(klasseId);
            } catch (e) {
              setFeil(e instanceof Error ? e.message : "Noe gikk galt.");
            }
          });
        }}
      >
        Slett klassen
      </button>
      {feil && <span className="skjema__feil"> {feil}</span>}
    </>
  );
}

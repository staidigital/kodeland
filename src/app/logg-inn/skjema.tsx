"use client";

import { useActionState } from "react";
import { loggInn, type LoggInnTilstand } from "./actions";

export function LoggInnSkjema({ neste }: { neste?: string }) {
  const [tilstand, handling, venter] = useActionState<LoggInnTilstand, FormData>(loggInn, {});

  return (
    <form action={handling} className="skjema">
      <input type="hidden" name="neste" value={neste ?? ""} />
      <label>
        Brukernavn
        <input
          name="brukernavn"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          defaultValue={tilstand.brukernavn}
          required
          autoFocus
        />
      </label>
      <label>
        Passord
        <input name="passord" type="password" autoComplete="current-password" required />
      </label>
      {tilstand.feil && (
        <p className="skjema__feil" role="alert">
          {tilstand.feil}
        </p>
      )}
      <button className="knapp knapp--stor" disabled={venter}>
        {venter ? "Logger inn …" : "Logg inn"}
      </button>
    </form>
  );
}

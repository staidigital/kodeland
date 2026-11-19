"use client";

import { loggUt } from "@/app/logg-inn/actions";
import { glemFremdrift } from "./fremdrift";

export function LoggUtKnapp() {
  return (
    <form action={loggUt} onSubmit={() => glemFremdrift()}>
      <button className="bruker-meny__lenke lenkeknapp">Logg ut</button>
    </form>
  );
}

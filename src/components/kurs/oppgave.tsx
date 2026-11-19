"use client";

import dynamic from "next/dynamic";

const OppgaveEditor = dynamic(() => import("./oppgave-editor"), {
  ssr: false,
  loading: () => <div className="oppgave oppgave--laster" aria-busy="true" />,
});

/** Kodeoppgave med editor, forhåndsvisning og automatiske sjekker. Se content/webutvikling/oppgaver.ts. */
export function Oppgave({ id }: { id: string }) {
  return <OppgaveEditor id={id} />;
}

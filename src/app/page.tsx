import Link from "next/link";
import { ScrambleText } from "./scramble-text";
import { WipTerminal } from "./wip-terminal";

const FLOATERS = ["{ }", "</>", "=>", "( )", ";", "[ ]", "if", "def", "#", "&&", "==", "fn"];

export default function Home() {
  return (
    <main className="wip">
      <div className="wip-grid" aria-hidden="true" />
      <div className="wip-glow" aria-hidden="true" />
      <div className="wip-floaters" aria-hidden="true">
        {FLOATERS.map((g, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 83) % 100}%`,
              animationDelay: `${-i * 2.3}s`,
              animationDuration: `${18 + ((i * 7) % 12)}s`,
              fontSize: `${14 + ((i * 5) % 14)}px`,
            }}
          >
            {g}
          </span>
        ))}
      </div>

      <section className="wip-content">
        <p className="wip-badge">
          <span className="wip-badge__dot" /> work in progress
        </p>
        <h1 className="wip-title">
          <ScrambleText text="Kodeland bygges om" />
          <span className="wip-title__cursor" aria-hidden="true">_</span>
        </h1>
        <p className="wip-lead">
          Vi skriver nettsiden på nytt fra bunnen av. Nytt innhold er på vei.
        </p>

        <WipTerminal />

        <p className="wip-foot">
          Kan ikke vente?{" "}
          <Link href="/text-adventure">Prøv tekstspillet →</Link>
        </p>
      </section>
    </main>
  );
}

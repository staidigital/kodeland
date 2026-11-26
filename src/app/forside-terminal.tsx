"use client";

import { useEffect, useState } from "react";

type Step = {
  cmd?: boolean;
  text: string;
  status?: string;
  tone?: "ok" | "warn" | "info";
};

/** Veien gjennom webutviklingskurset, fra første linje til publisert nettsted. */
const SCRIPT: Step[] = [
  { cmd: true, text: "kodeland start webutvikling" },
  { text: "skriver din første nettside", status: "ok", tone: "ok" },
  { text: "gir den farge med css", status: "ok", tone: "ok" },
  { text: "legger til bilder og lenker", status: "ok", tone: "ok" },
  { text: "validerer html", status: "fant 1 feil", tone: "warn" },
  { text: "retter feilen", status: "ok", tone: "ok" },
  { text: "lager oppsett med grid", status: "ok", tone: "ok" },
  { text: "gjør den klar for mobil", status: "ok", tone: "ok" },
];

const BAR_WIDTH = 20;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Line = Step & { typed: string; showStatus: boolean };

export function ForsideTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      if (reduced) {
        setLines(SCRIPT.map((s) => ({ ...s, typed: s.text, showStatus: true })));
        setProgress(1);
        return;
      }
      while (!cancelled) {
        setLines([]);
        setProgress(null);
        await sleep(600);

        for (const step of SCRIPT) {
          if (cancelled) return;
          setLines((prev) => [...prev, { ...step, typed: "", showStatus: false }]);
          for (let i = 1; i <= step.text.length; i++) {
            if (cancelled) return;
            await sleep(step.cmd ? 55 : 22 + Math.random() * 25);
            setLines((prev) => {
              const next = [...prev];
              next[next.length - 1] = { ...next[next.length - 1], typed: step.text.slice(0, i) };
              return next;
            });
          }
          await sleep(step.cmd ? 500 : 250 + Math.random() * 500);
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], showStatus: true };
            return next;
          });
          await sleep(150);
        }

        // Publiseringen går helt i mål.
        let p = 0;
        setProgress(0);
        while (!cancelled && p < 1) {
          p = Math.min(1, p + 0.03 + Math.random() * 0.07);
          setProgress(p);
          await sleep(100 + Math.random() * 200);
        }
        await sleep(6000);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const filled = progress === null ? 0 : Math.round(progress * BAR_WIDTH);
  const typing = lines.length > 0 && !lines[lines.length - 1].showStatus;
  const ferdig = progress === 1;

  return (
    <div className="forside-terminal" aria-hidden="true">
      <div className="forside-terminal__bar">
        <span className="dot dot--r" />
        <span className="dot dot--y" />
        <span className="dot dot--g" />
        <span className="forside-terminal__title">~/webkurs</span>
      </div>
      <div className="forside-terminal__body">
        {lines.map((l, i) => (
          <div key={i} className="forside-line">
            {l.cmd ? (
              <span className="c-prompt">$ </span>
            ) : (
              <span className="c-arrow">→ </span>
            )}
            <span className={l.cmd ? "c-cmd" : "c-text"}>{l.typed}</span>
            {!l.cmd && l.showStatus && (
              <>
                <span className="c-dots" />
                <span className={`c-status c-status--${l.tone}`}>{l.status}</span>
              </>
            )}
            {i === lines.length - 1 && typing && <span className="cursor" />}
          </div>
        ))}
        {progress !== null && (
          <div className="forside-line">
            <span className="c-arrow">→ </span>
            <span className="c-text">publiserer </span>
            <span className="c-bar">
              [<span className="c-bar__fill">{"█".repeat(filled)}</span>
              <span className="c-bar__empty">{"░".repeat(BAR_WIDTH - filled)}</span>]
            </span>
            <span className="c-pct"> {Math.round(progress * 100)}%</span>
            {!ferdig && <span className="spinner" />}
          </div>
        )}
        {ferdig && (
          <div className="forside-line">
            <span className="c-ferdig">✓ ute på nettet: </span>
            <span className="c-url">deg.github.io/webkurs</span>
          </div>
        )}
        {lines.length === 0 && (
          <div className="forside-line">
            <span className="c-prompt">$ </span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

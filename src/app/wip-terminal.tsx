"use client";

import { useEffect, useState } from "react";

type Step = {
  cmd?: boolean;
  text: string;
  status?: string;
  tone?: "ok" | "warn" | "info";
};

const SCRIPT: Step[] = [
  { cmd: true, text: "kodeland deploy --ny-versjon" },
  { text: "henter nytt innhold", status: "ok", tone: "ok" },
  { text: "rydder bort gammel kode", status: "ok", tone: "ok" },
  { text: "kompilerer nye oppgaver", status: "ok", tone: "ok" },
  { text: "fikser bugs", status: "fant 3 til", tone: "warn" },
  { text: "fyller på kaffe", status: "ok", tone: "ok" },
];

const BAR_WIDTH = 24;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Line = Step & { typed: string; showStatus: boolean };

export function WipTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    async function run() {
      if (reduced) {
        setLines(SCRIPT.map((s) => ({ ...s, typed: s.text, showStatus: true })));
        setProgress(0.87);
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

        // Fremdriftslinjen kryper mot mål, men blir aldri helt ferdig.
        let p = 0;
        setProgress(0);
        while (!cancelled && p < 0.87) {
          p = Math.min(0.87, p + Math.random() * 0.06);
          setProgress(p);
          await sleep(120 + Math.random() * 260);
        }
        await sleep(4200);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const filled = progress === null ? 0 : Math.round(progress * BAR_WIDTH);
  const typing = lines.length > 0 && !lines[lines.length - 1].showStatus;

  return (
    <div className="wip-terminal" aria-hidden="true">
      <div className="wip-terminal__bar">
        <span className="dot dot--r" />
        <span className="dot dot--y" />
        <span className="dot dot--g" />
        <span className="wip-terminal__title">kodeland — deploy</span>
      </div>
      <div className="wip-terminal__body">
        {lines.map((l, i) => (
          <div key={i} className="wip-line">
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
          <div className="wip-line wip-progress">
            <span className="c-arrow">→ </span>
            <span className="c-text">bygger nettsiden </span>
            <span className="c-bar">
              [<span className="c-bar__fill">{"█".repeat(filled)}</span>
              <span className="c-bar__empty">{"░".repeat(BAR_WIDTH - filled)}</span>]
            </span>
            <span className="c-pct"> {Math.round(progress * 100)}%</span>
            <span className="spinner" />
          </div>
        )}
        {lines.length === 0 && (
          <div className="wip-line">
            <span className="c-prompt">$ </span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

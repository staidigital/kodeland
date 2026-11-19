"use client";

import { useEffect, useState } from "react";

const GLYPHS = "{}[]<>/\\=+*;:_#$%&01";

/** Tekst som «dekrypteres» tegn for tegn, og glitcher litt innimellom. */
export function ScrambleText({ text }: { text: string }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    function reveal(speed: number) {
      frame = 0;
      const tick = () => {
        frame++;
        const done = Math.floor(frame / speed);
        setOut(
          text
            .split("")
            .map((ch, i) => (ch === " " || i < done ? ch : rand()))
            .join(""),
        );
        if (done < text.length) raf = requestAnimationFrame(tick);
        else timer = setTimeout(() => reveal(1.2), 5000 + Math.random() * 4000);
      };
      raf = requestAnimationFrame(tick);
    }

    reveal(3);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

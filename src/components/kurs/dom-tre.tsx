"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const START = `<header>
  <h1>Fjellklubben</h1>
  <nav>
    <ul>
      <li><a href="#">Turer</a></li>
      <li><a href="#">Om oss</a></li>
    </ul>
  </nav>
</header>
<main>
  <h2>Neste tur</h2>
  <p>Vi går til <strong>Fløyen</strong> på lørdag.</p>
</main>
<footer>
  <p>Fjellklubben 2026</p>
</footer>`;

type Node = { sti: number[]; tag: string; tekst?: string; barn: Node[]; id?: string; klasse?: string };

/** Bygger et tre av elementene (og korte tekstbiter) i body. `sti` er indeksene blant element-barna. */
function byggTre(el: Element, sti: number[] = []): Node {
  const barn: Node[] = [];
  let i = 0;
  for (const n of el.childNodes) {
    if (n.nodeType === 1) {
      barn.push(byggTre(n as Element, [...sti, i]));
      i++;
    } else if (n.nodeType === 3 && n.textContent?.trim()) {
      barn.push({ sti: [], tag: "#tekst", tekst: n.textContent.trim(), barn: [] });
    }
  }
  return {
    sti,
    tag: el.tagName.toLowerCase(),
    barn,
    id: el.id || undefined,
    klasse: el.getAttribute("class") || undefined,
  };
}

function finn(rot: Element, sti: number[]) {
  let el: Element | undefined = rot;
  for (const i of sti) el = el?.children[i];
  return el;
}

/** Skriv HTML til venstre, og se den som et tre. Hold musa over en node for å se elementet. */
export function DomTre() {
  const [html, setHtml] = useState(START);
  const [tre, setTre] = useState<Node | null>(null);
  const [valgt, setValgt] = useState<number[] | null>(null);
  const iframe = useRef<HTMLIFrameElement>(null);

  // Treet bygges i nettleseren (DOMParser), etter at komponenten er vist.
  useEffect(() => {
    const t = setTimeout(() => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      setTre(byggTre(doc.body));
    }, 200);
    return () => clearTimeout(t);
  }, [html]);

  const srcDoc = useMemo(
    () =>
      `<style>body{font-family:system-ui,sans-serif;margin:10px;font-size:14px}h1{font-size:22px;margin:4px 0}h2{font-size:17px;margin:6px 0}[data-valgt]{outline:3px solid #e63946;outline-offset:2px;background:rgb(230 57 70 / .12)}</style>${html}`,
    [html],
  );

  // Marker valgt element i forhåndsvisningen.
  useEffect(() => {
    const doc = iframe.current?.contentDocument;
    if (!doc?.body) return;
    doc.querySelectorAll("[data-valgt]").forEach((e) => e.removeAttribute("data-valgt"));
    if (valgt) finn(doc.body, valgt)?.setAttribute("data-valgt", "");
  }, [valgt, srcDoc]);

  const info = useMemo(() => {
    if (!valgt || !tre) return null;
    let node: Node | undefined = tre;
    const forfedre: string[] = ["body"];
    for (const i of valgt) {
      node = node?.barn.filter((b) => b.tag !== "#tekst")[i];
      if (node) forfedre.push(node.tag);
    }
    if (!node) return null;
    forfedre.pop();
    const forelder = forfedre.at(-1);
    let f: Node | undefined = tre;
    for (const i of valgt.slice(0, -1)) f = f?.barn.filter((b) => b.tag !== "#tekst")[i];
    const søsken = (f?.barn.filter((b) => b.tag !== "#tekst").length ?? 1) - 1;
    const barn = node.barn.filter((b) => b.tag !== "#tekst").length;
    return { tag: node.tag, forelder, søsken, barn, sti: forfedre };
  }, [valgt, tre]);

  const vis = (n: Node, nøkkel: string) => {
    if (n.tag === "#tekst") {
      return (
        <li key={nøkkel} className="dt-tekst">
          «{n.tekst!.length > 28 ? n.tekst!.slice(0, 28) + "…" : n.tekst}»
        </li>
      );
    }
    const erValgt = valgt?.join(".") === n.sti.join(".");
    return (
      <li key={nøkkel}>
        <button
          className={`dt-node ${erValgt ? "dt-node--valgt" : ""}`}
          onMouseEnter={() => setValgt(n.sti)}
          onFocus={() => setValgt(n.sti)}
          onClick={() => setValgt(n.sti)}
        >
          {n.tag}
          {n.id && <span className="dt-id">#{n.id}</span>}
          {n.klasse && <span className="dt-klasse">.{n.klasse.split(/\s+/).join(".")}</span>}
        </button>
        {n.barn.length > 0 && <ul>{n.barn.map((b, i) => vis(b, `${nøkkel}-${i}`))}</ul>}
      </li>
    );
  };

  return (
    <div className="dom-tre">
      <p className="quiz__etikett">🌳 DOM-treet</p>
      <div className="dt-flate">
        <label className="dt-kode">
          <span className="sf-etikett">HTML – endre gjerne</span>
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} spellCheck={false} rows={18} />
        </label>
        <div className="dt-hoyre">
          <div className="dt-tre" onMouseLeave={() => setValgt(null)}>
            <span className="sf-etikett">Treet</span>
            {tre && (
              <ul className="dt-rot">
                <li>
                  <span className="dt-node dt-node--rot">body</span>
                  <ul>{tre.barn.map((b, i) => vis(b, String(i)))}</ul>
                </li>
              </ul>
            )}
          </div>
          <p className="dt-info" aria-live="polite">
            {info ? (
              <>
                <code>{info.sti.join(" › ")}</code> › <strong>{info.tag}</strong>
                <br />
                Forelder: <code>{info.forelder}</code> · {info.barn} barn ·{" "}
                {info.søsken} søsken
              </>
            ) : (
              "Hold musa over en node i treet."
            )}
          </p>
          <iframe ref={iframe} title="Forhåndsvisning av HTML-en" sandbox="allow-same-origin" srcDoc={srcDoc} className="dt-visning" />
        </div>
      </div>
    </div>
  );
}

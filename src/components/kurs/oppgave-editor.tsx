"use client";

import { css as cssLang } from "@codemirror/lang-css";
import { html as htmlLang } from "@codemirror/lang-html";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useMemo, useRef, useState } from "react";
import { OPPGAVER } from "@/content/webutvikling/oppgaver";
import { hentOppgave, lagreOppgave } from "./fremdrift";

type Fane = "html" | "css";

function byggSide(html: string, css: string | undefined, lenket = false) {
  if (css === undefined) return html;
  if (lenket) {
    // Som i en ekte nettleser: stilarket virker bare via <link rel="stylesheet" href="style.css">.
    return html.replace(/<link\b[^>]*>/gi, (tag) =>
      /\brel\s*=\s*["']?stylesheet["'\s>]/i.test(tag) && /\bhref\s*=\s*["']?style\.css["'\s>]/.test(tag)
        ? `<style data-lenke="style.css">\n${css}\n</style>`
        : tag,
    );
  }
  const stil = `<style>\n${css}\n</style>`;
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${stil}\n</head>`);
  return `${stil}\n${html}`;
}

export default function OppgaveEditor({ id }: { id: string }) {
  const def = OPPGAVER[id];
  const lagret = useMemo(() => hentOppgave(id), [id]);
  const [kode, setKode] = useState({
    html: lagret?.html ?? def.html,
    css: def.css === undefined ? undefined : (lagret?.css ?? def.css),
  });
  const [fane, setFane] = useState<Fane>("html");
  const [srcDoc, setSrcDoc] = useState(() => byggSide(kode.html, kode.css, def.lenketCss));
  const [resultat, setResultat] = useState<boolean[]>([]);
  const [visHint, setVisHint] = useState(false);
  const iframe = useRef<HTMLIFrameElement>(null);
  const forrigeBestatt = useRef(lagret?.passed ?? false);

  // Oppdater forhåndsvisningen og lagre koden litt etter at eleven slutter å skrive.
  useEffect(() => {
    const t = setTimeout(() => {
      setSrcDoc(byggSide(kode.html, kode.css, def.lenketCss));
      lagreOppgave(id, { html: kode.html, css: kode.css });
    }, 250);
    return () => clearTimeout(t);
  }, [id, kode, def.lenketCss]);

  function sjekk() {
    const doc = iframe.current?.contentDocument;
    if (!doc || !def.sjekker) return;
    const r = def.sjekker.map((s) => {
      try {
        return s.test(doc);
      } catch {
        return false;
      }
    });
    setResultat(r);
    const bestatt = r.every(Boolean);
    if (bestatt !== forrigeBestatt.current) {
      forrigeBestatt.current = bestatt;
      const forrige = hentOppgave(id);
      lagreOppgave(id, {
        passed: bestatt,
        attempts: (forrige?.attempts ?? 0) + (bestatt ? 1 : 0),
      });
    }
  }

  function nullstill() {
    if (!confirm("Vil du starte på nytt? Koden din blir erstattet med startkoden.")) return;
    setKode({ html: def.html, css: def.css });
  }

  const harCss = kode.css !== undefined;
  const sjekker = def.sjekker ?? [];
  const alleOk = sjekker.length > 0 && resultat.length === sjekker.length && resultat.every(Boolean);

  return (
    <div className={`oppgave ${alleOk ? "oppgave--ok" : ""}`}>
      <div className="oppgave__ruter">
        <div className="oppgave__editor">
          <div className="oppgave__faner" role="tablist">
            <button
              role="tab"
              aria-selected={fane === "html"}
              className="oppgave__fane"
              onClick={() => setFane("html")}
            >
              <span className="fil-ikon fil-ikon--html" /> index.html
            </button>
            {harCss && (
              <button
                role="tab"
                aria-selected={fane === "css"}
                className="oppgave__fane"
                onClick={() => setFane("css")}
              >
                <span className="fil-ikon fil-ikon--css" /> style.css
              </button>
            )}
            <button className="oppgave__nullstill" onClick={nullstill} title="Start på nytt">
              ↺
            </button>
          </div>
          <CodeMirror
            key={fane}
            value={fane === "html" ? kode.html : (kode.css ?? "")}
            onChange={(v) => setKode((k) => (fane === "html" ? { ...k, html: v } : { ...k, css: v }))}
            extensions={[fane === "html" ? htmlLang({ autoCloseTags: false }) : cssLang()]}
            theme={vscodeDark}
            basicSetup={{ foldGutter: false, highlightActiveLine: true, autocompletion: false }}
            minHeight="220px"
            className="oppgave__cm"
          />
        </div>
        <div className="oppgave__visning">
          <div className="oppgave__nettleser">
            <span className="nettleser-prikker">
              <i /> <i /> <i />
            </span>
            <span className="oppgave__adresse">index.html</span>
          </div>
          <iframe
            ref={iframe}
            title="Forhåndsvisning"
            sandbox="allow-same-origin"
            srcDoc={srcDoc}
            onLoad={sjekk}
            className="oppgave__iframe"
          />
        </div>
      </div>

      {sjekker.length > 0 && (
        <div className="oppgave__sjekker">
          <ul>
            {sjekker.map((s, i) => (
              <li key={i} className={resultat[i] ? "ok" : ""}>
                <span className="sjekk-ikon" aria-hidden="true">
                  {resultat[i] ? "✓" : ""}
                </span>
                <span className="sr-only">{resultat[i] ? "Oppfylt: " : "Ikke oppfylt: "}</span>
                {s.tekst}
              </li>
            ))}
          </ul>
          <div className="oppgave__bunn">
            {alleOk ? (
              <p className="oppgave__bra">Bra jobba! Alle kravene er oppfylt.</p>
            ) : def.hint ? (
              visHint ? (
                <p className="oppgave__hint">💡 {def.hint}</p>
              ) : (
                <button className="lenkeknapp" onClick={() => setVisHint(true)}>
                  Står du fast? Vis et hint
                </button>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

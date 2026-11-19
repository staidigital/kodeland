"use client";

import { css as cssLang } from "@codemirror/lang-css";
import { html as htmlLang } from "@codemirror/lang-html";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useMemo, useRef, useState } from "react";
import { KURSBILDER, type Kursbilde } from "@/content/webutvikling/kursbilder";
import { løsSti, OPPGAVER } from "@/content/webutvikling/oppgaver";
import { hentOppgave, lagreOppgave } from "./fremdrift";

const INDEX = "index.html";
const CSS = "style.css";
const FEIL = "404:";

/** Et bilde som ikke finnes: nettleseren viser det som ødelagt, med alt-teksten. */
const BRUTT_BILDE = "data:image/png;base64,AAAA";

/**
 * Peker bildestier til bildene som faktisk ligger i prosjektet. `fra` er fila stien står i
 * (siden for <img>, style.css for url() i CSS). Feil sti gir et ødelagt bilde, som i en ekte nettleser.
 */
function bildeUrl(src: string, fra: string, bilder: readonly Kursbilde[]) {
  if (/^(https?:|data:)/i.test(src.trim())) return src;
  const mål = løsSti(src, fra);
  return mål && (bilder as readonly string[]).includes(mål) ? KURSBILDER[mål as Kursbilde] : BRUTT_BILDE;
}

function erstattBilder(html: string, sti: string, bilder: readonly Kursbilde[]) {
  return html.replace(/<img\b[^>]*>/gi, (tag) =>
    tag.replace(
      /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
      (_, a, b, c) => {
        const src = a ?? b ?? c;
        return `src="${bildeUrl(src, sti, bilder)}" data-sti="${src.replace(/"/g, "&quot;")}"`;
      },
    ),
  );
}

const erstattCssBilder = (css: string, bilder: readonly Kursbilde[]) =>
  css.replace(
    /url\(\s*(["']?)([^"')]*)\1\s*\)/gi,
    (_, __, src: string) => `url("${bildeUrl(src, "style.css", bilder)}")`,
  );

/** Setter sammen siden som vises i forhåndsvisningen. `sti` er filnavnet til siden, for relative stier. */
function byggSide(
  råHtml: string,
  råCss: string | undefined,
  lenket: boolean,
  sti: string,
  bilder: readonly Kursbilde[] = [],
) {
  const html = erstattBilder(råHtml, sti, bilder);
  const css = råCss === undefined ? undefined : erstattCssBilder(råCss, bilder);
  if (css === undefined) return html;
  if (lenket) {
    // Som i en ekte nettleser: stilarket virker bare via <link rel="stylesheet" href="…">
    // med en sti som faktisk peker på style.css fra denne siden.
    return html.replace(/<link\b[^>]*>/gi, (tag) => {
      const rel = /\brel\s*=\s*["']?stylesheet["'\s>/]/i.test(tag);
      const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(tag);
      const mål = href && løsSti(href[1] ?? href[2] ?? href[3], sti);
      return rel && mål === CSS ? `<style data-lenke="style.css">\n${css}\n</style>` : tag;
    });
  }
  const stil = `<style>\n${css}\n</style>`;
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${stil}\n</head>`);
  return `${stil}\n${html}`;
}

const feilside = (fil: string) => `<!DOCTYPE html>
<html lang="no"><head><meta charset="utf-8"><title>404</title></head>
<body style="font-family: system-ui, sans-serif; padding: 24px; color: #333;">
<h1 style="font-size: 40px; margin: 0 0 8px;">404</h1>
<p style="margin: 0 0 8px; font-size: 18px;"><strong>Fant ikke siden.</strong></p>
<p style="margin: 0;">Det finnes ingen fil som heter <code style="background: #eee; padding: 1px 5px; border-radius: 4px;">${fil
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")}</code> i prosjektet.</p>
</body></html>`;

const ikon = (fil: string) => (fil.endsWith(".css") ? "css" : "html");

export default function OppgaveEditor({ id }: { id: string }) {
  const def = OPPGAVER[id];
  const lagret = useMemo(() => hentOppgave(id), [id]);
  const ekstra = useMemo(() => Object.keys(def.sider ?? {}), [def.sider]);
  const htmlFiler = useMemo(() => [INDEX, ...ekstra], [ekstra]);
  const alleFiler = def.css === undefined ? htmlFiler : [...htmlFiler, CSS];

  const [filer, setFiler] = useState<Record<string, string>>(() => {
    const f: Record<string, string> = { [INDEX]: lagret?.html ?? def.html };
    for (const n of ekstra) f[n] = lagret?.sider?.[n] ?? def.sider![n];
    if (def.css !== undefined) f[CSS] = lagret?.css ?? def.css;
    return f;
  });
  const [fane, setFane] = useState(INDEX);
  // Siden som vises i forhåndsvisningen, og sidene vi har vært på (for tilbake-knappen).
  const [vis, setVis] = useState(INDEX);
  const [historikk, setHistorikk] = useState<string[]>([]);
  const lagSide = (side: string, f: Record<string, string>) =>
    side.startsWith(FEIL)
      ? feilside(side.slice(FEIL.length))
      : byggSide(f[side] ?? "", f[CSS], def.lenketCss ?? false, side, def.bilder);
  const [srcDoc, setSrcDoc] = useState(() => lagSide(INDEX, filer));
  const [resultat, setResultat] = useState<boolean[]>([]);
  const [visHint, setVisHint] = useState(false);
  const iframe = useRef<HTMLIFrameElement>(null);
  const forrigeBestatt = useRef(lagret?.passed ?? false);

  // Oppdater forhåndsvisningen og lagre koden litt etter at studenten slutter å skrive.
  useEffect(() => {
    const t = setTimeout(() => {
      setSrcDoc(lagSide(vis, filer));
      lagreOppgave(id, {
        html: filer[INDEX],
        css: filer[CSS],
        sider: ekstra.length ? Object.fromEntries(ekstra.map((n) => [n, filer[n]])) : undefined,
      });
    }, 250);
    return () => clearTimeout(t);
    // lagSide avhenger bare av def og argumentene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, filer, vis, ekstra]);

  function gåTil(side: string) {
    if (side === vis) return;
    setHistorikk((h) => [...h, vis]);
    setVis(side);
  }

  function tilbake() {
    const forrige = historikk.at(-1);
    if (!forrige) return;
    setHistorikk((h) => h.slice(0, -1));
    setVis(forrige);
  }

  /** Lenker i forhåndsvisningen: åpne riktig fil, vis 404, eller åpne eksterne sider i ny fane. */
  function lyttPaLenker(doc: Document) {
    doc.addEventListener("click", (e) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      e.preventDefault();
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("#")) {
        doc.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView();
        return;
      }
      const mål = løsSti(href, vis);
      if (mål === null) {
        window.open(href, "_blank", "noopener");
        return;
      }
      gåTil(htmlFiler.includes(mål) ? mål : FEIL + mål);
    });
  }

  function sjekk() {
    const doc = iframe.current?.contentDocument;
    if (!doc) return;
    lyttPaLenker(doc);
    if (!def.sjekker) return;
    const parser = new DOMParser();
    const sider = Object.fromEntries(
      htmlFiler.map((n) => [n, parser.parseFromString(filer[n] ?? "", "text/html")]),
    );
    const r = def.sjekker.map((s) => {
      try {
        return s.test(doc, sider);
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

  function velgFane(fil: string) {
    setFane(fil);
    if (fil !== CSS) {
      setHistorikk([]);
      setVis(fil);
    }
  }

  function nullstill() {
    if (!confirm("Vil du starte på nytt? Koden din blir erstattet med startkoden.")) return;
    const f: Record<string, string> = { [INDEX]: def.html, ...def.sider };
    if (def.css !== undefined) f[CSS] = def.css;
    setFiler(f);
    setHistorikk([]);
    setVis(fane === CSS ? INDEX : fane);
  }

  const sjekker = def.sjekker ?? [];
  const alleOk = sjekker.length > 0 && resultat.length === sjekker.length && resultat.every(Boolean);
  const adresse = vis.startsWith(FEIL) ? vis.slice(FEIL.length) : vis;

  return (
    <div className={`oppgave ${alleOk ? "oppgave--ok" : ""}`}>
      <div className="oppgave__ruter">
        <div className="oppgave__editor">
          <div className="oppgave__faner" role="tablist">
            {alleFiler.map((fil) => (
              <button
                key={fil}
                role="tab"
                aria-selected={fane === fil}
                className="oppgave__fane"
                onClick={() => velgFane(fil)}
              >
                <span className={`fil-ikon fil-ikon--${ikon(fil)}`} /> {fil}
              </button>
            ))}
            <button className="oppgave__nullstill" onClick={nullstill} title="Start på nytt">
              ↺
            </button>
          </div>
          {def.bilder && def.bilder.length > 0 && (
            <div className="oppgave__bilder" aria-label="Bilder i prosjektet">
              {def.bilder.map((b) => (
                <span key={b} className="oppgave__bilde">
                  {/* eslint-disable-next-line @next/next/no-img-element -- liten forhåndsvisning av kursbildet */}
                  <img src={KURSBILDER[b]} alt="" />
                  {b}
                </span>
              ))}
            </div>
          )}
          <CodeMirror
            key={fane}
            value={filer[fane] ?? ""}
            onChange={(v) => {
              setFiler((f) => ({ ...f, [fane]: v }));
              if (fane !== CSS && vis !== fane) velgFane(fane);
            }}
            extensions={[fane === CSS ? cssLang() : htmlLang({ autoCloseTags: false })]}
            theme={vscodeDark}
            basicSetup={{ foldGutter: false, highlightActiveLine: true, autocompletion: false }}
            minHeight="220px"
            className="oppgave__cm"
          />
        </div>
        <div className="oppgave__visning">
          <div className="oppgave__nettleser">
            {htmlFiler.length > 1 || historikk.length > 0 ? (
              <button
                className="oppgave__tilbake"
                onClick={tilbake}
                disabled={historikk.length === 0}
                title="Tilbake"
                aria-label="Tilbake"
              >
                ←
              </button>
            ) : (
              <span className="nettleser-prikker">
                <i /> <i /> <i />
              </span>
            )}
            <span className={`oppgave__adresse ${vis.startsWith(FEIL) ? "oppgave__adresse--feil" : ""}`}>
              {adresse}
            </span>
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

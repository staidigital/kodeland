<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { html as htmlLang } from '@codemirror/lang-html';
  import { css as cssLang } from '@codemirror/lang-css';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { onMount, tick } from 'svelte';

  let html = '<h1 id="header">Hello!</h1>';
  let css = 'h1 { color: red; font-family: sans-serif; }';
  let js = `const message = "Hello from JS!";\nconsole.log(message);`;

  let iframeRef: HTMLIFrameElement | null = null;
  let consoleLogs: any[] = [];
  let lastLogRef: HTMLDivElement | null = null;

  let runtimeError: string | null = null;

  
  let showHtml = true;
  let showCss = true;
  let showJs = true;

  let widths = [33.3, 33.3, 33.3];

  const STORAGE_KEY = 'kodeland-sandbox';

  function updateIframe(): void {
  runtimeError = null;

  const content = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          const originalLog = console.log;
          const originalError = console.error;

          console.log = function(...args) {
            parent.postMessage({ type: 'log', args }, '*');
            originalLog.apply(console, args);
          };

          console.error = function(...args) {
            parent.postMessage({ type: 'runtime-error', args }, '*');
            originalError.apply(console, args);
          };

          window.onerror = function(message) {
            parent.postMessage({ type: 'runtime-error', args: [message] }, '*');
          };

          try {
            ${js}
          } catch (e) {
            console.error("JS-feil:", e.message);
          }
        <\/script>
      </body>
    </html>
  `;

  if (iframeRef) iframeRef.srcdoc = content;
  consoleLogs = [];
}


  let debounceTimeout: ReturnType<typeof setTimeout>;

  function triggerDebouncedUpdate() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => updateIframe());
      } else {
        updateIframe();
      }
    }, 750);
  }

  $: html, triggerDebouncedUpdate();
  $: css, triggerDebouncedUpdate();
  $: js, triggerDebouncedUpdate();

  function handleMessage(event: MessageEvent): void {
    if (event?.data?.type === 'log') {
      consoleLogs = [...consoleLogs, ...event.data.args];
    }
    if (event?.data?.type === 'runtime-error') {
      runtimeError = event.data.args?.[0] ?? "Ukjent feil";
    }

  }

  function saveCode() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ html, css, js }));
  }

  function loadCode() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        html = parsed.html ?? html;
        css = parsed.css ?? css;
        js = parsed.js ?? js;
      } catch (e) {
        console.error("Kunne ikke laste lagret kode:", e);
      }
    }
  }

  function resetCode() {
    html = '<h1 id="header">Hello!</h1>';
    css = 'h1 { color: red; font-family: sans-serif; }';
    js = `const message = "Hello from JS!";\nconsole.log(message);`;
  }

  function startResizeSmart(e: MouseEvent, leftKey: string, rightKey: string) {
  e.preventDefault();
  const startX = e.clientX;
  const startWidths = [...widths];
  const container = document.querySelector('.editor-container') as HTMLElement;
  container.classList.add('dragging');
  const totalWidth = container.offsetWidth;

  const keyToIndex = { showHtml: 0, showCss: 1, showJs: 2 };
  const leftIdx = keyToIndex[leftKey];
  const rightIdx = keyToIndex[rightKey];

  function onMouseMove(e: MouseEvent) {
    const dx = e.clientX - startX;
    const delta = (dx / totalWidth) * 100;
    widths[leftIdx] = Math.max(10, startWidths[leftIdx] + delta);
    widths[rightIdx] = Math.max(10, startWidths[rightIdx] - delta);
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    container.classList.remove('dragging');
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

  $: {
    const visible = [showHtml, showCss, showJs];
    const count = visible.filter(Boolean).length;
    if (count > 0) {
      widths = visible.map(shown => shown ? 100 / count : 0);
    }
  }

  onMount(async () => {
    await tick();
    updateIframe();
  });
</script>

<svelte:window on:message={handleMessage} />

<!-- Kontrollpanel -->
<div class="flex flex-wrap justify-between items-center mb-4">
  <div class="flex gap-2">
    <button class="px-3 py-1 rounded font-mono border text-sm transition-all duration-200"
      class:bg-fuchsia-700={showHtml}
      class:text-white={showHtml}
      class:bg-slate-700={!showHtml}
      class:text-slate-300={!showHtml}
      title="Klikk for å vise/skjule HTML"
      on:click={() => (showHtml = !showHtml)}>
      &lt;/&gt; HTML
    </button>
    <button class="px-3 py-1 rounded font-mono border text-sm transition-all duration-200"
      class:bg-fuchsia-700={showCss}
      class:text-white={showCss}
      class:bg-slate-700={!showCss}
      class:text-slate-300={!showCss}
      title="Klikk for å vise/skjule CSS"
      on:click={() => (showCss = !showCss)}>
      &#123;&#125; CSS
    </button>
    <button class="px-3 py-1 rounded font-mono border text-sm transition-all duration-200"
      class:bg-fuchsia-700={showJs}
      class:text-white={showJs}
      class:bg-slate-700={!showJs}
      class:text-slate-300={!showJs}
      title="Klikk for å vise/skjule JavaScript"
      on:click={() => (showJs = !showJs)}>
      ⚙ JS
    </button>
  </div>

  <div class="flex gap-2 mt-2 lg:mt-0">
    <button class="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded font-mono" on:click={saveCode}>Lagre</button>
    <button class="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded font-mono" on:click={loadCode}>Last lagret</button>
    <button class="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded font-mono" on:click={resetCode}>Tilbakestill</button>
  </div>
</div>

<div class="editor-container">
  {#if showHtml}
    <div class="editor-panel" style="width: {widths[0]}%;">
      <div class="editor-label">HTML</div>
      <CodeMirror bind:value={html} lang={htmlLang()} theme={oneDark} lineWrapping basic class="editor-box" />
    </div>
  {/if}

  {#if showHtml && showCss}
    <div class="dragbar" on:mousedown={(e) => startResizeSmart(e, 'showHtml', 'showCss')}></div>
  {/if}

  {#if showCss}
    <div class="editor-panel" style="width: {widths[1]}%;">
      <div class="editor-label">CSS</div>
      <CodeMirror bind:value={css} lang={cssLang()} theme={oneDark} lineWrapping basic class="editor-box" />
    </div>
  {/if}

  {#if showCss && showJs}
    <div class="dragbar" on:mousedown={(e) => startResizeSmart(e, 'showCss', 'showJs')}></div>
  {/if}

  {#if showHtml && !showCss && showJs}
    <div class="dragbar" on:mousedown={(e) => startResizeSmart(e, 'showHtml', 'showJs')}></div>
  {/if}

  {#if showJs}
    <div class="editor-panel" style="width: {widths[2]}%;">
      <div class="editor-label">JS</div>
      <CodeMirror bind:value={js} lang={javascript()} theme={oneDark} lineWrapping basic class="editor-box" />
    </div>
  {/if}
</div>

<!-- Dersom error-feilmelding-->
 {#if runtimeError}
      <div class="bg-red-800 text-red-200 font-mono text-sm px-4 py-2 mb-3 rounded border border-red-600 shadow">
        ⚠ JavaScript-feil: {runtimeError}
      </div>
{/if}

<!-- Console og Preview -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
  <div>
    <h3 class="text-fuchsia-400 font-mono mb-2">Console</h3>
    <div class="bg-black text-green-400 font-mono p-3 h-64 overflow-y-auto rounded border border-slate-600">
      {#if consoleLogs.length === 0}
        <p class="text-slate-500">Ingen output ennå...</p>
      {:else}
        {#each consoleLogs as line}
          <div class="log-line" bind:this={lastLogRef}>{JSON.stringify(line)}</div>
        {/each}
      {/if}
    </div>
  </div>


  <div>
    <h3 class="text-fuchsia-400 font-mono mb-2">Web View</h3>
    <iframe bind:this={iframeRef}
      sandbox="allow-scripts"
      class="w-full h-64 bg-white border rounded"
      title="Code output preview"
    ></iframe>
  </div>
</div>
<style>
  .editor-container {
    display: flex;
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: #1e293b;
    border-radius: 0.5rem;
    border: 1px solid #334155;
  }

  .editor-panel {
    display: flex;
    flex-direction: column;
    min-width: 120px;
    overflow: hidden;
    background-color: #1e293b;
  }

  .editor-box {
    flex: 1;
    min-height: 100%;
  }

  .editor-label {
    font-size: 0.75rem;
    font-family: monospace;
    color: #e879f9;
    padding: 0.25rem 0.75rem;
    background-color: #0f172a;
    border-bottom: 1px solid #334155;
  }
.dragbar {
  width: 6px;
  cursor: col-resize;
  background-color: #475569;
  transition: background-color 0.2s ease;
  position: relative;
  z-index: 10;
}

.dragbar:hover,
.editor-container.dragging .dragbar {
  background-color: #e879f9;
}

.editor-container.dragging .editor-panel {
  cursor: col-resize;
}

.dragbar::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: white;
  opacity: 0.3;
}


  button:focus {
    outline: none;
    ring: 2px solid #e879f9;
  }
</style>

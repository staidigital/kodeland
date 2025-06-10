<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { html as htmlLang } from '@codemirror/lang-html';
  import { css as cssLang } from '@codemirror/lang-css';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { onMount, tick } from 'svelte';

  let html: string = '<h1 id="header">Hello!</h1>';
  let css: string = 'h1 { color: red; font-family: sans-serif; }';
  let js: string = `const message = "Hello from JS!";\nconsole.log(message);`;

  let iframeRef: HTMLIFrameElement | null = null;
  let consoleLogs: any[] = [];
  let lastLogRef: HTMLDivElement | null = null;
  const iframeId: string = `iframe-${Math.random().toString(36).slice(2, 9)}`;

  let debounceTimeout: ReturnType<typeof setTimeout>;
  let showHtml = true;
  let showCss = true;
  let showJs = true;

  function updateIframe(): void {
    const content = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            const originalLog = console.log;
            console.log = function(...args) {
              parent.postMessage({ type: 'log', args }, '*');
              originalLog.apply(console, args);
            };

            try {
              ${js}
            } catch (e) {
              console.log("Feil:", e);
            }
          <\/script>
        </body>
      </html>
    `;
    if (iframeRef) iframeRef.srcdoc = content;
    consoleLogs = [];
  }

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
  }

  onMount(async () => {
    await tick();
    setTimeout(() => {
      updateIframe();
    }, 50);
  });
</script>

<svelte:window on:message={handleMessage} />

<div class="space-y-6">
  <div>
    <div class="flex space-x-2 mb-2">
      <label class="flex items-center space-x-1">
        <input type="checkbox" bind:checked={showHtml} />
        <span class="text-sm font-mono">HTML</span>
      </label>
      <label class="flex items-center space-x-1">
        <input type="checkbox" bind:checked={showCss} />
        <span class="text-sm font-mono">CSS</span>
      </label>
      <label class="flex items-center space-x-1">
        <input type="checkbox" bind:checked={showJs} />
        <span class="text-sm font-mono">JS</span>
      </label>
    </div>

    <div class="editor-container">
      {#if showHtml}
        <div class="resizable-panel">
          <CodeMirror
            bind:value={html}
            lang={htmlLang()}
            theme={oneDark}
            lineWrapping
            basic
            class="editor-box"
          />
        </div>
      {/if}
      {#if showCss}
        <div class="resizable-panel">
          <CodeMirror
            bind:value={css}
            lang={cssLang()}
            theme={oneDark}
            lineWrapping
            basic
            class="editor-box"
          />
        </div>
      {/if}
      {#if showJs}
        <div class="resizable-panel">
          <CodeMirror
            bind:value={js}
            lang={javascript()}
            theme={oneDark}
            lineWrapping
            basic
            class="editor-box"
          />
        </div>
      {/if}
    </div>
  </div>

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
</div>

<style>
  .editor-container {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    height: 300px;
    overflow: hidden;
  }

  .resizable-panel {
    resize: horizontal;
    overflow: auto;
    min-width: 200px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    background-color: #1e293b;
  }

  .editor-box {
    flex: 1;
    min-height: 100%;
  }

  button.selected {
    background-color: #a21caf;
    color: white;
  }
</style>

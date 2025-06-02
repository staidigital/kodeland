<script lang="ts">
  // @ts-ignore
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
  <div class="grid lg:grid-cols-3 gap-4">
    <div>
      <div class="text-sm font-mono text-fuchsia-400 mb-1">index.html</div>
      <CodeMirror
        bind:value={html}
        lang={htmlLang()}
        theme={oneDark}
        lineWrapping
        basic
        class="h-48 border border-slate-700 rounded overflow-hidden"
      />
    </div>
    <div>
      <div class="text-sm font-mono text-fuchsia-400 mb-1">style.css</div>
      <CodeMirror
        bind:value={css}
        lang={cssLang()}
        theme={oneDark}
        lineWrapping
        basic
        class="h-48 border border-slate-700 rounded overflow-hidden"
      />
    </div>
    <div>
      <div class="text-sm font-mono text-fuchsia-400 mb-1">script.js</div>
      <CodeMirror
        bind:value={js}
        lang={javascript()}
        theme={oneDark}
        lineWrapping
        basic
        class="h-48 border border-slate-700 rounded overflow-hidden"
      />
    </div>
  </div>

  <div class="pt-4">
    <button
      class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded font-mono"
      on:click={updateIframe}
    >
      Kjør kode
    </button>
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

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';

  export let html: string = "";
  export let js: string = "";

  let iframeRef: HTMLIFrameElement | null = null;
  let currentScript: string = js;
  let currentHeight: number = 0;
  let editorHeight = 0;

  const iframeId: string = `iframe-${Math.random().toString(36).slice(2, 9)}`;

  function updateIframe(): void {
    if (!iframeRef) return;
    const doc = iframeRef.contentDocument || iframeRef.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              font-family: sans-serif;
            }
          </style>
        </head>
        <body>
          ${html}
          <script>
            (function() {
              ${currentScript}
            })();
            function sendHeight() {
              const height = Math.min(document.body.scrollHeight, 800);
              parent.postMessage({ type: 'resize-iframe', id: '${iframeId}', height }, '*');
            }
            window.addEventListener('load', sendHeight);
            setTimeout(sendHeight, 100);
            setTimeout(sendHeight, 300);
          <\/script>
        </body>
      </html>
    `);
    doc.close();
  }

  function handleResize(event: MessageEvent): void {
    if (event?.data?.type === 'resize-iframe' && event?.data?.id === iframeId) {
      const newHeight = Math.max(event.data.height + 36, 120);
      if (Math.abs(newHeight - currentHeight) > 5 && iframeRef) {
        iframeRef.style.height = newHeight + 'px';
        currentHeight = newHeight;
      }
    }
  }

  function adjustEditorHeight() {
    const lines = currentScript.split('\n').length;
    editorHeight = Math.min(500, Math.max(120, lines * 20 + 40));
  }

  onMount(async () => {
    await tick();
    adjustEditorHeight();
    setTimeout(() => {
      updateIframe();
    }, 50);
  });

  $: adjustEditorHeight();
</script>

<svelte:window on:message={handleResize} />

<div class="flex flex-col lg:flex-row gap-6 items-start bg-slate-900/40 p-4 rounded-2xl">
  <!-- Live Preview -->
  <div class="lg:w-[30%] w-full space-y-2 min-w-0">
    <div class="text-sm font-mono text-fuchsia-300">Live Preview:</div>
    <iframe
      title="preview"
      class="w-full border border-slate-700 rounded-lg bg-white shadow-inner"
      bind:this={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      style="height: 200px; transition: height 0.2s ease"
    ></iframe>
  </div>

  <!-- Editable JS + Save button -->
  <div class="lg:w-[70%] w-full flex flex-col space-y-3 min-w-0">
    <div class="text-sm font-mono text-fuchsia-300">script.js</div>
    <div
      class="border border-slate-700 rounded-lg overflow-hidden shadow-md bg-[#1e1e1e] transition-all"
      style={`height: ${editorHeight}px`}
    >
      <CodeMirror
        bind:value={currentScript}
        lang={javascript()}
        theme={oneDark}
        basic={true}
        lineWrapping={true}
        placeholder="Skriv JavaScript her..."
      />
    </div>
    <button
      class="self-start bg-fuchsia-600 text-sm hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg font-mono shadow transition"
      on:click={updateIframe}
    >
      Lagre JavaScript
    </button>
  </div>
</div>

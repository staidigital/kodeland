<script>
  import { onMount, tick } from 'svelte';
  // @ts-ignore
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';

  export let html = "";
  export let js = "";

  let iframeRef;
  let currentScript = js;
  let currentHeight = 0;

  const iframeId = `iframe-${Math.random().toString(36).slice(2, 9)}`;

  function updateIframe() {
    if (!iframeRef) return;
    const doc = iframeRef.contentDocument || iframeRef.contentWindow.document;
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

  function handleResize(event) {
    if (
      event?.data?.type === 'resize-iframe' &&
      event?.data?.id === iframeId
    ) {
    const newHeight = Math.max(event.data.height + 36, 120); // 24px buffer
      if (Math.abs(newHeight - currentHeight) > 5) {
        iframeRef.style.height = newHeight + 'px';
        currentHeight = newHeight;
      }
    }
  }

  onMount(async () => {
    await tick();
    setTimeout(() => {
      updateIframe();
    }, 50);
  });
</script>

<svelte:window on:message={handleResize} />

<div class="flex flex-col lg:flex-row gap-4 my-6 items-start">
  <!-- Live Preview -->
  <div class="lg:w-[40%] w-full space-y-2 min-w-0">
    <div class="text-sm font-mono text-fuchsia-300">Live Preview:</div>
    <iframe
      class="w-full border border-slate-700 rounded bg-white"
      bind:this={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      style="height: 200px; transition: height 0.2s ease"
    />
  </div>

  <!-- Editable JS + Save button -->
  <div class="lg:w-[60%] w-full flex flex-col space-y-2 min-w-0">
    <div class="text-sm font-mono text-fuchsia-300">script.js</div>
    <div class="h-56 border border-slate-700 rounded-lg overflow-hidden shadow">
      <CodeMirror
        bind:value={currentScript}
        lang={javascript()}
        theme={oneDark}
        basic={true}
        lineWrapping={true}
        placeholder="Rediger JavaScript her..."
      />
    </div>
    <div class="pt-1">
      <button
        class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded font-mono shadow"
        on:click={updateIframe}
      >
        Lagre JavaScript
      </button>
    </div>
  </div>
</div>

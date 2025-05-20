<script>
  import { onMount } from 'svelte';
  // @ts-ignore
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';

  export let html = "";
  export let js = "";

  let iframeRef;
  let currentScript = js;

  function updateIframe() {
    if (!iframeRef) return;
    const doc = iframeRef.contentDocument || iframeRef.contentWindow.document;
    doc.open();
    doc.write(`
      ${html}
      <script>
        (function() {
          ${currentScript}
        })();
      <\/script>
    `);
    doc.close();
  }

  onMount(updateIframe);
</script>

<div class="flex flex-col lg:flex-row gap-4 my-6 items-start">
  <!-- Left: Preview -->
  <div class="flex-1 space-y-2 min-w-0">
    <div class="text-sm font-mono text-fuchsia-300">Live Preview:</div>
    <iframe
      class="w-full h-56 border border-slate-700 rounded bg-white"
      bind:this={iframeRef}
      sandbox="allow-scripts allow-same-origin"
    />
  </div>

  <!-- Right: Editor -->
  <div class="flex-1 space-y-2 min-w-0">
    <div class="text-sm font-mono text-fuchsia-300">script.js</div>
    <div class="border border-slate-700 rounded-lg overflow-hidden shadow h-56">
      <CodeMirror
        bind:value={currentScript}
        lang={javascript()}
        theme={oneDark}
        basic={true}
        lineWrapping={true}
        placeholder="Rediger JavaScript her..."
      />
    </div>

    <!-- Aligned Button -->
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

<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';

  export let code: string = '';
  let currentCode: string = code;
  let iframeContent: string = '';
  let iframeRef: HTMLIFrameElement | null = null;
  let showOutput: boolean = false;

  function runCode(): void {
  const escapedCode = currentCode
    .replace(/<\/script>/g, '<\\/script>')
    .replace(/`/g, '\\`');

  iframeContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: monospace;
            background: #1e293b;
            color: #e2e8f0;
            margin: 0;
            padding: 1rem;
            font-size: 14px;
            line-height: 1.5;
          }
          #output {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <pre id="output"></pre>
        <script>
          const out = document.getElementById('output');
          console.log = (...args) => {
            out.textContent += args.join(" ") + "\\n";
          };
          try {
            eval(\`${escapedCode}\`);
          } catch (e) {
            out.textContent += "Feil: " + e.message;
          }
        <\/script>
      </body>
    </html>
  `;
  showOutput = true;

  // Force iframe refresh
  if (iframeRef) {
    iframeRef.srcdoc = iframeContent;
  }
}

  function hideOutput(): void {
    showOutput = false;
    iframeContent = '';
  }
</script>

<div class="w-full mb-2 space-y-3">
  <!-- Code editor -->
  <div class="border border-slate-600 rounded-lg overflow-hidden shadow">
    <CodeMirror
      bind:value={currentCode}
      lang={javascript()}
      theme={oneDark}
      basic={true}
      lineWrapping={true}
      placeholder="Skriv JavaScript-kode her..."
    />
  </div>

  <!-- Run button -->
  <div class="flex gap-2">
    <button
      on:click={runCode}
      class="bg-slate-700 hover:bg-green-600 text-sm text-white font-mono px-3 py-1.5 rounded-md shadow inline-flex items-center gap-2 transition"
    >
      ▶️ <span>Kjør koden</span>
    </button>

    {#if showOutput}
      <button
        on:click={hideOutput}
        class="bg-slate-700 hover:bg-red-700 text-sm text-white font-mono px-3 py-1.5 rounded-md shadow inline-flex items-center gap-2 transition"
      >
        ❌ <span>Skjul resultat</span>
      </button>
    {/if}
  </div>

  <!-- Output iframe -->
  {#if showOutput && iframeContent}
    <div class="border border-slate-600 rounded-lg overflow-hidden shadow">
      <iframe
        bind:this={iframeRef}
        srcdoc={iframeContent}
        class="w-full h-24 bg-slate-900"
        sandbox="allow-scripts"
        title="Runs and shows terminal output"
      ></iframe>
    </div>
  {/if}
</div>
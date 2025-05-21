<script>
  import Highlight from "svelte-highlight";
  import javascript from "svelte-highlight/languages/javascript";
  import agate from "svelte-highlight/styles/agate";

  export let preview = false;
  export let code;
  export let language = "javascript";

  let show = false;

  $: iframeContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: sans-serif;
          margin:0;
          padding:0;
        }

        /* Light mode (default) */
        body {
          background: #fff;
          color: #000;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          body {
            background: #1e293b; /* slate-800 */
            color: #e2e8f0;       /* slate-200 */
          }
          #console {
            width: 100%;
            padding: 1rem;
            margin: 0;
            font-family: monospace;
            font-size: 0.95rem;
            white-space: pre-wrap;
            background: inherit;
            color: inherit;
            box-sizing: border-box;
          }
        }

        #console {
          padding: 1rem;
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.95rem;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <pre id="console"></pre>
      <script>
        const consoleEl = document.getElementById('console');
        console.log = function(...args) {
          args.forEach(arg => {
            consoleEl.textContent += String(arg) + "\\n";
          });
        };
        try {
          ${code.replace(/<\/script>/g, "<\\/script>")}
        } catch (e) {
          consoleEl.textContent += "Feil: " + e.message;
        }
      <\/script>
    </body>
    </html>
  `;
</script>

<svelte:head>
  {@html agate}
</svelte:head>

<div class="py-10">
  <Highlight language={javascript} {code} />

  {#if preview}
    <div
      on:click={() => (show = !show)}
      class="flex cursor-pointer flex-col justify-center items-center bg-slate-700 hover:bg-red-900 p-2 mt-2"
    >
      <span class="text-fuchsia-200 font-mono">
        {show ? "Skjul forhåndsvisning" : "Forhåndsvisning"}
      </span>
    </div>

    {#if show}
      <div class="mt-4 border border-slate-600 rounded-lg overflow-hidden bg-slate-800">
        <iframe
          srcdoc={iframeContent}
          class="w-full"
          sandbox="allow-scripts"
        ></iframe>
      </div>
    {/if}
  {/if}
</div>

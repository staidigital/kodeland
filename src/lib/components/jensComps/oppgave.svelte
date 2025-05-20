<script>
  import LiveHTMLPreview from './LiveHTMLPreview.svelte';

  export let number;
  export let title;
  export let description;
  export let solution;

  let showSolution = false;

  function renderInlineCode(str) {
    const escaped = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return escaped.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>');
  }
</script>

<div class="border border-slate-700 rounded p-4 space-y-2 bg-slate-800">
  <div class="font-bold text-fuchsia-400">Oppgave {number}: {title}</div>
  <p class="text-slate-100">{@html renderInlineCode(description)}</p>

  {#if solution}
    <button
      class="text-sm text-white font-mono bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-1 rounded"
      on:click={() => showSolution = !showSolution}
    >
      {showSolution ? 'Skjul løsning' : 'Vis løsning'}
    </button>

    {#if showSolution}
      <LiveHTMLPreview html={solution.code} js={solution.script} />
    {/if}
  {/if}
</div>

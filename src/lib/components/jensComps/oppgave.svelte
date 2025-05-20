<script>
  export let number = 1;                // Oppgave number
  export let title = '';                // Optional: custom task title
  export let description = '';          // Optional: task instruction text
  export let code = '';                 // Optional: code snippet to copy
  $: description = description.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>');

</script>

<div class="mb-8">
  <h3 class="text-lg font-semibold text-white">
    {title || `Oppgave ${number}`}
  </h3>

  {#if description}
    <p class="text-slate-300 leading-relaxed">{@html description}</p>
  {/if}

  {#if code}
    <div class="bg-slate-900 border border-slate-700 rounded p-4 overflow-x-auto text-green-300 font-mono text-sm">
      <pre>{code}</pre>
    </div>
  {/if}
</div>

<script lang="ts">
  import Highlight from 'svelte-highlight';
  import agate from 'svelte-highlight/styles/agate';
  import xml from 'svelte-highlight/languages/xml';
  import css from 'svelte-highlight/languages/css';
  import javascript from 'svelte-highlight/languages/javascript';
  import plaintext from 'svelte-highlight/languages/plaintext';

  export let code: string = '';
  export let language: string = 'javascript';
  export let preview: boolean = false;

  let show = false;
  let copied = false;

  const languages: Record<string, any> = {
    html: xml,
    xml,
    css,
    javascript,
    plaintext
  };

  $: lang = language?.toLowerCase() || 'javascript';
  $: hlLang = languages[lang] ?? javascript;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error('Kunne ikke kopiere kode:', err);
    }
  }
</script>

<svelte:head>
  {@html agate}
</svelte:head>

<div class="relative py-2">
  <!-- Kopier-knapp -->
  <button
    on:click={copyCode}
    class="absolute top-4 right-2 text-xs font-mono bg-slate-800/80 hover:bg-fuchsia-700 text-slate-200 hover:text-white px-3 py-1.5 rounded transition"
  >
    {#if copied}
      Kopiert!
    {:else}
      Kopier kode
    {/if}
  </button>

  <!-- Kodeblokk -->
  <Highlight language={hlLang} {code} />

  {#if preview === true}
    <button
      on:click={() => (show = !show)}
      class="flex cursor-pointer flex-col justify-center items-center bg-slate-700 hover:bg-red-900 p-2 mt-4 rounded"
    >
      <span class="text-fuchsia-200 font-mono">
        {show ? 'Skjul forhåndsvisning' : 'Vis forhåndsvisning'}
      </span>
    </button>

    {#if show}
      <div class="container bg-slate-100 pb-10 mt-4 rounded">
        <div class="prose prose-lg">{@html code}</div>
      </div>
    {/if}
  {/if}
</div>

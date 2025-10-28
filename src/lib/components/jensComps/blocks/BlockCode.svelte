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

  // Vis knappen kun hvis det ikke er plaintext
  $: showCopyButton = lang !== 'plaintext';
</script>

<svelte:head>
  {@html agate}
</svelte:head>

<div class="relative py-2">
  <!-- Kopier-knapp -->
  {#if showCopyButton}
    <button
      on:click={copyCode}
      class="copy-btn text-xs font-mono bg-slate-800/80 hover:bg-fuchsia-700 text-slate-200 hover:text-white px-3 py-1.5 rounded transition"
    >
      {#if copied}
        Kopiert!
      {:else}
        Kopier kode
      {/if}
    </button>
  {/if}

  <!-- Kodeblokk -->
  <Highlight language={hlLang} {code} />

  <!-- Forhåndsvisning -->
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

<style>
  .copy-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
  }

  /* Flytter kopier-knappen under koden på små skjermer */
  @media (max-width: 1300px) {
    .copy-btn {
      position: static;
      display: block;
      margin: 0.5rem auto;
    }
  }
</style>

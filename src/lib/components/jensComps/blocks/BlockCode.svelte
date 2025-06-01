<script lang="ts">
  import Highlight from 'svelte-highlight';
  import agate from 'svelte-highlight/styles/agate';
  import xml from 'svelte-highlight/languages/xml';
  import css from 'svelte-highlight/languages/css';
  import javascript from 'svelte-highlight/languages/javascript';

  export let code: string = '';
  export let language: string = 'javascript';
  export let preview: boolean = false;

  let show: boolean = false;

  const languages: Record<string, any> = {
    html: xml,
    xml,
    css,
    javascript
  };

  $: lang = language?.toLowerCase() || 'javascript';
  $: hlLang = languages[lang] ?? javascript;
</script>

<svelte:head>
  {@html agate}
</svelte:head>

<div class="py-10">
  <Highlight language={hlLang} {code} />

  {#if preview}
    <button
      on:click={() => (show = !show)}
      class="flex cursor-pointer flex-col justify-center items-center bg-slate-700 hover:bg-red-900 p-2"
    >
      <span class="text-fuchsia-200 font-mono">Forhåndsvisning</span>
    </button>

    {#if show}
      <div class="container bg-slate-100 pb-10">
        <div class="prose prose-lg">{@html code}</div>
      </div>
    {/if}
  {/if}
</div>

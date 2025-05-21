<script>
  import Highlight from 'svelte-highlight';
  import agate from 'svelte-highlight/styles/agate';
  import xml from 'svelte-highlight/languages/xml';
  import css from 'svelte-highlight/languages/css';
  import javascript from 'svelte-highlight/languages/javascript';

  export let code = '';
  export let language = 'javascript';
  export let preview = false;

  let show = false;

  const languages = {
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
    <div
      on:click={() => (show = !show)}
      class="flex cursor-pointer flex-col justify-center items-center bg-slate-700 hover:bg-red-900 p-2"
    >
      <span class="text-fuchsia-200 font-mono">Forhåndsvisning</span>
    </div>

    {#if show}
      <div class="container bg-slate-100 pb-10">
        <div class="prose prose-lg">{@html code}</div>
      </div>
    {/if}
  {/if}
</div>

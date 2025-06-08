<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup';
  import BlockHtmlPreview from './BlockHTMLPreview.svelte';
  import BlockCode from './BlockCode.svelte';

  interface Solution {
    correct?: number;
    options?: string[];
    code?: string;
    script?: string;
    text?: string;
  }

  export let number: number;
  export let title: string;
  export let description: string;
  export let solution: Solution;
  export let code: string | undefined;

  let selected: number | null = null;
  let answered: boolean = false;
  let showSolution: boolean = false;
  let collapsed: boolean = false;
</script>

<div class="border border-slate-700 rounded bg-slate-800 text-slate-100">
  <!-- Topptekst og sammenklapping -->
  <div class="flex items-center justify-between p-4 border-b border-slate-700">
    <div class="font-bold text-fuchsia-400 text-lg">
      Oppgave {number}: {@html renderInlineMarkup(title)}
    </div>
    <button
      class="text-sm font-mono bg-slate-600 hover:bg-slate-700 text-white px-2 py-1 rounded transition"
      on:click={() => collapsed = !collapsed}
    >
      {collapsed ? 'Vis oppgave' : 'Skjul oppgave'}
    </button>
  </div>

  {#if !collapsed}
    <div class="p-4 space-y-4">
      <div class="markup-text leading-relaxed whitespace-pre-line">
        {@html renderInlineMarkup(description)}
      </div>

      {#if code}
        <div class="mt-2">
          <BlockCode language="javascript" {code} />
        </div>
      {/if}

      {#if Array.isArray(solution?.options)}
        <div class="space-y-2">
          {#each solution.options as option, index}
            <button
              class="block w-full markup-text text-left cursor-pointer px-4 py-2 rounded transition font-mono text-sm border
                {answered
                  ? index === solution.correct
                    ? 'bg-green-700 text-white border-green-500'
                    : selected === index
                      ? 'bg-red-700 text-white border-red-500'
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200'}"
              on:click={() => {
                if (!answered) {
                  selected = index;
                  answered = true;
                }
              }}
            >
              {@html renderInlineMarkup(option)}
            </button>
          {/each}
        </div>
      {:else if solution?.code}
  <!-- Løsningsknapp for kode -->
  <div class="flex justify-end">
    <button
      class="text-sm cursor-pointer text-white font-mono bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded"
      on:click={() => showSolution = !showSolution}
    >
      {showSolution ? 'Skjul løsningsforslag' : 'Vis løsningsforslag'}
    </button>
  </div>

  {#if showSolution}
    <div class="mt-4">
      <BlockCode language="javascript" code={solution.code} />
    </div>
  {/if}

      {:else if solution?.text}
        <!-- Løsningsknapp for tekst -->
        <button
          class="text-sm  text-white font-mono bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-1 rounded"
          on:click={() => showSolution = !showSolution}
        >
          {showSolution ? 'Skjul løsning' : 'Vis løsning'}
        </button>

        {#if showSolution}
          <div class="bg-slate-700 markup-text rounded p-3 mt-2 font-mono text-sm text-green-300 whitespace-pre-wrap">
            {@html renderInlineMarkup(solution.text)}
          </div>
        {/if}
      {:else if solution?.script}
        <!-- Løsningsknapp for interaktiv kode -->
        <button
          class="text-sm text-white font-mono bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-1 rounded"
          on:click={() => showSolution = !showSolution}
        >
          {showSolution ? 'Skjul interaktiv løsning' : 'Vis interaktiv løsning'}
        </button>

        {#if showSolution}
          <BlockHtmlPreview html={code ?? ''} js={solution.script} />
        {/if}
      {/if}
    </div>
  {/if}
</div>

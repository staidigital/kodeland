<script context="module" lang="ts">
  export interface Solution {
      correct?: number;
      options?: string[];
      code?: string;
      script?: string;
      text?: string;
    }
</script>
<script lang="ts">
  

  import { renderInlineMarkup } from '$lib/utils/markup.js';
  import BlockHtmlPreview from './BlockHTMLPreview.svelte';

  export let number: number;
  export let title: string;
  export let description: string;
  export let solution: Solution;

  let selected: number | null = null;
  let answered: boolean = false;
  let showSolution: boolean = false;
</script>

<div class="border border-slate-700 rounded p-4 bg-slate-800 text-slate-100 space-y-4">
  <div class="font-bold text-fuchsia-400 text-lg">
    Oppgave {number}: {@html renderInlineMarkup(title)}
  </div>

  <div class="leading-relaxed text-sm whitespace-pre-line">
    {@html renderInlineMarkup(description)}
  </div>

  {#if Array.isArray(solution?.options)}
    <div class="space-y-2">
      {#each solution.options as option, index}
        <button
          class="block w-full text-left px-4 py-2 rounded transition font-mono text-sm border
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
          {option}
        </button>
      {/each}
    </div>

  {:else if solution?.code}
    <button
      class="text-sm text-white font-mono bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-1 rounded"
      on:click={() => showSolution = !showSolution}
    >
      {showSolution ? 'Skjul løsning' : 'Vis løsning'}
    </button>

    {#if showSolution}
      <BlockHtmlPreview html={solution.code} js={solution.script ?? ""} />
    {/if}

  {:else if solution?.text}
    <button
      class="text-sm text-white font-mono bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-1 rounded"
      on:click={() => showSolution = !showSolution}
    >
      {showSolution ? 'Skjul løsning' : 'Vis løsning'}
    </button>

    {#if showSolution}
      <div class="bg-slate-700 rounded p-3 mt-2 font-mono text-sm text-green-300 whitespace-pre-wrap">
        {@html renderInlineMarkup(solution.text)}
      </div>
    {/if}
  {/if}
</div>

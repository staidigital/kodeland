<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup';
  import BlockHtmlPreview from './BlockHTMLPreview.svelte';
  import BlockCode from './BlockCode.svelte';
  import { fly } from 'svelte/transition';

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
  let answered = false;
  let showSolution = false;
  let collapsed = false;
</script>

<!-- Wrapper med mellomrom til neste oppgave -->
<div class="mb-8 last:mb-0">
  <div
    class="border border-slate-700/80 rounded-2xl bg-slate-800/60 shadow-lg overflow-hidden hover:border-fuchsia-600/40 transition-all duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-slate-700/60 bg-slate-900/70">
      <div class="font-semibold text-fuchsia-400 text-lg tracking-wide leading-tight">
        Oppgave {number}: {@html renderInlineMarkup(title)}
      </div>

    </div>

    <!-- Innhold -->
    {#if !collapsed}
      <div class="p-6 space-y-2 leading-relaxed" transition:fly={{ y: 8, duration: 180 }}>
        <!-- Beskrivelse -->
        <div class="markup-text text-slate-100">
          {@html renderInlineMarkup(description)}
        </div>

        <!-- Kode -->
        {#if code}
          <div class="pt-1">
            <BlockCode language="javascript" {code} />
          </div>
        {/if}

        <!-- Flervalgs-alternativer -->
        {#if Array.isArray(solution?.options)}
          <div class="flex flex-col gap-2">
            {#each solution.options as option, index}
              <button
                class={`w-full text-left px-3 py-1.5 rounded-md border font-mono text-sm transition-colors duration-200
                  ${
                    answered
                      ? index === solution.correct
                        ? 'bg-green-600 border-green-500 text-white'
                        : selected === index
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-slate-700 border-slate-600 text-slate-200'
                      : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200'
                  }`}
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

          {#if answered}
            <div class="mt-2 text-sm font-mono text-center px-2 py-1 rounded bg-slate-900/60 border border-slate-700">
              {#if selected === solution.correct}
                ✅ Riktig!
              {:else}
                ❌ Feil, prøv igjen!
              {/if}
            </div>
          {/if}
          {:else if solution?.code}
          <!-- Kode-løsning -->
          <div class="flex justify-end">
            <button
              class="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors duration-200"
              on:click={() => (showSolution = !showSolution)}
              title="Vis løsningen (kun om du vil se den)"
            >
              {showSolution ? 'Skjul løsning' : 'Vis løsning'}
            </button>
          </div>

          {#if showSolution}
            <div class="pt-3" in:fly={{ y: 8, duration: 200 }}>
              <BlockCode language="javascript" code={solution.code} />
            </div>
          {/if}


        {:else if solution?.text}
          <div class="flex justify-end pt-3">
          <button
            class="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors duration-200 hover:bg-slate-600 hover:text-white"
            on:click={() => (showSolution = !showSolution)}
            title="Vis løsningen (kun om du vil se den)"
          >
            {showSolution ? 'Skjul løsning' : 'Vis løsning'}
          </button>
        </div>


          {#if showSolution}
            <div
              class="bg-slate-700/70 rounded-lg p-4 mt-4 font-mono text-sm text-green-300 whitespace-pre-wrap border border-slate-600"
              in:fly={{ y: 8, duration: 200 }}
            >
              {@html renderInlineMarkup(solution.text)}
            </div>
          {/if}

        {:else if solution?.script}
          <!-- Interaktiv løsning -->
          <div class="flex justify-end pt-2">
            <button
              class="text-sm font-mono bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-3 py-1.5 rounded transition"
              on:click={() => (showSolution = !showSolution)}
            >
              {showSolution ? 'Skjul interaktiv løsning' : 'Vis interaktiv løsning'}
            </button>
          </div>

          {#if showSolution}
            <div class="pt-4" in:fly={{ y: 8, duration: 200 }}>
              <BlockHtmlPreview html={code ?? ''} js={solution.script} />
            </div>
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</div>

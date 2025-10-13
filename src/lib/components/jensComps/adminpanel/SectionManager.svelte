<script lang="ts">
  import type { Section } from '$lib/utils/editor/types';

  export let sections: Section[] = [];
  export let currentSectionIndex: number;
  export let renameSection: (index: number, newTitle: string) => void;
  export let selectSection: (index: number) => void;
  export let addSection: () => void;
  export let deleteSection: (index: number) => void;
  export let undo: () => void;
  export let redo: () => void;
  export let moveSectionUp: (index: number) => void;
  export let moveSectionDown: (index: number) => void;

  export let canUndo: boolean = true;
  export let canRedo: boolean = true;
</script>

  <div class="flex gap-2">
    <button disabled={!canUndo} on:click={() => undo()} class="bg-slate-700 text-white px-3 py-1 rounded text-xs disabled:bg-slate-500 disabled:cursor-not-allowed">↩️ Angre</button>
    <button disabled={!canRedo} on:click={() => redo()} class="bg-slate-700 text-white px-3 py-1 rounded text-xs disabled:bg-slate-500 disabled:cursor-not-allowed">↪️ Gjør om</button>
  </div>

<div class="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-3 shadow">

  <h2 class="text-lg font-semibold text-fuchsia-400">🗂 Seksjoner</h2>
  <div class="space-y-1">
    {#each sections as section, index}
      <div class="flex items-center gap-2">
        <button
          on:click={() => selectSection(index)}
          class="px-2 py-1 rounded text-xs font-mono transition 
            {index === currentSectionIndex ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-300'}"
        >
          {section.id}
        </button>
        <input
          type="text"
          bind:value={section.title}
          on:change={(e) => renameSection(index, (e.target as HTMLInputElement).value)}
          class="bg-slate-800 text-white text-xs px-2 py-1 rounded border border-slate-600 w-full"
        />
        <div class="flex gap-1">
          <button on:click={() => moveSectionUp(index)} class="text-xs text-blue-300 hover:text-blue-100">⬆️</button>
          <button on:click={() => moveSectionDown(index)} class="text-xs text-blue-300 hover:text-blue-100">⬇️</button>
        </div>
        {#if sections.length > 1}
          <button
            on:click={() => deleteSection(index)}
            class="text-red-400 hover:text-red-200 text-xs"
          >🗑</button>
        {/if}
      </div>
    {/each}
  </div>
  <button
    on:click={addSection}
    class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
  >➕ Ny seksjon</button>
</div>

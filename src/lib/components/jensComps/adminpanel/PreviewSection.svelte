<script lang="ts">
  import BlockRenderer from '$lib/components/jensComps/BlockRenderer.svelte';
  import type { Section } from '$lib/utils/editor/types';

  export let section: Section;
  export let sectionIndex: number;
  export let editingIndex: number | null;
  export let editingSectionIndex: number | null;
  export let showControls: boolean;

  // 👇 eksplisitte callbacks i stedet for dispatch
  export let onMoveUp: (info: { sectionIndex: number; blockIndex: number }) => void;
  export let onMoveDown: (info: { sectionIndex: number; blockIndex: number }) => void;
  export let onEdit: (info: { sectionIndex: number; blockIndex: number }) => void;
  export let onDelete: (info: { sectionIndex: number; blockIndex: number }) => void;
  export let onDuplicate: (info: { sectionIndex: number; blockIndex: number }) => void;
</script>

<div class={`space-y-4 pt-6 ${showControls ? 'border-t border-slate-700' : ''}`}>
  {#if section.title}
    <h3 class="text-xl text-fuchsia-200 font-semibold px-1">{section.title}</h3>
  {/if}

  {#each section.blocks as block, index}
    <div class="relative flex items-start">
      <div class={`flex-1 ${showControls ? 'py-6 px-4 border border-slate-800 bg-slate-800/30' : 'py-0 px-0'} rounded-lg transition`}>
        {#if editingIndex === index && editingSectionIndex === sectionIndex}
          <div class="absolute top-2 left-2 text-xs text-fuchsia-400 font-mono">🔧 Redigerer…</div>
        {/if}
        <BlockRenderer {block} />
      </div>

      {#if showControls}
        <div class="ml-3 self-center flex flex-col items-center gap-1">
          <span class="text-slate-500 uppercase bg-slate-900 px-2 py-0.5 rounded font-mono tracking-wide font-bold text-[10px]">
            {block.type}
          </span>
          <div class="flex">
            <div class="grid grid-cols-2 gap-1">
              <button on:click={() => onMoveUp({ sectionIndex, blockIndex: index })} class="text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">⬆️</button>
              <button on:click={() => onEdit({ sectionIndex, blockIndex: index })} class="text-yellow-300 hover:text-yellow-100 bg-slate-800 px-2 py-1 rounded text-xs">✏️</button>
              <button on:click={() => onMoveDown({ sectionIndex, blockIndex: index })} class="text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">⬇️</button>
              <button on:click={() => onDelete({ sectionIndex, blockIndex: index })} class="text-red-400 hover:text-red-200 bg-slate-800 px-2 py-1 rounded text-xs">🗑</button>
            </div>
            <div>
              <button on:click={() => onDuplicate({ sectionIndex, blockIndex: index })} class="text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">Duplicate</button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

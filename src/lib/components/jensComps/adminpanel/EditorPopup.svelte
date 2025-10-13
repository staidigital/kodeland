<script lang="ts">
  import BlockRenderer from '$lib/components/jensComps/BlockRenderer.svelte';
  import type { Section } from '$lib/utils/editor/types';

  export let sections: Section[] = [];
  export let raw: string = '';
  export let copyJSON: () => void;
  export let handleClose: () => void = () => {};

  
  let tab: 'json' | 'preview' = 'json';
</script>

<!-- Modal wrapper (åpnes av forelder) -->
<div class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
  <div class="bg-slate-800 w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto rounded-lg shadow-lg border border-slate-700">
    <div class="flex justify-between items-center bg-slate-900 px-4 py-3 border-b border-slate-700">
      <div class="space-x-2">
        <button
          on:click={() => tab = 'json'}
          class={`px-3 py-1 rounded text-xs ${tab === 'json' ? 'bg-fuchsia-600 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          📦 JSON
        </button>
        <button
          on:click={() => tab = 'preview'}
          class={`px-3 py-1 rounded text-xs ${tab === 'preview' ? 'bg-fuchsia-600 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          👀 Preview
        </button>
      </div>
      <button on:click={() => {
        console.log('Close button clicked');
        handleClose();
      }}>❌</button>
    </div>

    {#if tab === 'json'}
      <div class="p-4 space-y-2">
        <button on:click={copyJSON} class="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded">
          📋 Kopier
        </button>
        <pre class="bg-slate-900 p-4 text-sm overflow-auto rounded whitespace-pre-wrap">{raw}</pre>
      </div>
    {/if}

    {#if tab === 'preview'}
      <div class="p-4 space-y-6">
        {#each sections as section}
          <div class="space-y-2">
            {#if section.title}
              <h3 class="text-lg text-fuchsia-300 font-semibold">{section.title}</h3>
            {/if}
            {#each section.blocks as block}
              <div class="border border-slate-700 bg-slate-900 p-4 rounded">
                <BlockRenderer {block} />
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

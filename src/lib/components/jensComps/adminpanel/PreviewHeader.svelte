<script lang="ts">
  import EditorPopup from './EditorPopup.svelte';
  import type { Section } from '$lib/utils/editor/types';

  export let sections: Section[];
  export let raw: string;
  export let copyJSON: () => void;
  export let showControls: boolean;
  export let showEditorPopup: boolean;

  // 🔁 Nye callback-props i stedet for dispatch
  export let onOpenPopup: () => void;
  export let onClosePopup: () => void;
  export let onToggleControls: () => void;
</script>

<div class="flex justify-between items-center">
  <h1 class="text-3xl font-bold text-fuchsia-300">🔍 Forhåndsvisning</h1>
  <div class="flex gap-2">
    <button
      on:click={onOpenPopup}
      class="bg-fuchsia-700 hover:bg-fuchsia-600 text-white px-3 py-1 rounded text-xs"
    >
      🧾 Data
    </button>

    {#if showEditorPopup}
      <EditorPopup
        {sections}
        {raw}
        {copyJSON}
        handleClose={onClosePopup}
      />
    {/if}

    <button
      on:click={onToggleControls}
      class="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs"
    >
      {showControls ? '👁️ Skjul verktøy' : '🛠 Vis verktøy'}
    </button>
  </div>
</div>

<script lang="ts">
  import type { Section } from '$lib/utils/editor/types';
  export let sections: Section[] = [];
  export let importFromSection: number;
  export let importFromBlock: number;
  export let onImport: () => void;
</script>

<div class="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2 shadow">
  <h2 class="text-lg font-semibold text-fuchsia-400">🔃 Importer blokk</h2>
  <div class="flex gap-2">
    <select bind:value={importFromSection} class="bg-slate-800 text-white text-sm rounded px-2 py-1 border border-slate-600">
      {#each sections as s, i}
        <option value={i}>Fra: {s.title || s.id}</option>
      {/each}
    </select>
    <select bind:value={importFromBlock} class="bg-slate-800 text-white text-sm rounded px-2 py-1 border border-slate-600">
      {#each sections[importFromSection]?.blocks || [] as b, i}
        <option value={i}>Blokk {i + 1} – {b.type}</option>
      {/each}
    </select>
    <button on:click={onImport} class="bg-fuchsia-700 text-white px-3 py-1 rounded text-sm hover:bg-fuchsia-600">
      📥 Importer
    </button>
  </div>
</div>

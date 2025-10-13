<script lang="ts">
  import type { Section } from '$lib/utils/editor/types';

  export let isInvalid: boolean;
  export let editingIndex: number | null;
  export let pastedContent: string;

  export let onAddBlock: () => void;
  export let onResetEditor: () => void;
  export let onParsePastedContent: () => void;
  export let onPastedContentChange: (value: string) => void;
</script>

<div class="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow">
  <button
    on:click={onAddBlock}
    disabled={isInvalid}
    class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded font-mono text-sm w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {editingIndex !== null ? '✏️ Oppdater blokk' : '➕ Legg til blokk'}
  </button>
</div>

<div class="space-y-2 mt-4">
  <div class="flex justify-between items-center">
    <button on:click={onResetEditor} class="ml-2 bg-red-500 text-white px-4 py-1 rounded">
      Tilbakestill
    </button>
  </div>
</div>

<textarea
  bind:value={pastedContent}
  placeholder="Lim inn innhold fra .js eller .json seksjonsfil her"
  rows="10"
  class="w-full p-2 border"
  on:input={(e) => onPastedContentChange((e.target as HTMLTextAreaElement).value)}
></textarea>
<button on:click={onParsePastedContent}>Last fra tekst</button>

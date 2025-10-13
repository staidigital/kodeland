<script lang="ts">
  import type { Block } from '$lib/utils/editor/types';
  export let blockType: Block['type'];
  export let setBlockType: (type: Block['type']) => void;
</script>

<div class="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2 shadow">
  <h2 class="text-lg font-semibold text-fuchsia-400">1. Velg blokktype</h2>
  <select
    bind:value={blockType}
    on:change={(e) => setBlockType(e.currentTarget.value as Block['type'])}
    class="w-full bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 text-sm"
  >
    <option value="paragraph">📝 Paragraph</option>
    <option value="code">💻 Code</option>
    <option value="image">🖼 Image</option>
  </select>
</div>

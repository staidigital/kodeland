<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup';
  export let headers: string[] = [];
  export let rows: string[][] = [];
</script>

<div class="w-full flex  mt-6">
  <table class="min-w-[70%] max-w-[800px] border border-slate-700 text-slate-200 text-md rounded-lg overflow-hidden mb-4 shadow-lg">
    <thead class="bg-slate-800 text-fuchsia-300">
      <tr>
        {#each headers as header, i}
          <th
            class={`px-3 py-2 border-b border-slate-700 text-left ${
              i > 0 ? 'text-center' : ''
            }`}
          >
            {@html renderInlineMarkup(header)}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr class="odd:bg-slate-900 even:bg-slate-800 hover:bg-slate-700 transition">
          {#each row as cell, j}
            <td
              class={`px-3 py-2 border-b border-slate-700 ${
                j > 0 ? 'text-center' : 'text-left'
              }`}
            >
              {@html renderInlineMarkup(cell)}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

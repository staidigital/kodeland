<script lang="ts">
  import { tick } from 'svelte';
  import type { Block } from '$lib/utils/editor/types';

  export let blockType: Block['type'];
  export let currentBlock: Block;
  export let insertMarkup: (start: string, end: string) => void;
  export let textareaRef: HTMLTextAreaElement;
  export let editingIndex: number | null;

  // 🆕 callback prop
  export let onSubmit: () => void;

  $: paragraphBlock = blockType === 'paragraph' ? currentBlock as { type: 'paragraph'; text: string } : null;
  $: codeBlock = blockType === 'code' ? currentBlock as { type: 'code'; code: string; language: string; interactive: boolean } : null;
  $: imageBlock = blockType === 'image' ? currentBlock as { type: 'image'; src: string; alt: string; caption: string } : null;

  function handleClick() {
    onSubmit(); // 🔁 direkte kall i stedet for dispatch
  }
</script>

{#if paragraphBlock}
  <div class="flex flex-wrap gap-2 text-xs font-mono mb-2">
    <button on:click={() => insertMarkup('**', '**')} title="Fet" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">🅑</button>
    <button on:click={() => insertMarkup('_', '_')} title="Kursiv" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">𝑖</button>
    <button on:click={() => insertMarkup('`', '`')} title="Kode" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">💻</button>
    <button on:click={() => insertMarkup('~~', '~~')} title="Gjennomstreket" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">✂️</button>
    <button on:click={() => insertMarkup('[', '](url)')} title="Lenke" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">🔗</button>
    <button on:click={() => insertMarkup('[img:', ']')} title="Inline bilde" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">🖼️</button>
    <button on:click={() => insertMarkup('^^', '^^')} title="Rød tekst" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">🔴</button>
    <button on:click={() => insertMarkup('%%', '%%')} title="Sitatboks" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">💬</button>
    <button on:click={() => insertMarkup('* ', '')} title="Punktliste" class="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600">📋</button>
    <button on:click={() => insertMarkup('==', '==')} title="Markert tekst" class="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400">🖍️</button>
    <button on:click={() => insertMarkup('!!', '!!')} title="Advarsel" class="bg-red-600 px-2 py-1 rounded hover:bg-red-500 text-white">⚠️</button>
    <button on:click={() => insertMarkup('::', '::')} title="Hint" class="bg-slate-600 px-2 py-1 rounded hover:bg-slate-500">💡</button>
    <button on:click={() => insertMarkup('^^^', '^^^')} title="Infoboks" class="bg-blue-700 px-2 py-1 rounded hover:bg-blue-600 text-white">ℹ️</button>
    <button on:click={() => insertMarkup('[btn:', '](url)')} title="Knapp" class="bg-fuchsia-700 px-2 py-1 rounded hover:bg-fuchsia-600 text-white">🔘</button>
    <button on:click={() => insertMarkup('//', '')} title="Kommentar" class="bg-slate-500 px-2 py-1 rounded hover:bg-slate-400">💭</button>
  </div>
  <textarea
    bind:this={textareaRef}
    bind:value={paragraphBlock.text}
    placeholder="Skriv inn tekst…"
    class="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-sm text-white placeholder-slate-400 h-24"
  ></textarea>
{/if}

{#if codeBlock}
  <textarea
    bind:value={codeBlock.code}
    placeholder="Skriv kode her…"
    class="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-sm text-white placeholder-slate-400 h-32 font-mono"
  ></textarea>
  <div class="flex items-center gap-4">
    <label class="text-sm">Språk:
      <input
        bind:value={codeBlock.language}
        class="bg-slate-700 text-white px-2 py-1 rounded text-sm border border-slate-600"
      />
    </label>
    <label class="text-sm flex items-center gap-1">
      <input type="checkbox" bind:checked={codeBlock.interactive} />
      Interaktiv
    </label>
  </div>
{/if}

{#if imageBlock}
  <input bind:value={imageBlock.src} placeholder="Bilde-URL" class="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-sm text-white" />
  <input bind:value={imageBlock.alt} placeholder="Alt-tekst" class="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-sm text-white" />
  <input bind:value={imageBlock.caption} placeholder="Bildetekst" class="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-sm text-white" />
{/if}

<button
  on:click={handleClick}
  class="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded font-mono text-sm w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {editingIndex !== null ? '✏️ Oppdater blokk' : '➕ Legg til blokk'}
</button>

<script lang="ts">
  import Overskrift from '$lib/components/overskrift.svelte';
  import BlockRenderer from '$lib/components/jensComps/BlockRenderer.svelte';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let sections: Array<{
    id?: string;
    title?: string;
    collapsible?: boolean;
    blocks: Array<{ type: string; [key: string]: any }>;
  }> = [];

  export let nextPart: string = '';
  export let prevPart: string = '';
  export let sectionTitle: string = '';

  // Hvilke seksjoner som er åpne
  let openSections: Record<string, boolean> = {};

  // Les fra localStorage ved oppstart
  onMount(() => {
    const saved = localStorage.getItem('openSections');
    if (saved) {
      openSections = JSON.parse(saved);
    }
  });

  // Toggle en seksjon og lagre til localStorage
  function toggleSection(id?: string) {
    if (!id) return;
    openSections[id] = !openSections[id];
    localStorage.setItem('openSections', JSON.stringify(openSections));
  }
</script>

<header class="flex flex-col justify-center lg:pt-40 pt-10 pb-10">
  <h1 class="text-3xl font-mono text-fuchsia-300">{sectionTitle}</h1>
</header>

{#each sections as section}
  <article id={section.id} class="py-8 border-t border-slate-700 space-y-6">
    {#if section.title && section.title !== sectionTitle}
      {#if section.collapsible}
        <div
          class="flex items-center justify-between cursor-pointer select-none"
          on:click={() => toggleSection(section.id)}
        >
          <Overskrift text={section.title} />
          <span class="text-fuchsia-400 text-sm">
            {openSections[section.id ?? ''] ? '▲ Skjul' : '▼ Vis mer'}
          </span>
        </div>
      {:else}
        <Overskrift text={section.title} />
      {/if}
    {/if}

    {#if !section.collapsible || openSections[section.id ?? '']}
      <div transition:slide>
        {#each section.blocks as block}
          <BlockRenderer {block} />
        {/each}
      </div>
    {/if}
  </article>
{/each}

{#if prevPart || nextPart}
  <div class="mt-16 flex justify-between">
    {#if prevPart}
      <a
        href={prevPart}
        class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded font-mono shadow"
      >
        &larr; Forrige del
      </a>
    {/if}
    {#if nextPart}
      <a
        href={nextPart}
        class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded font-mono shadow"
      >
        Neste del &rarr;
      </a>
    {/if}
  </div>
{/if}

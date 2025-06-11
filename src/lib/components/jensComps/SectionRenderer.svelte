<script lang="ts">
  import Overskrift from '$lib/components/overskrift.svelte';
  import BlockRenderer from '$lib/components/jensComps/BlockRenderer.svelte';

  // export let courseTitle: string = 'Course';
  export let sections: Array<{
    id?: string;
    title?: string;
    blocks: Array<{ type: string; [key: string]: any }>;
  }> = [];

  export let nextPart: string = '';
  export let prevPart: string = '';
  export let sectionTitle: string = '';
  
  function containsSandbox(blocks: Array<{ type: string }>) {
    return blocks.some(b => b.type === 'sandbox');
  }


  function anySandbox(sections: Array<{ blocks?: Array<{ type: string }> }>) {
    return sections?.some(section =>
      section.blocks?.some(block => block.type === 'sandbox')
    );
  }


</script>

{#if !anySandbox(sections)}
  <header class="flex flex-col justify-center lg:pt-40 pt-10 pb-10">
    <h1 class="text-3xl font-mono text-fuchsia-300">{sectionTitle}</h1>
  </header>
{/if}


{#each sections as section}
  <article id={section.id} class="py-8 border-t border-slate-700 space-y-6">
    {#if section.title && section.title !== sectionTitle && !containsSandbox(section.blocks)}
      <Overskrift text={section.title} />
    {/if}
    {#each section.blocks as block}
      <BlockRenderer {block} />
    {/each}
  </article>
{/each}

{#if !anySandbox(sections)}
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
{/if}

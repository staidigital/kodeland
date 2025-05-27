<script>
  import Overskrift from '$lib/components/overskrift.svelte';
  import BlockRenderer from '$lib/components/jensComps/BlockRenderer.svelte';

  export let courseTitle = 'Course';
  export let sections = [];
  export let nextPart = '';
  export let prevPart = '';
</script>

<header class="flex flex-col justify-center lg:pt-40 pt-10 pb-10">
  <h1 class="text-3xl font-mono text-fuchsia-300">{courseTitle}</h1>
</header>

{#each sections ?? [] as section}
  <article id={section.id} class="py-8 border-t border-slate-700 space-y-6">
    <Overskrift text={section.title} />
    {#each section.blocks ?? [] as block}
      <BlockRenderer {block} />
    {/each}
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

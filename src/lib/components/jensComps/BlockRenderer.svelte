<script lang="ts">
  import BlockParagraph from "$lib/components/jensComps/blocks/BlockParagraph.svelte";
  import BlockCode from "$lib/components/jensComps/blocks/BlockCode.svelte";
  import BlockInteractive from "$lib/components/jensComps/blocks/BlockInteractive.svelte";
  import BlockTask from "$lib/components/jensComps/blocks/BlockTask.svelte";
  import BlockHTMLPreview from "$lib/components/jensComps/blocks/BlockHTMLPreview.svelte";
  import BlockSandbox from "$lib/components/jensComps/blocks/BlockSandbox.svelte";
  // import BlockSandboxTest from "$lib/components/jensComps/blocks/BlockSandboxTest.svelte";
  import BlockTable from "$lib/components/jensComps/blocks/BlockTable.svelte";

  import { renderInlineMarkup } from '$lib/utils/markup';
  import SqlPlaygroundPokemon from '$lib/components/jensComps/sql/SqlPlaygroundPokemon.svelte';
  import PokemonTablePreview from '$lib/components/jensComps/sql/TablePreview.svelte';
  import BlockTextWithImage from "$lib/components/jensComps/blocks/BlockTextWithImage.svelte";
  import BlockImage from '$lib/components/jensComps/blocks/BlockImage.svelte';

  export let block: Record<string, any>;
</script>

{#if block.type === 'paragraph'}
  <BlockParagraph text={block.text} subtitle={block.subtitle} />

{:else if block.type === 'list'}
  <ul class="list-disc list-inside text-slate-100 text-md leading-relaxed mb-4 ml-5">
    {#each block.items ?? [] as item}
      <li>{@html renderInlineMarkup(item)}</li>
    {/each}
  </ul>
{:else if block.type === 'list-ol'}
  <ol class="list-decimal list-inside text-slate-100 leading-relaxed  mb-4">
    {#each block.items ?? [] as item}
      <li>{@html renderInlineMarkup(item)}</li>
    {/each}
  </ol>
  {:else if block.type === 'code'}
  {#if block.interactive === true && block.language === 'javascript'}
    {@html `<script>console.log('BlockInteractive vises')</script>`}
    <BlockInteractive code={block.code} />

  {:else if block.preview === true && block.language === 'html'}
    {@html `<script>console.log('BlockHTMLPreview vises')</script>`}
    <BlockHTMLPreview html={block.code} js={block.script ?? ""} />

  {:else}
    {@html `<script>console.log('Vanlig BlockCode vises')</script>`}
    <BlockCode code={block.code} language={block.language} preview={block.preview ?? false} />
  {/if}


{:else if block.type === 'task'}
  <BlockTask
    number={block.number}
    title={block.title}
    description={block.description}
    solution={block.solution}
    code={block.code}
  />

{:else if block.type === 'sandbox'}
    <div class="fixed inset-0 top-[8rem] lg:top-20 lg:left-1/5 p-2 sm:p-4 overflow-auto bg-slate-900 text-white z-0">
      <BlockSandbox />
    </div>

  

{:else if block.type === 'custom' && block.component === 'SqlPlaygroundPokemon'}
  <SqlPlaygroundPokemon />

{:else if block.type === 'custom' && block.component === 'PokemonTablePreview'}
  <PokemonTablePreview />

{:else if block.type === 'image' && block.component === 'BlockImage'}
  <BlockImage {...block.props} />

{:else if block.type === 'textwithimage'}
  {#if block.component === 'BlockTextWithImage'}
    <BlockTextWithImage {...block.props} />
  {/if}
{:else if block.type === 'table'}
  <BlockTable headers={block.headers} rows={block.rows} />
{/if}

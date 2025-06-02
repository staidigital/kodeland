<script lang="ts">
  import BlockParagraph from "$lib/components/jensComps/blocks/BlockParagraph.svelte";
  import BlockCode from "$lib/components/jensComps/blocks/BlockCode.svelte";
  import BlockInteractive from "$lib/components/jensComps/blocks/BlockInteractive.svelte";
  import BlockTask from "$lib/components/jensComps/blocks/BlockTask.svelte";
  import BlockHTMLPreview from "$lib/components/jensComps/blocks/BlockHTMLPreview.svelte";
  import BlockSandbox from "$lib/components/jensComps/blocks/BlockSandbox.svelte";
  import { renderInlineMarkup } from '$lib/utils/markup.js';
  import SqlPlaygroundPokemon from '$lib/components/jensComps/sql/SqlPlaygroundPokemon.svelte';
  import PokemonTablePreview from '$lib/components/jensComps/sql/TablePreview.svelte';
  import BlockTextWithImage from "$lib/components/jensComps/blocks/BlockTextWithImage.svelte";
  import BlockImage from '$lib/components/jensComps/blocks/BlockImage.svelte';

  export let block: Record<string, any>;
</script>

{#if block.type === 'paragraph'}
  <BlockParagraph text={block.text} />

{:else if block.type === 'list'}
  <ul class="list-disc list-inside text-slate-100 leading-relaxed mb-4">
    {#each block.items ?? [] as item}
      <li>{@html renderInlineMarkup(item)}</li>
    {/each}
  </ul>

{:else if block.type === 'code'}
  {#if block.language === 'javascript'}
    <BlockInteractive code={block.code} />
  {:else if block.language === 'html'}
    <BlockCode code={block.code} language={block.language} preview={false} />
    <BlockHTMLPreview html={block.code} js={block.script ?? ""} />
  {:else}
    <BlockCode code={block.code} language={block.language} preview={true} />
  {/if}

{:else if block.type === 'task'}
  <BlockTask
    number={block.number}
    title={block.title}
    description={block.description}
    solution={block.solution}
  />

{:else if block.type === 'sandbox'}
  <BlockSandbox />

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
{/if}

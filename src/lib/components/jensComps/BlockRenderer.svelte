<script>
  import BlockParagraph from "$lib/components/jensComps/blocks/BlockParagraph.svelte";
  import CodeSnippet from "$lib/components/codeSnippet.svelte";
  import BlockInteractive from "$lib/components/jensComps/blocks/BlockInteractive.svelte";
  import BlockTask from "$lib/components/jensComps/blocks/BlockTask.svelte";
  import BlockHTMLPreview from "$lib/components/jensComps/blocks/BlockHTMLPreview.svelte";
  import { renderInlineMarkup } from '$lib/utils/markup.js';

  export let block;
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
    <CodeSnippet code={block.code} preview={false} />
    <BlockHTMLPreview html={block.code} js={block.script ?? ""} />
  {:else}
    <CodeSnippet code={block.code} preview={true} />
  {/if}

{:else if block.type === 'task'}
  <BlockTask
    number={block.number}
    title={block.title}
    description={block.description}
    solution={block.solution}
/>
{/if}

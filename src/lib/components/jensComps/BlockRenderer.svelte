<script>
  import Avsnitt from "$lib/components/avsnitt.svelte";
  import CodeSnippet from "$lib/components/codeSnippet.svelte";
  import InteractiveSnippet from "$lib/components/jensComps/interactiveSnippet.svelte";
  import Oppgave from "$lib/components/jensComps/oppgave.svelte";
  import LiveHTMLPreview from "$lib/components/jensComps/LiveHTMLPreview.svelte";

  export let block;

  function renderInlineCode(str) {
    const escaped = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return escaped.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>');
  }
</script>

{#if block.type === 'paragraph'}
  <Avsnitt text={block.text} />

{:else if block.type === 'list'}
  <ul class="list-disc list-inside text-slate-100 leading-relaxed mb-4">
    {#each block.items ?? [] as item}
      <li>{@html renderInlineCode(item)}</li>
    {/each}
  </ul>

{:else if block.type === 'code'}
  {#if block.language === 'javascript'}
    <InteractiveSnippet code={block.code} />
  {:else if block.language === 'html'}
  <CodeSnippet code={block.code} preview={false} />
  <LiveHTMLPreview html={block.code} js={block.script ?? ""} />
  {:else}
    <CodeSnippet code={block.code} preview={true} />
  {/if}

{:else if block.type === 'task'}
  <Oppgave
    number={block.number}
    title={block.title}
    description={block.description}
    code={block.code}
  />
{/if}

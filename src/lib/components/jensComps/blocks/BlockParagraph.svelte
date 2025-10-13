<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup';

  export let text: string = '';
  export let subtitle: string = '';

  // Safely render markup only if text/subtitle exist
  $: parsedText = text ? renderInlineMarkup(text) : '';
  $: parsedSubtitle = subtitle ? renderInlineMarkup(subtitle) : '';
</script>

<div class="mb-4">
  {#if subtitle}
    <h3 class="markup-text text-slate-200 text-xl mb-2 mt-6">{@html parsedSubtitle}</h3>
  {/if}
  <p class="markup-text text-slate-200">{@html parsedText}</p>
</div>

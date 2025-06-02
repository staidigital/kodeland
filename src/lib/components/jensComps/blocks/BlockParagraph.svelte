<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup.js';

  export let text: string = '';

  $: parsedText = renderInlineMarkup(text);
</script>

<div class="text-container">
  <span class="text-slate-100 mb-10">{@html parsedText}</span>
</div>

<style>
  .text-container {
    margin-bottom: 10px;
  }
</style>

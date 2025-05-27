<script>
  export let image;
  export let alt = '';
  export let text = '';
  export let position = 'right'; // 'left' eller 'right'
  export let width = 'w-40';

  import { renderInlineMarkup } from '$lib/utils/markup.js';

  $: parsedText = renderInlineMarkup(text);
</script>


<div class={`flex flex-col lg:flex-row ${position === 'right' ? 'lg:flex-row-reverse' : ''} gap-6 lg:gap-12`}>
  <!-- Image -->
  <div class="flex items-center justify-center">
    <img
        src={image}
        alt={alt}
        class={`block align-middle h-auto w-32 sm:w-40 md:w-48 lg:w-60 ${width}`}
        />
  </div>

  <!-- Text -->
  <div class="flex items-center">
        <p class="text-slate-100 text-base leading-relaxed w-full lg:max-w-prose">
      {@html parsedText}
    </p>
  </div>
</div>

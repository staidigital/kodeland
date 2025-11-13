<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup';

  type ContentItem =
    | { type: 'text'; value: string }
    | { type: 'images'; value: { src: string; alt?: string }[] };

  export let content: ContentItem[] = [];
  export let icon: 'info' | 'example' | 'keyboard' = 'info';

  const parse = (text: string) => renderInlineMarkup(text);

  const iconIsExample = icon === 'example';
  const iconIsKeyboard = icon === 'keyboard';

  const iconClass = iconIsExample
    ? 'text-fuchsia-400'
    : iconIsKeyboard
    ? 'text-emerald-400'
    : 'text-blue-400';

  const boxClass = iconIsExample
    ? 'border-fuchsia-700'
    : iconIsKeyboard
    ? 'border-emerald-700'
    : 'border-slate-600';
</script>

<div class="relative my-4 flex flex-col lg:block">
  <!-- Ikon -->
  <div class="flex justify-start mb-2 lg:mb-0 lg:absolute lg:-left-8 top-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`w-6 h-6 ${iconClass} shrink-0`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {#if iconIsExample}
        <!-- Example ikon -->
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 3a6 6 0 00-3 11.32V17a1 1 0 001 1h4a1 1 0 001-1v-2.68A6 6 0 0012 3zM9 21h6"
        />
      {:else if iconIsKeyboard}
        <!-- Keyboard ikon -->
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z
             M6 9h2m2 0h2m2 0h2m-8 3h8"
        />
      {:else}
        <!-- Info ikon -->
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
        />
      {/if}
    </svg>
  </div>

  <!-- Innholdsboks -->
  <div
    class={`bg-slate-800/60 border ${boxClass} text-slate-100 p-4 rounded-lg text-md space-y-3 leading-relaxed lg:pl-8`}
  >
    {#each content as item}
      {#if item.type === 'text'}
        <p class="markup-text">
          {@html parse(item.value)}
        </p>

      {:else if item.type === 'images'}
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {#each item.value as img}
            <div class="flex justify-center items-center p-1 bg-slate-900/40 rounded-md">
              <img
                src={img.src}
                alt={img.alt ?? ''}
                class="max-h-14 w-auto object-contain"
                loading="lazy"
              />
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>

<script lang="ts">
  import { renderInlineMarkup } from '$lib/utils/markup';

  type ContentItem =
    | { type: 'text'; value: string }
    | { type: 'images'; value: { src: string; alt?: string }[] };

  export let content: ContentItem[] = [];
  export let icon: 'info' | 'example' = 'info';

  const parse = (text: string) => renderInlineMarkup(text);
</script>

<div
  class={`bg-slate-800/60 border text-slate-100 p-3 rounded-lg text-md my-3 flex items-start gap-3
    ${icon === 'example' ? 'border-fuchsia-700' : 'border-slate-600'}`}
>
  <!-- Ikon -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={`w-5 h-5 mt-0.5 shrink-0 ${
      icon === 'example' ? 'text-fuchsia-400' : 'text-blue-400'
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {#if icon === 'example'}
      <!-- Lyspære -->
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3a6 6 0 00-3 11.32V17a1 1 0 001 1h4a1 1 0 001-1v-2.68A6 6 0 0012 3zM9 21h6"
      />
    {:else}
      <!-- Standard info -->
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
      />
    {/if}
  </svg>

  <!-- Innhold -->
  <div class="flex-1 space-y-3">
    {#each content as item}
      {#if item.type === 'text'}
        <p class="markup-text text-md text-slate-100 leading-relaxed">
          {@html parse(item.value)}
        </p>
      {:else if item.type === 'images'}
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {#each item.value as img}
            <div class="flex justify-center items-center p-1 bg-slate-900/40 rounded-md">
              <img
                src={img.src}
                alt={img.alt ?? ''}
                class="max-h-14 w-auto object-contain rounded-sm"
                loading="lazy"
              />
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>

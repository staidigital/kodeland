<script context="module" lang="ts">
  export interface ImageItem {
    src: string;
    alt: string;
    caption?: string;
  }
</script>
<script lang="ts">

  export let images: ImageItem[] = [];
</script>

<div
  class="my-8 grid gap-6 justify-items-center items-center"
  class:grid-cols-1={images.length === 1}
  class:sm:grid-cols-2={images.length === 2}
  class:md:grid-cols-3={images.length >= 3}
>
  {#each images as image}
    <div class="flex flex-col items-center text-center">
      <img
        src={image.src}
        alt={image.alt}
        class="rounded shadow h-auto object-contain w-20 sm:w-24 md:w-32 lg:w-40"
      />
      {#if image.caption}
        <div class="text-sm text-slate-400 italic mt-2">
          {image.caption}
        </div>
      {/if}
    </div>
  {/each}
</div>

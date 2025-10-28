<script context="module" lang="ts">
  export interface ImageItem {
    src: string;
    alt: string;
    caption?: string;
    fullWidth?: boolean;
    width?: string; // Eks: "200px", "50%", "auto"
    align?: 'left' | 'center' | 'right'; // Justering
    rounded?: boolean; // Skal bildet ha avrundede hjørner?
    shadow?: boolean; // Skal bildet ha skygge?
    border?: boolean; // Skal bildet ha kant?
    background?: string; // Eks: "white", "#fff", "black", "transparent"
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
    <div
      class={`flex flex-col items-center text-center ${
        image.align === 'left'
          ? 'items-start text-left'
          : image.align === 'right'
          ? 'items-end text-right'
          : 'items-center text-center'
      }`}
    >
      <div
        class={`flex justify-center items-center ${
          image.rounded !== false ? 'rounded-lg' : ''
        } ${image.shadow ? 'shadow-lg' : ''} ${image.border ? 'border border-slate-600' : ''}`}
        style={`background: ${image.background ?? 'transparent'}; padding: 0.5rem; width: ${image.width ?? (image.fullWidth ? '100%' : 'auto')};`}
      >
        <img
          src={image.src}
          alt={image.alt}
          class={`object-contain h-auto ${image.rounded !== false ? 'rounded' : ''}`}
          style="width: 100%; height: auto;"
        />
      </div>

      {#if image.caption}
        <div class="text-sm text-slate-400 italic mt-2">
          {image.caption}
        </div>
      {/if}
    </div>
  {/each}
</div>

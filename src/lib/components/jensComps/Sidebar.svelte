<script lang="ts">
  import { page } from '$app/stores';

  interface SectionLink {
    text: string;
    anchor: string;
  }

  interface Section {
    id: string;
    title: string;
    links?: SectionLink[];
  }

  export let sections: Section[] = [];
  export let courseId: string = 'javascript';
  let screenSize: number;
  let menuOpen: boolean = false;
</script>

<svelte:window bind:innerWidth={screenSize} />

<aside class="lg:w-1/5 w-full bg-slate-700 lg:pt-40 sticky top-0 overflow-y-auto z-10">

  <!-- Mobile Hamburger Menu -->
  {#if screenSize < 1024}
    <div class="w-full h-20 flex justify-end">
      <button
        on:click={() => (menuOpen = !menuOpen)}
        class="p-4 w-20 h-full flex flex-col justify-between"
        aria-label="Toggle navigation menu"
      >
        <div class="w-full h-1.5 bg-slate-200"></div>
        <div class="w-full h-1.5 bg-slate-200"></div>
        <div class="w-full h-1.5 bg-slate-200"></div>
      </button>

    </div>
  {/if}

  <!-- Sidebar Menu -->
  {#if menuOpen || screenSize >= 1024}
    <div class="p-8">
      <div class="text-xl font-bold text-white mb-8 tracking-wide">
        <slot name="title"><span class="hover:text-fuchsia-400 transition">Kurs</span></slot>
      </div>

      {#each sections as part}
        <div class="mb-6">
          <a
            href={`/${courseId}/${part.id}`}
            class={`text-sm font-semibold uppercase tracking-wide mb-2 block transition
              ${$page.url.pathname === `/${courseId}/${part.id}` ? 'text-yellow-400' : 'text-slate-200 hover:text-fuchsia-400'}`}
          >
            {part.title}
          </a>

          {#if $page.url.pathname.startsWith(`/${courseId}/${part.id}`) && part.links?.length}
            <ul class="space-y-1 list-outside pl-5">
              {#each part.links as item}
                <li>
                  <a
                    href={`/${courseId}/${part.id}${item.anchor}`}
                    class="text-white hover:text-fuchsia-400 transition px-1 py-0.5 block"
                  >
                    {item.text}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</aside>

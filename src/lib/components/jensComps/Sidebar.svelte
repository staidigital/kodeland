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
  export let title: string = 'Innhold';
  export let sections: Section[] = [];
  export let courseId: string = 'javascript';
  let screenSize: number;
  let menuOpen: boolean = false;
</script>

<svelte:window bind:innerWidth={screenSize} />

<aside class="lg:w-1/5 w-full bg-slate-800/90 lg:pt-32 shadow-xl z-20">
  {#if screenSize < 1024}
    <div class="w-full h-20 flex justify-end bg-slate-900/80 border-b border-fuchsia-900">
      <button
        aria-label="Åpne eller lukk meny"
        on:click={() => (menuOpen = !menuOpen)}
        class="p-4 w-20 h-full flex flex-col justify-between"
      >
        <div class="w-full h-1.5 bg-fuchsia-300 rounded"></div>
        <div class="w-full h-1.5 bg-fuchsia-300 rounded"></div>
        <div class="w-full h-1.5 bg-fuchsia-300 rounded"></div>
      </button>
    </div>
  {/if}

  {#if menuOpen || screenSize >= 1024}
    <nav class="menu flex flex-col gap-4 p-8 lg:fixed">
      
      <div class="text-fuchsia-300 font-bold text-lg mb-2 tracking-wide break-words">
        <a href={`/${courseId}`} class="hover:text-fuchsia-400">{title}</a>
      </div>


      {#each sections as section}
        <div class="mb-2">
          <a
            href={`/${courseId}/${section.id}`}
            class={`text-sm font-semibold tracking-wide block transition
              ${$page.url.pathname === `/${courseId}/${section.id}` ? 'text-yellow-400' : 'text-slate-200 hover:text-fuchsia-400'}`}
          >
            {section.title}
          </a>

          {#if $page.url.pathname.startsWith(`/${courseId}/${section.id}`) && section.links?.length}
            <ul class="space-y-1 list-outside pl-3 mt-1">
              {#each section.links as item}
                <li>
                  <a
                    href={`/${courseId}/${section.id}${item.anchor}`}
                    class="text-white hover:text-fuchsia-400 transition px-1 py-0.5 block text-sm"
                  >
                    {item.text}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </nav>
  {/if}
</aside>

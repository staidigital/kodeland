<script>
  import { page } from '$app/stores';
  import manifest from '$lib/data/javascript/manifest.js';
  export const sections = []
</script>

<aside class="lg:w-1/5 w-full bg-slate-700 lg:pt-40 sticky top-0 h-screen overflow-y-auto">
  <div class="p-8">
    <div class="text-xl font-bold text-white mb-8 tracking-wide">
      <a href="/javascript" class="hover:text-fuchsia-400 transition">JavaScript 101</a>
    </div>

    {#each manifest as part}
      <div class="mb-6">
        <a
          href={`/javascript/${part.id}`}
          class={`text-sm font-semibold uppercase tracking-wide mb-2 block transition
            ${$page.url.pathname === `/javascript/${part.id}` ? 'text-yellow-400' : 'text-slate-200 hover:text-fuchsia-400'}`}
        >
          {part.title}
        </a>

        {#if $page.url.pathname.startsWith(`/javascript/${part.id}`) && part.links?.length}
          <ul class="space-y-1 list-outside pl-5">
            {#each part.links as item}
              <li>
                <a
                  href={`/javascript/${part.id}${item.anchor}`}
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
</aside>

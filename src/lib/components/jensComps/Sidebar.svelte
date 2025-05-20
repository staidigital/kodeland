<script>
  import { page } from '$app/stores';

  const sidebarParts = [
    {
      title: 'Del 1: Variabler',
      href: '/javascript/part1',
      links: [
        { text: 'Teori', link: '/javascript/part1' },
        { text: 'Oppgaver', link: '/javascript/part1#sectionTasks' }
      ]
    },
    {
      title: 'Del 2: Boolske verdier',
      href: '/javascript/part2',
      links: [
        { text: 'Teori', link: '/javascript/part2' },
        { text: 'Oppgaver', link: '/javascript/part2#sectionTasks' }

      ]
    },
    {
      title: 'Del 3: Datatyper og lister',
      href: '/javascript/part3',
      links: [
        { text: 'Teori', link: '/javascript/part3'},
        { text: 'Oppgaver', link: '/javascript/part3#sectionTasks' }

      ]
    },
    {
      title: 'Del 4: Løkker',
      href: '/javascript/part4',
      links: [
        { text: 'Teori', link: '/javascript/part4'},
        { text: 'Oppgaver', link: '/javascript/part4#sectionTasks' }

      ]
    },
    {
      title: 'Del 5: Funksjoner',
      href: '/javascript/part5',
      links: [
        { text: 'Teori', link: '/javascript/part5'},
        { text: 'Oppgaver', link: '/javascript/part5#sectionTasks' }

      ]
    },
    {
      title: 'Del 6: DOM elementer',
      href: '/javascript/part6',
      links: [
        { text: 'Teori', link: '/javascript/part6'},
        { text: 'Oppgaver', link: '/javascript/part6#sectionTasks' }

      ]
    },
    {
      title: 'Del 7: Flere Selectors',
      href: '/javascript/part7',
      links: [
        { text: 'Teori', link: '/javascript/part7'},
        { text: 'Oppgaver', link: '/javascript/part7#sectionTasks' }

      ]
    },

    {
      title: 'Del 8: Mouse Events',
      href: '/javascript/part8',
      links: [
        { text: 'Teori', link: '/javascript/part8'},
        { text: 'Oppgaver', link: '/javascript/part8#sectionTasks' }

      ]
    },

    {
      title: 'Del 9: Bonusoppgaver',
      href: '/javascript/part9',
      links: []
    }
  ];
</script>


<aside class="lg:w-1/5 w-full bg-slate-700 lg:pt-40 sticky top-0 h-screen overflow-y-auto">
  <div class="p-8">
    <div class="text-xl font-bold text-white mb-8 tracking-wide">
      <a href="/javascript" class="hover:text-fuchsia-400 transition">JavaScript 101</a>
    </div>

    {#each sidebarParts as part}
      <div class="mb-6">
        {#if part.href}
          <a
            href={part.href}
            class={`text-sm font-semibold uppercase tracking-wide mb-2 block transition
              ${$page.url.pathname === part.href ? 'text-yellow-400' : 'text-slate-200 hover:text-fuchsia-400'}`}
          >
            {part.title}
          </a>
        {:else}
          <span class="text-sm font-semibold uppercase tracking-wide text-slate-500 block opacity-70 ">
            {part.title}
          </span>
        {/if}

        {#if part.href && $page.url.pathname.startsWith(part.href) && part.links.length}
          <ul class="space-y-1 list-outside pl-5">
            {#each part.links as item}
              <li>
                <a
                    href={item.link}
                    class="text-white hover:text-fuchsia-400 transition px-1 py-0.5 block"
                >
                    {item.text}
                </a>
            </li>
            {/each}
          </ul>
        {:else if part.comingSoon}
          <div class="text-slate-500 text-sm ml-4">(kommer senere)</div>
        {/if}
      </div>
    {/each}
  </div>
</aside>

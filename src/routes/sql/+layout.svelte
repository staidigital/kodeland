<script>
  import Sidebar from '$lib/components/jensComps/Sidebar.svelte';
  import sqlCourseSections from '$lib/data/sql/manifest.js';
</script>

<main class="flex lg:flex-row flex-col bg-slate-900 text-slate-100">
  <Sidebar sections={sqlCourseSections}>
    <span slot="title"><a href="/sql">SQL 101</a></span>
  </Sidebar>

  <section class="lg:px-40 px-5 lg:w-4/5 w-full pb-40">
    <slot />
  </section>
</main>

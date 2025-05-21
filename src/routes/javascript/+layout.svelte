<script>
  import Sidebar from '$lib/components/jensComps/Sidebar.svelte';
  import jsCourseSections from '$lib/data/javascript/manifest.js';

  
</script>

<main class="flex lg:flex-row flex-col bg-slate-900 text-slate-100">
  <Sidebar sections = {jsCourseSections}/>

  <section class="lg:px-40 px-5 lg:w-4/5 w-full pb-40">
    <slot />
  </section>
</main>

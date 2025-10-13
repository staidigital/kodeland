<script lang="ts">
  import Sidebar from '$lib/components/jensComps/Sidebar.svelte';
  import sqlCourseSections from '$lib/data/sql/manifest';
  import type { Section } from '$lib/types/course';

</script>

<main class="flex lg:flex-row flex-col bg-slate-900 text-slate-100">
 

  <section class="lg:px-30 px-5 w-full pb-40 min-h-screen">
    <slot />
  </section>
</main>

<!-- <style>
  .markup-text code,
  .markup-text strong,
  .markup-text em {
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
  }
</style> -->
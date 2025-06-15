<script lang="ts">
  import Sidebar from '$lib/components/jensComps/Sidebar.svelte';
  import { jsCourseSections } from '$lib/data/javascript/manifest';
  import type { Section } from '$lib/types/course';
</script>

<main class="flex lg:flex-row flex-col bg-slate-900 text-slate-100">
  <Sidebar 
  title="JavaScript 101" 
  courseId = "javascript"
  sections={jsCourseSections as Section[]}>
  </Sidebar>

  <section class="lg:px-30 px-5 lg:w-4/5 w-full pb-40 min-h-screen">
    <slot />
  </section>
</main>

<style>
  .markup-text code,
  .markup-text strong,
  .markup-text em {
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
  }
</style>

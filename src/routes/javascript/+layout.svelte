<script>
  import Sidebar from '$lib/components/jensComps/Sidebar.svelte';
</script>

<main class="flex lg:flex-row flex-col bg-slate-900 text-slate-100">
  <Sidebar />

  <section class="lg:px-40 px-5 lg:w-4/5 w-full pb-40">
    <slot />
  </section>
</main>

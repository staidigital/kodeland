<script>
  import SectionRenderer from '$lib/components/jensComps/SectionRenderer.svelte';
  export let data;
</script>

<SectionRenderer
  sectionTitle={data.sectionTitle}
  sections={data.sections}
  nextPart={data.nextPart}
  prevPart={data.prevPart}
  
/>

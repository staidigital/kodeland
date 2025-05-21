<script>
  import SectionRenderer from '$lib/components/jensComps/SectionRenderer.svelte';
  export let data;
</script>

<SectionRenderer
  courseTitle="JavaScript 101"
  sections={data.sections}
  nextPart={data.nextPart}
  prevPart={data.prevPart}
/>

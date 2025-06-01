<script lang="ts">
    export let text: string;
    export let link: string;
</script>

<div class="mb-2">
    <a href={link} class="text-slate-100 text-base hover:text-[#ff79c6]">{@html text}</a>
</div>

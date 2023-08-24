<script>
    export let code;
    let show = false;
</script>

<div on:click={() => show = !show} class="flex cursor-pointer flex-col justify-center items-center bg-slate-700 hover:bg-red-900 p-5">
    <span class="text-fuchsia-200 font-mono">Forhåndsvisning</span>
</div>

{#if show}
    <div class="container bg-slate-100 p-20">{@html code}</div>
{/if}
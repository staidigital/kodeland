<script lang="ts">
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
    import css from "svelte-highlight/languages/css";
    import agate from "svelte-highlight/styles/agate";
    export let preview: boolean = false;
    export let code: string;
    export let language: string = "xml";

    let show: boolean = false;
    const lowerLang = () => language.toLowerCase();
</script>

<svelte:head>
    {@html agate}
</svelte:head>
<div class="py-10">
    {#if lowerLang() == "xml"}
    <Highlight language={xml} {code} />
    {/if}
    {#if lowerLang() == "css"}
    <Highlight language={css} {code} />
    {/if}
    {#if preview}
        <div on:click={() => show = !show} class="flex cursor-pointer flex-col justify-center items-center bg-slate-700 hover:bg-red-900 p-2">
            <span class="text-fuchsia-200 font-mono">Forhåndsvisning</span>
        </div>
        {#if show}
            <div class="container bg-slate-100 pb-10">
                <div class="prose prose-lg">{@html code}</div>
            </div>
        {/if}
    {/if}
</div>

<style>

</style>



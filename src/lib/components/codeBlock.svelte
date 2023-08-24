<script>
    import Highlight from "svelte-highlight";
    import vbscriptHtml from "svelte-highlight/languages/vbscript-html";
    import dracula from "svelte-highlight/styles/dracula";
    export let code;
</script>
<svelte:head>   
    {@html dracula}
</svelte:head>
<div class="bg-slate-950">
    <Highlight language={vbscriptHtml} code={code} />
</div>
<script>
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import github from "svelte-highlight/styles/github";
    export let code = "let name = 'Sondre';";
    let show = false;
</script>

<svelte:head>
    {@html github}
</svelte:head>

<Highlight language={typescript} {code} />  
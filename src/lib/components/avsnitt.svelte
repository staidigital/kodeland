<script>
    export let text;
    import CodeSnippet from "./codeSnippet.svelte";

    $: parsedText = text.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>');

</script>

<div class="text-container">
    <span class="text-slate-100 mb-10">{@html parsedText}</span>
</div>

<style>
.lenke{
    color: #ff79c6;
}
.text-container{
    margin-bottom: 10px;
}
</style>
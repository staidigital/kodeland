<script>
    export let text;
    import CodeSnippet from "./codeSnippet.svelte";
</script>

<div class="text-container">
    <span class="text-slate-100 mb-10">{@html text}</span>
</div>

<style>
.lenke{
    color: #ff79c6;
}
.text-container{
    margin-bottom: 10px;
}
</style>
<script>
    export let text;
    $: parsedText = text.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-2xl">$1</code>');

</script>

<div class="overskrift-container">
    <span class="text-slate-100 text-2xl">{@html parsedText}</span>
    
</div>

<style>
.overskrift-container{
    margin-bottom: 10px;
}
</style>
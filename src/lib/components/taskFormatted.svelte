<script>
    export let task = "";
    export let description = "";

</script>

<div class="flex flex-col bg-slate-950 p-5 my-5">
    <span class="font-mono text-blue-400">{task}</span> 
    <span class="font-mono text-fuchsia-200">{@html description}</span>
</div>

<style>
    a{
        color: #f81ce5;
    }
    :global(a){
        color: #f81ce5;
    }
</style>
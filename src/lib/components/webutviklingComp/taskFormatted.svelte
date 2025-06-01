<script lang="ts">
    export let task: string = "";
    export let description: string = "";
</script>

<div class="flex flex-col bg-slate-950 p-5 my-5">
    <span class="font-mono text-blue-400">{task}</span> 
    <span class="font-mono text-fuchsia-200">{@html description}</span>
</div>
<script>
    export let description = "";
    export let tasks = []; 
</script>

<div class="flex flex-col bg-slate-950 p-5 my-5">
    <span class="font-mono text-fuchsia-200">{description}</span>
    <div class="flex flex-row justify-evenly">
            {#each tasks as task}
                <span class="font-mono text-blue-400">{task.term}</span>
                <!--<span class="font-mono text-fuchsia-200">{task.definition}</span>-->
            {/each}
        </div>
</div>
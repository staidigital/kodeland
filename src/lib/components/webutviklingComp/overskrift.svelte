<script lang="ts">
    export let text: string;
    const parsedText = () => text.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-2xl">$1</code>');
</script>

<div class="mb-2">
    <span class="text-slate-100 text-2xl">{@html parsedText()}</span>
</div>
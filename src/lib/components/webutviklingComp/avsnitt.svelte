<script lang="ts">
    export let text: string;
    import CodeSnippet from "./codeSnippet.svelte";

    const parsedText = () => text.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>');
</script>

<div class="mb-2">
    <span class="text-slate-100 mb-10">{@html parsedText()}</span>
</div>
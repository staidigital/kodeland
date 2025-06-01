<script lang="ts">
    import Overskrift from "$lib/components/webutviklingComp/overskrift.svelte";
    import Avsnitt from "$lib/components/webutviklingComp/avsnitt.svelte";
    import CodeSnippet from "$lib/components/webutviklingComp/codeSnippet.svelte";
    import Task from "$lib/components/webutviklingComp/task.svelte";
    import manifest from "$lib/data/javascript/manifest.js";
    import section1 from "$lib/data/javascript/section1.js";
    import section2 from "$lib/data/javascript/section2.js";
    import section3 from "$lib/data/javascript/section3.js";
    import section4 from "$lib/data/javascript/section4.js";
    import section5 from "$lib/data/javascript/section5.js";
    import section6 from "$lib/data/javascript/section6.js";
    import section7 from "$lib/data/javascript/section7.js";
    import section8 from "$lib/data/javascript/section8.js";
    import section9 from "$lib/data/javascript/section9.js";
    import section10 from "$lib/data/javascript/section10.js";

    // Add types for manifest and sections
    type ManifestEntry = {
        id: string;
        title: string;
        links: { text: string; anchor: string }[];
    };
    type SectionBlock = {
        id: string;
        title: string;
        blocks: any[];
    };

    // manifest is an array of ManifestEntry
    const manifestTyped: ManifestEntry[] = manifest;
    // sections is an array of SectionBlock[] (from each section file)
    const sections: SectionBlock[][] = [
        section1, section2, section3, section4, section5,
        section6, section7, section8, section9, section10
    ];
</script>

<main class="flex flex-col items-center bg-slate-900 min-h-screen">
    <header class="py-10">
        <Overskrift text="JavaScript-kurs" />
        <Avsnitt text="Lær JavaScript steg for steg!" />
    </header>

    <nav class="flex flex-wrap gap-4 mb-10">
        {#each manifestTyped as entry, i}
            <a href={"#section" + (i + 1)} class="text-fuchsia-300 hover:underline">
                {entry.title}
            </a>
        {/each}
    </nav>

    {#each sections as sectionArr, i}
        {#each sectionArr as section}
            <section id={"section" + (i + 1)} class="w-full max-w-3xl bg-slate-800 rounded-lg p-6 mb-8 shadow">
                <Overskrift text={section.title} />
                {#if section.blocks}
                    {#each section.blocks as block}
                        {#if block.type === 'paragraph'}
                            <Avsnitt text={block.text} />
                        {:else if block.type === 'code'}
                            <CodeSnippet code={block.code} language={block.language ?? 'js'} preview={true} />
                        {:else if block.type === 'task'}
                            <Task tasks={block.tasks} description={block.description ?? 'Oppgaver'} />
                        {/if}
                    {/each}
                {/if}
            </section>
        {/each}
    {/each}
</main>

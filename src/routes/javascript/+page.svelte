<script>
    import "../../app.css";
    import Avsnitt from "../../lib/components/avsnitt.svelte";
    import Overskrift from "../../lib/components/overskrift.svelte";
    import Menulink from "../../lib/components/menulink.svelte";
    import CodeSnippet from "../../lib/components/codeSnippet.svelte";

    let content = [
        {
            id: "sectionOne",
            title: "Setup",
            blocks: [
                { type: 'paragraph', text: 'Lag en ny mappe et fornuftig sted og gi den navnet "webutvikling"...' },
                { type: 'paragraph', text: 'Inne i Visual Studio Code skal vi installere en plugin...' }
            ]
        },

        {
            id: "sectionTwo",
            title: "Din første nettside",
            blocks: [
                { type: 'paragraph', text: 'Inne i VSCode lager vi først en ny fil...' },
                {
                    type: 'code',
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- Content here -->
</body>
</html>`
                },
                { type: 'paragraph', text: 'Klikk cmd+s for å lagre filen, og gi den navnet index.html...' },
                {
                    type: 'code',
                    code: `<body>
    <p>Hei, verden!</p>
</body>`
                }
            ]
        }
    ];

    let menuItems = content.map(section => ({
        text: section.title,
        link: `#${section.id}`
    }));

    let menuOpen = false;
    let screenSize;
</script>

<svelte:window bind:innerWidth={screenSize} />

<!-- Sidebar and Content -->
<main class="flex lg:flex-row flex-col bg-slate-900">
    <!-- Sidebar -->
    <div class="lg:w-1/5 w-screen bg-slate-700 lg:pt-40">
        {#if screenSize < 1024}
        <div class="w-screen h-20 flex justify-end">
            <button on:click={() => { menuOpen = !menuOpen; }} class="p-4 w-20 h-full flex flex-col justify-between">
                <div class="w-full h-1.5 bg-slate-200"></div>
                <div class="w-full h-1.5 bg-slate-200"></div>
                <div class="w-full h-1.5 bg-slate-200"></div>
            </button>
        </div>
        {/if}
        {#if menuOpen || screenSize > 1024}
        <div class="menu flex flex-col flex-start p-10 justify-between lg:fixed">
            {#each menuItems as item}
            <Menulink text={item.text} link={item.link} />
            {/each}
        </div>
        {/if}
    </div>

    <!-- Content Section -->
    <div class="lg:px-40 px-5 lg:w-4/5 w-screen">
        {#each content as section}
        <section id={section.id} class="py-10">
            <Overskrift text={section.title} />
            {#each section.blocks as block}
                {#if block.type === 'paragraph'}
                    <Avsnitt text={block.text} />
                {/if}
                {#if block.type === 'code'}
                    <CodeSnippet code={block.code} preview={true} />
                {/if}
            {/each}
        </section>
        {/each}
    </div>
</main>
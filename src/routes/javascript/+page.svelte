<script>
    import "../../app.css";
    import Avsnitt from "../../lib/components/avsnitt.svelte";
    import Overskrift from "../../lib/components/overskrift.svelte";
    import Menulink from "../../lib/components/menulink.svelte";
    import CodeSnippet from "../../lib/components/codeSnippet.svelte";
    import Definition from "$lib/components/definition.svelte";   
    import Task from "$lib/components/task.svelte"; 
    import TaskFormatted from "$lib/components/taskFormatted.svelte";
    import JsSnippet from "$lib/components/jsSnippet.svelte";

    let menuOpen = false;
    let screenSize;

</script>
<svelte:window bind:innerWidth={screenSize} />
<main class="flex lg:flex-row flex-col bg-slate-900">
    <div class="lg:w-1/5 w-screen bg-slate-700 lg:pt-40">
        {#if screenSize < 1024}
        <div class= "w-screen h-20 flex justify-end">
            <button on:click={() => {menuOpen = !menuOpen;}} class="p-4 w-20 h-full flex flex-col justify-between">
                <div class="w-full h-1.5 bg-slate-200 "></div>
                <div class="w-full h-1.5 bg-slate-200 "></div>
                <div class="w-full h-1.5 bg-slate-200 "></div>
            </button>
        </div>
        {/if}
        {#if menuOpen || screenSize > 1024}
        <div class="menu flex flex-col flex-start p-10 justify-between lg:fixed">
            <Menulink text='Introduksjon' link='#sectionOne' />
            <Menulink text='Variabler' link='#sectionTwo' />
        </div>
        {/if}
    </div>
    <div class="lg:px-40 px-5 lg:w-4/5 w-screen">
        <header class="flex flex-col justify-center lg:pt-40 pt-5">
            <span class="text-3xl font-mono text-fuchsia-300">JavaScript 101</span>
            <span class="font-mono text-fuchsia-200">©Sondre Stai 2024</span>
        </header>
        <section class="flex flex-col py-5">
            <h2 id="sectionOne" class="text-2xl font-mono text-fuchsia-300">Introduksjon</h2>
            <p class="text-slate-100 mb-10">I motsetning til HTML og CSS, så er JavaScript et fullverdig <span class="text-fuchsia-300">programmeringsspråk</span>. Det vil si at vi i større grad kan bruke teknikker og metoder som vi kjenner fra f.eks. Python eller andre programmeringsspråk. </p>
        </section>
        <section class="flex flex-col py-5">
            <h2 id="sectionTwo" class="text-2xl font-mono text-fuchsia-300">Variabler</h2>
            <p class="text-slate-100 mb-10">Man kan tenke på variabler som bokser man kan fylle med informasjon. F.eks. om jeg har en tekst eller et tall som jeg tenker å bruke senere i koden min, kan det være nyttig å ha det i en variabel.  </p>
            <JsSnippet code={`let navn = "Sondre"; `} />
        </section>
    </div>

</main>

<style>
    :global(a){
        color: #ff79c6;
    }
    :global(body){
        @apply bg-slate-900;
    }
    .boks{
        width: 100px;
        height: 100px;
        margin: 10px;
        @apply bg-blue-500;
    }
</style>
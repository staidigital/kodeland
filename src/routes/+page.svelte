<script>
    import "../app.css";
</script>

<main class="relative flex flex-col items-center justify-start pt-[20vh] h-screen bg-[#1f1f1f] text-center overflow-hidden">
    <!-- SVG Outline Background -->
    <svg
        class="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
    >
        <path
            d="M150,300 C100,200 200,100 300,150 C400,200 500,100 600,150 C700,200 650,400 500,450 C350,500 250,400 150,300 Z"
            stroke="rgba(255, 255, 255, 0.5)"
            stroke-width="8"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>

    <!-- Main Heading and Links -->
    <h1 class="text-[15vw] font-extrabold text-fuchsia-300 mb-12 tracking-wide leading-none text-center z-10 relative">
        Kodeland
    </h1>

    <div class="flex flex-col gap-4 text-lg z-10 relative">
        <a href="/javascript" class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-4 rounded text-center font-mono text-xl transition">
            JavaScript-kurset
        </a>
        <a href="/webutvikling" class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-4 rounded text-center font-mono text-xl transition">
            Webutvikling
        </a>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
    }
</style>

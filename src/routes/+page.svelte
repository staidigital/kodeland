<script>
    import "../app.css";
</script>

<main class="relative flex flex-col items-center justify-start pt-[12vh] h-screen bg-[#1f1f1f] text-center overflow-hidden px-4 sm:px-6">
    <!-- Stylized Map Background -->
    <svg
        class="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
    >
        <!-- "Terrain" shapes -->
        <ellipse cx="300" cy="700" rx="220" ry="60" fill="#a21caf" opacity="0.15"/>
        <ellipse cx="900" cy="650" rx="180" ry="50" fill="#f0abfc" opacity="0.12"/>
        <ellipse cx="600" cy="200" rx="300" ry="80" fill="#f472b6" opacity="0.10"/>
        <!-- "Nodes" -->
        <circle cx="250" cy="400" r="8" fill="#f472b6" />
        <circle cx="600" cy="300" r="10" fill="#a21caf" />
        <circle cx="950" cy="500" r="7" fill="#f0abfc" />
        <circle cx="800" cy="200" r="6" fill="#f472b6" />
        <!-- "Routes" -->
        <polyline points="250,400 600,300 950,500" stroke="#f0abfc" stroke-width="3" fill="none" opacity="0.5" />
        <polyline points="600,300 800,200" stroke="#a21caf" stroke-width="2" fill="none" opacity="0.4" />
        <!-- "Mountains" -->
        <polygon points="180,700 220,630 260,700" fill="#a21caf" opacity="0.25"/>
        <polygon points="320,700 370,620 420,700" fill="#f472b6" opacity="0.18"/>
        <polygon points="850,700 900,640 950,700" fill="#f0abfc" opacity="0.18"/>
    </svg>

    <!-- Floating Island for Heading -->
    <div class="relative z-10 flex flex-col items-center">
        <svg width="320" height="60" viewBox="0 0 420 80" class="mx-auto mb-[-2.5rem] sm:w-[420px] sm:h-[80px]">
            <ellipse cx="210" cy="60" rx="200" ry="18" fill="#a21caf" opacity="0.25"/>
            <ellipse cx="210" cy="70" rx="170" ry="10" fill="#f0abfc" opacity="0.18"/>
        </svg>
        <h1 class="text-[16vw] sm:text-[11vw] font-extrabold text-fuchsia-300 mb-2 tracking-wide leading-none text-center drop-shadow-lg">
            Kodeland
        </h1>
        <p class="text-fuchsia-100 text-lg sm:text-xl mb-6 sm:mb-8 font-mono tracking-wide">
            Landet for kode, kreativitet og læring
        </p>
    </div>

    <!-- Signpost-style Links -->
    <div class="flex flex-col gap-6 z-10 relative items-center w-full">
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full justify-center items-center">
            <a href="/javascript" class="w-full sm:w-auto text-center bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-lg font-mono text-xl sm:text-2xl shadow-lg transition border-4 border-fuchsia-300 rotate-[-2deg] hover:scale-105">
                🪧 JavaScript-kurset
            </a>
            <a href="/webutvikling" class="w-full sm:w-auto text-center bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-lg font-mono text-xl sm:text-2xl shadow-lg transition border-4 border-fuchsia-300 rotate-[1deg] hover:scale-105">
                🪧 Webutvikling
            </a>
            <a href="/sql" class="w-full sm:w-auto text-center bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-lg font-mono text-xl sm:text-2xl shadow-lg transition border-4 border-fuchsia-300 rotate-[3deg] hover:scale-105">
                🪧 SQL
            </a>
        </div>
        <span class="text-fuchsia-200 text-sm sm:text-base mt-4 opacity-80">Velg en rute og start reisen!</span>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        background: #1f1f1f;
    }
    h1 {
        text-shadow: 0 4px 32px #a21caf55, 0 1px 0 #fff2;
    }
    @keyframes float {
        0% { transform: translateY(0);}
        50% { transform: translateY(-8px);}
        100% { transform: translateY(0);}
    }
    svg circle, svg ellipse, svg polygon {
        animation: float 5s ease-in-out infinite;
    }
</style>

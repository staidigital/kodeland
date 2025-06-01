<script>
    import "../app.css";
    let { children } = $props();
</script>

<nav class="flex justify-start h-10 items-center bg-gray-950">
    <a href="/" class="mx-4 no-underline text-base font-normal text-white hover:text-fuchsia-300 transition-colors">Hjem</a>
    <a href="/webutvikling" class="mx-4 no-underline text-base font-normal text-white hover:text-fuchsia-300 transition-colors">Webutvikling</a>
    <a href="/javascript" class="mx-4 no-underline text-base font-normal text-white hover:text-fuchsia-300 transition-colors">Javascript</a>
    <a href="/sql" class="mx-4 no-underline text-base font-normal text-white hover:text-fuchsia-300 transition-colors">SQL</a>
</nav>

{@render children()}
<script>
    import "../app.css";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>
<nav class="flex justify-start h-10 items-center bg-gray-950">
    <a href="/">Hjem</a>
    <a href="/webutvikling">Webutvikling</a>
    <a href="/javascript">JavaScript</a>
    <!-- <a href="/prototyping">Prototyping</a>-->
</nav>
<slot />

<style>
    nav a {
        margin: 0 1rem;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 350;
        color: #fff;
    }
    nav a:hover {
        @apply text-fuchsia-300;
    }
</style>
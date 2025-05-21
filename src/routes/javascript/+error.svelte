<script>
  export let error;

  // Extract with safe defaults
  const status = error?.status || 404;
  const message = error?.message || 'Ukjent feil';
</script>

<svelte:head>
  <title>{status} - Feil</title>
</svelte:head>

<section class="min-h-screen flex flex-col items-center justify-center text-center bg-slate-900 text-white px-6">
  <h1 class="text-6xl font-bold text-fuchsia-400 mb-4">{status}</h1>
  <h2 class="text-2xl font-semibold mb-4">Oops! Noe gikk galt.</h2>
  <p class="mb-8 text-slate-300">{message}</p>

  <a href="/javascript" class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 rounded font-mono shadow">
    Tilbake til JavaScript 101
  </a>
</section>

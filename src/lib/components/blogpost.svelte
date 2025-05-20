<!-- BlogPost.svelte -->
<script>
  export let post;

  // You can destructure the post object to access its properties
  const { title, content } = post;
</script>

<article class="bg-white p-4 shadow-md rounded-md w-60vw">
  <h2 class="text-gray-800 text-xl font-semibold mb-2">{title}</h2>
  <div class="content">{@html content}</div>
</article>

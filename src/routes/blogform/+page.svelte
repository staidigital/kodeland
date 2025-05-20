<!-- BlogForm.svelte -->
<script>
    import { onMount } from 'svelte';
    import BlogPost from "../../lib/components/blogpost.svelte";
    import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
    import { writable } from 'svelte/store'; // Import Svelte store for state management
    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "$lib/firebaseConfig";

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // State variables
    let title = '';
    let paragraph = '';
    let image = '';
    let codeBlock = '';

    import "../../app.css";
    let screenSize;

    // Svelte store for blog posts
    const blogPosts = writable([]);

    // Function to submit form
    async function submitForm() {
      const blogPostsCollection = collection(db, 'blogPosts');
      const postData = {
        title,
        content: `<p>${paragraph}</p><img src="${image}" /><pre>${codeBlock}</pre>`,  
    };

        try {
          const docRef = await addDoc(blogPostsCollection, postData);
          console.log('Blog post created with ID:', docRef.id);
        } catch (error) {
          console.error('Error creating blog post:', error);
      }
    }

    // Function to get blog posts
    async function getBlogPosts() {
      const blogPostsCollection = collection(db, 'blogPosts');
      const querySnapshot = await getDocs(blogPostsCollection);

      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      blogPosts.set(posts);


    }

    async function submitAndFetchPosts(){
      await submitForm()
      await getBlogPosts()
      console.log($blogPosts)
    }

</script>


<svelte:window bind:innerWidth={screenSize} />
<main>

    <div class="flex items-center justify-center  flex-col pt-5" >
      <h1 class="text-white text-3xl mb-5">Publish your Course content</h1>
      <form on:submit|preventDefault={submitAndFetchPosts} class="max-w-md p-4 bg-white shadow-md rounded-md">
        <label for="title" class="block text-sm font-medium text-gray-600">Title:</label>
        <input type="text" id="title" bind:value={title} class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" />

        <label for="paragraph" class="block mt-4 text-sm font-medium text-gray-600">Paragraph:</label>
        <textarea id="paragraph" bind:value={paragraph} class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"></textarea>

        <label for="image" class="block mt-4 text-sm font-medium text-gray-600">Image URL:</label>
        <input type="text" id="image" bind:value={image} class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" />

        <label for="codeBlock" class="block mt-4 text-sm font-medium text-gray-600">Code Block:</label>
        <textarea id="codeBlock" bind:value={codeBlock} class="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"></textarea>

        <button type="submit" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Create Course</button>
      </form>
    </div>
<!-- Your main component -->


<div class="flex flex-col justify-center ">
  <h2 class="text-white text-2xl mt-8 mb-4 ">Latest Course</h2>
  {#if $blogPosts.length > 0}
    <div>
      <BlogPost post={$blogPosts[0]} />
    </div>
  {/if}
  </div>
</main>

<style>
  :global(body){
        @apply bg-slate-900;
    }
</style>

<slot/>

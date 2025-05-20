<script> 
    // importing important functions from firebase
    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "$lib/firebaseConfig";
    // @ts-ignore
    import {doc, getDoc, collection, getDocs, getFirestore} from "firebase/firestore/lite";

    import {onMount} from "svelte";
    import { writable } from 'svelte/store';

    //Initialize Firebase
    const app = initializeApp(firebaseConfig);

    //Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    // Firebase reference to the "courses" collection
    const coursesCollectionRef = collection(db, 'courses');

    // Svelte store to hold the courses data
    const courses = writable([]);

    const fetchCourses = async () => {
        const querySnapshot = await getDocs(coursesCollectionRef);
        const coursesData = [];
        querySnapshot.forEach((doc) => {
            coursesData.push({ id: doc.id, ...doc.data() });
        });
        // @ts-ignore
        courses.set(coursesData);
    };
    onMount(fetchCourses);
    export { courses };
    /*
    async function getNames(a){
        const namesCol = collection(a, "users");
        const nameSnapshot = await getDocs(namesCol);
        const nameList = nameSnapshot.docs.map(doc => doc.data());
        return nameList;
    }

    getNames(db).then((data) => {
        data.forEach((element) => {
            console.log("God morgen, " + element.username + "!")
        });
    });
    */
    import "../../app.css";
    import Menulink from "../../lib/components/menulink.svelte";

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
            <Menulink text='Setup' link='#sectionOne' />
            <Menulink text='Din første nettside' link='#sectionTwo' />
            <Menulink text='HTML Basics' link='#sectionThree' />
            <Menulink text='CSS Basics' link='#sectionFour' />
            <Menulink text='Id og class' link='#sectionFive' />
            <Menulink text='Div-elementet' link='#sectionSix' />
            <Menulink text='Flexbox' link='#sectionSeven' />
        </div>
        {/if}
    </div>
    <div class="lg:px-40 px-5 lg:w-4/5 w-screen">
        <header class="flex flex-col justify-center lg:pt-40 pt-5">
            <span class="text-3xl font-mono text-fuchsia-300">
                {$courses[1]?.title}
            </span>
            <span class="font-mono text-fuchsia-200">
                {$courses[1]?.description}
            </span>
            
        </header>
    </div>

    <div class="blog-post">
        
    </div>
</main>

<style>
    :global(a){
        color: #ff79c6;
    }
    :global(body){
        @apply bg-slate-900;
        color: white;
    }
    .boks{
        width: 100px;
        height: 100px;
        margin: 10px;
        @apply bg-blue-500;
    }
</style>

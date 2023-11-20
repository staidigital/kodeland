<script> 


    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "$lib/firebaseConfig";
    import { getFirestore, collection, getDocs, doc, setDoc} from "firebase/firestore/lite";


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function getNames(a){
        const namesCol = collection(a, "users");
        const nameSnapshot = await getDocs(namesCol);
        const nameList = nameSnapshot.docs.map(doc => doc.data());
        return nameList;
    }

    getNames(db).then((data) => {
        data.forEach((element) => {
            console.log("God morgen, " + element.password + "!")
        });
    });

    

    import "../../app.css";
    import Avsnitt from "../../lib/components/avsnitt.svelte";
    import Overskrift from "../../lib/components/overskrift.svelte";
    import Menulink from "../../lib/components/menulink.svelte";
    import CodeSnippet from "../../lib/components/codeSnippet.svelte";
    import Definition from "$lib/components/definition.svelte";   
    import Task from "$lib/components/task.svelte"; 
    import TaskFormatted from "$lib/components/taskFormatted.svelte";
    let img1 = "https://webkurshosting.w3spaces.com/kodeland-webutvikling/extensions_button.PNG";
    let img2 = "https://webkurshosting.w3spaces.com/kodeland-webutvikling/live_server.png";
    let img3 = "https://webkurshosting.w3spaces.com/kodeland-webutvikling/new_file.png";
    let img4 = "https://webkurshosting.w3spaces.com/kodeland-webutvikling/html_structure.PNG";
    let img5 = "https://webkurshosting.w3spaces.com/kodeland-webutvikling/first_paragraph.PNG";
    let img8 = "https://webkurshosting.w3spaces.com/kodeland-webutvikling/title.png";
    /*<span class="text-blue-300 text-mono"> &#60;body&#62; </span>*/
    let menuOpen = false;
    let screenSize;
</script>

<svelte:window bind:innerWidth={screenSize} />
<main>

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
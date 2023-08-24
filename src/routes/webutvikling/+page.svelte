<script>
    import "../../app.css";
    import Avsnitt from "../../lib/components/avsnitt.svelte";
    import Overskrift from "../../lib/components/overskrift.svelte";
    import Menulink from "../../lib/components/menulink.svelte";
    import CodeSnippet from "../../lib/components/codeSnippet.svelte";
    import Definition from "$lib/components/definition.svelte";   
    import Task from "$lib/components/task.svelte"; 
    import TaskFormatted from "$lib/components/taskFormatted.svelte";
    let img1 = "https://webkurs.w3spaces.com/tut_img/extensions_button.PNG";
    let img2 = "https://webkurs.w3spaces.com/tut_img/live_server.png";
    let img3 = "https://webkurs.w3spaces.com/tut_img/new_file.png";
    let img4 = "https://webkurs.w3spaces.com/tut_img/html_structure.PNG";
    let img5 = "https://webkurs.w3spaces.com/tut_img/first_paragraph.PNG";
    let img6 = "https://webkurs.w3spaces.com/tut_img/go_live2.PNG";
    let img7 = "https://webkurs.w3spaces.com/tut_img/hei_verden.PNG";
    let img8 = "https://webkurs.w3spaces.com/tut_img/title.png";
    /*<span class="text-blue-300 text-mono"> &#60;body&#62; </span>*/
    let avsnitt1 = [
        'I dette kurset skal vi lære de grunnleggende kunnskapene for å kunne lage vår egen nettside!',
        'Lag en ny mappe i OneDrive-en din som du kaller "Webutvikling", som skal ligger i Basic-mappen. Åpne mappen i VSCode ved å klikke <span class="italic">file -> open folder</span>. ',
        'Inne i VSCode lager vi først en ny fil ved å klikke file->new file. Du burde du få opp en tom fil:',
        'Husk å skrive logg underveis i kurset. Noter deg ting du har lært, ting du lurer på, hvilke utfordringer du har hatt osv; og legg jevnlig inn skjermbilder fra både kode og nettside.',
        'Inne i Visual Studio Code skal vi installere en liten plugin. Trykk på de knappen med de fire boksene i menyen på venstresiden. <img src="'+img1+'" /> ',
        'Deretter søker du på "Live Server" og installerer den øverste av søkeresultatene som burde se slik ut: <img src="'+img2+ '" />',
        'og voila! Vi er klare for å begynne å kode litt. ',
    ]
    let avsnitt2 = [
        'Inne i VSCode lager vi først en ny fil ved å klikke file->new file. Du burde du få opp en tom fil: <img src="' + img3 +' " />',
        'Klikk cmd+s eller file->save for å lagre filen, og gi den navnet <span class="italic">index.html</span>. De fleste nettside-filer kan du kalle hva du vil, men forsiden din må alltid hete <span class="italic">index.html</span>. ',
        'For å komme litt raskt igang kan vi få hjelp av VSCode til å lage grunnstrukturen til HTML-filen vår. Lag et utropstegn og trykk <span class="italic">enter</span>. Da skal følgende kode dukke opp automagisk; eventuelt kan du bare kopiere den herfra. ',
        'Her var det mye rart på en gang! Det viktigste å legge merke til enn så lenge er at koden er delt opp i en <span class="italic">head</span> og en <span class="italic">body</span>. <span class="italic">head</span> innholder litt forskjellig metadata for nettsiden din, men <span class="italic">body</span> er hovedattraksjonen. Alt innhold som skal vises på nettsiden skal legges mellom <span class="text-blue-300 text-mono">&#60;body&#62;</span> og <span class="text-blue-300 text-mono">&#60;/body&#62;</span>.',
        'La oss prøve å legge til litt tekst i bodyen vår. Skriv <span class="text-blue-300 text-mono">&#60;p&#62;Hei, verden!&#60;/p&#62;</span> mellom body-tagene. <span class="italic">p</span> står for paragraph og forteller nettleseren at vi skal legge inn vanlig tekst.',
        'For å se hvordan nettsiden blir seende ut, klikker du på Go Live her nede til høyre i VSCode. <img src="' + img6 + '" />',
        'Da åpner nettleseren seg og viser oss hvordan nettsiden egentlig ser ut. <img src="' + img7 + '" />',
        'Wow! Gratulerer med å ha laget din første nettside! Den er ikke så veldig innholdsrik enda, så la oss se litt nærmere på hvordan vi kan legge til litt mer innhold.'
    ]
    let avsnitt3 = [
        'Datamaskiner er dumme dyr, og trenger at vi skriver ting på helt spesielle måter for at de skal forstå hva vi mener. HTML står for HyperText Markup Language, og er et markeringsspråk vi bruker for å lage den grunnleggende strukturen for en nettside. ',
        'La oss ta en rask titt på koden vi lagde i stad. Den første linja, <span class="text-blue-300 text-mono"> &#60;!DOCTYPE html&#62; </span>, forteller nettleseren at dette er en HTML-fil. De forskjellige kodene vi bruker i HTML kaller vi for <span class="italic">tags</span>. For eksempel da vi skrev <span class="text-blue-300 text-mono">&#60;p&#62;Hei, verden!&#60;/p&#62;</span> brukte vi <span class="italic">p</span>-taggen. Legg merke til at vi nesten alltid har både en start-tag og en slutt-tag; disse ser nesten like ut bortsett fra at en slutt-tag har en skråstrek i seg.',
        'Selv om vi stort sett kommer til å skrive all koden vår i <span class="italic">body</span>, så er det enkelt ting vi gjør i <span class="italic">head</span>, f.eks. å bestemme teksten som skal stå på fanen til nettsiden i browseren din. Det gjør vi med <span class="text-blue-300 text-mono"> &#60;title&#62; </span> tag`n. Prøv å endre tittelen på siden din til f.eks. <span class="text-blue-300 text-mono"> &#60;title&#62; Min første nettside &#60;&#47;title&#62; </span> og observer at teksten i fanen endrer seg. <img src="' + img8 + '" />', 
        'La oss gå tilbake til <span class="text-blue-300 text-mono"> &#60;body&#62; </span> for å legge inn litt mer innhold. I tillegg til å ha vanlig tekst med p-tagen, la oss lage en overskrift. ',
        'For å legge inn et bilde bruker vi <span class="italic">img</span> tag`n. Img er litt spesiell fordi man trenger ikke både start-tag og slutt-tag. La oss teste det med et stoisk bilde av Ned Stark. Merk at vi har lagt inn en <span class="italic">src</span> inne i img-tagen der vi setter URL-en til bildet.',
        'Du kan endre størrelse på bilde ved å legge til en width-attributt og en height-attributt som sier gir bredde og høyde i antall piksler. ',
        'Det finnes veldig mange html-tags man kan lære seg å bruke. Så på tide med en liten utforskningsoppgave!',
        '<a href="https://www.w3schools.com/html/default.asp"><span class="text-[#f81ce5]"> W3Schools</span></a> er en fin ressurs å bruke for å lære mer om HTML.'
    ]
    let avsnitt4 = [
        'Enn så lenge er ikke nettsiden vår veldig fargerik. For å å kunne gi nettsiden vår litt mer styling må vi innføre enda et markeringsspråk; CSS (Cascading Style Sheet). ',
        'Lag en ny fil i prosjektet ditt i VSCode og gi den navnet <span class="italic">style.css</span>. Deretter kopierer du følgende linje med kode og limer inn i <span class="text-blue-300 text-mono"><head></span> delen av html-filen din: ',
        'CSS har litt annen syntaks enn HTML. I CSS har ikke rekkefølgen i koden noe å si, og kodene skrives på en litt annen måte.',
        'CSS handler om å beskrive de HTML-elementene vi allerede har lagt inn på nettsiden. La oss ta utgangspunkt i at jeg har en p-tag med tekst som jeg ønsker å gi litt farge. Da skriver jeg følgende i CSS-filen min: ',
        'Hvis jeg også skal gi styling til overskriften min, starter jeg bare en ny linje i CSS-filen og skriver:',
        'Hvis du ikke har en p-tag eller en h1-tag i HTML-filen, vil ikke CSS-koden gjøre noe. Det er fordi CSS handler om å beskrive HTML-elementer. ',
        'Et annet eksempel på noe vi kan gjøre med CSS, er å endre bakgrunnsfargen på nettsiden sin. Da kan vi gi følgende styling til body-taggen vår: ',
        'I tillegg til å skrive farger med navn, som f.eks. red eller blue, kan vi bruke hex-koder. Hex-koder er en måte å beskrive farger på som datamaskiner forstår. De består av 6 tegn, der de tre første beskriver hvor mye rødt det er i fargen, de to neste hvor mye grønt det er i fargen, og de to siste hvor mye blått det er i fargen. Hvis vi ønsker å lage en mørk bakgrunnsfarge kan vi f.eks. bruke #000000, som er en farge uten noe rødt, grønt eller blått i seg. Hvis vi ønsker en hvit bakgrunnsfarge kan vi bruke #ffffff, som er en farge med fullt rødt, grønt og blått. ',
        ''
    ]
    let avsnitt5 = [
        '<span class="italic>Id</span og <span class="italic">class</span> er to attributter vi kan legge til HTML-elementer for å kunne referere til dem i CSS. Id er unikt for hvert element, mens class kan brukes på flere elementer. ',
        'La oss si et jeg har tre p-tag`er som jeg ønsker å gi litt forskjellig styling. Da kan jeg legge til en id-attributt på hver av dem, og gi dem hver sin farge i CSS. Prøv å skrive inn følgende HTML på nettsiden din: ',
        'Og denne CSS-en:',
        'Legg merke til at vi må sette en # foran id-en i CSS-koden vår. Det er for å fortelle CSS at vi refererer til en id. Hvis vi skal referere til en class, må vi sette en . foran. ',
        'Class kan være nyttig for å gi samme styling til flere elementer. La oss si at jeg har fire p-tager og ønsker at annenhver skal være rød og blå. Da kan jeg skrive følgende i HTML: ',
        'Og følgende i CSS:',
        ''
    ];
    let avsnitt6 = [
        '<span class="text-blue-300 text-mono"> &#60;div&#62; </span>-tagen er en av de mest brukte HTML-tagene. Div brukes til å dele inn nettsider i mindre deler, og blir veldig viktig når vi etterhvert har lyst til å plassere innholdet vårt på spesifikke steder på nettsiden.',
        'Hvis du prøver å legge inn en div-tag i HTML-filen din, vil du se at den ikke gjør noe. Det er fordi div ikke har noen spesiell styling i seg. Det er bare en tom boks som vi kan legge innhold i. Som et eksempel kan vi lage en div med en rød bakgrunn og hvit tekst. ',
        '',
        '',
        ''
    ];
    let avsnitt7 = [
        'Når vi legger inn forskjellige tags i HTML-koden vår, så legger de seg under hverandre på nettsiden vår. Men hva hvis jeg ønsker å plassere noen divs ved siden av hverandre slik som dette:',
        'Eller hva med denne nettsiden? Den har en litt smalere seksjon på venstresiden for menyen, og en større seksjon til høyre for selve innholdet. ',
        'Når du har gjort deg ferdig med flexbox froggy, kan du prøve å gjenskape disse layoutene (og gjerne legge inn noe innhold også).',
        'Layout 1',
        'Layout 2',
        'Layout 3',
        'Layout 4',
        ''
    ];

    let code1 = ['<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '    <meta charset="UTF-8">',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '    <title>Document</title>',
        '</head>',
        '<body>',
        '    ',
        '</body>',
        '</html>'
    ].join('\n');
    let code2 = ['<body>',
        '    <p>Hei, verden!</p>',
        '</body>'].join('\n');
    let code3 = ['<body>',
        '    <h1>Min første overskrift</h1>',
        '    <p>Hei, verden!</p>',
        '</body>'].join('\n');
    let code4 = ['<img src="https://webkurs.w3spaces.com/tut_img/game_of_thrones_ned_stark_hbo.jpg" />'].join('\n');
    let code5 = ['<img width="200" src="https://webkurs.w3spaces.com/tut_img/game_of_thrones_ned_stark_hbo.jpg" />'].join('\n');
    let code6 = '<link rel="stylesheet" href="style.css">';
    let code7 = ['p {',
        '    color: red;',
        '}'].join('\n');
    let code8 = ['h1 {',
        '    color: blue;',
        '}'].join('\n');   
    let code9 = ['body {',
        '    background-color: black;',
        '}'].join('\n');
    let code10 = ['<p id="p1">Dette er en p-tag med id="p1"</p>',
        '<p id="p2">Dette er en p-tag med id="p2"</p>',
        '<p id="p3">Dette er en p-tag med id="p3"</p>'].join('\n');
    let code11 = ['#p1 {',
        '    color: red;',
        '}',
        '#p2 {',
        '    color: blue;',
        '}',
        '#p3 {',
        '    color: green;',
        '}'].join('\n');
    let code12 = ['<p class="red">Rød tekst</p>',
        '<p class="blue">Blå tekst</p>',
        '<p class="red">Rød tekst</p>',
        '<p class="blue">Blå tekst</p>'].join('\n');
    let code13 = ['.red {',
        '    color: red;',
        '}',
        '.blue {',
        '    color: blue;',
        '}'].join('\n');
    let code14 = ['<div class="redBox">',
        '    <p>Hvit tekst med rød bakgrunn</p>',
        '</div>'].join('\n');
    let code15 = ['.redBox {',
    '    background-color: red;',
    '    color: white;',
    '}'].join('\n');
    let task1 = [
        {
            term: "<a>",
            definition: "Lenke"
        },
        {
            term: "<br>",
            definition: "Lenke"
        },
        {
            term: "<b>",
            definition: "Lenke"
        },
        {
            term: "<i>",
            definition: "Lenke"
        },
        {
            term: "<ul>",
            definition: "Lenke"
        },
        {
            term: "<ol>",
            definition: "Lenke"
        }
    ];
    let task2 = [
        {
            term: "margin",
            definition: ""
        },
        {
            term: "border",
            definition: ""
        },
        {
            term: "font-size",
            definition: ""
        },
        {
            term: "font-family",
            definition: ""
        },
        {
            term: "font-weight",
            definition: ""
        }
    ];

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
            <span class="text-3xl font-mono text-fuchsia-300">Webutvikling 101</span>
            <span class="font-mono text-fuchsia-200">©Sondre Stai 2023</span>
        </header>
        <section class="flex flex-col py-5">
            <Avsnitt text={avsnitt1[0]} />
            
        </section>
        <section id="sectionOne" class="py-10">
            <Overskrift text='Setup' />
            <Avsnitt text={avsnitt1[1]} />
            <Avsnitt text={avsnitt1[2]} />
            <Avsnitt text={avsnitt1[3]} />
            <Avsnitt text={avsnitt1[4]} />
            <Avsnitt text={avsnitt1[5]} />
        </section>
        <section id="sectionTwo" class="pb-10 py-10">
            <Overskrift text='Din første nettside' />
            <Avsnitt text={avsnitt2[0]} />
            <Avsnitt text={avsnitt2[1]} />
            <Avsnitt text={avsnitt2[2]} />
            <CodeSnippet code={code1} />
            <Avsnitt text={avsnitt2[3]} />
            <Avsnitt text={avsnitt2[4]} />
            <CodeSnippet code={code2} preview={true} />
            <Avsnitt text={avsnitt2[5]} />
            <Avsnitt text={avsnitt2[6]} />
            <Avsnitt text={avsnitt2[7]} />
        </section>
        <section id="sectionThree" class="pb-10 py-10">
            <Overskrift text='HTML Basics' />
            <Avsnitt text={avsnitt3[0]} />
            <Avsnitt text={avsnitt3[1]} />
            <Avsnitt text={avsnitt3[2]} />
            <Avsnitt text={avsnitt3[3]} />
            <CodeSnippet code={code3} preview={true} />
            <Avsnitt text={avsnitt3[4]} />
            <CodeSnippet code={code4} preview={true} />
            <Definition term="Attributt" definition="En attributt er en egenskap som kan legges til en HTML-tag for å endre hvordan den oppfører seg. For eksempel kan vi legge til en src-attributt på img-taggen for å fortelle nettleseren hvor den skal hente bildet fra." />
            <Avsnitt text={avsnitt3[5]} />
            <CodeSnippet code={code5} preview={true} />
            <Avsnitt text={avsnitt3[6]} />
            <Task tasks={task1} description="Bruk Internett og egen testing for å finne ut av hva følgende html-tags gjør:" />
            <Avsnitt text={avsnitt3[7]} />
        </section>
        <section id="sectionFour" class="pb-10 py-10">
            <Overskrift text='CSS Basics' />
            <Avsnitt text={avsnitt4[0]} />
            <Avsnitt text={avsnitt4[1]} />
            <CodeSnippet code={code6} />
            <Avsnitt text={avsnitt4[2]} />
            <Definition term="Syntaks" definition="Syntaks betyr måten man skriver koden på. F.eks. at man bruker < og > tegn i HTML. Forskjellige kodespråk har ofte forskjellig syntaks. " />
            <Avsnitt text={avsnitt4[3]} />
            <CodeSnippet code={code7} language="css"/> 
            <Avsnitt text={avsnitt4[4]} />
            <CodeSnippet code={code7 + '\n' + code8} language="css" />
            <Avsnitt text={avsnitt4[5]} />
            <Avsnitt text={avsnitt4[6]} />
            <CodeSnippet code={code9} language="css" />
            <Avsnitt text={avsnitt4[7]} />
            <Task description="Bruk Internett og egen testing for å finne ut av hva følgende css-properties gjør:" tasks={task2} />
        </section>
        <section id="sectionFive" class="pb-10 py-10">
            <Overskrift text='Id og class' />
            <Avsnitt text={avsnitt5[0]} />
            <Avsnitt text={avsnitt5[1]} />
            <CodeSnippet code={code10} />
            <Avsnitt text={avsnitt5[2]} />
            <CodeSnippet code={code11} language="css" />
            <Avsnitt text={avsnitt5[3]} />
            <Avsnitt text={avsnitt5[4]} />
            <CodeSnippet code={code12} />
            <Avsnitt text={avsnitt5[5]} />
            <CodeSnippet code={code13} language="css" />
        </section>
        <section id="sectionSix" class="pb-10 py-10">
            <Overskrift text='Div-elementet' />
            <Avsnitt text={avsnitt6[0]} />
            <Avsnitt text={avsnitt6[1]} />
            <CodeSnippet code={code14} />
            <CodeSnippet code={code15} language="css" />
            <Avsnitt text={avsnitt6[2]} />
            <Avsnitt text={avsnitt6[3]} />
            <Avsnitt text={avsnitt6[4]} />
        </section>
        <section id="sectionSeven" class="pb-10 py-10">
            <Overskrift text='Flexbox' />
            <Avsnitt text={avsnitt7[0]} />
            <div class="flex flex-row justify-evenly my-5">
                <div class="boks"></div>
                <div class="boks"></div>
                <div class="boks"></div>
                <div class="boks"></div>
            </div>
            <Avsnitt text={avsnitt7[1]} />
            <TaskFormatted task='Lær deg å bruke Flex!' description='Jobb deg gjennom <a href="https://flexboxfroggy.com/"><span class="text-[#f81ce5]">Flexbox Froggy</span></a>' />
            <Avsnitt text={avsnitt7[2]} />
            <Avsnitt text={avsnitt7[3]} />
            <div class="flex flex-col h-50 my-5">
                <div class="w-full h-10 bg-slate-200"></div>
                <div class="w-full h-40 flex flex-row bg-teal-500">
                    <div class="w-1/4 bg-slate-400"></div>
                    <div class="w-3/4 bg-slate-600"></div>
                </div>
            </div>
            <Avsnitt text={avsnitt7[4]} />
            <div class="flex flex-col my-5">
                <div class="w-full h-10 bg-slate-200"></div>
                <div class="w-full h-40 flex flex-row bg-teal-500">
                    <div class="w-3/4 bg-slate-400"></div>
                    <div class="w-1/4 bg-slate-600"></div>
                    <div class="w-1/4 bg-slate-800"></div>
                </div>
            </div>
            <Avsnitt text={avsnitt7[5]} />
            <div class="flex w-full flex-row h-60 my-5 bg-slate-50">
                <div class="h-full w-1/2 flex flex-col">
                    <div class="flex flex-row h-1/2">
                        <div class="grow h-full bg-teal-300"></div>
                        <div class="grow h-full bg-teal-500"></div>
                    </div>
                    <div class="flex flex-row h-1/2">
                        <div class="grow h-full bg-teal-700"></div>
                        <div class="grow h-full bg-teal-900"></div>
                    </div>
                </div>
                <div class="flex flex-col h-full grow">
                    <div class="w-full h-1/3 bg-teal-300"></div>
                    <div class="w-full h-1/3 bg-teal-500"></div>
                    <div class="w-full h-1/3 bg-teal-700"></div>
                </div>
            </div>
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
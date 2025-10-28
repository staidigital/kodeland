export default [

{
  "id": "arrays",
  "title": "Arrays",
  "blocks": [
    {
      type: "paragraph",
      text: "En `array` er en liste med data, vanligvis relatert (elementene har ofte en sammenheng med hverandre)."
    },

    {
      type: "extraInfo",
      icon: "example",
      content: [
        {
          type: "text",
          value:
            "Eksempler på bruk av array er vennelisten din på Facebook, en liste over leiligheter på Airbnb, en liste av kommentarer på et Instagram-innlegg."
        }
      ]
    },


    {
      type: "paragraph",
      text: "En array kan bestå av strings, tall, booleans eller en miks av ulike datatyper."
    },
    {
      type: "paragraph",
      text: "For å lage en array bruker vi firkant-paranteser `[]`, og skiller verdiene med komma. Her er et par eksempler:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `let venner = ["venn1", "venn2", "venn3"]
let amazonRatings = [4, 4.6, 3.2, 5, 5.5]`
    },

     {
      type: "paragraph",
      text: "Vi skal se litt ekstra på arrayet `handleListe` som skal inneholde matvarer vi trenger på butikken."
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `let handleListe = ["melk", "egg", "brød"];
console.log(handleListe);`
    },
     {
      type: "paragraph",
      text: "Nedenfor er `handleListe`-arrayet visualisert:"
    },
    {
      type: "image",
      component: 'BlockImage',
      props: {
        images: [
          {
            src: '/images/js/array.png',
            alt: 'En array',
            caption: 'Illustrasjon av en array.',
            fullWidth: false,
            width: "50%",
            align: "center",
            rounded: true,
            shadow: true
          },
        ]
      }
    },
     {
      type: "paragraph",
      text: "Plassen et element har i arrayet heter elementets  ^^indeks-nummer^^. Det første elementet i arrayet har indeks-nummer $$0$$, det neste elementet har indeks-nummer $$1$$ og så videre."
    },
     {
      type: "paragraph",
      text: "Du kan bruke indeks-nummeret når du vil skrive ut et spesifikt element. For eksempel hvis du vil skrive ut `melk` og `brød` fra listen `handleListe`, gjør du slik:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let handleListe = ["melk", "egg", "brød"];
console.log(handleListe[0]);
console.log(handleListe[2])`
    },
    {
      type: "paragraph",
      text: "Du kan endre et element i en array ved å gi en ny verdi til et spesifikt indeksnummer:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code:`let handleListe = ["melk", "egg", "brød"];
handleListe[2] = "rundstykker"
console.log(handleListe)`
      
    },
     {
      type: "paragraph",
      subtitle: "Array-metoder",
      text: "En array har mange innebygde metoder du kan bruke for å endre den. Du kan for eksempel legge til et nytt element på slutten med `push()`:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
        code:`let handleListe = ["melk", "egg", "brød"];
handleListe.push("kakao");
console.log(handleListe);`
      },
    {
      "type": "paragraph",
      "text": "Du kan fjerne det siste elementet med `pop()`:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
              code:`let handleListe = ["melk", "egg", "brød"];
handleListe.pop();
console.log(handleListe);`
    },
    {
      "type": "paragraph",
      "text": "For å finne ut hvor mange verdier det er i listen, bruker vi `length`:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": `let handleListe = ["melk", "egg", "brød"];
console.log(handleListe.length)`
    },
    {
      "type": "paragraph",
      subtitle: "Flere nyttige metoder",

      "text": "Det finnes mange flere metoder for arrays. `shift()` fjerner det første elementet, `unshift()` legger til et nytt først, `indexOf()` finner posisjonen til et element, `includes()` sjekker om et element finnes, og `concat()` slår sammen to arrays. Vi ser mer på noen av dem i oppgavene nedenfor."
    },
  ]
},


{
  id: "objects",
  title: "Objects - ikke krav å kunne",
  collapsible: "true",
  blocks: [
    {
      type: "paragraph",
      text: "Under kommer en rask, overordnet forklaring på hva et `object` (objekt) er. Det er ikke krav å jobbe med nå, men noe som kan være lurt for de som skal ta IT videre å vite om. Her er bare selve datastrukturen beskrevet."
    },
    {
      type: "paragraph",
      text: "Et eksempel på data lagret i et objekt er *=Amazon=* sin nettbutikk, som selger diverse produkter. Hvert produkt har en Customer Review tab:"
    },
    {
      type: "image",
      component: 'BlockImage',
      props: {
        images: [
          {
            src: '/images/js/object_amazon.png',
            alt: 'En array',
            caption: 'Amazon reviews.',
            fullWidth: false,
            width: "50%",
            align: "center",
            rounded: true,
            shadow: true
          },
        ]
      }
    },
    {
      type: "paragraph",
      text: "Men en anmeldelse inneholder ikke bare en rating. Hver anmeldelse inneholder et `forfatterNavn`, en `rating` og en `forklaring`. Med et objekt kan man samle denne dataen på en strukturert måte: "
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `{forfatterNavn: "user1", rating: 5, forklaring: "nydelig!"}`
    },

    {
      type: "paragraph",
      text: "Et annet eksempel er en leilighet på AirBNB, som inneholder egenskaper som `addresse`, `pris`, `beskrivelse`, `erLedig`, `rating`, `bilder`:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `{
  addresse: "Osloveien 1",
  pris: "2000",
  beskrivelse: "noe tekst",
  rating: 5,
  erLedig: true,
  bilder: ["bilde1", "bilde2", "bilde3"]
}`
    },
    {
      type: "paragraph",
      text: "Objekter har `key:value` par. Key er egenskapene til objektet, mens value er egenskapens verdi. For eksempel er `rating` en key, mens `5` er dens tilhørende value. "
    },
    {
      type: "paragraph",
      text: "Du kan bruke alle de ulike datatypene som verdier i et objekt. Ovenfor bruker vi både string, number, boolean og array."
    },
    {
      type: "paragraph",
      text: "Til slutt, hvis vi går tilbake til Amazon-ratingene, så kan man ha en liste med ratings-objekter ved å bruke array. Det kan da se sånn her ut:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `[
  {forfatterNavn: "user1", rating: 5, forklaring: "nydelig!"},
  {forfatterNavn: "user2", rating: 4.5, forklaring: "ganske bra"},
  {forfatterNavn: "user3", rating: 4, forklaring: "fungerte ok"}
]`
    },
    {
      type: "paragraph",
      text: "Dette er nok den mest komplekse datastrukturen du kommer til å bruke i JavaScript. Vi går ikke mer nøye gjennom her, hvis du får bruk for det så får du jobbe med det da."
    },
    
    
    
  ]
},

{
  id: "sectionDatatypeQuiz",
  title: "Flervalgsoppgaver – arrays",
  blocks: [
    {
      type: "paragraph",
      text: "Trykk på riktig alternativ for hvert spørsmål. Grønn betyr riktig svar, rød betyr feil."
    },
    {
      type: "task",
      number: 1,
      title: "Hva skrives ut?",
      description: "Hva vil denne koden skrive ut i konsollen?",
      code: `let animals = ["Hund", "Katt", "Fugl"];
console.log(animals[1]);`,
      solution: {
        correct: 1,
        options: [`"Hund"`, `"Katt"`, `"Fugl"`, `"undefined"`]
      }
    },
    {
      type: "task",
      number: 2,
      title: "Hva gjør `pop()`?",
      description: "Hva vil arrayet inneholde etter at vi bruker `pop()`?",
      code: `let colors = ["Rød", "Grønn", "Blå"];
colors.pop();`,
      solution: {
        correct: 1,
        options: [
          '["Rød", "Grønn", "Blå"]',
          '["Rød", "Grønn"]',
          '["Grønn", "Blå"]',
          '["Rød", "Blå"]'
        ]
      }
    },
    {
      type: "task",
      number: 3,
      title: "Hva gjør `push()`?",
      description: "Hva gjør `push()` i en array?",
      solution: {
        correct: 0,
        options: [
          "Legger til et nytt element på slutten",
          "Fjerner det første elementet",
          "Sorter arrayet",
          "Finner lengden på arrayet"
        ]
      }
    },
    {
      type: "task",
      number: 4,
      title: "Hva er `length`?",
      description: "Hva returnerer `length` når vi har tre elementer i arrayet?",
      code: `let dyr = ["Hund", "Katt", "Fugl"];
console.log(dyr.length);`,
      solution: {
        correct: 2,
        options: ["0", "2", "3", "4"]
      }
    }
  ]
},

  {
  id: "arrayTasks",
  title: "Programmeringsoppgaver – arrays og logikk",
  blocks: [
     {
      type: "paragraph", 
      text: ""
    },
       {
      type: "task",
      number: 1,
      title: "Skriv ut bestemte frukter",
      description:
        "Lag en array `fruits` med minst tre frukter. Skriv ut den første og siste frukten. (Hint: Bruk indeksen `fruits.length - 1` for siste element.)",
      code: `let fruits = ["Eple", "Banan", "Appelsin"];

// Skriv ut første og siste frukt`,
      solution: {
        code: `let fruits = ["Eple", "Banan", "Appelsin"];
console.log(fruits[0]);
console.log(fruits[fruits.length - 1]);`
      }
    },
    {
      type: "task",
      number: 2,
      title: "Utforsk shift(), unshift() og indexOf()",
      description:
        "Lag en array `fruits` med noen frukter. Bruk `shift()` til å fjerne den første frukten, `unshift()` til å legge til en ny frukt i starten, og `indexOf()` til å finne posisjonen til en bestemt frukt. Skriv ut resultatene underveis for å se hva som skjer.",
      code: `let fruits = ["Eple", "Banan", "Appelsin"];

// Fjern første frukt med shift()

// Legg til en ny frukt først med unshift()

// Finn posisjonen til "Appelsin" med indexOf()

// Skriv ut resultatene`,
      solution: {
        code: `let fruits = ["Eple", "Banan", "Appelsin"];
fruits.shift();
fruits.unshift("Kiwi");
let posisjon = fruits.indexOf("Appelsin");
console.log(fruits);
console.log("Appelsin ligger på plass:", posisjon);`
      }
    },
    {
      type: "task",
      number: 3,
      title: "Arbeid med array-metoder",
      description:
        "Lag en array `colors` som inneholder fargene `'red'`, `'green'` og `'blue'`. Bruk metoder og bytting av verdier for å endre rekkefølgen og innholdet.",
      code: `// 1. Lag en array med 'red', 'green' og 'blue'
// 2. Legg til 'black' på slutten og skriv ut arrayet
// 3. Fjern 'red', bytt plass på 'green' og 'blue'
// 4. Legg til 'yellow' først og skriv ut resultatet`,
      solution: {
        code: `let colors = ["red", "green", "blue"];
colors.push("black");
console.log(colors);
colors.shift();
let temp = colors[0];
colors[0] = colors[1];
colors[1] = temp;
console.log(colors);
colors.unshift("yellow");
console.log(colors);`
      }
    },
    {
      type: "task",
      number: 4,
      title: "Lengde og indekser",
      description:
        "Lag en array `numbers` med tallene 5, 10, 15, 20 og 25. Skriv ut: (1) antall elementer, (2) det midterste tallet, og (3) summen av det første og siste tallet.",
      code: `let numbers = [5, 10, 15, 20, 25];

// 1. Skriv ut lengden
// 2. Skriv ut det midterste tallet
// 3. Skriv ut summen av første og siste tall`,
      solution: {
        code: `let numbers = [5, 10, 15, 20, 25];
console.log(numbers.length);
console.log(numbers[2]);
console.log(numbers[0] + numbers[numbers.length - 1]);`
      }
    }

  ]
}

]
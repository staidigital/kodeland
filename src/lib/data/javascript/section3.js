export default [

{
  "id": "arrays",
  "title": "Arrays",
  "blocks": [
    {
      type: "paragraph",
      text: "En `array` er en liste med data, vanligvis relatert (elementene har en sammenheng med hverandre)."
    },

    {
      type: "extraInfo",
      icon: "example",
      content: [
        {
          type: "text",
          value:
            "Eksempler er vennelisten din på Facebook, en liste av leiligheter på Airbnb, en liste av kommentarer på et Instagram-innlegg."
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
      text: "Vi skal se litt ekstra på arrayen `handleliste`:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `let handleListe = ["melk", "egg", "brød"]
console.log(handleliste);`
    },
     {
      type: "paragraph",
      text: "Nedenfor er `handleliste`-arrayen visualisert:"
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
            width: "60%",
            align: "center",
            rounded: true,
            shadow: true
          },
        ]
      }
    },
     {
      type: "paragraph",
      text: "Plassen et element har i arrayet heter elementets  ^^indeks-nummer^^. Det første elementet i arrayet har indeks-nummer $$0$$, det neste elementet har indeks-nummer $$1$$ også videre."
    },
     {
      type: "paragraph",
      text: "Du kan bruke indeks-nummeret når du vil skrive ut et spesifikt element. For eksempel hvis du vil skrive ut `Owl` og `Falcon` fra listen `fruits` skriver du:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: "let birds = [\"Owl\", \"Eagle\", \"Parrot\", \"Falcon\"];\nconsole.log(birds[0])\nconsole.log(birds[3])"
    },
    {
      "type": "paragraph",
      "text": "Du kan gi en ny verdi til en spesifikk indeks:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: "let birds = [\"Owl\", \"Eagle\", \"Parrot\", \"Falcon\"];\nbirds[2]='Vulture'\nconsole.log(birds[2])"
    },
    {
      "type": "paragraph",
      "text": "En array er et objekt og har derfor noen egne metoder fra JavaScript som du kan bruke for å manipulere verdiene i arrayet. Du kan legge til en ny verdi på slutten med `push()`-metoden:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
       code: "let birds = [\"Owl\", \"Eagle\", \"Parrot\", \"Falcon\"];\nbirds.push(\"Sparrow\");\nconsole.log(birds)"
    },
    {
      "type": "paragraph",
      "text": "Du kan fjerne den siste verdien i arrayet med `pop()`:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let birds = [\"Owl\", \"Eagle\", \"Parrot\", \"Falcon\"];\nbirds.pop();\nconsole.log(birds)"
    },
    {
      "type": "paragraph",
      "text": "For å finne ut hvor mange verdier det er i listen, bruker vi `length`:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let birds = [\"Owl\", \"Eagle\", \"Parrot\", \"Falcon\"];\nconsole.log(birds.length);"
    },
  ]
},

{
  id: "sectionDatatypeQuiz",
  title: "Flervalgsoppgaver – datatyper",
  blocks: [
    {
      type: "paragraph",
      text: "Trykk på riktig alternativ for hvert spørsmål. Grønn er at du fikk riktig, rød er feil."
    },
    {
      type: 'task',
      number: 1,
      title: 'Hva skrives ut?',
      description: 'Hva vil denne koden skrive ut i konsollen?',
      code: `let animals = ["Hund", "Katt", "Fugl"];
console.log(animals[1]);`,
      solution: {
        correct: 1,
        options: [
          `"Hund"`,
          `"Katt"`,
          `"Fugl"`,
          `"undefined"`
        ]
      }
    },

    {
      type: 'task',
      number: 2,
      title: 'Hva skjer når vi bruker `pop()`?',
      description: 'Hva vil arrayen inneholde etter at vi bruker `pop()`?',
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
      type: 'task',
      number: 3,
      title: 'Hva er `push()` brukt til?',
      description: 'Hva gjør `push()` i en array?',
      solution: {
        correct: 0,
        options: [
          'Legger til et nytt element på slutten',
          'Fjerner det første elementet',
          'Sorterer arrayen',
          'Finner lengden på arrayen'
        ]
      }
    }
  ]
},

  {
  id: "arrayTasks",
  title: "Programmeringsoppgaver – arrays og logikk",
  blocks: [

    {
      type: "task",
      number: 1,
      title: "Skriv ut bestemte frukter",
      description: "Lag en array `fruits` med minst tre frukter. Skriv ut den første og siste frukten. (Husk at indeksen starter på 0!)",
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
      description: "Lag en array `fruits` med noen frukter. Bruk `shift()` til å fjerne den første frukten, `unshift()` til å legge til en ny frukt i starten, og `indexOf()` til å finne posisjonen til en bestemt frukt. Skriv ut resultatene underveis for å se hva som skjer.",
      code: `let fruits = ["Eple", "Banan", "Appelsin"];

    // Fjern første frukt med shift()

    // Legg til en ny frukt først med unshift()

    // Finn posisjonen til "Appelsin" med indexOf()

    // Skriv ut resultatene`,
      solution: {
        code: `let fruits = ["Eple", "Banan", "Appelsin"];

    fruits.shift();                  // fjerner "Eple"
    fruits.unshift("Kiwi");          // legger til "Kiwi" først
    let posisjon = fruits.indexOf("Appelsin");

    console.log(fruits);             // ["Kiwi", "Banan", "Appelsin"]
    console.log("Appelsin ligger på plass:", posisjon);`
      }
    },
    {
  type: "task",
  number: 3,
  title: "Arbeid med array-metoder",
  description: "Lag en array `colors` som inneholder fargene `'red'`, `'green'` og `'blue'`. Deretter skal du bruke ulike metoder for å endre rekkefølgen og innholdet i arrayen.",
  code: `// 1. Lag en array med 'red', 'green' og 'blue'

// 2. Legg til 'black' på slutten av arrayen, og skriv ut arrayen

// 3. Fjern 'red', bytt plass på 'green' og 'blue', og skriv ut arrayen

// 4. Legg til 'yellow' først i arrayen, og skriv ut arrayen`,
  solution: {
    code: `let colors = ["red", "green", "blue"];

// Legg til 'black' på slutten
colors.push("black");
console.log(colors); 
// ["red", "green", "blue", "black"]

// Fjern 'red'
colors.shift();

// Bytt plass på 'green' og 'blue'
let temp = colors[0];
colors[0] = colors[1];
colors[1] = temp;
console.log(colors);
// ["blue", "green", "black"]

// Legg til 'yellow' først
colors.unshift("yellow");
console.log(colors);
// ["yellow", "blue", "green", "black"]`
  }
},
{
      type: 'task',
      number: 4,
      title: "FreeCodeCamp-ressurser",
      description: '[Gjør Shopping-list-oppgaven på FreeCodeCamp](https://www.freecodecamp.org/learn/full-stack-developer/workshop-shopping-list/step-1)'
    },

  ]
}

]
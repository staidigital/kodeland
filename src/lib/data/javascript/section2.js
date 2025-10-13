export default [
  {
    id: "intro",
    title: "",
    blocks: [
      {
        type: 'paragraph',
        text: '^^Datatyper^^ er rett og slett definisjoner for ulike typer data som brukes i et programmeringspråk. En datatype spesifiserer hva du kan og hva du ikke kan gjøre med den dataen.'
      },
      {
        type: 'paragraph',
        text: 'For å bruke et enkelt eksempel, er du enig i at $$2+2=4$$? JavaScript er i så fall enig med det:'
      },
      {
        type:'code',
        language:'javascript',
        interactive: true,
        code: `console.log(2 + 2)`
      },
      {
        type: 'paragraph',
        text: 'Men hva om du prøver å addere et nummer med bokstaver?'
      },
      {
        type:'code',
        language:'javascript',
        interactive: true,
        code: `console.log(2 + "ABC")`
      },
      {
        type: 'paragraph',
        text: 'Når du adderer et nummer og en bokstav så setter JavaScript verdiene sammen.'
      },
      {
        type: 'paragraph',
        text: 'I denne seksjonen skal vi jobbe med de ulike grunnleggende datatypene som er relevante i JavaScript slik som:'
      },
      {
        type: 'list',
        items: [
          'String',
          'Tall',
          'Booleans',
          'Null',
          'Undefined'
        ]
      },
    ]
  },

  {
    id: "strings",
    title: "String",
    blocks: [
      {
        type: "paragraph",
        text: "Strings er data definert som en rekke med bokstaver. Altså tekst. Du har allerede sett et eksempel av string-data når du brukte `console.log()`."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let melding = "Hello World!";
console.log(melding);`
      },
      {
        type: "paragraph",
        text: "En string må lukkes med anførselstegn (enten enkle eller doble), men de må matche rundt stringen. "
      },
      {
        type: "paragraph",
        text: "Du kan sette sammen ulike strings ved å bruke $$+$$ operatoren."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let melding = "Hello " + "and " + "Goodbye";
console.log(melding);`
      },
      {
        type: "paragraph",
        text: "Eventuelt kan du skrive strings direkte i `console.log()` sammen med variabler-"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let navn = "Jens";
let tema = "JavaScript";
console.log(navn + " lærer seg " + tema + " i dag ");`
      },

      {
        type: "paragraph",
        text: "Strings kan også representere tall. Da vil JavaScript sette sammen tallene, istedenfor å addere tallene."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let score = "10" + "30";
console.log(score);`
      },
    ]
  },

  {
  id: "strings",
  title: "Tall",
  blocks: [
      {
        type: "paragraph",
        text: "For å kunne gjøre matematiske operasjoner ($$+$$, $$-$$, $$*$$, $$/$$) må vi bruke verdier med datatypen nummer. Det er to typer `int` (integer) eller `float`. Et integer er et heltall uten desimaler:"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let num1 = 1;
let num2 = 3;
console.log(num1 + num2);`
      },
      {
        type: "paragraph",
        text: "Floats derimot er tall med desimaler, slik som:"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let num1 = 1.2;
let num2 = 1.3; 
console.log(num1 + num2);`
      },
    ]
  },

  {
  id: "strings",
  title: "Boolean",
  blocks: [
      {
        type: "paragraph",
        text: "`Booleans` er en datatype som representerer `true` eler `false` verdier. Det er som en lysbryter, den kan enten være av eller på. I JavaScript brukes Booleans når programmet skal gjøre en avgjørelse: gå til høyre eller gå til venstre?"
      },
      {
        type: "paragraph",
        text: "Du lager en Boolean verdi i JavaScript på denne måten:"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let on = true;
let off = false; `
      },
       {
        type: "paragraph",
        text: "Vi bruker Booleans mye når vi jobber med betingelser i neste seksjon."
      },
    ]
  },

  {
  id: "strings",
  title: "Undefined og Null",
  blocks: [
      {
        type: "paragraph",
        text: "`Undefined` er en datatype som representerer en variabel som ikke har blitt tildelt en verdi ennå. Når du deklarerer en variabel uten å gi den en verdi vil den automatisk ha datatypen `undefined`."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let first_name;
console.log(first_name); //undefined`
      },

      {
        type: "paragraph",
        text: "`Null` er en spesiell datatype som representer en tom eller ukjent verdi."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let first_name = null`
      },
      {
        type: "paragraph",
        text: "Verdien til `first_name` er her tom eller ukjent. Forskjellen på `Undefined` og `Null` er liten, men i korte trekk blir variabler satt til `Undefined` når de blir deklarerert uten verdi. Når vi lærer om ^^Funksjoner^^ vil det bli en mer tydelig forskjell på disse datatypene."
      },
    ]
  },

  {
  id: "strings",
  title: "Oppsummert",
  blocks: [
      {
        type: "paragraph",
        text: ""
      },
      {
        type: "code",
        language: "javascript",
        interactive: false,
        code: `let name = "Ola Nordmann";  // string: tekst med anførselstegn
let age = 30;               // int: et helt tall
const PI = 3.14159;         // float: et desimaltall
let erStudent = true;       // boolean: kan være true eller false
let tomVerdi = null;        // null: tom verdi med vilje
let ikkeTildelt;            // undefined: laget variabelen, men ikke gitt den en verdi`
      },
    ]
  },

{
  "id": "arrays",
  "title": "Arrays (Lister)",
  "blocks": [
    {
      type: "paragraph",
      text: "En `array` (eller liste) er en objekt-datatype som kan holde mer enn en verdi. Det kan være en liste med strings, tall, booleans eller en miks av ulike datatyper."
    },
    {
      type: "paragraph",
      text: "Vi lager en array med firkantede paranteser `[]`, og skiller verdiene med komma. Her lager vi en liste med strings:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: "let birds = [\"Owl\", \"Eagle\", \"Parrot\", \"Falcon\"];"
    },
     {
      type: "paragraph",
      text: "Nedenfor er en visualisering av en `array`."
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
      text: "Posisjonen til et element i en `array` kalles et ^^indeks-nummer^^. Det første indeks-nummeret i en array er $$0$$."
    },
     {
      type: "paragraph",
      text: "For å hente ut eller endre på en verdi i en array må du bruke `[x]`-notasjon hvor `x` er indeks-nummeret til elementet. For eksempel hvis du vil skrive ut 'Owl' og 'Falcon' fra listen `fruits` skriver du:"
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
      type: "task",
      number: 1,
      title: "Hvilken datatype er dette?",
      description: "Hva er datatypen til variabelen `navn`?",
      code: `let navn = "Ola";`,
      solution: {
        correct: 0,
        options: [
          "String",
          "Number",
          "Boolean",
          "Undefined"
        ]
      }
    },

    {
      type: "task",
      number: 2,
      title: "Hva skrives ut?",
      description: "Hva blir resultatet når denne koden kjøres?",
      code: `let alder = 25;
let tekst = "Alder: " + alder;
console.log(tekst);`,
      solution: {
        correct: 1,
        options: [
          `"Alder: alder"`,
          `"Alder: 25"`,
          `"25"`,
          `"Alder: " + alder`
        ]
      }
    },

    {
      type: "task",
      number: 3,
      title: "Hva er verdien til x?",
      description: "Hva skrives ut i konsollen?",
      code: `let x;
console.log(x);`,
      solution: {
        correct: 2,
        options: [
          `"null"`,
          `"0"`,
          `"undefined"`,
          `"false"`
        ]
      }
    },

    {
      type: "task",
      number: 4,
      title: "Hva vil denne koden skrive ut?",
      description: "Se nøye på hva som skjer når vi legger sammen et tall og en streng.",
      code: `let a = 10;
let b = "5";
console.log(a + b);`,
      solution: {
        correct: 1,
        options: [
          `15`,
          `"105"`,
          `"NaN"`,
          `"10 + 5"`
        ]
      }
    }
  ]
},
{
  id: "sectionArrayQuiz",
  title: "Flervalgsoppgaver – arrays og indekser",
  blocks: [
    {
      type: 'paragraph',
      text: 'Her er noen spørsmål for å teste om du forstår hvordan arrays fungerer i JavaScript. Hva tror du skjer?'
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
      title: 'Hva er lengden?',
      description: 'Hva blir resultatet av denne koden?',
      code: `let numbers = [1, 2, 3, 4, 5];
console.log(numbers.length);`,
      solution: {
        correct: 2,
        options: [
          '4',
          '6',
          '5',
          '0'
        ]
      }
    },

    {
      type: 'task',
      number: 3,
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
      number: 4,
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
      type: "paragraph",
      text: "I disse oppgavene øver du på å bruke arrays sammen med if-setninger og variabler. Det gir deg mer kontroll over hvordan du jobber med flere verdier i JavaScript!"
    },
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

  ]
}

];

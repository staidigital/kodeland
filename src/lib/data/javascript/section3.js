export default [
  {
    id: "intro",
    title: "Introduksjon til datatyper og lister",
    blocks: [
      {
        type: 'paragraph',
        text: 'Når vi skriver kode, må vi ofte holde orden på ulike typer informasjon. Det kan være tall, tekst eller bare om noe er sant eller usant. Dette kalles for ^^datatyper^^.'
      },
      {
        type: 'paragraph',
        text: 'Det er viktig å vite hvilken type du bruker – fordi JavaScript behandler ulike typer informasjon på forskjellige måter. '
      },
      { type: 'paragraph',
        text: 'I JavaScript har vi flere slike datatyper. Her er noen vanlige:'
      },
      {
        type: 'list',
        items: [
          '`int` – heltall, som for eksempel `10`',
          '`float` – desimaltall, som `3.14`',
          '`boolean` – enten `true` (sant) eller `false` (usant)'
        ]
      },
      {
        type: 'paragraph',
        text: 'Det er viktig å vite hvilken datatype du bruker, fordi det hjelper deg å skrive kode som fungerer – og unngå feil som kan være vanskelige å finne.'
      }
    ]
  },
  
  {
  id: "primitive",
  title: "Enkle datatyper (primitive types)",
  blocks: [
    {
      type: "paragraph",
      text: "Nå skal vi se nærmere på de vanligste datatypene i JavaScript. Disse kalles for ^^primitive datatyper^^, og de er byggesteinene for nesten all kode du skriver."
    },
    {
      type: "paragraph",
      text: "Hver datatype brukes for å representere en bestemt type informasjon, som tall, tekst eller om noe er sant eller usant."
    },
    {
      type: "list",
      items: [
        "`Number`: brukes for tall – både heltall (som `5`) og desimaltall (som `3.14`).",
        "`String`: brukes for tekst – må alltid stå i anførselstegn, som `'Hei'` eller `\"Hallo\"`.",
        "`Boolean`: brukes når noe bare kan være `true` (sant) eller `false` (usant).",
        "`Null`: betyr at variabelen er tom med vilje – du har sagt 'denne har ingen verdi nå'.",
        "`Undefined`: betyr at variabelen er laget, men du har ikke gitt den noen verdi enda.",
        "`Symbol`: en spesiell type for unike verdier – den brukes mest i mer avansert kode, og du trenger den sjelden som nybegynner."
      ]
    },
    {
      type: "paragraph",
      text: "Her er noen eksempler som viser hvordan disse datatypene kan brukes:"
    },
    {
      type: "code",
      language: "javascript",
      code: `let age = 30;           // Number: et helt tall
let pi = 3.14;         // Number: et desimaltall

let name = "Ola Nordmann";  // String: tekst med anførselstegn

let isStudent = true;  // Boolean: kan være true eller false
console.log(typeof isStudent);   // "boolean"

let emptyValue = null; // Null: tom verdi med vilje
let notAssigned;       // Undefined: laget variabelen, men ikke gitt den en verdi`
    },
    {
      type: "paragraph",
      text: "💡 Som du ser i eksemplet ovenfor, kan du bruke `typeof` i JavaScript for å finne ut hvilken datatype en verdi har. Prøv f.eks. `console.log(typeof age);`"
    }
  ]
},
{
  "id": "arrays",
  "title": "Arrays (Lister)",
  "blocks": [
    {
      "type": "paragraph",
      "text": "En ^^array^^ (eller liste) brukes for å lagre flere verdier i én variabel. Det er nyttig når du trenger å jobbe med mange ting av samme type."
    },
    {
      "type": "paragraph",
      "text": "Vi lager en array med firkantede klammer `[]`, og verdiene skilles med komma."
    },
    {
      "type": "code",
      "language": "javascript",
      "code": "let fruits = [\"Eple\", \"Banan\", \"Appelsin\"];"
    },
    {
      "type": "paragraph",
      "text": "Verdiene i en array har en plassering, eller ^^indeks^^. Den første har plass 0, den andre har plass 1, osv."
    },
    {
      "type": "code",
      "language": "javascript",
      "code": "let fruits = [\"Eple\", \"Banan\", \"Appelsin\"];\nconsole.log(fruits[0]);  // \"Eple\"\nconsole.log(fruits[2]);  // \"Appelsin\""
    },
    {
      "type": "paragraph",
      "text": "Du kan legge til en ny verdi på slutten med `push()`:"
    },
    {
      "type": "code",
      "language": "javascript",
      "code": "let fruits = [\"Eple\", \"Banan\", \"Appelsin\"];\nfruits.push(\"Mango\");\nconsole.log(fruits);"
    },
    {
      "type": "paragraph",
      "text": "Du kan fjerne den siste verdien med `pop()`:"
    },
    {
      "type": "code",
      "language": "javascript",
      "code": "let fruits = [\"Eple\", \"Banan\", \"Appelsin\"];\nfruits.pop();\nconsole.log(fruits);"
    },
    {
      "type": "paragraph",
      "text": "For å finne ut hvor mange verdier det er i listen, bruker vi `length`:"
    },
    {
      "type": "code",
      "language": "javascript",
      "code": "let fruits = [\"Eple\", \"Banan\", \"Appelsin\"];\nconsole.log(fruits.length);"
    },
    {
      "type": "paragraph",
      "text": "💡 Husk: Indeksen starter alltid på 0, ikke 1!"
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
      title: "Sjekk om en liste er tom",
      description: "Lag en array `messages`. Hvis den ikke inneholder noen meldinger (altså lengden er 0), skriv 'Ingen meldinger'. Hvis den har meldinger, skriv 'Du har nye meldinger'.",
      code: `let messages = [];

// Skriv if-setning som sjekker lengden`,
      solution: {
        code: `let messages = [];

if (messages.length === 0) {
  console.log("Ingen meldinger");
} else {
  console.log("Du har nye meldinger");
}`
      }
    },
    {
      type: "task",
      number: 3,
      title: "Legg til og sjekk hobby",
      description: "Lag en array `hobbies` med noen interesser. Bruk `push()` til å legge til én ny hobby. Hvis listen har mer enn 3 elementer etterpå, skriv 'Mange interesser!'. Ellers: 'Få interesser.'",
      code: `let hobbies = ["Gaming", "Musikk"];

// Legg til en ny hobby og sjekk antallet`,
      solution: {
        code: `let hobbies = ["Gaming", "Musikk"];

hobbies.push("Løping");

if (hobbies.length > 3) {
  console.log("Mange interesser!");
} else {
  console.log("Få interesser.");
}`
      }
    },
    {
      type: "task",
      number: 4,
      title: "Bruk array med if og boolean",
      description: "Lag en array `besøkteLand`. Sjekk om 'Japan' er i lista. Hvis ja, skriv 'Du har vært i Japan!'. Hvis ikke, skriv 'Japan mangler fortsatt!'. (Tips: bruk `includes()`.)",
      code: `let besøkteLand = ["Norge", "Sverige", "Danmark"];

// Sjekk om 'Japan' finnes i listen`,
      solution: {
        code: `let besøkteLand = ["Norge", "Sverige", "Danmark"];

if (besøkteLand.includes("Japan")) {
  console.log("Du har vært i Japan!");
} else {
  console.log("Japan mangler fortsatt!");
}`
      }
    },
    {
      type: "paragraph",
      text: "Disse oppgavene viser hvordan arrays og if-setninger kan kombineres for å lage dynamiske programmer. Det gir deg mulighet til å reagere på data på smarte måter!"
    }
  ]
}

];

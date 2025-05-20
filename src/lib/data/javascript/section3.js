export default [
  {
    id: "intro",
    title: "Introduksjon til datatyper og lister",
    blocks: [
      {
        type: 'paragraph',
        text: 'Når vi programmerer, må vi ofte holde styr på forskjellige typer informasjon. I JavaScript finnes det flere `datatyper` som lar oss jobbe med tall, tekst og mer. Å forstå disse typene er viktig for å kunne lage god kode.'
      }
    ]
  },
  {
    id: "primitive",
    title: "1. Primitive datatyper",
    blocks: [
      {
        type: 'list',
        items: [
          '`Number`: Brukes for tall, enten de er heltall (som 5) eller desimaltall (som 3.14).',
          '`String`: Brukes for tekst. Teksten må være inni anførselstegn.',
          '`Boolean`: Brukes for verdier som er enten `true` eller `false`.',
          '`Null`: Representerer en tom eller ikke-eksisterende verdi.',
          '`Undefined`: En variabel som er deklarert men ikke gitt en verdi.',
          '`Symbol`: En spesiell, unik datatype (mer avansert og sjelden brukt).'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        code: `let age = 30;
let pi = 3.14;

let name = "Ola Nordmann";

let isStudent = true;

let emptyValue = null;

let notAssigned;`
      }
    ]
  },
  {
    id: "arrays",
    title: "2. Arrays (Lister)",
    blocks: [
      {
        type: 'paragraph',
        text: 'En `array` er en samling av flere verdier i én variabel. Dette gjør det lettere å jobbe med flere verdier på én gang.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `let fruits = ["Eple", "Banan", "Appelsin"];`
      },
      {
        type: 'paragraph',
        text: 'Tilgang til elementer skjer ved å bruke indeks (starter på 0).'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `console.log(fruits[0]);  // "Eple"
console.log(fruits[2]);  // "Appelsin"`
      },
      {
        type: 'paragraph',
        text: 'Legge til elementer med `push()` og fjerne med `pop()`.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `fruits.push("Mango");
console.log(fruits);

fruits.pop();
console.log(fruits);`
      },
      {
        type: 'paragraph',
        text: 'Sjekk lengden på arrayen med `length`.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `console.log(fruits.length);`
      }
    ]
  },
  {
    id: "sectionTasks",
    title: "Oppgaver",
    blocks: [
      {
        type: 'task',
        number: 1,
        title: "Oppgave 1: Primitive datatyper",
        description: `Lag variabler som representerer:
- Din alder som et tall
- Navnet ditt som en tekststreng
- Om du er student eller ikke som en boolean

Skriv disse ut i konsollen.`
      },
      {
        type: 'task',
        number: 2,
        title: "Oppgave 2: Enkle array-operasjoner",
        description: "Lag en array med tre favorittfrukter. Skriv ut den første og siste frukten i arrayen."
      },
      {
        type: 'task',
        number: 3,
        title: "Oppgave 3: Legge til og fjerne elementer",
        description: "Bruk `push()` for å legge til en ny frukt. Bruk deretter `pop()` for å fjerne den siste. Skriv ut arrayen etter begge operasjonene."
      },
      {
        type: 'paragraph',
        text: "Disse oppgavene gir deg en god forståelse av hvordan ulike datatyper og arrays fungerer i JavaScript. Arrays er en kraftig måte å holde styr på flere verdier på én gang, og når du kombinerer dem med de primitive datatypene, kan du lage mer komplekse og dynamiske programmer. 🚀"
      }
    ]
  }
];

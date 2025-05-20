export default [
  {
    id: "sectionIntro",
    title: "Introduksjon til funksjoner i JavaScript",
    blocks: [
      {
        type: "paragraph",
        text: "Funksjoner i JavaScript lar deg organisere og gjenbruke kode ved å definere et sett med instruksjoner som kan kjøres senere. Funksjoner gjør det lettere å strukturere koden og gjøre den mer lesbar og vedlikeholdbar."
      },
      {
        type: "quote",
        text: "Funksjoner i JavaScript er som små oppskrifter. Du skriver en oppskrift én gang, og så kan du bruke den igjen og igjen, akkurat når du trenger den."
      }
    ]
  },
  {
    id: "sectionDefineFunction",
    title: "1. Definere en funksjon",
    blocks: [
      {
        type: "code",
        language: "javascript",
        code: `function greet() {
  console.log("Hei, verden!");
}`
      },
      {
        type: "paragraph",
        text: "I dette eksempelet heter funksjonen `greet`. Hver gang vi kaller på `greet`, vil den skrive ut \"Hei, verden!\" i konsollen."
      }
    ]
  },
  {
    id: "sectionCallFunction",
    title: "2. Kalle en funksjon",
    blocks: [
      {
        type: "code",
        language: "javascript",
        code: `greet();  // Kaller funksjonen og den skriver "Hei, verden!"`
      }
    ]
  },
  {
    id: "sectionParameters",
    title: "3. Funksjoner med parametere",
    blocks: [
      {
        type: "code",
        language: "javascript",
        code: `function greetPerson(name) {
  console.log("Hei, " + name + "!");
}

greetPerson("Ola");  // Output: "Hei, Ola!"`
      },
      {
        type: "paragraph",
        text: "Her tar funksjonen `greetPerson` et parameter kalt `name`, og den skriver ut en personlig melding basert på hva vi sender inn."
      }
    ]
  },
  {
    id: "sectionReturnValues",
    title: "4. Returnere verdier",
    blocks: [
      {
        type: "code",
        language: "javascript",
        code: `function add(a, b) {
  return a + b;
}

let sum = add(5, 3);
console.log(sum);  // Output: 8`
      },
      {
        type: "paragraph",
        text: "Funksjoner kan også returnere en verdi, som vi kan bruke videre i programmet."
      }
    ]
  },
  {
    id: "sectionFunctionExpression",
    title: "5. Funksjonsuttrykk",
    blocks: [
      {
        type: "code",
        language: "javascript",
        code: `let greet = function() {
  console.log("Hei, verden!");
};

greet();  // Kaller funksjonen`
      },
      {
        type: "paragraph",
        text: "I dette eksempelet er funksjonen lagret i variabelen `greet`, og vi kan bruke den på samme måte som vanlige funksjoner."
      }
    ]
  },
  {
    id: "sectionTasks",
    title: "Oppgaver",
    blocks: [
      {
        type: "task",
        number: 1,
        title: "Oppgave 1: En enkel funksjon",
        description: "Lag en funksjon `sayHello`, som skriver ut \"Hei, verden!\" når den kalles. Kall funksjonen for å se resultatet."
      },
      {
        type: "task",
        number: 2,
        title: "Oppgave 2: Funksjoner med parametere",
        description: "Lag en funksjon `greetPerson`, som tar et navn som parameter og skriver ut \"Hei, [navn]!\". Kall funksjonen med ditt eget navn."
      },
      {
        type: "task",
        number: 3,
        title: "Oppgave 3: Funksjoner som returnerer verdier",
        description: "Skriv en funksjon `multiply` som tar to tall som parametere og returnerer produktet av dem. Kall funksjonen og skriv ut resultatet."
      },
      {
        type: "task",
        number: 4,
        title: "Oppgave 4: Funksjoner og lister",
        description: `Skriv et program som gjør følgende:
- Lag en liste med minst 5 navn.
- Bruk en løkke for å gå gjennom listen.
- Skriv ut en personlig melding til hvert navn på formatet: "Hei, navn! Velkommen!"
- Programmet skal telle antall navn i listen og til slutt skrive ut: "Det var x antall personer i listen."

**Ekstra utfordring**: Hvis navnet inneholder mer enn 4 bokstaver, skriv også: "[navn], du har et langt navn!"`
      },
      {
        type: "paragraph",
        text: "Disse oppgavene vil hjelpe deg å forstå hvordan funksjoner fungerer i JavaScript og hvordan du kan bruke dem til å gjøre programmene dine mer effektive og ryddige."
      }
    ]
  }
];


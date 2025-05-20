// section1.js

export default [

  // 🔹 INTRODUCTION
  {
    id: "sectionOne",
    title: "",
    blocks: [
      {
        type: 'paragraph',
        text: 'I JavaScript (og i programmering generelt) bruker vi variabler for å lagre informasjon som vi kan bruke senere. Det kan være et tall, et ord eller andre typer data.'
      },
      {
        type: 'paragraph',
        text: 'Vi kan definere variabler på tre hovedmåter i JavaScript: `var`, `let` og `const`.'
      }
    ]
  },

  // 🔹 VAR
  {
    id: "sectionTwo",
    title: "1. Det `var` en gang",
    blocks: [
      {
        type: 'list',
        items: [
          '`var` er den eldste måten å deklarere variabler på i JavaScript og ble mye brukt før 2015',
          'En variabel deklarert med `var` kan endres (reassignes) senere.',
          '`var` har funksjonsscope, noe som betyr at den kan brukes overalt innenfor funksjonen den er deklarert i.'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        code: `var name = "John";
console.log(name);  // Output: John
name = "Jane";
console.log(name);  // Output: Jane`
      }
    ]
  },

  // 🔹 LET
  {
    id: "sectionThree",
    title: "2. Den nye måten: `let`",
    blocks: [
      {
        type: 'list',
        items: [
          '`let` ble introdusert i en nyere versjon av JavaScript (ES6/ES2015)',
          'En variabel deklarert med let kan også endres, men den kan bare brukes i den spesifikke blokken (f.eks. en if-setning) den er laget i.',
          '`var` har funksjonsscope, noe som betyr at den kan brukes overalt innenfor funksjonen den er deklarert i.'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        code: `let alder = 30;
console.log(alder);  // Output: 30
alder = 31;
console.log(alder);  // Output: 31`
      }
    ]
  },

  // 🔹 CONST
  {
    id: "sectionFour",
    title: "3. Når noe er konstant: `const`",
    blocks: [
      {
        type: 'list',
        items: [
          '`const` er perfekt når du vil lage en variabel som ikke skal endres.',
          'Når du har definert en konstant, kan du ikke endre verdien senere.',
          '`const` har også blokkscope, akkurat som let.'
        ]
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const country = "Norway";
console.log(country);  // Output: Norway
// country = "Sweden";  // Dette vil gi en feil, siden const ikke kan reassignes.`
      }
    ]
  },

  // 📝 TASKS
  {
    id: "sectionTasks",
    title: "Oppgaver",
    blocks: [
      {
        type: 'task',
        number: 1,
        title: "Oppgave 1: Enkel variabelbruk",
        description: "Definer tre variabler: `firstName`, `lastName` og `age`. Gi dem verdier og skriv dem i konsollen."
      },
      {
        type: 'task',
        number: 2,
        title: "Oppgave 2: Endre variabler",
        description: "Lag en variabel `favoriteColor` med `let`. Gi den en verdi og skriv den ut. Endre så verdien av variabelen og skriv ut den nye verdien."
      },
      {
        type: 'task',
        number: 3,
        title: "Oppgave 3: Bruk av const",
        description: "Definer en konstant `PI` med verdien `3.14`. Prøv å endre verdien (spoiler: det vil ikke fungere!). Hva skjer?"
      },
      {
        type: 'task',
        number: 4,
        title: "Oppgave 4: Variabelscope",
        description: "Definer en variabel med `let` inne i en `if`-setning. Forsøk å bruke den utenfor `if`-setningen. Hva skjer?"
      },
      {
        type: 'task',
        number: 5,
        title: "Oppgave 5: Lag en kalkulator",
        description: "Lag to variabler, `num1` og `num2`, og gjør noen enkle berekninger med dem. Skriv ut summen, differansen, produktet og kvotienten i konsollen."
      },
      {
        type: 'paragraph',
        text: 'Disse oppgavene hjelper deg å forstå hvordan variabler fungerer i JavaScript. Husk at variabler er en av de viktigste delene av programmering, så det er viktig å øve på dem på riktig måte. Lykke til! 🚀'
      }
    ]
  }

];

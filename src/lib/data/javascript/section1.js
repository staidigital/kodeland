// section1.js

export default [

  // 🔹 INTRODUCTION
  {
    id: "sectionOne",
    title: "Variabler",
    blocks: [
      {
        type: 'paragraph',
        text: 'I JavaScript (og i programmering generelt) bruker vi **variabler** for å lagre ting vi vil bruke senere. Det kan være et tall, et navn eller noe annet vi trenger i koden vår.'
      },
      {
        type: 'paragraph',
        text: 'For å lage en variabel i JavaScript, kan vi bruke tre ord: `var`, `let` og `const`. De gjør nesten det samme, men det er noen forskjeller på hvordan og når vi bør bruke dem.'
      }
    ]
  },

  // 🔹 VAR
  {
    id: "sectionTwo",
    title: "1. Det `var` en gang",
    blocks: [
      {
        type: 'paragraph',
        text: '`var` er den gamle måten å lage variabler på i JavaScript. Før 2015 brukte mange `var`, men i dag bruker vi heller `let` eller `const`'
      },
      { type:'paragraph',
        text:'Når du lager en variabel med `var`, kan du endre verdien senere. I JavaScript skriver vi ting til **terminalen** med `console.log()`'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `var name = "Jens";
console.log(name);
name = "Faizan"; //nå er variabelen endret
console.log(name);`
      },

      {
        type: 'paragraph',
        text: 'En viktig ting med `var` er at den har **funksjonsscope**. Det betyr at hvis du lager `var` inne i en funksjon, kan du bruke den overalt inne i funksjonen - men ikke utenfor.'
      },
      
    ]
  },

  // 🔹 LET
  {
    id: "sectionThree",
    title: "2. Den nye måten: `let`",
    blocks: [
      {
        type: 'paragraph',
        text: '`let` kom i 2015 med en ny versjon av javascript (ES6), og den brukes mye i dag.'
      },
      {
        type: 'paragraph',
        text: 'Akkurat som med `var`, kan du lage en variabel med `let` og du kan endre verdien senere:'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `let alder = 30;
console.log(alder);
alder = 31;
console.log(alder);`
      },
      {
        type: 'paragraph',
        text: '**Men her er forskjellen:**'
      },
      {
        type: 'paragraph',
        text: 'Variabler laget med `let` kan bare brukes inne i **blokken** der de er laget. En blokk er for eksempel noe som er inni krøllparanteser `{}` – som en `if`-setning, en `for`-løkke eller en funksjon.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `if (true) {
  let melding = "Hei!";
  console.log(melding); // funker
}
console.log(melding); // funker ikke – "melding" finnes ikke utenfor blokka`
      },
      {
        type: 'paragraph',
        text: '**Forskjellen på `var` og `let`:**'
      },
      {
        type: 'list',
        items: [
          '`var` virker i hele funksjonen den er laget i (funksjonsscope).',
          '`let` virker bare inne i den blokken den er laget i (blokkscope).'
        ]
      }
    ]
  },

  // 🔹 CONST
  {
    id: "sectionFour",
    title: "3. Når noe ikke skal endres: `const`",
    blocks: [
      {
        type:'paragraph',
        text: 'Hvis du vil lage en variabel som ikke kan endres, bruker du `const`.'
      },
      {
        type:'code',
        language:'javascript',
        code: `const navn = "Anna";
navn = "Per"; // Feil! Vi kan ikke endre en const`
      },
      {},
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

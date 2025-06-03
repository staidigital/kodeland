// section1.js

export default [

  // 🔹 INTRODUCTION
  {
    id: "sectionOne",
    title: "",
    blocks: [
      {
        type: 'paragraph',
        text: 'I JavaScript (og i programmering generelt) bruker vi ^^variabler^^ for å lagre ting vi vil bruke senere. Det kan være et tall, et navn eller noe annet vi trenger i koden vår.'
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
        text: '`var` er den gamle måten å lage variabler på i JavaScript. Før 2015 brukte mange `var`, men i dag bruker vi heller `let` eller `const`.'
      },
      {
        type:'paragraph',
        text:'Når du lager en variabel med `var`, kan du endre verdien senere. I JavaScript skriver vi ting til ^^terminalen^^ med `console.log()`.'
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
        text: '`var` har **ikke** det vi kaller ^^blokkscope^^. Det betyr at hvis du lager en variabel med `var` inne i en blokk med klammeparenteser `{}` – sånne som vi bruker i `if`-setninger eller `for`-løkker, kan du fortsatt bruke den utenfor.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `if (true) {
  var melding = "Hei!";
}
console.log(melding); // funker – selv om den ble laget inni if-blokken`
      },
      
      {
        type: 'paragraph',
        text: 'Dette kan føre til rare feil – for eksempel at du tror en variabel bare kan brukes inni en blokk, men så blir den brukt videre i koden og skaper trøbbel.'
      },
      {
        type: 'paragraph',
        text: 'Med `let` skjer ikke dette. Den holder seg der du laget den. Det gjør koden din enklere å forstå og mindre rotete.'
      }
    ]
  },

  // 🔹 LET
  {
    id: "sectionThree",
    title: "2. Den nye måten: `let`",
    blocks: [
      {
        type: 'paragraph',
        text: '`let` kom i 2015 med en ny versjon av JavaScript (ES6), og den brukes mye i dag.'
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
        subtitle: 'Forskjellen fra `var`:'
      },
      {
        type: 'paragraph',
        text: 'Dersom en variabel lages med `let` inne i en blokk, vil den bare kunne brukes inne i blokken. Det vil si at `let` har ^^blokkscope^^.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `if (true) {
  let melding = "Hei!";
  console.log(melding); // funker
}
console.log(melding); // funker ikke – "melding" finnes ikke utenfor blokka`
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
        text: 'Hvis du vil lage en variabel som **ikke kan endres**, bruker du `const`.'
      },
      {
        type:'code',
        language:'javascript',
        code: `const country = "Norway";
country = "Sweden"; // Feil! Vi kan ikke endre en const
console.log(country);`
      },
      {
        type:'paragraph',
        text: 'Når du bruker `const`, må du gi den en verdi med én gang – og den verdien kan ikke byttes ut senere. Det gjør `const` perfekt for ting som aldri skal forandres, som f.eks. navnet på en app, en fast pris eller et maks antall forsøk.'
      },
      {
        type: 'paragraph',
        text: '`const` virker på samme måte som `let` når det gjelder hvor den gjelder – den virker bare inne i blokken den ble laget i.'
      }
    ]
  },

  // 🔹 Oppsummering
  {
    id: "Oppsummering",
    title: "Enkelt sagt",
    blocks: [
      {
        type:'list',
        items: [
          'Bruk `const` som standard – det gjør koden trygg og ryddig.',
          'Bruk `let` når du vet at verdien skal endres.',
          'Unngå `var` – det kan føre til rare feil og forvirring.'
        ]
      },
      {
        type:'code',
        language:'javascript',
        code: `const country = "Norway";
country = "Sweden"; // Feil! Vi kan ikke endre en const
console.log(country);`
      }
    ]
  },

  // 📝 TASKS
  {
  id: "sectionVarLetConstQuiz",
  title: "Flervalgsoppgaver - teori",
  blocks: [
    {
      type: 'paragraph',
      text: 'La oss teste hva du har lært om variabler. Svar på spørsmålene under:'
    },

    {
      type: 'task',
      number: 1,
      title: 'Hva er forskjellen på `var` og `let` når det gjelder blokk-scope?',
      description: 'Klikk på det riktige svaret:',
      solution: {
        correct: 2,
        options: [
          '`var` virker bare inne i blokken den ble laget i',
          '`let` virker overalt, også utenfor blokken',
          '`let` virker bare i blokken den ble laget i, mens `var` virker utenfor også',
          'Ingen forskjell – begge virker på samme måte'
        ]
      }
    },
    {
      type: 'task',
      number: 2,
      title: 'Når bør du bruke `const`?',
      description: 'Klikk på det riktige svaret:',
      solution: {
        correct: 1,
        options: [
          'Når du skal lage en variabel du vet skal endres senere',
          'Når du vil at verdien aldri skal kunne endres',
          'Når du trenger en rask variabel midlertidig',
          'Når du skal skrive ut noe i konsollen'
        ]
      }
    },

    {
      type: 'task',
      number: 3,
      title: 'Hva skjer hvis du prøver å bruke en `let`-variabel utenfor blokka den ble laget i?',
      description: 'Klikk på det riktige svaret:',
      solution: {
        correct: 0,
        options: [
          'Du får en feilmelding – variabelen finnes ikke der',
          'Den virker som vanlig, akkurat som `var`',
          'JavaScript lager automatisk en global variabel',
          'Ingenting skjer – koden blir ignorert'
        ]
      }
    }
  ]
  },
{
  id: "sectionTasks",
  title: 'Programmeringsoppgaver – i nettleseren!',
  blocks: [
    {
      type: 'paragraph',
      text: '🛠️ For å gjøre disse oppgavene, skal du lage din egen HTML-fil på maskinen din. Åpne Visual Studio Code og lag en ny fil som du kaller `oppgaver.html`.'
    },
    {
      type: 'paragraph',
      text: '🧪 Inne i `oppgaver.html` lager du et `<script>`-område der du kan skrive JavaScript. Det ser slik ut:'
    },
    {
      type: 'code',
      language: 'html',
      preview: 'false',
      code:
`<!DOCTYPE html>
<html>
  <head>
    <title>Mine JS-oppgaver</title>
  </head>
  <body>
    <script>
      // Her skal du skrive koden til oppgavene
    </script>
  </body>
</html>`
    },
    {
      type: 'paragraph',
      text: '🖥️ Når du åpner denne fila i nettleseren (f.eks. Chrome), kan du bruke ^^nettleserkonsollen^^ for å se hva som skjer. Høyreklikk og velg **"Inspiser"** → gå til **"Console"-fanen**.'
    },
    {
      type: 'paragraph',
      text: '📝 Skriv koden din inne i `<script>`-taggen. Bruk `console.log()` for å skrive ut informasjon og teste hva koden gjør.'
    },
    {
      type: 'paragraph',
      text: '🚀 Klar? Bla ned til oppgavene og prøv selv! Husk at du kan kommentere med `// Oppgave 1`, `// Oppgave 2`, osv. for å holde orden.'
    },

    // Oppgavene
    {
      type: 'task',
      number: 1,
      title: "Enkel variabelbruk",
      description: "Definer tre variabler: `firstName`, `lastName` og `age`. Gi dem verdier og skriv dem i konsollen."
    },
    {
      type: 'task',
      number: 2,
      title: "Endre variabler",
      description: "Lag en variabel `favoriteColor` med `let`. Gi den en verdi og skriv den ut. Endre så verdien av variabelen og skriv ut den nye verdien."
    },
    {
      type: 'task',
      number: 3,
      title: "Bruk av const",
      description: "Definer en konstant `PI` med verdien `3.14`. Prøv å endre verdien (spoiler: det vil ikke fungere!). Hva skjer?"
    },
    {
      type: 'task',
      number: 4,
      title: "Variabelscope",
      description: "Definer en variabel med `let` inne i en `if`-setning. Forsøk å bruke den utenfor `if`-setningen. Hva skjer?"
    },
    {
      type: 'task',
      number: 5,
      title: "Lag en kalkulator",
      description: "Lag to variabler, `num1` og `num2`, og gjør noen enkle berekninger med dem. Skriv ut summen, differansen, produktet og kvotienten i konsollen."
    },
    {
      type: 'paragraph',
      text: 'Disse oppgavene hjelper deg å forstå hvordan variabler fungerer i JavaScript. Husk at variabler er en av de viktigste delene av programmering, så det er viktig å øve på dem på riktig måte. Lykke til! 🚀'
    }
  ]
}

];

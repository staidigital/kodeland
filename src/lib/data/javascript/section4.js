export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Til nå har JavaScript-koden din kjørt linje for linje fra topp til bunn. Men hva om vi bare vil kjøre kode når en betingelse er sann (`true`)? Da bruker vi et veldig viktig konsept i programmering kalt ^^betingelser^^ (`if`-setninger)."
      },
      {
        type: "paragraph",
        text: "Tenk på en `if`-setning som å si til datamaskinen:"
      },
      {
        type:"paragraph",
        text: '%%"Hvis noe er sant - kjør denne kodeblokken"%%'
      },
      
     
      
      {
        type:"paragraph",
        text: 'For eksempel: Hvis alderen er over 18, skriv du er myndig.'
      },

      {
        type: "code",
        language: "javascript",
        interactive: false,
        code: `let age = 18;

if (age >= 18) {
  console.log("Du er myndig.");
}`
      },
      {
        type:"paragraph",
        text: 'Denne sjekken - *=er alder større eller lik 18=* - kalles en betingelse. Koden din gjør noe bare hvis betingelsen er `true`, altså ikke hvis betingelsen er `false`.'
      },
    ]
  },
  

  {
    id: "sammenligningsoperatorer",
    title: "Sammenligningsoperatorer",
    blocks: [
      {
        type: "paragraph",
        text: "I koden ovenfor bruker vi ^^sammenligningsoperatoren^^ `>=` for å sjekke om verdien til `age` er større eller lik 18. Dersom denne betingelsen er sann vil JavaScript gi `true`, og hvis usann gir JavaScript ut `false`."
      },
      {
        type: "paragraph",
        text: "De andre sammenligningsoperatorene er listet i tabellen her:"
      },
      {
        type: "table",
        headers: ["Navn", "Eksempel på operasjon", "Eksempel som gir `true`"],
        rows: [
          ["Lik", "`==`", "`3 == \"3\"`"],
          ["Strengt lik", "`===`", "`5 === 5`"],
          ["Ikke lik", "`!=`", "`3 != 4`"],
          ["Strengt ikke lik", "`!==`", "`5 !== '5'`"],
          ["Større enn", "`>`", "`10 > 5`"],
          ["Større enn eller lik", "`>=`", "`8 >= 8`"],
          ["Mindre enn", "`<`", "`2 < 5`"],
          ["Mindre enn eller lik", "`<=`", "`6 <= 6`"]
        ]
      },

      {
        type: "paragraph",
        text: "Med to likhetstegn `==` sammmenlignes verdiene med hverandre. Med tre likhetstegn `===` sammenlignes også datatypen til verdiene med hverandre."
      },
 

      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 30
console.log(age == 30) //true
console.log(age === 30) //true
console.log(age == '30') //true Number mot String gir True
console.log(age === '30') //false Number mot String gir False
console.log(age == 50) //false` 
      },


    ]
  },

  {
    id: "if",
    title: "Grunnleggende if-setning",
    blocks: [
      {
        type: "paragraph",
        text: "En `if`-setning sjekker om en betingelse er `true`. Hvis det stemmer, kjører koden som står inne i `if`-blokken - koden mellom klammeparantesene `{...}`."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 18;

if (age >= 18) {
  console.log("Du er myndig.");
}`
      },
      {
        type: "paragraph",
        text: 'I dette eksempelet sjekkes betingelsen `age >= 18`: %%Er alderen 18 eller mer?%% Siden alderen er `18` er betingelsen `true` og programmet skriver ut meldingen "Du er myndig."'
      },
      {
        type: "paragraph",
        text: "**Prøv selv:** Endre variabelen `age` til et lavere tall - f.eks. 16. Hva skjer da? Blir meldingen skrevet ut?"
      }

    ]
  },

  {
    id: "ifelse",
    title: "If-else-setning",
    blocks: [
       {
        type: "paragraph",
        text: 'Det er vanlig å inkludere en `else`-blokk når man bruker if-setninger. Dersom betingelsen i if-setningen ikke er `true`, skal blokken i else-setningen kjøre. %%Hvis noe er sant – gjør dette, hvis ikke – gjør dette.%%'
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 16;
if (age >= 18) {
  console.log("Du er myndig.");
} else {
  console.log("Du er ikke myndig.");
}`
      },
      {
        type: "paragraph",
        text: 'Her spør vi: %%Er alderen 18 eller mer?%% Siden alderen er `16` er betingelsen `false`. Dermed kjører programmet else-setningen istedet.'
      },
      {
        type: "paragraph",
        text: "**Prøv selv:** Endre verdien på `age` til et høyere tall. Hva skjer da?"
      }

    ]
  },
  {
    id: "ifelifelse",
    title: "If – else if – else",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger vil vi sjekke flere betingeler. Da kan vi bruke en kombinasjon av `if`, `else if`, og `else`. Du kan skrive så mange `else if`-setninger som du vil."
      },
{
        type: "paragraph",
        text: "Koden nedenfor er laget for en nettbutikk som selger varer og avhengig av prisen på varen skal beregne hvor mye kunden skal betale i frakt."
      },
      {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `let totalPris = 800;
let fraktKostnad;

if (totalPris <= 200) {
  fraktKostnad = 100
} else if (totalPris <= 1000 ) {
  fraktKostnad = 50
} else {
  fraktKostnad = 0
}

console.log(\`Du må betale $\{fraktKostnad\} kr i frakt\`)`
    },
      {
        type: "paragraph",
        text: "Her sjekker vi flere ting. Først: %%Er totalprisen 200 eller mindre?%% Hvis `true` settes `fraktKostnad = 100`. Hvis `false` går vi til neste: %%Er totalprisen 1000 eller mindre?%% Hvis `true` settes `fraktKostnad = 50`. Hvis `false` får vi siste alternativ – altså `else`-blokken, og `fraktKostnad = 0`."
      },
      {
        type: "paragraph",
        text: "Koden stopper så fort én betingelse er `true` – da hopper den over resten."
      },
      {
        type: "paragraph",
        text: "**Prøv selv:** Endre på verdien til `fraktKostnad`. Hva skjer da?"
      }
    ]
  },
  {
    id: "kombinering",
    title: "Kombinere betingelser (logiske operatorer)",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger vil vi sjekke flere ting på en gang. Da kan vi kombinere betingelser med `&&` (og), `||` (eller) og `!` (NOT)"
      },
      {
        type: "paragraph",
        text: "`&&` betyr at **begge** betingelsene må være `true` for at koden skal kjøre."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 20;
let hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("Du kan gå inn på konserten.");
}`
      },
       {
        type: "paragraph",
        text: "`||` betyr at **minst én** av betingelsene må være `true`."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
  console.log("Du har fri!");
}`
      },
      {
  type: "paragraph",
  text: "`!` betyr **ikke** — det snur en Boolean (`true`/`false`) til det motsatte"
},
         {
  type: "code",
  language: "javascript",
  interactive: true,
  code: `const hasDoneHomework = false;

if (!hasDoneHomework) {
  console.log("Du må gjøre leksene dine!");
}`
},
      {
  type: "paragraph",
  text: "Her er `hasDoneHomework` `false`. Når vi bruker `!hasDoneHomework` får vi verdien `true`. Derfor kjører `if`-blokken og viser meldingen."
},
    ]
  },

  {
  id: "sectionTasks",
  title: "Flervalgsoppgaver – if og booleans",
  blocks: [
    {
      type: 'paragraph',
      text: 'Her kommer noen spørsmål for å sjekke om du forstår hvordan `if`-setninger og booleans fungerer. Hva tror du skjer?'
    },
{
  type: 'task',
  number: 1,
  title: 'Hva skrives ut?',
  description: 'Hva vil denne koden skrive ut i konsollen?',
  code: `let age = 15;
if (age >= 18) {
  console.log("Du er voksen!");
}`,
  solution: {
    correct: 2,
    options: [
      'Du er voksen!',
      'Du er ikke voksen!',
      'Ingenting skrives ut'
    ]
  }
},

    {
      type: 'task',
      number: 2,
      title: 'Hva er resultatet av denne betingelsen?',
      description: 'Hva blir resultatet av betingelsen `(isWeekend || isHoliday)` når',
      solution: {
        correct: 0,
        options: [
          'true',
          'false',
          'undefined',
          'error'
        ]
      },
      code: `let isWeekend = false;
let isHoliday = true;`
    },

    {
      type: 'task',
      number: 3,
      title: 'Hva er sant om `&&` og `||`?',
      description: 'Velg det alternativet som er riktig:',
      solution: {
        correct: 2,
        options: [
          '`&&` betyr "enten eller"',
          '`||` betyr "begge må være `true`"',
          '`&&` betyr "begge må være `true`", `||` betyr "minst én må være `true`"',
          'De to symbolene betyr akkurat det samme'
        ]
      }
    },
      {
      type: "task",
      number: 4,
      title: "Hva skrives ut i konsollen her?",
      description: 'Velg det alternativet som er riktig:',
      code: `let a = true;
let b = false;

if ( (a && !b) || b) {
        console.log("Ja!")
}`,
      solution: {
        correct: 0,
        options: [
          "\"Ja!\"",
          "Ingenting",
          "Feilmelding"
        ]
      }    },
  ]
},

{
  id: "sectionTasks",
  title: "Programmeringsoppgaver – if-setninger og beslutninger",
  blocks: 
  [
  {
    "type": "paragraph",
    "text": "I noen av oppgavene nedenfor skal du bruke `prompt()`. Den viser en dialogboks der brukeren kan skrive inn tekst, og svaret lagres som en variabel."
  },
  {
    "type": "paragraph",
    "text": "Nedenfor er kode for å lagre brukerdata som variabel"
  },
  
  {
    "type": "code",
    "language": "javascript",
    "interactive": false,
    "code": "let number = prompt(\"Skriv inn et tall: \")"
  },
    {
    "type": "paragraph",
    "text": "Men pass på, `prompt()` gir en string! Så skal du skrive inn tall kan det være lurt å gjøre om variablens verdi til et tall"
  },
  {
    "type": "code",
    "language": "javascript",
    "interactive": false,
    "code": "let number = Number(prompt(\"Skriv inn et tall: \"))"
  },


  {
    "type": "task",
    "number": 1,
    "title": "Sjekk tall",
    "description": "Lag et program som sjekker om et tall er positivt, negativt eller null, og skriver ut riktig melding. Hvis tallet er over $$100$$ skriv ut 'Det var et stort tall!'",
    "solution": {
      "code": `let number = 120;
if (number > 100) {
  console.log('Det var et stort tall!');
} else if (number > 0) {
  console.log(number, 'er et positivt tall');
} else if (number < 0) {
  console.log(number, 'er et negativt tall');
} else {
  console.log('Tallet er 0!')
}
  `
  
  }

  },
  {
    "type": "task",
    "number": 2,
    "title": "Karaktersystem",
    "description": "Lag et program som sjekker hva en variabel `poeng` er mellom 0 og 100, og gir en karakter:\n90+: A\n80+: B\n70+: C\n60+: D\nUnder 60: F",
    "solution": {
      "code": "let poeng = Number(prompt(\"Skriv inn poengsum: \"));\nlet karakter;\nif (poeng >= 90) {\n  karakter = 'A';\n} else if (poeng >= 80) {\n  karakter = 'B';\n} else if (poeng >= 70) {\n  karakter = 'C';\n} else if (poeng >= 60) {\n  karakter = 'D';\n} else {\n  karakter = 'F';\n}\nconsole.log('Karakter:', karakter);"
    }
  },
  
  

  {
    "type": "task",
    "number": 3,
    "title": "Stemmerett",
    "description": "Be brukeren skrive inn alderen sin med `prompt()`. Hvis alderen er 18 år eller eldre, skriv 'Du er kvalifisert til å stemme'. Ellers skriv 'Du er ikke kvalifisert til å stemme ennå'.",
    "solution": {
      "code": "let alder = Number(prompt(\"Skriv inn alderen din: \"));\nif (alder >= 18) {\n  console.log('Du er kvalifisert til å stemme');\n} else {\n  console.log('Du er ikke kvalifisert til å stemme ennå');\n}"
    }
  },
  {
    "type": "task",
    "number": 4,
    "title": "Enkel passordkontroll",
    "description": "Be brukeren skrive inn et passord med `prompt()`. Hvis passordet er 'passord123', skriv 'Tilgang innvilget'. Ellers skriv 'Tilgang nektet'.",
    "solution": {
      "code": "let passord = prompt(\"Skriv inn passord: \");\nif (passord === 'passord123') {\n  console.log('Tilgang innvilget');\n} else {\n  console.log('Tilgang nektet');\n}"
    }
  },
  {
  type: "task",
  number: 5,
  title: "Logg inn-system (avansert)",
  description: `Lag et logg-inn-system med flere betingelser. Lag først variabler for brukernavn, passord og om brukeren er utestengt. Spør deretter brukeren om brukernavn og passord med \`prompt()\` eller ved å bruke \`<input>\` elementer (se seksjon om input på siden). Lag regler med if, else if, else og logiske operatorer:\n\n- Hvis brukeren er utestengt, skriv «Kontoen er sperret».\n- Hvis brukernavn og passord stemmer, skriv «Innlogging vellykket!».\n- Hvis brukernavn stemmer, men passordet er feil, skriv «Feil passord».\n- Hvis brukernavn ikke finnes, skriv «Ukjent bruker».`,
 
  solution: {
    code: `let username = "Admin";
let password = "1234";
let isBanned = false;

let inputUser = prompt("Brukernavn:");
let inputPass = prompt("Passord:");

if (isBanned) {
  console.log("Kontoen er sperret");
} else if (inputUser === username && inputPass === password) {
  console.log("Innlogging vellykket!");
} else if (inputUser === username && inputPass !== password) {
  console.log("Feil passord");
} else {
  console.log("Ukjent bruker");
}`
  }
}


]

}

];


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
        text: '**For eksempel:**'
      },
      {
        type:"list",
        items: [
          '**Hvis** brukeren er logget inn - skriv en velkomstmelding',
          '**Hvis** temperaturen er under 0 - skriv "Det er kaldt!"',
        ]
      },
      {
        type:"paragraph",
        text: 'Denne sjekken - *=er temperaturen under 0=* - kalles en betingelse. Koden din gjør noe bare hvis betingelsen er `true`.'
      },
    ]
  },
  

  {
    id: "sectionBetingelser",
    title: "Sammenligningsoperatorer",
    blocks: [
      {
        type: "paragraph",
        text: "JavaScript kan sammenligne to verdier og gi en Boolean som enten er `true` eller `false`."
      },
      {
        type: 'extraInfo',
        icon: 'example',
        content: [
          { type: 'text', value: 'Et eksempel på bruken av sammenligningsoperatorer er Facebook sin feature når en bruker har bursdag. Når du har bursdag så viser Facebook et bursdagsikon 🎂 og sender en notifikasjon til alle vennene dine.' },
          { type: 'text', value: 'For å sjekke om du har bursdag må Facebook sammenligne dagens dato med bursdagsdatoen din. ' },
          { type: 'text', value: '`dagensDato === bursdagsDato` eller `dagensDato == bursdagsDato`'},
          { type: 'text', value: 'Dersom du har bursdag returnerer denne testen ut booleanen `true`.'},
        ]
      },
      {
        type: "paragraph",
        text: "Med to likhetstegn `==` sammmenlignes verdiene med hverandre. Med tre likhetstegn `===` sammenlignes også datatypen til verdiene med hverandre. Det er vanligst å bruke `===` når du sammenligner verdier."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 30
console.log(age == 30) //true
console.log(age === 30) //true
console.log(age == '30') //true
console.log(age === '30') //false
console.log(age == 50) //false`
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



    ]
  },

  {
    id: "sectionBasicIf",
    title: "Grunnleggende if-setning",
    blocks: [
      {
        type: "paragraph",
        text: "En `if`-setning sjekker om en betingelse er `true`. Hvis det stemmer, kjører koden som står inne i if-blokken - koden mellom klammeparantesene `{...}`."
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
    id: "sectionIfElse",
    title: "If-else-setning",
    blocks: [
       {
        type: "paragraph",
        text: 'Det er vanlig å inkludere en `else`-blokk når man bruker if-setninger. Dersom betingelsen i if-setningen ikke er `true`, skal blokken i else-setningen kjøre. %%Hvis `true` – gjør dette, hvis ikke `true` – gjør dette.%%'
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
    id: "sectionElseIf",
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

console.log('Du må betale', fraktKostnad, 'kr i frakt')
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
        text: "I koden ovenfor skriver vi resultat ut på to forskjellige måter. Den ene skiller mellom string og variabler med `,`. Den andre bruker backticks \` til å lage en ^^template string^^, hvor man kan referere til variabelen i stringen med $ og {variabelnavn}. Velg din favoritt!"
      }
    ]
  },
  {
    id: "sectionConditions",
    title: "Kombinere betingelser (logiske operatorer)",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger vil vi sjekke flere ting på en gang. Da kan vi kombinere betingelser med `&&` (og), `||` (eller) og `!` (NOT)"
      },
      {
        type: "paragraph",
        text: "`&&` betyr at **begge** betingelsene må være `true`."
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
        text: "Her sjekker vi to ting: %%er personen over 18 **og** har billett?%% Hvis begge stemmer, slipper de inn."
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
        text: "Her sjekker vi: %%er det helg **eller** ferie?%% Hvis minst én av dem stemmer, får vi fri!"  
      },
      {
        type: "paragraph",
        text: "**Prøv selv:** Endre verdiene i eksemplene over for å se hvordan `&&` og `||` fungerer."
      },
      {
        type: "paragraph",
        text: "`!` flipper verdien til en boolean og kan være nyttig også. For eksempel"
      },
          {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `const isRaining = false;

if (!isRaining){
  console.log("Du trenger ikke en paraply")
}`
      },
      {
        type: "paragraph",
        text: "Siden `isRaining = false`, vil `!isRaining` bli `true`. Dermed er betingelsen `true` og if-blokken kjøres."
      },
    ]
  },

  {
  id: "sectionBooleanQuiz",
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
    "type": "task",
    "number": 1,
    "title": "Sjekk tall",
    "description": "Lag en variabel `number`. Skriv en if-setning som sjekker om `number` er større enn $$10$$. Hvis ja, skriv ut 'Større enn 10'. Ellers: '10 eller mindre'.",
    "solution": {
      "code": "let number = prompt(\"Skriv inn et tall: \");\nif (Number(number) > 10) {\n  console.log('Større enn 10');\n} else {\n  console.log('10 eller mindre');\n}"
    }
  },
  {
    "type": "task",
    "number": 2,
    "title": "Karaktersystem",
    "description": "Lag et program som tar en variabel `poeng` og gir karakter slik:\n90+: A\n80+: B\n70+: C\n60+: D\nUnder 60: F",
    "solution": {
      "code": "let poeng = Number(prompt(\"Skriv inn poengsum: \"));\nlet karakter;\nif (poeng >= 90) {\n  karakter = 'A';\n} else if (poeng >= 80) {\n  karakter = 'B';\n} else if (poeng >= 70) {\n  karakter = 'C';\n} else if (poeng >= 60) {\n  karakter = 'D';\n} else {\n  karakter = 'F';\n}\nconsole.log('Karakter:', karakter);"
    }
  },
  {
    "type": "task",
    "number": 3,
    "title": "Sammenlign to tall",
    "description": "Be brukeren skrive inn to tall med `prompt()`. Sammenlign tallene og skriv ut en melding i konsollen som forteller hvilket tall som er størst – eller om de er like.",
    "solution": {
      "code": "let a = Number(prompt(\"Skriv inn første tall: \"));\nlet b = Number(prompt(\"Skriv inn andre tall: \"));\nif (a > b) {\n  console.log(a + ' er størst');\n} else if (b > a) {\n  console.log(b + ' er størst');\n} else {\n  console.log('Tallene er like');\n}"
    }
  },
  {
    "type": "task",
    "number": 4,
    "title": "Stemmerett",
    "description": "Be brukeren skrive inn alderen sin med `prompt()`. Hvis alderen er 18 år eller eldre, skriv 'Du er kvalifisert til å stemme'. Ellers skriv 'Du er ikke kvalifisert til å stemme ennå'.",
    "solution": {
      "code": "let alder = Number(prompt(\"Skriv inn alderen din: \"));\nif (alder >= 18) {\n  console.log('Du er kvalifisert til å stemme');\n} else {\n  console.log('Du er ikke kvalifisert til å stemme ennå');\n}"
    }
  },
  {
    "type": "task",
    "number": 5,
    "title": "Enkel passordkontroll",
    "description": "Be brukeren skrive inn et passord med `prompt()`. Hvis passordet er 'passord123', skriv 'Tilgang innvilget'. Ellers skriv 'Tilgang nektet'.",
    "solution": {
      "code": "let passord = prompt(\"Skriv inn passord: \");\nif (passord === 'passord123') {\n  console.log('Tilgang innvilget');\n} else {\n  console.log('Tilgang nektet');\n}"
    }
  },
  {
    "type": "task",
    "number": 6,
    "title": "Er det fredag?",
    "description": "Lag et program som sjekker om det er fredag, og om du kan gå hjem. Hvis det er fredag, skriv 'Det er fredag!'. Hvis det **både** er fredag og klokka er 15:30, skriv 'God helg – sees på mandag! Husk stolen på fredag da.'\n\nTips: Sjekk ut `Date()`-objektet her: [https://www.w3schools.com/jsref/jsref_getday.asp](https://www.w3schools.com/jsref/jsref_getday.asp)",
    "solution": {
      "code": "let nå = new Date();\nlet dag = nå.getDay(); // 5 = fredag\nlet timer = nå.getHours();\nlet minutter = nå.getMinutes();\n\nif (dag === 5) {\n  console.log('Det er fredag!');\n  if (timer === 15 && minutter === 30) {\n    console.log('God helg – sees på mandag! Husk stolen på fredag da.');\n  }\n}"
    }
  }
]

}

];


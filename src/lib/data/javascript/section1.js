// section1.js

export default [
  
  {
    id: "sectionOne",
    title: "",
    blocks: [
      
      {
        type:'paragraph',
        text:'I JavaScript (og i programmering generelt) bruker vi ^^variabler^^ for å lagre informasjon som vi kan bruke senere. Det kan være et tall, et ord eller andre typer data.'
      },
      {
        type: 'extraInfo',
        icon: 'note',
        content: [
          { type: 'text', value: 'Konseptet om variabler er de samme i alle programmeringsspråk, uansett om du bruker *=Python=*, *=Java=*, *=C++=*, *=Swift=* eller andre språk.' },
          { type: 'images', value: [
              { src: '/images/js/lang/python-logo.png', alt: 'Python' },
              { src: '/images/js/lang/java.png', alt: 'Java' },
              { src: '/images/js/lang/clang.png', alt: 'C++' },
              { src: '/images/js/lang/swift.png', alt: 'Swift' },
            ]
          },
          { type: 'text', value: 'Bare ^^syntaxen^^ er forskjellig! Altså hvordan man skriver ting. Så ved å lære et språk vil du enklere lære andre også!' },
        ]
      },
      ]
    },


    // 🔹 LET
  {
    id: "lageVariabler",
    title: "Lage variabler",
    blocks: [

        {
        type:'paragraph',
        text:'For å lage en variabel skriver du kodeordet `let` og deretter variabelnavnet. Deretter tildeler du en ^^verdi^^ til variabelen med tildelingsoperatoren `=`. Nå kan du referere til denne variabelen i programmet ditt.'
      },

      {
        type:'paragraph',
        text:'Du kan endre verdien til en variabel senere i programmet ved å gi den en ny verdi. Dette kalles å ^^re-assigne^^ verdien.'
      },
       {
      type: 'code',
      language: 'javascript',
      interactive: false,
      code: `let melding = "Hello World!"; //tildeler verdi
console.log(melding);

melding = "Fint vær i dag!"; //re-assigner verdi
console.log(melding);`
    },
      
  
              
      {
        type:'paragraph',
        text:'Du kan med `console.log()` skrive ut både en `String` (tekst mellom anførselstegn) **og** referere til verdien til en variabel: Nedenfor er tre metoder å gjøre det på: '
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let navn = "Jens";
let tema = "JavaScript";
console.log(navn + " lærer seg " + tema + " i dag "); // bruker +
console.log(navn, "lærer seg", tema, "i dag");        // bruker ,
console.log(\`$\{navn\} lærer seg $\{tema\} i dag\`);   // bruker \` og $\{} `
      },
     {
        type:'paragraph',
        text:'Den første metoden bruker ^^string-konkatenering^^, der flere tekster og variabler slås sammen med `+`. Den andre metoden skiller verdier med `,`, og `console.log()` legger automatisk mellomrom mellom dem. Den siste metoden bruker ^^template-strings^^, som lar deg skrive tekst og variabler direkte i én `String` ved å bruke backticks (\`) og ${} for variablene.'
      },
      
      {
        type: "extraInfo",
        icon: "keyboard",
        content: [
  
          {
            type: "text",
            value:
              "For å lage backticks (`) trykker du *=option + ´=*. For å lage dollartegn bruker du *=shift + 4=*. For å lage klammeparenteser {} trykker du *=option + shift + 8=*. "
          }
        ]
      },
    ]
  },
  
//   // 🔹 LET
//   {
//     id: "sectionOne",
//     title: "",
//     blocks: [
      
//       {
//         type:'paragraph',
//         text:'Gå inn i `main.js`-filen din og endre koden slik at det står:'
//       },
//       {
//         type: 'code',
//         language: 'javascript',
//         interactive: false,
//         code: `let melding = "Hello World!"; // Lager en variabel
// console.log(melding);`
//       },
//       {
//         type:'paragraph',
//         text:'I konsollen skal du nå få samme melding som når du skrev `console.log("Hello World!")` i Setup-seksjonen, men denne gangen kommer teksten fra en variabel!.'
//       },

//         {
//         type:'paragraph',
//         text:'For å lage en variabel skriver du kodeordet `let` og deretter variabelnavnet. Deretter tildeler du en ^^verdi^^ til variabelen med tildelingsoperatoren `=`.'
//       },
//       {
//         type:'paragraph',
//         text:'Du kan endre verdien til en variabel senere i programmet ved å gi den en ny verdi. Dette kalles å ^^re-assigne^^ verdien.'
//       },
//       {
//       type: 'code',
//       language: 'javascript',
//       interactive: false,
//       code: `let melding = "Hello World!";
// console.log(melding);

// melding = "Fint vær i dag!";
// console.log(melding);`
//     },

//       {
//         type:'paragraph',
//         text:'Du kan med `console.log()` skrive ut både en string og en variabel:'
//       },

//     {
//       type: 'code',
//       language: 'javascript',
//       interactive: false,
//       code: `let navn = "Mia";
// console.log("Hei " + navn + "!");`
//     },
//       {
//         type: "extraInfo",
//         icon: "example",
//         content: [
  
//           {
//             type: "text",
//             value:
//               "**Hvorfor bruke variabler:**"
//           },
//           {
//             type: "text",
//             value:
//               "Se for deg at du endrer navnet ditt på Facebook. Da må navnet ditt endres alle steder hvor det befinner seg: på profilsiden din, i vennelisten til vennene dine, på innlegg du har skrevet, på kommentarer du har skrevet etc. Uten variabler måtte Facebook manuelt funnet stedene navnet er skrevet og endret det, noe som er tungvint. Isteden kan man lage en navnvariabel som refereres i resten av programmet, og kan enkelt endres"
//           }
//         ]
//       },
      
//     ]
//   },

  // NAVNGIVNING
{
  id: "navngiVariabler",
  title: "Navn til variabler",
  blocks: [
    {
      type:'paragraph',
      text: 'Variabler bør ha beskrivende navn som passer verdien. Noen regler gjelder i JavaScript:'
    },
    {
      type:'paragraph',
      text: '1) Bare bokstaver, tall og understrek (_).'
    },
    {
      type:'paragraph',
      text: '2) Kan ikke starte med tall.'
    },
    {
      type:'paragraph',
      text: '3) Ikke bruk reserverte ord som `if`.'
    },
    {
      type:'paragraph',
      text: '4) Case-sensitive: `Message` ≠ `message`.'
    },
    {
      type:'paragraph',
      text: '5) Flere ord: bruk camelCase, f.eks.:'
    },
    {
      type:'code',
      language:'javascript',
      interactive: false,
      code: `let myAwesomeVariable`
    },
    {
      type:'paragraph',
      text: 'Eksempel og regler:'
    },
    {
      type:'code',
      language:'javascript',
      interactive: false,
      code: `let navn = "Jens"
console.log(navn)

// Beskrivende
// Ikke start med tall
// Ingen mellomrom/bindestrek
// Ikke reserverte ord
// Case-sensitive
// Bruk camelCase`
    },
  ]
},

  // 🔹 CONST
  {
    id: "constVariabler",
    title: "Konstante variabler",
    blocks: [
      {
        type:'paragraph',
        text: 'En konstant variabel er en variabel som ikke endrer sin verdi så lenge koden kjører. Vi bruker `const`-kodeordet for å lage en konstant variabel.'
      },

      {
        type:'code',
        language:'javascript',
        interactive: false,
        code: `const FILE_SIZE_LIMIT = 2000
const MAX_SPEED = 300
MAX_SPEED = 200 //gir error`
      },
       {
        type:'paragraph',
        text: 'Som du ser bruker vi bare store bokstaver når vi gir navn til en konstant. Det er for å gjøre konstanter mer tydelige i koden.'
      },
    ]
  },

  // 📝 TASKS
{
  id: "sectionTasks",
  title: 'Programmeringsoppgaver om variabler',
  blocks: [
    // Oppgavene
    {
      type: "paragraph",
      text: 'Usikker på hvordan du bør skrive og lagre din egen JavaScript-kode? Trykk på [denne lenken](/javascript/part0/) for å lære hvordan du kobler en `js`-fil til en `html`-fil.'
    },
    {
      type: 'task',
      number: 1,
      title: "Enkel variabelbruk",
      description: "Skriv et program som definerer tre variabler: `firstName`, `lastName` og `age`. Gi dem verdier og skriv dem ut i konsollen."
    },

    {
      type: 'task',
      number: 2,
      title: "Endre variabler",
      description: "Lag en variabel `favoriteColor` med `let`. Re-assign (gi en ny verdi) til variabelen på neste linje, og skriv den ut igjen."
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
      title: "Gjør enkel matte med variabler",
      description: "Lag to variabler, `num1` og `num2`, og gjør noen enkle berekninger med dem. Skriv ut summen, differansen, produktet og kvotienten."
    },
    {
      type: 'task',
      number: 5,
      title: "Bruk av template strings",
      description: "Lag variablene `navn` og `aktivitet`, og gi dem passende verdier.  Skriv ut setningen '(navn) liker å drive med (aktivitet)'. Bruk alle de tre måtene vi har lært: ved å bruke `,`, string-konkatonering `+` og template strings ``${}``."
    },


    
  ]
}

];



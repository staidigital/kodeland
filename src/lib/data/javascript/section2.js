export default [
  

  {
    id: "intro",
    title: "",
    blocks: [
      {
        type: 'paragraph',
        text: 'I JavaScript har alle verdier en ^^datatype^^. Det forteller hva slags data du jobber med, og hva du kan gjøre med den. De viktigste typene du trenger å vite om nå er forklart nedenfor.'
      },
    ]
  },

  {
  id: "number",
  title: "Number",
  blocks: [

      {
        type: "paragraph",
        text: "En viktig datatype som brukes av veldig mange nettsider er `Number`. Number inkluderer både heltall (`int`) og desimaltall (`float`)."
      },
      {
        type: "extraInfo",
        icon: "example",
        content: [
          {
            type: "text",

            value:
              "Tall brukes ofte i beregninger som nettsiden må gjøre. For eksempel bruker Amazon tall til å regne ut og vise gjennomsnittlig rating av produktene sine."
          }
        ]
      },
      {
        type: "paragraph",
        text: "For å kunne gjøre matematiske operasjoner ($$+$$, $$-$$, $$*$$, $$/$$) må datatypen være `Number`."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let num1 = 1; //integer
let num2 = 3;
console.log(num1 + num2);

let rating1 = 5; //float
let rating2 = 4.5; 
let rating3 = 4; 
let averageRating = (rating1 + rating2 + rating3)/3

console.log(averageRating);`
      },

    ]
  },
  {
    id: "string",
    title: "String",
    blocks: [
      {
        type: "paragraph",
        text: '`String` brukes for tekst og er skrevet mellom anførselstegn, enten doble " ", single \' \' eller med backticks \`.'
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let navn1 = "Jens";
let navn2 = 'Julia';
let navn3 = \`Anders\`;

console.log(navn1, navn2, navn3);`
      },
      {
        type: "paragraph",
        text: "Andre eksempler på strings:"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `"3", "a", "ü", "navn88", "first.lastname@gmail.com", "passord#**", " "`
      },
      {
        type: "paragraph",
        text: "Du kan sette sammen ulike strings ved å bruke $$+$$-operatoren. "
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
        text: "Strings kan også representere tall. Da vil JavaScript sette sammen tallene, istedenfor å addere tallene. Hvis du vil gjøre matematisk operasjon, dropp anførselstegn!"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let score = "10" + "30"; // String
console.log(score);

score = 10 + 30; //Number
console.log(score)`
      },
    ]
  },


  {
  id: "boolean",
  title: "Boolean",
  blocks: [
      {
        type: "paragraph",
        text: "`Booleans` er en datatype som representerer `true` eller `false` verdier, verdier som enten er sanne eller usanne."
      },

      {
        type: "extraInfo",
        icon: "example",
        content: [
          {
            type: "text",
            value:
              "I JavaScript brukes Booleans når programmet skal gjøre en avgjørelse: er passordet som ble sendt inn riktig eller galt? Er brukeren logget inn, eller ikke?"
          }
        ]
      },
      {
        type: "paragraph",
        text: "Du lager en Boolean verdi i JavaScript på denne måten:"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let erStudent = true;
let darkMode = false;`
      },
       {
        type: "paragraph",
        text: "Vi bruker Booleans mye når vi jobber med `if-else` senere."
      },

    ]
  },

  {
  id: "undefinednull",
  title: "Undefined og Null",
  blocks: [
      {
        type: "paragraph",
        text: "`Undefined` er en datatype som representerer en variabel som ikke ennå har blitt tildelt en verdi.."
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
        text: "`Null` er en datatype som representer en tom eller ukjent verdi."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let first_name = null`
      },
      {
        type: "paragraph",
        text: "Forskjellen på `undefined` og `null` er liten, men i korte trekk blir variabler satt til `undefined` når de blir deklarerert uten verdi, mens `null` tildeler vi til variabelen hvis vi ikke vil at den skal ha noe innhold."
      },
    ]
  },

  {
  id: "oppsummert",
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
let age = 30;               // number: et tall
let erStudent = true;       // boolean: kan være true eller false
let tomVerdi = null;        // null: tom verdi med vilje
let ikkeTildelt;            // undefined: laget variabelen, men ikke gitt den en verdi`
      },
      {
  type: "extraInfo",
  icon: "lightbulb",
  content: [
    {
      type: "text",
      value: "Tips: Du kan sjekke hvilken datatype en verdi har med `typeof`. Prøv `typeof 'hello'` eller `typeof 42`!"
    }
  ]
}

    ]
  },

// {
//   id: "sectionTasks",
//   title: "Flervalgsoppgaver – datatyper",
//   blocks: [
//     {
//       type: "paragraph",
//       text: "Trykk på riktig alternativ for hvert spørsmål. Grønn er at du fikk riktig, rød er feil."
//     },

//     {
//       type: "task",
//       number: 1,
//       title: "Hvilken datatype er dette?",
//       description: "Hva er datatypen til variabelen `navn`?",
//       code: `let navn = "Ola";`,
//       solution: {
//         correct: 0,
//         options: [
//           "String",
//           "Number",
//           "Boolean",
//           "Undefined"
//         ]
//       }
//     },

//     {
//       type: "task",
//       number: 2,
//       title: "Hva er verdien til x?",
//       description: "Hva skrives ut i konsollen?",
//       code: `let x;
// console.log(x);`,
//       solution: {
//         correct: 2,
//         options: [
//           `"null"`,
//           `"0"`,
//           `"undefined"`,
//           `"false"`
//         ]
//       }
//     },
//     {
//   type: "task",
//   number: 3,
//   title: "Hvilken datatype får vi her?",
//   description: "Hva er datatypen til resultatet av dette uttrykket?",
//   code: `let result = "5" + 2;`,
//   solution: {
//     correct: 0,
//     options: [
//       "String",
//       "Number",
//       "Boolean",
//       "Undefined"
//     ]
//   }
// }



//   ]
// },


  // 📝 TASKS
{
  id: "sectionTasks",
  title: 'Programmeringsoppgaver om datatyper',
  blocks: [
    // Oppgavene
    {
      type: "paragraph", 
      text: ""
    },
    
    {
      type: 'task',
      number: 1,
      title: "Skrive ut numbers og strings",
      description: "Lag en variabel som inneholder antall bokstaver i navnet ditt. Skriv ut «Hallo (ditt navn). Ditt navn har (ditt antall bokstaver) bokstaver»."
    },
    {
      type: 'task',
      number: 2,
      title: "Regning med numbers",
      description: "Lag variablene `radius` og `pi`. Pi skal ha verdien 3.14 og radius bestemmer du. \n\nLag variabelen `omkrets` som regner ut omkretsen av en sirkel.  \n\n`Omkrets = 2*Pi*r` \n \nSkriv ut `\"For radius (radius) er omkretsen (omkrets)\"`"
    },
     {
      type: 'task',
      number: 3,
      title: "Finn datatypen",
      description: "Lag fem variabler med ulike typer data: et tall, en tekst, en boolean, `null` og `undefined`. \n\nSkriv ut typen til hver variabel med `typeof`."
    },

    

    {
      type: 'task',
      number: 4,
      title: "Tekst + tall = ?",
      description: "Lag en variabel `a = \"10\"` og `b = 5`. \n\nPrøv å skrive ut `a + b`, og deretter `Number(a) + b`. \n\nHva skjer, og hvorfor?"
    },

    
  ]
},
];

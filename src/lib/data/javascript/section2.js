export default [
  {
    id: "intro",
    title: "",
    blocks: [
      {
        type: 'paragraph',
        text: 'I JavaScript referer ^^datatyper^^ til hva slags type verdi en variabel kan tildeles. En datatype spesifiserer hva du kan og hva du ikke kan gjøre med den dataen.'
      },
      {
        type: 'paragraph',
        text: 'I denne seksjonen skal vi jobbe med de ulike grunnleggende datatypene som er relevante i JavaScript.'
      },
    ]
  },

  {
  id: "number",
  title: "Number",
  blocks: [

      {
        type: "paragraph",
        text: "En viktig datatype som brukes av veldig mange nettsider er `number` (tall). Når du lager en nettside eller applikasjon så er det åpenbart at man må forholde seg til tall."
      },
      {
        type: "extraInfo",
        icon: "example",
        content: [
          {
            type: "text",
            value:
              "Nettsiden YouTube er et godt eksempel. De viser antall subscriptions for hver kanal, hvor mange likes hver video har og hvor mange videoer en kanal har laget. Tall brukes også i beregninger som nettsider trenger. For eksempel bruker Amazon tall til å regne ut og vise gjennomsnittlig rating av produktene sine."
          }
        ]
      },
      {
        type: "paragraph",
        text: "For å kunne gjøre matematiske operasjoner ($$+$$, $$-$$, $$*$$, $$/$$) må vi bruke verdier med datatypen `Number`. Number representer både heltall `integer` og desimaltall `float`."
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
    id: "strings",
    title: "String",
    blocks: [
      {
        type: "paragraph",
        text: '`Strings` kan forklares som **alt du ser på keyboardet**. Det gjelder alle de vanlige bokstavene i alle forskjellige språk, alle de spesielle symbolene som fins (for eksempel %, &, $, ...) og alle tallene. '
      },
      {type: "paragraph",
        text: 'For at JavaScript skal gjenkjenne en string, må du skrive det     mellom anførselstegn, enten doble (`""`) eller single (`\'\'`).'
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let melding = "Hello World!"; // String
console.log(melding);`
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
        type: 'extraInfo',
        icon: 'note',
        content: [
          { type: 'text', value: 'Operasjonen ovenfor, hvor vi brukte `+` mellom strings har det fantastiske ordet ^^string-concatenation^^ på engelsk (nei du må ikke kunne ordet). En del programmeringsbegreper er litt overkant vanskelige.' },
        ]
      },
   
      {
        type: "paragraph",
        text: "Du kan skrive strings direkte i `console.log()` sammen med variabler, enten med `+`, eller skille mellom variablene med `,`."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let navn = "Jens";
let tema = "JavaScript";
console.log(navn + " lærer seg " + tema + " i dag "); // bruker +
console.log(navn, "lærer seg", tema, "i dag");        // bruker ,`
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
  id: "strings",
  title: "Boolean",
  blocks: [
      {
        type: "paragraph",
        text: "`Booleans` er en datatype som representerer `true` eller `false` verdier. Det er som en lysbryter, den kan enten være av eller på."
      },

      {
        type: "extraInfo",
        icon: "example",
        content: [
          {
            type: "text",
            value:
              "I JavaScript brukes Booleans når programmet skal gjøre en avgjørelse: er passordet som ble sendt inn riktig eller galt? Er brukeren logget inn?"
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
        code: `let on = true;
let off = false; `
      },
       {
        type: "paragraph",
        text: "Vi bruker Booleans mye når vi jobber med betingelser i neste seksjon."
      },

    ]
  },

  {
  id: "strings",
  title: "Undefined og Null",
  blocks: [
      {
        type: "paragraph",
        text: "`Undefined` er en datatype som representerer en variabel som ikke har blitt tildelt en verdi. Når du deklarerer en variabel uten å gi den en verdi vil den automatisk ha datatypen `undefined`."
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
        text: "`Null` er en spesiell datatype som representer en tom eller ukjent verdi."
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
  id: "strings",
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

{
  id: "sectionDatatypeQuiz",
  title: "Flervalgsoppgaver – datatyper",
  blocks: [
    {
      type: "paragraph",
      text: "Trykk på riktig alternativ for hvert spørsmål. Grønn er at du fikk riktig, rød er feil."
    },

    {
      type: "task",
      number: 1,
      title: "Hvilken datatype er dette?",
      description: "Hva er datatypen til variabelen `navn`?",
      code: `let navn = "Ola";`,
      solution: {
        correct: 0,
        options: [
          "String",
          "Number",
          "Boolean",
          "Undefined"
        ]
      }
    },

    {
      type: "task",
      number: 2,
      title: "Hva er verdien til x?",
      description: "Hva skrives ut i konsollen?",
      code: `let x;
console.log(x);`,
      solution: {
        correct: 2,
        options: [
          `"null"`,
          `"0"`,
          `"undefined"`,
          `"false"`
        ]
      }
    },
    {
  type: "task",
  number: 3,
  title: "Hvilken datatype får vi her?",
  description: "Hva er datatypen til resultatet av dette uttrykket?",
  code: `let result = "5" + 2;`,
  solution: {
    correct: 0,
    options: [
      "String",
      "Number",
      "Boolean",
      "Undefined"
    ]
  }
}



  ]
},


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

    {
      type: 'task',
      number: 5,
      title: "Endre datatype",
      description: "Lag en variabel `alder` som først er et tall. \n\nSkriv ut datatypen. \n\nDeretter gjør du `alder` om til en string (for eksempel med `String(alder)`) og skriv ut datatypen på nytt."
    }
    
  ]
},
];

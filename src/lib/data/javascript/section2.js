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
              "Nettsiden YouTube er et godt eksempel. De viser antall subscriptions for hver kanal, hvor mange likes hver video har og hvor mange videoer en kanal har laget."
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
        code: `let num1 = 1;
let num2 = 3;
console.log(num1 + num2);

let num3 = 1.2;
let num4 = 1.3; 
console.log(num3 + num4);`
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
        text: 'Så hvordan vet JavaScript at du vil at datatypen skal være number eller string? '
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
        text: "Du kan sette sammen ulike strings ved å bruke $$+$$ operatoren."
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
        text: "Eventuelt kan du skrive strings direkte i `console.log()` sammen med variabler"
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let navn = "Jens";
let tema = "JavaScript";
console.log(navn + " lærer seg " + tema + " i dag ");`
      },

      {
        type: "paragraph",
        text: "Strings kan også representere tall. Da vil JavaScript sette sammen tallene, istedenfor å addere tallene."
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let score = "10" + "30";
console.log(score);`
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


  ]
},


];

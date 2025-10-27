export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Når man lager programmer må man often skrive kode som skal kjøres gjentatte ganger. For eksempel tenk deg at du skal skrive en kode som skriver ut tallene fra $$1$$ til $$10$$. Det kan du gjøre ved å skrive `console.log()` 10 ganger:"
      },
      
    {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);

//også videre`
      },
      {
        type: "paragraph",
        text: "Dette fungerer, men det finnes bedre måter å skrive kode som skal repeteres. Med en `løkke` kan man kjøre en kode flere ganger helt til en betingelse er møtt."
      },
      {
        type: "paragraph",
        text: "Det finnes to typer løkker i JavaScript, en `for`-løkke og en `while`-løkke."
      }
    ]
  },

  {
  id: "sectionForExplained",
  title: "`For`-løkke",
  blocks: [
     {
      type: "paragraph",
      text: "Istedenfor å repetere deg selv 10 ganger for å skrive ut tallene fra $$1$$ til $$10$$ kan du heller bruke en `for`-løkke med en enkelt linje med kode i løkken:"
    },
    {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let i = 1; i <= 10; i++){
  console.log(i);
}`
      },
    {
      type: "paragraph",
      text: "Etter `for`-ordet skriver vi parenteser `()` som inneholder 3 uttrykk separert med en semikolon `;`"
    },
    {
      type: "list",
      items: [
          'En ^^initialisering^^ hvor vi deklarer en variabel som skal brukes i løkken. I eksemplet var det `let i = 1`.',
          'En ^^betingelse^^ hvor løkken skal fortsette så lenge betingelsen er `true`. I eksemplet var det `i <= 10`.',
          'Et ^^matematisk^^ uttrykk hvor verdien til variabelen enten øker eller synker etter hver iterasjon. ',
        ]
    },
    {
  type: "paragraph",
  text: "Etter denne linja kommer selve koden som skal kjøres gjentakende. Vi bruker krøllparenteser `{}` for å lage en kodeblokk som JavaScript skal kjøre så lenge betingelsen er sann (`true`)."
  },
    {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `for ([initialisering]; [betingelse]; [matematisk_uttrykk]){
  // Så lenge betingelsen er sann
  // Vil denne blokken kjøres gjentakende
}`
      },
       {
  type: "paragraph",
  text: "Det matematiske uttrykket kan enten være en økning (`++`) eller synking (`--`). Den kjører etter resten av koden i krøllparantesen er ferdigkjørt."
  },

    {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 10; x >= 1; x--){
  console.log(x);
}`
      },
    {
  type: "paragraph",
  text: "Du kan også bruke operatorer som `+=` eller `-=` slik som vist nedenfor:"
  },
  {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 1; x < 20; x += 3){
  console.log(x);
}`
      },
      {
  type: "paragraph",
  text: "Her øker `x` med `3` for hver iterasjon av løkken."
  },
  {
  type: "paragraph",
  text: "Når løkken er over vil JavaScript gå videre til koden du har under løkken:"
  },
  {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 1; x < 2; x++){
  console.log(x);
}
console.log("For-løkken er ferdigkjørt");
console.log("Fortsett med resten av koden");
`
      },
    ]},

  {
  id: "sectionForArray",
  title: "Når skal du bruke `for`-løkke?",
  blocks: [
    {
  type: "paragraph",
  text: "En `for`-løkke er smart **når du vet hvor mange ganger du skal repetere en kode**."
  },
  {
  type: "paragraph",
  text: "For eksempel, si at du lager et program som flipper en mynt. Du vil finne ut hvor mange ganger mynten lander på kron etter 10 kast. Da kan du bruke `Math.random()`-metoden:"
  },
  {
      type: "list",
      items: [
        "Når tallet er under `0.5` så øker du mynt-telleren.",
        "Når tallet er over `0.5` så øker du kron-telleren."
      ]
    },
    {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let mynt = 0;
let kron = 0;
for (x = 1; x <= 10; x++){
  if (Math.random() < 0.5){
      mynt++;
  }
  else{
      kron++;
    }
}
console.log("Kastet mynten 10 ganger")
console.log("Antall mynt:", mynt)
console.log("Kastet kron:", kron)`
      },
    {
      "type": "paragraph",
      "text": "En av de vanligste bruksområdene for en `for`-løkke er å gå gjennom dataen i en `array` - ett for ett element. Her er et eksempel:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let fruits = [\"Eple\", \"Banan\", \"Appelsin\"];\n\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}"
    },
    {
      "type": "paragraph",
      "text": "Her bruker vi `fruits.length` til å gi oss antall elementer i arrayet. Deretter bruker vi `for`-løkken til å skrive ut hvert element."
    },
  ]
}
,
{
  id: "sectionWhileExplained",
  title: "While-løkke",
  blocks: [
    {
      type: "paragraph",
      text: "Vi hadde et eksempel tidligere som telte hvor mange ganger vi får kron eller mynt dersom vi flipper en mynt $$10$$ ganger. Men hva om spørsmålet hadde vært:"
    },
    {
      type:"paragraph",
      text: '%%"Finn ut hvor mange ganger du må flippe en mynt for å få kron"%%'
    },
    {
      type: "paragraph",
      text: "Da vet du ikke hvor mange ganger du skal repetere koden! Det er da du må bruke en `while`-løkke istedet"
    },
    {
      type: "paragraph",
      text: "En ^^while-løkke^^ brukes til å gjenta kjøringen av en kode **så lenge** en betingelse er sann (`true`). Den skrives på følgende måte:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `while (betingelse) {
  //kode som skal kjøres
}`
    },
    {
      type: "paragraph",
      text: "Eksempel:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let i = 0;

while (i < 5) {
  console.log("Verdien av i: ", i);
  i++;
}
`
    },
    {
      type: "paragraph",
      text: "Her vil `while`-løkken fortsette å skrive ut verdien av `i` så lenge `i` er mindre enn $$5$$. For hver gang løkken kjører, så øker `i` med $$1$$. Når `i` er $$5$$ så avsluttes løkken."
    },
    {
      type: "paragraph",
      text: "Pass på at du legger inn en betingelse som faktisk etterhvert blir `false`. Ellers vil du få en ^^uendelig løkke^^. Eksempel på en uendelig løkke nedenfor:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `let i = 0;

while (i < 5) {
  console.log("Verdien av i: ", i);
}
`
    },
    {
      type: "paragraph",
      text: "Siden verdien av `i` aldri endres, vil løkken kjøre for alltid."
    },
  ]
},


  {
  id: "sectionWhileWhy",
  title: "Når skal du bruke `while`-løkke?",
  blocks: [
    {
      type: "paragraph",
      text: "Det enkleste å tenke er at du bruker `while`-løkke **når du ikke vet hvor mange ganger løkken skal repetere.**"
    },
    {
      type: "paragraph",
      text: "Slik som eksemplet fra tidligere: "
    },
    {
      type:"paragraph",
      text: '%%"Finn ut hvor mange ganger du må flippe en mynt for å få kron"%%'
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let flips = 0;
let erKron = false

while (!erKron) {
  flips++;
  erKron = Math.random() < 0.5 //returnerer true med 50% sannsynlighet
}

console.log("Det tok ", flips, "flips for å lande på kron.")
`
    },
    {
      type:"paragraph",
      text: "Here vil betingelsen `erKron = Math.random() < 0.5` simulere et flipp av en mynt. Når resultatet er `true` betyr det at mynten landet på kron og løkken vil brytes."
    },
  ]},
  
{
  id: "tasksLoops",
  title: "Oppgaver: Løkker",
  blocks: [
    {
      type: "task",
      number: 1,
      title: "Tell fra 1 til 10",
      description: "Lag en `for`-løkke som skriver ut tallene fra **1** til **10** i konsollen.",
      solution: {
        code: "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}"
      }
    },
    {
      type: "task",
      number: 2,
      title: "Skriv ut partall",
      description: "Bruk en `for`-løkke til å skrive ut alle **partall** mellom **2** og **10**.",
      solution: {
        code: "for (let i = 2; i <= 10; i += 2) {\n  console.log(i);\n}"
      }
    },
    {
      type: "task",
      number: 3,
      title: "Skriv ut navn fra et array",
      description: "Lag et array med tre navn, og bruk en `for`-løkke til å skrive ut hvert navn i konsollen.",
      solution: {
        code: "let venner = [\"Ali\", \"Sara\", \"Jonas\"];\n\nfor (let i = 0; i < venner.length; i++) {\n  console.log(venner[i]);\n}"
      }
    },
    {
      type: "task",
      number: 4,
      title: "Tell med `while`",
      description: "Lag en `while`-løkke som skriver ut tallene fra **1** til **5**.",
      solution: {
        code: "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}"
      }
    },
    {
      type: "task",
      number: 5,
      title: "Flip mynten til du får kron",
      description: "Lag en `while`-løkke som **flipper en mynt** til du får `kron`. Tell hvor mange ganger du måtte flippe.",
      solution: {
        code: "let flips = 0;\nlet erKron = false;\n\nwhile (!erKron) {\n  flips++;\n  erKron = Math.random() < 0.5;\n}\n\nconsole.log(\"Du fikk kron etter\", flips, \"flips!\");"
      }
    }, 
    {
      type: "task",
      number: 6,
      title: "Lag en pyramide av stjerner",
      description: "Skriv et program som skriver ut en halv pyramide av stjerner (`*`) slik som under\n\n+ \n++ \n+++ \n++++ \n+++++ \n\nDeretter print ut motsatte pyramiden:\n\n+++++ \n++++ \n+++ \n++ \n+",
      solution: {
        code: "// Halv pyramide\nfor (let i = 1; i <= 5; i++) {\n  console.log('+'.repeat(i));\n}\n\n// Omvendt halv pyramide\nfor (let i = 5; i >= 1; i--) {\n  console.log('+'.repeat(i));\n}"
      }
    }
  ]
}


]
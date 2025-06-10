export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger vil vi gjøre den samme handlingen mange ganger i koden vår. I stedet for å skrive samme linje flere ganger, kan vi bruke noe som kalles en ^^løkke^^."
      },
      {
        type: "paragraph",
        text: "En løkke lar oss gjenta en kodeblokk flere ganger automatisk. Det er som å si til datamaskinen: 'Gjør dette igjen og igjen – så lenge det gir mening.'"
      },
      {
        type: "paragraph",
        text: "Det finnes ulike typer løkker i JavaScript. Vi begynner med den vanligste: ^^for-løkken^^."
      }
    ]
  },
  {
  "id": "sectionForExplained",
  "title": "Hvordan en for-løkke egentlig fungerer",
  "blocks": [
    {
      "type": "paragraph",
      "text": "En `for`-løkke kan se litt skummel ut i starten, men den følger en fast oppskrift:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "for (let i = 0; i < 5; i++) {\n  console.log(\"Runde: \" + i);\n}"
    },
    {
      "type": "paragraph",
      "text": "Her er hva som skjer:"
    },
    
    {
      "type": "list",
      "items": [
        "🔹 **Start:** Vi lager `i` og setter den til `0`.",
        "🔹 **Sjekk:** Er `i < 5`? Hvis ja, kjør videre.",
        "🔹 **Kjør:** Koden inni `{}` kjøres.",
        "🔹 **Tell opp:** `i++` gjør at `i` øker med 1.",
        "🔁 Så starter det på nytt: Sjekk → Kjør → Tell opp → Sjekk ..."
      ]
    },
    {
      "type": "paragraph",
      "text": "💡 Når `i` til slutt ikke lenger er mindre enn 5 (når `i` blir 5), stopper løkken."
    },
    {
      "type": "paragraph",
      "text": "Dette betyr at du får 5 runder: `i = 0`, `i = 1`, `i = 2`, `i = 3`, og `i = 4`."
    },
    {
      "type": "code",
      "language": "plaintext",
      "code": "Runde: 0\nRunde: 1\nRunde: 2\nRunde: 3\nRunde: 4",
      'preview': false
    }
  ]
},
{
  "id": "sectionForArray",
  "title": "For-løkke over en liste (array)",
  "blocks": [
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
      "text": "🔍 Forklaring:"
    },
    {
      "type": "list",
      "items": [
        "`fruits.length` forteller hvor mange elementer det er i arrayen.",
        "`i` starter på 0, som er første posisjon i arrayen.",
        "`fruits[i]` betyr at vi henter ut verdien på plass `i` i arrayen.",
        "Vi gjentar dette til vi har gått gjennom alle elementene."
      ]
    },
    {
      "type": "code",
      "language": "plaintext",
      "code": "Eple\nBanan\nAppelsin",
      "preview": false
    }
  ]
}
,
{
  "id": "sectionWhileExplained",
  "title": "Hvordan en while-løkke fungerer, steg for steg",
  "blocks": [
    {
      "type": "paragraph",
      "text": "En ^^while-løkke^^ brukes når du vil gjøre noe *så lenge* en betingelse er sann. Du vet kanskje ikke hvor mange ganger det skjer – det kan være 5 ganger, 100 ganger eller aldri."
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let i = 0;\nwhile (i < 5) {\n  console.log(\"Runde: \" + i);\n  i++;\n}"
    },
    {
      "type": "paragraph",
      "text": "La oss forklare hva som skjer linje for linje:"
    },
    {
      "type": "list",
      "items": [
        "🔹 Først: `let i = 0;` – vi lager en variabel `i` som starter på 0.",
        "🔁 Så starter while-løkken. Den sjekker: **Er `i < 5`?**",
        "✅ Hvis ja: Koden inni `{}` kjører (den skriver ut `i`).",
        "⬆️ Etter det: `i++` gjør at `i` blir én større.",
        "🔁 Deretter starter sjekken på nytt: Er `i < 5` fortsatt sant?",
        "🚫 Når `i` ikke lenger er mindre enn 5, **stopper** løkken."
      ]
    },
    {
      "type": "paragraph",
      "text": "💡 Viktig: Du må selv huske å oppdatere `i`, ellers vil løkken kjøre for alltid – og da får du det vi kaller en ^^uendelig løkke^^."
    },
    {
      "type": "code",
      "language": "plaintext",
      "code": "Runde: 0\nRunde: 1\nRunde: 2\nRunde: 3\nRunde: 4", 
      "preview":false
    }
  ]
},

  {
  "id": "sectionDoWhile",
  "title": "3. Do-while-løkker",
  "blocks": [
    {
      "type": "paragraph",
      "text": "En **do-while-løkke** fungerer nesten som en vanlig `while`-løkke, men med én viktig forskjell: koden inni løkken **kjøres alltid minst én gang**, uansett hva betingelsen er."
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let i = 0;\ndo {\n  console.log(\"Dette er iterasjon nummer \" + i);\n  i++;\n} while (i < 5);"
    },
    {
      "type": "list",
      "items": [
        "`let i = 0`: Vi starter med `i = 0`.",
        "Løkken går rett inn og kjører `console.log(...)` og `i++`, **uten** å sjekke betingelsen først.",
        "Etterpå sjekker den `i < 5`. Hvis det er sant, kjører den én gang til.",
        "Dette gjentas så lenge betingelsen er sann."
      ]
    },
    {
      "type": "paragraph",
      "text": "💡 En vanlig `while`-løkke sjekker betingelsen først, og **hopper over koden** hvis betingelsen ikke er sann. `do-while` kjører alltid koden først, og sjekker etterpå."
    },
    {
      "type": "paragraph",
      "text": "Se hva som skjer her, selv om betingelsen er usann:"
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let i = 10;\ndo {\n  console.log(\"Koden kjører uansett!\");\n  i++;\n} while (i < 5);"
    },
    {
      "type": "paragraph",
      "text": "`i` starter på 10, og `i < 5` er **falsk**. Men løkken kjører likevel én gang og skriver ut meldingen."
    }
  ]
},
  {
  "id": "loopQuizShort",
  "title": "Flervalgsoppgaver – løkker i JavaScript",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Her er noen korte spørsmål for å teste om du forstår hvordan `for`-, `while`- og `do-while`-løkker fungerer."
    },

    {
      "type": "task",
      "number": 1,
      "title": "Hva skriver denne for-løkken ut?",
      "description": "Hva blir resultatet i konsollen?",
      "code": "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}",
      "solution": {
        "correct": 0,
        "options": [
          "0 1 2",
          "1 2 3",
          "0 1 2 3",
          "3 2 1 0"
        ]
      }
    },

    {
      "type": "task",
      "number": 2,
      "title": "Hvor mange ganger kjører denne while-løkken?",
      "description": "Hva er antall ganger 'Hei' blir skrevet ut?",
      "code": "let i = 1;\nwhile (i <= 4) {\n  console.log(\"Hei\");\n  i++;\n}",
      "solution": {
        "correct": 2,
        "options": [
          "0",
          "3",
          "4",
          "5"
        ]
      }
    },

    {
      "type": "task",
      "number": 3,
      "title": "Hva gjør `do-while`-løkker spesielt?",
      "description": "Hva er riktig om `do-while` sammenlignet med `while`?",
      "solution": {
        "correct": 1,
        "options": [
          "Den kjører aldri hvis betingelsen er falsk",
          "Den kjører alltid minst én gang",
          "Den må ha en `break` for å stoppe",
          "Den teller automatisk"
        ]
      }
    }
  ]
},
  {
  "id": "loopTasks",
  "title": "Programmeringsoppgaver – løkker",
  "blocks": [
    {
      "type": "task",
      "number": 1,
      "title": "Tell fra 1 til 10",
      "description": "Lag en `for`-løkke som skriver ut tallene fra 1 til 10.",
      "solution": {
        "code": "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}"
      }
    },
    {
      "type": "task",
      "number": 2,
      "title": "Summér tall fra 1 til 100",
      "description": "Lag et program som bruker en `while`-løkke for å finne summen av alle tallene fra 1 til 100. Skriv ut summen til slutt.",
      "solution": {
        "code": "let sum = 0;\nlet i = 1;\nwhile (i <= 100) {\n  sum += i;\n  i++;\n}\nconsole.log(sum);"
      }
    },
    {
      "type": "task",
      "number": 3,
      "title": "Skriv ut verdier fra en liste",
      "description": "Lag en array med tre navn. Bruk en `for`-løkke til å skrive ut hvert navn.",
      "solution": {
        "code": "let names = [\"Ada\", \"Ola\", \"Kari\"];\nfor (let i = 0; i < names.length; i++) {\n  console.log(names[i]);\n}"
      }
    },
    {
      "type": "task",
      "number": 4,
      "title": "Finn det største tallet",
      "description": "Lag en array med noen tall. Bruk en `for`-løkke for å finne det største tallet.",
      "solution": {
        "code": "let numbers = [3, 7, 2, 9, 5];\nlet max = numbers[0];\nfor (let i = 1; i < numbers.length; i++) {\n  if (numbers[i] > max) {\n    max = numbers[i];\n  }\n}\nconsole.log(\"Største tall:\", max);"
      }
    },
    {
      "type": "task",
      "number": 5,
      "title": "Kjør minst én gang",
      "description": "Lag en `do-while`-løkke som skriver ut meldingen 'Velkommen!' minst én gang, selv om betingelsen er usann.",
      "solution": {
        "code": "let adgang = false;\ndo {\n  console.log(\"Velkommen!\");\n} while (adgang);"
      }
    }
  ]
}

]
export default [
  {
  "id": "sectionIntro",
  "title": "",
  "blocks": [
    {
      "type": "paragraph",
      "text": "En ^^funksjon^^ er en bit kode som vi kan bruke flere ganger. Du kan tenke på det som en liten maskin som gjør noe for deg – når du ber den om det."
    },
    {
      "type": "paragraph",
      "text": "🔁 Du skriver funksjonen én gang, og kan bruke den om og om igjen!"
    },
    {
      "type": "paragraph",
      "text": "Funksjoner hjelper deg å skrive ryddig og gjenbrukbar kode. Det gjør det lettere å forstå hva programmet gjør."
    }
  ]
},
  {
  "id": "sectionDefineFunction",
  "title": "1. Lage en funksjon",
  "blocks": [
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "function siHei() {\n  console.log(\"Hei, verden!\");\n}"
    },
    {
      "type": "paragraph",
      "text": "Her lager vi en funksjon som heter `siHei`. Den gjør én ting: Skriver ut 'Hei, verden!' i konsollen."
    },
    {
      "type": "paragraph",
      "text": "👉 Men funksjonen gjør ingenting før du **kaller på den**!"
    }
  ]
},
  {
  "id": "sectionCallFunction",
  "title": "2. Kalle på en funksjon",
  "blocks": [
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "function siHei() {\n  console.log(\"Hei, verden!\");\n}\nsiHei();"
    },
    {
      "type": "paragraph",
      "text": "Nå forteller vi JavaScript: 'Hei! Kjør den funksjonen vi lagde!'"
    },
    {
      "type": "paragraph",
      "text": "💡 Prøv å skrive inn flere `siHei();` under hverandre – hva skjer?"
    }
  ]
},
{
  "id": "sectionParameters",
  "title": "3. Funksjoner med parametere (input)",
  "blocks": [
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "function siHeiTil(navn) {\n  console.log(\"Hei, \" + navn + \"!\");\n}\n\nsiHeiTil(\"Ali\");\nsiHeiTil(\"Maja\");"
    },
    {
      "type": "paragraph",
      "text": "Vi kan sende med data inn i funksjonen ved å bruke en parameter. Her heter den `navn`."
    },
    {
      "type": "paragraph",
      "text": "👉 Endre navnene og legg til flere `siHeiTil(...)` under – test gjerne med tall også. Hva skjer?"
    }
  ]
}
,
{
  "id": "sectionReturnValues",
  "title": "4. Returnere verdier (output)",
  "blocks": [
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "function gangTo(tall) {\n  return tall * 2;\n}\n\nlet resultat = gangTo(5);\nconsole.log(resultat);"
    },
    {
      "type": "paragraph",
      "text": "Noen funksjoner gir deg et resultat tilbake – dette kalles å returnere en verdi. Du kan lagre det i en variabel eller bruke det videre i koden."
    },
    {
      "type": "paragraph",
      "text": "🧠 Prøv å sende inn andre tall og bruk `console.log(gangTo(10));` direkte også."
    }
  ]
}
,
{
  "id": "sectionForEach",
  "title": "En enklere måte å gå gjennom en liste: forEach",
  "blocks": [
    {
      "type": "paragraph",
      "text": "`forEach` er en metode du kan bruke på arrays. Den gjør nesten det samme som en `for`-løkke, men på en enklere måte. Den lar deg gjøre noe med hvert element i lista – uten å måtte bruke en teller (`i`)."
    },
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let navn = [\"Mia\", \"Ola\", \"Ahmed\"];\n\nnavn.forEach(function(person) {\n  console.log(\"Hei, \" + person + \"!\");\n});"
    },
    {
      "type": "paragraph",
      "text": "💡 Forklaring:"
    },
    {
      "type": "list",
      "items": [
        "`navn.forEach(...)` betyr: Gå gjennom hvert element i arrayen `navn`.",
        "Funksjonen inni `forEach` blir kalt én gang for hvert navn.",
        "`person` er en variabel som automatisk får verdien til det nåværende elementet i lista."
      ]
    },
    {
      "type": "paragraph",
      "text": "Resultatet er at det skrives ut en personlig hilsen til hver person – akkurat som med en `for`-løkke, men med mindre kode!"
    }
  ]
},
{
  "id": "sectionFunctionExpression",
  "title": "5. Funksjon som en variabel (funksjonsuttrykk)",
  "blocks": [
    {
      "type": "code",
      "language": "javascript",
      interactive: true,
      "code": "let siHei = function() {\n  console.log(\"Hei!\");\n};\n\nsiHei();"
    },
    {
      "type": "paragraph",
      "text": "Her lager vi en anonym funksjon (uten navn) og lagrer den i en variabel. Det fungerer på samme måte som en vanlig funksjon!"
    },
    {
      "type": "paragraph",
      "text": "💡 Dette er nyttig når du vil sende funksjoner videre som data – for eksempel til knapper eller når noe skjer på en nettside."
    }
  ]
},
{
  "id": "sectionFunctionQuiz",
  "title": "Flervalgsoppgaver – Funksjoner i JavaScript",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Her kommer noen spørsmål for å teste deg på det du har lært om funksjoner!"
    },

    {
      "type": "task",
      "number": 1,
      "title": "Hva gjør denne funksjonen?",
      "description": "Hva skrives ut når vi kjører dette programmet?",
      "code": "function greet() {\n  console.log(\"Hei!\");\n}\n\ngreet();",
      "solution": {
        "correct": 0,
        "options": [
          "Hei!",
          "greet",
          "Ingenting skjer",
          "Feilmelding"
        ]
      }
    },

    {
      "type": "task",
      "number": 2,
      "title": "Hva er en parameter?",
      "description": "Hva er riktig beskrivelse av en parameter i en funksjon?",
      "solution": {
        "correct": 2,
        "options": [
          "En funksjon som returnerer noe",
          "En verdi som alltid er et tall",
          "En midlertidig variabel som brukes i funksjonen",
          "Et nytt JavaScript-nøkkelord"
        ]
      }
    },

    {
      "type": "task",
      "number": 3,
      "title": "Hva er forskjellen mellom `return` og `console.log()`?",
      "description": "Velg det riktige alternativet:",
      "solution": {
        "correct": 3,
        "options": [
          "`return` skriver til skjermen, `console.log()` gjør det ikke",
          "`console.log()` stopper funksjonen, `return` gjør ikke det",
          "De gjør akkurat det samme",
          "`return` sender verdien tilbake, `console.log()` viser den bare i konsollen"
        ]
      }
    }
  ]
},
{
  "id": "sectionTasks",
  "title": "Oppgaver – Funksjoner",
  "blocks": [
    {
      "type": "task",
      "number": 1,
      "title": "En enkel funksjon",
      "description": "Lag en funksjon `sayHello`, som skriver ut \"Hei, verden!\" når den kalles. Kall funksjonen for å se resultatet.",
      "solution": {
        "code": "function sayHello() {\n  console.log(\"Hei, verden!\");\n}\n\nsayHello();"
      }
    },
    {
      "type": "task",
      "number": 2,
      "title": "Funksjon med parameter",
      "description": "Lag en funksjon `greetPerson`, som tar et navn som parameter og skriver ut \"Hei, [navn]!\". Kall funksjonen med ditt eget navn.",
      "solution": {
        "code": "function greetPerson(name) {\n  console.log(\"Hei, \" + name + \"!\");\n}\n\ngreetPerson(\"Ola\");"
      }
    },
    {
      "type": "task",
      "number": 3,
      "title": "Returnere verdier",
      "description": "Skriv en funksjon `multiply` som tar to tall som parametere og returnerer produktet av dem. Lagre resultatet i en variabel og skriv det ut.",
      "solution": {
        "code": "function multiply(a, b) {\n  return a * b;\n}\n\nlet result = multiply(4, 6);\nconsole.log(result);"
      }
    },
    {
      "type": "task",
      "number": 4,
      "title": "Funksjon som bruker en annen funksjon",
      "description": "Lag en funksjon `double`, som returnerer det dobbelte av tallet som sendes inn. Lag deretter en annen funksjon `printDouble` som tar et tall, bruker `double` og skriver ut resultatet.",
      "solution": {
        "code": "function double(x) {\n  return x * 2;\n}\n\nfunction printDouble(number) {\n  let result = double(number);\n  console.log(\"Doblet verdi: \" + result);\n}\n\nprintDouble(7);"
      }
    },
    {
  "type": "task",
  "number": 5,
  "title": "Funksjoner og lister",
  "description": "Lag en funksjon `greetAll`, som tar inn en liste med navn og gjør følgende:\n\n🔹 Gå gjennom listen med en løkke\n🔹 Skriv ut en personlig melding: `Hei, [navn]! Velkommen!`\n🔹 Tell hvor mange navn det er og skriv ut: `Det var X personer i listen.`\n\n✨ **Ekstra utfordring:**\nHvis et navn har mer enn 4 bokstaver, skriv også ut:\n`[navn], du har et langt navn!`",
  "solution": {
    "code": "function greetAll(names) {\n  for (let i = 0; i < names.length; i++) {\n    let name = names[i];\n    console.log(\"Hei, \" + name + \"! Velkommen!\");\n\n    if (name.length > 4) {\n      console.log(name + \", du har et langt navn!\");\n    }\n  }\n\n  console.log(\"Det var \" + names.length + \" personer i listen.\");\n}\n\nlet nameList = [\"Ola\", \"Mia\", \"Sebastian\", \"Lise\", \"Henrik\"];\ngreetAll(nameList);"
  }
},
{
  "type": "task",
  "number": 6,
  "title": "Bruk forEach til å hilse på alle",
  "description": "Lag en liste med navn, og bruk `forEach` til å skrive ut en hilsen til hvert navn. Hilsningen skal være: \"Hei, [navn]!\". \n\n**Ekstra utfordring**: Hvis navnet starter med bokstaven `A`, skriv også: \"[navn] – navnet ditt starter med A!\"",
  "code": "let personer = [\"Anna\", \"Jonas\", \"Ali\", \"Emma\", \"Amir\"];\n\n// Skriv forEach her",
  "solution": {
    "code": "let personer = [\"Anna\", \"Jonas\", \"Ali\", \"Emma\", \"Amir\"];\n\npersoner.forEach(function(navn) {\n  console.log(\"Hei, \" + navn + \"!\");\n  if (navn.startsWith(\"A\")) {\n    console.log(navn + \" – navnet ditt starter med A!\");\n  }\n});"
  }
},
    {
      "type": "paragraph",
      "text": "Disse oppgavene gir deg øvelse i å skrive, bruke og kombinere funksjoner – noe som gjør koden din mer fleksibel, gjenbrukbar og lett å forstå. 💡"
    }
  ]
}
,
  
];


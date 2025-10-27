export default [
  {
  id: "sectionIntro",
  title: "",
  blocks: [
    {
        type: "paragraph",
        text: "En ^^funksjon^^ er en kodeblokk som gjør en spesifikk oppgave og som kan brukes flere steder i koden."
      },
    {
        type: "paragraph",
        text: "Funksjoner hjelper deg å skrive ryddig, gjenbrukbar og forståelig kode."
      },
      {
        type: "extraInfo",
        icon: "example",
        content: [
          {
            type: "text",
            value: "I stedet for å gjenta den samme koden mange steder, kan vi samle logikken i en funksjon. For eksempel kan en nettbutikk ha en funksjon som beregner frakt, legger til moms eller oppdaterer handlekurven – og da kan den samme funksjonen brukes for alle kunder, overalt i systemet. Dette gjør koden ryddigere og enklere å vedlikeholde."
          }
        ]
      }
    ]
    },

    {
  id: "sectionDefineFunction",
  title: "Hvordan lage en funksjon",
  blocks: [
   
    {
        type: "paragraph",
        text: "La oss starte med en enkel funksjon som skriver en melding i konsollen:"
      },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      "code": "function siHei() {\n  console.log(\"Hei, Jens!\");\n}"
    },
    {
        type: "paragraph",
        text: "Her har vi laget funksjonen `siHei()`. Inni funksjonen bruker vi `console.log()` til å skrive ut meldingen. Merk: vi har ikke ^^kalt på funksjonen^^ ennå, bare laget logikken, så ingen melding vises i konsollen."
      },
    {
        type: "paragraph",
        text: "Når vi kaller på funksjonen, altså skriver `siHei()`, kjører funksjonen og meldingen vises:"
      },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `function siHei() {
  console.log(\"Hei, Jens!\");
}

siHei()`
    },
    {
        type: "paragraph",
        text: "Hva om vi vil hilse på flere personer, som `Sondre` eller `Faizan`? I stedet for å lage en ny funksjon for hver person, kan vi bruke ^^parametere^^ og ^^argumenter^^."
      }
  ]
  },
  {
  id: "sectionParameters",
  title: "Funksjonens parametere og argumenter",
  blocks: [
     {
        type: "paragraph",
        text: "^^Parametere^^ fungerer som plassholdere for verdier som sendes til funksjonen. ^^Argumenter^^ er de faktiske verdiene vi sender når vi kaller funksjonen. Her er en oppdatert `siHei()`-funksjon:"
      }, 
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `function siHei(navn) {
  console.log("Hei, " + navn + "!")
}

siHei("Faizan")
siHei("Sondre")`
    },
    {
        type: "paragraph",
        text: "Her er `navn` parameteren, mens stringene \"Faizan\" og \"Sondre\" er argumentene. Nå kan vi gjenbruke funksjonen med ulike navn."
    }
  ]
}
,
{
  id: "sectionReturnValues",
  title: "Returne verdier med funksjoner",
  blocks: [
    {
      type: "paragraph",
      text: "En funksjon kan bruke `return` for å sende en verdi tilbake til stedet der funksjonen ble kalt."
    },
    {
        type: "paragraph",
        text: "For eksempel returnerer denne funksjonen summen av to tall:"
      },

    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `function sum(a,b) {
  return a + b;
}  
let resultat = sum(3,2);
console.log(resultat);`
    },
    {
        type: "paragraph",
        text: "Når JavaScript når `return`, stopper funksjonen og sender verdien tilbake. Vi kan ha flere `return`-setninger, for eksempel:"
      },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `function sjekkAlder(alder) {
  if (alder > 18) {
      return "Du kan få førerkort!";
  }
  return "Du kan ikke få førerkort ennå!";
}  

console.log(sjekkAlder(20))
console.log(sjekkAlder(15))`
    },
    {
      type: "paragraph",
      text: "Første gang vi kaller på `sjekkAlder()`-funksjonen er alderen større enn 18, så funksjonen kjører `return`-setningen inne i `if`-setningen. "
    },
    {
      type: "paragraph",
      text: "Den andre gangen er alderen mindre enn 18, så funksjonen kjører den andre `return`-setningen i stedet. "
    },
    {
  type: "extraInfo",
  icon: "note",
  content: [
    {
      type: "text",
      value: "Variabler som lages inne i en funksjon finnes bare der inne – dette kalles ^^local scope^^. Variabler definert utenfor funksjoner er i ^^global scope^^ og kan brukes overalt. Tenk på det som at hver funksjon har sitt eget rom for variabler, slik at verdier ikke blandes med andre deler av programmet."
    }
  ]
}

  ]
},
{
  "id": "sectionForEach",
  "title": "En enklere måte å gå gjennom en array: `forEach`",
  "blocks": [
    {
      "type": "paragraph",
      "text": "`forEach` er en metode du kan bruke på arrays. Den lar deg gjøre noe med hvert element i listen, én etter én, litt som en vanlig løkke. Men med `forEach` slipper du å håndtere en teller-variabel (`i`)."
    },
    {
      "type": "paragraph",
      "text": "Du kaller `forEach` på en liste og gir den en funksjon som skal kjøres på hvert element:"
    },
    {
      "type": "code",
      "language": "javascript",
      "interactive": true,
      "code": `let navn = ["Mia", "Ola", "Ahmed"];

navn.forEach(function(person) {
  console.log("Hei, " + person + "!");
});`
    },
    {
      "type": "paragraph",
      "text": "**Hva skjer her?**"
    },
    {
      "type": "list",
      "items": [
        "`navn.forEach(...)` går gjennom hvert element i arrayet",
        "Funksjonen inni `forEach` blir kalt én gang for hvert navn.",
        "`person` er en variabel som automatisk får verdien til det nåværende elementet i lista."
      ]
    },
    {
  "type": "extraInfo",
  "icon": "example",
  "content": [
    {
      "type": "text",
      "value": "`forEach` er nyttig når du vil gjøre noe med hvert element i en liste på nettsiden. Det kan være å vise produkter, legge til knapper eller oppdatere innhold dynamisk."
    },
    {
      "type": "text",
      "value": "For eksempel kan du ha en liste med produkter som du vil vise på siden:"
    },
    {
      "type": "code",
      "language": "javascript",
      "interactive": true,
      "code": "let produkter = [\"T-skjorte\", \"Bukse\", \"Sko\"];\n\nprodukter.forEach(produkt => {\n  document.body.innerHTML += `<p>Produkt: ${produkt}</p>`;\n});"
    },
    {
      "type": "text",
      "value": "Her går `forEach` gjennom hvert produkt i arrayen og legger til et avsnitt på siden for hvert produkt. På den måten slipper du å skrive en løkke med teller selv."
    },
    {
      "type": "text",
      "value": "💡 Du kan også bruke `forEach` til å legge til event listeners på flere knapper eller elementer samtidig, uten å måtte gjenta koden for hver enkelt."
    }
  ]
},
    {
      "type": "code",
      "language": "javascript",
      "interactive": true,
      "code": "navn.forEach(person => console.log(`Hei, ${person}!`));"
    },
    {
      "type": "paragraph",
      "text": "Resultatet er det samme – en personlig hilsen til hver person. Arrow-funksjonen gjør koden kortere og mer moderne."
    },
    {
      "type": "paragraph",
      "text": "💡 Tips: `forEach` er perfekt når du vil gjøre noe med hvert element, men du trenger ikke å endre arrayen direkte. Hvis du trenger å lage en ny array basert på de gamle verdiene, kan du heller bruke `map`."
    }
  ]
},

{
  "id": "sectionForEach",
  "title": "En enklere måte å gå gjennom en array: `forEach`",
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


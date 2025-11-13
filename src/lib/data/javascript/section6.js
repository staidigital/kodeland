export default [
  {
  id: "introFunksjon",
  title: "",
  blocks: [
    {
        type: "paragraph",
        text: "En ^^funksjon^^ er en kodeblokk som gjør en spesifikk oppgave og  kan brukes flere steder i koden."
      },
    {
        type: "paragraph",
        text: "Funksjoner hjelper deg å skrive ryddig, gjenbrukbar og forståelig kode. Du slipper å gjenta deg selv, og endringer kan gjøres ett sted i stedet for mange."
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
  id: "lagefunksjoner",
  title: "Hvordan lage en funksjon",
  blocks: [
   
    {
        type: "paragraph",
        text: "Her er en enkel funksjon som skriver en melding:"
      },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      "code": "function siHei() {\n  console.log(\"Hei, Jens!\");\n}"
    },
    {
        type: "paragraph",
        text: "Vi har nå bare laget funksjonen. For å kjøre den må vi ^^kalle på funksjonen^^ i programmet:"
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
  
  ]
  },
  {
  id: "sectionParameters",
  title: "Funksjonens parametere og argumenter",
  blocks: [
     {
        type: "paragraph",
        text: "Hva om vi vil hilse på flere personer, som `Julia` eller `Anders`? I stedet for å lage en ny funksjon for hver person, kan vi bruke ^^parametere^^ og ^^argumenter^^."
      },
     {
        type: "paragraph",
        text: "^^Parametere^^ fungerer som placeholders for verdier som sendes til funksjonen. ^^Argumenter^^ er de faktiske verdiene vi sender når vi kaller funksjonen. Her er en oppdatert `siHei()`-funksjon:"
      }, 
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `function siHei(navn) {
  console.log("Hei, " + navn + "!")
}

siHei("Julia")
siHei("Anders")`
    },
    {
        type: "paragraph",
        text: "Her er `navn` parameteren, mens stringene `\"Julia\"` og `\"Anders\"` er argumentene. Nå kan vi gjenbruke funksjonen med ulike navn."
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
      text: "Funksjoner kan sende verdier tilbake med `return`, slik at resultatet kan brukes videre."
    },
    {
        type: "paragraph",
        text: "For eksempel returnerer denne funksjonen summen av to tall:"},

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
        text: "Funksjonen stopper når den når `return`, og sender verdien tilbake."
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
      text: "Første gang vi kaller på `sjekkAlder()`-funksjonen er alderen større enn 18, så funksjonen returnerer \"Du kan få førerkort\". Den andre gangen returneres \"Du kan ikke få førerkort\"."
    },
    {
  type: "extraInfo",
  icon: "note",
  content: [
   
          {
            type: "text",
            value: "Variabler som lages inne i en funksjon finnes bare der – dette kalles ^^local scope^^. Variabler utenfor funksjoner er i ^^global scope^^ og kan brukes overalt."
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
  "id": "sectionTasks",
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
      "title": "Kom i gang med funksjoner",
      "description": "Lag en funksjon som heter `printMelding`. Funksjonen skal skrive ut teksten 'Hello World!' til konsollen. Endre funksjonen til å ta inn et navn som parameter, slik at meldingen blir for eksempel 'Hello (navn)'.",
      "solution": {
        "code": "function printMelding() {\n  console.log('Hello World!');\n}\n\nprintMelding();\n\nfunction printMeldingNavn(navn) {\n  console.log('Hallo ' + navn);\n}\n\nprintMeldingNavn('Jens');"
      }
    },

    {
      "type": "task",
      "number": 2,
      "title": "Returnere verdier",
      "description": "Skriv en funksjon `multiply` som tar to tall som parametere og returnerer produktet av dem. Lagre resultatet i en variabel og skriv det ut.",
      "solution": {
        "code": "function multiply(a, b) {\n  return a * b;\n}\n\nlet result = multiply(4, 6);\nconsole.log(result);"
      }
    },
    {
  "type": "task",
  "number": 3,
  "title": "Celsius og Fahrenheit",
  "description": "Lag et program som konverterer temperatur mellom Celsius og Fahrenheit. Programmet skal:\n\n1. Be brukeren skrive inn en temperatur med `prompt()`.\n2. Be brukeren skrive om tallet er i 'C' eller 'F'.\n3. Konverter temperaturen til den andre skalaen og skriv resultatet til konsollen.\n\nFormler:\n- Fahrenheit = (Celsius * 1.8) + 32, Celsius = (Fahrenheit − 32) * 0.56",
  "solution": {
    "code": "let temp = Number(prompt('Skriv inn temperaturen:'));\nlet enhet = prompt('Er temperaturen i Celsius (C) eller Fahrenheit (F)?');\n\nif(enhet.toUpperCase() === 'C') {\n  let result = (temp * 1.8) + 32;\n  console.log(temp + '°C er ' + result + '°F');\n} else if(enhet.toUpperCase() === 'F') {\n  let result = (temp - 32) * 0.56;\n  console.log(temp + '°F er ' + result + '°C');\n} else {\n  console.log('Ugyldig enhet');\n}"
  }
},

{
  "type": "task",
  "number": 4,
  "title": "Bruk forEach til å hilse på alle",
  "description": "Lag en liste med navn, og bruk `forEach` til å skrive ut en hilsen til hvert navn. Hilsningen skal være: \"Hei, [navn]!\". \n\n**Ekstra utfordring**: Utvid programmet slik at det sjekker om et navn inneholder mer enn 4 bokstaver. Hvis ja, skriv ut '(navn), du har et langt navn!' i tillegg til den vanlige meldingen.",
  "code": "let personer = [\"Anna\", \"Jonas\", \"Ali\", \"Emma\", \"Amir\"];\n\n// Skriv forEach her",
  "solution": {
    "code": "let personer = [\"Anna\", \"Jonas\", \"Ali\", \"Emma\", \"Amir\"];\n\npersoner.forEach(function(navn) {\n  console.log(\"Hei, \" + navn + \"!\");\n\n  if (navn.length > 4) {\n    console.log(navn + \", du har et langt navn!\");\n  }\n});"
  }
}, 
    {
  "type": "task",
  "number": 5,
  "title": "Beregn fraktkostnad med funksjon",
  "description": "Lag en funksjon `beregnFrakt` som tar inn `totalPris` som parameter, og returnerer fraktkostnaden basert på totalprisen:\n\n- Hvis totalpris er 200 eller mindre, er frakten 100 kr.\n- Hvis totalpris er mellom 201 og 1000, er frakten 50 kr.\n- Hvis totalpris er over 1000, er frakten gratis.\n\nBe brukeren skrive inn totalpris med `prompt()`, kall funksjonen, og skriv ut resultatet til konsollen.",
  "code": "// Skriv funksjon her\nlet totalPris = Number(prompt('Skriv inn totalpris:'));\n\n// kall funksjonen her",
  "solution": {
    "code": "function beregnFrakt(totalPris) {\n  let fraktKostnad;\n  if (totalPris <= 200) {\n    fraktKostnad = 100;\n  } else if (totalPris <= 1000) {\n    fraktKostnad = 50;\n  } else {\n    fraktKostnad = 0;\n  }\n  return fraktKostnad;\n}\n\nlet totalPris = Number(prompt('Skriv inn totalpris:'));\nlet frakt = beregnFrakt(totalPris);\nconsole.log(`Du må betale ${frakt} kr i frakt`);"
  }
},
  
    {
      "type": "task",
      "number": 6,
      "title": "Arrow Functions (avansert)",
      "description": "Gjør oppgavene ovenfor, men bruk `arrow-functions` istedet.",
      "solution": {
        "code": "// Oppgave 1 - printMelding\nconst printMelding = () => console.log('Hello World!');\nconst printMeldingNavn = navn => console.log('Hallo ' + navn);\n\nprintMelding();\nprintMeldingNavn('Madeleine');\n\n// Oppgave 2 - multiply\nconst multiply = (a, b) => a * b;\nlet result = multiply(4, 6);\nconsole.log(result);\n\n// Oppgave 3 - Celsius/Fahrenheit\nconst konverterTemperatur = () => {\n  let temp = Number(prompt('Skriv inn temperaturen:'));\n  let enhet = prompt('Er temperaturen i Celsius (C) eller Fahrenheit (F)?');\n\n  if(enhet.toUpperCase() === 'C') {\n    let result = (temp * 1.8) + 32;\n    console.log(`${temp}°C er ${result}°F`);\n  } else if(enhet.toUpperCase() === 'F') {\n    let result = (temp - 32) * 0.56;\n    console.log(`${temp}°F er ${result}°C`);\n  } else {\n    console.log('Ugyldig enhet');\n  }\n};\nkonverterTemperatur();\n\n// Oppgave 4 - forEach hilsen\nlet personer = [\"Anna\", \"Jonas\", \"Ali\", \"Emma\", \"Amir\"];\npersoner.forEach(navn => {\n  console.log(`Hei, ${navn}!`);\n  if (navn.length > 4) console.log(`${navn}, du har et langt navn!`);\n});\n\n// Oppgave 5 - fraktkostnad\nconst beregnFrakt = totalPris => {\n  if (totalPris <= 200) return 100;\n  else if (totalPris <= 1000) return 50;\n  else return 0;\n};\nlet totalPris = Number(prompt('Skriv inn totalpris:'));\nlet frakt = beregnFrakt(totalPris);\nconsole.log(`Du må betale ${frakt} kr i frakt`);\n\n// Oppgave 6 - kastTerning\nconst kastTerning = antallSider => Math.floor(Math.random() * antallSider) + 1;\nconsole.log(kastTerning(6));"
      }
    }
  ]
}
,
  
];


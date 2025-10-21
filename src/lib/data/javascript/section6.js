export default [
  {
  id: "sectionIntro",
  title: "",
  blocks: [
    {
      type: "paragraph",
      text: "En ^^funksjon^^ er en kodeblokk som vi har skrevet for å gjøre en spesifikk oppgave, og som er gjenbrukbar."
    },
    {
      type: "paragraph",
      text: "Man kan lage sine egne funksjoner til å gjøre en spesifikk oppgave. Funksjoner hjelper deg å skrive ryddig og gjenbrukbar kode. Det gjør det lettere å forstå hva programmet gjør."
    }
  ]
},
  {
  id: "sectionDefineFunction",
  title: "Hvordan lage en funksjon",
  blocks: [
    {
      type: "paragraph",
      text: "Her er et eksempel på en funksjon: "
    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      "code": "function siHei() {\n  console.log(\"Hei, Jens!\");\n}"
    },
    {
      type: "paragraph",
      text: "I dette eksemplet har vi laget en funksjon `siHei()`. Inni funksjonen bruker vi `console.log()` til å skrive ut meldingen `Hei Jens!`. Hvis vi prøvde å kjøre denne koden ville vi ikke sett noe i konsollen. Det er fordi man må ^^kalle på funksjonen^^."
    },
     {
      type: "paragraph",
      text: "Det er når vi kaller på funksjonen at vi faktisk kjører funksjonen. Dette gjør vi ved å skrive funksjonsnavnet etterfulgt av parenteser. "
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
      text: "Hva om vi heller ville si meldingen `Hei Sondre` eller `Hei Faizan`? For å slippe å skrive en ny funksjon for hver person lager vi heller en gjenbrukbar funksjon som bruker parametere og argumenter."
    },
  ]
},
{
  id: "sectionParameters",
  title: "Funksjonens parametere og argumenter",
  blocks: [
    {
      type: "paragraph",
      text: "^^Parametere^^ fungerer som placeholdere for verdiene som blir gitt til funksjonen når den blir kalt på. De gjør at funksjonen kan akseptere inn ^^input^^. Argumenter er de faktiske verdiene som blir gitt til funksjonen når den kalles på. Her er en oppdatert versjon av `siHei`-funksjonen fra tidligere:"
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
      text: "Her er `navn` parameteren til funksjonen, mens stringene \"Faizan\" og \"Sondre\" er argumentene."
    },

    {
      type: "paragraph",
      text: "Nå har vi en gjenbrukbar funksjon som kan brukes med ulike argumenter."
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
      text: "En funksjon kan ha en `return`-setning i kodeblokken. `return` brukes til å returnere en verdi tilbake fra funksjonskallet."
    },
    {
      type: "paragraph",
      text: "For eksempel vil følgende funksjon returnere summen av to tall som kan brukes videre i programmet:"
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
      text: "Når JavaScript når `return`-setningen vil den hoppe over resten av koden og gå tilbake til funksjonskallet. Du kan ha flere `return`-setninger, slik som dette eksemplet:"
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

  ]
},


{
  id: "sectionParameters",
  title: "Litt om variabel-scope",
  blocks: [
    {
      type: "paragraph",
      text: "^^Scope^^ i programmering handler om variablenes tilgjengelighet. Det å forstå scope er viktig for å lage effektiv og ren kode."
    },
    {
      type: "paragraph",
      text: "Variabler deklarert i ^^global scope^^ er tilgjengelig overalt i programmet ditt, inkludert inne i funksjoner og i blokker. Derfor kalles disse variablene ^^globale variabler^^. Slike variabler er beleilige, men kan føre til navnekonflikter så bør i større programmer brukes på en sparsommelig måte. Her er et eksempel:"
    },

    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let globalVar = "Jeg er en global variabel";

function printGlobalVar(){
  console.log(globalVar)  
}

printGlobalVar()`
    },
    
    {
      type: "paragraph",
      text: "I dette eksemplet er `globalVar` definert i det globale scopet og kan brukes inne i `printGlobalVar()`-funksjonen."
    },
    {
      type: "paragraph",
      text: "^^Local scope^^ derimot referer til variabler som bare er tilgjengelige i en funksjon. For eksempel:"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `function siHei(){
  let message = "Hei, local scope!";
  console.log(message);
}

siHei();
console.log(message);`
    },

    {
      type: "paragraph",
      text: "`message` er her en local variabel som bare er tilgjengelig innenfor `siHei()`-funksjonen."
    },
    {
      type: "paragraph",
      text: "Det siste scopet heter ^^block scope^^. En blokk er all kode som er innenfor krøllparenteser `{...}` (`if`, `for`, `while`). Variabler som defineres i en blokk er bare tilgjengelige innenfor den blokken. Eksempel: "
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `if(true){
  let blockVar = "Jeg er i en blokk";
  console.log(blockVar);      
}
console.log(blockVar)
`
    },
    {
      type: "paragraph",
      text: "I dette eksemplet er `blockVar` bare tilgjengelig innenfor `if`-blokken."
    },
    {
      type: "paragraph",
      text: "Man bør bruke globale variabler sparsommelig siden de kan føre til navnkonflikter og gjøre koden vanskeligere å håndtere. Med lokale variabler isolerer man koden mer, som gjør det enklere å fikse feil og holde den ryddig."
    },
  ]
},

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


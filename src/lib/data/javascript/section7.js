export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
    "type": "paragraph",
    "text": "Når du åpner en nettside ser du HTML-koden gjort om til en synlig side med tekst, bilder, knapper og mer. I bakgrunnen skjer det noe smart: Nettleseren lager en usynlig modell av nettsiden, kalt ^^DOM^^ – ^^Document Object Model^^."
    },
      {
      "type": "paragraph",
      "text": "Tenk på DOM som en levende kopi av HTML-koden, som JavaScript kan lese, endre og reagere på. Når nettleseren leser HTML-en bygger den et ^^DOM-tre^^, der hvert HTML-element (som `<body>`, `<h1>`, `<p>`) blir en ^^node^^ i treet."
    },
    {
      "type": "paragraph",
      "text": "Det er dette treet JavaScript bruker når du for eksempel endrer tekst, farge, skjuler elementer eller lager knapper som reagerer når du klikker."
    },
    
    {
        type: "image",
        component: 'BlockImage',
        props: {
          images: [
            {
              src: '/images/js/dom_model.png',
              alt: 'DOM-modell',
              caption: 'DOM-modell av en HTML-fil',
              fullWidth: true,
              width: "45%",
              align: "center",
              rounded: true,
              shadow: true,
              background: "white", 

            },
          ]
        }
      },
    ]
  },
  {
    id: "sectionExampleHTML",
    title: "Hvordan DOM ser ut i praksis",
    blocks: [
      {
        type: "paragraph",
        text: "Nettleseren tolker HTML-koden og lager et DOM-tre. Her er et enkelt eksempel:"
      },
      {
        type: "code",
        language: "html",
        code: `<body>\n  <h1 id="header">Velkommen!</h1>\n  <p id="tekst">Dette er en test.</p>\n  <button id="knapp">Klikk meg</button>\n</body>`,
        preview: false
      },
      {
        type: "paragraph",
        text: "Dette blir til et DOM-tre som ser slik ut:"
      },
      {
        type: "code",
        language: "plaintext",
        code: `body\n├── h1#header ("Velkommen!")\n├── p#tekst ("Dette er en test.")\n└── button#knapp ("Klikk meg")`,
        preview: false
      },      
      {
        type: "paragraph",
        text: "Nå kan vi bruke JavaScript til å hente ut disse elementene og gjøre hva vi vil med dem!"
      },
    ]
  },
  {
    id: "sectionGetElementById",
    title: "Velge elementer fra DOM med getElementById",
    blocks: [
      {
        type: "paragraph",
        text: "`getElementById` er en metode i JavaScript som lar deg hente et bestemt HTML-element – ved å bruke `id`-en til elementet. Etter du har hentet et element kan du forandre farge og innhold, og mye mer. "
      },
      {
        type: "paragraph",
        text: "La innholdet i `<body>...</body>`-tagen til HTML-filen være følgende:"
      },

      {
        type:"code",
        language: "html",
        preview: false,
        code: `<body>
  <h1 id="header">Klikk meg</h1>
  <p id="tekst">Dette er en test.</p>
  <button id="knapp">Klikk meg</button>
</body>`
      },
       {
        type: "paragraph",
        text: "For å forandre på `<h1>`-tagen kan vi skrive følgende i JavaScript-filen"
      },
      {
        type: "code",
        language: "javascript",
        interactive: false,
        code: `let overskrift = document.getElementById("header");
overskrift.textContent = "Velkommen til DOM-manipulering";`
      },
      {
        type: "paragraph",
        text: "I script-koden ovenfor skjer to ting:"
      },
      {
        type: "paragraph",
        text: '1) Vi lager en variabel `overskrift` og bruker `document.getElementById("header")` til å finne riktig element. `overskrift` blir dermed en referanse for elementet`<h1 id="header">`'
      },
      {
        type: "paragraph",
        text: '2) Vi endrer innholdet til headeren ved å skrive `overskrift.textContent = "...";`'
      },
      
      {
        type: "paragraph",
        text: "**Prøv å endre teksten selv i den interaktive javascript-editoren nedenfor og trykk på ^^Lagre JavaScript^^.**"
      },
      {
        type: "code",
        language: "html",
        preview: true,
        code: `<h1 id="header">Klikk meg</h1>`,
        script: `let overskrift = document.getElementById("header");
overskrift.textContent = "Velkommen til DOM-manipulering";`
      },
       {
        type: "paragraph",
        text: "Merk at med `getElementById` blir kun det **første** elementet med den id-en returnert. Det er et godt argument for at man aldri bruker samme id på flere elementer."
      },
      
    ]
  },
  {
    id: "sectionInteraksjon",
    title: "Interaksjon med knapper",
    blocks: [
      {
        type: "paragraph",
        text: "DOM lar deg også reagere på brukerens handlinger med for eksempel knapper. Her har jeg brukt samme HTML som over, men endret på scriptet for å inkludere en ^^event-listener^^."
      },
      {
        type: "code",
        language: "html",
        preview: true,
        code: `<h1 id="header">Klikk meg</h1>\n<p id="tekst">Dette er en test.</p>\n<button id="knapp">Klikk meg</button>`,
        script: `let button = document.getElementById("knapp");\nlet description = document.getElementById("tekst");\n\nbutton.addEventListener("click", function() {\n  description.textContent = "Teksten har blitt endret!";\n});`
      },
      {
        type: "paragraph",
        text: "Her kobler vi en `click`-hendelse til knappen. Når brukeren klikker, endres teksten i `<p>`-elementet."
      }
    ]
  },


  {
  "id": "sectionTasks",
  "title": "Flervalgsoppgaver – DOM",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Her kommer noen spørsmål for å teste deg på det du har lært om DOM!"
    },
    {
    "type": "task",
    "number": 1,
    "title": "Hva gjør getElementById?",
    "description": "Hva returnerer `document.getElementById(\"minId\")`?",
    "solution": {
      "correct": 2,
      "options": [
        "En liste over alle elementer med id = \"minId\"",
        "Det første elementet med klassen \"minId\"",
        "Et HTML-element med id = \"minId\"",
        "Alle knapper på siden"
      ]
    }
  },
  {
    "type": "task",
    "number": 2,
    "title": "Hvordan endrer vi teksten i et element?",
    "description": "Hvilken JavaScript-kode endrer teksten i et element med id `minTekst`?",
    "solution": {
      "correct": 1,
      "options": [
        "minTekst.text = \"Hei\"",
        "document.getElementById(\"minTekst\").textContent = \"Hei\";",
        "getElement(\"minTekst\").innerText = \"Hei\";",
        "document.querySelector(\"#minTekst\").id = \"Hei\";"
      ]
    }
  },
  {
    "type": "task",
    "number": 3,
    "title": "Hva skjer når vi bruker addEventListener?",
    "description": "Hva gjør denne koden?",
    "code": "document.getElementById(\"knapp\").addEventListener(\"click\", function() {\n  alert(\"Hei!\");\n});",
    "solution": {
      "correct": 2,
      "options": [
        "Knappen blir skjult når man klikker på den",
        "Ingenting skjer – det er en skrivefeil",
        "Når brukeren klikker på knappen, vises en popup med \"Hei!\"",
        "Den endrer teksten i knappen"
      ]
    }
  },]
  },
  
  {
  "id": "sectionTasks",
  "title": "Oppgaver om DOM",
  "blocks": [
    {
      "type": "task",
      "number": 1,
      "title": "Endre overskrift med knappetrykk",
      "description": "Lag et HTML-dokument med en overskrift `h1` og en knapp. Bruk JavaScript til å endre teksten i overskriften når knappen klikkes.",
      "solution": {
        "code": "<h1 id=\"header\">Original tekst</h1>\n<button id=\"changeText\">Endre tekst</button>\n\n<script>\n  let button = document.getElementById(\"changeText\");\n  let header = document.getElementById(\"header\");\n\n  button.addEventListener(\"click\", function() {\n    header.textContent = \"Ny overskrift!\";\n  });\n</script>"
      }
    },
    {
      "type": "task",
      "number": 2,
      "title": "Endre farge på et element",
      "description": "Lag et element i HTML-filen med et tekstelement (f.eks. et `<p>`-element), og bruk JavaScript til å endre fargen på teksten når du klikker på en knapp. Hint: Bruk `<p>.style.color` for å endre farge-",
      "solution": {
        "code": "<p id=\"text\">Dette er en tekst.</p>\n<button id=\"changeColor\">Bytt farge</button>\n\n<script>\n  let button = document.getElementById(\"changeColor\");\n  let text = document.getElementById(\"text\");\n\n  button.addEventListener(\"click\", function() {\n    text.style.color = \"blue\";\n  });\n</script>"
      }
    },
  ]
},

];


//     {
//   "type": "task",
//   "number": 3,
//   "title": "Endre både tekst og farge",
//   "description": "Lag en knapp som både endrer teksten *og* fargen på et element når du klikker på den.",
//   "solution": {
//     "code": "<p id=\"text\">Trykk på knappen!</p>\n<button id=\"change\">Trykk meg</button>\n\n<script>\n  let button = document.getElementById(\"change\");\n  let text = document.getElementById(\"text\");\n\n  button.addEventListener(\"click\", function() {\n    text.textContent = \"Bra jobba!\";\n    text.style.color = \"green\";\n  });\n</script>"
//   }
// },

//     {
//       "type": "task",
//       "number": 4,
//       "title": "Skjul et element",
//       "description": "Lag et element med tekst og en knapp. Når knappen trykkes, skal teksten forsvinne.",
//       "solution": {
//         "code": "<p id=\"text\">Dette skal skjules.</p>\n<button id=\"hide\">Skjul tekst</button>\n\n<script>\n  let button = document.getElementById(\"hide\");\n  let text = document.getElementById(\"text\");\n\n  button.addEventListener(\"click\", function() {\n    text.style.display = \"none\";\n  });\n</script>"
//       }
//     },
//     {
//       "type": "task",
//       "number": 5,
//       "title": "Toggle knappetekst",
//       "description": "Lag en knapp som bytter mellom to tekster hver gang du klikker på den (f.eks. «Start» og «Stopp»).",
//       "solution": {
//         "code": "<button id=\"toggle\">Start</button>\n\n<script>\n  let button = document.getElementById(\"toggle\");\n\n  button.addEventListener(\"click\", function() {\n    if (button.textContent === \"Start\") {\n      button.textContent = \"Stopp\";\n    } else {\n      button.textContent = \"Start\";\n    }\n  });\n</script>"
//       }
//     },
//     {
//       "type": "paragraph",
//       "text": "Disse oppgavene hjelper deg å trene på DOM-manipulering og å bruke `getElementById` for å gjøre nettsiden din interaktiv."
//     }
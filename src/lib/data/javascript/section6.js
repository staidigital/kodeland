export default [
  {
    id: "sectionIntro",
    title: "Introduksjon til DOM og getElementById i JavaScript",
    blocks: [
      {
    "type": "paragraph",
    "text": "Når du åpner en nettside, ser du HTML-koden _gjort om_ til en synlig side. Det som skjer i bakgrunnen, er at nettleseren lager noe som kalles ^^DOM^^ – Document Object Model."
    },
      {
      "type": "paragraph",
      "text": "DOM er en slags ^^usynlig kopi^^ av HTML-strukturen, som JavaScript kan lese og endre. Når nettleseren laster en nettside, lager den et DOM-tre basert på HTML-en. Hvert element på nettsiden (som `<div>`, `<p>`, `<h1>` blir en ^^node^^ i dette treet."
    },
    {
      "type": "paragraph",
      "text": "Med JavaScript kan du bruke DOM til å finne og endre disse nodene. Da kan du få nettsiden til å endre seg mens den er i gang – for eksempel ved å endre tekst, farger, skjule eller vise ting, eller lage knapper som reagerer når brukeren klikker."
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
      }
    ]
  },
  {
    id: "sectionGetElementById",
    title: "Bruke getElementById",
    blocks: [
      {
        type: "paragraph",
        text: "`getElementById` er en metode i JavaScript som lar deg hente et bestemt HTML-element – ved å bruke `id`-en."
      },
      {
        type: "paragraph",
        text: "Når du har funnet elementet, kan du endre innholdet, farge, skjule det, eller hva du vil!"
      },
      {
        type: "code",
        language: "html",
        preview: true,
        code: `<h1 id="header">Klikk meg</h1>\n<p id="tekst">Dette er en test.</p>\n<button id="knapp">Klikk meg</button>`,
        script: `let overskrift = document.getElementById("header");\noverskrift.textContent = "Velkommen til DOM-manipulering";`
      },
      {
        type: "paragraph",
        text: "👆 Her skjer to ting:"
      },
      {
        type: "list-ol",
        items: [
          'Vi bruker `getElementById("header")` for å finne `<h1 id="header">` og lagrer det i variabelen `overskrift`.',
          'Så endrer vi teksten ved å skrive `overskrift.textContent = "...";`'
        ]
      },
      {
        type: "paragraph",
        text: "💡 Prøv å endre teksten selv og trykk på **Lagre JavaScript**."
      }
    ]
  },
  {
    id: "sectionInteraksjon",
    title: "Interaksjon med knapper",
    blocks: [
      {
        type: "paragraph",
        text: "DOM lar deg også reagere på brukerens handlinger. For eksempel kan du endre tekst når noen trykker på en knapp."
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
  "title": "Oppgaver",
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
      "description": "Lag et element med tekst (f.eks. et `<p>`-element), og bruk JavaScript til å endre fargen på teksten når du klikker på en knapp.",
      "solution": {
        "code": "<p id=\"text\">Dette er en tekst.</p>\n<button id=\"changeColor\">Bytt farge</button>\n\n<script>\n  let button = document.getElementById(\"changeColor\");\n  let text = document.getElementById(\"text\");\n\n  button.addEventListener(\"click\", function() {\n    text.style.color = \"blue\";\n  });\n</script>"
      }
    },
    {
      "type": "task",
      "number": 3,
      "title": "Skjul et element",
      "description": "Lag et element med tekst og en knapp. Når knappen trykkes, skal teksten forsvinne.",
      "solution": {
        "code": "<p id=\"text\">Dette skal skjules.</p>\n<button id=\"hide\">Skjul tekst</button>\n\n<script>\n  let button = document.getElementById(\"hide\");\n  let text = document.getElementById(\"text\");\n\n  button.addEventListener(\"click\", function() {\n    text.style.display = \"none\";\n  });\n</script>"
      }
    },
    {
      "type": "task",
      "number": 4,
      "title": "Toggle knappetekst",
      "description": "Lag en knapp som bytter mellom to tekster hver gang du klikker på den (f.eks. «Start» og «Stopp»).",
      "solution": {
        "code": "<button id=\"toggle\">Start</button>\n\n<script>\n  let button = document.getElementById(\"toggle\");\n\n  button.addEventListener(\"click\", function() {\n    if (button.textContent === \"Start\") {\n      button.textContent = \"Stopp\";\n    } else {\n      button.textContent = \"Start\";\n    }\n  });\n</script>"
      }
    },
    {
      "type": "paragraph",
      "text": "Disse oppgavene hjelper deg å trene på DOM-manipulering og å bruke `getElementById` for å gjøre nettsiden din interaktiv."
    }
  ]
},

  {
    id: "sectionTasks",
    title: "Oppgaver",
    blocks: [
      {
        type: "task",
        number: 1,
        title: "Endre overskrift med knappetrykk",
        description: "Lag et HTML-dokument med en overskrift (h1) og en knapp. Bruk JavaScript til å endre teksten i overskriften når knappen klikkes."
      },
      {
        type: "task",
        number: 2,
        title: "Endre farge på et element",
        description: "Legg til et element med tekst og bruk JavaScript til å endre fargen på teksten når en knapp trykkes."
      },
      {
        type: "paragraph",
        text: "Disse oppgavene gir deg grunnleggende innsikt i hvordan du kan manipulere DOM og bruke getElementById for å interagere med nettsiden."
      }
    ]
  }
];

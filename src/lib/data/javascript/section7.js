export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [

      { type: "paragraph", text: "Når du åpner en nettside ser du HTML gjort om til en synlig side. I bakgrunnen lager nettleseren en usynlig modell kalt ^^DOM^^ – ^^Document Object Model^^." },

      { type: "paragraph", text: "DOM er en kopi av HTML som JavaScript kan lese og endre. Nettleseren bygger et ^^DOM-tre^^ der hvert HTML-element (som `<body>`, `<h1>`, `<p>`) blir en ^^node^^ i treet" },

      { type: "paragraph", text: "JavaScript bruker dette treet for å endre tekst, farge, skjule elementer eller lage knapper som reagerer." },
    
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
   
      { type: "paragraph", text: "Nettleseren tolker HTML og lager et DOM-tre.  Eksempel:" },

      {
        type: "code",
        language: "html",
        code: `<body>\n  <h1 id="header">Velkommen!</h1>\n  <p id="tekst">Dette er en test.</p>\n  <button id="knapp">Klikk meg</button>\n</body>`,
        preview: false
      },
      {
        type: "paragraph",
        text: "DOM-treet ser slik ut:"
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
    id: "elementbyid",
    title: "Velge elementer fra DOM med getElementById",
    blocks: [
      {
        type: "paragraph",
        text: "`getElementById` er en metode i JavaScript som lar deg hente et bestemt HTML-element – ved å bruke `id`-en til elementet. Etter du har hentet et element kan du forandre farge og innhold, og mye mer. "
      },
       {
        type: "paragraph",
        text: "For å forandre på teksten til `<h1>`-tagen fra koden ovenfor, kan vi skrive følgende i JavaScript"
      },
      {
        type: "code",
        language: "javascript",
        interactive: false,
        code: `let overskrift = document.getElementById("header");
overskrift.textContent = "Velkommen til DOM-manipulering";`
      },
      { type: "paragraph", text: "Her skjer to ting:"},
      { type: "paragraph", text: "1) Vi lager variabelen `overskrift` som peker til `<h1 id=\"header\">`."},

      {
        type: "paragraph",
        text: '2) Vi endrer innholdet med `textContent`. '
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
          { type: "paragraph", text: "Merk: `getElementById` returnerer kun det første elementet med den id-en." }
      
    ]
  },
  {
    id: "sectionInteraksjon",
    title: "Interaksjon med knapper",
    blocks: [
      {
        type: "paragraph",
        text: "DOM lar deg også reagere på brukerens handlinger med for eksempel knapper. Her har jeg brukt samme HTML som over, men endret på scriptet for å inkludere en ^^event-listener^^, som kjører en funksjon dersom man klikker på knappen."
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


//   {
//   "id": "sectionTasks",
//   "title": "Flervalgsoppgaver – DOM",
//   "blocks": [
//     {
//       "type": "paragraph",
//       "text": "Her kommer noen spørsmål for å teste deg på det du har lært om DOM!"
//     },
//     {
//     "type": "task",
//     "number": 1,
//     "title": "Hva gjør getElementById?",
//     "description": "Hva returnerer `document.getElementById(\"minId\")`?",
//     "solution": {
//       "correct": 2,
//       "options": [
//         "En liste over alle elementer med id = \"minId\"",
//         "Det første elementet med klassen \"minId\"",
//         "Et HTML-element med id = \"minId\"",
//         "Alle knapper på siden"
//       ]
//     }
//   },
//   {
//     "type": "task",
//     "number": 2,
//     "title": "Hvordan endrer vi teksten i et element?",
//     "description": "Hvilken JavaScript-kode endrer teksten i et element med id `minTekst`?",
//     "solution": {
//       "correct": 1,
//       "options": [
//         "minTekst.text = \"Hei\"",
//         "document.getElementById(\"minTekst\").textContent = \"Hei\";",
//         "getElement(\"minTekst\").innerText = \"Hei\";",
//         "document.querySelector(\"#minTekst\").id = \"Hei\";"
//       ]
//     }
//   },
//   {
//     "type": "task",
//     "number": 3,
//     "title": "Hva skjer når vi bruker addEventListener?",
//     "description": "Hva gjør denne koden?",
//     "code": "document.getElementById(\"knapp\").addEventListener(\"click\", function() {\n  alert(\"Hei!\");\n});",
//     "solution": {
//       "correct": 2,
//       "options": [
//         "Knappen blir skjult når man klikker på den",
//         "Ingenting skjer – det er en skrivefeil",
//         "Når brukeren klikker på knappen, vises en popup med \"Hei!\"",
//         "Den endrer teksten i knappen"
//       ]
//     }
//   },]
//   },
  
  {
  "id": "sectionTasks",
  "title": "Oppgaver om DOM",
  "blocks": [

    {
      "type": "task",
      "number": 1,
      "title": "Endre farge på et element",
      "description": "Lag et element i HTML-filen med et tekstelement (f.eks. et `<p>`-element), og bruk JavaScript til å endre fargen på teksten når du klikker på en knapp. Hint: Bruk `<p>.style.color` for å endre farge-",
      "solution": {
        "code": "<p id=\"text\">Dette er en tekst.</p>\n<button id=\"changeColor\">Bytt farge</button>\n\n<script>\n  let button = document.getElementById(\"changeColor\");\n  let text = document.getElementById(\"text\");\n\n  button.addEventListener(\"click\", function() {\n    text.style.color = \"blue\";\n  });\n</script>"
      }
    },
    {
  "type": "task",
  "number": 2,
  "title": "Skjul og vis et element",
  "description": "Lag et avsnitt og en knapp. Når du klikker på knappen, skal avsnittet skjules. Klikker du igjen, skal det vises. Hint: endre på style-attributen `display` som kan være `none` eller `block`",
  "solution": {
    "code": `let button = document.getElementById("toggle");
let text = document.getElementById("text");

button.addEventListener("click", function() {
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
});`
  }
},
    {
  "type": "task",
  "number": 3,
  "title": "Tell antall klikk",
  "description": "Lag en knapp som teller hvor mange ganger den er klikket og viser tallet i et `<span>`-element.",
  "solution": {
    "code": `let button = document.getElementById("counter");
let countSpan = document.getElementById("count");
let count = 0;

button.addEventListener("click", function() {
  count++;
  countSpan.textContent = count;
});`

  }
}

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
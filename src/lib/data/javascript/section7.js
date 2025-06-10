export default [
  {
    "id": "sectionIntro",
    "title": "Flere Selectors og Manipulering av CSS med JavaScript",
    "blocks": [
      {
        "type": "paragraph",
        "text": "I JavaScript har vi flere måter å hente ut elementer fra HTML-en. Disse metodene kalles ^^selectors^^ (eller velgere), og de lar oss finne spesifikke elementer vi vil jobbe med. Når vi har valgt et element, kan vi bruke JavaScript til å endre utseendet – for eksempel farger, tekst eller andre stiler."
      }
    ]
  },
  {
    "id": "sectionIntroToEvents",
    "title": "Litt om knapper og klikk",
    "blocks": [
      {
        "type": "paragraph",
        "text": "I noen av eksemplene våre bruker vi en **knapp** og litt ny kode som ser slik ut: `button.addEventListener(...)`. Du trenger ikke forstå dette fullt ut enda – vi skal forklare det grundig senere!"
      },
      {
        "type": "paragraph",
        "text": "💡 Akkurat nå kan du bare vite at vi bruker `addEventListener(\"click\", ...)` for å få noe til å skje når brukeren klikker på en knapp. Dette gjør det lettere å teste hvordan JavaScript endrer utseendet på siden."
      },
      {
        "type": "paragraph",
        "text": "Så ikke stress med detaljene – trykk på knappen, se hva som skjer, og fortsett 😊"
      }
    ]
  },
  {
    "id": "sectionSelectors",
    "title": "1. Ulike måter å velge elementer",
    "blocks": [
      {
        "type": "paragraph",
        "subtitle": "`getElementsByClassName`",
        "text": "Brukes for å hente ALLE elementer med et bestemt klassenavn. Du får en liste med elementer, så du må bruke en løkke for å gjøre noe med hvert element."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<div class=\"myClass\">Første</div>\n<div class=\"myClass\">Andre</div>\n<div class=\"myClass\">Tredje</div>\n<button id=\"colorBtn\">Endre farge</button>`,
        "script": `document.getElementById(\"colorBtn\").addEventListener(\"click\", function() {\n  let elements = document.getElementsByClassName(\"myClass\");\n  for (let i = 0; i < elements.length; i++) {\n    elements[i].style.color = \"blue\";\n  }\n});`
      },
      {
        "type": "paragraph",
        "subtitle": "`getElementsByTagName`",
        "text": "Brukes for å hente ALLE elementer med en bestemt HTML-tag (f.eks. `<p>`, `<h1>`, `<div>`). For eksempel kan du hente ut alle `p`-elementene på en side."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<p>Avsnitt 1</p>\n<p>Avsnitt 2</p>\n<p>Avsnitt 3</p>\n<button id=\"fontBtn\">Endre skriftstørrelse</button>`,
        "script": `document.getElementById(\"fontBtn\").addEventListener(\"click\", function() {\n  let paragraphs = document.getElementsByTagName(\"p\");\n  for (let i = 0; i < paragraphs.length; i++) {\n    paragraphs[i].style.fontSize = \"18px\";\n  }\n});`
      },
      {
        "type": "paragraph",
        "subtitle": "`querySelector` og `querySelectorAll`",
        "text": "`querySelector` henter det FØRSTE elementet som matcher en CSS-selektor. `querySelectorAll` henter ALLE som matcher, som en liste."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<div class=\"myClass\">Boks 1</div>\n<div class=\"myClass\">Boks 2</div>\n<button id=\"styleBtn\">Legg til stil</button>`,
        "script": `document.getElementById(\"styleBtn\").addEventListener(\"click\", function() {\n  let first = document.querySelector(\".myClass\");\n  first.style.backgroundColor = \"yellow\";\n\n  let all = document.querySelectorAll(\".myClass\");\n  all.forEach(el => {\n    el.style.border = \"2px solid red\";\n  });\n});`
      }
    ]
  },
  {
    "id": "sectionManipCSS",
    "title": "2. Endre CSS med JavaScript",
    "blocks": [
      {
        "type": "paragraph",
        "subtitle": "Direkte stilendring",
        "text": "Bruk `element.style` for å endre ting som farge, bakgrunn eller størrelse direkte."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<div id=\"myElement\">Endre meg</div>\n<button id=\"styleChange\">Endre stil</button>`,
        "script": `document.getElementById(\"styleChange\").addEventListener(\"click\", function() {\n  let el = document.getElementById(\"myElement\");\n  el.style.color = \"green\";\n  el.style.backgroundColor = \"lightgrey\";\n});`
      },
      {
        "type": "paragraph",
        "subtitle": "Legge til og fjerne klasser med `classList`",
        "text": "`classList` lar deg legge til, fjerne eller toggle (veksle) mellom CSS-klasser på et element. Dette er spesielt nyttig hvis du har forhåndsdefinerte CSS-klasser du ønsker å aktivere eller deaktivere."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<style>.highlight { background-color: gold; }</style>\n<div id=\"myElement\">Trykk på knappen</div>\n<button id=\"toggleHighlight\">Veksle klasse</button>`,
        "script": `document.getElementById(\"toggleHighlight\").addEventListener(\"click\", function() {\n  let element = document.getElementById(\"myElement\");\n  element.classList.toggle(\"highlight\");\n});`
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
        "title": "Endre stil på flere elementer",
        "description": "Bruk `getElementsByClassName` for å velge alle elementer med en bestemt klasse, og endre fargen på teksten deres.",
        "solution": {
          "code": "<p class=\"text\">Dette er tekst 1.</p>\n<p class=\"text\">Dette er tekst 2.</p>\n<p class=\"text\">Dette er tekst 3.</p>\n<button id=\"changeColorButton\">Endre farge</button>",
          "script": "let button = document.getElementById(\"changeColorButton\");\nlet paragraphs = document.getElementsByClassName(\"text\");\n\nbutton.addEventListener(\"click\", function() {\n  for (let i = 0; i < paragraphs.length; i++) {\n    paragraphs[i].style.color = \"blue\";\n  }\n});"
        }
      },
      {
        "type": "task",
        "number": 2,
        "title": "Bruk `querySelectorAll` til å velge elementer",
        "description": "Bruk `querySelectorAll` for å velge alle `div`-elementer, og legg til en rød kant rundt dem når en knapp trykkes.",
        "solution": {
          "code": "<div class=\"box\">Boks 1</div>\n<div class=\"box\">Boks 2</div>\n<div class=\"box\">Boks 3</div>\n<button id=\"addBorderButton\">Legg til kant</button>",
          "script": "let button = document.getElementById(\"addBorderButton\");\nlet boxes = document.querySelectorAll(\".box\");\n\nbutton.addEventListener(\"click\", function() {\n  boxes.forEach(function(box) {\n    box.style.border = \"2px solid red\";\n  });\n});"
        }
      },
      {
        "type": "task",
        "number": 3,
        "title": "Endre klasser med `classList`",
        "description": "Bruk `classList` til å veksle en klasse som endrer bakgrunnsfargen på et element.",
        "solution": {
          "code": "<style>\n  .highlight {\n    background-color: yellow;\n  }\n</style>\n\n<div id=\"myDiv\">Dette er en div som endrer bakgrunn.</div>\n<button id=\"toggleClassButton\">Veksle bakgrunn</button>",
          "script": "let button = document.getElementById(\"toggleClassButton\");\nlet div = document.getElementById(\"myDiv\");\n\nbutton.addEventListener(\"click\", function() {\n  div.classList.toggle(\"highlight\");\n});"
        }
      },
      {
        "type": "paragraph",
        "text": "Disse oppgavene vil hjelpe deg å forstå hvordan du kan bruke forskjellige selectors for å hente ut elementer fra DOM, samt hvordan du kan endre stiler dynamisk ved hjelp av JavaScript."
      }
    ]
  }
];
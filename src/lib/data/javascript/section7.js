export default [
  {
    "id": "sectionIntro",
    "title": "Flere Selectors og Manipulering av CSS med JavaScript",
    "blocks": [
      {
        "type": "paragraph",
        "text": "I JavaScript finnes det mange m\u00e5ter \u00e5 hente ut elementer fra HTML-en. Vi kan bruke ulike selectors (velgere) for \u00e5 f\u00e5 tak i elementene vi vil jobbe med, og deretter kan vi dynamisk endre stilene deres ved hjelp av JavaScript."
      }
    ]
  },
  {
    "id": "sectionClassSelector",
    "title": "1. Flere Selectors",
    "blocks": [
      {
        "type": "subtitle",
        "text": "`getElementsByClassName`"
      },
      {
        "type": "paragraph",
        "text": "Denne metoden returnerer en samling av alle elementer som har en gitt klasse. Siden den returnerer en samling (HTMLCollection), m\u00e5 du bruke en l\u00f8kke for \u00e5 endre stil p\u00e5 hvert enkelt element."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": "<div class=\"myClass\">F\u00f8rste element</div>\n<div class=\"myClass\">Andre element</div>\n<div class=\"myClass\">Tredje element</div>\n<button id=\"changeColor\">Endre farge</button>",
        "script": "document.getElementById(\"changeColor\").addEventListener(\"click\", () => {\n  let elements = document.getElementsByClassName(\"myClass\");\n  for (let i = 0; i < elements.length; i++) {\n    elements[i].style.color = \"blue\";\n  }\n});"
      },
      {
        "type": "subtitle",
        "text": "`getElementsByTagName`"
      },
      {
        "type": "paragraph",
        "text": "Denne metoden returnerer en samling av alle elementer med et bestemt HTML-tag. For eksempel kan du velge alle `p`-elementene p\u00e5 en side."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": "<p>Dette er et avsnitt</p>\n<p>Et annet avsnitt</p>\n<p>Et tredje avsnitt</p>\n<button id=\"changeSize\">Endre st\u00f8rrelse</button>",
        "script": "document.getElementById(\"changeSize\").addEventListener(\"click\", () => {\n  let paragraphs = document.getElementsByTagName(\"p\");\n  for (let i = 0; i < paragraphs.length; i++) {\n    paragraphs[i].style.fontSize = \"18px\";\n  }\n});"
      },
      {
        "type": "subtitle",
        "text": "`querySelector` og `querySelectorAll`"
      },
      {
        "type": "paragraph",
        "text": "`querySelector` returnerer det **f\u00f8rste** elementet som samsvarer med en gitt CSS-selektor, mens `querySelectorAll` returnerer **alle** elementene som samsvarer med selektoren som en NodeList."
      },
      {
        "type": "code",
        "preview": true,

        "language": "html",
        "code": "<div class=\"myClass\">En boks</div>\n<div class=\"myClass\">En annen boks</div>\n<button id=\"styleBoxes\">Legg til stil</button>",
        "script": "document.querySelector(\".myClass\").style.backgroundColor = \"yellow\";\n\ndocument.getElementById(\"styleBoxes\").addEventListener(\"click\", () => {\n  let allElements = document.querySelectorAll(\".myClass\");\n  allElements.forEach(function(el) {\n    el.style.border = \"2px solid red\";\n  });\n});"
      }
    ]
  },
  {
    "id": "sectionManipCSS",
    "title": "2. Manipulering av CSS med JavaScript",
    "blocks": [
      {
        "type": "subtitle",
        "text": "Endre CSS med `style`-egenskapen"
      },
      {
        "type": "paragraph",
        "text": "Vi kan bruke `style`-egenskapen i JavaScript til \u00e5 direkte endre CSS-stiler p\u00e5 et element, som for eksempel farge, st\u00f8rrelse, marginer, eller bakgrunn."
      },
      {
        "type": "code",
        "preview": true,
        "language": "html",
        "code": "<div id=\"myElement\">Et viktig element</div>\n<button id=\"styleElement\">Stil element</button>",
        "script": "document.getElementById(\"styleElement\").addEventListener(\"click\", () => {\n  let element = document.getElementById(\"myElement\");\n  element.style.color = \"green\";\n  element.style.backgroundColor = \"lightgrey\";\n});"
      },
      {
        "type": "subtitle",
        "text": "Legge til og fjerne klasser med `classList`"
      },
      {
        "type": "paragraph",
        "text": "`classList` lar deg legge til, fjerne eller toggle (veksle) mellom CSS-klasser p\u00e5 et element. Dette er spesielt nyttig hvis du har forh\u00e5ndsdefinerte CSS-klasser du \u00f8nsker \u00e5 aktivere eller deaktivere."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": "<style>\n  .highlight {\n    background-color: gold;\n  }\n</style>\n\n<div id=\"myElement\">Et element du kan endre</div>\n<button id=\"toggleClass\">Bytt stil</button>",
        "script": "document.getElementById(\"toggleClass\").addEventListener(\"click\", () => {\n  let element = document.getElementById(\"myElement\");\n  element.classList.toggle(\"highlight\");\n});"
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
        "title": "Endre stil p\u00e5 flere elementer",
        "description": "Bruk `getElementsByClassName` for \u00e5 velge alle elementer med en bestemt klasse, og endre fargen p\u00e5 teksten deres.",
        "solution": {
          "code": "<p class=\"text\">Dette er tekst 1.</p>\n<p class=\"text\">Dette er tekst 2.</p>\n<p class=\"text\">Dette er tekst 3.</p>\n<button id=\"changeColorButton\">Endre farge</button>",
          "script": "let button = document.getElementById(\"changeColorButton\");\nlet paragraphs = document.getElementsByClassName(\"text\");\n\nbutton.addEventListener(\"click\", function() {\n  for (let i = 0; i < paragraphs.length; i++) {\n    paragraphs[i].style.color = \"blue\";\n  }\n});"
        }
      },
      {
        "type": "task",
        "number": 2,
        "title": "Bruk `querySelectorAll` til \u00e5 velge elementer",
        "description": "Bruk `querySelectorAll` for \u00e5 velge alle `div`-elementer, og legg til en r\u00f8d kant rundt dem n\u00e5r en knapp trykkes.",
        "solution": {
          "code": "<div class=\"box\">Boks 1</div>\n<div class=\"box\">Boks 2</div>\n<div class=\"box\">Boks 3</div>\n<button id=\"addBorderButton\">Legg til kant</button>",
          "script": "let button = document.getElementById(\"addBorderButton\");\nlet boxes = document.querySelectorAll(\".box\");\n\nbutton.addEventListener(\"click\", function() {\n  boxes.forEach(function(box) {\n    box.style.border = \"2px solid red\";\n  });\n});"
        }
      },
      {
        "type": "task",
        "number": 3,
        "title": "Endre klasser med `classList`",
        "description": "Bruk `classList` til \u00e5 veksle en klasse som endrer bakgrunnsfargen p\u00e5 et element.",
        "solution": {
          "code": "<style>\n  .highlight {\n    background-color: yellow;\n  }\n</style>\n\n<div id=\"myDiv\">Dette er en div som endrer bakgrunn.</div>\n<button id=\"toggleClassButton\">Veksle bakgrunn</button>",
          "script": "let button = document.getElementById(\"toggleClassButton\");\nlet div = document.getElementById(\"myDiv\");\n\nbutton.addEventListener(\"click\", function() {\n  div.classList.toggle(\"highlight\");\n});"
        }
      },
      {
        "type": "paragraph",
        "text": "Disse oppgavene vil hjelpe deg \u00e5 forst\u00e5 hvordan du kan bruke forskjellige selectors for \u00e5 hente ut elementer fra DOM, samt hvordan du kan endre stiler dynamisk ved hjelp av JavaScript."
      }
    ]
  }
];
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
    "id": "sectionClassSelector",
    "title": "1. Flere Selectors",
    "blocks": [
      {
        "type": "paragraph",
        "subtitle": "`getElementsByClassName`",
        "text": "Denne metoden returnerer en samling av alle elementer som har en gitt klasse. Siden den returnerer en samling (HTMLCollection), må du bruke en løkke for å endre stil på hvert enkelt element."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": "<div class=\"myClass\">Første element</div>\n<div class=\"myClass\">Andre element</div>\n<div class=\"myClass\">Tredje element</div>",
        "script": 'let elements = document.getElementsByClassName("myClass");\n\nfor (let i = 0; i < elements.length; i++) {\n  elements[i].style.color = "blue";\n}'
      },
      
      {
        "type": "paragraph",
        "subtitle": "`getElementsByTagName`",
        "text": "Denne metoden returnerer en samling av alle elementer med et bestemt HTML-tag. For eksempel kan du velge alle `p`-elementene på en side."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": "<p>Dette er et avsnitt</p>\n<p>Et annet avsnitt</p>\n<p>Et tredje avsnitt</p>",
        "script": 'let paragraphs = document.getElementsByTagName("p");\n\nfor (let i = 0; i < paragraphs.length; i++) {\n  paragraphs[i].style.fontSize = "18px";\n}'
      },
      {
        "type": "paragraph",
        "subtitle": "`querySelector` og `querySelectorAll`",
        "text": "`querySelector` returnerer det **f\u00f8rste** elementet som samsvarer med en gitt CSS-selektor, mens `querySelectorAll` returnerer **alle** elementene som samsvarer med selektoren som en NodeList."
      },
      {
        "type": "code",
        "preview": true,

        "language": "html",
        "code": "<div class=\"myClass\">En boks</div>\n<div class=\"myClass\">En annen boks</div>",
        "script": '// Velg det første elementet med klassen "myClass"\nlet element = document.querySelector(".myClass");\nelement.style.backgroundColor = "yellow";\n\n// Velg alle elementer med klassen "myClass"\nlet allElements = document.querySelectorAll(".myClass");\n\nallElements.forEach(function(el) {\n  el.style.border = "2px solid red";\n});'
      }
    ]
  },
  {
    "id": "sectionManipCSS",
    "title": "2. Manipulering av CSS med JavaScript",
    "blocks": [

      {
        "type": "paragraph",
        "subtitle": "Endre CSS med `style`-egenskapen",
        "text": "Vi kan bruke `style`-egenskapen i JavaScript til å direkte endre CSS-stiler på et element, som for eksempel farge, størrelse, marginer, eller bakgrunn."
      },
      {
        "type": "code",
        "preview": true,
        "language": "html",
        "code": "<div id=\"myElement\">Et viktig element</div>",
        "script":'let element = document.getElementById("myElement");\nelement.style.color = "green";\nelement.style.backgroundColor = "lightgrey";'
      },
      {
        "type": "paragraph",
        "subtitle": "Legge til og fjerne klasser med `classList`",
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
export default [
  {
    "id": "sectionIntro",
    "title": "",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Vi har sett en måte å hente ut et element fra HTML, `getElementById()`. I JavaScript har vi flere måter å hente ut elementer og metodene kalles ^^selectors^^. Her går vi gjennom de mest vanlige."
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
        "text": "Brukes for å hente ALLE elementer med et bestemt klassenavn. Du får en liste med elementer, så du må bruke en løkke for å gjøre noe med hvert element. "
      },
      {
        "type": "paragraph",
        "text": "I HTML-koden nedenfor har vi en ^^unordered list^^ (`ul`) med tre liste-elementer (`li`) som har samme class `list-item`:"
      },
      {
        "type": "code",
        language: "HTML",
        "code": `<ul>
  <li class="list-item">The Matrix</li>
  <li class="list-item">Star Wars</li>
  <li class="list-item">Harry Potter</li>
</ul>
`
      },
      {
        "type": "paragraph",
        "text": "I JavaScript skriver vi:"
      },
      {
        "type": "code",
        language: "javascript",
        "code": `let listElements = document.getElementsByClassName("list-item");
console.log(listElements); //HTMLCollection(3) [li.list-items, li.list-items, li.list-items]`
      },
      
      {
        "type": "paragraph",
        "text": "Vi ser i konsollen en `array` med alle liste-elementene."
      },
      {type: "code", 
        language: "plaintext",
        code: 'HTMLCollection(3)[li.list-items, li.list-items, li.list-items]'
      },
      {
        "type": "paragraph",
        "text": "Så for å gjøre noe med et spesifikt element må vi huske hvordan en `array` fungerer. I koden nedenfor bruker vi en `for`-løkke for å gå gjennom arrayen og endre fargene på teksten."
      },
      
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<ul>
  <li class="list-item">The Matrix</li>
  <li class="list-item">Star Wars</li>
  <li class="list-item">Harry Potter</li>
</ul><button id=\"myButton\">Endre farge</button>`,
        "script": `document.getElementById(\"myButton\").addEventListener(\"click\", function() {\n  let elements = document.getElementsByClassName(\"list-item\");\n  for (let i = 0; i < elements.length; i++) {\n    elements[i].style.color = \"blue\";\n  }\n});`
      },
      {
        "type": "paragraph",
        "subtitle": "`getElementsByTagName`",
        "text": "Brukes for å hente ALLE elementer med en bestemt HTML-tag (f.eks. `<p>`, `<h1>`, `<div>`) og lagrer det i en `array`. For eksempel kan du hente ut alle `li`-elementene, samme som forrige kode."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<ul>
  <li class="list-item">The Matrix</li>
  <li class="list-item">Star Wars</li>
  <li class="list-item">Harry Potter</li>
</ul><button id=\"myButton\">Endre farge</button>`,
        "script": `document.getElementById(\"myButton\").addEventListener(\"click\", function() {\n  let elements = document.getElementsByTagName(\"li\");\n  for (let i = 0; i < elements.length; i++) {\n    elements[i].style.fontSize = \"18px\";\n  }\n});`
      },
      {
        "type": "paragraph",
        "subtitle": "`querySelector` og `querySelectorAll`",
        "text": "`querySelector` henter det **første** elementet som matcher en CSS-selektor. `querySelectorAll` henter **alle** som matcher, som en liste."
      },

    {
      "type": "paragraph",
      "text": "Det betyr at du kan bruke **class** (`.klasse`), **id** (`#id`) eller mer avanserte CSS-selektorer som `div p`, `ul > li` eller `[type='text']` for å finne elementer, akkurat som i CSS."
    },

    {
  "type": "code",
  "language": "html",
  "preview": true,
  "code": "<ul>\n  <li class=\"list-item\">The Matrix</li>\n  <li class=\"list-item\">Star Wars</li>\n  <li class=\"list-item\">Harry Potter</li>\n</ul>\n<button id=\"styleBtn\">Legg til stil</button>",
  "script": "document.getElementById(\"styleBtn\").addEventListener(\"click\", function() {\n  // querySelector finner DET FØRSTE elementet som matcher\n  let first = document.querySelector(\".list-item\");\n  first.style.backgroundColor = \"yellow\";\n\n  // querySelectorAll finner ALLE elementer som matcher\n  let all = document.querySelectorAll(\".list-item\");\n  all.forEach(function(el){\n    el.style.border = \"2px solid red\";\n  });\n});"
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
        "text": "Bruk `element.style` for å endre ting som farge, bakgrunn eller størrelse direkte. Merk at CSS-egenskaper som er skrevet i snake-case (som `font-size`) er skrevet i camelCase i JavaScript (`fontSize`)."
      },
      {
        "type": "code",
        "language": "html",
        "preview": true,
        "code": `<div id=\"myElement\">Endre meg</div>\n<button id=\"styleChange\">Endre stil</button>`,
        "script": `document.getElementById(\"styleChange\").addEventListener(\"click\", function() {\n  let el = document.getElementById(\"myElement\");\n  el.style.color = \"green\";\n  el.style.backgroundColor = \"lightgrey\";\n});`
      },{
  "type": "paragraph",
  "subtitle": "Legge til og fjerne klasser med `classList`",
  "text": "`classList` lar deg legge til, fjerne eller veksle (toggle) mellom ferdige CSS-klasser. Dette er nyttig fordi du vanligvis definerer stilene i CSS – og lar JavaScript bare bestemme **når** klassene skal brukes."
},

{
  "type": "paragraph",
  "text": "De vanligste metodene er:\n\n- `add()` – legger til en klasse.\n- `remove()` – fjerner en klasse.\n- `toggle()` – veksler mellom å legge til og fjerne."
},

{
  "type": "paragraph",
  "subtitle": "`add()` – legge til en forhåndsdefinert klasse",
  "text": "Her har vi laget en CSS-klasse `.highlight` som gir gul bakgrunn. Når du trykker på knappen, legger JavaScript til denne klassen."
},
{
  "type": "code",
  "language": "html",
  "preview": true,
  "code": `<style>
  .highlight {
    background-color: gold;
    padding: 4px;
    border-radius: 4px;
  }
</style>

<div id="box">Jeg får ny stil!</div>
<button id="addClassBtn">Legg til klasse</button>`,
  "script": `document.getElementById("addClassBtn").addEventListener("click", function() {
  let box = document.getElementById("box");
  box.classList.add("highlight");
});`
},

{
  "type": "paragraph",
  "subtitle": "`remove()` – fjerne en klasse igjen",
  "text": "Dette eksemplet starter med klassen aktivert, men vi fjerner den når knappen trykkes."
},
{
  "type": "code",
  "language": "html",
  "preview": true,
  "code": `<style>
  .highlight {
    background-color: gold;
    padding: 4px;
    border-radius: 4px;
  }
</style>

<div id="box2" class="highlight">Jeg mister stilen</div>
<button id="removeClassBtn">Fjern klasse</button>`,
  "script": `document.getElementById("removeClassBtn").addEventListener("click", function() {
  let box = document.getElementById("box2");
  box.classList.remove("highlight");
});`
},

{
  "type": "paragraph",
  "subtitle": "`toggle()` – veksle mellom på og av",
  "text": "`toggle()` gjør begge deler: hvis klassen finnes, fjernes den – hvis den mangler, legges den til. Dette brukes ofte til å veksle mellom to tilstander, som \"aktiv\" eller \"åpen\"."
},
{
  "type": "code",
  "language": "html",
  "preview": true,
  "code": `<style>
  .highlight {
    background-color: gold;
    padding: 4px;
    border-radius: 4px;
  }
</style>

<div id="box3">Trykk på knappen for å veksle</div>
<button id="toggleHighlight">Veksle klasse</button>`,
  "script": `document.getElementById("toggleHighlight").addEventListener("click", function() {
  let element = document.getElementById("box3");
  element.classList.toggle("highlight");
});`
},

{
  "type": "paragraph",
  "text": "Ved å kombinere `classList` med forhåndsdefinerte CSS-klasser får du ryddig kode som holder design og logikk adskilt — slik det bør være."
}


    ]
  },

  {
  "id": "sectionCreateElement",
  "title": "3. Legge til elementer med JavaScript",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Så langt har vi endret eksisterende elementer i DOM-en. Men hva om vi vil **lage nye elementer** direkte i JavaScript? Da bruker vi `createElement()`."
    },
    {
      "type": "paragraph",
      "subtitle": "`createElement()` og `appendChild()`",
      "text": "`createElement()` lager et nytt HTML-element, mens `appendChild()` legger det inn i et eksisterende element i dokumentet. Det betyr at du kan dynamisk legge til nye elementer uten å skrive dem i HTML på forhånd."
    },
    {
      "type": "paragraph",
      "text": "I eksemplet under legger vi til to nye filmer i listen når du trykker på knappen:"
    },
    {
      "type": "code",
      "language": "html",
      "preview": true,
      "code": `<ul id="movieList">
  <li class="list-item">The Matrix</li>
  <li class="list-item">Star Wars</li>
  <li class="list-item">Harry Potter</li>
</ul>
<button id="addMoviesBtn">Legg til filmer</button>`,
      "script": `document.getElementById("addMoviesBtn").addEventListener("click", function() {
  // Hent listen fra DOM
  let list = document.getElementById("movieList");

  // Lag to nye elementer
  let newMovie1 = document.createElement("li");
  newMovie1.textContent = "Inception";

  let newMovie2 = document.createElement("li");
  newMovie2.textContent = "Interstellar";

  // Legg til elementene i listen
  list.appendChild(newMovie1);
  list.appendChild(newMovie2);
});`
    },
    {
      "type": "paragraph",
      "text": "Når du trykker på knappen, ser du at de nye filmene dukker opp nederst i listen. Dette er grunnleggende **DOM-manipulasjon**, og brukes overalt når man bygger dynamiske nettsider."
    },
    
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
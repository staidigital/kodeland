export default [
  {
    id: "sectionIntro",
    title: "Flere Selectors og Manipulering av CSS med JavaScript",
    blocks: [
      {
        type: "paragraph",
        text: "I JavaScript finnes det mange måter å hente ut elementer fra HTML-en. Vi kan bruke ulike selectors (velgere) for å få tak i elementene vi vil jobbe med, og deretter kan vi dynamisk endre stilene deres ved hjelp av JavaScript."
      }
    ]
  },
  {
    id: "sectionClassSelector",
    title: "1. Flere Selectors",
    blocks: [
      {
        type: "subtitle",
        text: "`getElementsByClassName`"
      },
      {
        type: "paragraph",
        text: "Denne metoden returnerer en samling av alle elementer som har en gitt klasse. Siden den returnerer en samling (HTMLCollection), må du bruke en løkke for å endre stil på hvert enkelt element."
      },
      {
        type: "code",
        language: "javascript",
        code: `let elements = document.getElementsByClassName("myClass");

for (let i = 0; i < elements.length; i++) {
  elements[i].style.color = "blue";
}`
      },
      {
        type: "subtitle",
        text: "`getElementsByTagName`"
      },
      {
        type: "paragraph",
        text: "Denne metoden returnerer en samling av alle elementer med et bestemt HTML-tag. For eksempel kan du velge alle `p`-elementene på en side."
      },
      {
        type: "code",
        language: "javascript",
        code: `let paragraphs = document.getElementsByTagName("p");

for (let i = 0; i < paragraphs.length; i++) {
  paragraphs[i].style.fontSize = "18px";
}`
      },
      {
        type: "subtitle",
        text: "`querySelector` og `querySelectorAll`"
      },
      {
        type: "paragraph",
        text: "`querySelector` returnerer det **første** elementet som samsvarer med en gitt CSS-selektor, mens `querySelectorAll` returnerer **alle** elementene som samsvarer med selektoren som en NodeList."
      },
      {
        type: "code",
        language: "javascript",
        code: `let element = document.querySelector(".myClass");
element.style.backgroundColor = "yellow";

let allElements = document.querySelectorAll(".myClass");

allElements.forEach(function(el) {
  el.style.border = "2px solid red";
});`
      }
    ]
  },
  {
    id: "sectionManipCSS",
    title: "2. Manipulering av CSS med JavaScript",
    blocks: [
      {
        type: "subtitle",
        text: "Endre CSS med `style`-egenskapen"
      },
      {
        type: "paragraph",
        text: "Vi kan bruke `style`-egenskapen i JavaScript til å direkte endre CSS-stiler på et element, som for eksempel farge, størrelse, marginer, eller bakgrunn."
      },
      {
        type: "code",
        language: "javascript",
        code: `let element = document.getElementById("myElement");
element.style.color = "green";
element.style.backgroundColor = "lightgrey";`
      },
      {
        type: "subtitle",
        text: "Legge til og fjerne klasser med `classList`"
      },
      {
        type: "paragraph",
        text: "`classList` lar deg legge til, fjerne eller toggle (veksle) mellom CSS-klasser på et element. Dette er spesielt nyttig hvis du har forhåndsdefinerte CSS-klasser du ønsker å aktivere eller deaktivere."
      },
      {
        type: "code",
        language: "javascript",
        code: `let element = document.getElementById("myElement");

element.classList.add("highlight");
element.classList.remove("highlight");
element.classList.toggle("highlight");`
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
        title: "Oppgave 1: Endre stil på flere elementer",
        description: "Bruk `getElementsByClassName` for å velge alle elementer med en bestemt klasse, og endre fargen på teksten deres."
      },
      {
        type: "task",
        number: 2,
        title: "Oppgave 2: Bruk `querySelectorAll` til å velge elementer",
        description: "Bruk `querySelectorAll` for å velge alle `div`-elementer, og legg til en rød kant rundt dem når en knapp trykkes."
      },
      {
        type: "task",
        number: 3,
        title: "Oppgave 3: Endre klasser med `classList`",
        description: "Bruk `classList` til å veksle en klasse som endrer bakgrunnsfargen på et element."
      },
      {
        type: "paragraph",
        text: "Disse oppgavene vil hjelpe deg å forstå hvordan du kan bruke forskjellige selectors for å hente ut elementer fra DOM, samt hvordan du kan endre stiler dynamisk ved hjelp av JavaScript."
      }
    ]
  }
];

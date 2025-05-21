export default [
  {
    id: "sectionIntro",
    title: "Introduksjon til DOM og getElementById i JavaScript",
    blocks: [
      {
        type: "paragraph",
        text: "DOM står for Document Object Model og er en måte for å \"se\" og \"interagere\" med HTML-dokumentet. Med DOM får du muligheten til å endre ting på nettsiden dynamisk, som å endre tekst, farger, legge til eller fjerne elementer."
      },
      {
        type: "paragraph",
        text: "Når nettleseren laster en nettside, lager den et DOM-tre basert på HTML-en. Hvert element på nettsiden (som div, p, h1) blir en \"node\" i dette treet, som JavaScript kan endre."
      }
    ]
  },
  {
    id: "sectionExampleHTML",
    title: "Eksempel på enkel HTML",
    blocks: [
      {
        type: "code",
        language: "html",
        code: `\<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOM Interaksjon</title>
</head>
<body>
  <h1 id="header">Hei, verden!</h1>
  <p id="description">Dette er et eksempel på DOM-manipulering.</p>
  <button id="changeTextButton">Endre tekst</button>
</body>
</html>`,
        script: `let button = document.getElementById("changeTextButton");
let description = document.getElementById("description");

button.addEventListener("click", function() {
  description.textContent = "Teksten har blitt endret!";
});`
      },
      {
        type: "paragraph",
        text: "I dette eksempelet har vi en overskrift (h1), et avsnitt (p), og en knapp (button)."
      }
    ]
  },
  {
    id: "sectionGetElementById",
    title: "Hva gjør getElementById",
    blocks: [
      {
        type: "paragraph",
        text: "Metoden getElementById lar oss få tak i et bestemt HTML-element ved å bruke dets id-attributt. Når vi har fått tak i elementet, kan vi gjøre hva vi vil med det, som å endre tekst, farger eller andre stiler."
      },
      {
        type: "code",
        language: "javascript",
        code: `let header = document.getElementById("header");
console.log(header.textContent);`
      },
      {
        type: "paragraph",
        text: "Her får vi tak i overskriften (h1) ved hjelp av getElementById og skriver ut teksten som er inni overskriften."
      }
    ]
  },
  {
    id: "sectionChangeText",
    title: "Endre innhold med JavaScript",
    blocks: [
      {
        type: "code",
        language: "javascript",
        code: `header.textContent = "Velkommen til DOM-manipulering!";`
      },
      {
        type: "paragraph",
        text: "Dette vil endre teksten fra \"Hei, verden!\" til \"Velkommen til DOM-manipulering!\"."
      }
    ]
  },
  {
    id: "sectionInteraksjon",
    title: "Interaksjon med knapper",
    blocks: [
      {
        type: "paragraph",
        text: "Vi kan også bruke DOM for å gjøre nettsiden mer interaktiv. For eksempel kan vi endre tekst når en knapp trykkes."
      },
      {
        type: "code",
        language: "javascript",
        code: `let button = document.getElementById("changeTextButton");
let description = document.getElementById("description");

button.addEventListener("click", function() {
  description.textContent = "Teksten har blitt endret!";
});`
      },
      {
        type: "paragraph",
        text: "I dette eksempelet legger vi til en click-hendelse på knappen. Når knappen trykkes, endrer vi teksten i avsnittet."
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
        title: "Oppgave 1: Endre overskrift med knappetrykk",
        description: "Lag et HTML-dokument med en overskrift (h1) og en knapp. Bruk JavaScript til å endre teksten i overskriften når knappen klikkes."
      },
      {
        type: "task",
        number: 2,
        title: "Oppgave 2: Endre farge på et element",
        description: "Legg til et element med tekst og bruk JavaScript til å endre fargen på teksten når en knapp trykkes."
      },
      {
        type: "paragraph",
        text: "Disse oppgavene gir deg grunnleggende innsikt i hvordan du kan manipulere DOM og bruke getElementById for å interagere med nettsiden."
      }
    ]
  }
];

export default [
  {
    id: "sectionIntro",
    title: "Introduksjon til Mouse Events og Musekoordinater i JavaScript",
    blocks: [
      {
        type: "paragraph",
        text: "I JavaScript kan vi bruke ulike mouse events for å interagere med nettsider på en dynamisk måte. Vanlige hendelser som kan fanges opp er når brukeren klikker, holder musen over et element, eller beveger musen. I tillegg kan vi hente musekoordinatene for å lage mer interaktivt innhold."
      }
    ]
  },
  {
    id: "sectionMouseEvents",
    title: "1. Mouse Events",
    blocks: [
      {
        type: "quote",
        text: "En mouse event er en hendelse som skjer når brukeren gjør noe med musen, som å klikke eller bevege den over et element."
      },
      {
        type: "subtitle",
        text: "`click`-hendelsen"
      },
      {
        type: "code",
        language: "javascript",
        code: `let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    console.log("Knappen ble klikket!");
});`
      },
      {
        type: "paragraph",
        text: "Når brukeren klikker på knappen (`myButton`), skrives \"Knappen ble klikket!\" i konsollen."
      },
      {
        type: "subtitle",
        text: "`mouseover` og `mouseout`"
      },
      {
        type: "code",
        language: "javascript",
        code: `let box = document.getElementById("myBox");

box.addEventListener("mouseover", function() {
    box.style.backgroundColor = "lightblue";
});

box.addEventListener("mouseout", function() {
    box.style.backgroundColor = "white";
});`
      },
      {
        type: "paragraph",
        text: "`mouseover`: Når musen er over elementet, endres bakgrunnsfargen til lys blå. `mouseout`: Når musen forlater elementet, settes bakgrunnsfargen tilbake til hvit."
      }
    ]
  },
  {
    id: "sectionCoordinates",
    title: "2. Musekoordinater",
    blocks: [
      {
        type: "paragraph",
        text: "Når musen beveger seg over nettsiden, kan vi hente posisjonen til musen med `clientX` og `clientY`. Disse gir deg x- og y-posisjonene til musepekeren i forhold til nettsidens synlige område."
      },
      {
        type: "code",
        language: "javascript",
        code: `document.addEventListener("mousemove", function(event) {
    console.log("X-koordinat: " + event.clientX + ", Y-koordinat: " + event.clientY);
});`
      }
    ]
  },
  {
    id: "sectionCombine",
    title: "3. Kombinere musehendelser og musekoordinater",
    blocks: [
      {
        type: "paragraph",
        text: "Her er et eksempel der vi viser musekoordinatene i sanntid mens brukeren beveger musen over et element."
      },
      {
        type: "code",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mouse Events</title>
    <style>
        #mouseArea {
            width: 300px;
            height: 300px;
            background-color: lightgray;
            text-align: center;
            line-height: 300px;
        }
    </style>
</head>
<body>
    <div id="mouseArea">Flytt musen her</div>
    <p id="coordinates">X: 0, Y: 0</p>

    <script>
        let mouseArea = document.getElementById("mouseArea");
        let coordinates = document.getElementById("coordinates");

        mouseArea.addEventListener("mousemove", function(event) {
            let x = event.clientX;
            let y = event.clientY;
            coordinates.textContent = "X: " + x + ", Y: " + y;
        });
    </script>
</body>
</html>`
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
        title: "Oppgave 1: Vis musekoordinater",
        description: "Lag en nettside der du viser musekoordinatene når brukeren beveger musen over hele vinduet."
      },
      {
        type: "task",
        number: 2,
        title: "Oppgave 2: Endre farge ved museklikk",
        description: "Lag en nettside med et område (`div`) der bakgrunnsfargen endres hver gang brukeren klikker på området."
      },
      {
        type: "paragraph",
        text: "Disse oppgavene gir deg grunnleggende forståelse for hvordan du kan bruke mouse events og musekoordinater i JavaScript for å skape interaktivitet på nettsiden din."
      }
    ]
  }
];

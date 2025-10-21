export default [
  {
    id: "sectionZero",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Lag en ny mappe på et fornuftig sted og gi den navnet **javascript-kurs**. Åpne mappen i *=VS Code=* ved å klikke på *=File → Open Folder=*. Dette er mappen hvor du skal lagre all kode du skriver i løpet av kurset."
      },
      {
        type: "paragraph",
        text: "Siste økten i kurset skal du forklare to av oppgavene du er mest fornøyd med at du har kodet muntlig til læreren din."
      }
    ]
  },

  {
    id:"sectionOne",
    title:"Hva er JavaScript og hvordan fungerer det med HTML/CSS?",
    blocks: [
      {
        type: "paragraph",
        text: "*=HTML=* og *=CSS=* er ^^markeringsspråk^^ som brukes for å strukturere og style nettsider. *=JavaScript=* går forbi det, og gir oss mulighet til å utnytte brukerinput, animere elementer og til og med bygge store web-apper."
      },
      {
        type: "paragraph",
        text: "Her er et eksempel på samarbeidet mellom HTML, CSS og JavaScript:"
      },
//       {
//         type: "sandbox",
//         html: `<h1 id="title">Klikk knappen!</h1>
// <button id="button">Trykk meg</button>`,
//         js: `const btn = document.getElementById("button");
// const title = document.getElementById("title");
// btn.addEventListener("click", () => {
//   title.textContent = "Du trykket på knappen!";
//   title.style.color = "tomato";
// });`
//       },
      {
        type: "code",
        language: "html",
        preview: false,
        code:`<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: green;
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <button onclick="alert('Button clicked!')">Click me</button>
</body>
</html>`
      },
      
      {
        type: "paragraph",
        text: "HTML definerer innholdet, `h1`, `button`. CSS styler `h1` grønn. Javascript brukes for å lage en `alert`-melding som dukker opp når knappen trykkes."
      },
        {
        type: "paragraph",
        text: "La oss se på hvordan vi kan skrive og kjøre JavaScript-kode."
      },
    ]
  },
  {
    id: "sectionTwo",
    title: "1. JavaScript koblet til HTML-filer",
    blocks: [
      {
        type: "paragraph",
        text: "Lag en fil som heter `index.html`. Legg inn følgende i filen:"
      },
      {
        type: "code",
        language: "html",
        preview: false,
        code:`<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Mitt første JS-program</title>
  </head>
  <body>
    <script>
      console.log("Hello World!");
    </script>
  </body>
</html>`
      },
      {
        type: "paragraph",
        text: "Bruk *=Go Live=* for å åpne HTML-filen i nettleseren din. Høyreklikk på siden og velg *=Inspect=* for å åpne *=Developer Tools=*, velg *=Console=*-taben (i Chrome kan du bruke snarveien *=cmd + option + i=*)."
      },
      {
        type: "paragraph",
        text: "Som du ser, kan man skrive JavaScript-kode inne i en `<script>...</script>`-tag direkte i HTML-filen. Men det ryddigste er å lage en egen JavaScript-fil (`main.js`) i samme mappe som HTML-filen, og lenke til den i HTML-filen."
      },

      
      {
        type: "code",
        language: "html",
        preview: false,
        code: `<script src="main.js"></script>`
      },

      {
        type: "paragraph",
        text: "Hvor skal du plassere lenken? Siden nettleseren leser HTML-filen fra topp til bunn, er det lurt å legge lenken nederst i `<body>...</body>`-tagen. Da vil først strukturen og stylingen til nettsiden bli lastet inn, før de interaktive funksjonene til JavaScript."
      },
      {
        type: "code",
        language: "html",
        preview: false,
        code:`<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: green;
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <script src="main.js"></script>
</body>
</html>`
      },
      
      {
        type: "paragraph",
        text: "Skriv koden nedenfor i `main.js`-filen og gå inn i konsollen. Her ser du også at med `//` kan man skrive kommentarer i koden, altså kode som ikke blir kjørt. "
      },


      {
        type: 'code',
        language: 'javascript',
        code: `// Mitt første program
console.log("Hello World!");`,
        preview: false,
        interactive: false
      },
      {
        type: "paragraph",
        text: "Nå har du det du trenger for å skrive og kjøre JavaScript-kode. Se bildet nedenfor som inkluderer oppsettet av VSCode og konsollen med JavaScript-output."
      },
      {
        type: "image",
        component: 'BlockImage',
        props: {
          images: [
            {
              src: '/images/js/vscode_setup_js.png',
              alt: 'VSC_setup',
              caption: 'Oppsett av Visual Studio Code med JavaScript-kode.',
              fullWidth: true,
              align: "center",
              rounded: true,
              shadow: true,
            },
          ]
        }
      },
     {
      type: "paragraph",
      text: "Da er alt klart for å skrive JavaScript-kode som kjøres i nettleseren! Nedenfor er det skrevet en guide om hvordan kjøre kode gjennom noe som heter *=Node.js=*. Det er valgfritt å lære hvordan man bruker. Dersom du vil gå rett på å lære javascript, trykk på denne lenken [Variabler – del 1](/javascript/part1)."
    }

    ]
  },
  { 
    id: "sectionThree",
    title: "2. JavaScript med Node.js (ikke nødvendig, men trykk her for de som er interessert)",
    collapsible: "true",
    blocks: [
      {
        type: "paragraph",
        text: "*=Node.js=* er et populært program som lar deg kjøre JavaScript rett fra ^^terminalen^^, uten å bruke en nettleser. Dette brukes mye i profesjonell utvikling – både til små skript og store apper."
      },
      {
        type: "paragraph",
        text: "1. Last ned [Node.js fra denne lenken](https://nodejs.org/en/download/package-manager). På den siden finner du flere versjoner – last ned *=LTS-versjonen=* (Long-Term Support), siden den er mer stabil og vedlikeholdes lenger."
      },
      {
        type: "paragraph",
        text: "2. Etter installasjonen: Åpne ^^terminalen^^ og skriv `node -v` for å sjekke at det fungerer. Du skal få opp en versjon, noe som viser at Node.js er installert riktig:"
      },
      {
        type: "image",
        component: 'BlockImage',
        props: {
          images: [
            {
              src: '/images/js/node_terminal_setup.png',
              alt: 'VSC_setup',
              caption: 'Ved å bruke terminalen kan vi sjekke at Node.js er installert.',
              fullWidth: false,
              width: "60%",
              align: "center",
              rounded: true,
              shadow: true
            },
          ]
        }
      },
      {
        type: "paragraph",
        text: "3. Åpne Visual Studio Code og lag en ny fil kalt `main.js`. Skriv inn noe enkel JavaScript-kode, for eksempel:"
      },
      { 
        type: "code", 
        language: "javascript", 
        code: 'console.log("Hei fra Node!");',
        preview: false,
        interactive: false
      },
      {
        type: "paragraph",
        text: "4. Åpne terminalen i Visual Studio Code ved å klikke *=Terminal → New Terminal=*"
      },
      {
        type: "paragraph",
        text: "5. I terminalen skriver du `node main.js` og trykker `Enter`. Da skal du se utskriften fra koden."
      },
      {
        type: "image",
        component: 'BlockImage',
        props: {
          images: [
            {
              src: '/images/js/node_vscode_run.png',
              alt: 'VSC_setup',
              caption: 'Vi kan kjøre JavaScript med Node direkte i VS Code.',
              fullWidth: true,
              align: "center",
              rounded: true,
              shadow: true
            },
          ]
        }
      },
      {
        type: "paragraph",
        text: "I dette kurset kommer vi først og fremst til å bruke JavaScript i HTML-filer, siden det er enklest å komme i gang med. Men det er nyttig å vite at det finnes flere veier videre!"
      }
    ]
  }
];

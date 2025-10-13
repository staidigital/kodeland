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
    id: "sectionOne",
    title: "1. JavaScript koblet til HTML-filer",
    blocks: [
      {
        type: "paragraph",
        text: "Den vanligste måten å kjøre JavaScript-kode på er å knytte den til en HTML-fil med en `<script>`-tag. Da kan nettleseren din kjøre JavaScript-koden når siden åpnes."
      },
      {
        type: "code",
        language: "html",
        preview: false,
        code: `<!-- index.html -->
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
        text: "Som du ser, kan man skrive JavaScript direkte inne i en `<script>...</script>`-tag. Men det ryddigste er å lage en egen JavaScript-fil og lenke den til HTML-filen – akkurat som vi gjør med CSS."
      },
      {
        type: "paragraph",
        text: "Skriv i JavaScript-filen din:"
      },


      {
        type: 'code',
        language: 'javascript',
        code: 'console.log("Hello World!");',
        preview: false,
        interactive: false
      },
      {
        type: "paragraph",
        text: "For å koble JavaScript-filen til HTML-filen, skriver du `src=\"main.js\"` inne i `<script>`-taggen:"
      },
      {
        type: "code",
        language: "html",
        preview: false,
        code: `<!-- index.html -->
<script src="main.js"></script>`
      },
      {
        type: "paragraph",
        text: "I *=VS Code=* vil dette se slik ut:"
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
    id: "sectionNode",
    title: "2. JavaScript i terminalen med Node.js",
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
        text: "4. Åpne terminalen i Visual Studio Code ved å klikke _Terminal → New Terminal_."
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

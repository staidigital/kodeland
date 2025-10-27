// section1.js

export default [
  
  {
    id: "sectionOne",
    title: "",
    blocks: [
      {
        type:'paragraph',
        text:'De mest grunnleggende konseptene i JavaScript er ^^variabler^^ og ^^datatyper^^. I denne seksjonen ser vi på hva en variabel er og hvorfor vi trenger dem. Den neste seksjonen introduserer de $$5$$ mest kjente datatypene til JavaScript.'
      },
      {
        type: 'extraInfo',
        icon: 'note',
        content: [
          { type: 'text', value: 'Konseptene om datatyper og variabler er de samme i alle programmeringsspråk, uansett om du bruker *=Python=*, *=Java=*, *=C++=*, *=Swift=* eller andre språk.' },
          { type: 'images', value: [
              { src: '/images/js/lang/python-logo.png', alt: 'Python' },
              { src: '/images/js/lang/java.png', alt: 'Java' },
              { src: '/images/js/lang/clang.png', alt: 'C++' },
              { src: '/images/js/lang/swift.png', alt: 'Swift' },
            ]
          },
          { type: 'text', value: 'Bare ^^syntaxen^^ er forskjellig! Altså hvordan man skriver ting. Så ved å lære et språk vil du enklere lære andre også!' },
        ]
      },
      ]
    },

  // 🔹 LET
  {
    id: "sectionOne",
    title: "",
    blocks: [
      {
        type:'paragraph',
        text:'Gå inn i `main.js`-filen din og endre koden slik at det står:'
      },
          {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let melding = "Hello World!"; // Variabel
console.log(melding);`
      },
      {
        type:'paragraph',
        text:'I konsollen skal du nå få samme melding som når du skrev `console.log("Hello World!")` i Setup-seksjonen. Det er fordi meldingen skrevet i koden ovenfor er en ^^variabel^^.'
      },
      {
        type:'paragraph',
        text:'En variabel er en måte å lagre data slik at du kan bruke det videre i programmet på en effektiv måte.'
      },

        {
        type:'paragraph',
        text:'For å lage en variabel skriver du kodeordet `let` og deretter variabelnavnet. Deretter tildeler du en ^^verdi^^ til variabelen med tildelingsoperatoren `=`.'
      },
      {
        type:'paragraph',
        text:'Du kan senere i programmet endre variablens verdi ved å ^^re-assigne^^ en ny verdi:'
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let melding = "Hello World!" //tildeler verdi
console.log(melding)
melding = "Fint vær" //re-assigner verdien
console.log(melding)`
      },
       {
        type:'paragraph',
        text:'Variabler brukes til å referere til data slik at du kan bruke samme data flere ganger i programmet ditt.'
      },
      {
        type:'paragraph',
        text:'Du kan med `console.log()` skrive ut både en string og en variabel:'
      },
      {
        type: "extraInfo",
        icon: "example",
        content: [
          {
            type: "text",
            value:
              "Se for deg at du endrer navnet ditt på Facebook. Da må navnet ditt endres alle steder hvor det befinner seg: på profilsiden din, i vennelisten til vennene dine, på innlegg du har skrevet, på kommentarer du har skrevet etc. Uten variabler måtte Facebook manuelt funnet stedene navnet er skrevet og endret det, noe som er tungvint. Isteden kan man lage en navnvariabel som refereres i resten av programmet, og kan enkelt endres"
          }
        ]
      },
    ]
  },

  // NAVNGIVNING
  {
    id: "sectionFour",
    title: "Navn til variabler",
    blocks: [
      {
        type:'paragraph',
        text: 'Du gir variabler navn, og det bør være en logisk sammenheng med variabelnavnet og verdiene den har. Ellers fins det noen viktige navn-regler man må følge for å ikke få errorer i JavaScript:'
      },
      {
        type:'paragraph',
        text: '1) Variabler kan bare inneholde bokstaver, tall og understreker. Så du kan gi navnene `melding`, `melding_1` og `melding_2`'
      },
      {
        type:'paragraph',
        text: '2) Første tegnet i variabelnavnet kan ikke være et tall. `melding_1` fungerer, `1_melding` fungerer ikke.`'
      },
      {
        type:'paragraph',
        text: '3) Du kan ikke bruke reserverte kodeord, slik som `if` fordi de allerede brukes av JavaScript til å gjøre visse ting.'
      },
      {
        type:'paragraph',
        text: '4) Variabelnavn er ^^case-sensitive^^ som betyr at `Message`, `MESSAGE` og `message` kan bli brukt til tre forskjellige variabler. Men det så klart lurt å unngå like navn siden det kan forvirre.'
      },
      {
        type:'paragraph',
        text: '5) Noen ganger trenger du mer enn et ord for å deklarere et variabelnavn. Da bruker man `camelCase`-konvensjon. Camel case bruker en stor bokstav for første bokstav for etterfølgende ord. For eksempel'
      },
      {
        type:'code',
        language:'javascript',
        interactive: false,
        code: `let myAwesomeVariable`
      },
      {
        type:'paragraph',
        text: 'Generelt: '
      },
      {
        type:'code',
        language:'javascript',
        interactive: false,
        code: `let navn = "Jens"
console.log(navn)

// Skal være beskrivende
// Kan ikke starte med et tall (1name)
// Kan ikke ha noe mellomrom eller bindestrek (-)
// Kan ikke være et reservert kodeord 
// Case-sensitive
// Bruk camelCase`
      },
    ]
  },
  // 🔹 CONST
  {
    id: "sectionThree",
    title: "Konstante variabler",
    blocks: [
      {
        type:'paragraph',
        text: 'I større applikasjoner er det ofte viktig at variabler forblir uendret under kjøringen av koden, for å forhindre bugs.'
      },
      {
        type:'paragraph',
        text: 'En konstant variabel er en variabel som ikke endrer sin verdi så lenge koden kjører. Vi bruker `const`-kodeordet for å lage en konstant variabel. Følgende viser hvordan lage to konstanter i JavaScript:'
      },

      {
        type:'code',
        language:'javascript',
        interactive: false,
        code: `const FILE_SIZE_LIMIT = 2000
const MAX_SPEED = 300`
      },
       {
        type:'paragraph',
        text: 'Som du ser bruker vi bare store bokstaver når vi gir navn til en konstant. Det er for å gjøre konstanter mer tydelige i koden.'
      },
    ]
  },

  // 📝 TASKS
{
  id: "sectionTasks",
  title: 'Programmeringsoppgaver om variabler',
  blocks: [
    // Oppgavene
    {
      type: "paragraph",
      text: 'Usikker på hvordan du bør skrive og lagre din egen JavaScript-kode? Trykk på [denne lenken](/javascript/part0/) for å lære hvordan du kobler en `js`-fil til en `html`-fil.'
    },
    {
      type: 'task',
      number: 1,
      title: "Enkel variabelbruk",
      description: "Lag en variabel som inneholder strengen «Hello World!» og skriv den ut til konsollen."
    },
    {
      type: 'task',
      number: 2,
      title: "Enkel variabelbruk",
      description: "Skriv et program som definerer tre variabler: `firstName`, `lastName` og `age`. Gi dem verdier og skriv dem ut i konsollen."
    },

    {
      type: 'task',
      number: 3,
      title: "Endre variabler",
      description: "Lag en variabel `favoriteColor` med `let`. Gi den en verdi og skriv den ut. Endre så verdien av variabelen og skriv ut den nye verdien."
    },
    {
      type: 'task',
      number: 3,
      title: "Bruk av const",
      description: "Definer en konstant `PI` med verdien `3.14`. Prøv å endre verdien (spoiler: det vil ikke fungere!). Hva skjer?"
    },

    {
      type: 'task',
      number: 4,
      title: "Gjør enkel matte med variabler",
      description: "Lag to variabler, `num1` og `num2`, og gjør noen enkle berekninger med dem. Skriv ut summen, differansen, produktet og kvotienten i konsollen."
    },
    
  ]
}

];

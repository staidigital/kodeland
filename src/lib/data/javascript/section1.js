// section1.js

export default [


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
        code: `let melding = "Hello World!";
console.log(melding);`
      },
      {
        type:'paragraph',
        text:'I konsollen skal du nå få samme melding som når du skrev `console.log("Hello World!")` tidligere. Det er fordi meldingen skrevet i koden ovenfor er en ^^variabel^^.'
      },
      {
        type:'paragraph',
        text:'En variabel er rett og slett et navn som du gir en verdi, slik at du kan bruke verdien senere. Du kan tenke på en variabel som en etikett du fester på en bestemt verdi, slik at du kan henvise til verdien ved å bruke etiketten. '
      },
        {
        type:'paragraph',
        text:'For å deklarere en variabel skriver du kodeordet `let` og deretter variabelnavnet.'
      },
      {
        type:'paragraph',
        text:'Den første linjen sier til JavaScript at `melding` skal assosieres med verdien `Hello World!`'
      },

      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `let melding = "Hello World!"`
      },
       {
        type:'paragraph',
        text:'Den andre linjen gir JavaScript instruksjonen å skrive ut verdien til `melding` og det er akkurat det den gjør.'
      },
      {
        type:'paragraph',
        text:'Du kan endre på verdien til variabelen ved å ^^re-assigne^^ en annen verdien på denne måten:'
      },
      {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `melding = "Hello World!"
console.log(melding)
melding = "Fint vær"
console.log(melding)`
      },
       {
        type:'paragraph',
        text:'Variabler brukes til å referere til data slik at du kan bruke samme data flere ganger i programmet ditt.'
      }
    ]
  },

  // NAVNGIVNING
  {
    id: "sectionFour",
    title: "Navn til variabler",
    blocks: [
      {
        type:'paragraph',
        text: 'JavaScript har noen navn-regler du må kunne for å unngå navngivnings-feil.'
      },
      {
        type:'paragraph',
        text: 'Variabler kan bare inneholde alfabet-bokstaver, tall og understreker. Så du kan gi navnene `melding`, `melding_1` og `melding_2`'
      },
      {
        type:'paragraph',
        text: 'Første tegnet i variabelnavnet kan ikke være et tall. `melding_1` fungerer, `1_melding` fungerer ikke.`'
      },
      {
        type:'paragraph',
        text: 'Du kan ikke bruke reserverte kodeord, slik som `console` fordi de brukes av JavaScript til å gjøre visse ting. Det fins mange slike kodeord, slik som `if`, `for` og `while` som du skal lære senere.'
      },
      {
        type:'paragraph',
        text: 'Variabelnavn er ^^case-sensitive^^ som betyr at `Message`, `MESSAGE` og `message` kan bli brukt til tre forskjellige variabler. Men det så klart lurt å unngå like navn siden det kan forvirre.'
      },
      {
        type:'paragraph',
        text: 'Noen ganger trenger du mer enn et ord for å deklarere et variabelnavn. Det fins to navn-konvensjoner man kan følge: '
      },
      {
        type:"list",
        items: [
          '`camelCase`',
          '`snake_case`',
        ]
      },
         {
        type:'paragraph',
        text: 'Camel case bruker en stor bokstav for første bokstav for etterfølgende ord. For eksempel'
      },
      {
        type:'code',
        language:'javascript',
        interactive: false,
        code: `let myAwesomeVariable`
      },
      {
        type:'paragraph',
        text: 'Snake case bruker en understrek til å separere ordene'
      },
      {
        type:'code',
        language:'javascript',
        interactive: false,
        code: `let my_awesome_variable`
      },
       {
        type:'paragraph',
        text: 'Begge fungerer, men husk å hold deg til kun én av dem for å ikke forvirre.'
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
        text: 'Noen ganger må man lagre verdier som ikke skal endres i variabler.'
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

  // 🔹 Oppsummering
  {
    id: "Oppsummering",
    title: "Enkelt sagt",
    blocks: [
      {
        type:'list',
        items: [
          'Generelt er det lurt å bruke `const` fra starten. Når du finner ut at du må endre koden bruk `let`.',
          'Bruk `let` når du vet at verdien skal endres.',
          'Følge navngivningskonvensjonene for variabler. Bruk gode variabelnavn! ',
        ]
      }
    ]
  },
  // 📝 TASKS
{
  id: "sectionTasks",
  title: 'Programmeringsoppgaver – gjør dem i Visual Studio Code!',
  blocks: [
    {
      type: 'paragraph',
      text: 'Usikker på hvordan du helst bør skrive og lagre din egen javascript kode? Trykk på [denne lenken](/javascript/part0/) for å se hvordan knytte en `js`-fil til en `HTML`-fil.'
    },
    // Oppgavene
    {
      type: 'task',
      number: 1,
      title: "Enkel variabelbruk",
      description: "Skriv et program som definerer tre variabler: `firstName`, `lastName` og `age`. Gi dem verdier og skriv dem ut i konsollen."
    },
    {
      type: 'task',
      number: 2,
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
    {
      type: 'paragraph',
      text: 'Variabler er en megaviktig del av programmering! Vi skal snart se hvordan bruke det i programmering, men først må vi lære om datatyper !'
    }
  ]
}

];

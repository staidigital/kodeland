export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Her får du tre bonusoppgaver å velge mellom. Alle er på omtrent samme vanskelighetsnivå, og lar deg øve på å manipulere DOM, bruke funksjoner og håndtere brukerinput. Du kan velge én eller prøve deg på alle!"
      }
    ]
  },
  {
    id: "sectionTodo",
    title: "Oppgave 1: Todo-liste",
    blocks: [
      {
        type: "paragraph",
        text: "Lag en enkel todo-liste der brukeren kan legge til, fjerne og merke oppgaver som fullført."
      },
      {
        type: "list",
        items: [
          "Skriv en oppgave i et tekstfelt og legg den til med en knapp.",
          "Vis oppgaver i en liste, og la brukeren markere dem som fullført.",
          "Lag en knapp for å slette en oppgave.",
          "Bruk `localStorage` for å lagre oppgavene slik at de bevares ved sideoppdatering."
        ]
      },
      {
        type: "paragraph",
        text: "**Tips:** Bruk `addEventListener` for å håndtere klikk på knapper. Sørg for å bruke funksjoner for å holde koden ryddig og lett å forstå."
      }
    ]
  },
  {
    id: "sectionDice",
    title: "Oppgave 2: Terningsimulator",
    blocks: [
      {
        type: "paragraph",
        text: "Lag en applikasjon der brukeren kan kaste en terning med valgfritt antall sider (f.eks. 4, 6, 10)."
      },
      {
        type: "list",
        items: [
          "Brukeren skal kunne velge hvor mange sider terningen har (4, 6, 8, 10, 12, 20).",
          "Brukeren skal kunne klikke på en \"Kast terning\"-knapp for å simulere et kast, og resultatet skal vises under knappen.",
          "Hver gang brukeren kaster terningen, skal resultatet legges til i en liste med alle tidligere kast.",
          "Legg til en knapp for å slette alle kast og starte på nytt."
        ]
      },
      {
        type: "paragraph",
        text: "**Tips:** Bruk `Math.random()` for å generere et tilfeldig tall. Sørg for at brukeren kan velge antall sider på terningen før de kaster den."
      }
    ]
  },
  {
    id: "sectionCalculator",
    title: "Oppgave 3: Enkel kalkulator",
    blocks: [
      {
        type: "paragraph",
        text: "Lag en kalkulator der brukeren kan skrive inn to tall og velge en regneoperasjon (f.eks. +, −, ×, ÷)."
      },
      {
        type: "list",
        items: [
          "To input-felt for tall.",
          "En dropdown-meny for å velge operasjon.",
          "En knapp som beregner og viser resultatet.",
          "En knapp som nullstiller skjema og resultat."
        ]
      },
      {
        type: "paragraph",
        text: "**Tips:** Bruk `parseInt()` eller `parseFloat()` for å konvertere input-feltene til tall. Lag en funksjon for hver operasjon for å gjøre koden din mer oversiktlig."
      }
    ]
  },
  {
    id: "sectionOutro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Disse oppgavene gir deg god trening i JavaScript, inkludert DOM-manipulering, `localStorage`, hendelser og strukturert kode. Hvilken vil du begynne med?"
      }
    ]
  },
];

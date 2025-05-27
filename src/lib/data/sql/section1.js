export default [
  // 🔹 Intro

  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: 'paragraph',
        text: 'Velkommen til kurset i **SQL** – språket som brukes for å jobbe med data i databaser! I dette kurset skal du arbeide med en serie av leksjoner og oppgaver designet for å effektivt lære SQL i nettleseren.'
      },
    ]
  },
  // 🔹 Hva er SQL
  {
    id: "sectionOne",
    title: "Hva er SQL",
    blocks: [
      {
        type: 'paragraph', 
        text: 'SQL, eller Structured Query Languages, er et språk designet for å hente ut, manipulere og endre på data fra en **relasjonell database**. SQL er en trygg og skalerbar måte å lagre data, og brukes av millioner av nettsider og apper i verden.' 
      },
      {
        type: 'paragraph', 
        text: 'Kjente SQL-databaser inkluderer SQL-lite, MySQL, PostGres, Oracle, Microsoft SQL, som alle støtter SQL-standarden som du skal lære i dette kurset.' 
      },
    ]
  },
  {
    id: "SectionTwo",
    title: "Relasjonell database",
    blocks: [
      {
        type: 'paragraph',
        text: 'En **relasjonell database** består av tabeller, omtrent som en Excel-tabell, hvor hver kolonne er en egenskap for dataen og hver rad er en datapost. Databaser kan inneholde én tabell eller flere relaterte tabeller avhengig av bruksområdet til dataen.'
      },
    ]
  },
  {
    id: "SectionTwo",
    title: "`Pokemon`-databasen",
    blocks: [
      {
        type: 'paragraph',
        text: 'I dette kurset skal vi undersøke databaser og SQL først og fremst gjennom en `Pokemon`-database. Tabellen nedenfor er et utklipp som inkluderer de 8 første datapostene av en større tabell:'
      },
      {
        type: 'custom',
        component: 'PokemonTablePreview'
      },

      {
        type: 'paragraph',
        text: 'Som du ser inneholder denne tabellen fire kolonner: `id`, `pokedex_number`, `name`, `type` og `hp` (Health Points). Hver rad representerer én Pokemon-art og dets tilhørende data.'
      },
      {
        type: 'paragraph',
        text: 'Ved å lære SQL skal man kunne enkelt svare på spørsmål som: Hvilke Pokémon har mer enn 50 HP? Hvor mange Pokémon er av typen "Fire"? Hvordan sortere etter styrke?'
      },
  ]},
  {
    id: "sectionThree",
    title: "Teorioppgaver – hva er SQL og databaser?",
    blocks: [
      {
        type: 'paragraph',
        text: 'La oss teste noen grunnleggende begreper før vi begynner å skrive SQL. Svar på spørsmålene under.'
      },

      {
        type: 'task',
        number: 1,
        title: 'Hva er en `relasjonell database`?',
        description: 'Klikk på det riktige svaret:',
        solution: {
          correct: 1,
          options: [
            'Den kan bare lagre tekst',
            'Den består av relaterte tabeller',
            'Den lagrer bilder av relasjoner',
            'Den brukes til å tegne relasjonsdiagrammer'
          ]
        }
      },

      {
        type: 'task',
        number: 2,
        title: 'Hva brukes `SQL` til?',
        description: 'Klikk på det riktige svaret:',
        solution: {
          correct: 1,
          options: [
            'Å lage nettsider med HTML',
            'Å hente og manipulere data i databaser',
            'Å tegne datamodeller',
            'Å installere apper'
          ]
        }
      },

      {
        type: 'task',
        number: 3,
        title: 'Hva er en `tabell` i databaser?',
        description: 'Klikk på det riktige svaret:',
        solution: {
          correct: 2,
          options: [
            'En tegning av data',
            'En gruppe av relasjoner',
            'En struktur med rader og kolonner',
            'Et bilde av en database'
          ]
        }
      },

      {
        type: 'task',
        number: 4,
        title: 'Hva slags data finner du i `pokemon`-tabellen?',
        description: 'Klikk på det riktige svaret:',
        solution: {
          correct: 1,
          options: [
            'Navn, type, og antall utviklinger',
            'Navn, type, og HP',
            'Navn, høyde og vekt',
            'Navn, habitat og region'
          ]
        }
      },

      {
        type: 'paragraph',
        text: 'Bra jobba! Nå som du har fått oversikt over begrepene, er du klar for å begynne å skrive dine egne SQL-spørringer.'
      }
    ]
  }
  
];

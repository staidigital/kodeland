export default [
  {
    "id": "sectionIntro",
    "title": "Introduksjon til løkker i JavaScript",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Løkker lar deg gjenta den samme koden flere ganger uten å skrive den flere ganger manuelt. Dette er nyttig når du vil gjøre noe mange ganger, som å gå gjennom en liste med ting eller telle opp til et bestemt tall."
      }
    ]
  },
  {
    "id": "sectionForLoops",
    "title": "1. For-løkker (for-loops)",
    "blocks": [
      {
        "type": "paragraph",
        "text": "For-løkker brukes mest når du vet hvor mange ganger du vil at en handling skal gjentas. Det er tre ting som kontrollerer en for-løkke: startverdien, når den skal stoppe, og hvordan den teller opp."
      },
      {
        "type": "code",
        "language": "javascript",
        "code": "for (let i = 0; i < 5; i++) {\n  console.log(\"Dette er iterasjon nummer \" + i);\n}"
      },
      {
        "type": "list",
        "items": [
          "`let i = 0`: Vi starter med at variabelen `i` gis verdien 0.",
          "`i < 5`: Løkken kjører så lenge `i` er mindre enn 5.",
          "`i++`: For hver gang løkken kjører (for hver *iterasjon*), økes `i` med 1.",
          "Så denne løkken vil skrive ut \"Dette er iterasjon nummer 0\", \"Dette er iterasjon nummer 1\", osv., helt opp til 4."
        ]
      }
    ]
  },
  {
    "id": "sectionWhileLoops",
    "title": "2. While-løkker (while-loops)",
    "blocks": [
      {
        "type": "paragraph",
        "text": "En **while-løkke** fortsetter å kjøre så lenge en betingelse er sann. Denne typen løkke er bra når du ikke vet på forhånd hvor mange ganger du trenger å gjenta noe."
      },
      {
        "type": "code",
        "language": "javascript",
        "code": "let i = 0;\nwhile (i < 5) {\n  console.log(\"Dette er iterasjon nummer \" + i);\n  i++;\n}"
      },
      {
        "type": "paragraph",
        "text": "Her vil løkken kjøre så lenge `i` er mindre enn 5, akkurat som i for-løkken. Forskjellen er at med en while-løkke, skriver du oppdateringen (`i++`) selv inne i løkken, og løkken vil fortsette å kjøre så lenge betingelsen `i<5` er sann."
      }
    ]
  },
  {
    "id": "sectionDoWhile",
    "title": "3. Do-while-løkker",
    "blocks": [
      {
        "type": "paragraph",
        "text": "En **do-while-løkke** er litt spesiell. Den kjører alltid **minst én gang**, selv om betingelsen er falsk fra starten. Etter første gang den kjører, sjekker den om betingelsen fortsatt er sann."
      },
      {
        "type": "code",
        "language": "javascript",
        "code": "let i = 0;\ndo {\n  console.log(\"Dette er iterasjon nummer \" + i);\n  i++;\n} while (i < 5);"
      },
      {
        "type": "paragraph",
        "text": "I dette eksempelet vil løkken også kjøre så lenge i er mindre enn 5, men den kjører alltid minst én gang før den sjekker betingelsen."
      }
    ]
  },
  {
    "id": "sectionTasks",
    "title": "Oppgaver",
    "blocks": [
      {
        "type": "task",
        "number": 1,
        "title": "Oppgave 1: Tell opp fra 1 til 10",
        "description": "Bruk en for-løkke til å skrive ut tallene fra 1 til 10 i konsollen."
      },
      {
        "type": "task",
        "number": 2,
        "title": "Oppgave 2: Finn summen av tallene fra 1 til 100",
        "description": "Skriv et program som bruker en while-løkke for å finne summen av alle tallene fra 1 til 100."
      },
      {
        "type": "task",
        "number": 3,
        "title": "Oppgave 3: Skriv ut et array",
        "description": "Lag et array med noen bynavn. Bruk en for-løkke til å skrive ut hvert bynavn i konsollen."
      },
      {
        "type": "task",
        "number": 4,
        "title": "Oppgave 4: Finn det største tallet",
        "description": "Lag et array med tall. Bruk en for-løkke til å finne det største tallet i arrayet."
      },
      {
        "type": "paragraph",
        "text": "Disse oppgavene hjelper deg å forstå hvordan løkker fungerer i JavaScript. Løkker er et kraftig verktøy for å gjøre ting om igjen uten å skrive samme kode flere ganger."
      }
    ]
  }
]
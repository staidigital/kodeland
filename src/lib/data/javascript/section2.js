export default [
  {
    id: "sectionIntro",
    title: "Introduksjon til if-setninger i JavaScript",
    blocks: [
      {
        type: "paragraph",
        text: "Nå som du har lært om variabler, er det tid for å lære hvordan vi kan få koden til å ta beslutninger. Dette gjør vi med if-setninger. if-setninger hjelper datamaskinen med å gjøre noe kun når en bestemt betingelse er oppfylt, som om vi sier 'hvis dette skjer, gjør dette'."
      }
    ]
  },
  {
    id: "sectionBasicIf",
    title: "Grunnleggende if-setning",
    blocks: [
      {
        type: "paragraph",
        text: "En if-setning sjekker om noe er sant. Hvis det er sant, kjører den koden inne i klammeparentesene {}."
      },
      {
        type: "code",
        language: "javascript",
        code: `let age = 18;

if (age >= 18) {
  console.log("Du er myndig.");
}`
      },
      {
        type: "paragraph",
        text: 'I dette eksempelet sjekker if-setningen om `age` er større enn eller lik 18. Hvis det er sant, vil den skrive ut "Du er myndig."'
      }
    ]
  },
  {
    id: "sectionIfElse",
    title: "If-else-setning",
    blocks: [
      {
        type: "paragraph",
        text: 'Noen ganger vil vi gjøre noe annet hvis betingelsen ikke er sann. Da bruker vi en `else`-setning, som betyr "ellers".'
      },
      {
        type: "code",
        language: "javascript",
        code: `let age = 16;

if (age >= 18) {
  console.log("Du er myndig.");
} else {
  console.log("Du er ikke myndig.");
}`
      },
      {
        type: "paragraph",
        text: 'Her sjekker vi om `age` er større enn eller lik 18. Hvis det er sant skriver den ut "Du er myndig". Hvis det er usant skriver den ut "Du er ikke myndig." i stedet.'
      }
    ]
  },
  {
    id: "sectionElseIf",
    title: "If-else if-else-setning",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger har vi flere ting vi vil sjekke. Da kan vi bruke en kombinasjon av `if`, `else if` og `else` for å sjekke flere betingelser."
      },
      {
        type: "code",
        language: "javascript",
        code: `let score = 85;

if (score >= 90) {
  console.log("Du fikk en A.");
} else if (score >= 80) {
  console.log("Du fikk en B.");
} else {
  console.log("Du fikk en C eller lavere.");
}`
      },
      {
        type: "paragraph",
        text: "I dette eksemplet sjekker vi flere ting: først sjekker vi om `score` er 90 eller mer. Hvis ikke, sjekker vi om det er 80 eller mer. Hvis ingen er sanne, skriver vi ut 'Du fikk en C eller lavere.'"
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
        title: "Oppgave 1: Sjekk tall",
        description: "Skriv en if-setning som sjekker om en variabel `number` er større enn 10. Hvis den er større, skriv ut 'Større enn 10', ellers skriv ut '10 eller mindre'.",
        code: `let number = 12;

// Skriv if-setning her`
      },
      {
        type: "task",
        number: 2,
        title: "Oppgave 2: Kategori basert på alder",
        description: "Lag et program som sjekker alderen til en person. Hvis personen er under 13, skriv 'Barn'. Hvis mellom 13 og 19, skriv 'Tenåring'. Hvis 20 eller eldre, skriv 'Voksen'.",
        code: `let age = 17;

// Skriv if-else if-else-setning her`
      },
      {
        type: "task",
        number: 3,
        title: "Oppgave 3: Enkel login-simulering",
        description: "Skriv et program som sjekker om brukernavnet er 'admin' og passordet er '1234'. Hvis ja, skriv 'Velkommen!'. Hvis ikke, skriv 'Feil brukernavn eller passord'.",
        code: `let username = "admin";
let password = "1234";

// Skriv if-else-setning her`
      },
      {
        type: "task",
        number: 4,
        title: "Oppgave 4: Bonus – Graderingssystem",
        description: "Lag et program som tar en variabel `poeng` og gir karakter basert på verdien:\n90+: A\n80+: B\n70+: C\n60+: D\nUnder 60: F",
        code: `let poeng = 85;

// Skriv if-else if-else-setning her`
      },
      {
        type: "paragraph",
        text: "Disse oppgavene vil gi deg en god forståelse av hvordan du kan bruke if-setninger for å ta beslutninger i JavaScript. Det er viktig for å lage dynamiske og responsive nettsider. 🚀"
      }
    ]
  }
];

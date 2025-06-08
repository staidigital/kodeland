export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Nå som du kan lage variabler, er det på tide å lære hvordan koden kan ta valg. Det gjør vi med noe som kalles ^^if-setninger^^. Tenk på det som å si til datamaskinen:"
      },
      {
        type:"paragraph",
        text: '%%"Hvis noe er sant - da skal du gjøre noe"%%'
      },
      {
        type:"paragraph",
        text: '**For eksempel:**'
      },
      {
        type:"list",
        items: [
          '**Hvis** brukeren er logget inn - **vis** velkomstmeldingen',
          '**Hvis** temperaturen er under 0 - **vis** "Det er kaldt!"',
        ]
      },
      {
        type:"paragraph",
        text: 'Denne sjekken - "er temperaturen under 0" - kalles en ^^betingelse^^. Koden din gjør noe **bare hvis** betingelsen stemmer (er sann).'
      },
    ]
  },
  
  {
    id: "sectionBasicIf",
    title: "Grunnleggende if-setning",
    blocks: [
      {
        type: "paragraph",
        text: "En if-setning sjekker om noe er sant. Hvis det stemmer, kjører koden som står inne i ^^blokken^^ - altså mellom klammeparantesene `{...}`."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 18;

if (age >= 18) {
  console.log("Du er myndig.");
}`
      },
      {
        type: "paragraph",
        text: 'I dette eksempelet spør vi: %%Er alderen 18 eller mer?%% Hvis ja, vis meldingen "Du er myndig.".'
      },
      {
        type: "paragraph",
        text: "💡 **Prøv selv:** Endre variabelen `age` til et lavere tall - f.eks. 16. Hva skjer da? Blir meldingen skrevet ut?"
      }

    ]
  },

  {
    id: "sectionIfElse",
    title: "If-else-setning",
    blocks: [
       {
        type: "paragraph",
        text: 'Noen ganger vil vi gjøre én ting hvis noe stemmer, og noe annet hvis det ikke stemmer. Da bruker vi en ^^if-else^^-setning. Det betyr: %%Hvis dette – gjør dette, ellers – gjør noe annet.%%'
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 16;
if (age >= 18) {
  console.log("Du er myndig.");
} else {
  console.log("Du er ikke myndig.");
}`
      },
      {
        type: "paragraph",
        text: 'Her spør vi: %%Er alderen 18 eller mer?%% Hvis ja, vis "Du er myndig." Hvis ikke, vis "Du er ikke myndig."'
      },
      {
        type: "paragraph",
        text: "💡 **Prøv selv:** Endre verdien på `age` til et høyere tall. Hva skjer da?"
      }

    ]
  },
  {
    id: "sectionElseIf",
    title: "If – else if – else",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger holder det ikke å bare sjekke én ting. Vi vil kanskje sjekke flere ulike muligheter. Da kan vi bruke en kombinasjon av `if`, `else if`, og `else`."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
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
        text: "Her sjekker vi flere ting, i rekkefølge. Først: %%Er scoren 90 eller mer?%% Hvis ikke, sjekker vi: %%Er scoren 80 eller mer?%% Hvis ingen stemmer, får vi siste alternativ – altså `else`-blokken."
      },
      {
        type: "paragraph",
        text: "💡 **Tips:** Koden stopper så fort én betingelse er sann – da hopper den over resten."
      }
    ]
  },
  {
    id: "sectionConditions",
    title: "Kombinere betingelser",
    blocks: [
      {
        type: "paragraph",
        text: "Noen ganger vil vi sjekke flere ting på en gang. Da kan vi kombinere betingelser med `&&` (og) eller `||` (eller)."
      },
      {
        type: "paragraph",
        text: "`&&` betyr at **begge** betingelsene må være sanne. `||` betyr at **minst én** av dem må være sann."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let age = 20;
let hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("Du kan gå inn på konserten.");
}`
      },
      {
        type: "paragraph",
        text: "Her sjekker vi to ting: %%er personen over 18 **og** har billett?%% Hvis begge stemmer, slipper de inn."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
  console.log("Du har fri!");
}`
      },
      {
        type: "paragraph",
        text: "Her sjekker vi: %%er det helg **eller** ferie?%% Hvis minst én av dem stemmer, får vi fri!"  
      },
      {
        type: "paragraph",
        text: "💡 **Prøv selv:** Endre verdiene i eksemplene over for å se hvordan `&&` og `||` fungerer."
      }
    ]
  },

  {
  id: "sectionBooleanQuiz",
  title: "Flervalgsoppgaver – if og booleans",
  blocks: [
    {
      type: 'paragraph',
      text: 'Her kommer noen spørsmål for å sjekke om du forstår hvordan `if`-setninger og booleans fungerer. Hva tror du skjer?'
    },
{
  type: 'task',
  number: 1,
  title: 'Hva skrives ut?',
  description: 'Hva vil denne koden skrive ut i konsollen?',
  code: `let age = 15;
if (age >= 18) {
  console.log("Du er voksen!");
}`,
  solution: {
    correct: 2,
    options: [
      'Du er voksen!',
      'Du er ikke voksen!',
      'Ingenting skrives ut'
    ]
  }
},

    {
      type: 'task',
      number: 2,
      title: 'Hva er resultatet av denne betingelsen?',
      description: 'Hva blir resultatet av betingelsen `(isWeekend || isHoliday)`?',
      solution: {
        correct: 0,
        options: [
          'true',
          'false',
          'undefined',
          'error'
        ]
      },
      code: `let isWeekend = false;
let isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("Du har fri!");
}`
    },

    {
      type: 'task',
      number: 3,
      title: 'Hva er sant om `&&` og `||`?',
      description: 'Velg det alternativet som er riktig:',
      solution: {
        correct: 2,
        options: [
          '`&&` betyr "enten eller"',
          '`||` betyr "begge må være sanne"',
          '`&&` betyr "begge må være sanne", `||` betyr "minst én må være sann"',
          'De to symbolene betyr akkurat det samme'
        ]
      }
    }
  ]
  },

{
  id: "sectionTasks",
  title: "Programmeringsoppgaver – if-setninger og beslutninger",
  blocks: [
    {
      type: 'paragraph',
      text: 'Usikker på hvordan du bør skrive og lagre din egen JavaScript-kode? Trykk på [denne lenken](/javascript/part0/) for å lære hvordan du kobler en `js`-fil til en `html`-fil.'
    },

    {
      type: "task",
      number: 1,
      title: "Sjekk tall",
      description: "Lag en variabel `number`. Skriv en if-setning som sjekker om `number` er større enn 10. Hvis ja, skriv ut 'Større enn 10'. Ellers: '10 eller mindre'.",
      code: `let number = 12;

// Skriv if-setning her`,
      solution: {
        code: `let number = 12;
if (number > 10) {
  console.log("Større enn 10");
} else {
  console.log("10 eller mindre");
}`
      }
    },

    {
      type: "task",
      number: 2,
      title: "Karaktersystem",
      description: "Lag et program som tar en variabel `poeng` og gir karakter slik:\n90+: A\n80+: B\n70+: C\n60+: D\nUnder 60: F",
      code: `let poeng = 85;

// Skriv if-else if-else-setning her`,
      solution: {
        code: `let poeng = 85;
if (poeng >= 90) {
  console.log("A");
} else if (poeng >= 80) {
  console.log("B");
} else if (poeng >= 70) {
  console.log("C");
} else if (poeng >= 60) {
  console.log("D");
} else {
  console.log("F");
}`
      }
    },
    {
      type: "task",
      number: 3,
      title: "Enkel innlogging",
      description: "Lag et program som sjekker om brukernavnet er 'admin' og passordet er '1234'. Hvis begge stemmer, skriv 'Velkommen!'. Ellers: 'Feil brukernavn eller passord'.",
      code: `let username = "admin";
let password = "1234";

// Skriv if-else-setning her`,
      solution: {
        code: `let username = "admin";
let password = "1234";
if (username === "admin" && password === "1234") {
  console.log("Velkommen!");
} else {
  console.log("Feil brukernavn eller passord");
}`
      }
    },
    {
  type: "task",
  number: 4,
  title: "Kombinerte betingelser – adgangskontroll",
  description: "Lag et program som sjekker om en person får tilgang til et område. Personen får bare adgang hvis de er over 18 år **og** har billett. Lag to variabler: `alder` og `harBillett`. Hvis begge betingelser er oppfylt, skriv 'Adgang tillatt'. Ellers skriv 'Adgang nektet'.",
  
  solution: {
    code: `if (alder > 18 && harBillett === true) {
  console.log("Adgang tillatt");
} else {
  console.log("Adgang nektet");
}`
  }
},
{
  type: "task",
  number: 5,
  title: "Bonus: Tilgang med spesialtillatelse",
  description: "Utvid adgangssystemet: En person får komme inn **hvis** de enten er over 18 år **eller** har spesialtillatelse. Lag to variabler: `age` og `hasPermission`. Hvis én av betingelsene er sann, skriv 'Adgang tillatt'. Hvis ikke, skriv 'Adgang nektet'.",

  solution: {
    code: `let age = 16;
let hasPermission = true;
if (age > 18 || hasPermission === true) {
  console.log("Adgang tillatt");
} else {
  console.log("Adgang nektet");
}`
  }
},


    {
      type: "paragraph",
      text: "Disse oppgavene gir deg trening i å bruke `if`, `else if` og `else` for å ta valg i programmet ditt. Det er nøkkelen til å gjøre koden din smart og interaktiv! 💡"
    }
  ]
}

];

export default [
  {
    id: "sectionIntro",
    title: "",
    blocks: [
      {
        type: "paragraph",
        text: "Når man lager programmer må man ofte skrive kode som skal kjøres gjentatte ganger. For eksempel tenk deg at du skal skrive en kode som skriver ut tallene fra $$1$$ til $$10$$. Det kan du gjøre ved å skrive `console.log()` 10 ganger:"
      },
      
    {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);

//også videre`
      },
      {
        type: "paragraph",
        text: "Dette fungerer, men det finnes bedre måter å skrive kode som skal repeteres. Med en `løkke` kan man kjøre en kode flere ganger helt til en betingelse er møtt."
      },
      {
        type: "paragraph",
        text: "Det finnes to typer løkker i JavaScript, en `for`-løkke og en `while`-løkke."
      }
    ]
  },

  {
  id: "sectionForExplained",
  title: "`For`-løkke",
  blocks: [
     {
      type: "paragraph",
      text: "Istedenfor å skrive ut tallene fra 1 til 10 manuelt, kan vi bruke en `for`-løkke med en enkelt linje kode i løkken:"
    },
    {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let i = 1; i <= 10; i++){
  console.log(i);
}`
      },
    {
      type: "paragraph",
      text: "Parentesene etter `for` inneholder tre uttrykk separert med semikolon (`;`):"

    },
    {
      type: "list",
      items: [
          "En ^^initialisering^^ hvor vi deklarerer variabelen som skal brukes i løkken. Eksempel: `let i = 1`.",
          "En ^^betingelse^^ som bestemmer hvor lenge løkken skal kjøre. Eksempel: Så lenge `i <= 10`.",
          "Et ^^matematisk uttrykk^^ som endrer variabelen for hver iterasjon, f.eks. `i++` øker `i` med $$1$$. `i--` reduserer tilsvarende `i` med $$1$$"
        ]
    },
    {
  type: "paragraph",
        text: "Selve koden som skal kjøres gjentakende legges i krøllparenteser `{}`."
  },
  {
  type: "paragraph",
  text: "Eksempelkode som teller nedover fra $$10$$ til $$1$$:"
  },
  
    {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 10; x >= 1; x--){
  console.log(x);
}`
      },
    {
  type: "paragraph",
  text: "Du kan også bruke operatorer som `+=` eller `-=` slik som vist nedenfor:"
  },
  {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 1; x < 20; x += 3){
  console.log(x);
}`
      },
      {
  type: "paragraph",
  text: "Her øker `x` med `3` for hver iterasjon av løkken."
  },
  {
  type: "paragraph",
  text: "Når løkken er over vil JavaScript gå videre til koden du har under løkken:"
  },
  {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 1; x < 2; x++){
  console.log(x);
}
console.log("For-løkken er ferdigkjørt");
console.log("Fortsett med resten av koden");
`
      },
    ]},

  {
  id: "sectionForArray",
  title: "Når skal du bruke `for`-løkke?",
  blocks: [
    {
  type: "paragraph",
  text: "En `for`-løkke er smart **når du vet hvor mange ganger du skal repetere en kode**."
  },
  {
  type: "paragraph",
  text: "For eksempel, si at du lager et program som simulerer flipping av en mynt. Du vil finne ut hvor mange ganger mynten lander på kron etter 10 kast. Da kan du bruke `Math.random()`-metoden, som returnerer et tilfeldig desimaltall mellom $$0$$ og $$1$$. "
  },
  {
      type: "list",
      items: [
        "Når tallet er under `0.5` fikk du mynt så da øker du mynt-telleren.",
        "Når tallet er over `0.5` fikk du kron så da øker du kron-telleren."
      ]
    },
    {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `let mynt = 0;
let kron = 0;
let antallKast = 10

for (i = 1; i <= antallKast; i++){
  let kastResultat = Math.random()
  if (kastResultat < 0.5){ 
      mynt++;
  }
  else{
      kron++;
    }
}
console.log("Kastet mynten", antallKast, "ganger")
console.log("Kastet kron:", kron)`
      },
      {
        type: "paragraph",
        subtitle: "Gå gjennom arrays med for-løkker",
        text: "En av de vanligste bruksområdene for en `for`-løkke er å gå gjennom alle elementene i et array."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let frukter = ["Eple", "Banan", "Appelsin", "Pære"];

for (let i = 0; i < frukter.length; i++) {
  console.log("Frukt:", frukter[i]);
}`
      },
      {
        type: "paragraph",
        text: "Her bruker vi `frukter.length` for å finne antall elementer i arrayet, og `frukter[i]` for å få tilgang til hvert enkelt element."
      },
      {
        type: "paragraph",
        text: "Man kan også bruke `for of` og `forEach`, `for of` vises nedenfor, `forEach` forklares i neste seksjon."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let frukter = ["Eple", "Banan", "Appelsin", "Pære"];

for (let frukt of frukter) {
  console.log("Frukt:", frukt);
}`
      },
      {
        type: "paragraph",
        text: "Vi kan også bruke løkker med betingelser for å filtrere elementer. For eksempel skriver vi ut kun fruktene som starter med 'B' ved å bruke string-metoden `startsWith()`:"
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let frukter = ["Eple", "Banan", "Appelsin", "Pære"];

for (let i = 0; i < frukter.length; i++) {
  if (frukter[i].startsWith("B")) {
    console.log("Frukt som starter med B:", frukter[i]);
  }
}`
      }
  ]
}
,
{
  id: "sectionWhileExplained",
  title: "While-løkke",
  blocks: [
    {
      type: "paragraph",
      text: "En ^^while-løkke^^ gjentar koden **så lenge en betingelse er sann (`true`)**. Den har følgende form:"
    },
    {
      type: "paragraph",
      text: "Eksempel: telle fra 0 til 4"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let i = 0;

while (i < 5) {
  console.log("Verdien av i: ", i);
  i++;
}
`
    },
    {
      type: "paragraph",
      text: "Løkken fortsetter å kjøre så lenge betingelsen `i < 5` er `true`. For hver iterasjon øker vi `i` med $$1$$. Når `i` blir $$5$$, blir betingelsen `false` og løkken stopper."
    },
    {
      type: "paragraph",
      text: "Pass på: hvis betingelsen aldri blir `false`, får du en ^^uendelig løkke^^. Eksempel:"

    },
    {
      type: "code",
      language: "javascript",
      interactive: false,
      code: `let i = 0;

while (i < 5) {
  console.log("Verdien av i: ", i);
}
`
    },
    {
      type: "paragraph",
      text: "Siden `i` aldri endres, vil løkken aldri stoppe. Husk derfor alltid å endre variabelen som kontrollerer betingelsen."
    },
  ]
},


  {
  id: "sectionWhileWhy",
  title: "Når skal du bruke `while`-løkke?",
  blocks: [
   {
      type: "paragraph",
      text: "Regelen er enkel: bruk en `while`-løkke når du **ikke vet hvor mange ganger koden skal kjøre på forhånd**."
    },
      {
      type: "paragraph",
      text: "Vi hadde tidligere et eksempel som telte hvor mange ganger vi får kron eller mynt når vi flipper en mynt 10 ganger. Men hva om spørsmålet hadde vært:"
    },
    {
      type:"paragraph",
      text: '%%"Finn ut hvor mange ganger du må flippe en mynt før du får kron"%%'
    },
    {
      type: "paragraph",
      text: "Da vet vi ikke på forhånd hvor mange ganger koden skal kjøres. Her passer en `while`-løkke perfekt!"
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let myntkast = 0;
let erKron = false

while (!erKron) { //kjører så lenge !erKron er true 
  myntkast++; // øker antall myntkast
  erKron = Math.random() < 0.5 // gir True dersom < 0.5
}

console.log("Det tok ", myntkast, "myntkast for å lande på kron.")
`
    },
    {
      type:"paragraph",
      text: "Her vil betingelsen `erKron = Math.random() < 0.5` simulere et myntkast og returnere `true` eller `false` avhengig av om det tilfeldige tallet er over eller under $$0.5$$. `true` vil bryte løkka, siden betingelsen da blir `false`"
    },
  ]},
  


    
{
  id: "sectionTasks",
  title: "Oppgaver: Løkker",
  blocks: [
  {
    type: "task",
    number: 1,
    title: "Skriv ut tall 1–10",
    description: "Lag tre løsninger som skriver ut tallene fra 1 til 10 i konsollen:\n1. Uten løkker\n2. Med en `for`-løkke\n3. Med en `while`-løkke",
    solution: {
      code: `// Uten løkke
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);

// Med for-løkke
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Med while-løkke
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}`
    }
  },
  {
    type: "task",
    number: 2,
    title: "Tall opp til brukerens tall",
    description: "Lag en kode som skriver ut alle tall fra 1 til et tall brukeren skriver inn via `prompt()`. Husk å sjekke at brukeren skriver inn et gyldig tall.",
    solution: {
      code: `let n = Number(prompt("Skriv inn et tall:"));
if (!isNaN(n) && n > 0) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
} else {
  console.log("Vennligst skriv inn et gyldig tall større enn 0");
}`
    }
  },
  {
    type: "task",
    number: 3,
    title: "Stjernepyramide",
    description: "Skriv et program som skriver ut en pyramide av stjerner. Brukeren skal skrive inn antall rader. For eksempel: hvis brukeren skriver 4, blir resultatet:",
    code: `*
**
***
****`,  
    solution: {
      code: `let rader = Number(prompt("Hvor mange rader?"));
for (let i = 1; i <= rader; i++) {
  console.log("*".repeat(i));
}`
    }
  },
  {
    type: "task",
    number: 4,
    title: "Hangman (vanskelig utfording)",
    description: "Lag et Hangman-spill:\n- Velg et ord som skal gjettes, f.eks. 'Elvebakken'\n- Brukeren gjetter en bokstav av gangen\n- Brukeren har 10 liv\n- Bruk `for...of` for å sjekke om bokstaven finnes i ordet\n- Bruk en `while`-løkke for å telle antall liv. ",
    solution: {
      code: `let ord = "Elvebakken";
let antallLiv = 10;
let gjettetBokstav = "";
let gjettetOrd = Array(ord.length).fill("_");

while (antallLiv > 0 && gjettetOrd.includes("_")) {
  gjettetBokstav = prompt("Gjett en bokstav:").toLowerCase();
  let funnet = false;

  for (let bokstav of ord.toLowerCase()) {
    if (bokstav === gjettetBokstav) {
      let index = ord.toLowerCase().indexOf(bokstav);
      gjettetOrd[index] = bokstav;
      funnet = true;
    }
  }

  if (!funnet) {
    antallLiv--;
    console.log("Feil! Liv igjen:", antallLiv);
  }

  console.log(gjettetOrd.join(" "));
}

if (!gjettetOrd.includes("_")) {
  console.log("Gratulerer, du vant!");
} else {
  console.log("Du tapte! Ordet var:", ord);
}`
  }
  }


    
  ]
}


]
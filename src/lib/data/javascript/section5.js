export default [
  {
  "id": "intro",
  "title": "",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Når du må gjenta kode, er løkker løsningen. I stedet for å skrive `console.log()` $$10$$ ganger, lar løkker deg kjøre samme kode $$10$$ ganger enkelt."
    },
    {
      "type": "code",
      "language": "javascript",
      "interactive": true,
      "code": "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}"
    },
    {
      "type": "paragraph",
      "text": "I JavaScript finnes to hovedtyper: `for` og `while`."
    }
  ]
},


  {
  id: "for",
  title: "`For`-løkke",
  blocks: [

    {
      type: "paragraph",
      text: "Brukes når du **vet hvor mange ganger koden skal gjentas**."
    },
    {
        type: 'code',
        language: 'javascript',
        interactive: false,
        code: `for (initialisering; betingelse; oppdatering) {
  // kode som gjentas
}
`
      },
 
  {
        type: "list",
        items: [
          "^^Initialisering^^: Startverdi, f.eks. `let i = 1`",
          "^^Betingelse^^: Når skal løkken stoppe? f.eks. `i <= 10`",
          "^^Oppdatering^^: Endring per runde, f.eks. `i++`"
        ]
      },

     {
      type: "paragraph",
      text: "Eksempel på en løkke som teller fra $$1$$ til $$10$$:"
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
  text: "Du kan også la variabelen hoppe flere steg hver runde:"
  },
  {
        type: 'code',
        language: 'javascript',
        interactive: true,
        code: `for (let x = 1; x < 20; x += 3){
  console.log(x);
}`
      },
    ]},
{
  "id": "forstring",
  "title": "Gå gjennom bokstaver i en string",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Du kan iterere over en tekst (string) bokstav for bokstav, og sjekke om bokstaven finnes i en annen string."
    },
    {
      "type": "code",
      "language": "javascript",
      "interactive": true,
      "code": "let tekst = \"Banan\";\nlet vokaler = \"aeiouyæøåAEIOUYÆØÅ\";\n\nfor (let bokstav of tekst) {\n  if (vokaler.includes(bokstav)) {\n    console.log(\"Vokal:\", bokstav);\n  } else {\n    console.log(\"Ikke vokal:\", bokstav);\n  }\n}"
    },
  ]
},

      {
  id: "forarray",
  title: "Gå gjennom arrays med `for`-løkker",
  blocks: [
    {
        type: "paragraph",
        text: "En av de vanligste bruksområdene for en `for`-løkke er å gå gjennom elementene i et array."
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
        text: "Man kan også bruke `for of` for enkel iterasjon, når du ikke skal bruke indeksen til noe."
      },
      {
        type: "code",
        language: "javascript",
        interactive: true,
        code: `let frukter = ["Eple", "Banan", "Appelsin", "Pære"];

for (let frukt of ["Eple", "Banan", "Appelsin", "Pære"]) {
  console.log("Frukt:", frukt);
}`
      },
  ]
}
,
{
  id: "while",
  title: "While-løkke",
  blocks: [
    {
      
    type: "paragraph",
    text: "En ^^while-løkke^^ gjentar koden **så lenge en betingelse er sann** (`true`)."
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
      text: "Løkken fortsetter å kjøre så lenge betingelsen `i < 5` er `true`. For hver runde øker `i` med $$1$$. Når `i` blir $$5$$, blir betingelsen `false` og løkken stopper."
    },
    {
      type: "paragraph",
      text: "Pass på: hvis betingelsen aldri blir `false`, får du en ^^uendelig løkke^^, og javascript-konsollen vil crashe. Derfor er det viktig at du oppdaterer `i` i løkken. Eksempel nedenfor på en uendelig løkke:"
    },
    {
  type: "code",
      language: "javascript",
      interactive: false,
      code: `let i = 0;
while (i < 5) {
  console.log(i); // i endres aldri!
}`
    }
,
  ]
},


  {
  id: "nårwhile",
  title: "Når skal du bruke `while`-løkke?",
  blocks: [
   {
      type: "paragraph",
      text: "Bruk en `while`-løkke når du **ikke vet hvor mange ganger koden skal kjøre**."
    },
    {
      type: "paragraph",
      text: "Eksempel: Finn ut hvor mange ganger du må flippe en mynt før du får kron."
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let myntkast = 0;
let erKron = false

while (!erKron) {
  myntkast++; // øker antall myntkast
  erKron = Math.random() < 0.5 // gir True dersom < 0.5
}

console.log("Det tok ", myntkast, "kast for å få kron.")`
    },


  ]},
    {
  id: "breakcontinue",
  title: "`break` og `continue`",
  blocks: [
  
  {
      type: "paragraph",
      text: "`break` avslutter løkken med en gang. `continue` hopper over resten av koden i denne runden og går til neste iterasjon."
    },


{
      type: "paragraph",
      text: "Eksempel på `break`: Stopp når vi finner et tall større enn 10."
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let tall = [3, 7, 12, 9];
for (let i = 0; i < tall.length; i++) {
  if (tall[i] > 10) {
    console.log("Fant større enn 10:", tall[i]);
    break; // avslutt løkken her
  }
}`
    },

{
      type: "paragraph",
      text: "Eksempel på `continue`: Skriv bare ut oddetall fra 1 til 10."
    },
    {
      type: "code",
      language: "javascript",
      interactive: true,
      code: `let i = 0;
while (i < 10) {
  i++;
  if (i % 2 === 0) continue; // hopp over partall
  console.log("Oddetall:", i);
}`
    }


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
export default [

{
  id: "sectionInputAndSubmit",
  title: "",
  blocks: [
    {
      type: "paragraph",
      text: "Nå skal vi lære hvordan vi kan bruke `<input>`-felt og knapper sammen med JavaScript! Dette lar brukeren skrive inn tekst eller tall som du kan bruke i koden din. "
    },
    {
      type: "paragraph",
      subtitle: "`input` og `submit` – brukerinteraksjon",
      text: "Et `<input>`-felt lar brukeren skrive inn tekst, og en `<button>` eller `<input type='submit'>` kan brukes til å sende eller bruke denne informasjonen."
    },
    {
      type: "code",
      language: "html",
      preview: true,
      code: `<input id="nameInput" type="text" placeholder="Skriv navnet ditt her">
<button id="greetButton">Si hei 👋</button>
<p id="greeting"></p>`,
      script: `let input = document.getElementById("nameInput");
let button = document.getElementById("greetButton");
let greeting = document.getElementById("greeting");

button.addEventListener("click", function() {
  let name = input.value;
  if (name.trim() === "") {
    greeting.textContent = "Skriv inn navnet ditt først!";
  } else {
    greeting.textContent = "Hei, " + name + "! Hyggelig å møte deg 😄";
  }
});`
    },
    {
      type: "paragraph",
      text: "Her bruker vi `input.value` for å hente teksten brukeren har skrevet. Når knappen klikkes, viser vi en personlig hilsen. Prøv å skrive navnet ditt og klikke på knappen!"
    },
    {
      type: "subtitle",
      text: "Et mer praktisk eksempel – enkel kalkulator 🧮"
    },
    {
      type: "paragraph",
      text: "Vi kan kombinere flere `input`-felter for å lage små verktøy. Her er en mini-kalkulator som legger sammen to tall!"
    },
    {
      type: "code",
      language: "html",
      preview: true,
      code: `<input id="num1" type="number" placeholder="Tall 1">
<input id="num2" type="number" placeholder="Tall 2">
<button id="sumButton">Regn ut summen</button>
<p id="result"></p>`,
      script: `let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let button = document.getElementById("sumButton");
let result = document.getElementById("result");

button.addEventListener("click", function() {
  let a = Number(num1.value);
  let b = Number(num2.value);

  if (isNaN(a) || isNaN(b)) {
    result.textContent = "Skriv inn to tall først!";
  } else {
    result.textContent = "Summen er: " + (a + b);
  }
});`
    },
    {
      type: "paragraph",
      text: "🎯 Tips: Prøv å skrive inn bokstaver i stedet for tall. Hva skjer da? (Hint: `isNaN()` betyr \"is Not a Number\")."
    },
    {
      type: "subtitle",
      text: "Interaktiv lek – hemmelig melding 💌"
    },
    {
      type: "paragraph",
      text: "La oss lage en liten lek: du skriver en hemmelig melding i et felt, og den vises bare når du trykker på en knapp!"
    },
    {
      type: "code",
      language: "html",
      preview: true,
      code: `<input id="secretInput" type="text" placeholder="Skriv en hemmelig melding...">
<button id="revealButton">Vis hemmeligheten 🤫</button>
<p id="secretText" style="display:none; font-weight:bold; color:purple;"></p>`,
      script: `let secretInput = document.getElementById("secretInput");
let revealButton = document.getElementById("revealButton");
let secretText = document.getElementById("secretText");

revealButton.addEventListener("click", function() {
  let message = secretInput.value;
  if (message.trim() === "") {
    alert("Skriv noe først!");
  } else {
    secretText.style.display = "block";
    secretText.textContent = "Din hemmelige melding: " + message;
  }
});`
    },
    {
      type: "paragraph",
      text: "Dette eksemplet viser hvordan du kan endre synligheten til et element med `style.display`. Ganske kult, ikke sant?"
    }
  ]
},
{
  id: "sectionInputTasks",
  title: "Oppgaver – Input og knapper",
  blocks: [
    {
      type: "task",
      number: 1,
      title: "Oppgave 1: Gjett et tall 🎯",
      description: "Lag et input-felt der brukeren skal skrive et tall mellom 1 og 10. Når de trykker på knappen, skal du sjekke om tallet er riktig (du kan velge et tilfeldig tall).",
      solution: {
        code: `<input id="guess" type="number" placeholder="Gjett et tall (1–10)">
<button id="checkButton">Sjekk!</button>
<p id="feedback"></p>`,
        script: `let secretNumber = Math.floor(Math.random() * 10) + 1;
let input = document.getElementById("guess");
let button = document.getElementById("checkButton");
let feedback = document.getElementById("feedback");

button.addEventListener("click", function() {
  let guess = Number(input.value);
  if (guess === secretNumber) {
    feedback.textContent = "🎉 Riktig! Bra gjettet!";
  } else {
    feedback.textContent = "❌ Feil, prøv igjen!";
  }
});`
      }
    },
    {
      type: "task",
      number: 2,
      title: "Oppgave 2: Navnefilter 🧠",
      description: "Lag et input-felt og en knapp som bare viser en melding hvis brukeren skriver navnet ditt (eller et bestemt navn du velger).",
      solution: {
        code: `<input id="nameCheck" type="text" placeholder="Hva heter du?">
<button id="checkName">Sjekk</button>
<p id="nameResult"></p>`,
        script: `let nameInput = document.getElementById("nameCheck");
let button = document.getElementById("checkName");
let result = document.getElementById("nameResult");

button.addEventListener("click", function() {
  if (nameInput.value.toLowerCase() === "ola") {
    result.textContent = "Hei, Ola! Du er på VIP-listen 😎";
  } else {
    result.textContent = "Beklager, du er ikke på listen.";
  }
});`
      }
    }
  ]
}
]
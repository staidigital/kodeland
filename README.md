# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


# 🧠 Kodeland Kursplattform

Velkommen til **Kodeland Læringsplattform** – et modulært system bygget med Svelte for å lage interaktive kodekurs i JavaScript, Python, Web og mer.

## 🚀 Oversikt

Denne plattformen lar deg bygge og kjøre flere programmeringskurs ved hjelp av felles komponenter. Hvert kurs har sitt eget innhold, men deler layout, navigasjon, sanntidseksempler og blokk-visning.

## 🛠️ Installasjon

Klon prosjektet og installer avhengigheter:

```bash
npm install
```

Du trenger også:

- Node.js >= 18
- En moderne kodeditor (f.eks. VS Code)

## 📁 Mappestruktur

```txt
lib/
├── components/           # Felles Svelte-komponenter
│   └── jensComps/
│       └── blocks/       # Komponenter for å vise blokker (tekst, kode, sandbox osv.)
├── data/
│   ├── javascript/       # JavaScript-kurs
│   ├── python/           # Python-kurs (du lager dette!)
src/
└── routes/
    └── [course]/[part]/+page.svelte  # Dynamisk rute for kursdeler
```

## 🧱 Hvordan lage et nytt kurs (f.eks. Python)

1. **Lag en ny mappe:**

```bash
mkdir lib/data/python
```

2. **Opprett `manifest.js`:**

```js
export default [
  { id: 'part1', title: 'Python: Intro' },
  { id: 'part2', title: 'Python: Variabler' }
];
```

3. **Lag `sectionX.js`-filer:**

Eksempelinnhold:

```js
export default [
  {
    id: 'sectionIntro',
    title: 'Intro til Python',
    blocks: [
      { type: 'paragraph', text: 'Velkommen til **Python**!' },
      { type: 'code', language: 'python', code: 'print("Hei!")' }
    ]
  }
];
```

4. **Gå til nettleseren:**

```
http://localhost:5173/python/part1
```

## 🧩 Blokktyper du kan bruke

- `paragraph` – avsnitt med inline-formattering (`**fet**`, `` `kode` `` osv.)
- `code` – kode med syntax-highlighting
- `list` – punktlister
- `task` – interaktive oppgaver
- `sandbox` – HTML/CSS/JS editor i sanntid

## ✨ Funksjoner

- Markdown-lignende inline-formattering
- Sanntid sandbox med konsoll
- Modulære, gjenbrukbare komponenter
- Syntax highlighting med CodeMirror

## 🤝 Bidra

Ønsker du å utvide plattformen?

- Legg til nye komponenter i `lib/components/jensComps/blocks/`
- Legg til støttetype i `BlockRenderer.svelte`

## 🧑‍💻 Dev-kommandoer

```bash
npm run dev      # Starter utviklingsserver
npm run build    # Bygger for produksjon
```

## 🚀 Klar? 

Lag kurs. Del kunnskap. Ha det gøy!

.
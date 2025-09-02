# sv
foo
Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
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

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


# 📚 Kodeland Kursplattform – Prosjektinnføring

Denne SvelteKit-baserte kursplattformen er laget for å modulært vise interaktivt undervisningsinnhold, som et JavaScript-kurs. Denne innføringen forklarer hvordan data flyter gjennom systemet, hvordan komponenter er strukturert, og hvordan man kan utvide eller vedlikeholde prosjektet.

---

## 🧩 1. Struktur for kursinnhold

Kursinnholdet finnes i:
`src/lib/data/javascript/`

Hver kursseksjon er definert i en egen JS-fil (f.eks. `section0.js`, `section1.js`, ...). Disse filene eksporterer en array med objekter som følger dette mønsteret:

```ts
{
  id: string,
  title: string,
  blocks: Array<{
    type: string,
    ...andreEgenskaper
  }>
}
```

### Blokktyper:
- `paragraph`: Tekstavsnitt med markup
- `code`: Kode med syntax highlighting og forhåndsvisning
- `task`: Interaktiv flervalgoppgave med tilbakemelding
- `image`: Bildegalleri med justeringsvalg
- `sandbox`: Redigerbar HTML/CSS/JS med live preview
- `interactive`: Kjør enkel JS-kode direkte
- `htmlPreview`: Forhåndsvis HTML og JS sammen
- `textWithImage`: Kombinerte tekst- og bildeblokker

---

## 🧠 2. Rendering-system

Renderingen starter i **`SectionRenderer.svelte`**, som:
- Tar imot en `sections` array
- Itererer over hver seksjon og sender blokkene til `BlockRenderer.svelte`

### `SectionRenderer.svelte`:
```svelte
{#each sections as section}
  <BlockRenderer blocks={section.blocks} />
{/each}
```

### `BlockRenderer.svelte`:
Render hver blokk basert på `type`. For eksempel:
```svelte
{#if block.type === 'paragraph'}
  <BlockParagraph {...block} />
{:else if block.type === 'code'}
  <BlockCode {...block} />
{/if}
```

Hver `type` samsvarer med en komponent i:
`src/lib/components/jensComps/blocks/`

---

## 🧱 3. Komponenter for blokker

Hver fil under `blocks/` representerer en unik blokk:

- `BlockParagraph.svelte` – Viser tekst med markup
- `BlockCode.svelte` – Kode med syntax highlighting
- `BlockTask.svelte` – Interaktive flervalgoppgaver
- `BlockImage.svelte` – Ett eller flere tilpassede bilder
- `BlockSandbox.svelte` – Editor med HTML/CSS/JS og forhåndsvisning
- `BlockInteractive.svelte` – JS-kode som kjøres inline
- `BlockHTMLPreview.svelte` – Forhåndsvis HTML/JS i iframe
- `BlockTextWithImage.svelte` – Tekst og bilde side ved side

---

## 🔗 4. Hvordan data vises i UI

1. `manifest.ts` definerer metadata (titler, ruter, rekkefølge)
2. Sider henter seksjoner fra `data/javascript`
3. Rute-filen (f.eks. `[course]/+page.svelte`) bruker `SectionRenderer`
4. Navigasjon håndteres med Sidebar og ruteparametere

---

## 🔄 5. Slik legger du til nytt innhold

For å legge til en ny seksjon:

1. Lag `sectionX.js` i `data/javascript/`
2. Legg til metadata i `manifest.ts`
3. Bruk blokker som støttes av komponenter i `blocks/`, eller lag nye

For å lage en ny blokktype:

1. Lag en ny Svelte-komponent i `blocks/`
2. Importer og registrer den i `BlockRenderer.svelte`
3. Bruk den i en seksjon slik:
```ts
{ type: 'nyBlokkType', ...props }
```

---

## 🛠 6. Teknologistabel

- **SvelteKit**: App-rammeverk
- **Vite**: Byggeverktøy
- **CodeMirror**: Kodeeditor
- **Svelte-Highlight**: Syntax highlighting
- **TypeScript**: Typesikkerhet
- **Markdown-lignende markup**: For tekstformatering

---

## 🧠 Gjenbruk for AI-agenter

Strukturen gjør det enkelt for en chatbot-agent å:
- Lese og forstå kursinnhold
- Generere nye seksjoner som følger eksisterende struktur
- Lage nye komponenter og interaktive blokker
- Utvide plattformen med nye funksjoner

Denne README-filen fungerer som en innføring både for utviklere og GPT-agenter som skal jobbe videre med prosjektet.


# 📚 Kodeland Kursplattform – Til Sondre

Hei Sondre! 🎓 Her er en guide for hvordan du kan lage ditt eget kurs – enten i Python, eller noe helt annet – basert på strukturen i denne plattformen. Denne guiden bygger videre på det eksisterende oppsettet med seksjoner, routing, komponenter og manifest.

---

## 🛠 1. Lag en ny mappe for kurset

Lag en ny mappe under `src/lib/data/` med navnet på kurset ditt, f.eks.:
```
src/lib/data/python/
```

Der oppretter du filer som `section0.js`, `section1.js`, osv. Hver fil inneholder en array med seksjoner som ser slik ut:

```js
export default [
  {
    id: "intro",
    title: "Velkommen til Python!",
    blocks: [
      {
        type: "paragraph",
        text: "Python er et populært og enkelt programmeringsspråk..."
      },
      {
        type: "code",
        language: "python",
        code: "print('Hei verden!')",
        preview: false
      }
    ]
  }
];
```

---

## 🧭 2. Oppdater `manifest.ts`

Legg til kurset ditt i `manifest.ts`, som forteller appen hva slags kurs som finnes:

```ts
{
  slug: "python",
  title: "Python-kurs",
  path: "/python",
  sections: [
    import('./python/section0.js'),
    import('./python/section1.js'),
    // legg til flere her
  ]
}
```

---

## 🧩 3. Lag nye blokker (valgfritt)

Hvis du trenger en ny type blokk (f.eks. quiz, video, drag-and-drop), lag en ny komponent under:
```
src/lib/components/jensComps/blocks/
```

Navngi den f.eks. `BlockQuiz.svelte`. Deretter:
1. Importer den i `BlockRenderer.svelte`
2. Legg til en ny `{#if block.type === 'quiz'}` i `BlockRenderer`

---

## 🌐 4. Navigasjon og routing

Siden dette er en dynamisk plattform, bruker den `[course]` som parameter. Den riktige seksjonen lastes automatisk basert på manifestet og URL-en.

Du trenger derfor ikke lage egne ruter for kurset – det skjer automatisk.

---

## 🎨 5. Gjenbruk komponenter

Du kan bruke eksisterende blokker som:
- `BlockCode` for kodeeksempler
- `BlockParagraph` for tekst
- `BlockTask` for oppgaver
- `BlockSandbox` for interaktiv HTML/CSS/JS

---

## 🚀 6. Eksempel på nytt kurs: Python

1. Lag mappa `data/python`
2. Lag `section0.js` med innhold
3. Oppdater `manifest.ts`
4. Bruk eksisterende komponenter eller lag nye
5. Kjør `npm run dev` og gå til `/python`

---

Nå har du din egen læringsplattform klar til bruk. Lykke til med kurset!

– GPT

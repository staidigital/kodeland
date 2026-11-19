@AGENTS.md

# Kodeland

Nettsted for kodeundervisning på videregående (Vg1), laget med Next.js 16 (App Router,
`cacheComponents`), TypeScript, Tailwind, MDX og Supabase. Deployes på Vercel.

| Rute | Hva |
|---|---|
| `/` | Midlertidig «work in progress»-forside. La den være til brukeren bestemmer noe annet. |
| `/text-adventure` | Ferdig HTML-side (`src/content/text-adventure.html`) servert av en route handler. |
| `/webutvikling` | Grunnkurs i HTML og CSS. **Les `docs/kursplan-webutvikling.md` før du jobber med kurset.** |
| `/logg-inn`, `/admin` | Innlogging og lærerpanel. |

## Språk og ordvalg

- Alt brukeren ser er på **norsk bokmål**. Navn i koden er også norske (`leksjon`, `oppgave`, `klasse`).
- Si **«student»**, ikke «elev», i alt brukeren ser.
- Kommuniser med brukeren på norsk.

## Webutvikling-kurset

Kursplanen, prinsippene (CSS tidlig, teori spredt utover, mappestruktur som rød tråd) og ideer til
interaktive elementer står i `docs/kursplan-webutvikling.md`. Følg den når du lager nye moduler.

Ny leksjon:
1. Skriv `src/content/webutvikling/<modul>/<leksjon>.mdx`. Komponentene i `src/mdx-components.tsx`
   (`<Oppgave>`, `<Quiz>`, `<UnderPanseret>`, `<Tips>`, `<GjorDetSelv>`, `<Sjekkliste>` …) kan
   brukes uten import.
2. Legg leksjonen inn i `kurs.ts` **og** `leksjoner.ts` (statisk import – dynamisk `import()` av MDX
   feiler i Next sin forhåndsvalidering).
3. Kodeoppgaver med sjekker defineres i `oppgaver.ts`, med id-er som `m3-lister`. Funksjoner kan ikke
   sendes som props fra MDX, derfor ligger sjekkene der.
4. Test oppgaven i nettleseren: skriv riktig og feil kode, og se at sjekkene reagerer riktig.

Stilen for kurset ligger i `src/app/webutvikling/kurs.css` (fargetokens på `.kurs`, lyst og mørkt tema).

## Innlogging, lærerpanel og database

- Supabase-klienter i `src/lib/supabase/` (`client.ts`, `server.ts`, `admin.ts`). `admin.ts` bruker
  secret key og omgår RLS – bare for lærerhandlinger, etter at `hentBruker()` har sjekket rollen.
- `src/lib/auth.ts`: `hentBruker()` / `kreverLaerer()`. Studenter har ingen e-post; bak brukernavnet
  ligger `<brukernavn>@elev.kodeland.invalid` (ikke endre domenet – eksisterende brukere bruker det).
- Ingen kan registrere seg selv. Lærere lager studenter i `/admin`. Passord lagres kryptert i
  `student_passwords` med `STUDENT_PASSORD_NOKKEL` (`src/lib/passordkrypto.ts`).
- Fremdrift: `localStorage` (`src/components/kurs/fremdrift.ts`), synkes til Supabase når studenten
  er innlogget (`fremdrift-sync.tsx`).
- Databaseendringer: lag en ny fil i `supabase/migrations/` som brukeren kjører selv i Supabase sin
  SQL Editor. Nye tabeller skal ha RLS slått på.
- Miljøvariabler: se `.env.example`. Hemmeligheter skal aldri i git eller i chatten.

## Next.js 16-fallgruver i dette prosjektet

- Kode som leser cookies, `params` eller `searchParams` må ligge bak `<Suspense>`. Sider bak
  innlogging har `export const instant = false`.
- Ruteypene (`PageProps<"/…">`) genereres: kjør `npx next typegen` etter nye ruter.
- Dev-serveren viser av og til gammel CSS etter endringer. Start den på nytt før du feilsøker stilen.
- Ikke kjør `next build` mens dev-serveren går – start dev-serveren på nytt etterpå.

## Arbeidsflyt

- Jobb på branchen `dev`. Brukeren merger til `main` via pull request. `old` er en kopi av det gamle
  SvelteKit-prosjektet og skal ikke røres.
- Commit-meldinger på norsk.
- `.vscode/` er brukerens egen mappe – ikke commit den.
- Sjekk før du er ferdig: `npx eslint src`, `npx tsc --noEmit`, og helst `npm run build`.

# Kursplan: Webutvikling (HTML og CSS)

Grunnkurs i HTML og CSS for Vg1 (informasjonsteknologi og medieproduksjon), på `/webutvikling`.
Kurset bygger på pensumet i [staidigital/Webutvikling-101](https://github.com/staidigital/Webutvikling-101)
(19 kapitler i markdown), men er stokket om og delt opp i interaktive moduler.

Selve strukturen (moduler, leksjoner, stikkord) ligger i `src/content/webutvikling/kurs.ts`.
Dette dokumentet forklarer **hvorfor** den ser ut som den gjør, og hva hver modul skal dekke.

## Prinsipper

1. **Lag noe med en gang.** Første leksjon ender med at studenten har endret en nettside selv,
   innen ti minutter. Ingen lange teoriinnledninger.
2. **CSS tidlig.** Pensumet tar all HTML først (kap. 1–9) og CSS etterpå (kap. 10–19). Det gjør
   ikke vi. Studentene er gira på å endre utseendet, så de får en smakebit av CSS allerede i
   modul 1, og et eget stilark i modul 2. Etter det får hver ny HTML-ting litt CSS sammen med seg.
3. **Teori når den trengs.** Teorien er spredt utover modulene i korte «Kikk under panseret»-bokser,
   koblet til noe studenten nettopp har gjort. Klient og tjener kommer når de lager lenker, at
   hvert bilde er en egen forespørsel kommer når bilder ikke vises, DOM-treet kommer med semantikk.
   Litt mindre teori totalt enn i pensumet – men det som er viktig, skal med.
4. **Mappestruktur er en rød tråd.** Introduseres i modul 1, blir avgjørende i modul 4–5 (stier,
   bilder), og må sitte ved publisering i modul 14. Det er svært viktig og skal ikke kuttes.
5. **Ett prosjekt hele veien.** Studentens eget nettsted i mappen `webkurs/` vokser modul for modul.
   Nettsiden er treningsarenaen; det ekte arbeidet skjer i VSCodium med Live Server. Hver leksjon
   ender gjerne med en «Gjør det i ditt eget prosjekt»-boks.
6. **Interaktivt, ikke bare lesestoff.** Hver leksjon bør ha minst én kodeoppgave med automatiske
   sjekker, og gjerne et gjett-først-spørsmål. Visuelle lekeplasser for det som er vanskelig å
   forklare med tekst.
7. **Fleksibel lengde.** Antall leksjoner per modul og tid per leksjon følger kompleksiteten,
   ikke en fast mal.

## Moduler

Kolonnen «Pensum» viser hvilke kapitler i Webutvikling-101 modulen henter stoff fra.

| # | Modul | HTML | CSS | Under panseret | Pensum |
|---|---|---|---|---|---|
| 1 | **Din første nettside** ✅ | `h1`, `p`, grunnstruktur (fylles inn, ikke pugges) | smakebit: `color` | en nettside er en tekstfil; prosjektmappen; filnavn; `index.html` | 1, 2, 3 |
| 2 | **Gi den farge!** ✅ | `strong`, `em`, `h2`–`h3` | `style.css`, `<link>`, `color`, `background-color`, `font-family`, `font-size` | HTML, CSS og JavaScript – tre språk, tre jobber | 4, 10, 12, 13 |
| 3 | **Mer innhold, mer stil** ✅ | `ul`, `ol`, `span`, kommentarer | klasser (`.klasse`), hex og hsl, `text-align` | tag, element, attributt og verdi | 3, 4, 7, 11, 12 |
| 4 | **Flere sider og lenker** ✅ | `a`, meny i `ul`, flere `.html`-filer | `:hover`, `text-decoration` | **klient og tjener**; hva skjer når du skriver inn en adresse; relative og absolutte stier | 1, 5, 11 |
| 5 | **Bilder** ✅ | `img`, `alt`, `figure` | `width`/`max-width`, `border-radius`, `background-image` | hvert bilde er en egen forespørsel (Network-fanen); formater; filstørrelse; opphavsrett | 6, 12 |
| 🏁 | **Sjekkpunkt 1:** nettsted med tre sider, meny, bilder og egen fargepalett ✅ | | | | (9) |
| 6 | **Boksmodellen** ✅ | `div` | `padding`, `margin`, `border`, `box-sizing` | alt er firkanter; utviklerverktøyet | 10, 14 |
| 7 | **Semantisk struktur** ✅ | `header`, `nav`, `main`, `section`, `article`, `footer` | stil på header, meny og bunntekst | DOM-treet; skjermlesere; universell utforming (lovkrav); `class` og `id` | 8, 9 |
| 8 | **Typografi** ✅ | `blockquote`, spesialtegn | webfonter, `rem`/`em`, `line-height`, linjelengde | typografisk skala | 4, 13 |
| 9 | **Selektorer og kaskaden** ✅ | tabeller, `dl` | kombinatorer, `:nth-child` (stripete tabeller), `:focus`, arv, spesifisitet | hvorfor CSS «ikke virker» | 7, 11 |
| 🏁 | **Sjekkpunkt 2:** nettstedet med semantisk struktur, typografi og stil ✅ | | | | |
| 10 | **Display og flyt** ✅ | – | `block`/`inline`, vannrett meny, `overflow` | normal flyt | 15 |
| 11 | **Flexbox** ✅ | – | `display: flex`, `justify-content`, `align-items`, `gap`, `flex-wrap` | – | 17 |
| 12 | **Grid og posisjonering** ✅ | – | grid, `fr`, `grid-template-areas`, `sticky`, `relative`/`absolute` | når bruker du hva? | 16, 18 |
| 13 | **Responsivt design** ✅ | viewport-meta | media queries, mobile first, relative enheter | du vet ikke hvilken skjerm brukeren har | 19 |
| 🚀 | **14. Publiser!** ✅ | validering | kontrastsjekk | hosting; domener og DNS; nå ligger *din* side på en tjener (knytter tilbake til modul 4) | 1 (+ nytt) |

✅ = leksjoner skrevet. Modul 1–5 tilsvarer omtrent første periode, og studentene ender med et
nettsted som faktisk har stil – i motsetning til pensumet, der sjekkpunkt 1 leveres uten CSS.

Sjekkpunktene er egne deler av kurset (`type: "sjekkpunkt"` i `kurs.ts`), med egne leksjoner. De
vises mellom modulene i oversikten og heter «Sjekkpunkt N» i stedet for «Modul N».

## Interaktive elementer

**Ferdige** (kan brukes direkte i MDX, se `src/mdx-components.tsx`):

| Komponent | Bruk |
|---|---|
| `<Oppgave id="…" />` | Kodeeditor (index.html, ev. flere sider og style.css) med forhåndsvisning og automatiske sjekker. Lenker mellom sidene virker, og feil sti gir 404. Bilder fra `kursbilder.ts` kan ligge i prosjektet, og feil sti gir ødelagt bilde. Med `responsiv: true` får forhåndsvisningen knapper for skjermbredde, og sjekkene kan teste flere bredder med `iBredde()`. Definisjonene ligger i `oppgaver.ts`. |
| `<Quiz sporsmal kode alternativer riktig forklaring />` | Gjett-først: studenten velger, så kommer forklaringen. Bra før en ny ting vises. |
| `<UnderPanseret tittel="…">` | Kort teoriboks. Hovedverktøyet for å spre teorien. |
| `<Tips>` | Små tips. |
| `<GjorDetSelv>` | Oppgave i studentens eget prosjekt i VSCodium. |
| `<Filnavn filer={[…]} />` | Spill: godt eller dårlig filnavn? |
| `<Mappebygger />` | Klikk filer på plass i `webkurs/` og `webkurs/bilder/`. |
| `<Sjekkliste id punkter />` | Avkrysning som huskes. |
| `<Fargevelger />` | HSL-glidere for tekst- og bakgrunnsfarge, med hex-kode, hsl-kode og kontrastmåler. |
| `<KlientTjener />` | Forespørsel og svar mellom nettleser og tjener, steg for steg – også en lenke som gir 404. Med `scenarier={["dns", …]}` vises også DNS-oppslaget når man skriver inn en adresse (modul 14). |
| `<Stifinner />` | Velg siden du står på og fila du vil til, og se den relative stien bygges opp ledd for ledd. |
| `<Nettverksfane />` | Forenklet Network-fane: forespørslene for en side med ekte filstørrelser, ulike bildeformater og nett. |
| `<Boksmodell />` | Glidebrytere for `padding`, `border` og `margin`, diagram i utviklerverktøyets farger, en ekte boks og regnestykket for bredden – med og uten `box-sizing: border-box`. |
| `<DomTre />` | Skriv HTML og se DOM-treet. Hold musa over en node for å se elementet, forelder, barn og søsken. |
| `<Skjermleser />` | Samme side bygget med div-er og med semantiske tagger: landemerker, overskrifter og lenker slik en skjermleser finner dem. |
| `<Typografilab />` | Glidere for skriftstørrelse, linjeavstand og linjelengde, og valg av skrift – med tegn per linje regnet ut, og en vurdering. |
| `<Typeskala />` | Velg grunnstørrelse og forhold, og se `p`, `h3`, `h2` og `h1` i en typografisk skala, med CSS i `rem`. |
| `<Selektorlab />` | Skriv en selektor og se hvilke elementer i en eksempelside den treffer, med ferdige eksempler på kombinatorer og pseudoklasser. |
| `<Spesifisitetsspill />` | Åtte runder: to regler treffer samme element – gjett fargen. Forklaringen viser spesifisiteten (`src/lib/spesifisitet.ts`). |
| `<Flytlab />` | Tre bokser midt i en tekst: bytt `display` mellom `inline`, `block`, `inline-block` og `none`, og se hvordan de legger seg i flyten. |
| `<Flekslab />` | Sandkasse for flexbox: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap` og antall bokser, med hovedakse og tverrakse tegnet inn. |
| `<Gridlab />` | Sandkasse for grid: kolonner med `fr`, `repeat` og `auto-fit` (med justerbar containerbredde), og et helt sideoppsett med `grid-template-areas` som studenten skriver selv. |
| `<Skjermbredde />` | Glidebryter for skjermbredden på en mobil-først-side, som viser hvilke media queries som er aktive. Brede skjermer skaleres ned så de får plass. |
| `<Nettstedsjekker />` | Studenten velger eller drar inn `webkurs`-mappen sin, og får den sjekket mot kravene i sjekkpunkt 1 (filnavn, grunnstruktur, lenker, meny, bilder, farger). Med `sjekkpunkt={2}` sjekker den også struktur, boksmodell, typografi, fokusmarkering og `!important`. Alt skjer lokalt i nettleseren. Sjekkene står i `src/lib/nettstedsjekk.ts`. |

Oppgavetyper vi bruker: endre koden, **finn feilen** (ødelagt kode som skal fikses), **hva gjør
denne koden?** (som `<Quiz>` med kode), og frie lekeplasser (oppgave uten sjekker).

**Ideer som ikke er bygget ennå:** ingen akkurat nå – alle ideene over er bygget. Skriv nye ideer
her, med modulen de hører til.

## Innlogging og lærerpanel

- Kurset virker uten innlogging; fremdriften lagres da bare i nettleseren.
- Ingen registrerer seg selv. Læreren lager klasser og studentbrukere i `/admin`, og følger
  fremdriften der. Studenter registreres med fornavn eller initialer, ikke fullt navn.
- Passord lages automatisk og lagres kryptert, så læreren kan vise dem igjen.
- Innlevering skjer foreløpig utenfor nettsiden (læringslogg o.l.). Sjekkpunktene er beskrevet,
  men ikke bygget som innleveringer på siden. Sjekkpunkt 1 og 2 har `<Nettstedsjekker />`, så
  studenten kan sjekke sitt eget nettsted før innlevering; resultatet lagres ikke.
- Ideer videre: vurderingskriterier (lav/middels/høy) per sjekkpunkt, sjekklister og
  nettstedsjekkens resultat synket til lærerpanelet, og strukturert medstudentvurdering.

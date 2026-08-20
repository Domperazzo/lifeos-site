# LifeOS — sito

Il sito ufficiale di LifeOS. Next.js 16 (App Router) · React 19 ·
TypeScript · Tailwind CSS 4 · Framer Motion · Lucide.

L'app iOS non è toccata da questa cartella: `web/` è indipendente da
`ios/` e non condivide codice, solo il **linguaggio visivo**.

## Comandi

```bash
npm install          # una volta
npm run dev          # sviluppo su http://localhost:3000
npm run build        # export statico in web/out
npm run lint         # eslint (deve essere pulito)
npx tsc --noEmit     # i tipi — solo **dopo** una build
```

⚠️ `tsc --noEmit` su una copia appena clonata fallisce: le dichiarazioni
per gli import di immagini stanno in `next-env.d.ts`, che Next *genera* e
che non è versionato. Serve una `npm run build` prima. In CI non c'è un
passo `tsc` separato proprio per questo — `next build` controlla già i
tipi, ed è lui il cancello.

Non c'è `npm run start`: con `output: "export"` la build non produce un
server, produce una cartella. Per provarla come la servirà Pages:

```bash
npx serve web/out
```

Dalla radice del progetto il server di sviluppo si avvia anche con la
configurazione `.claude/launch.json` (`lifeos-web`).

## Struttura

```
app/                 layout, pagina, metadata, sitemap, robots, og-image
components/
  i18n/              provider tipizzato + selettore EN/IT
  page/              composizione condivisa delle pagine localizzate
  navigation/        navbar sticky
  hero/              hero + composizione a tre iPhone
  device/            IPhoneMockup e le schermate LifeOS
    ios/             primitive iOS: status bar, tab bar, anello, grafico
    screens/         Life · Home · Finance · Tasks · Ask · Automation ·
                     Transaction · Profile
  life-dashboard/    "Your life at a glance"
  features/          i quattro blocchi editoriali delle aree
  intelligence/      catena del contesto + scenario
  automations/       timeline della giornata
  ask-lifeos/        Ask LifeOS (interattivo)
  ecosystem/         widget, Apple Watch, Siri
  privacy/           i sei principi + cosa si condivide e cosa no
  philosophy/        sezione editoriale
  product-demo/      iPhone interattivo con tab bar vera
  roadmap/ cta/ footer/
  theme/ ui/         toggle del tema e primitive comuni
lib/                 dati dimostrativi, formattazione, i18n, store del tema
hooks/               media query, tema
```

## Lingue

Il sito è disponibile in due export statici:

- `/` in inglese;
- `/it/` in italiano.

Il selettore **EN / IT** è sempre visibile nella barra di navigazione,
anche su mobile. La route è l'unica fonte della lingua: non si usano cookie
o `localStorage`, quindi link, metadata, indicizzazione e primo render sono
deterministici anche su GitHub Pages. `layout.tsx` allinea l'attributo
`lang` prima del primo paint, mentre ogni pagina passa il proprio locale a
`I18nProvider`.

Il catalogo vive in `lib/i18n/messages.ts`. L'inglese è la chiave canonica
e `MessageKey` obbliga ogni testo visibile — inclusi quelli delle schermate
nei mockup — ad avere una traduzione italiana. Anche i dati dimostrativi in
`lib/data.ts` usano le stesse chiavi; date, importi e separatori decimali
sono formattati in base alla lingua.

Per aggiungere una nuova lingua servono una route statica, il locale in
`lib/i18n/config.ts`, il relativo catalogo e i metadata/alternate URL. Per
aggiungere invece un testo basta inserirlo nel catalogo e renderizzarlo con
`t(...)`: TypeScript segnala chiavi mancanti o improvvisate.

## Pubblicazione

Il sito è un **export statico** (`output: "export"` in `next.config.ts`) e
vive su GitHub Pages, nel repository **pubblico** `Domperazzo/lifeos-site`.
L'app iOS resta privata.

La sorgente però è una sola: questa cartella. `lifeos-site` non è una
copia da tenere allineata a mano — è **questa cartella pubblicata come
radice**, con `git subtree`:

```bash
# dalla radice del repository LifeOS
git subtree push --prefix=web lifeos-site main
```

Il push fa partire `.github/workflows/deploy-site.yml`, che builda e
pubblica. Nel repository di LifeOS quel workflow sta in
`web/.github/workflows/` — dove GitHub lo ignora, perché un workflow vale
solo se sta nella radice: dopo il subtree ci finisce, ed è l'unico posto
in cui deve girare.

⚠️ **Non modificare `lifeos-site` direttamente.** Le modifiche si fanno
qui e si pubblicano; il contrario costringe a un merge fra due storie che
`subtree` non sa raccontare.

Due variabili decidono gli indirizzi, e il workflow le calcola dal nome
del repository:

| Variabile | Cos'è | Esempio |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | la cartella sotto cui Pages pubblica | `/lifeos-site` |
| `NEXT_PUBLIC_SITE_ORIGIN` | schema e host, **senza** percorso | `https://domperazzo.github.io` |

Sono lette in un posto solo, `lib/site.ts`. **Non metterle insieme**: Next
antepone già `basePath` alle immagini dei metadata, quindi un
`metadataBase` che contiene il prefisso produce
`…/lifeos-site/lifeos-site/opengraph-image.png`. È già successo.

`public/.nojekyll` non è un file dimenticato: senza, GitHub Pages passa
tutto per Jekyll, che **ignora le cartelle che iniziano con `_`** — cioè
`_next`, cioè tutto il CSS e tutto il JavaScript.

L'icona e l'immagine di anteprima sono PNG statici in `app/`, non route
generate: un export statico le scriverebbe come file **senza estensione**,
e Pages li servirebbe come `application/octet-stream` — nessun crawler
accetta un'anteprima così.

## I device nei mockup

Due frame, un principio solo: `components/device/IPhoneMockup.tsx` e
`components/device/IPadMockup.tsx`. Le misure sono quelle vere —
402 × 874 punti per un iPhone 16 Pro, 1210 × 834 per un iPad Pro 11" in
orizzontale — e tutto dentro è una frazione della larghezza del device,
così il telefono regge a qualunque dimensione.

La chiave è `--ref` in `.ios-screen`: è la larghezza del display **in
punti**, e `--pt` ne discende. Un iPhone vale `--ref: 402`, un iPad
`--ref: 1210` (classe `.ipad-screen`). Non è un dettaglio tecnico: è ciò
che fa sì che 17pt siano *gli stessi* 17pt sui due device, e quindi che
sull'iPad il testo occupi meno larghezza. È la differenza fra un'app
universale e un iPhone stirato — la stessa che l'app ha risolto con
`DS.Layout`.

Nella sezione *Devices* i due device sono **alla stessa scala**: la
larghezza del telefono è `calc(var(--pad-w) * 0.332)`, cioè 402/1210. Se
si ingrandisse il telefono per far scena, la dimostrazione andrebbe persa.

## La sezione *Devices*

È l'unica interattiva del sito, e tiene **un solo stato** (`TabKey`) per
due device: la barra laterale dell'iPad e la tab bar dell'iPhone leggono
lo stesso valore. Nasce dalla fusione di *Devices* e della vecchia demo
*Have a look around*: separate, la sincronia — che è l'argomento della
sezione — non si poteva mostrare.

Le cinque sezioni hanno i nomi veri dell'app: **Oggi · Casa · Patrimonio ·
Calendario · Profilo** (`Section` in `RootView.swift`). ⚠️ Non
reintrodurre "Life" o "Tasks": non esistono nell'app.

I contenuti iPad stanno in `components/device/screens/ipad-content.tsx`,
uno per sezione. Sono gli stessi dati dell'iPhone in una colonna più
larga — dove il telefono mette due card per riga, qui ce ne stanno
quattro.

## Il logo

`components/ui/logo.tsx`: l'**icona vera dell'app** più il logotipo.

L'icona è quella di `ios/AppIcon.icon`, ritagliata (il disegno riempiva il
67% della tela, ora il 79% — la proporzione con cui Apple disegna le
icone) e ridotta a 128px, che copre un logo da 30pt anche su schermi 3×.

Sono **due** file, `lifeos-icon-light.png` e `lifeos-icon-dark.png`, e non
è un vezzo: l'icona di LifeOS ha un layer chiaro e uno scuro, e **il fondo
fa parte del disegno** — bianco di là, nero di qua. Una sola immagine
lascerebbe un rettangolo bianco sul fondo nero.

Sono `next/image` con import statico, mai `<img src="/…">`: il sito è
pubblicato sotto un prefisso, e un percorso assoluto scritto a mano non lo
riceve — l'immagine sparirebbe **solo in produzione**.

Il logotipo è testo vero: «Life» pieno, «OS» con `background-clip: text`
sui blu dell'icona (che nasce da `#0088FF`). I quattro colori stanno in
`globals.css` come `--wordmark-*`, quindi il tema li cambia da sé. La
classe `.wordmark-os` tiene un `color` pieno come ripiego: senza, in
contrasto forzato o in stampa il gradiente sparisce e resta testo
invisibile.

### La favicon

Tre file, non uno, e con **due ritagli diversi**:

| File | Misura | Ritaglio | Dove si vede |
|---|---|---|---|
| `app/icon.png` | 32 | stretto (940) | la scheda del browser |
| `app/icon1.png` | 180 | icona (1160) | segnalibri, scorciatoie |
| `app/apple-icon.png` | 180 | icona (1160) | schermata Home di iOS |

Il ritaglio stretto non è un'incoerenza: a 32px il margine dell'icona
mangia metà del quadrato e l'anello diventa una macchia. È correzione
ottica — un marchio piccolo si disegna più pieno di uno grande.

Dichiararne solo uno da 192px non basta: il browser lo rimpicciolisce da
sé a 16px, e lo fa peggio di quanto lo faccia un file preparato alla
misura giusta.

⚠️ **Le favicon restano in cache in modo tenace**, per origine e non per
pagina: dopo un cambio il browser può mostrare la vecchia per giorni. Il
file servito si controlla così, che ignora la cache:

```bash
curl -s https://domperazzo.github.io/lifeos-site/icon.png | shasum -a 256
```

### L'immagine di anteprima

`app/opengraph-image.png` è un PNG statico, generato una volta con Chrome
headless a partire da `scripts/opengraph.html`:

```bash
node scripts/render-opengraph.mjs
```

Non è generata da `next/og`: satori non ha un font in grassetto e il
titolo usciva sottile. Chrome ha i font veri.

## Le tre regole che il codice segue

1. **I token vengono dall'app.** Le tinte delle sei aree, i raggi e la
   scala di spaziatura sono quelli di
   `ios/LifeCore/Sources/LifeCore/DesignSystem`. In `app/globals.css`
   stanno come variabili CSS; cambiarle qui non cambia l'app, ma
   divergere è un bug.

2. **Le schermate nei device si scrivono in punti.** `.ios-screen` è un
   container e definisce `--pt`, che vale un punto del display di un
   iPhone 16 Pro (402pt). Dentro si scrive `calc(var(--pt) * 17)`, non
   `text-sm`: così un mockup grande e uno piccolo sono la stessa
   schermata, non un'immagine ingrandita.

3. **Il primo render è identico sul server e sul client.**
   `useReducedMotion()` non deve comparire nello stato *iniziale* di
   un'animazione né nel testo reso: sul server quella preferenza non
   esiste, e usarla lì fa fallire l'idratazione (è già successo, con
   l'anello del Life Score e il grafico del patrimonio). La preferenza si
   applica alla **transizione** — c'è `reducedTransition()` in
   `components/ui/reveal.tsx`.

## Affermazioni sulla privacy

La sezione *Your life belongs to you* dice solo cose verificabili nel
codice dell'app. I riferimenti sono in `docs/LifeCloud_Privacy_Model.md`
(§1-§3, §9, §11). Prima di aggiungere una riga lì, va trovata la sua
prova; le funzionalità non ancora presenti stanno nella sezione
*roadmap*, dichiarate come tali.

## Dati

Tutto quello che si vede è in `lib/data.ts`: un solo insieme coerente,
riusato da sezioni e schermate, così che il patrimonio del hero e quello
della sezione Finance siano lo stesso numero.

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
```

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
lib/                 dati dimostrativi, formattazione, store del tema
hooks/               media query, tema
```

## Pubblicazione

Il sito è un **export statico** (`output: "export"` in `next.config.ts`) e
va su GitHub Pages tramite `.github/workflows/deploy-site.yml`, che parte
a ogni push su `main` che tocca `web/`.

Due variabili decidono gli indirizzi, e il workflow le calcola da sé:

| Variabile | Cos'è | Esempio |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | la cartella sotto cui Pages pubblica | `/LifeOS` |
| `NEXT_PUBLIC_SITE_ORIGIN` | schema e host, **senza** percorso | `https://domperazzo.github.io` |

Sono lette in un posto solo, `lib/site.ts`. **Non metterle insieme**: Next
antepone già `basePath` alle immagini dei metadata, quindi un
`metadataBase` che contiene il prefisso produce
`…/LifeOS/LifeOS/opengraph-image.png`. È già successo.

`public/.nojekyll` non è un file dimenticato: senza, GitHub Pages passa
tutto per Jekyll, che **ignora le cartelle che iniziano con `_`** — cioè
`_next`, cioè tutto il CSS e tutto il JavaScript.

L'icona e l'immagine di anteprima sono PNG statici in `app/`, non route
generate: un export statico le scriverebbe come file **senza estensione**,
e Pages li servirebbe come `application/octet-stream` — nessun crawler
accetta un'anteprima così.

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

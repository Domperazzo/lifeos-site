/**
 * Rigenera `app/opengraph-image.png` da `scripts/opengraph.html`.
 *
 * Serve Chrome installato e `puppeteer-core`; è uno strumento manuale, non
 * un passo della build — l'immagine cambia una volta ogni tanto e sta nel
 * repository come file, così la build non dipende da un browser.
 *
 *   npx puppeteer-core@latest >/dev/null 2>&1 || npm i -D puppeteer-core
 *   node scripts/render-opengraph.mjs
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";

const here = dirname(fileURLToPath(import.meta.url));
const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`file://${join(here, "opengraph.html")}`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: join(here, "..", "app", "opengraph-image.png") });
await browser.close();
console.log("app/opengraph-image.png rigenerata");

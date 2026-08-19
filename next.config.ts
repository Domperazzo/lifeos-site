import type { NextConfig } from "next";

/*
 * Il sito è un export statico: nessun server, solo file.
 *
 * `NEXT_PUBLIC_BASE_PATH` serve a GitHub Pages, che pubblica un progetto
 * sotto `/<nome-repo>/` invece che sulla radice del dominio. Senza, ogni
 * riferimento a `/_next/...` punterebbe alla radice e la pagina uscirebbe
 * senza CSS. Vuoto (dominio proprio o sito utente) = nessun prefisso.
 *
 * `NEXT_PUBLIC_SITE_ORIGIN` (schema e host, senza percorso) completa il
 * quadro per canonical e anteprime, che devono essere URL assoluti. Le
 * due variabili sono lette in un posto solo: `lib/site.ts`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // GitHub Pages serve /foo/ come /foo/index.html: con le barre finali
  // i percorsi combaciano invece di dipendere da una redirezione.
  trailingSlash: true,
};

export default nextConfig;

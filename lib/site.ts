/**
 * Gli indirizzi pubblici del sito, in un posto solo.
 *
 * Servono tre valori diversi e confonderli è facile — è già successo:
 * `metadataBase` con dentro il prefisso produceva
 * `…/LifeOS/LifeOS/opengraph-image.png`, perché Next il prefisso lo
 * aggiunge **già** ai file dei metadata. Quindi:
 *
 * - `siteOrigin` è **solo** lo schema e l'host: è la base da cui Next
 *   risolve gli URL assoluti;
 * - `basePath` è la cartella sotto cui il sito è pubblicato — GitHub
 *   Pages serve un progetto sotto `/<nome-repo>/`. Next lo antepone da sé
 *   agli asset e alle immagini dei metadata;
 * - `canonicalPath` è quello che va scritto a mano dove Next **non**
 *   mette il prefisso: il canonical e l'URL OpenGraph.
 */
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const canonicalPath = `${basePath}/`;

export const italianCanonicalPath = `${basePath}/it/`;

export const siteUrl = `${siteOrigin}${canonicalPath}`;

export const italianSiteUrl = `${siteOrigin}${italianCanonicalPath}`;

export const siteDescription =
  "LifeOS brings your home, finances, routines and priorities into one intelligent system designed to help you stay in control of your life.";

export const siteTitle = "LifeOS — Your Life. One Operating System.";

export const italianSiteDescription =
  "LifeOS riunisce casa, patrimonio, routine e priorità in un unico sistema intelligente progettato per aiutarti a mantenere il controllo della tua vita.";

export const italianSiteTitle = "LifeOS — La tua vita. Un solo sistema operativo.";

export const locales = ["en", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function localePath(locale: Locale): string {
  return locale === "it" ? "/it/" : "/";
}

/**
 * La route decide la lingua prima dell'idratazione. Il sito è statico,
 * quindi non esiste un server che possa impostare l'attributo `lang` in
 * base alla richiesta: questo script lo allinea prima del primo paint.
 */
export const localeInitScript = `
  (function () {
    var parts = window.location.pathname.split("/").filter(Boolean);
    document.documentElement.lang = parts[parts.length - 1] === "it" ? "it" : "en";
  })();
`;

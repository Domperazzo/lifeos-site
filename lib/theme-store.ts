export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "lifeos-theme";

/**
 * Il tema vive sul `documentElement`, non in React: lo scrive uno script
 * prima del primo paint, per non far lampeggiare la pagina. React lo
 * *legge* come sorgente esterna — è l'unico modo di avere una sola verità
 * invece di due che si rincorrono.
 */
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function subscribeToTheme(listener: () => void) {
  listeners.add(listener);

  // Il sistema comanda finché l'utente non ha scelto.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (readStoredTheme()) return;
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    notify();
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
  };
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** In SSR il tema non è conoscibile: si assume chiaro e lo script corregge. */
export function getServerTheme(): Theme {
  return "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* modalità privata: la scelta vale per questa sessione */
  }
  notify();
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

/** Lo script inline eseguito prima del primo paint. */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = stored === "light" || stored === "dark" ? stored : system;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

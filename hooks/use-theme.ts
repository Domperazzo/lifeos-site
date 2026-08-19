"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeToTheme,
  type Theme,
} from "@/lib/theme-store";

/**
 * Il tema letto dal DOM come sorgente esterna.
 *
 * Non esiste un provider con dello stato: la verità è l'attributo
 * `data-theme` sull'elemento radice, scritto da uno script prima del primo
 * paint per non far lampeggiare la pagina. Qui lo si osserva e basta —
 * due copie della stessa verità finirebbero per divergere.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  const toggle = useCallback(() => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggle };
}

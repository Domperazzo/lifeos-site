"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * `matchMedia` come stato React.
 *
 * Passa da `useSyncExternalStore` e non da `useEffect` + `setState`: la
 * media query è una sorgente esterna, e leggerla in un effetto costringe
 * a un secondo render a ogni montaggio. In SSR lo snapshot è `false`.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

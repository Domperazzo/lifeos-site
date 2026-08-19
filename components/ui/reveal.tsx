"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

const elements = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
} as const;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView"> {
  /** Ritardo in secondi, per gli ingressi a cascata. */
  delay?: number;
  /** Spostamento verticale iniziale in px. */
  y?: number;
  /** L'elemento HTML da usare: dentro una lista dev'essere `li`. */
  as?: keyof typeof elements;
}

/**
 * L'ingresso standard del sito: dissolvenza più una traslazione minima.
 *
 * Con «riduci movimento» resta la sola dissolvenza. Lo spostamento non
 * sparisce dallo stato iniziale — sparisce dalla **transizione**, che è
 * l'unico modo di ottenerlo senza rendere il primo render diverso fra
 * server e client: `useReducedMotion()` sul server è una preferenza che
 * non esiste, e usarla lì dentro faceva fallire l'idratazione.
 */
export function reducedTransition(base: Transition, reduceMotion: boolean | null): Transition {
  if (!reduceMotion) return base;
  return { ...base, y: { duration: 0 }, x: { duration: 0 }, scale: { duration: 0 }, rotate: { duration: 0 } };
}

export function Reveal({
  delay = 0,
  y = 14,
  as = "div",
  className,
  children,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  // Il tipo degli handler dipende dal tag scelto a runtime: qui il
  // componente è uno di quattro noti, e i props sono sempre gli stessi.
  const Element = elements[as] as typeof motion.div;

  return (
    <Element
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={reducedTransition(
        { duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] },
        reduceMotion,
      )}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Element>
  );
}

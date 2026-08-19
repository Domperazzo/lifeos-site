"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  /** Durata in secondi. */
  duration?: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Un numero che sale fino al suo valore quando entra nel viewport.
 *
 * Il valore vive in una `MotionValue`, non nello stato di React: il testo
 * viene scritto direttamente nel nodo, senza un render per fotogramma. È
 * anche il motivo per cui il primo render è **identico** sul server e sul
 * client — la versione a stato leggeva «riduci movimento» durante il
 * render, e quella preferenza sul server non esiste: partiva da 87 di là e
 * da 0 di qua, e React buttava via l'albero idratato.
 *
 * Con «riduci movimento» attivo il valore finale compare subito: una cifra
 * che scorre è movimento a tutti gli effetti.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const count = useMotionValue(from);
  const text = useTransform(count, (value) => value.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration, count]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {text}
    </motion.span>
  );
}

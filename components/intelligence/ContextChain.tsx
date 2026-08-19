"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { contextChain } from "@/lib/data";

/**
 * Le fonti che LifeOS legge, una sotto l'altra, unite da una linea che
 * scende fino al nodo del sistema. È un diagramma, non un elenco: la
 * convergenza è il punto della sezione.
 */
export function ContextChain() {
  const reduceMotion = useReducedMotion();

  return (
    // `self-start`: senza, la colonna si stira per pareggiare la card
    // accanto e la linea di connessione tira dritto oltre il nodo.
    <div className="relative self-start">
      {/* La linea che unisce le fonti. */}
      <motion.span
        aria-hidden
        className="absolute left-[7px] top-3 w-px origin-top bg-gradient-to-b from-line-strong via-line-strong to-accent"
        style={{ height: "calc(100% - 2.4rem)" }}
        initial={{ scaleY: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
      />

      <ul className="flex flex-col gap-5">
        {contextChain.map((source, index) => (
          <motion.li
            key={source.label}
            initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.45, delay: 0.12 * index }}
            className="relative flex items-baseline gap-4 pl-8"
          >
            <span className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-line-strong bg-bg" />
            <span className="w-[5.5rem] shrink-0 text-[15px] font-medium">{source.label}</span>
            <span className="text-[14px] text-ink-tertiary">{source.note}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative mt-6 flex items-center gap-4 pl-[1px]"
      >
        <span
          className="grid size-[30px] shrink-0 place-items-center rounded-full text-bg"
          style={{ background: "var(--text)" }}
        >
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-[15px] font-semibold">LifeOS</p>
          <p className="text-[13.5px] text-ink-secondary">
            Reads all five together, then decides what to do.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

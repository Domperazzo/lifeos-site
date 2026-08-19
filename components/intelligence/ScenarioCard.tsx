"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { scenarioActions } from "@/lib/data";

/**
 * Lo scenario: un'ora, un fatto, e le conseguenze che compaiono una dopo
 * l'altra. Le spunte arrivano in sequenza perché è così che succede —
 * tutte insieme sarebbero un elenco, non un'esecuzione.
 */
export function ScenarioCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.6 }}
      className="card overflow-hidden p-6 shadow-[var(--shadow-md)] sm:p-8"
    >
      <div className="flex items-baseline gap-3">
        <span className="tabular text-[15px] font-semibold">08:15</span>
        <span className="text-[13px] text-ink-tertiary">Tuesday morning</span>
      </div>

      <p className="mt-4 text-[clamp(1.25rem,2.6vw,1.6rem)] font-semibold leading-snug tracking-[-0.02em]">
        Federico and Luna left home.
      </p>

      <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink-secondary">
        Nobody is in. Nothing is booked before 16:30. The living room is behind
        on cleaning. LifeOS puts those three facts together.
      </p>

      <ul className="mt-7 flex flex-col gap-2.5">
        {scenarioActions.map((action, index) => (
          <motion.li
            key={action}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.4, delay: 0.35 + index * 0.18 }}
            className="flex items-center gap-3 rounded-xl bg-surface-muted px-4 py-3"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-finance text-white">
              <Check className="size-3" strokeWidth={3.2} />
            </span>
            <span className="text-[14.5px]">{action}</span>
          </motion.li>
        ))}
      </ul>

      <p className="mt-6 text-[13px] text-ink-tertiary">
        Every automated action is logged, and can be undone.
      </p>
    </motion.div>
  );
}

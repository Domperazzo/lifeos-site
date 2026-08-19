"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const examples = [
  { trigger: "You and Luna left home", action: "Vacuum started" },
  { trigger: "Nobody home", action: "Security mode enabled" },
  { trigger: "Laundry cycle completed", action: "Reminder created" },
];

/** Tre automazioni contestuali, scritte come le legge l'utente: causa → effetto. */
export function SmartHomeExamples() {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="mt-2 flex flex-col gap-2.5">
      {examples.map((example, index) => (
        <motion.li
          key={example.trigger}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.45, delay: index * 0.12 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-line bg-surface px-4 py-3.5"
        >
          <span className="text-[14.5px] text-ink-secondary">{example.trigger}</span>
          <ArrowRight className="size-3.5 shrink-0 text-ink-tertiary" />
          <span className="text-[14.5px] font-medium">{example.action}</span>
        </motion.li>
      ))}
    </ul>
  );
}

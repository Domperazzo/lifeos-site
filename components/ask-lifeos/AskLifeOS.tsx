"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { askExamples } from "@/lib/data";
import { Section, SectionHeading } from "@/components/ui/section";
import { IPhoneMockup } from "@/components/device/IPhoneMockup";
import { AskScreen } from "@/components/device/screens/AskScreen";
import { cn } from "@/lib/utils";

/**
 * Ask LifeOS.
 *
 * Le domande si possono toccare: finché nessuno lo fa, scorrono da sole
 * per mostrare che le risposte sono tre cose diverse — un importo, uno
 * stato, una decisione. Al primo tocco il ciclo si ferma e comanda
 * l'utente.
 */
export function AskLifeOS() {
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (pinned || reduceMotion) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % askExamples.length), 5600);
    return () => clearInterval(timer);
  }, [pinned, reduceMotion]);

  const current = askExamples[index];

  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Ask LifeOS"
            title="Ask your life anything."
            lead="Not a chatbot with opinions. A system that already holds your accounts, your rooms and your week, answering from what it actually knows."
          />

          <div className="mt-9 flex flex-col gap-2.5">
            {askExamples.map((example, exampleIndex) => {
              const active = exampleIndex === index;
              return (
                <button
                  key={example.question}
                  type="button"
                  onClick={() => {
                    setIndex(exampleIndex);
                    setPinned(true);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors",
                    active
                      ? "border-line-strong bg-surface shadow-[var(--shadow-sm)]"
                      : "border-line bg-transparent hover:bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[13px] transition-colors",
                      active ? "text-accent" : "text-ink-tertiary",
                    )}
                  >
                    &gt;
                  </span>
                  <span className="text-[15px] text-ink-secondary group-hover:text-ink">
                    {example.question}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 min-h-[3.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.question}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={{ duration: 0.28 }}
                className="text-[15px] leading-relaxed text-ink-tertiary"
              >
                <span className="font-medium text-ink">{current.answer}</span>{" "}
                {current.detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <IPhoneMockup
            width="clamp(232px, 62vw, 292px)"
            label="Asking LifeOS a question about your own data"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.question}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <AskScreen {...current} />
              </motion.div>
            </AnimatePresence>
          </IPhoneMockup>
        </div>
      </div>
    </Section>
  );
}

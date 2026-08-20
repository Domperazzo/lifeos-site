"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { House } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * «Checking home…» → «Everything under control».
 *
 * La transizione dura un attimo e succede una volta sola: serve a
 * mostrare che lo stato viene *letto*, non scritto in una slide. Con
 * «riduci movimento» attivo si parte già dallo stato finale.
 */
export function HomeStatusTile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();
  const [checked, setChecked] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    if (!inView) return;
    // Con «riduci movimento» non si toglie il passaggio: si toglie l'attesa.
    const timer = setTimeout(() => setChecked(true), reduceMotion ? 0 : 900);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

  return (
    <div ref={ref} className="flex flex-1 flex-col rounded-[18px] bg-surface-muted p-5">
      <div className="flex items-center gap-2.5">
        <span
          className="grid size-7 place-items-center rounded-[8px]"
          style={{
            background: "color-mix(in srgb, var(--area-home) 16%, transparent)",
            color: "var(--area-home)",
          }}
        >
          <House className="size-4" />
        </span>
        <span className="text-[13px] font-medium text-ink-secondary">{t("Home")}</span>
      </div>

      <div className="mt-4 min-h-[52px]">
        <AnimatePresence mode="wait" initial={false}>
          {checked ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-[15px] font-semibold">{t("Everything under control")}</p>
              <p className="mt-1.5 text-[13px] text-ink-secondary">
                {t("6 rooms · no overdue tasks · door locked")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="checking"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-[15px] text-ink-tertiary"
            >
              <motion.span
                className="size-2 rounded-full bg-home"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
              {t("Checking home…")}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

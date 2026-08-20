"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { areaColor, automationTimeline } from "@/lib/data";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * La giornata come timeline.
 *
 * Il segmento di collegamento appartiene a ogni evento tranne l'ultimo: una
 * linea sola, tirata da cima a fondo del contenitore, finirebbe sotto
 * l'ultimo punto senza arrivare da nessuna parte. Ogni segmento si riempie
 * quando lo scroll lo raggiunge — il sistema lavora nel tempo, non tutto
 * insieme.
 */
export function AutomationTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { t } = useI18n();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 65%"],
  });

  return (
    <ol ref={ref} className="timeline relative flex flex-col gap-8 sm:gap-10">
      {automationTimeline.map((event, index) => (
        <TimelineEvent
          key={event.time}
          event={event}
          index={index}
          total={automationTimeline.length}
          progress={scrollYProgress}
          title={t(event.title)}
          detail={t(event.detail)}
        />
      ))}
    </ol>
  );
}

function TimelineEvent({
  event,
  index,
  total,
  progress,
  title,
  detail,
}: {
  event: (typeof automationTimeline)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  detail: string;
}) {
  const reduceMotion = useReducedMotion();
  const isLast = index === total - 1;

  // Ogni segmento copre la propria fetta dello scroll della lista.
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);

  return (
    <motion.li
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18% 0px" }}
      transition={{ duration: 0.5 }}
      className="relative flex gap-6 pl-9"
    >
      <span
        className="absolute left-0 top-1 size-[19px] rounded-full border-4 border-bg"
        style={{ background: areaColor[event.area] }}
      />

      {!isLast && (
        <>
          <span
            aria-hidden
            className="absolute left-[9px] top-[22px] w-px bg-line-strong"
            style={{ bottom: "calc(-1 * var(--timeline-gap))" }}
          />
          <motion.span
            aria-hidden
            className="absolute left-[9px] top-[22px] w-px origin-top bg-ink/40"
            style={{
              bottom: "calc(-1 * var(--timeline-gap))",
              scaleY: reduceMotion ? 1 : fill,
            }}
          />
        </>
      )}

      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="tabular w-14 shrink-0 text-[14px] font-semibold text-ink-tertiary">
          {event.time}
        </span>
        <span>
          <span className="block text-[16.5px] font-medium">{title}</span>
          <span className="mt-1 block text-[14px] text-ink-secondary">{detail}</span>
        </span>
      </div>
    </motion.li>
  );
}

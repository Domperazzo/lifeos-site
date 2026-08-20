"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IPadMockup } from "@/components/device/IPadMockup";
import { IPhoneMockup } from "@/components/device/IPhoneMockup";
import { IPadScreen } from "@/components/device/screens/IPadScreen";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * iPad e iPhone insieme, alla **stessa scala**.
 *
 * È il punto della sezione: se il telefono fosse ingrandito per far
 * scena, la dimostrazione — 17pt sono gli stessi 17pt sui due schermi —
 * andrebbe persa. Le due larghezze stanno nel rapporto vero fra i due
 * device (1210 e 402 punti), e il telefono si sovrappone all'angolo del
 * tablet come su una scrivania.
 */
export function DeviceComposition() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const padY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [58, -34]);

  return (
    <div
      ref={ref}
      className="relative mt-14 flex justify-center pb-[8%] sm:mt-20"
      // Una scala sola per i due device: il telefono è 402/1210 del
      // tablet, e resta tale a qualunque misura del contenitore.
      style={{ "--pad-w": "min(94vw, 760px)" } as React.CSSProperties}
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ y: reduceMotion ? 0 : padY }}
        className="relative"
      >
        <IPadMockup width="var(--pad-w)" label={t("LifeOS on iPad, with the sidebar")}>
          <IPadScreen />
        </IPadMockup>
      </motion.div>

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 46, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ y: reduceMotion ? 0 : phoneY }}
        // Sotto `sm` il telefono sparisce: due device sovrapposti in 390px
        // sono due schermate illeggibili invece di una leggibile, e il
        // confronto barra laterale / tab bar lo fanno le tre frasi sotto.
        className="absolute bottom-[8%] right-0 z-10 hidden translate-x-[6%] translate-y-[16%] sm:block"
      >
        <IPhoneMockup
          width="calc(var(--pad-w) * 0.332)"
          label={t("LifeOS on iPhone")}
        >
          <LifeScreen />
        </IPhoneMockup>
      </motion.div>
    </div>
  );
}

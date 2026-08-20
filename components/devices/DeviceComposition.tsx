"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IPadMockup } from "@/components/device/IPadMockup";
import { IPhoneMockup } from "@/components/device/IPhoneMockup";
import { IPadScreen } from "@/components/device/screens/IPadScreen";
import { TabBar, type TabKey } from "@/components/device/ios/TabBar";
import { CalendarScreen } from "@/components/device/screens/CalendarScreen";
import { FinanceScreen } from "@/components/device/screens/FinanceScreen";
import { HomeScreen } from "@/components/device/screens/HomeScreen";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { ProfileScreen } from "@/components/device/screens/ProfileScreen";
import { useI18n } from "@/components/i18n/I18nProvider";

const phoneScreens: Record<TabKey, React.ReactNode> = {
  today: <LifeScreen withTabBar={false} />,
  home: <HomeScreen withTabBar={false} />,
  finance: <FinanceScreen withTabBar={false} />,
  calendar: <CalendarScreen withTabBar={false} />,
  profile: <ProfileScreen withTabBar={false} />,
};

export const tints: Record<TabKey, string> = {
  today: "var(--area-home)",
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  calendar: "var(--area-goals)",
  profile: "var(--area-family)",
};

/**
 * iPad e iPhone insieme, **alla stessa scala** e sulla **stessa sezione**.
 *
 * La scala è il punto: il telefono è 402/1210 del tablet, il rapporto vero
 * fra i due display. Ingrandirlo per far scena distruggerebbe la
 * dimostrazione — 17pt sono gli stessi 17pt sui due schermi, e sull'iPad
 * occupano meno larghezza.
 *
 * La sincronia è l'altro punto: un solo stato muove la barra laterale del
 * tablet e la tab bar del telefono. È la stessa app, e si vede perché la
 * stessa scelta arriva ai due device in due forme diverse.
 */
export function DeviceComposition({
  active,
  onSelect,
}: {
  active: TabKey;
  onSelect: (key: TabKey) => void;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const padY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [58, -34]);

  const fade = {
    initial: { opacity: 0, scale: reduceMotion ? 1 : 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: reduceMotion ? 1 : 1.006 },
    transition: { duration: 0.26, ease: [0.22, 0.61, 0.36, 1] as const },
    className: "absolute inset-0",
  };

  return (
    <div
      ref={ref}
      className="relative flex justify-center pb-[8%]"
      // Una scala sola per i due device, a qualunque misura.
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
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} {...fade}>
              <IPadScreen active={active} />
            </motion.div>
          </AnimatePresence>
        </IPadMockup>
      </motion.div>

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 46, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ y: reduceMotion ? 0 : phoneY }}
        // Sotto `sm` il telefono sparisce: due device sovrapposti in 390px
        // sono due schermate illeggibili invece di una leggibile, e i
        // comandi restano quelli fuori dal device.
        className="absolute bottom-[8%] right-0 z-10 hidden translate-x-[6%] translate-y-[16%] sm:block"
      >
        <IPhoneMockup
          interactive
          width="calc(var(--pad-w) * 0.332)"
          label={t("LifeOS on iPhone")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} {...fade}>
              {phoneScreens[active]}
            </motion.div>
          </AnimatePresence>
          <TabBar active={active} onSelect={onSelect} tint={tints[active]} />
        </IPhoneMockup>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IPhoneMockup } from "@/components/device/IPhoneMockup";
import { TabBar, tabs, type TabKey } from "@/components/device/ios/TabBar";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { HomeScreen } from "@/components/device/screens/HomeScreen";
import { FinanceScreen } from "@/components/device/screens/FinanceScreen";
import { TasksScreen } from "@/components/device/screens/TasksScreen";
import { ProfileScreen } from "@/components/device/screens/ProfileScreen";
import { SectionHeading } from "@/components/ui/section";

const screens: Record<TabKey, React.ReactNode> = {
  life: <LifeScreen withTabBar={false} />,
  home: <HomeScreen withTabBar={false} />,
  finance: <FinanceScreen withTabBar={false} />,
  tasks: <TasksScreen withTabBar={false} />,
  profile: <ProfileScreen withTabBar={false} />,
};

const tints: Record<TabKey, string> = {
  life: "var(--area-home)",
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  tasks: "var(--area-goals)",
  profile: "var(--area-family)",
};

const captions: Record<TabKey, string> = {
  life: "The day, read across every area at once.",
  home: "Six rooms, and only what is behind.",
  finance: "One number, and what it is made of.",
  tasks: "Three things — not the other eleven.",
  profile: "Who you share with, and what stays yours.",
};

/**
 * La demo: la tab bar del telefono è vera, e cambia la schermata dentro
 * il device. Non replica l'app — mostra come si muove.
 */
export function ProductDemo() {
  const [active, setActive] = useState<TabKey>("life");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line"
      />
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Product"
          title="Have a look around."
          lead="Tap through the app. Everything here is demonstration data, laid out exactly as LifeOS lays it out."
        />

        <div className="mt-14 flex flex-col items-center gap-8">
          {/* Selettore accessibile fuori dal device: sul telefono i tocchi
              sono comodi, ma con la tastiera serve un bersaglio vero. */}
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                aria-pressed={active === tab.key}
                className="rounded-full border px-4 py-2 text-[14px] font-medium transition-colors"
                style={{
                  borderColor: active === tab.key ? "transparent" : "var(--border)",
                  background:
                    active === tab.key
                      ? `color-mix(in srgb, ${tints[tab.key]} 14%, transparent)`
                      : "transparent",
                  color: active === tab.key ? tints[tab.key] : "var(--text-secondary)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <IPhoneMockup
            interactive
            width="clamp(250px, 74vw, 320px)"
            label={`LifeOS — ${active} screen`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.008 }}
                transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-0"
              >
                {screens[active]}
              </motion.div>
            </AnimatePresence>
            <TabBar active={active} onSelect={setActive} tint={tints[active]} />
          </IPhoneMockup>

          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="text-center text-[14.5px] text-ink-tertiary"
            >
              {captions[active]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

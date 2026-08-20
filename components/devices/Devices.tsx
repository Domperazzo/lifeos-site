"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { tabs, type TabKey } from "@/components/device/ios/TabBar";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MessageKey } from "@/lib/i18n/messages";
import { DeviceComposition, tints } from "./DeviceComposition";

/*
  Cosa può essere detto qui, e perché.

  L'app è `TARGETED_DEVICE_FAMILY = "1,2"` — iPhone e iPad — con
  deployment target iOS 18. Su schermo largo le cinque sezioni diventano
  una barra laterale (`.tabViewStyle(.sidebarAdaptable)` in RootView) e il
  contenuto ha un tetto di 700 punti (`DS.Layout.readableWidth`). Sono le
  tre affermazioni in fondo, e stanno tutte nel codice dell'app.

  Quello che NON si dice: Apple Watch e Mac. Non esiste un target per
  nessuno dei due — l'orologio sta fra le aree future, dichiarato tale.
*/
const facts = [
  {
    title: "The sidebar isn't a stretched tab bar",
    detail:
      "On a wide screen the five sections move into a sidebar. Narrow the window to a third and they become a tab bar again — LifeOS follows the size, not the name of the device.",
  },
  {
    title: "Text keeps a readable measure",
    detail:
      "Content stops at 700 points and centres. A task and its time never end up half a metre apart, which is the reason typography has had a line length for five centuries.",
  },
  {
    title: "One app, not two",
    detail:
      "Same code, same data, same iCloud. Start something on the iPhone and finish it on the iPad — there is nothing to keep in sync between them.",
  },
] as const;

const captions: Record<TabKey, MessageKey> = {
  today: "The day, read across every area at once.",
  home: "Six rooms, and only what is behind.",
  finance: "One number, and what it is made of.",
  calendar: "Chores, appointments and deadlines, in one day.",
  profile: "Who you share with, and what stays yours.",
};

/**
 * Una sezione sola per due cose che erano due: su quali dispositivi gira
 * LifeOS, e com'è fatto dentro.
 *
 * Stanno insieme perché sono la stessa dimostrazione: un comando solo
 * cambia sezione, e i due device rispondono ciascuno nella sua forma —
 * barra laterale di là, tab bar di qua. Separate, la sincronia non si
 * poteva mostrare.
 */
export function Devices() {
  const [active, setActive] = useState<TabKey>("today");
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <Section id="devices">
      <SectionHeading
        eyebrow={t("Devices")}
        title={
          <>
            {t("One app.")}
            <br />
            {t("iPhone and iPad.")}
          </>
        }
        lead={t(
          "LifeOS is a universal iOS app. Not an iPhone app blown up to fill a bigger screen — the layout changes because the screen changed.",
        )}
      />

      <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-4">
        <p className="text-center text-[14.5px] text-ink-tertiary">
          {t("Tap through the app. Everything here is demonstration data, laid out exactly as LifeOS lays it out.")}
        </p>

        {/* Il selettore sta fuori dal device: sul telefono i tocchi sono
            comodi, ma con la tastiera serve un bersaglio vero. */}
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
              {t(tab.label)}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 sm:mt-12">
        <DeviceComposition active={active} onSelect={setActive} />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          className="text-center text-[14.5px] text-ink-tertiary"
        >
          {t(captions[active])}
        </motion.p>
      </AnimatePresence>

      <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-10">
        {facts.map((fact, index) => (
          <Reveal key={fact.title} delay={index * 0.08} className="border-t border-line pt-5">
            <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{t(fact.title)}</h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-ink-secondary">
              {t(fact.detail)}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24} className="mt-10">
        <p className="text-[13.5px] text-ink-tertiary">
          {t("Requires iOS 18 or later. iPhone stays in portrait; iPad rotates.")}
        </p>
      </Reveal>
    </Section>
  );
}

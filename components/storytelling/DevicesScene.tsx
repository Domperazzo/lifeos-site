"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DeviceComposition, tints } from "@/components/devices/DeviceComposition";
import { tabs, type TabKey } from "@/components/device/ios/TabBar";
import { SceneCoda } from "./SceneCoda";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MessageKey } from "@/lib/i18n/messages";

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
 * Scena 10 — iPhone e iPad.
 *
 * L'unica scena del film in cui il visitatore comanda. L'ingresso è
 * cinematico — i due device salgono e si compongono con lo scroll — ma
 * quando la composizione si ferma i cinque pulsanti restano vivi.
 *
 * Il motivo per cui qui l'interazione serve e altrove no: la sincronia fra
 * barra laterale e tab bar è una *dimostrazione*, e una dimostrazione che
 * il visitatore non può innescare è solo un video. Un comando solo cambia
 * sezione, e i due device rispondono ciascuno nella sua forma.
 *
 * Il selettore sta fuori dai device: sul telefono i tocchi sono comodi, ma
 * con la tastiera serve un bersaglio vero.
 */
export function DevicesScene() {
  const [active, setActive] = useState<TabKey>("today");
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <section id="devices" data-scene="devices" className="editorial-scene scene-devices">
      <div className="editorial-inner devices-layout">
        <div data-devices-heading className="devices-heading">
          <p className="scene-kicker">{t("Devices")}</p>
          <h2>
            {t("One app.")}
            <br />
            {t("iPhone and iPad.")}
          </h2>
          <p>
            {t(
              "LifeOS is a universal iOS app. Not an iPhone app blown up to fill a bigger screen — the layout changes because the screen changed.",
            )}
          </p>
        </div>

        <div data-devices-controls className="devices-controls">
          <p>
            {t(
              "Tap through the app. Everything here is demonstration data, laid out exactly as LifeOS lays it out.",
            )}
          </p>
          <div className="devices-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                aria-pressed={active === tab.key}
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
        </div>

        <div data-devices-composition className="devices-composition">
          <DeviceComposition active={active} onSelect={setActive} />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="devices-caption"
          >
            {t(captions[active])}
          </motion.p>
        </AnimatePresence>
      </div>

      <SceneCoda tight title={t("Same app, two shapes.")}>
        <div className="devices-facts">
          {facts.map((fact) => (
            <article key={fact.title}>
              <h4>{t(fact.title)}</h4>
              <p>{t(fact.detail)}</p>
            </article>
          ))}
        </div>
        <p className="devices-requirement">
          {t("Requires iOS 18 or later. iPhone stays in portrait; iPad rotates.")}
        </p>
      </SceneCoda>
    </section>
  );
}

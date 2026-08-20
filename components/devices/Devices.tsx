"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/components/i18n/I18nProvider";
import { DeviceComposition } from "./DeviceComposition";

/*
  Cosa può essere detto qui, e perché.

  L'app è `TARGETED_DEVICE_FAMILY = "1,2"` — iPhone e iPad — con
  deployment target iOS 18. Su schermo largo le cinque sezioni diventano
  una barra laterale (`.tabViewStyle(.sidebarAdaptable)` in RootView) e il
  contenuto ha un tetto di 700 punti (`DS.Layout.readableWidth`). Sono le
  tre affermazioni qui sotto, e stanno tutte nel codice dell'app.

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

export function Devices() {
  const { t } = useI18n();

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

      <DeviceComposition />

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

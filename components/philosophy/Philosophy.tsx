"use client";

import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * La sezione editoriale: nessuna card, nessun dato, nessuna immagine.
 * Solo la frase che spiega perché il prodotto esiste — e lo spazio
 * attorno che la lascia respirare.
 */
export function Philosophy() {
  const { t } = useI18n();

  return (
    <section id="about" className="px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <h2 className="text-[clamp(2rem,5.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            {t("Software should adapt to your life.")}
            <span className="block text-ink-tertiary">{t("Not the other way around.")}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-12">
          <p className="text-[17px] leading-relaxed text-ink-secondary">
            {t("Most software asks you to keep it updated, organised and tidy. You end up maintaining the tool instead of the life it was supposed to help with.")}
          </p>
          <p className="text-[17px] leading-relaxed text-ink-secondary">
            {t("LifeOS is built the other way round. It learns how your life actually works — your rooms, your money, your week — and keeps everything aligned, so the system does the remembering.")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

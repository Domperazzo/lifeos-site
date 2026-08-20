"use client";

import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/components/i18n/I18nProvider";

export function FinalCTA() {
  const { locale, t } = useI18n();
  const subject = locale === "it" ? "LifeOS%20accesso%20anticipato" : "LifeOS%20early%20access";

  return (
    <section id="get-lifeos" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--area-home) 20%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal>
          <h2 className="text-[clamp(2.1rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            {t("Your life deserves a better operating system.")}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-secondary">
            {t("LifeOS is in private testing on iOS. Leave your email and you'll hear from us when the next round opens.")}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <CTA href={`mailto:hello@lifeos.app?subject=${subject}`} size="lg">
              {t("Get early access")}
              <ArrowRight className="size-4" />
            </CTA>
            <CTA href="#security" variant="secondary" size="lg">
              {t("Read the privacy model")}
            </CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

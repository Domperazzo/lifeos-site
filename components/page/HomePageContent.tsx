"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { CinematicStory } from "@/components/storytelling/CinematicStory";
import { Footer } from "@/components/footer/Footer";
import { useI18n } from "@/components/i18n/I18nProvider";

export function HomePageContent() {
  const { t } = useI18n();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-bg"
      >
        {t("Skip to content")}
      </a>
      <Navbar />
      <CinematicStory />
      <Footer />
    </>
  );
}

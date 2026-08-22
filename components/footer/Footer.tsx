"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="cinematic-footer">
      <div className="cinematic-footer-inner">
        <Link href="#top" aria-label={t("LifeOS, home")} className="text-[18px]">
          <Logo iconSize={24} />
        </Link>

        <nav aria-label={t("Footer navigation")}>
          <Link href="#security">{t("Privacy")}</Link>
          <a href="mailto:hello@lifeos.app">{t("Contact")}</a>
        </nav>

        <p>© {new Date().getFullYear()} LifeOS</p>
      </div>
    </footer>
  );
}

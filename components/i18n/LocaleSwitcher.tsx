"use client";

import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import { useI18n } from "./I18nProvider";

const options: { locale: Locale; label: string; ariaKey: "View site in English" | "View site in Italian" }[] = [
  { locale: "en", label: "EN", ariaKey: "View site in English" },
  { locale: "it", label: "IT", ariaKey: "View site in Italian" },
];

export function LocaleSwitcher() {
  const { locale, t } = useI18n();

  return (
    <nav
      aria-label={t("Choose language")}
      className="flex h-9 items-center rounded-full border border-line bg-surface/70 p-0.5"
    >
      {options.map((option) => {
        const active = option.locale === locale;
        return (
          <Link
            key={option.locale}
            href={localePath(option.locale)}
            scroll={false}
            hrefLang={option.locale}
            lang={option.locale}
            aria-label={t(option.ariaKey)}
            aria-current={active ? "page" : undefined}
            className="grid h-7 min-w-8 place-items-center rounded-full px-2 text-[11px] font-semibold tracking-[0.04em] transition-colors"
            style={{
              background: active ? "var(--text)" : "transparent",
              color: active ? "var(--bg)" : "var(--text-tertiary)",
            }}
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}

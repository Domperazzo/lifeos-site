"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/components/i18n/I18nProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("Switch to {appearance} appearance", { appearance: t(next) })}
      className={`relative grid size-9 place-items-center rounded-full text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink ${className ?? ""}`}
    >
        <span
          key={theme}
          className="theme-toggle-icon grid place-items-center"
        >
          {theme === "dark" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </span>
    </button>
  );
}

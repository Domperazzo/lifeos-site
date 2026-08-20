"use client";

import { CalendarDays, House, PieChart, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MessageKey } from "@/lib/i18n/messages";

export type TabKey = "life" | "home" | "finance" | "tasks" | "profile";

export const tabs: { key: TabKey; label: MessageKey; icon: typeof House }[] = [
  { key: "life", label: "Life", icon: Sun },
  { key: "home", label: "Home", icon: House },
  { key: "finance", label: "Finance", icon: PieChart },
  { key: "tasks", label: "Tasks", icon: CalendarDays },
  { key: "profile", label: "Profile", icon: User },
];

/**
 * La tab bar dell'app: capsula traslucida sopra il contenuto, voce attiva
 * dentro una pastiglia tinta. `onSelect` è opzionale — nei mockup statici
 * la barra è decorativa e non va nel percorso di tabulazione.
 */
export function TabBar({
  active,
  onSelect,
  tint = "var(--accent)",
}: {
  active: TabKey;
  onSelect?: (key: TabKey) => void;
  tint?: string;
}) {
  const interactive = Boolean(onSelect);
  const { t } = useI18n();

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 flex justify-center"
      style={{ paddingBottom: "calc(var(--pt) * 22)" }}
      aria-hidden={!interactive}
    >
      <div
        className="glass flex items-end justify-between rounded-full shadow-[0_2px_14px_rgb(10_16_23_/_0.1)]"
        style={{
          width: "calc(var(--pt) * 356)",
          padding: "calc(var(--pt) * 7) calc(var(--pt) * 8)",
          border: "1px solid var(--border)",
        }}
        role={interactive ? "tablist" : undefined}
      >
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          // Nei mockup la barra è disegno: un `button` che non fa niente
          // resta comunque un bersaglio del puntatore e una voce in più
          // nel DOM. Lì è un `div`, e basta.
          const Element = interactive ? "button" : "div";
          return (
            <Element
              key={key}
              {...(interactive
                ? {
                    type: "button" as const,
                    role: "tab",
                    "aria-selected": isActive,
                    onClick: () => onSelect?.(key),
                  }
                : {})}
              className={cn(
                "flex flex-1 flex-col items-center rounded-full transition-colors",
                interactive ? "cursor-pointer" : "cursor-default",
              )}
              style={{
                gap: "calc(var(--pt) * 3)",
                padding: "calc(var(--pt) * 5) 0",
                background: isActive ? `color-mix(in srgb, ${tint} 14%, transparent)` : undefined,
                color: isActive ? tint : "var(--text-tertiary)",
              }}
            >
              <Icon
                style={{ width: "calc(var(--pt) * 20)", height: "calc(var(--pt) * 20)" }}
                strokeWidth={isActive ? 2.3 : 1.9}
              />
              <span className="ios-caption">{t(label)}</span>
            </Element>
          );
        })}
      </div>
    </div>
  );
}

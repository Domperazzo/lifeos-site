"use client";

import { Plus } from "lucide-react";
import { areaColor, calendarDay, calendarWeek } from "@/lib/data";
import { IOSCard } from "../ios/primitives";
import {
  ScreenContent,
  ScreenShell,
  ScreenTitle,
  ScreenToolbar,
  ToolbarButton,
} from "./ScreenShell";
import { TabBar } from "../ios/TabBar";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Calendario: la settimana in cima, la giornata sotto.
 *
 * Non è un calendario generico — le voci portano la tinta dell'area da
 * cui vengono, perché in LifeOS un appuntamento, una pulizia e una
 * scadenza non sono tre app diverse.
 */
export function CalendarScreen({ withTabBar = true }: { withTabBar?: boolean }) {
  const { t } = useI18n();

  return (
    <>
      <ScreenShell tint="var(--area-goals)">
        <ScreenToolbar>
          <span />
          <ToolbarButton>
            <Plus style={{ width: "calc(var(--pt) * 15)" }} />
          </ToolbarButton>
        </ScreenToolbar>

        <ScreenTitle title={t("August")} subtitle={t("4 things today")} />

        <ScreenContent gap={12}>
          <WeekStrip />

          <div className="flex flex-col" style={{ gap: "calc(var(--pt) * 8)" }}>
            {calendarDay.map((entry) => (
              <IOSCard
                key={entry.title}
                padding={12}
                className="flex items-center"
                style={{ gap: "calc(var(--pt) * 11)" }}
              >
                <span
                  className="ios-caption tabular shrink-0 text-ink-tertiary"
                  style={{ width: "calc(var(--pt) * 34)" }}
                >
                  {entry.time}
                </span>
                <span
                  className="shrink-0 rounded-full"
                  style={{
                    width: "calc(var(--pt) * 3)",
                    height: "calc(var(--pt) * 26)",
                    background: areaColor[entry.area],
                  }}
                />
                <span className="flex-1">
                  <span className="ios-subhead block">{t(entry.title)}</span>
                  {entry.duration ? (
                    <span className="ios-caption block text-ink-tertiary">{entry.duration}</span>
                  ) : null}
                </span>
              </IOSCard>
            ))}
          </div>
        </ScreenContent>
      </ScreenShell>
      {withTabBar ? <TabBar active="calendar" tint="var(--area-goals)" /> : null}
    </>
  );
}

/** La settimana: sette colonne, i punti dicono quanto è pieno un giorno. */
function WeekStrip() {
  const { t } = useI18n();

  return (
    <IOSCard padding={12}>
      <div className="flex justify-between">
        {calendarWeek.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center"
            style={{ gap: "calc(var(--pt) * 6)" }}
          >
            <span className="ios-caption text-ink-tertiary">{t(day.day)}</span>
            <span
              className="grid place-items-center rounded-full tabular"
              style={{
                width: "calc(var(--pt) * 27)",
                height: "calc(var(--pt) * 27)",
                fontSize: "calc(var(--pt) * 14)",
                fontWeight: day.today ? 600 : 400,
                background: day.today ? "var(--area-goals)" : "transparent",
                color: day.today ? "#fff" : "var(--text)",
              }}
            >
              {day.date}
            </span>
            <span className="flex" style={{ gap: "calc(var(--pt) * 2)", height: "calc(var(--pt) * 4)" }}>
              {Array.from({ length: Math.min(day.count, 3) }).map((_, index) => (
                <span
                  key={index}
                  className="rounded-full bg-ink/25"
                  style={{ width: "calc(var(--pt) * 3)", height: "calc(var(--pt) * 3)" }}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </IOSCard>
  );
}

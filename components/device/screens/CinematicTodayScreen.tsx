"use client";

import { Clock3, House, ReceiptText, Sparkles } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { areaColor, lifeOverview, todayTasks } from "@/lib/data";
import { LifeScoreDial } from "../ios/LifeScoreDial";
import { TabBar } from "../ios/TabBar";
import { IOSCard } from "../ios/primitives";
import { ScreenContent, ScreenShell, ScreenTitle } from "./ScreenShell";

/** A denser Today composition with explicit focus targets for scroll storytelling. */
export function CinematicTodayScreen() {
  const { t } = useI18n();

  return (
    <>
      <ScreenShell tint="var(--area-home)">
        <ScreenTitle
          title={t("Good morning, {name}", { name: lifeOverview.user })}
          subtitle={t("Tuesday 18 August")}
        />

        <ScreenContent gap={11}>
          <div data-today-card="summary">
            <IOSCard className="flex items-center" style={{ gap: "calc(var(--pt) * 12)" }}>
              <LifeScoreDial value={lifeOverview.lifeScore} />
              <div>
                <p className="ios-headline">{t("Today looks good")}</p>
                <p
                  className="ios-footnote text-ink-secondary"
                  style={{ marginTop: "calc(var(--pt) * 4)" }}
                >
                  {t("Nothing overdue. You have 3 priorities and a free afternoon until 16:30.")}
                </p>
              </div>
            </IOSCard>
          </div>

          <div data-today-card="priorities">
            <IOSCard padding={12}>
              <div className="flex items-center justify-between">
                <p className="ios-headline">{t("3 things need your attention")}</p>
                <Sparkles
                  style={{ width: "calc(var(--pt) * 16)", color: "var(--area-goals)" }}
                />
              </div>
              <div
                className="flex flex-col"
                style={{ gap: "calc(var(--pt) * 8)", marginTop: "calc(var(--pt) * 10)" }}
              >
                {todayTasks.map((task) => (
                  <div key={task.title} className="flex items-center" style={{ gap: "calc(var(--pt) * 8)" }}>
                    <span
                      className="rounded-full"
                      style={{
                        width: "calc(var(--pt) * 7)",
                        height: "calc(var(--pt) * 7)",
                        background: areaColor[task.area],
                      }}
                    />
                    <p className="ios-subhead flex-1">{t(task.title)}</p>
                    <span className="ios-caption text-ink-tertiary">{t(task.meta)}</span>
                  </div>
                ))}
              </div>
            </IOSCard>
          </div>

          <div className="grid grid-cols-2" style={{ gap: "calc(var(--pt) * 9)" }}>
            <div data-today-card="home">
              <IOSCard padding={12} className="h-full">
                <House style={{ width: "calc(var(--pt) * 16)", color: "var(--area-home)" }} />
                <p className="ios-subhead" style={{ marginTop: "calc(var(--pt) * 8)" }}>
                  {t("Home secure")}
                </p>
                <p className="ios-caption text-ink-tertiary">{t("All systems normal")}</p>
              </IOSCard>
            </div>
            <div data-today-card="finance">
              <IOSCard padding={12} className="h-full">
                <ReceiptText
                  style={{ width: "calc(var(--pt) * 16)", color: "var(--area-finance)" }}
                />
                <p className="ios-subhead" style={{ marginTop: "calc(var(--pt) * 8)" }}>
                  {t("Bill due in 2 days")}
                </p>
                <p className="ios-caption text-ink-tertiary">{t("On budget")}</p>
              </IOSCard>
            </div>
          </div>

          <div data-today-card="next">
            <IOSCard padding={12} className="flex items-center" style={{ gap: "calc(var(--pt) * 10)" }}>
              <Clock3 style={{ width: "calc(var(--pt) * 18)", color: "var(--area-family)" }} />
              <div className="flex-1">
                <p className="ios-subhead">{t("Dentist")}</p>
                <p className="ios-caption text-ink-tertiary">{t("Today")} · 16:30</p>
              </div>
              <span className="ios-caption text-ink-tertiary">{t("Next")}</span>
            </IOSCard>
          </div>
        </ScreenContent>
      </ScreenShell>
      <TabBar active="today" />
    </>
  );
}

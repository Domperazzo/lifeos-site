"use client";

import { Plus, Search, Settings2, TrendingUp } from "lucide-react";
import { lifeAreas, lifeOverview } from "@/lib/data";
import { LifeScoreDial } from "../ios/LifeScoreDial";
import { IOSCard, IOSProgress, IOSSectionTitle } from "../ios/primitives";
import {
  ScreenContent,
  ScreenShell,
  ScreenTitle,
  ScreenToolbar,
  ToolbarButton,
} from "./ScreenShell";
import { TabBar } from "../ios/TabBar";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatDecimal, formatEUR } from "@/lib/utils";

const areaTint: Record<string, string> = {
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  goals: "var(--area-goals)",
  family: "var(--area-family)",
};

/** Oggi: la schermata che apre l'app e riassume la giornata. */
export function LifeScreen({ withTabBar = true }: { withTabBar?: boolean }) {
  const { locale, t } = useI18n();

  return (
    <>
      <ScreenShell tint="var(--area-home)">
        <ScreenToolbar>
          <ToolbarButton>
            <Search style={{ width: "calc(var(--pt) * 15)" }} />
          </ToolbarButton>
          <span className="flex" style={{ gap: "calc(var(--pt) * 8)" }}>
            <ToolbarButton>
              <Plus style={{ width: "calc(var(--pt) * 15)" }} />
            </ToolbarButton>
            <ToolbarButton>
              <Settings2 style={{ width: "calc(var(--pt) * 15)" }} />
            </ToolbarButton>
          </span>
        </ScreenToolbar>

        <ScreenTitle
          title={t("Good morning, {name}", { name: lifeOverview.user })}
          subtitle={t("Tuesday 18 August")}
        />

        <ScreenContent>
          <IOSCard className="flex items-center" style={{ gap: "calc(var(--pt) * 14)" }}>
            <LifeScoreDial value={lifeOverview.lifeScore} />
            <div className="flex flex-col" style={{ gap: "calc(var(--pt) * 4)" }}>
              <p className="ios-headline">{t("Today looks good")}</p>
              <p className="ios-footnote text-ink-secondary">
                {t("Nothing overdue. You have 3 priorities and a free afternoon until 16:30.")}
              </p>
            </div>
          </IOSCard>

          <IOSSectionTitle>{t("Your life")}</IOSSectionTitle>

          <div
            className="grid grid-cols-2"
            style={{ gap: "calc(var(--pt) * 10)" }}
          >
            {lifeAreas.map((area) => (
              <IOSCard key={area.key} padding={12} className="flex flex-col justify-between">
                <div
                  className="flex items-center"
                  style={{ gap: "calc(var(--pt) * 6)" }}
                >
                  <span
                    className="rounded-full"
                    style={{
                      width: "calc(var(--pt) * 7)",
                      height: "calc(var(--pt) * 7)",
                      background: areaTint[area.key],
                    }}
                  />
                  <span className="ios-subhead">{t(area.label)}</span>
                </div>
                <p
                  className="ios-title2 tabular"
                  style={{ marginTop: "calc(var(--pt) * 8)" }}
                >
                  {area.score}
                  <span className="ios-caption text-ink-tertiary"> %</span>
                </p>
                <div style={{ marginTop: "calc(var(--pt) * 7)" }}>
                  <IOSProgress value={area.score} tint={areaTint[area.key]} height={4} />
                </div>
                <p
                  className="ios-caption text-ink-tertiary"
                  style={{ marginTop: "calc(var(--pt) * 6)" }}
                >
                  {t(area.detail)}
                </p>
              </IOSCard>
            ))}
          </div>

          <IOSCard padding={12} className="flex items-center" style={{ gap: "calc(var(--pt) * 10)" }}>
            <span
              className="grid place-items-center rounded-full"
              style={{
                width: "calc(var(--pt) * 30)",
                height: "calc(var(--pt) * 30)",
                background: "color-mix(in srgb, var(--area-finance) 16%, transparent)",
                color: "var(--area-finance)",
              }}
            >
              <TrendingUp style={{ width: "calc(var(--pt) * 15)" }} />
            </span>
            <div className="flex-1">
              <p className="ios-subhead">{t("Net worth")}</p>
              <p className="ios-caption text-ink-tertiary">
                +{formatDecimal(lifeOverview.monthlyChange, locale)}% {t("this month")}
              </p>
            </div>
            <p className="ios-headline tabular">{formatEUR(lifeOverview.netWorth, false, locale)}</p>
          </IOSCard>
        </ScreenContent>
      </ScreenShell>
      {withTabBar ? <TabBar active="life" /> : null}
    </>
  );
}

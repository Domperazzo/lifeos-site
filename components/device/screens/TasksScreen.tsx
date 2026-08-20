"use client";

import { Check, Plus } from "lucide-react";
import { doneTasks, todayTasks } from "@/lib/data";
import { IOSCard, IOSSectionTitle } from "../ios/primitives";
import {
  ScreenContent,
  ScreenShell,
  ScreenTitle,
  ScreenToolbar,
  ToolbarButton,
} from "./ScreenShell";
import { TabBar } from "../ios/TabBar";
import { useI18n } from "@/components/i18n/I18nProvider";

const tint: Record<string, string> = {
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  upkeep: "var(--area-upkeep)",
  goals: "var(--area-goals)",
};

/** Oggi: solo ciò che chiede attenzione. Il fatto scende sotto, in piccolo. */
export function TasksScreen({ withTabBar = true }: { withTabBar?: boolean }) {
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

        <ScreenTitle title={t("Today")} subtitle={t("3 things need your attention")} />

        <ScreenContent gap={10}>
          {todayTasks.map((task) => (
            <IOSCard
              key={task.title}
              padding={13}
              className="flex items-center"
              style={{ gap: "calc(var(--pt) * 11)" }}
            >
              <span
                className="shrink-0 rounded-full border-2"
                style={{
                  width: "calc(var(--pt) * 21)",
                  height: "calc(var(--pt) * 21)",
                  borderColor: tint[task.area],
                }}
              />
              <div className="flex-1">
                <p className="ios-subhead">{t(task.title)}</p>
                <p
                  className="ios-caption"
                  style={{ color: task.urgent ? "var(--area-wellbeing)" : undefined }}
                >
                  <span className={task.urgent ? "" : "text-ink-tertiary"}>{t(task.meta)}</span>
                </p>
              </div>
            </IOSCard>
          ))}

          <div style={{ paddingTop: "calc(var(--pt) * 6)" }}>
            <IOSSectionTitle>{t("Done today")}</IOSSectionTitle>
          </div>

          <div className="flex flex-col" style={{ gap: "calc(var(--pt) * 6)" }}>
            {doneTasks.map((task) => (
              <div
                key={task.title}
                className="flex items-center opacity-55"
                style={{ gap: "calc(var(--pt) * 10)", paddingInline: "calc(var(--pt) * 2)" }}
              >
                <span
                  className="grid shrink-0 place-items-center rounded-full"
                  style={{
                    width: "calc(var(--pt) * 18)",
                    height: "calc(var(--pt) * 18)",
                    background: "var(--area-finance)",
                    color: "#fff",
                  }}
                >
                  <Check style={{ width: "calc(var(--pt) * 11)" }} strokeWidth={3} />
                </span>
                <p className="ios-footnote flex-1 line-through">{t(task.title)}</p>
                <p className="ios-caption text-ink-tertiary tabular">{task.meta}</p>
              </div>
            ))}
          </div>
        </ScreenContent>
      </ScreenShell>
      {withTabBar ? <TabBar active="calendar" tint="var(--area-goals)" /> : null}
    </>
  );
}

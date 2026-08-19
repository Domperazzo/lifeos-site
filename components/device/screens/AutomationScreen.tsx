"use client";

import { Check, Sparkles } from "lucide-react";
import { scenarioActions } from "@/lib/data";
import { IOSCard } from "../ios/primitives";
import { ScreenContent, ScreenShell, ScreenTitle } from "./ScreenShell";

/**
 * Il resoconto di un'automazione appena eseguita: cosa è successo, perché,
 * e cosa LifeOS ha fatto di conseguenza — in quest'ordine.
 */
export function AutomationScreen() {
  return (
    <ScreenShell tint="var(--area-home)" bottomPadding={40}>
      <ScreenTitle title="Automation" />

      <ScreenContent>
        <IOSCard>
          <span
            className="grid place-items-center"
            style={{
              width: "calc(var(--pt) * 34)",
              height: "calc(var(--pt) * 34)",
              borderRadius: "calc(var(--pt) * 9.5)",
              background: "color-mix(in srgb, var(--area-home) 16%, transparent)",
              color: "var(--area-home)",
            }}
          >
            <Sparkles style={{ width: "calc(var(--pt) * 18)" }} />
          </span>
          <p className="ios-title3" style={{ marginTop: "calc(var(--pt) * 12)" }}>
            Home switched to Away
          </p>
          <p
            className="ios-footnote text-ink-secondary"
            style={{ marginTop: "calc(var(--pt) * 5)" }}
          >
            Federico and Luna left home at 08:15.
          </p>
          <p
            className="ios-caption"
            style={{ marginTop: "calc(var(--pt) * 8)", color: "var(--area-finance)" }}
          >
            Completed automatically
          </p>
        </IOSCard>

        <div className="flex flex-col" style={{ gap: "calc(var(--pt) * 8)" }}>
          {scenarioActions.map((action) => (
            <IOSCard
              key={action}
              padding={12}
              className="flex items-center"
              style={{ gap: "calc(var(--pt) * 10)" }}
            >
              <span
                className="grid shrink-0 place-items-center rounded-full"
                style={{
                  width: "calc(var(--pt) * 20)",
                  height: "calc(var(--pt) * 20)",
                  background: "var(--area-finance)",
                  color: "#fff",
                }}
              >
                <Check style={{ width: "calc(var(--pt) * 12)" }} strokeWidth={3} />
              </span>
              <p className="ios-subhead">{action}</p>
            </IOSCard>
          ))}
        </div>

        <p
          className="ios-caption text-ink-tertiary"
          style={{ paddingInline: "calc(var(--pt) * 4)" }}
        >
          You can review or undo any automated action.
        </p>
      </ScreenContent>
    </ScreenShell>
  );
}

"use client";

import { Bell, CloudCheck, Lock, Users } from "lucide-react";
import { Chevron, IOSCard, IOSSectionTitle } from "../ios/primitives";
import { ScreenContent, ScreenShell, ScreenTitle } from "./ScreenShell";
import { TabBar } from "../ios/TabBar";

const rows = [
  { label: "Household", value: "2 people", icon: Users, tint: "var(--area-family)" },
  { label: "Life Cloud", value: "Synced", icon: CloudCheck, tint: "var(--area-home)" },
  { label: "Privacy & security", value: "Face ID on", icon: Lock, tint: "var(--area-goals)" },
  { label: "Notifications", value: "Essential only", icon: Bell, tint: "var(--area-upkeep)" },
];

/** Profilo: chi sei, con chi condividi, e cosa esce dal telefono. */
export function ProfileScreen({ withTabBar = true }: { withTabBar?: boolean }) {
  return (
    <>
      <ScreenShell tint="var(--area-family)">
        <ScreenTitle title="Profile" />

        <ScreenContent>
          <IOSCard className="flex items-center" style={{ gap: "calc(var(--pt) * 13)" }}>
            <span
              className="grid place-items-center rounded-full font-semibold text-white"
              style={{
                width: "calc(var(--pt) * 50)",
                height: "calc(var(--pt) * 50)",
                background: "#3476d9",
                fontSize: "calc(var(--pt) * 20)",
              }}
            >
              F
            </span>
            <div>
              <p className="ios-title3">Federico</p>
              <p className="ios-footnote text-ink-tertiary">Signed in with Apple</p>
            </div>
          </IOSCard>

          <IOSSectionTitle>Settings</IOSSectionTitle>

          <div className="ios-card overflow-hidden" style={{ padding: 0 }}>
            {rows.map((row, index) => (
              <div
                key={row.label}
                className="flex items-center"
                style={{
                  gap: "calc(var(--pt) * 11)",
                  padding: "calc(var(--pt) * 11) calc(var(--pt) * 13)",
                  borderTop: index === 0 ? undefined : "1px solid var(--border)",
                }}
              >
                <span
                  className="grid shrink-0 place-items-center"
                  style={{
                    width: "calc(var(--pt) * 28)",
                    height: "calc(var(--pt) * 28)",
                    borderRadius: "calc(var(--pt) * 7.8)",
                    background: `color-mix(in srgb, ${row.tint} 16%, transparent)`,
                    color: row.tint,
                  }}
                >
                  <row.icon style={{ width: "calc(var(--pt) * 14)" }} />
                </span>
                <span className="ios-subhead flex-1">{row.label}</span>
                <span className="ios-footnote text-ink-tertiary">{row.value}</span>
                <Chevron />
              </div>
            ))}
          </div>

          <p
            className="ios-caption text-ink-tertiary"
            style={{ paddingInline: "calc(var(--pt) * 4)" }}
          >
            Financial data is never shared with other household members.
          </p>
        </ScreenContent>
      </ScreenShell>
      {withTabBar ? <TabBar active="profile" tint="var(--area-family)" /> : null}
    </>
  );
}

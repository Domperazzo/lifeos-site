"use client";

import { EllipsisVertical, ShieldCheck } from "lucide-react";
import { rooms } from "@/lib/data";
import { IOSCard, IOSProgress, IOSSectionTitle } from "../ios/primitives";
import {
  ScreenContent,
  ScreenShell,
  ScreenTitle,
  ScreenToolbar,
  ToolbarButton,
} from "./ScreenShell";
import { TabBar } from "../ios/TabBar";

/** Casa: lo stato generale, poi le stanze. Due per riga, essenziali. */
export function HomeScreen({ withTabBar = true }: { withTabBar?: boolean }) {
  return (
    <>
      <ScreenShell tint="var(--area-home)">
        <ScreenToolbar>
          <span />
          <ToolbarButton>
            <EllipsisVertical style={{ width: "calc(var(--pt) * 15)" }} />
          </ToolbarButton>
        </ScreenToolbar>

        <ScreenTitle title="Home" />

        <ScreenContent>
          <IOSCard>
            <div className="flex items-baseline justify-between">
              <p className="ios-headline">Everything under control</p>
              <p className="ios-headline tabular" style={{ color: "var(--area-finance)" }}>
                100%
              </p>
            </div>
            <div style={{ marginTop: "calc(var(--pt) * 10)" }}>
              <IOSProgress value={100} tint="var(--area-finance)" />
            </div>
            <p
              className="ios-footnote text-ink-secondary"
              style={{ marginTop: "calc(var(--pt) * 9)" }}
            >
              No overdue tasks in any room.
            </p>
          </IOSCard>

          <IOSCard padding={12} className="flex items-center" style={{ gap: "calc(var(--pt) * 10)" }}>
            <span
              className="grid place-items-center"
              style={{
                width: "calc(var(--pt) * 30)",
                height: "calc(var(--pt) * 30)",
                borderRadius: "calc(var(--pt) * 8.4)",
                background: "color-mix(in srgb, var(--area-finance) 16%, transparent)",
                color: "var(--area-finance)",
              }}
            >
              <ShieldCheck style={{ width: "calc(var(--pt) * 16)" }} />
            </span>
            <div>
              <p className="ios-subhead">Home secure</p>
              <p className="ios-caption text-ink-tertiary">All systems normal</p>
            </div>
          </IOSCard>

          <IOSSectionTitle action="All (6)">Rooms</IOSSectionTitle>

          <div className="grid grid-cols-2" style={{ gap: "calc(var(--pt) * 10)" }}>
            {rooms.map((room) => (
              <IOSCard key={room.name} padding={12}>
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full"
                    style={{
                      width: "calc(var(--pt) * 8)",
                      height: "calc(var(--pt) * 8)",
                      background: room.tint,
                    }}
                  />
                  <span className="ios-subhead tabular">{room.cleanliness}%</span>
                </div>
                <p className="ios-subhead" style={{ marginTop: "calc(var(--pt) * 9)" }}>
                  {room.name}
                </p>
                <div style={{ marginTop: "calc(var(--pt) * 8)" }}>
                  <IOSProgress value={room.cleanliness} tint={room.tint} height={4} />
                </div>
              </IOSCard>
            ))}
          </div>
        </ScreenContent>
      </ScreenShell>
      {withTabBar ? <TabBar active="home" /> : null}
    </>
  );
}

"use client";

import { CreditCard, Plus, TrendingUp, Wallet } from "lucide-react";
import { accounts, lifeOverview, netWorthSeries } from "@/lib/data";
import { formatEUR } from "@/lib/utils";
import { IOSCard, IOSSectionTitle } from "../ios/primitives";
import { NetWorthChart } from "../ios/NetWorthChart";
import {
  ScreenContent,
  ScreenShell,
  ScreenTitle,
  ScreenToolbar,
  ToolbarButton,
} from "./ScreenShell";
import { TabBar } from "../ios/TabBar";

const icons = { wallet: Wallet, trending: TrendingUp, card: CreditCard };

/** Patrimonio: un numero grande, poi da cosa è fatto. Niente da banca. */
export function FinanceScreen({ withTabBar = true }: { withTabBar?: boolean }) {
  return (
    <>
      <ScreenShell tint="var(--area-finance)">
        <ScreenToolbar>
          <span />
          <ToolbarButton>
            <Plus style={{ width: "calc(var(--pt) * 15)" }} />
          </ToolbarButton>
        </ScreenToolbar>

        <ScreenTitle title="Finance" />

        <ScreenContent>
          <IOSCard>
            <p className="ios-footnote text-ink-tertiary">Net worth</p>
            <p
              className="tabular font-semibold"
              style={{
                fontSize: "calc(var(--pt) * 38)",
                letterSpacing: "-0.035em",
                marginTop: "calc(var(--pt) * 2)",
              }}
            >
              {formatEUR(lifeOverview.netWorth)}
            </p>
            <p
              className="ios-footnote"
              style={{ color: "var(--area-finance)", marginTop: "calc(var(--pt) * 4)" }}
            >
              +{formatEUR(lifeOverview.monthlyChangeAbs)} this month
            </p>
            <div style={{ marginTop: "calc(var(--pt) * 12)" }}>
              <NetWorthChart series={netWorthSeries} />
            </div>
          </IOSCard>

          <div className="flex flex-col" style={{ gap: "calc(var(--pt) * 8)" }}>
            {accounts.map((account) => {
              const Icon = icons[account.icon];
              return (
                <IOSCard
                  key={account.name}
                  padding={12}
                  className="flex items-center"
                  style={{ gap: "calc(var(--pt) * 10)" }}
                >
                  <span
                    className="grid place-items-center"
                    style={{
                      width: "calc(var(--pt) * 30)",
                      height: "calc(var(--pt) * 30)",
                      borderRadius: "calc(var(--pt) * 8.4)",
                      background: `color-mix(in srgb, ${account.tint} 16%, transparent)`,
                      color: account.tint,
                    }}
                  >
                    <Icon style={{ width: "calc(var(--pt) * 15)" }} />
                  </span>
                  <p className="ios-subhead flex-1">{account.name}</p>
                  <p className="ios-headline tabular">
                    {account.amount < 0 ? "−" : ""}
                    {formatEUR(Math.abs(account.amount))}
                  </p>
                </IOSCard>
              );
            })}
          </div>

          <IOSSectionTitle action="See all">This month</IOSSectionTitle>

          <IOSCard padding={12} className="flex items-center justify-between">
            <div>
              <p className="ios-subhead">Spending</p>
              <p className="ios-caption text-ink-tertiary">18% below your average</p>
            </div>
            <p className="ios-headline tabular">€1,240</p>
          </IOSCard>
        </ScreenContent>
      </ScreenShell>
      {withTabBar ? <TabBar active="finance" tint="var(--area-finance)" /> : null}
    </>
  );
}

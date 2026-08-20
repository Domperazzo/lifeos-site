"use client";

import { CalendarDays, House, PieChart, Search, Sun, TrendingUp, User } from "lucide-react";
import { lifeAreas, lifeOverview, todayTasks } from "@/lib/data";
import { formatDecimal, formatEUR } from "@/lib/utils";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LifeScoreDial } from "../ios/LifeScoreDial";
import { IOSCard, IOSProgress, IOSSectionTitle } from "../ios/primitives";

const areaTint: Record<string, string> = {
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  goals: "var(--area-goals)",
  family: "var(--area-family)",
};

const sections = [
  { key: "life", label: "Today", icon: Sun },
  { key: "home", label: "Home", icon: House },
  { key: "finance", label: "Finance", icon: PieChart },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "profile", label: "Profile", icon: User },
] as const;

/**
 * LifeOS su iPad.
 *
 * Non è la schermata dell'iPhone allargata: su schermo largo le cinque
 * sezioni diventano una **barra laterale** (`.tabViewStyle(.sidebarAdaptable)`),
 * e il contenuto non corre da bordo a bordo — ha un tetto di 700 punti,
 * la larghezza oltre la quale una riga di testo perde il capo di quella
 * dopo. Sono le due decisioni dell'app, riprodotte qui.
 */
export function IPadScreen() {
  const { locale, t } = useI18n();

  return (
    <div
      className="life-canvas absolute inset-0 flex bg-bg"
      style={{ "--tint": "var(--area-home)", paddingTop: "calc(var(--pt) * 24)" } as React.CSSProperties}
    >
      <Sidebar />

      {/* Il contenuto: tetto a 700pt e centrato nello spazio che resta. */}
      <div className="flex flex-1 justify-center overflow-hidden">
        <div
          className="flex w-full flex-col"
          style={{
            maxWidth: "calc(var(--pt) * 700)",
            paddingInline: "calc(var(--pt) * 24)",
            paddingTop: "calc(var(--pt) * 18)",
            gap: "calc(var(--pt) * 16)",
          }}
        >
          <header className="flex items-end justify-between">
            <div>
              <p className="ios-largetitle">
                {t("Good morning, {name}", { name: lifeOverview.user })}
              </p>
              <p className="ios-subhead text-ink-tertiary" style={{ marginTop: "calc(var(--pt) * 4)" }}>
                {t("Tuesday 18 August")}
              </p>
            </div>
            <span
              className="glass grid place-items-center rounded-full text-ink-secondary hairline"
              style={{ width: "calc(var(--pt) * 34)", height: "calc(var(--pt) * 34)" }}
            >
              <Search style={{ width: "calc(var(--pt) * 16)" }} />
            </span>
          </header>

          <IOSCard className="flex items-center" style={{ gap: "calc(var(--pt) * 16)" }}>
            <LifeScoreDial value={lifeOverview.lifeScore} size={86} />
            <div className="flex flex-col" style={{ gap: "calc(var(--pt) * 4)" }}>
              <p className="ios-headline">{t("Today looks good")}</p>
              <p className="ios-footnote text-ink-secondary">
                {t("Nothing overdue. You have 3 priorities and a free afternoon until 16:30.")}
              </p>
            </div>
          </IOSCard>

          <IOSSectionTitle>{t("Your life")}</IOSSectionTitle>

          {/* Su una colonna da 700pt la griglia adattiva passa da due
              colonne a quattro: è lo stesso minimo di 158pt dell'app. */}
          <div className="grid grid-cols-4" style={{ gap: "calc(var(--pt) * 12)" }}>
            {lifeAreas.map((area) => (
              <IOSCard key={area.key} padding={13} className="flex flex-col">
                <div className="flex items-center" style={{ gap: "calc(var(--pt) * 6)" }}>
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
                <p className="ios-title2 tabular" style={{ marginTop: "calc(var(--pt) * 8)" }}>
                  {formatDecimal(area.score, locale)}
                  <span className="ios-caption text-ink-tertiary"> %</span>
                </p>
                <div style={{ marginTop: "calc(var(--pt) * 7)" }}>
                  <IOSProgress value={area.score} tint={areaTint[area.key]} height={4} />
                </div>
              </IOSCard>
            ))}
          </div>

          <div className="grid grid-cols-2" style={{ gap: "calc(var(--pt) * 12)" }}>
            <IOSCard padding={13}>
              <p className="ios-footnote text-ink-tertiary">{t("Net worth")}</p>
              <p
                className="tabular font-semibold"
                style={{ fontSize: "calc(var(--pt) * 26)", letterSpacing: "-0.03em" }}
              >
                {formatEUR(lifeOverview.netWorth, false, locale)}
              </p>
              <p
                className="ios-caption"
                style={{ color: "var(--area-finance)", marginTop: "calc(var(--pt) * 3)" }}
              >
                +{formatDecimal(lifeOverview.monthlyChange, locale)}% {t("this month")}
              </p>
            </IOSCard>

            <IOSCard padding={13} className="flex flex-col" style={{ gap: "calc(var(--pt) * 8)" }}>
              <p className="ios-footnote text-ink-tertiary">{t("Today")}</p>
              {todayTasks.slice(0, 3).map((task) => (
                <div key={task.title} className="flex items-center" style={{ gap: "calc(var(--pt) * 8)" }}>
                  <span
                    className="shrink-0 rounded-full border-2"
                    style={{
                      width: "calc(var(--pt) * 13)",
                      height: "calc(var(--pt) * 13)",
                      borderColor: areaTint[task.area] ?? "var(--area-upkeep)",
                    }}
                  />
                  <span className="ios-caption">{t(task.title)}</span>
                </div>
              ))}
            </IOSCard>
          </div>

          {/* Su iPad la colonna è alta quanto su iPhone ma il contenuto
              respira: sotto la piega dell'iPhone c'è ancora schermo, e
              queste due card sono ciò che l'utente vede senza scorrere. */}
          <div className="grid grid-cols-2" style={{ gap: "calc(var(--pt) * 12)" }}>
            <IOSCard padding={13} className="flex items-center" style={{ gap: "calc(var(--pt) * 11)" }}>
              <span
                className="grid shrink-0 place-items-center"
                style={{
                  width: "calc(var(--pt) * 30)",
                  height: "calc(var(--pt) * 30)",
                  borderRadius: "calc(var(--pt) * 8.4)",
                  background: "color-mix(in srgb, var(--area-home) 16%, transparent)",
                  color: "var(--area-home)",
                }}
              >
                <House style={{ width: "calc(var(--pt) * 15)" }} />
              </span>
              <div>
                <p className="ios-subhead">{t("Home secure")}</p>
                <p className="ios-caption text-ink-tertiary">{t("All systems normal")}</p>
              </div>
            </IOSCard>

            <IOSCard padding={13} className="flex items-center" style={{ gap: "calc(var(--pt) * 11)" }}>
              <span
                className="grid shrink-0 place-items-center"
                style={{
                  width: "calc(var(--pt) * 30)",
                  height: "calc(var(--pt) * 30)",
                  borderRadius: "calc(var(--pt) * 8.4)",
                  background: "color-mix(in srgb, var(--area-family) 16%, transparent)",
                  color: "var(--area-family)",
                }}
              >
                <CalendarDays style={{ width: "calc(var(--pt) * 15)" }} />
              </span>
              <div>
                <p className="ios-subhead">{t(lifeOverview.nextCommitment.title)}</p>
                <p className="ios-caption text-ink-tertiary tabular">
                  {t("Today")} · {lifeOverview.nextCommitment.time}
                </p>
              </div>
            </IOSCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const { t } = useI18n();

  return (
    <aside
      className="flex shrink-0 flex-col border-r border-line bg-surface-muted"
      style={{
        width: "calc(var(--pt) * 260)",
        paddingInline: "calc(var(--pt) * 12)",
        paddingTop: "calc(var(--pt) * 16)",
        gap: "calc(var(--pt) * 4)",
      }}
    >
      <p
        className="font-bold"
        style={{
          fontSize: "calc(var(--pt) * 26)",
          letterSpacing: "-0.03em",
          paddingInline: "calc(var(--pt) * 10)",
          paddingBottom: "calc(var(--pt) * 12)",
        }}
      >
        LifeOS
      </p>

      {sections.map(({ key, label, icon: Icon }, index) => {
        const active = index === 0;
        return (
          <div
            key={key}
            className="flex items-center"
            style={{
              gap: "calc(var(--pt) * 11)",
              padding: "calc(var(--pt) * 9) calc(var(--pt) * 10)",
              borderRadius: "calc(var(--pt) * 9)",
              background: active
                ? "color-mix(in srgb, var(--area-home) 15%, transparent)"
                : undefined,
              color: active ? "var(--area-home)" : "var(--text-secondary)",
            }}
          >
            <Icon
              style={{ width: "calc(var(--pt) * 18)", height: "calc(var(--pt) * 18)" }}
              strokeWidth={active ? 2.3 : 1.9}
            />
            <span className="ios-subhead" style={{ color: "inherit" }}>
              {t(label)}
            </span>
          </div>
        );
      })}

      <div className="mt-auto" style={{ paddingBottom: "calc(var(--pt) * 20)" }}>
        <div
          className="flex items-center"
          style={{ gap: "calc(var(--pt) * 9)", paddingInline: "calc(var(--pt) * 10)" }}
        >
          <span
            className="grid place-items-center rounded-full font-semibold text-white"
            style={{
              width: "calc(var(--pt) * 26)",
              height: "calc(var(--pt) * 26)",
              background: "#3476d9",
              fontSize: "calc(var(--pt) * 12)",
            }}
          >
            {lifeOverview.user.charAt(0)}
          </span>
          <span className="ios-footnote text-ink-secondary">{lifeOverview.user}</span>
          <TrendingUp
            className="ml-auto text-ink-tertiary"
            style={{ width: "calc(var(--pt) * 13)" }}
          />
        </div>
      </div>
    </aside>
  );
}

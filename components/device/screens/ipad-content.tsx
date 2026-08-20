"use client";

import { CalendarDays, CreditCard, House, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import {
  accounts,
  areaColor,
  calendarDay,
  calendarWeek,
  lifeAreas,
  lifeOverview,
  netWorthSeries,
  recentTransactions,
  rooms,
  todayTasks,
  tomorrowPlan,
} from "@/lib/data";
import { formatDecimal, formatEUR } from "@/lib/utils";
import { useI18n } from "@/components/i18n/I18nProvider";
import { IOSCard, IOSProgress, IOSSectionTitle } from "../ios/primitives";
import { LifeScoreDial } from "../ios/LifeScoreDial";
import { NetWorthChart } from "../ios/NetWorthChart";

/*
  I contenuti delle cinque sezioni, in colonna da 700 punti.

  Non sono le schermate dell'iPhone allargate: dove l'iPhone mette due
  colonne di card, qui ce ne stanno quattro — è lo stesso minimo di 158
  punti di `DS.Layout.gridCardMinimum`, che su una colonna più larga
  produce più colonne da sé, senza una condizione.
*/

const areaTint: Record<string, string> = {
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  goals: "var(--area-goals)",
  family: "var(--area-family)",
};

const icons = { wallet: Wallet, trending: TrendingUp, card: CreditCard };

const gap = (n: number) => ({ gap: `calc(var(--pt) * ${n})` });

/** Oggi. */
export function IPadToday() {
  const { locale, t } = useI18n();

  return (
    <>
      <IOSCard className="flex items-center" style={gap(16)}>
        <LifeScoreDial value={lifeOverview.lifeScore} size={86} />
        <div className="flex flex-col" style={gap(4)}>
          <p className="ios-headline">{t("Today looks good")}</p>
          <p className="ios-footnote text-ink-secondary">
            {t("Nothing overdue. You have 3 priorities and a free afternoon until 16:30.")}
          </p>
        </div>
      </IOSCard>

      <IOSSectionTitle>{t("Your life")}</IOSSectionTitle>

      <div className="grid grid-cols-4" style={gap(12)}>
        {lifeAreas.map((area) => (
          <IOSCard key={area.key} padding={13} className="flex flex-col">
            <div className="flex items-center" style={gap(6)}>
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

      <div className="grid grid-cols-2" style={gap(12)}>
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

        <IOSCard padding={13} className="flex flex-col" style={gap(8)}>
          <p className="ios-footnote text-ink-tertiary">{t("Today")}</p>
          {todayTasks.map((task) => (
            <div key={task.title} className="flex items-center" style={gap(8)}>
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

      <div className="grid grid-cols-2" style={gap(12)}>
        <Tile
          tint="var(--area-home)"
          icon={<House style={{ width: "calc(var(--pt) * 15)" }} />}
          title={t("Home secure")}
          detail={t("All systems normal")}
        />
        <Tile
          tint="var(--area-family)"
          icon={<CalendarDays style={{ width: "calc(var(--pt) * 15)" }} />}
          title={t(lifeOverview.nextCommitment.title)}
          detail={`${t("Today")} · ${lifeOverview.nextCommitment.time}`}
        />
      </div>
    </>
  );
}

/** Casa: le sei stanze stanno su una riga sola. */
export function IPadHome() {
  const { locale, t } = useI18n();

  return (
    <>
      <IOSCard>
        <div className="flex items-baseline justify-between">
          <p className="ios-headline">{t("Everything under control")}</p>
          <p className="ios-headline tabular" style={{ color: "var(--area-finance)" }}>
            {formatDecimal(100, locale)}%
          </p>
        </div>
        <div style={{ marginTop: "calc(var(--pt) * 10)" }}>
          <IOSProgress value={100} tint="var(--area-finance)" />
        </div>
        <p className="ios-footnote text-ink-secondary" style={{ marginTop: "calc(var(--pt) * 9)" }}>
          {t("No overdue tasks in any room.")}
        </p>
      </IOSCard>

      <Tile
        tint="var(--area-finance)"
        icon={<ShieldCheck style={{ width: "calc(var(--pt) * 16)" }} />}
        title={t("Home secure")}
        detail={t("All systems normal")}
      />

      <IOSSectionTitle action={t("All (6)")}>{t("Rooms")}</IOSSectionTitle>

      <div className="grid grid-cols-4" style={gap(12)}>
        {rooms.map((room) => (
          <IOSCard key={room.name} padding={13}>
            <div className="flex items-center justify-between">
              <span
                className="rounded-full"
                style={{
                  width: "calc(var(--pt) * 8)",
                  height: "calc(var(--pt) * 8)",
                  background: room.tint,
                }}
              />
              <span className="ios-subhead tabular">{formatDecimal(room.cleanliness, locale)}%</span>
            </div>
            <p className="ios-subhead" style={{ marginTop: "calc(var(--pt) * 9)" }}>
              {t(room.name)}
            </p>
            <div style={{ marginTop: "calc(var(--pt) * 8)" }}>
              <IOSProgress value={room.cleanliness} tint={room.tint} height={4} />
            </div>
          </IOSCard>
        ))}
      </div>
    </>
  );
}

/** Patrimonio: il numero, la curva, e da cosa è fatto — tutto sopra la piega. */
export function IPadFinance() {
  const { locale, t } = useI18n();

  return (
    <>
      <IOSCard>
        <p className="ios-footnote text-ink-tertiary">{t("Net worth")}</p>
        <p
          className="tabular font-semibold"
          style={{
            fontSize: "calc(var(--pt) * 38)",
            letterSpacing: "-0.035em",
            marginTop: "calc(var(--pt) * 2)",
          }}
        >
          {formatEUR(lifeOverview.netWorth, false, locale)}
        </p>
        <p
          className="ios-footnote"
          style={{ color: "var(--area-finance)", marginTop: "calc(var(--pt) * 4)" }}
        >
          +{formatEUR(lifeOverview.monthlyChangeAbs, false, locale)} {t("this month")}
        </p>
        <div style={{ marginTop: "calc(var(--pt) * 12)" }}>
          <NetWorthChart series={netWorthSeries} height={56} />
        </div>
      </IOSCard>

      <div className="grid grid-cols-3" style={gap(12)}>
        {accounts.map((account) => {
          const Icon = icons[account.icon];
          return (
            <IOSCard key={account.name} padding={13} className="flex flex-col" style={gap(9)}>
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
              <p className="ios-caption text-ink-tertiary">{t(account.name)}</p>
              <p className="ios-headline tabular">
                {account.amount < 0 ? "−" : ""}
                {formatEUR(Math.abs(account.amount), false, locale)}
              </p>
            </IOSCard>
          );
        })}
      </div>

      <IOSCard padding={13} className="flex items-center justify-between">
        <div>
          <p className="ios-subhead">{t("Spending")}</p>
          <p className="ios-caption text-ink-tertiary">{t("18% below your average")}</p>
        </div>
        <p className="ios-headline tabular">{formatEUR(1240, false, locale)}</p>
      </IOSCard>

      <IOSSectionTitle>{t("Recent")}</IOSSectionTitle>

      <div className="ios-card overflow-hidden" style={{ padding: 0 }}>
        {recentTransactions.map((tx, index) => (
          <div
            key={tx.title}
            className="flex items-center"
            style={{
              gap: "calc(var(--pt) * 10)",
              padding: "calc(var(--pt) * 11) calc(var(--pt) * 14)",
              borderTop: index === 0 ? undefined : "1px solid var(--border)",
            }}
          >
            <span className="flex-1">
              <span className="ios-subhead block">{t(tx.title)}</span>
              <span className="ios-caption block text-ink-tertiary">{t(tx.meta)}</span>
            </span>
            <span
              className="ios-subhead tabular"
              style={{ color: tx.amount > 0 ? "var(--area-finance)" : undefined }}
            >
              {tx.amount > 0 ? "+" : "−"}
              {formatEUR(Math.abs(tx.amount), false, locale)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/** Calendario: la settimana e la giornata, affiancate. */
export function IPadCalendar() {
  const { t } = useI18n();

  return (
    <>
      <IOSCard padding={13}>
        <div className="flex justify-between">
          {calendarWeek.map((day) => (
            <div key={day.date} className="flex flex-col items-center" style={gap(6)}>
              <span className="ios-caption text-ink-tertiary">{t(day.day)}</span>
              <span
                className="grid place-items-center rounded-full tabular"
                style={{
                  width: "calc(var(--pt) * 30)",
                  height: "calc(var(--pt) * 30)",
                  fontSize: "calc(var(--pt) * 15)",
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

      <IOSSectionTitle>{t("Today")}</IOSSectionTitle>

      <div className="grid grid-cols-2" style={gap(10)}>
        {calendarDay.map((entry) => (
          <IOSCard key={entry.title} padding={12} className="flex items-center" style={gap(11)}>
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

      <IOSSectionTitle>{t("Tomorrow")}</IOSSectionTitle>

      <div className="grid grid-cols-2" style={gap(10)}>
        {tomorrowPlan.map((entry) => (
          <IOSCard key={entry.title} padding={12} className="flex items-center" style={gap(11)}>
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
            <span className="ios-subhead flex-1">{t(entry.title)}</span>
          </IOSCard>
        ))}
      </div>
    </>
  );
}

/** Profilo: chi sei, con chi condividi, e cosa resta tuo. */
export function IPadProfile() {
  const { t } = useI18n();

  return (
    <>
      <IOSCard className="flex items-center" style={gap(14)}>
        <span
          className="grid place-items-center rounded-full font-semibold text-white"
          style={{
            width: "calc(var(--pt) * 54)",
            height: "calc(var(--pt) * 54)",
            background: "#3476d9",
            fontSize: "calc(var(--pt) * 22)",
          }}
        >
          {lifeOverview.user.charAt(0)}
        </span>
        <div>
          <p className="ios-title3">{lifeOverview.user}</p>
          <p className="ios-footnote text-ink-tertiary">{t("Signed in with Apple")}</p>
        </div>
      </IOSCard>

      <IOSSectionTitle>{t("Settings")}</IOSSectionTitle>

      <div className="grid grid-cols-2" style={gap(12)}>
        {(
          [
            ["Household", "2 people", "var(--area-family)"],
            ["Life Cloud", "Synced", "var(--area-home)"],
            ["Privacy & security", "Face ID on", "var(--area-goals)"],
            ["Notifications", "Essential only", "var(--area-upkeep)"],
          ] as const
        ).map(([label, value, tint]) => (
          <IOSCard key={label} padding={13} className="flex items-center justify-between">
            <span className="flex items-center" style={gap(10)}>
              <span
                className="shrink-0 rounded-full"
                style={{ width: "calc(var(--pt) * 8)", height: "calc(var(--pt) * 8)", background: tint }}
              />
              <span className="ios-subhead">{t(label)}</span>
            </span>
            <span className="ios-caption text-ink-tertiary">{t(value)}</span>
          </IOSCard>
        ))}
      </div>

      <p className="ios-caption text-ink-tertiary" style={{ paddingInline: "calc(var(--pt) * 4)" }}>
        {t("Financial data is never shared with other household members.")}
      </p>
    </>
  );
}

/** Riquadro con icona, titolo e riga di dettaglio: ricorre in tre sezioni. */
function Tile({
  tint,
  icon,
  title,
  detail,
}: {
  tint: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <IOSCard padding={13} className="flex items-center" style={gap(11)}>
      <span
        className="grid shrink-0 place-items-center"
        style={{
          width: "calc(var(--pt) * 30)",
          height: "calc(var(--pt) * 30)",
          borderRadius: "calc(var(--pt) * 8.4)",
          background: `color-mix(in srgb, ${tint} 16%, transparent)`,
          color: tint,
        }}
      >
        {icon}
      </span>
      <div>
        <p className="ios-subhead">{title}</p>
        <p className="ios-caption text-ink-tertiary">{detail}</p>
      </div>
    </IOSCard>
  );
}

"use client";

import { CalendarClock, Check, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { lifeOverview, todayTasks } from "@/lib/data";
import { formatDecimal, formatEUR } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { ScoreRing } from "@/components/ui/score-ring";
import { HomeStatusTile } from "./HomeStatusTile";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * La dashboard dimostrativa: deve sembrare uno schermo vero, non una
 * griglia di card di marketing. Per questo ogni riquadro porta un dato e
 * la frase che lo qualifica — mai un numero da solo.
 */
export function GlanceDashboard() {
  const { t } = useI18n();

  return (
    <Reveal className="relative">
      <div className="card overflow-hidden p-4 shadow-[var(--shadow-lg)] sm:p-6">
        <header className="flex items-center justify-between px-1 pb-4">
          <div>
            <p className="text-[15px] font-semibold">{t("Good morning, {name}", { name: lifeOverview.user })}</p>
            <p className="text-[13px] text-ink-tertiary">{t("Tuesday 18 August")}</p>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[12px] text-ink-tertiary sm:inline-flex">
            <span className="size-1.5 rounded-full bg-finance" />
            {t("All areas synced")}
          </span>
        </header>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Life Score */}
          <div className="flex flex-col items-center justify-center gap-5 rounded-[18px] bg-surface-muted p-6 sm:flex-row sm:justify-start lg:flex-col lg:justify-center">
            <ScoreRing value={lifeOverview.lifeScore} size={150} />
            <div className="text-center sm:text-left lg:text-center">
              <p className="text-[15px] font-semibold">{t("Today looks good")}</p>
              <p className="mx-auto mt-1 max-w-[26ch] text-[13px] leading-relaxed text-ink-secondary">
                {t("Nothing overdue across your six life areas.")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <HomeStatusTile />
            <FinanceTile />
          </div>

          <div className="flex flex-col gap-3">
            <PrioritiesTile />
            <NextTile />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Tile({
  icon,
  tint,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-1 flex-col rounded-[18px] bg-surface-muted p-5 ${className ?? ""}`}>
      <div className="flex items-center gap-2.5">
        <span
          className="grid size-7 place-items-center rounded-[8px]"
          style={{ background: `color-mix(in srgb, ${tint} 16%, transparent)`, color: tint }}
        >
          {icon}
        </span>
        <span className="text-[13px] font-medium text-ink-secondary">{label}</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FinanceTile() {
  const { locale, t } = useI18n();

  return (
    <Tile
      icon={<TrendingUp className="size-4" />}
      tint="var(--area-finance)"
      label={t("Finances")}
    >
      <p className="tabular text-[28px] font-semibold leading-none tracking-[-0.03em]">
        {formatEUR(lifeOverview.netWorth, false, locale)}
      </p>
      <p className="mt-2 text-[13px] text-ink-secondary">
        {t("Net worth")} {" "}
        <span className="font-medium text-finance">
          +{formatDecimal(lifeOverview.monthlyChange, locale)}%
        </span>{" "}
        {t("this month")}
      </p>
    </Tile>
  );
}

function PrioritiesTile() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <Tile icon={<Check className="size-4" />} tint="var(--area-goals)" label={t("Today")}>
      <p className="text-[15px] font-semibold">{t("{count} priorities", { count: lifeOverview.priorities })}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {todayTasks.map((task, index) => (
          <motion.li
            key={task.title}
            initial={{ opacity: 0, x: reduceMotion ? 0 : -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
            className="flex items-center gap-2.5 text-[13px] text-ink-secondary"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-goals" />
            {t(task.title)}
          </motion.li>
        ))}
      </ul>
    </Tile>
  );
}

function NextTile() {
  const { t } = useI18n();

  return (
    <Tile
      icon={<CalendarClock className="size-4" />}
      tint="var(--area-family)"
      label={t("Next")}
    >
      <p className="text-[15px] font-semibold">{t(lifeOverview.nextCommitment.title)}</p>
      <p className="mt-1 text-[13px] text-ink-secondary tabular">
        {t("Today")} · {lifeOverview.nextCommitment.time}
      </p>
      <p className="mt-3 text-[12.5px] text-ink-tertiary">
        {t("Your afternoon is free until then.")}
      </p>
    </Tile>
  );
}

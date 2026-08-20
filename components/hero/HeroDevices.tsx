"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, House, TrendingUp } from "lucide-react";
import { IPhoneMockup } from "@/components/device/IPhoneMockup";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { HomeScreen } from "@/components/device/screens/HomeScreen";
import { FinanceScreen } from "@/components/device/screens/FinanceScreen";
import { useMediaQuery } from "@/hooks/use-media-query";
import { reducedTransition } from "@/components/ui/reveal";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * I tre telefoni del hero.
 *
 * Il centrale è in primo piano e leggermente più grande; i due laterali
 * stanno dietro, inclinati di pochi gradi e più bassi. Durante lo scroll
 * si muovono a velocità appena diverse: la profondità si legge dal
 * movimento, non da un'ombra finta.
 */
export function HeroDevices() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useI18n();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sideY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -52]);
  const chipY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Lo stato iniziale è lo stesso sul server e sul client: la preferenza
  // «riduci movimento» agisce sulla transizione, non sul primo render.
  const enter = (delay: number, rotate: number) => ({
    initial: { opacity: 0, y: 46, rotate: rotate * 2.4, scale: 0.95 },
    animate: { opacity: 1, y: 0, rotate, scale: 1 },
    transition: reducedTransition(
      { duration: 1, delay, ease: [0.22, 0.61, 0.36, 1] as const },
      reduceMotion,
    ),
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-12 flex w-full max-w-6xl items-end justify-center sm:mt-14"
    >
      {/* Telefono sinistro — Casa */}
      <motion.div
        {...enter(0.45, -6)}
        style={{ y: reduceMotion ? 0 : sideY }}
        className="relative z-0 hidden lg:block"
      >
        <div className="translate-x-10 translate-y-10">
          <IPhoneMockup
            width="clamp(210px, 20vw, 254px)"
            time="8:15"
            label={t("LifeOS Home screen on iPhone")}
          >
            <HomeScreen />
          </IPhoneMockup>
        </div>
      </motion.div>

      {/* Telefono centrale — la giornata */}
      <motion.div
        {...enter(0.3, 0)}
        style={{ y: reduceMotion ? 0 : centerY }}
        className="relative z-10 will-change-transform"
      >
        <IPhoneMockup
          width="clamp(248px, 30vw, 314px)"
          time="9:41"
          label={t("LifeOS daily dashboard on iPhone")}
        >
          <LifeScreen />
        </IPhoneMockup>
      </motion.div>

      {/* Telefono destro — Patrimonio */}
      <motion.div
        {...enter(0.55, 6)}
        style={{ y: reduceMotion ? 0 : sideY }}
        className="relative z-0 hidden lg:block"
      >
        <div className="-translate-x-10 translate-y-10">
          <IPhoneMockup
            width="clamp(210px, 20vw, 254px)"
            time="9:41"
            label={t("LifeOS Finance screen on iPhone")}
          >
            <FinanceScreen />
          </IPhoneMockup>
        </div>
      </motion.div>

      {isDesktop ? (
        <motion.div
          aria-hidden
          style={{ y: reduceMotion ? 0 : chipY }}
          className="pointer-events-none absolute inset-0 z-20"
        >
          <FloatingChip
            className="left-[2%] top-[16%]"
            delay={1.05}
            icon={<House className="size-3.5" />}
            tint="var(--area-home)"
            title={t("Home secure")}
            detail={t("Everything under control")}
          />
          <FloatingChip
            className="right-[1%] top-[38%]"
            delay={1.2}
            icon={<TrendingUp className="size-3.5" />}
            tint="var(--area-finance)"
            title={t("Net worth")}
            detail={t("+2.4% this month")}
          />
          <FloatingChip
            className="bottom-[12%] left-[6%]"
            delay={1.35}
            icon={<CheckCircle2 className="size-3.5" />}
            tint="var(--area-goals)"
            title={t("Vacuum started")}
            detail={t("Nobody home · 08:15")}
          />
        </motion.div>
      ) : null}
    </div>
  );
}

function FloatingChip({
  className,
  delay,
  icon,
  tint,
  title,
  detail,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
  tint: string;
  title: string;
  detail: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reducedTransition(
        { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
        reduceMotion,
      )}
      className={`glass absolute flex items-center gap-2.5 rounded-2xl border border-line px-3.5 py-2.5 shadow-[var(--shadow-md)] ${className}`}
    >
      <span
        className="grid size-7 shrink-0 place-items-center rounded-lg"
        style={{ background: `color-mix(in srgb, ${tint} 16%, transparent)`, color: tint }}
      >
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-medium">{title}</span>
        <span className="text-[11.5px] text-ink-tertiary">{detail}</span>
      </span>
    </motion.div>
  );
}

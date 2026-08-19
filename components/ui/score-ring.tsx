"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CountUp } from "./count-up";

/**
 * L'anello del Life Score in versione web: stessa gradazione dell'app,
 * dimensioni fluide. Il numero e l'arco salgono insieme quando la sezione
 * entra nel viewport, una volta sola.
 */
export function ScoreRing({
  value,
  size = 168,
  stroke = 13,
  label = "Life Score",
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const gradientId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const radius = 50 - stroke / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      ref={ref}
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff9f0a" />
            <stop offset="55%" stopColor="var(--area-home)" />
            <stop offset="100%" stopColor="var(--area-goals)" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-ink/8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? circumference * (1 - value / 100) : circumference }}
          transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </svg>
      <div className="relative flex flex-col items-center leading-none">
        <span className="tabular font-semibold tracking-[-0.04em]" style={{ fontSize: size * 0.3 }}>
          <CountUp to={value} />
          <span className="text-ink-tertiary" style={{ fontSize: size * 0.15 }}>
            %
          </span>
        </span>
        <span className="mt-2 text-[12px] font-medium text-ink-tertiary">{label}</span>
      </div>
    </div>
  );
}

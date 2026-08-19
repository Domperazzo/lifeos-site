"use client";

import { useId } from "react";

/**
 * L'anello del Life Score, come in `LifeScoreDial.swift`: traccia neutra,
 * arco tinto che va dall'ambra al blu, numero a cifre monospaziate al
 * centro. Il valore non è mai il solo portatore del significato — accanto
 * c'è sempre una frase che lo spiega.
 */
export function LifeScoreDial({
  value,
  size = 78,
  stroke = 8,
  caption = "Life Score",
}: {
  value: number;
  size?: number;
  stroke?: number;
  caption?: string;
}) {
  const gradientId = useId();
  const radius = 50 - stroke / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className="relative grid shrink-0 place-items-center"
      style={{ width: `calc(var(--pt) * ${size})`, height: `calc(var(--pt) * ${size})` }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff9f0a" />
            <stop offset="55%" stopColor="#3e93e8" />
            <stop offset="100%" stopColor="#6c63e0" />
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
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
        />
      </svg>
      <span className="relative flex flex-col items-center leading-none">
        <span
          className="font-semibold tabular"
          style={{ fontSize: `calc(var(--pt) * ${size * 0.3})`, letterSpacing: "-0.03em" }}
        >
          {Math.round(clamped)}
        </span>
        <span
          className="text-ink-tertiary"
          style={{ fontSize: `calc(var(--pt) * ${size * 0.105})`, marginTop: "calc(var(--pt) * 3)" }}
        >
          {caption}
        </span>
      </span>
    </div>
  );
}

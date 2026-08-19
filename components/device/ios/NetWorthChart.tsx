"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WIDTH = 300;
const HEIGHT = 84;

/** Costruisce una curva morbida (Catmull-Rom convertita in Bézier). */
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * L'andamento del patrimonio: una linea e nient'altro.
 *
 * Niente assi, niente griglia, nessuna etichetta: la forma dice la
 * direzione, il numero grande sopra dice il valore. Aggiungere un asse Y
 * a un grafico alto 84 punti aggiunge inchiostro, non informazione.
 */
export function NetWorthChart({
  series,
  tint = "var(--area-finance)",
  height = 68,
}: {
  series: number[];
  tint?: string;
  height?: number;
}) {
  const gradientId = useId();
  const reduceMotion = useReducedMotion();

  const { line, area } = useMemo(() => {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const span = max - min || 1;
    const points = series.map((value, index) => ({
      x: (index / (series.length - 1)) * WIDTH,
      y: HEIGHT - 8 - ((value - min) / span) * (HEIGHT - 20),
    }));
    const linePath = smoothPath(points);
    return {
      line: linePath,
      area: `${linePath} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`,
    };
  }, [series]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: `calc(var(--pt) * ${height})` }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.22" />
          <stop offset="100%" stopColor={tint} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.5 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={tint}
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </svg>
  );
}

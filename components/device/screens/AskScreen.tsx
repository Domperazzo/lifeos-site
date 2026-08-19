"use client";

import { ArrowUp, Check } from "lucide-react";
import type { AskExample } from "@/lib/data";
import { ScreenContent, ScreenShell, ScreenTitle } from "./ScreenShell";

/**
 * Ask LifeOS: la domanda in alto, la risposta grande, poi da dove viene.
 *
 * Non è una chat: non c'è cronologia da scorrere e la risposta non è un
 * paragrafo. È un dato, la frase che lo qualifica, e la provenienza — che
 * è ciò che distingue un sistema che *sa* da uno che parla.
 */
export function AskScreen({
  question,
  answer,
  detail,
  source,
  comparison,
  items,
  ordered,
}: AskExample) {
  return (
    <ScreenShell tint="var(--area-goals)" bottomPadding={40}>
      <ScreenTitle title="Ask LifeOS" />

      <ScreenContent>
        <div
          className="self-end rounded-[calc(var(--pt)*18)] rounded-br-[calc(var(--pt)*6)] bg-ink/6 px-[calc(var(--pt)*14)] py-[calc(var(--pt)*10)]"
          style={{ maxWidth: "82%" }}
        >
          <p className="ios-subhead">{question}</p>
        </div>

        <div style={{ paddingTop: "calc(var(--pt) * 8)" }}>
          <p
            className="font-semibold tabular"
            style={{ fontSize: "calc(var(--pt) * 46)", letterSpacing: "-0.035em" }}
          >
            {answer}
          </p>
          <p
            className="ios-body text-ink-secondary"
            style={{ marginTop: "calc(var(--pt) * 6)", maxWidth: "92%" }}
          >
            {detail}
          </p>
        </div>

        {comparison ? <ComparisonBars comparison={comparison} /> : null}
        {items ? <AnswerItems items={items} ordered={ordered} /> : null}

        <p
          className="ios-caption text-ink-tertiary"
          style={{ paddingTop: "calc(var(--pt) * 2)" }}
        >
          {source}
        </p>

        <div className="mt-auto" style={{ paddingTop: "calc(var(--pt) * 12)" }}>
          <div
            className="glass flex items-center rounded-full hairline"
            style={{
              gap: "calc(var(--pt) * 8)",
              padding:
                "calc(var(--pt) * 8) calc(var(--pt) * 8) calc(var(--pt) * 8) calc(var(--pt) * 16)",
            }}
          >
            <span className="ios-subhead flex-1 text-ink-tertiary">Anything else?</span>
            <span
              className="grid place-items-center rounded-full"
              style={{
                width: "calc(var(--pt) * 30)",
                height: "calc(var(--pt) * 30)",
                background: "var(--text)",
                color: "var(--bg)",
              }}
            >
              <ArrowUp style={{ width: "calc(var(--pt) * 16)" }} strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </ScreenContent>
    </ScreenShell>
  );
}

/** Due barre: questo mese e il precedente. Il confronto è la risposta vera. */
function ComparisonBars({
  comparison,
}: {
  comparison: NonNullable<AskExample["comparison"]>;
}) {
  const max = Math.max(comparison.value, comparison.previous);
  const rows = [
    { label: "This month", amount: comparison.value, tint: "var(--area-finance)" },
    { label: "Last month", amount: comparison.previous, tint: "var(--text-tertiary)" },
  ];

  return (
    <div className="ios-card" style={{ padding: "calc(var(--pt) * 13)" }}>
      <p className="ios-footnote text-ink-tertiary">{comparison.label}</p>
      <div
        className="flex flex-col"
        style={{ gap: "calc(var(--pt) * 9)", marginTop: "calc(var(--pt) * 10)" }}
      >
        {rows.map((row) => (
          <div key={row.label} className="flex items-center" style={{ gap: "calc(var(--pt) * 9)" }}>
            <span
              className="ios-caption text-ink-tertiary"
              style={{ width: "calc(var(--pt) * 62)" }}
            >
              {row.label}
            </span>
            <span
              className="h-[calc(var(--pt)*7)] rounded-full"
              style={{ width: `${(row.amount / max) * 60}%`, background: row.tint, opacity: 0.9 }}
            />
            <span className="ios-caption tabular">€{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Le voci di una risposta che è un elenco. */
function AnswerItems({ items, ordered }: { items: string[]; ordered?: boolean }) {
  return (
    <div className="ios-card overflow-hidden" style={{ padding: 0 }}>
      {items.map((item, index) => (
        <div
          key={item}
          className="flex items-center"
          style={{
            gap: "calc(var(--pt) * 10)",
            padding: "calc(var(--pt) * 11) calc(var(--pt) * 13)",
            borderTop: index === 0 ? undefined : "1px solid var(--border)",
          }}
        >
          <span
            className="grid shrink-0 place-items-center rounded-full"
            style={{
              width: "calc(var(--pt) * 18)",
              height: "calc(var(--pt) * 18)",
              background: ordered
                ? "color-mix(in srgb, var(--area-goals) 16%, transparent)"
                : "var(--area-finance)",
              color: ordered ? "var(--area-goals)" : "#fff",
              fontSize: "calc(var(--pt) * 10)",
              fontWeight: 600,
            }}
          >
            {ordered ? (
              index + 1
            ) : (
              <Check style={{ width: "calc(var(--pt) * 11)" }} strokeWidth={3.2} />
            )}
          </span>
          <span className="ios-subhead">{item}</span>
        </div>
      ))}
    </div>
  );
}

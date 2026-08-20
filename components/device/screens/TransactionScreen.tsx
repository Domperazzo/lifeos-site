"use client";

import { Chevron } from "../ios/primitives";
import { ScreenShell } from "./ScreenShell";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatEUR } from "@/lib/utils";

const fields = [
  { label: "Account", value: "Main Account" },
  { label: "Category", value: "Restaurants" },
  { label: "Date", value: "Today" },
] as const;

/**
 * Il foglio di una nuova transazione — quello che Siri compila da sola
 * quando le detti «Log 25 euros for dinner».
 */
export function TransactionScreen() {
  const { locale, t } = useI18n();

  return (
    <ScreenShell tint="var(--area-finance)" bottomPadding={36}>
      {/* Maniglia del foglio modale. */}
      <div
        aria-hidden
        className="mx-auto rounded-full bg-ink/18"
        style={{
          width: "calc(var(--pt) * 36)",
          height: "calc(var(--pt) * 5)",
          marginTop: "calc(var(--pt) * 8)",
        }}
      />

      <div
        className="ios-gutter flex items-center justify-between"
        style={{ marginTop: "calc(var(--pt) * 16)" }}
      >
        <span className="ios-subhead text-ink-tertiary">{t("Cancel")}</span>
        <span className="ios-headline">{t("New Transaction")}</span>
        <span className="ios-subhead" style={{ color: "var(--area-finance)" }}>
          {t("Save")}
        </span>
      </div>

      <div
        className="ios-gutter flex flex-1 flex-col"
        style={{ gap: "calc(var(--pt) * 14)", paddingTop: "calc(var(--pt) * 20)" }}
      >
        <div className="text-center">
          <p
            className="tabular font-semibold"
            style={{ fontSize: "calc(var(--pt) * 52)", letterSpacing: "-0.04em" }}
          >
            {formatEUR(25, true, locale)}
          </p>
          <p className="ios-footnote text-ink-tertiary" style={{ marginTop: "calc(var(--pt) * 4)" }}>
            {t("Expense")}
          </p>
        </div>

        <div className="ios-card overflow-hidden" style={{ padding: 0 }}>
          {fields.map((field, index) => (
            <div
              key={field.label}
              className="flex items-center justify-between"
              style={{
                padding: "calc(var(--pt) * 13) calc(var(--pt) * 14)",
                borderTop: index === 0 ? undefined : "1px solid var(--border)",
              }}
            >
              <span className="ios-subhead text-ink-secondary">{t(field.label)}</span>
              <span className="flex items-center" style={{ gap: "calc(var(--pt) * 6)" }}>
                <span className="ios-subhead">{t(field.value)}</span>
                <Chevron />
              </span>
            </div>
          ))}
        </div>

        {/* Azione e tastiera stanno in fondo insieme: separarle lascia un
            vuoto fra il pulsante e i tasti che su iOS non esiste. */}
        <div
          className="mt-auto flex flex-col"
          style={{ gap: "calc(var(--pt) * 14)" }}
        >
          <div
            className="grid place-items-center rounded-full"
            style={{
              padding: "calc(var(--pt) * 13)",
              background: "var(--area-finance)",
              color: "#fff",
            }}
          >
            <span className="ios-headline">{t("Add Transaction")}</span>
          </div>

          <DecimalPad locale={locale} />
        </div>
      </div>
    </ScreenShell>
  );
}

/**
 * Il tastierino decimale di sistema.
 *
 * Un foglio di inserimento importo senza tastiera non è una schermata iOS:
 * è una schermata iOS a metà, e si vede subito.
 */
function DecimalPad({ locale }: { locale: "en" | "it" }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", locale === "it" ? "," : ".", "0", "⌫"];

  return (
    <div
      className="grid grid-cols-3"
      style={{
        gap: "calc(var(--pt) * 7) calc(var(--pt) * 6)",
        marginInline: "calc(var(--pt) * -4)",
      }}
      aria-hidden
    >
      {keys.map((key) => (
        <span
          key={key}
          className="grid place-items-center rounded-[calc(var(--pt)*6)]"
          style={{
            height: "calc(var(--pt) * 40)",
            background: key === "⌫" ? "transparent" : "var(--surface)",
            boxShadow: key === "⌫" ? "none" : "0 calc(var(--pt) * 1) 0 rgb(10 16 23 / 0.14)",
            fontSize: "calc(var(--pt) * 22)",
            fontWeight: 400,
            color: key === "⌫" ? "var(--text-secondary)" : "var(--text)",
          }}
        >
          {key}
        </span>
      ))}
    </div>
  );
}

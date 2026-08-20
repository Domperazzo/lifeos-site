import { defaultLocale, type Locale } from "@/lib/i18n/config";

type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Concatena classi ignorando i valori falsy. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}

const euroFormatters = Object.fromEntries(
  (["en", "it"] as const).map((locale) => {
    const identifier = locale === "it" ? "it-IT" : "en-IE";
    return [
      locale,
      {
        whole: new Intl.NumberFormat(identifier, {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }),
        cents: new Intl.NumberFormat(identifier, {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      },
    ];
  }),
) as Record<Locale, { whole: Intl.NumberFormat; cents: Intl.NumberFormat }>;

const decimalFormatters = Object.fromEntries(
  (["en", "it"] as const).map((locale) => [
    locale,
    new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-IE", {
      maximumFractionDigits: 1,
    }),
  ]),
) as Record<Locale, Intl.NumberFormat>;

export function formatEUR(
  value: number,
  withCents = false,
  locale: Locale = defaultLocale,
): string {
  const formatter = withCents ? euroFormatters[locale].cents : euroFormatters[locale].whole;
  return formatter.format(value);
}

export function formatSigned(value: number, locale: Locale = defaultLocale): string {
  const sign = value >= 0 ? "+" : "−";
  return `${sign}${euroFormatters[locale].whole.format(Math.abs(value))}`;
}

export function formatDecimal(value: number, locale: Locale = defaultLocale): string {
  return decimalFormatters[locale].format(value);
}

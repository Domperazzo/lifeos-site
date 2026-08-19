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

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurCents = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatEUR(value: number, withCents = false): string {
  return withCents ? eurCents.format(value) : eur.format(value);
}

export function formatSigned(value: number): string {
  const sign = value >= 0 ? "+" : "−";
  return `${sign}${eur.format(Math.abs(value))}`;
}

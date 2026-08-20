import type { Locale } from "@/lib/i18n/config";
import type { MessageKey, Translate } from "@/lib/i18n/messages";
import { formatEUR } from "@/lib/utils";

/**
 * Dati dimostrativi del sito.
 *
 * Sono realistici ma chiaramente di esempio: un solo insieme coerente,
 * riusato da tutte le sezioni e da tutte le schermate dentro i device,
 * così che il patrimonio del hero e quello della sezione Finance siano lo
 * stesso numero. Nessun dato casuale.
 */

export const lifeOverview = {
  user: "Federico",
  lifeScore: 87,
  homeStatus: "Everything under control",
  netWorth: 184_320,
  monthlyChange: 2.4,
  monthlyChangeAbs: 3_840,
  priorities: 3,
  nextCommitment: { title: "Dentist", time: "16:30" },
} as const;

export type AreaKey = "home" | "finance" | "goals" | "family" | "wellbeing" | "upkeep";

export const areaColor: Record<AreaKey, string> = {
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  goals: "var(--area-goals)",
  family: "var(--area-family)",
  wellbeing: "var(--area-wellbeing)",
  upkeep: "var(--area-upkeep)",
};

export const lifeAreas: {
  key: AreaKey;
  label: MessageKey;
  score: number;
  detail: MessageKey;
}[] = [
  { key: "home", label: "Home", score: 92, detail: "4 tasks today" },
  { key: "finance", label: "Finance", score: 88, detail: "On budget" },
  { key: "goals", label: "Goals", score: 74, detail: "2 of 3 on track" },
  { key: "family", label: "Family", score: 90, detail: "Balanced this week" },
];

export const rooms = [
  { name: "Kitchen", cleanliness: 100, tint: "#ff8a34" },
  { name: "Bathroom", cleanliness: 85, tint: "#25b8c9" },
  { name: "Living Room", cleanliness: 100, tint: "#6c63e0" },
  { name: "Laundry", cleanliness: 70, tint: "#3e93e8" },
] as const;

export const accounts = [
  { name: "Accounts", amount: 14_230, tint: "var(--area-home)", icon: "wallet" },
  { name: "Investments", amount: 162_400, tint: "var(--area-finance)", icon: "trending" },
  { name: "Credit Cards", amount: -2_310, tint: "var(--area-wellbeing)", icon: "card" },
] as const;

export const netWorthSeries = [
  168_400, 170_900, 169_800, 173_600, 176_200, 175_400, 179_100, 181_000, 184_320,
];

export const todayTasks = [
  { title: "Pay electricity bill", meta: "Due today", area: "finance" as AreaKey, urgent: true },
  { title: "Car maintenance", meta: "Schedule this week", area: "upkeep" as AreaKey, urgent: false },
  { title: "Clean bedroom", meta: "15 min", area: "home" as AreaKey, urgent: false },
] as const;

export const doneTasks = [
  { title: "Morning routine", meta: "07:20" },
  { title: "Kitchen surfaces", meta: "09:05" },
] as const;

export const automationTimeline = [
  { time: "07:00", title: "Morning routine started", detail: "Blinds up · Coffee plug on", area: "family" as AreaKey },
  { time: "08:15", title: "Everyone left home", detail: "Away mode · Vacuum started", area: "home" as AreaKey },
  { time: "18:30", title: "Arriving home", detail: "Heating adjusted to 21°", area: "upkeep" as AreaKey },
  { time: "21:00", title: "Tomorrow prepared", detail: "3 priorities selected", area: "goals" as AreaKey },
] as const;

export interface AskExample {
  question: string;
  answer: string;
  detail: string;
  /** Da dove viene la risposta: senza, è un numero senza provenienza. */
  source: string;
  /** Confronto con il periodo precedente, per le risposte numeriche. */
  comparison?: { label: string; value: number; previous: number };
  /** Le voci di una risposta che è un elenco. */
  items?: string[];
  /** Numerate solo quando l'ordine *è* parte della risposta. */
  ordered?: boolean;
}

interface AskExampleTemplate {
  question: MessageKey;
  answer: MessageKey | number;
  detail: MessageKey;
  source: MessageKey;
  comparison?: { label: MessageKey; value: number; previous: number };
  items?: MessageKey[];
  ordered?: boolean;
}

const askExampleTemplates: AskExampleTemplate[] = [
  {
    question: "How much did I spend eating out this month?",
    answer: 184,
    detail: "That's 12% less than last month.",
    source: "From 14 transactions · 1–18 August",
    comparison: { label: "Restaurants", value: 184, previous: 209 },
  },
  {
    question: "Is everything okay at home?",
    answer: "Yes.",
    detail: "All rooms are under control. Front door locked. No overdue tasks.",
    source: "Checked 6 rooms and 12 accessories · just now",
    items: ["6 rooms under control", "Front door locked", "No overdue tasks"],
  },
  {
    question: "What should I focus on today?",
    answer: "Three things.",
    detail: "In the order LifeOS would do them.",
    source: "From 14 open items · 11 are not due yet",
    ordered: true,
    items: [
      "Pay electricity bill",
      "Schedule car maintenance",
      "Finish bedroom cleaning",
    ],
  },
];

export function getAskExamples(t: Translate, locale: Locale): AskExample[] {
  return askExampleTemplates.map((example) => ({
    question: t(example.question),
    answer: typeof example.answer === "number" ? formatEUR(example.answer, false, locale) : t(example.answer),
    detail: t(example.detail),
    source: t(example.source),
    comparison: example.comparison
      ? { ...example.comparison, label: t(example.comparison.label) }
      : undefined,
    items: example.items?.map((item) => t(item)),
    ordered: example.ordered,
  }));
}

export const contextChain = [
  { label: "Calendar", note: "Nothing until 16:30" },
  { label: "Location", note: "Both away" },
  { label: "Home", note: "Living room at 70%" },
  { label: "Tasks", note: "Vacuum is due" },
  { label: "Finances", note: "Bill due in 2 days" },
] as const;

export const scenarioActions = [
  "Home set to Away",
  "Robot vacuum started",
  "Heating reduced",
  "Cleaning task completed",
] as const;

export const calendarDay = [
  { time: "09:00", title: "Kitchen deep clean", area: "home" as AreaKey, duration: "45 min" },
  { time: "13:30", title: "Pay electricity bill", area: "finance" as AreaKey, duration: "5 min" },
  { time: "16:30", title: "Dentist", area: "family" as AreaKey, duration: "1 h" },
  { time: "19:00", title: "Laundry cycle ends", area: "upkeep" as AreaKey, duration: "" },
] as const;

export const calendarWeek = [
  { day: "Mon", date: 17, today: false, count: 2 },
  { day: "Tue", date: 18, today: true, count: 4 },
  { day: "Wed", date: 19, today: false, count: 1 },
  { day: "Thu", date: 20, today: false, count: 3 },
  { day: "Fri", date: 21, today: false, count: 0 },
  { day: "Sat", date: 22, today: false, count: 2 },
  { day: "Sun", date: 23, today: false, count: 1 },
] as const;

export const recentTransactions = [
  { title: "Esselunga", meta: "Groceries", amount: -64, day: "Today" },
  { title: "Salary", meta: "Main Account", amount: 2450, day: "17 Aug" },
  { title: "Trattoria da Nino", meta: "Restaurants", amount: -38, day: "16 Aug" },
] as const;

export const tomorrowPlan = [
  { time: "08:00", title: "Morning routine", area: "family" as AreaKey },
  { time: "11:00", title: "Car maintenance", area: "upkeep" as AreaKey },
] as const;

export const roadmapAreas = [
  { title: "Apple Watch", detail: "Quick actions from your wrist." },
  { title: "Health", detail: "Sleep, activity and habits as a life area." },
  { title: "Mobility", detail: "Cars, servicing and running costs." },
  { title: "Travel", detail: "Trips connected to budget and home." },
  { title: "Documents", detail: "Warranties, contracts and expiries." },
  { title: "Assistant", detail: "Natural language across every area." },
  { title: "Deeper automation", detail: "More context, fewer decisions." },
] as const;

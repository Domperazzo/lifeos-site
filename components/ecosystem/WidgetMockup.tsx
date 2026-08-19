import { Wordmark } from "@/components/ui/wordmark";

/**
 * Un widget medio della schermata Home (338 × 158 pt).
 *
 * Il widget non è una scorciatoia all'app: è la risposta senza aprire
 * niente. Per questo mostra tre stati e nessun pulsante.
 */
export function WidgetMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-[26px] p-5 shadow-[var(--shadow-md)]"
      style={{
        aspectRatio: "338 / 158",
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(140deg, color-mix(in srgb, var(--area-home) 10%, transparent), transparent 62%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center gap-2">
          <Wordmark size={15} />
          <span className="text-[12px] font-semibold tracking-[-0.01em]">LifeOS</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-ink-tertiary">Life Score</p>
            <p className="tabular text-[30px] font-semibold leading-none tracking-[-0.03em]">
              86<span className="text-[16px] text-ink-tertiary">%</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <div>
              <p className="text-[11px] text-ink-tertiary">Home</p>
              <p className="text-[13px] font-medium">All good</p>
            </div>
            <div>
              <p className="text-[11px] text-ink-tertiary">Today</p>
              <p className="text-[13px] font-medium">2 priorities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Un dato messo in evidenza sotto il testo di un blocco. */
export function StatCallout({
  tint,
  value,
  detail,
}: {
  tint: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="mt-2 flex items-start gap-3.5 rounded-2xl border border-line bg-surface p-4">
      <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: tint }} />
      <span>
        <span className="block text-[15px] font-medium">{value}</span>
        <span className="mt-0.5 block text-[13.5px] text-ink-secondary">{detail}</span>
      </span>
    </div>
  );
}

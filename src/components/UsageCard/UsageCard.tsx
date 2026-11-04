import { StatCard } from "@/components/StatCard/StatCard";

type UsageCardProps = {
  label: string;
  percent?: number;
  detail?: string;
};

export function UsageCard({ label, percent, detail }: UsageCardProps) {
  const width = Math.min(100, Math.max(0, percent ?? 0));

  return (
    <StatCard label={label} className="min-w-[130px] flex-[0_1_150px] gap-2">
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-[22px] font-bold">
          {percent !== undefined ? `${percent.toFixed(0)}%` : "—"}
        </span>
        {detail && <span className="font-mono text-[12px] text-muted">{detail}</span>}
      </div>
      <div
        className="h-[3px] overflow-hidden rounded-sm bg-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(width)}
      >
        <div className="h-full bg-accent transition-[width] duration-600 ease-in-out" style={{ width: `${width}%` }} />
      </div>
    </StatCard>
  );
}

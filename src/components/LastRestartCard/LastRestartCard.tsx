import { StatCard } from "@/components/StatCard/StatCard";
import { formatRelativeDays, formatRestartDate } from "@/utils/format";

export function LastRestartCard({ iso }: { iso?: string }) {
  return (
    <StatCard label="Último restart" className="min-w-[150px] flex-[0_1_170px]">
      <span className="font-mono text-[18px] font-bold">{iso ? formatRestartDate(iso) : "—"}</span>
      <span className="font-mono text-[12px] text-muted">{iso ? formatRelativeDays(iso) : " "}</span>
    </StatCard>
  );
}

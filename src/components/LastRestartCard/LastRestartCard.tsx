import { StatCard } from "@/components/StatCard/StatCard";
import { formatRelativeDays, formatRestartDate } from "@/utils/format";

export function LastRestartCard({ date }: { date?: Date }) {
  return (
    <StatCard label="Último restart" className="min-w-[150px] flex-[0_1_170px]">
      <span className="font-mono text-[18px] font-bold">{date ? formatRestartDate(date) : "—"}</span>
      <span className="font-mono text-[12px] text-muted">{date ? formatRelativeDays(date) : " "}</span>
    </StatCard>
  );
}

import { StatCard } from "@/components/StatCard/StatCard";
import { formatUptime } from "@/utils/format";

export function UptimeCard({ seconds }: { seconds?: number }) {
  return (
    <StatCard label="Uptime" className="min-w-40 flex-[0_1_220px]">
      <span className="font-mono text-[22px] font-bold text-accent">
        {seconds !== undefined ? formatUptime(seconds) : "—"}
      </span>
    </StatCard>
  );
}

"use client";

import { StatCard } from "@/components/StatCard/StatCard";
import { useNow } from "@/hooks/useNow";
import { formatUptime } from "@/utils/format";

export function UptimeCard({ since }: { since?: Date }) {
  const now = useNow(1000);

  return (
    <StatCard label="Uptime" className="min-w-40 flex-[0_1_220px]">
      <span className="font-mono text-[22px] font-bold text-accent">{since ? formatUptime(since, now) : "—"}</span>
    </StatCard>
  );
}

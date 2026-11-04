"use client";

import { useVpsLogs, useVpsStatus } from "@/hooks/useVps";
import { formatGb, percent } from "@/utils/format";
import { UptimeCard } from "@/components/UptimeCard/UptimeCard";
import { UsageCard } from "@/components/UsageCard/UsageCard";
import { LastRestartCard } from "@/components/LastRestartCard/LastRestartCard";
import { Console } from "@/components/Console/Console";

export function Dashboard() {
  const { data: status } = useVpsStatus();
  const { data: logs, error: logsError } = useVpsLogs();

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="flex w-full max-w-[1216px] flex-col gap-6">
        <header className="flex flex-wrap items-stretch gap-3">
          <UptimeCard since={status?.uptime} />

          <div className="hidden flex-[1_1_40px] sm:block" />

          <UsageCard
            label="RAM"
            percent={status ? percent(status.ram.used, status.ram.total) : undefined}
            detail={status ? `${formatGb(status.ram.used)}/${formatGb(status.ram.total)} GB` : undefined}
          />
          <UsageCard
            label="CPU"
            percent={status?.cpu.percent}
            detail={status ? `${status.cpu.cores} vCPU` : undefined}
          />
          <UsageCard
            label="Disk"
            percent={status ? percent(status.disk.used, status.disk.total) : undefined}
            detail={status ? `${formatGb(status.disk.used)}/${formatGb(status.disk.total)} GB` : undefined}
          />

          <LastRestartCard date={status?.lastRestart} />
        </header>

        <Console logs={logs ?? []} error={logsError} />
      </div>
    </div>
  );
}

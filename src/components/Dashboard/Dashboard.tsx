"use client";

import { useVpsLogs, useVpsStatus } from "@/hooks/useVps";
import { formatGb, percent } from "@/utils/format";
import { UptimeCard } from "@/components/UptimeCard/UptimeCard";
import { UsageCard } from "@/components/UsageCard/UsageCard";
import { LastRestartCard } from "@/components/LastRestartCard/LastRestartCard";
import { Console } from "@/components/Console/Console";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const { data: status } = useVpsStatus();
  const { data: logs, error: logsError } = useVpsLogs();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <UptimeCard seconds={status?.uptimeSeconds} />

          <div className={styles.spacer} />

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

          <LastRestartCard iso={status?.lastRestart} />
        </header>

        <Console hostname={status?.hostname} logs={logs ?? []} error={logsError} />
      </div>
    </div>
  );
}

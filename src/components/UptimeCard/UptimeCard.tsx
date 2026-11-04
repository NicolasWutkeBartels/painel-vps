import { StatCard } from "@/components/StatCard/StatCard";
import { formatUptime } from "@/utils/format";
import styles from "./UptimeCard.module.css";

export function UptimeCard({ seconds }: { seconds?: number }) {
  return (
    <StatCard label="Uptime" style={{ flex: "0 1 220px", minWidth: 160 }}>
      <span className={styles.value}>{seconds !== undefined ? formatUptime(seconds) : "—"}</span>
    </StatCard>
  );
}

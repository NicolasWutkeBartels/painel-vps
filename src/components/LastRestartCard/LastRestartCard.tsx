import { StatCard } from "@/components/StatCard/StatCard";
import { formatRelativeDays, formatRestartDate } from "@/utils/format";
import styles from "./LastRestartCard.module.css";

export function LastRestartCard({ iso }: { iso?: string }) {
  return (
    <StatCard label="Último restart" style={{ flex: "0 1 170px", minWidth: 150 }}>
      <span className={styles.value}>{iso ? formatRestartDate(iso) : "—"}</span>
      <span className={styles.detail}>{iso ? formatRelativeDays(iso) : " "}</span>
    </StatCard>
  );
}

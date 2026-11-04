import { StatCard } from "@/components/StatCard/StatCard";
import styles from "./UsageCard.module.css";

type UsageCardProps = {
  label: string;
  percent?: number;
  detail?: string;
};

export function UsageCard({ label, percent, detail }: UsageCardProps) {
  const width = Math.min(100, Math.max(0, percent ?? 0));

  return (
    <StatCard label={label} gap={8} style={{ flex: "0 1 150px", minWidth: 130 }}>
      <div className={styles.row}>
        <span className={styles.value}>{percent !== undefined ? `${percent.toFixed(0)}%` : "—"}</span>
        {detail && <span className={styles.detail}>{detail}</span>}
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(width)}
      >
        <div className={styles.bar} style={{ width: `${width}%` }} />
      </div>
    </StatCard>
  );
}

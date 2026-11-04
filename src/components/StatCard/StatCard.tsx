import type { CSSProperties, ReactNode } from "react";
import styles from "./StatCard.module.css";

type StatCardProps = {
  label: string;
  children: ReactNode;
  style?: CSSProperties;
  gap?: number;
};

export function StatCard({ label, children, style, gap }: StatCardProps) {
  return (
    <div className={styles.card} style={{ ...style, ...(gap ? { gap } : {}) }}>
      <span className={styles.label}>{label}</span>
      {children}
    </div>
  );
}

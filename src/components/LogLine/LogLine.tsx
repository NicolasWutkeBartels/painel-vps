import type { LogLine as LogLineData } from "@/schemas/log";
import styles from "./LogLine.module.css";

export function LogLine({ time, level, message }: LogLineData) {
  const messageClass = [styles.message, styles[`message${level}`]].filter(Boolean).join(" ");

  return (
    <div className={styles.line}>
      <span className={styles.time}>[{time}</span>
      <span className={`${styles.level} ${styles[level]}`}>{level}]:</span>
      <span className={messageClass}>{message}</span>
    </div>
  );
}

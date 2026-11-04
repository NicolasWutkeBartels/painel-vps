"use client";

import { useEffect, useRef } from "react";
import type { LogLine as LogLineData } from "@/schemas/log";
import { LogLine } from "@/components/LogLine/LogLine";
import { CommandInput } from "@/components/CommandInput/CommandInput";
import styles from "./Console.module.css";

type ConsoleProps = {
  hostname?: string;
  logs: LogLineData[];
  error?: string | null;
};

export function Console({ hostname, logs, error }: ConsoleProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <section className={styles.console} aria-label="Console">
      <div ref={outputRef} className={styles.output} role="log" aria-label="Saída do console">
        {logs.map((line, i) => (
          <LogLine key={`${line.time}-${i}`} {...line} />
        ))}
        {logs.length === 0 && !error && <span className={styles.empty}>Aguardando logs…</span>}
        {error && <span className={styles.error}>Falha ao buscar logs: {error}</span>}
      </div>
      <CommandInput hostname={hostname} />
    </section>
  );
}

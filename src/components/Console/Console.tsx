"use client";

import { useEffect, useRef } from "react";
import type { LogLine as LogLineData } from "@/schemas/log";
import { LogLine } from "@/components/LogLine/LogLine";
import { CommandInput } from "@/components/CommandInput/CommandInput";

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
    <section className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface" aria-label="Console">
      <div
        ref={outputRef}
        className="flex h-[480px] flex-col overflow-y-auto px-[18px] py-3.5 font-mono text-[14px] leading-[1.55]"
        role="log"
        aria-label="Saída do console"
      >
        {logs.map((line, i) => (
          <LogLine key={`${line.time}-${i}`} {...line} />
        ))}
        {logs.length === 0 && !error && <span className="text-dim">Aguardando logs…</span>}
        {error && <span className="text-error-soft">Falha ao buscar logs: {error}</span>}
      </div>
      <CommandInput hostname={hostname} />
    </section>
  );
}

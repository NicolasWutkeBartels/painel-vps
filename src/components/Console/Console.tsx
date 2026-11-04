"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ConsoleLine, LogLine as LogLineData } from "@/schemas/log";
import { LogLine } from "@/components/LogLine/LogLine";
import { CommandInput } from "@/components/CommandInput/CommandInput";
import { useCommand } from "@/hooks/useCommand";

type ConsoleProps = {
  logs: LogLineData[];
  error?: string | null;
};

export function Console({ logs, error }: ConsoleProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const { lines: commandLines, history, running, execute } = useCommand();

  // Junta logs do servidor e saída dos comandos, ordenando pelo horário (HH:MM:SS).
  const lines = useMemo<ConsoleLine[]>(() => {
    const serverLines: ConsoleLine[] = logs.map((log) => ({ ...log, kind: "log" }));
    return [...serverLines, ...commandLines]
      .map((line, index) => ({ line, index }))
      .sort((a, b) => a.line.time.localeCompare(b.line.time) || a.index - b.index)
      .map(({ line }) => line);
  }, [logs, commandLines]);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface" aria-label="Console">
      <div
        ref={outputRef}
        className="flex h-[480px] flex-col overflow-y-auto px-[18px] py-3.5 font-mono text-[14px] leading-[1.55]"
        role="log"
        aria-label="Saída do console"
      >
        {lines.map((line, i) => (
          <LogLine key={`${line.time}-${i}`} line={line} />
        ))}
        {lines.length === 0 && !error && <span className="text-dim">Aguardando logs…</span>}
        {error && <span className="text-error-soft">Falha ao buscar logs: {error}</span>}
      </div>
      <CommandInput history={history} running={running} onSubmit={execute} />
    </section>
  );
}

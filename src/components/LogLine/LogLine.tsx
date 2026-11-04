import type { LogLevel, LogLine as LogLineData } from "@/schemas/log";

const levelClass: Record<LogLevel, string> = {
  INFO: "text-muted",
  WARN: "text-warn",
  ERROR: "text-error",
  CMD: "text-accent",
};

const messageClass: Record<LogLevel, string> = {
  INFO: "text-fg-strong",
  WARN: "text-fg-strong",
  ERROR: "text-error-soft",
  CMD: "text-accent",
};

export function LogLine({ time, level, message }: LogLineData) {
  return (
    <div className="flex flex-wrap gap-x-2">
      <span className="text-dim">[{time}</span>
      <span className={`font-bold ${levelClass[level]}`}>{level}]:</span>
      <span className={`min-w-0 flex-[1_1_280px] wrap-anywhere ${messageClass[level]}`}>{message}</span>
    </div>
  );
}

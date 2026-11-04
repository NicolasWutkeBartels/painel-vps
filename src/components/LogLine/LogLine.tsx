import type { ConsoleLine, LogLevel } from "@/schemas/log";
import { formatLogTime } from "@/utils/format";

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

export function LogLine({ line }: { line: ConsoleLine }) {
  if (line.kind === "output") {
    return (
      <div className={`whitespace-pre-wrap wrap-anywhere ${line.error ? "text-error-soft" : "text-fg-strong"}`}>
        {line.message || " "}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-2">
      <span className="text-dim">[{formatLogTime(line.time)}</span>
      <span className={`font-bold ${levelClass[line.level]}`}>{line.level}]:</span>
      <span className={`min-w-0 flex-[1_1_280px] wrap-anywhere ${messageClass[line.level]}`}>{line.message}</span>
    </div>
  );
}

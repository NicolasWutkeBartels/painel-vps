const GB = 1024 ** 3;
const pad = (n: number) => String(n).padStart(2, "0");

export function formatGb(bytes: number): string {
  const value = bytes / GB;
  return value >= 100 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "");
}

export function percent(used: number, total: number): number {
  return total > 0 ? (used / total) * 100 : 0;
}

/** Tempo decorrido desde `since` no formato "32d 11h 04m". */
export function formatUptime(since: Date, now: number = Date.now()): string {
  const totalSeconds = Math.max(0, Math.floor((now - since.getTime()) / 1000));
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${d}d ${h}h ${pad(m)}m`;
}

export function formatRestartDate(date: Date): string {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} · ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatRelativeDays(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return "hoje";
  if (days === 1) return "há 1 dia";
  return `há ${days} dias`;
}

export function formatClock(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/** Exibe só hora e minuto: "14:32:08" → "14:32". Outros formatos passam como vieram. */
export function formatLogTime(time: string): string {
  const match = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(time.trim());
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : time;
}

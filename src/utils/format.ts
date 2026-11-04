const GB = 1024 ** 3;

export function formatGb(bytes: number): string {
  const value = bytes / GB;
  return value >= 100 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "");
}

export function percent(used: number, total: number): number {
  return total > 0 ? (used / total) * 100 : 0;
}

export function formatUptime(totalSeconds: number): string {
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${d}d ${h}h ${String(m).padStart(2, "0")}m`;
}

export function formatRestartDate(iso: string): string {
  const date = new Date(iso);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd}/${mm} · ${hh}:${min}`;
}

export function formatRelativeDays(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "hoje";
  if (days === 1) return "há 1 dia";
  return `há ${days} dias`;
}

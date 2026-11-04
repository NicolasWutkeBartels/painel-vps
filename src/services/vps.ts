import { api } from "@/lib/api";
import { statusSchema, type VpsStatus } from "@/schemas/status";
import { logListSchema, type LogLine } from "@/schemas/log";

export async function getStatus(): Promise<VpsStatus> {
  const { data } = await api.get("/status");
  return statusSchema.parse(data);
}

export async function getLogs(): Promise<LogLine[]> {
  const { data } = await api.get("/logs");
  return logListSchema.parse(data);
}

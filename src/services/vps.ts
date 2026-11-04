import { api } from "@/lib/api";
import { env } from "@/lib/env";
import { statusSchema, type VpsStatus } from "@/schemas/status";
import { logListSchema, type LogLine } from "@/schemas/log";
import { commandRequestSchema, commandResponseSchema, type CommandResponse } from "@/schemas/command";

export async function getStatus(): Promise<VpsStatus> {
  const { data } = await api.get("/status");
  return statusSchema.parse(data);
}

export async function getLogs(): Promise<LogLine[]> {
  const { data } = await api.get("/logs");
  return logListSchema.parse(data);
}

export async function runCommand(command: string): Promise<CommandResponse> {
  const body = commandRequestSchema.parse({ command });
  const { data } = await api.post("/command", body, { timeout: env.NEXT_PUBLIC_COMMAND_TIMEOUT });
  return commandResponseSchema.parse(data);
}

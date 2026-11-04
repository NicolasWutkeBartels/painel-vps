import { z } from "zod";

export const logLevelSchema = z.enum(["INFO", "WARN", "ERROR", "CMD"]);

export const logLineSchema = z.object({
  time: z.string(),
  level: logLevelSchema,
  message: z.string(),
});

export const logListSchema = z.array(logLineSchema);

export type LogLevel = z.infer<typeof logLevelSchema>;
export type LogLine = z.infer<typeof logLineSchema>;

/** Linha exibida no console: logs do servidor + saída dos comandos digitados. */
export type ConsoleLine =
  | (LogLine & { kind: "log" })
  | { kind: "output"; time: string; message: string; error?: boolean };

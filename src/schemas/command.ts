import { z } from "zod";

export const commandRequestSchema = z.object({
  command: z.string().trim().min(1, "Comando vazio").max(1000, "Comando muito longo"),
});

export const commandResponseSchema = z.object({
  output: z.string(),
  exitCode: z.number().int().optional(),
});

export type CommandRequest = z.infer<typeof commandRequestSchema>;
export type CommandResponse = z.infer<typeof commandResponseSchema>;

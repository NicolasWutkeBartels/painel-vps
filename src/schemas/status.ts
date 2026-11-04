import { z } from "zod";
import { timestampSchema } from "./timestamp";

export const usageSchema = z.object({
  used: z.number().nonnegative(),
  total: z.number().positive(),
});

export const statusSchema = z.object({
  /** Momento em que a VPS ligou; o uptime é calculado a partir dele. */
  uptime: timestampSchema,
  lastRestart: timestampSchema,
  cpu: z.object({
    percent: z.number().min(0).max(100),
    cores: z.number().int().positive(),
  }),
  ram: usageSchema,
  disk: usageSchema,
});

export type Usage = z.infer<typeof usageSchema>;
export type VpsStatus = z.infer<typeof statusSchema>;

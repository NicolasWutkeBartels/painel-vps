import { z } from "zod";

export const usageSchema = z.object({
  used: z.number().nonnegative(),
  total: z.number().positive(),
});

export const statusSchema = z.object({
  hostname: z.string(),
  uptimeSeconds: z.number().nonnegative(),
  lastRestart: z.string().datetime({ offset: true }),
  cpu: z.object({
    percent: z.number().min(0).max(100),
    cores: z.number().int().positive(),
  }),
  ram: usageSchema,
  disk: usageSchema,
});

export type Usage = z.infer<typeof usageSchema>;
export type VpsStatus = z.infer<typeof statusSchema>;

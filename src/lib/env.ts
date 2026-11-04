import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_POLL_INTERVAL: z.coerce.number().int().positive().default(2000),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_POLL_INTERVAL: process.env.NEXT_PUBLIC_POLL_INTERVAL,
});

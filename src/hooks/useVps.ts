"use client";

import { env } from "@/lib/env";
import { getLogs, getStatus } from "@/services/vps";
import { usePolling } from "./usePolling";

export function useVpsStatus() {
  return usePolling(getStatus, env.NEXT_PUBLIC_POLL_INTERVAL);
}

export function useVpsLogs() {
  return usePolling(getLogs, env.NEXT_PUBLIC_POLL_INTERVAL);
}

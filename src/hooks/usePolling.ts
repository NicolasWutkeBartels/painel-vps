"use client";

import { useEffect, useState } from "react";

export function usePolling<T>(fetcher: () => Promise<T>, intervalMs: number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const result = await fetcher();
        if (!active) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    };

    run();
    const id = setInterval(run, intervalMs);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [fetcher, intervalMs]);

  return { data, error };
}

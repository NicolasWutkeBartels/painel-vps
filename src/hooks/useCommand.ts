"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { ZodError } from "zod";
import { runCommand } from "@/services/vps";
import type { ConsoleLine } from "@/schemas/log";
import { formatClock } from "@/utils/format";

function errorMessage(err: unknown): string {
  if (err instanceof ZodError) return err.issues[0]?.message ?? "Resposta inválida";
  if (axios.isAxiosError(err)) {
    const apiMessage = (err.response?.data as { message?: unknown } | undefined)?.message;
    if (typeof apiMessage === "string") return apiMessage;
    return err.message;
  }
  return err instanceof Error ? err.message : "Erro desconhecido";
}

export function useCommand() {
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const execute = useCallback(async (raw: string) => {
    const command = raw.trim();
    if (!command) return;

    setHistory((prev) => [...prev, command]);

    if (command === "clear") {
      setLines([]);
      return;
    }

    const time = formatClock(new Date());
    setLines((prev) => [...prev, { kind: "log", time, level: "CMD", message: `# ${command}` }]);
    setRunning(true);

    try {
      const { output, exitCode } = await runCommand(command);
      const failed = exitCode !== undefined && exitCode !== 0;
      const outputLines = output.replace(/\n$/, "").split("\n").filter((l, i, arr) => l !== "" || arr.length > 1);
      setLines((prev) => [
        ...prev,
        ...outputLines.map((message) => ({ kind: "output" as const, time, message, error: failed })),
        ...(failed ? [{ kind: "output" as const, time, message: `exit code ${exitCode}`, error: true }] : []),
      ]);
    } catch (err) {
      setLines((prev) => [...prev, { kind: "output", time, message: errorMessage(err), error: true }]);
    } finally {
      setRunning(false);
    }
  }, []);

  return { lines, history, running, execute };
}

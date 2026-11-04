"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

type CommandInputProps = {
  history: string[];
  running: boolean;
  onSubmit: (command: string) => void;
};

export function CommandInput({ history, running, onSubmit }: CommandInputProps) {
  const [value, setValue] = useState("");
  // Posição no histórico: history.length = linha nova (ainda não enviada).
  const [cursor, setCursor] = useState<number | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (running || !value.trim()) return;
    onSubmit(value);
    setValue("");
    setCursor(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (history.length === 0) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.max(0, (cursor ?? history.length) - 1);
      setCursor(next);
      setValue(history[next]);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-12 items-center gap-2.5 border-t border-line-soft px-[18px] font-mono text-[14px]"
    >
      <span className="font-bold text-accent" aria-hidden="true">
        #
      </span>
      <label htmlFor="cmd" className="sr-only">
        Comando
      </label>
      <input
        id="cmd"
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setCursor(null);
        }}
        onKeyDown={handleKeyDown}
        disabled={running}
        placeholder={running ? "Executando…" : "Digite um comando…"}
        className="min-h-11 min-w-0 grow border-none bg-transparent font-mono text-[14px] text-fg caret-accent outline-none disabled:opacity-60"
      />
    </form>
  );
}

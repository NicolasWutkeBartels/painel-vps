export function CommandInput({ hostname }: { hostname?: string }) {
  return (
    <div className="flex min-h-12 items-center gap-2.5 border-t border-line-soft px-[18px] font-mono text-[14px]">
      <span className="whitespace-nowrap font-bold text-accent" aria-hidden="true">
        container@{hostname ?? "vps"} ~ $
      </span>
      <label htmlFor="cmd" className="sr-only">
        Comando
      </label>
      <input
        id="cmd"
        type="text"
        readOnly
        placeholder="Digite um comando…"
        className="min-h-11 min-w-0 grow border-none bg-transparent font-mono text-[14px] text-fg outline-none"
      />
    </div>
  );
}

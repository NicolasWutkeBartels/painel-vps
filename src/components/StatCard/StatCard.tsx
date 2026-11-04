import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function StatCard({ label, children, className = "" }: StatCardProps) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-[10px] border border-line px-4 py-3.5 ${className}`}>
      <span className="text-[11px] uppercase tracking-[0.1em] text-muted">{label}</span>
      {children}
    </div>
  );
}

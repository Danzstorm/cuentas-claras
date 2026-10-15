import type { ReactNode } from "react";

const PALETTE = ["#f2b632", "#7aa7ff", "#ff8f70", "#7fd1a8", "#c49bff", "#ffb3d1", "#8fd3e8", "#e0c97a"];

export function Avatar({ name, index, size = "md" }: { name: string; index: number; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm";
  return (
    <span
      className={`${dim} inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink font-display font-bold`}
      style={{ background: PALETTE[index % PALETTE.length] }}
      aria-hidden
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function Card({ title, step, children, aside }: { title: string; step: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="receipt rounded-t-xl px-5 pb-6 pt-5">
      <header className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight">
          <span className="mr-2 font-mono text-xs font-bold text-muted">{step}</span>
          {title}
        </h2>
        {aside}
      </header>
      {children}
    </section>
  );
}

export function ErrorText({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="pop mt-2 rounded-md bg-owe-soft px-3 py-2 text-sm font-medium text-owe">
      {children}
    </p>
  );
}

export const inputClass =
  "w-full rounded-lg border-[1.5px] border-line bg-white px-3 py-2.5 text-[15px] outline-none transition focus:border-ink";

export const buttonClass =
  "rounded-lg border-[1.5px] border-ink bg-ink px-4 py-2.5 font-display text-[15px] font-bold text-paper shadow-[3px_3px_0_var(--color-accent)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40";

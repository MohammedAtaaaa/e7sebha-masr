import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "gold" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400": variant === "default",
          "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)]": variant === "secondary",
          "bg-gold-50 text-gold-700 dark:bg-gold-800/30 dark:text-gold-400": variant === "gold",
          "border border-[var(--border-color)] text-[var(--text-muted)]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

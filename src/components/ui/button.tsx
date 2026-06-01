import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "gold";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-press",
          {
            "bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30": variant === "default",
            "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-900/20 shadow-sm": variant === "secondary",
            "border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] hover:border-brand-500/30": variant === "outline",
            "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]": variant === "ghost",
            "text-brand-500 underline-offset-4 hover:underline": variant === "link",
            "bg-gradient-to-l from-gold-400 to-gold-500 text-white hover:from-gold-500 hover:to-gold-600 shadow-md shadow-gold-400/20": variant === "gold",
          },
          {
            "h-10 px-5 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs rounded-lg": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10 rounded-lg": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

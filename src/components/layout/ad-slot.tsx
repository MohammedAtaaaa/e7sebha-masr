interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  return (
    <div
      className={`ad-slot bg-[var(--bg-elevated)] border border-dashed border-[var(--border-color)] rounded-2xl flex items-center justify-center min-h-[90px] text-[var(--text-muted)] text-sm ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <span>مساحة إعلانية</span>
    </div>
  );
}

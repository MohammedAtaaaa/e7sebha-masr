interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  return (
    <div
      className={`ad-slot bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center min-h-[90px] text-gray-400 text-sm ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <span>مساحة إعلانية</span>
    </div>
  );
}

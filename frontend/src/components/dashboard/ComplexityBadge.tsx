import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface ComplexityBadgeProps {
  type: "Time" | "Space";
  value: string;
}

export function ComplexityBadge({ type, value }: ComplexityBadgeProps) {
  const isOptimal =
    value === "O(1)" || value === "O(log n)" || value === "O(n)";

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/60 shadow-sm animate-scale-in">
      <Activity
        className={`h-4 w-4 ${isOptimal ? "text-green-500" : "text-amber-500"}`}
      />
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {type}
      </span>
      <Badge
        variant="secondary"
        className={`font-mono text-xs ${isOptimal ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
      >
        {value}
      </Badge>
    </div>
  );
}

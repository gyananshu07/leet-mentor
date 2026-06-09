"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React from "react";

interface HintsSectionProps {
  loading: boolean;
  hints: string[];
  hasGenerated: boolean;
  className?: string;
}

const HintsSection = ({
  loading,
  hints,
  hasGenerated,
  className,
}: HintsSectionProps) => {
  const [revealedCount, setRevealedCount] = React.useState(
    hints.length > 0 ? 1 : 0,
  );

  const revealNext = () => {
    setRevealedCount((prev) => Math.min(prev + 1, hints.length));
  };

  return (
    <div className={className || "space-y-3"}>
      {loading && (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row gap-2"
            >
              <Skeleton className="h-5 w-14 bg-primary/20 shrink-0" />
              <div className="space-y-2 w-full pt-0.5">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-[85%] bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && hints.length > 0 && (
        <div className="space-y-2">
          {hints.slice(0, revealedCount).map((hint: string, index: number) => (
            <div
              key={index + 1}
              className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground animate-in fade-in slide-in-from-top-2 duration-300 ease-out"
            >
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/20 text-primary text-xs font-bold mr-2 shrink-0">
                {index + 1}
              </span>
              {hint}
            </div>
          ))}

          {/* Reveal next hint button */}
          {revealedCount < hints.length && (
            <Button
              type="button"
              variant="outline"
              onClick={revealNext}
              className="w-full flex items-center justify-center gap-1.5 py-4 text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10 border-dashed border-primary/30 transition-all animate-fade-in"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              Reveal Hint {revealedCount + 1} of {hints.length}
            </Button>
          )}
        </div>
      )}

      {!loading && hasGenerated && hints.length === 0 && (
        <div className="text-sm text-muted-foreground py-2">
          No hints generated. Try providing more details about the problem.
        </div>
      )}
    </div>
  );
};

export default HintsSection;

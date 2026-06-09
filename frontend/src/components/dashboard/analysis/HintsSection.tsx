"use client";

import { Skeleton } from "@/components/ui/skeleton";
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
              className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row gap-2"
            >
              <Skeleton className="h-5 w-14 bg-blue-200/60 shrink-0" />
              <div className="space-y-2 w-full pt-0.5">
                <Skeleton className="h-4 w-full bg-slate-200/60" />
                <Skeleton className="h-4 w-[85%] bg-slate-200/60" />
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
              className="text-sm p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-700 animate-in fade-in slide-in-from-top-2 duration-300 ease-out"
            >
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-2 shrink-0">
                {index + 1}
              </span>
              {hint}
            </div>
          ))}

          {/* Reveal next hint button */}
          {revealedCount < hints.length && (
            <button
              type="button"
              onClick={revealNext}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-lg border border-dashed border-blue-200 transition-all animate-fade-in"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              Reveal Hint {revealedCount + 1} of {hints.length}
            </button>
          )}
        </div>
      )}

      {!loading && hasGenerated && hints.length === 0 && (
        <div className="text-sm text-slate-400 py-2">
          No hints generated. Try providing more details about the problem.
        </div>
      )}
    </div>
  );
};

export default HintsSection;

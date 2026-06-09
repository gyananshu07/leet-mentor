import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface ConceptsSectionProps {
  loading: boolean;
  concepts: string[];
  hasGenerated: boolean;
  className?: string;
}

const ConceptsSection = ({
  loading,
  concepts,
  hasGenerated,
  className,
}: ConceptsSectionProps) => {
  return (
    <div className={className || "space-y-3"}>
      {loading && (
        <div className="flex flex-wrap gap-2 animate-pulse pt-1">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className={`h-8 bg-indigo-100/60 rounded-full ${
                ["w-16", "w-20", "w-24", "w-28"][i - 1] || "w-20"
              }`}
            />
          ))}
        </div>
      )}

      {!loading && concepts.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {concepts.map((concept: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className={`px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100/80 font-medium text-xs cursor-default transition-all hover:scale-105 animate-scale-in stagger-${
                (index % 5) + 1
              }`}
            >
              {concept}
            </Badge>
          ))}
        </div>
      )}

      {!loading && hasGenerated && concepts.length === 0 && (
        <div className="text-sm text-slate-400 pt-1">
          No concepts detected. Try providing more details about the problem.
        </div>
      )}
    </div>
  );
};

export default ConceptsSection;

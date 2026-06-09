import { AnalysisProvider } from "@/components/dashboard/analysis/AnalysisContext";
import { AnalysisResultsCard } from "@/components/dashboard/analysis/AnalysisResultsCard";
import { ProblemAnalysisCard } from "@/components/dashboard/analysis/ProblemAnalysisCard";
import { CodeReviewCard } from "@/components/dashboard/CodeReviewCard";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const mode =
    typeof searchParams.mode === "string" ? searchParams.mode : "analysis";

  return (
    <div className="max-w-7xl mx-auto space-y-3">
      {/* Page-level context heading */}
      <div className="animate-fade-in">
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          {mode === "analysis" ? "Problem Analysis" : "Code Review"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {mode === "analysis"
            ? "Paste a LeetCode problem to detect concepts and get guided hints."
            : "Submit your solution for an AI-powered code review."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        {mode === "analysis" && (
          <AnalysisProvider>
            <div className="lg:col-span-3">
              <ProblemAnalysisCard />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <AnalysisResultsCard />
            </div>
          </AnalysisProvider>
        )}

        {mode === "review" && (
          <div className="lg:col-span-5">
            <CodeReviewCard />
          </div>
        )}
      </div>
    </div>
  );
}


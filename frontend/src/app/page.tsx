import { ProblemAnalysisCard } from "@/components/dashboard/ProblemAnalysisCard";
import { CodeReviewCard } from "@/components/dashboard/CodeReviewCard";
import { ConceptsCard } from "@/components/dashboard/ConceptsCard";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const mode =
    typeof searchParams.mode === "string" ? searchParams.mode : "analysis";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mode === "analysis" && (
          <>
            <div className="lg:col-span-2">
              <ProblemAnalysisCard />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <ConceptsCard />
            </div>
          </>
        )}

        {mode === "review" && (
          <div className="lg:col-span-3">
            <CodeReviewCard />
          </div>
        )}
      </div>
    </div>
  );
}

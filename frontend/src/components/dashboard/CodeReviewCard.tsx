"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/api-client";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import { useState } from "react";
import { ComplexityBadge } from "./ComplexityBadge";

interface ReviewData {
  correctness: string;
  improvements: string[];
  timeComplexity: string;
  spaceComplexity: string;
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-3 animate-in fade-in min-h-48">
      <div className="bg-linear-to-br from-background to-primary/10 p-4 rounded-xl ring-1 ring-border/50 animate-pulse-glow">
        <FileCode2 className="h-6 w-6 text-muted-foreground/50" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-semibold text-foreground text-sm">
          Waiting for Code
        </h3>
        <p className="text-xs text-muted-foreground max-w-56 mx-auto leading-relaxed">
          Paste your code and click &quot;Review Code&quot; to see feedback and
          analysis here.
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4 animate-in fade-in flex-1">
      {/* Correctness Skeleton */}
      <div className="bg-muted/30 border border-border/50 p-2.5 rounded-lg flex gap-2.5 items-start">
        <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
        <div className="space-y-2 flex-1 pt-1">
          <Skeleton className="h-2 w-3/4" />
          <Skeleton className="h-2 w-1/2" />
        </div>
      </div>

      {/* Improvements Skeleton */}
      <div className="bg-muted/30 border border-border/50 p-2.5 rounded-lg flex gap-2.5 items-start">
        <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
        <div className="space-y-3 flex-1 pt-0.5">
          <Skeleton className="h-3 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-5/6" />
            <Skeleton className="h-2 w-4/5" />
          </div>
        </div>
      </div>

      {/* Complexity Skeletons */}
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-3 animate-in fade-in min-h-48">
      <div className="bg-destructive/10 p-4 rounded-xl ring-1 ring-destructive/20">
        <AlertTriangle className="h-6 w-6 text-destructive/70" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-semibold text-destructive text-sm">
          Analysis Failed
        </h3>
        <p className="text-xs text-muted-foreground max-w-56 mx-auto leading-relaxed">
          {error}
        </p>
      </div>
    </div>
  );
}

function ReviewResults({ review }: { review: ReviewData }) {
  return (
    <div className="space-y-4 animate-in fade-in">
      {/* Correctness */}
      <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-lg flex gap-2.5 text-xs text-foreground/90">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{review.correctness}</p>
      </div>

      {review.improvements && review.improvements.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-100 p-2.5 rounded-lg flex gap-2.5 text-xs text-foreground/90">
          <ArrowUpRight className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-medium text-amber-800 text-xs uppercase tracking-wide">
              Improvements
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground leading-relaxed">
              {review.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <ComplexityBadge type="Time" value={review.timeComplexity} />
        <ComplexityBadge type="Space" value={review.spaceComplexity} />
      </div>
    </div>
  );
}

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export function CodeReviewCard() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [review, setReview] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient<ReviewData>("/leetcode/review-code", {
        data: { code, language },
      });
      setReview(data);
    } catch (err) {
      const errorObj = err as Error;
      console.error("Failed to fetch review:", errorObj);
      setError(errorObj.message || "Failed to analyze code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Input Phase — Code Editor */}
      <Card className="lg:col-span-3 flex flex-col glass animate-slide-up stagger-2">
        <CardContent className="flex-1 flex flex-col space-y-3">
          {/* Language selector */}
          <div className="space-y-1">
            <Label className="text-xs text-foreground/80">Language</Label>
            <Select
              value={language}
              onValueChange={(val) => val && setLanguage(val)}
            >
              <SelectTrigger className="w-40 bg-white/60 h-9 text-sm">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Code textarea */}
          <div className="space-y-1 flex-1 flex flex-col">
            <Label className="text-xs text-foreground/80">Your Solution</Label>
            <div className="focus-glow rounded-md flex-1 flex">
              <Textarea
                placeholder="// Paste your code here..."
                className="flex-1 min-h-48 font-mono text-xs bg-slate-900 text-slate-100 border-none resize-none rounded-md"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full h-9 text-xs font-semibold btn-gradient text-white border-0"
            onClick={handleReview}
            disabled={isLoading || !code.trim()}
          >
            {isLoading ? "Reviewing..." : "Review Code"}
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 flex flex-col glass animate-slide-up sticky top-6 stagger-4 min-h-[400px]">
        <CardContent className="flex-1 flex flex-col space-y-3">
          <div className="section-heading mb-3 shrink-0">
            <h4 className="text-sm font-semibold text-foreground">
              Review Feedback
            </h4>
          </div>

          <div className="flex-1 flex flex-col relative min-h-48">
            {isLoading && <LoadingState />}

            {!isLoading && error && <ErrorState error={error} />}

            {!isLoading && !error && !review && <EmptyState />}

            {!isLoading && !error && review && (
              <ReviewResults review={review} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

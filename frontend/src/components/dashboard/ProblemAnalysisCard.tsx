"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Link as LinkIcon, Zap } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function ProblemAnalysisCard() {
  const [formData, setFormData] = React.useState({
    leetcode_link: "",
    problem_title: "",
    problem_difficulty: "",
    problem_statement: "",
  });
  const [hints, setHints] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasGenerated, setHasGenerated] = React.useState(false);

  const handleGenerateHints = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.leetcode_link.trim() &&
      !formData.problem_statement.trim() &&
      !formData.problem_title.trim()
    ) {
      toast.error(
        "Please provide a LeetCode link or enter problem details manually.",
      );
      return;
    }

    setLoading(true);
    setHasGenerated(false);
    try {
      const response = await fetch(
        "http://localhost:8000/leetcode/generate-hints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate hints from server.");
      }

      const data = await response.json();
      setHints(data.hints || []);
      setHasGenerated(true);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="flex flex-col h-full glass animate-slide-up"
      style={{ animationDelay: "0.1s" }}
    >
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          Problem Analysis
        </CardTitle>
        <CardDescription>
          Provide a LeetCode link or paste your problem to get hints and concept
          detection.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <form onSubmit={handleGenerateHints} className="space-y-6">
          {/* URL Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Import via LeetCode URL
            </label>

            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="https://leetcode.com/problems/..."
                className="bg-white/50 pl-9"
                value={formData.leetcode_link}
                onChange={(e) =>
                  setFormData({ ...formData, leetcode_link: e.target.value })
                }
              />
            </div>
          </div>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-2 text-slate-400 font-medium">
                Or enter manually
              </span>
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Problem Title (e.g. Two Sum)"
                  className="bg-white/50"
                  value={formData.problem_title}
                  onChange={(e) =>
                    setFormData({ ...formData, problem_title: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <Select
                  value={formData.problem_difficulty || "Easy"}
                  onValueChange={(val) =>
                    setFormData({ ...formData, problem_difficulty: val || "" })
                  }
                >
                  <SelectTrigger className="w-full bg-white/50">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Textarea
              placeholder="Paste the complete problem statement here..."
              className="min-h-30 resize-none bg-white/50"
              value={formData.problem_statement}
              onChange={(e) =>
                setFormData({ ...formData, problem_statement: e.target.value })
              }
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                variant="default"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Hints"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => toast.info("Concept detection is coming soon!")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Detect Concepts
              </Button>
            </div>
          </div>
        </form>

        {/* Results Section */}
        <div className="mt-6 space-y-3 pt-4 border-t">
          <h4 className="text-sm font-semibold text-slate-900 border-b pb-2">
            Generated Hints
          </h4>

          {loading && (
            <div className="text-sm text-slate-500 italic animate-pulse">
              Analyzing problem and generating hints...
            </div>
          )}

          {!loading && hints.length > 0 && (
            <div className="space-y-2">
              {hints.map((hint: string, index: number) => (
                <div
                  key={index + 1}
                  className="text-sm p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-700 animate-slide-up"
                >
                  <span className="font-semibold text-blue-700 mr-2">
                    Hint {index + 1}:
                  </span>
                  {hint}
                </div>
              ))}
            </div>
          )}

          {!loading && hasGenerated && hints.length === 0 && (
            <div className="text-sm text-slate-500">
              No hints generated. Please try providing more details.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

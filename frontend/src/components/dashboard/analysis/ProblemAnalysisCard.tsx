"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link as LinkIcon, PenLine, Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useAnalysis } from "./AnalysisContext";

type InputMode = "url" | "manual";

export function ProblemAnalysisCard() {
  const [inputMode, setInputMode] = React.useState<InputMode>("url");
  const [formData, setFormData] = React.useState({
    leetcode_link: "",
    problem_title: "",
    problem_difficulty: "",
    problem_statement: "",
  });

  const { loading, analyzeProblem } = useAnalysis();

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (inputMode === "url" && !formData.leetcode_link.trim()) {
      toast.error("Please provide a LeetCode URL.");
      return;
    }

    if (
      inputMode === "manual" &&
      !formData.problem_statement.trim() &&
      !formData.problem_title.trim()
    ) {
      toast.error("Please enter a problem title or statement.");
      return;
    }

    await analyzeProblem(formData);
  };

  return (
    <Card className="flex flex-col glass animate-slide-up overflow-hidden stagger-2">
      <CardContent className="flex-1 space-y-3">
        <form onSubmit={handleAnalyze} className="space-y-3">
          {/* Tab switcher */}
          <div className="flex rounded-lg bg-slate-100/80 p-1 gap-1">
            <button
              type="button"
              onClick={() => setInputMode("url")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                inputMode === "url"
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/60"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <LinkIcon className="h-3.5 w-3.5" />
              Paste URL
            </button>
            <button
              type="button"
              onClick={() => setInputMode("manual")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                inputMode === "manual"
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/60"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <PenLine className="h-3.5 w-3.5" />
              Enter Manually
            </button>
          </div>

          {/* URL Input Section */}
          {inputMode === "url" && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-xs font-medium text-slate-700">
                LeetCode Problem URL
              </label>
              <div className="relative focus-glow rounded-md">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="https://leetcode.com/problems/two-sum/"
                  className="bg-white/60 pl-9 h-9 text-sm"
                  value={formData.leetcode_link}
                  onChange={(e) =>
                    setFormData({ ...formData, leetcode_link: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-slate-400">
                We&apos;ll automatically extract the problem title, difficulty,
                and statement.
              </p>
            </div>
          )}

          {/* Manual Input Section */}
          {inputMode === "manual" && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Problem Title
                  </label>
                  <div className="focus-glow rounded-md">
                    <Input
                      placeholder="e.g. Two Sum"
                      className="bg-white/60 h-9 text-sm"
                      value={formData.problem_title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          problem_title: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Difficulty
                  </label>
                  <Select
                    value={formData.problem_difficulty || "Easy"}
                    onValueChange={(val) =>
                      setFormData({
                        ...formData,
                        problem_difficulty: val || "",
                      })
                    }
                  >
                    <SelectTrigger className="w-full bg-white/60 h-9 text-sm">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Easy
                        </span>
                      </SelectItem>
                      <SelectItem value="Medium">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          Medium
                        </span>
                      </SelectItem>
                      <SelectItem value="Hard">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          Hard
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Problem Statement
                </label>
                <div className="focus-glow rounded-md">
                  <Textarea
                    placeholder="Paste the complete problem statement here..."
                    className="min-h-28 resize-none bg-white/60 text-sm"
                    value={formData.problem_statement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        problem_statement: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-9 text-xs font-semibold btn-gradient text-white border-0"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing…
              </span>
            ) : (
              "Analyze Problem"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

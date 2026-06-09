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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
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
          <Tabs
            value={inputMode}
            onValueChange={(val) => setInputMode(val as InputMode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger
                value="url"
                className="text-xs font-medium flex gap-1.5 items-center"
              >
                <LinkIcon className="size-3" />
                Paste URL
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="text-xs font-medium flex gap-1.5 items-center"
              >
                <PenLine className="size-3" />
                Enter Manually
              </TabsTrigger>
            </TabsList>

            {/* URL Input Section */}
            <TabsContent
              value="url"
              className="space-y-2 mt-0 animate-in fade-in duration-300"
            >
              <Label className="text-xs text-foreground/80">
                LeetCode Problem URL
              </Label>
              <div className="relative focus-glow rounded-md">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                <Input
                  placeholder="https://leetcode.com/problems/two-sum/"
                  className="bg-white/60 pl-9 h-9 text-sm"
                  value={formData.leetcode_link}
                  onChange={(e) =>
                    setFormData({ ...formData, leetcode_link: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground/80">
                We&apos;ll automatically extract the problem title, difficulty,
                and statement.
              </p>
            </TabsContent>

            {/* Manual Input Section */}
            <TabsContent
              value="manual"
              className="space-y-3 mt-0 animate-in fade-in duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-foreground/80">
                    Problem Title
                  </Label>
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
                  <Label className="text-xs text-foreground/80">
                    Difficulty
                  </Label>
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
                <Label className="text-xs text-foreground/80">
                  Problem Statement
                </Label>
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
            </TabsContent>
          </Tabs>

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

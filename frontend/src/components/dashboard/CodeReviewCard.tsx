"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_REVIEW } from "@/lib/mock-data";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ComplexityBadge } from "./ComplexityBadge";

export function CodeReviewCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Input Phase — Code Editor */}
      <Card
        className="lg:col-span-3 flex flex-col glass animate-slide-up stagger-2"
      >
        <CardContent className="flex-1 flex flex-col p-4 space-y-3">
          {/* Language selector */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Language
            </label>
            <Select defaultValue="javascript">
              <SelectTrigger className="w-40 bg-white/60 h-9 text-sm">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Code textarea */}
          <div className="space-y-1 flex-1 flex flex-col">
            <label className="text-xs font-medium text-slate-700">
              Your Solution
            </label>
            <div className="focus-glow rounded-md flex-1 flex">
              <Textarea
                placeholder="// Paste your code here..."
                className="flex-1 min-h-48 font-mono text-xs bg-slate-900 text-slate-100 border-none resize-none rounded-md"
              />
            </div>
          </div>

          {/* Submit below code — Fitts's Law */}
          <Button className="w-full h-9 text-xs font-semibold btn-gradient text-white border-0">
            Review Code
          </Button>
        </CardContent>
      </Card>

      {/* Output Phase — Review Results */}
      <Card
        className="lg:col-span-2 flex flex-col glass animate-slide-up sticky top-6 stagger-4"
      >
        <CardContent className="flex-1 p-4 space-y-3">
          <div className="section-heading mb-3">
            <h4 className="text-sm font-semibold text-slate-800">
              Review Feedback
            </h4>
          </div>

          {/* Correctness */}
          <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-lg flex gap-2.5 text-xs text-slate-700 animate-slide-up">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{MOCK_REVIEW.correctness}</p>
          </div>

          {/* Improvements */}
          <div className="bg-amber-50/60 border border-amber-100 p-2.5 rounded-lg flex gap-2.5 text-xs text-slate-700 animate-slide-up">
            <ArrowUpRight className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-amber-800 text-xs uppercase tracking-wide">
                Improvements
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-600 leading-relaxed">
                {MOCK_REVIEW.improvements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Complexity badges */}
          <div className="flex items-center gap-3 pt-2">
            <ComplexityBadge type="Time" value={MOCK_REVIEW.timeComplexity} />
            <ComplexityBadge type="Space" value={MOCK_REVIEW.spaceComplexity} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

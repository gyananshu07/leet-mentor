"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Tags, BarChart3 } from "lucide-react";
import { useAnalysis } from "./AnalysisContext";
import ConceptsSection from "./ConceptsSection";
import HintsSection from "./HintsSection";

export function AnalysisResultsCard() {
  const { hints, concepts, loading, hasGenerated } = useAnalysis();

  return (
    <Card className="glass animate-slide-up flex flex-col sticky top-6 max-h-[calc(100vh-6rem)] stagger-4">
      <CardHeader className="border-b border-slate-100/80">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
          <BarChart3 className="h-4.5 w-4.5 text-indigo-500" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto relative scroll-fade">
        {!hasGenerated && !loading ? (
          <div className="h-full min-h-48 flex flex-col items-center justify-center text-center space-y-3 p-3 animate-in fade-in">
            <div className="bg-linear-to-br from-slate-50 to-blue-50/40 p-4 rounded-xl ring-1 ring-slate-100/80 animate-pulse-glow">
              <Lightbulb className="h-6 w-6 text-slate-300" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-slate-700 text-sm">
                Waiting for Input
              </h3>
              <p className="text-xs text-slate-400 max-w-56 mx-auto leading-relaxed">
                Submit a problem on the left to see detected concepts and
                generated hints here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Concepts section */}
            <div>
              <div className="section-heading flex items-center gap-2 mb-2">
                <Tags className="h-4 w-4 text-indigo-500" />
                <h4 className="text-sm font-semibold text-slate-800">
                  Detected Concepts
                </h4>
              </div>
              <ConceptsSection
                loading={loading}
                concepts={concepts}
                hasGenerated={hasGenerated}
                className="animate-in fade-in"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100/80" />

            {/* Hints section */}
            <div>
              <div className="section-heading flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <h4 className="text-sm font-semibold text-slate-800">
                  Guided Hints
                </h4>
              </div>
              <HintsSection
                key={hints.length > 0 ? hints[0].substring(0, 20) : "empty"}
                loading={loading}
                hints={hints}
                hasGenerated={hasGenerated}
                className="animate-in fade-in"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

export interface ProblemFormData {
  leetcode_link: string;
  problem_title: string;
  problem_difficulty: string;
  problem_statement: string;
}

interface AnalysisContextType {
  lastSubmittedData: ProblemFormData | null;
  setLastSubmittedData: (data: ProblemFormData | null) => void;
  hints: string[];
  concepts: string[];
  loading: boolean;
  hasGenerated: boolean;
  analyzeProblem: (formData: ProblemFormData) => Promise<void>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined,
);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [lastSubmittedData, setLastSubmittedData] =
    useState<ProblemFormData | null>(null);

  const [hints, setHints] = useState<string[]>([]);
  const [concepts, setConcepts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const analyzeProblem = async (formData: ProblemFormData) => {
    setLastSubmittedData(formData);
    setLoading(true);
    setHasGenerated(false);

    try {
      interface AnalysisResponse {
        hints?: string[];
        concepts?: string[];
      }
      
      const data = await apiClient<AnalysisResponse>("/leetcode/generate-hints", {
        data: formData,
      });

      setHints(data.hints || []);
      setConcepts(data.concepts || []);
      setHasGenerated(true);
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        lastSubmittedData,
        setLastSubmittedData,
        hints,
        concepts,
        loading,
        hasGenerated,
        analyzeProblem,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}

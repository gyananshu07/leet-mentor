"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { apiClient } from "@/lib/api-client";
import { FileCode2, History, Lightbulb, LineChart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ModeLinks() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "analysis";

  return (
    <div className="space-y-0.5 mb-4">
      <Link
        href="/?mode=analysis"
        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all text-xs font-medium ${
          mode === "analysis"
            ? "sidebar-active text-primary"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        }`}
      >
        <Lightbulb
          className={`h-3.5 w-3.5 transition-colors ${
            mode === "analysis" ? "text-primary" : "text-muted-foreground/70"
          }`}
        />
        Problem Analysis
      </Link>
      <Link
        href="/?mode=review"
        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all text-xs font-medium ${
          mode === "review"
            ? "sidebar-active text-primary"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        }`}
      >
        <FileCode2
          className={`h-3.5 w-3.5 transition-colors ${
            mode === "review" ? "text-primary" : "text-muted-foreground/70"
          }`}
        />
        Code Review
      </Link>
    </div>
  );
}

interface SessionData {
  id: string;
  type: string;
  created_at: string;
  problem_title: string | null;
}

export function Sidebar() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await apiClient<SessionData[]>("/leetcode/get-history");
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <aside className="fixed top-11 left-0 bottom-0 w-48 border-r border-border/40 bg-white/50 backdrop-blur-sm hidden lg:block z-40">
      <ScrollArea className="h-full w-full p-3">
        <div className="px-2.5 mb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Modes
        </div>

        <Suspense
          fallback={
            <div className="h-16 bg-muted/50 rounded-md animate-pulse mb-4 mx-2" />
          }
        >
          <ModeLinks />
        </Suspense>

        {/* Divider */}
        <div className="mx-2 mb-3 border-t border-border" />

        <div className="px-2.5 mb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <History className="h-2.5 w-2.5" />
          Recent Sessions
        </div>

        <div className="space-y-0.5">
          {isLoading ? (
            <div className="px-2.5 py-2 text-xs text-muted-foreground animate-pulse">
              Loading sessions...
            </div>
          ) : sessions.length === 0 ? (
            <div className="px-2.5 py-2 text-xs text-muted-foreground">
              No recent sessions
            </div>
          ) : (
            sessions.map((session, index) => {
              const displayDate = new Date(
                session.created_at,
              ).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });

              return (
                <button
                  type="button"
                  key={session.id}
                  className={`w-full flex flex-col items-start gap-0 px-2.5 py-1.5 rounded-md hover:bg-muted/60 transition-all group text-left animate-slide-up stagger-${
                    (index % 5) + 1
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full">
                    <LineChart className="h-3 w-3 text-chart-1" />
                    <span className="font-medium text-xs truncate text-foreground group-hover:text-primary transition-colors">
                      {session.problem_title || "Unknown Problem"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full pl-5">
                    <span className="text-[9px] text-muted-foreground/50">
                      {displayDate}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

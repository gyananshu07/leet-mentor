"use client";

import React, { Suspense } from 'react';
import { History, FileCode2, LineChart, MessageSquare, Lightbulb } from 'lucide-react';
import { MOCK_RECENT_SESSIONS } from '@/lib/mock-data';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ModeLinks() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'analysis';

  return (
    <div className="space-y-0.5 mb-8">
      <Link 
        href="/?mode=analysis"
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-sm font-medium ${mode === 'analysis' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'}`}
      >
        <Lightbulb className={`h-4 w-4 ${mode === 'analysis' ? 'text-blue-600' : 'text-slate-400'}`} />
        Problem Analysis
      </Link>
      <Link 
        href="/?mode=review"
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-sm font-medium ${mode === 'review' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'}`}
      >
        <FileCode2 className={`h-4 w-4 ${mode === 'review' ? 'text-blue-600' : 'text-slate-400'}`} />
        Code Review
      </Link>
    </div>
  );
}

export function Sidebar() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Review': return <FileCode2 className="h-3.5 w-3.5 text-blue-500" />;
      case 'Analysis': return <LineChart className="h-3.5 w-3.5 text-purple-500" />;
      case 'Interview': return <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />;
      default: return <History className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <aside className="w-64 border-r border-border/40 bg-white/50 backdrop-blur-sm hidden lg:block p-4 overflow-y-auto">
      <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Modes
      </div>
      
      <Suspense fallback={<div className="h-20 bg-slate-100/50 rounded-md animate-pulse mb-8 mx-3" />}>
        <ModeLinks />
      </Suspense>

      <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <History className="h-3.5 w-3.5" />
        Recent Sessions
      </div>
      
      <div className="space-y-0.5">
        {MOCK_RECENT_SESSIONS.map((session) => (
          <button 
            key={session.id}
            className="w-full flex flex-col items-start gap-0.5 px-3 py-2 rounded-md hover:bg-slate-100/50 transition-colors group text-left animate-slide-up"
            style={{ animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-2 w-full">
              {getIcon(session.type)}
              <span className="font-medium text-sm truncate text-slate-700 group-hover:text-blue-600 transition-colors">
                {session.title}
              </span>
            </div>
            <div className="flex items-center justify-between w-full pl-5">
              <span className="text-[11px] text-muted-foreground">{session.type}</span>
              <span className="text-[10px] text-muted-foreground/50">{session.date}</span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

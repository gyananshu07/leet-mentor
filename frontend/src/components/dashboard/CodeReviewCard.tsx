import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileCode2, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { MOCK_REVIEW } from '@/lib/mock-data';
import { ComplexityBadge } from './ComplexityBadge';

export function CodeReviewCard() {
  return (
    <Card className="flex flex-col h-full glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FileCode2 className="h-5 w-5 text-blue-500" />
          Code Review
        </CardTitle>
        <CardDescription>Paste your solution for a comprehensive review.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Select defaultValue="javascript">
            <SelectTrigger className="w-[180px] bg-white/50">
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
          <Button className="bg-blue-600 hover:bg-blue-700">Review Code</Button>
        </div>

        <Textarea 
          placeholder="// Paste your code here..." 
          className="flex-1 min-h-[200px] font-mono text-sm bg-slate-900 text-slate-100 border-none resize-none"
        />

        <div className="mt-4 space-y-4 border-t pt-4">
          <h4 className="text-sm font-semibold text-slate-900">Review Feedback</h4>
          
          <div className="bg-green-50/50 border border-green-100 p-3 rounded-lg flex gap-3 text-sm text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <p>{MOCK_REVIEW.correctness}</p>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-lg flex gap-3 text-sm text-slate-700">
            <ArrowUpRight className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-amber-800">Improvements:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                {MOCK_REVIEW.improvements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <ComplexityBadge type="Time" value={MOCK_REVIEW.timeComplexity} />
            <ComplexityBadge type="Space" value={MOCK_REVIEW.spaceComplexity} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MOCK_CONCEPTS } from '@/lib/mock-data';

export function ConceptsCard() {
  return (
    <Card className="glass animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
          <Tags className="h-4 w-4 text-blue-500" />
          Detected Concepts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {MOCK_CONCEPTS.map((concept, index) => (
            <Badge 
              key={concept.id} 
              variant="outline" 
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer animate-scale-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {concept.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

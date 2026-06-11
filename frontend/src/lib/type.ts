export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Concept {
  id: string;
  name: string;
}

export interface Hint {
  id: string;
  text: string;
}

export interface ReviewFeedback {
  correctness: string;
  improvements: string[];
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Session {
  id: string;
  title: string;
  type: 'Review' | 'Analysis';
  date: string;
}



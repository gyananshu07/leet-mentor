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

export const MOCK_CONCEPTS: Concept[] = [
  { id: 'c1', name: 'Arrays' },
  { id: 'c2', name: 'Hash Map' },
  { id: 'c3', name: 'Binary Search' },
  { id: 'c4', name: 'Dynamic Programming' },
  { id: 'c5', name: 'Graphs' },
  { id: 'c6', name: 'Trees' },
];

export const MOCK_HINTS: Hint[] = [
  { id: 'h1', text: 'Consider using a Hash Map to store the elements you have already seen.' },
  { id: 'h2', text: 'As you iterate through the array, check if the complement (target - current element) exists in the Hash Map.' },
  { id: 'h3', text: 'If the complement exists, you have found your answer. Otherwise, add the current element to the Hash Map.' }
];

export const MOCK_REVIEW: ReviewFeedback = {
  correctness: 'The solution is correct and handles edge cases properly.',
  improvements: [
    'You can use a `Map` instead of a plain object for slightly better performance and more intuitive key handling.',
    'Consider adding early exits if the array length is less than 2.'
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)'
};

export const MOCK_INTERVIEW_QUESTIONS: string[] = [
  'Why did you choose a hash map over sorting the array first?',
  'What happens to the space complexity if we use a two-pointer approach?',
  'Can you think of a scenario where this solution might fail or become highly inefficient?'
];

export const MOCK_RECENT_SESSIONS: Session[] = [
  { id: 's1', title: 'Two Sum', type: 'Review', date: '2 hours ago' },
  { id: 's2', title: 'Binary Search', type: 'Analysis', date: 'Yesterday' },
];

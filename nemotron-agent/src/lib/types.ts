export type ActiveView = 'chat' | 'mistake-book' | 'test' | 'test-corrections';

export type MistakeType = 
  | 'Concept Misunderstanding'
  | 'Formula / Calculation Error'
  | 'Syntax / Definition Slip'
  | 'Memory / Fact Retrieval'
  | 'Incomplete Application';

export interface MistakeEntry {
  id: string;
  topic: string;
  triggerQuestion: string;
  mistakeDescription: string;
  simplifiedExplanation: string;
  mistakeType: MistakeType;
  frequency: number;
  lastEncountered: string;
  notes: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  detectedMistake?: {
    topic: string;
    description: string;
    mistakeType: MistakeType;
  };
}

export interface TestQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  targetedMistakeTopic: string;
  hint?: string;
  userAnswer?: string;
}

export interface TestCorrection {
  questionNumber: number;
  questionText: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  mistakeType?: MistakeType;
  diagnosticFeedback: string;
  whatWentWrong: string;
  remedyTip: string;
}

export interface SubjectData {
  id: string;
  name: string;
  category: string;
  paperInfo: {
    topic: string;
    date: string;
    keywords: string[];
  };
  chatMessages: ChatMessage[];
  mistakeBook: MistakeEntry[];
  testQuestions: TestQuestion[];
  testCorrections: TestCorrection[];
  sideChatMessages: ChatMessage[];
}

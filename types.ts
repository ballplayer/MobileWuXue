export type ViewState = 'LOGIN' | 'HOME' | 'PHOTO_SEARCH' | 'SMART_GRADING' | 'CHAT' | 'EXAM_MGMT' | 'QUESTION_BANK';

export interface Student {
  id: string;
  name: string;
  score: number;
  rank: number;
  weakness: string;
}

export interface ClassData {
  id: string;
  name: string;
  grade: string;
  averageScore: number;
  studentCount: number;
  students: Student[];
  radarData: { subject: string; A: number; B: number; fullMark: number }[];
}

export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  source: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface GradingResult {
  totalScore: number;
  accuracy: string;
  feedback: string;
  details: {
    ocr: string;
    standardAnswer: string;
    reasoning: string;
  };
}
export type QuestionType = 'radio_table' | 'text_input' | 'multiple_choice' | 'true_false';

export interface Question {
  id: string;
  number: number;
  text: string; // The statement or prompt
  prefixText?: string; // For fill-in-the-blank text before blank
  suffixText?: string; // For fill-in-the-blank text after blank
  type: QuestionType;
  options?: string[]; // E.g. ['A', 'B', 'C', 'D']
  correctAnswer: string;
  explanation: string;
  paragraphLetter?: string; // Paragraph letter (e.g. 'A', 'B', 'C')
  referenceQuote?: string; // Exact quote / evidence in passage
  audioTimestamp?: number; // Time in seconds for listening questions (e.g. 18 for 0:18)
}

export interface QuestionGroup {
  id: string;
  title: string; // e.g. "Questions 14-18"
  passageRange?: string; // e.g. "Reading Passage 2 has seven paragraphs, A-G"
  instructions: string; // e.g. "Which paragraph contains the following information?"
  wordLimitNotice?: string; // e.g. "Choose ONE WORD ONLY from the passage for each answer."
  type: QuestionType;
  columns?: string[]; // e.g. ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  questions: Question[];
}

export interface Paragraph {
  letter: string;
  text: string;
}

export interface Passage {
  id: number; // 1, 2, or 3
  title: string;
  subtitle?: string;
  questionRange: string; // e.g. "Read the text and answer questions 14-26"
  introParagraphs?: string[];
  paragraphs: Paragraph[];
  questionGroups: QuestionGroup[];
}

export interface NoteItem {
  id: string;
  passageId: number;
  paragraphLetter?: string;
  quotedText?: string;
  note: string;
  timestamp: string;
}

export interface HighlightItem {
  id: string;
  passageId: number;
  paragraphLetter: string;
  selectedText: string;
  color: 'yellow' | 'green' | 'blue';
}

export type Language = 'vi' | 'en';
export type TestMode = 'reading' | 'listening';
export type AppScreen = 'home' | 'library' | 'test' | 'dashboard' | 'fulltest';

export interface LibraryTestCard {
  id: string;
  title: string;
  testMode: TestMode;
  passageOrPartNumber: number; // e.g. Passage 1/2/3 or Part 1/2/3/4
  badgeText: string; // "Passage 1", "Passage 3", "Part 1"
  isPro: boolean;
  attemptsCount: number;
  imageUrl: string;
  category: string; // 'Listening Practices' | 'Reading Practices'
  targetId: number; // Passage ID or Part Number
  topic: string; // IELTS Topic e.g. "Technology & Innovation", "Environment & Nature", etc.
}

export interface VocabTopic {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface VocabItem {
  id: string;
  word: string;
  pos: string; // 'noun' | 'verb' | 'adj' | 'adv' | 'phrase'
  mean: string;
  ex?: string;
  topicId?: string;
  phonetic?: string;
  status?: 'mastered' | 'learning' | 'unmastered';
  collocations?: string;
  notes?: string;
}

export interface ListeningSection {
  partNumber: number; // 1, 2, 3, or 4
  title: string; // e.g. "Part 1: Overseas Travel Consultation"
  questionRange: string; // e.g. "Questions 1-10"
  audioUrl: string; // URL to MP3 audio
  audioDuration: string; // e.g. "5:04"
  transcript: string;
  questionGroups: QuestionGroup[];
}

export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ThemeMode = 'light' | 'dark';
export type ExamExecutionMode = 'test' | 'practice';

export interface TestScoreResult {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  bandScore: number;
  percentage: number;
}

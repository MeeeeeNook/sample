import React from 'react';
import { Passage, TestMode, ListeningSection } from '../types';

interface BottomFooterProps {
  testMode?: TestMode;
  currentPassage?: Passage;
  currentListeningSection?: ListeningSection;
  allListeningSections?: ListeningSection[];
  answers: Record<number, string>;
  flagged: Record<number, boolean>;
  activeQuestionNum: number;
  onSelectQuestionNum: (num: number) => void;
  onToggleFlag: (num: number) => void;
  onOpenReview: () => void;
  isSolutionMode: boolean;
  isSubmitted?: boolean;
  onToggleSolutionMode: () => void;
  onSubmitTest: () => void;
  onRetakeTest?: () => void;
}

export const BottomFooter: React.FC<BottomFooterProps> = ({
  testMode = 'reading',
  currentPassage,
  currentListeningSection,
  allListeningSections = [],
  answers,
  flagged,
  activeQuestionNum,
  onSelectQuestionNum,
  onToggleFlag,
  onOpenReview,
  isSolutionMode,
  isSubmitted = false,
  onToggleSolutionMode,
  onSubmitTest,
  onRetakeTest,
}) => {
  // Collect question numbers
  const questionNumbers: number[] = [];

  if (testMode === 'reading' && currentPassage) {
    currentPassage.questionGroups.forEach((group) => {
      group.questions.forEach((q) => {
        questionNumbers.push(q.number);
      });
    });
  } else if (testMode === 'listening' && currentListeningSection) {
    // Show ONLY questions for the current displayed listening part
    currentListeningSection.questionGroups.forEach((group) => {
      group.questions.forEach((q) => {
        questionNumbers.push(q.number);
      });
    });
  }

  const isCurrentFlagged = flagged[activeQuestionNum] || false;

  return (
    <footer className="h-[52px] bg-[#FBC02D] dark:bg-[#181a22] border-t border-amber-300 dark:border-slate-800 flex items-center px-4 shrink-0 z-40 justify-between gap-2 text-gray-900 dark:text-white shadow-2xs">
      {/* Left Section: Question Palette */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full custom-scrollbar">
        {/* Question Palette Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {questionNumbers.map((num) => {
            const hasAnswer = Boolean(answers[num] && answers[num].trim() !== '');
            const isFlagged = Boolean(flagged[num]);
            const isActive = num === activeQuestionNum;

            let btnClass = 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-amber-300 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-700';

            if (isFlagged) {
              btnClass = 'bg-[#E11D48] text-white border-red-700 font-bold';
            } else if (hasAnswer) {
              btnClass = 'bg-[#005581] dark:bg-sky-700 text-white border-[#004466] dark:border-sky-800 font-bold';
            }

            return (
              <button
                key={num}
                onClick={() => onSelectQuestionNum(num)}
                className={`w-7 h-7 rounded text-[11px] font-bold border transition-all ${btnClass} ${
                  isActive ? 'ring-2 ring-gray-900 dark:ring-white scale-105 shadow-xs' : ''
                }`}
                title={`Question ${num} - ${
                  isFlagged ? 'Flagged' : hasAnswer ? 'Answered' : 'Unanswered'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Flag Toggle Button */}
        <div className="flex items-center border-l border-amber-400 dark:border-slate-700 pl-2 shrink-0">
          <button
            onClick={() => onToggleFlag(activeQuestionNum)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all text-xs font-bold uppercase ${
              isCurrentFlagged
                ? 'bg-[#E11D48] text-white'
                : 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-black/15 dark:hover:bg-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-sm">flag</span>
            <span className="hidden sm:inline text-[11px]">Flag</span>
          </button>
        </div>
      </div>

      {/* Right Section: Action Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Review / Bảng đáp án Button */}
        <button
          onClick={onOpenReview}
          className={`px-3 py-1 border rounded font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs ${
            isSolutionMode || isSubmitted
              ? 'bg-[#005581] text-white border-[#004466] hover:bg-[#004466]'
              : 'bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white border-amber-300 dark:border-slate-700'
          }`}
          title={isSolutionMode || isSubmitted ? "Xem Bảng Đáp Án Chi Tiết" : "Review All Questions"}
        >
          <span className="material-symbols-outlined text-sm">
            {isSolutionMode || isSubmitted ? 'fact_check' : 'view_list'}
          </span>
          <span>{isSolutionMode || isSubmitted ? 'Bảng đáp án' : 'Review'}</span>
        </button>

        {/* If in Solution Mode or Submitted, show Retake Test here */}
        {isSolutionMode || isSubmitted ? (
          <button
            onClick={onRetakeTest}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Retake Test</span>
          </button>
        ) : (
          /* Submit Button for Live Test Taking */
          <button
            onClick={onSubmitTest}
            className="px-5 py-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-lg uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-rose-700 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            <span>Submit Test</span>
          </button>
        )}
      </div>
    </footer>
  );
};


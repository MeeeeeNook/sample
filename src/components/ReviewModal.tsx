import React from 'react';
import { Passage } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  passages: Passage[];
  answers: Record<number, string>;
  flagged: Record<number, boolean>;
  onNavigateToQuestion: (passageId: number, questionNum: number) => void;
  onSubmitTest: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  passages,
  answers,
  flagged,
  onNavigateToQuestion,
  onSubmitTest,
}) => {
  if (!isOpen) return null;

  let totalQuestions = 0;
  let answeredCount = 0;
  let flaggedCount = 0;

  passages.forEach((p) => {
    p.questionGroups.forEach((g) => {
      g.questions.forEach((q) => {
        totalQuestions++;
        if (answers[q.number] && answers[q.number].trim() !== '') {
          answeredCount++;
        }
        if (flagged[q.number]) {
          flaggedCount++;
        }
      });
    });
  });

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1f2128] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col p-6 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#085ac0] text-3xl">
              view_list
            </span>
            <div>
              <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
                Test Review Summary
              </h2>
              <p className="text-xs text-slate-500 font-ui">
                Review your progress across all 3 Reading Passages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6 shrink-0">
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-3 rounded-2xl text-center">
            <div className="text-xl font-bold font-timer text-[#085ac0] dark:text-blue-300">
              {answeredCount} / {totalQuestions}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-ui">
              Answered
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 p-3 rounded-2xl text-center">
            <div className="text-xl font-bold font-timer text-amber-600 dark:text-amber-400">
              {unansweredCount}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-ui">
              Unanswered
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-3 rounded-2xl text-center">
            <div className="text-xl font-bold font-timer text-[#ba1a1a] dark:text-red-400">
              {flaggedCount}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-ui">
              Flagged
            </div>
          </div>
        </div>

        {/* Question Grid per Passage */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {passages.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-ui font-bold text-sm text-slate-900 dark:text-white">
                  Passage {p.id}: {p.title}
                </h3>
                <span className="text-xs font-semibold text-[#085ac0] bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                  {p.questionRange}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {p.questionGroups.flatMap((g) =>
                  g.questions.map((q) => {
                    const ans = answers[q.number];
                    const hasAns = Boolean(ans && ans.trim() !== '');
                    const isFlg = Boolean(flagged[q.number]);

                    let cardClass =
                      'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200';
                    if (isFlg) {
                      cardClass =
                        'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200';
                    } else if (hasAns) {
                      cardClass =
                        'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200';
                    }

                    return (
                      <button
                        key={q.number}
                        onClick={() => {
                          onNavigateToQuestion(p.id, q.number);
                          onClose();
                        }}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-102 shadow-2xs ${cardClass}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold font-ui text-xs">
                            Q{q.number}
                          </span>
                          {isFlg && (
                            <span className="material-symbols-outlined text-xs text-red-600">
                              flag
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] font-mono truncate mt-1 opacity-90">
                          {hasAns ? ans : <span className="italic text-slate-400">Empty</span>}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Back to Test
          </button>

          <button
            onClick={() => {
              onClose();
              onSubmitTest();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#ba1a1a] to-[#93000a] text-white font-bold text-sm rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">send</span>
            Submit Final Test
          </button>
        </div>
      </div>
    </div>
  );
};

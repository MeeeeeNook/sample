import React, { useEffect, useRef, useState } from 'react';
import { QuestionGroup, Question } from '../types';

interface QuestionsPaneProps {
  questionGroups: QuestionGroup[];
  answers: Record<number, string>;
  onAnswerChange: (questionNum: number, value: string) => void;
  activeQuestionNum?: number;
  isSolutionMode: boolean;
  isSubmitted?: boolean;
  onLocateQuestion?: (paragraphLetter: string, referenceQuote?: string, questionNum?: number) => void;
  onLookupDictionary?: (text: string) => void;
}

export const QuestionsPane: React.FC<QuestionsPaneProps> = ({
  questionGroups,
  answers,
  onAnswerChange,
  activeQuestionNum,
  isSolutionMode,
  isSubmitted = false,
  onLocateQuestion,
  onLookupDictionary,
}) => {
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [openExplains, setOpenExplains] = useState<Record<number, boolean>>({});

  const isReadOnly = isSubmitted || isSolutionMode;

  // Auto-scroll to active question if activeQuestionNum changes
  useEffect(() => {
    if (activeQuestionNum && questionRefs.current[activeQuestionNum]) {
      questionRefs.current[activeQuestionNum]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeQuestionNum]);

  const renderSolutionBox = (q: Question) => {
    const isExpanded = openExplains[q.number] !== false; // default expanded in solution mode
    const userAnswer = answers[q.number] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

    return (
        <div className="mt-3 space-y-2">
        {/* Answer Badge & Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              Answer: <strong className="ml-1 text-slate-900">{q.correctAnswer}</strong>
            </span>
            {userAnswer && (
              <span
                className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                {isCorrect ? '✓ Correct' : `✗ Your answer: ${userAnswer}`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onLocateQuestion?.(q.paragraphLetter || 'A', q.referenceQuote, q.number)
              }
              className="px-3 py-1 rounded-lg bg-[#e8f2fe] hover:bg-[#d0e4fd] text-[#005581] text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">location_on</span>
              Locate
            </button>
            <button
              type="button"
              onClick={() =>
                setOpenExplains((prev) => ({
                  ...prev,
                  [q.number]: !isExpanded,
                }))
              }
              className="px-3 py-1 rounded-lg bg-[#005581] hover:bg-[#004466] text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              {isExpanded ? 'Hide Explanation' : 'Explain'}
            </button>
          </div>
        </div>

        {/* Expanded Explanation Card */}
        {isExpanded && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 shadow-2xs">
            {q.referenceQuote && (
              <div className="flex items-start gap-1.5 text-slate-800 leading-relaxed">
                <span className="font-bold text-[#005581] shrink-0">• Cụm từ then chốt:</span>
                <span className="italic font-serif text-slate-700">"{q.referenceQuote}"</span>
              </div>
            )}
            <div className="flex items-start gap-1.5 text-slate-800 leading-relaxed">
              <span className="font-bold text-[#005581] shrink-0">• Giải thích:</span>
              <span>{q.explanation}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleMouseUp = () => {
    if (!onLookupDictionary) return;
    const selected = window.getSelection()?.toString().trim();
    if (selected && selected.length > 1) {
      onLookupDictionary(selected);
    }
  };

  return (
    <section
      onMouseUp={handleMouseUp}
      className="flex-1 h-full overflow-y-auto bg-[#F8FAFC] dark:bg-[#12141c] relative pb-20 flex flex-col gap-6 p-4 md:p-6 custom-scrollbar select-text"
    >
      {questionGroups.map((group) => (
        <div
          key={group.id}
          className="bg-white rounded-2xl shadow-2xs border border-slate-200 p-6 md:p-8 transition-all"
        >
          {/* Group Header Banner */}
          <div className="mb-6 pb-4 border-b border-slate-200">
            <h2 className="text-xs font-black text-[#005581] uppercase tracking-widest mb-1">
              {group.title}
            </h2>
            {group.passageRange && (
              <p className="text-xs font-bold text-slate-500 mb-1">
                {group.passageRange}
              </p>
            )}
            <p className="text-sm italic text-slate-600">
              {group.instructions}
            </p>
          </div>

          {/* QUESTION TYPE: Radio Table (Paragraph Matching) */}
          {group.type === 'radio_table' && group.columns && (
            <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white shadow-2xs">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider w-1/2">
                      Questions
                    </th>
                    {group.columns.map((col) => (
                      <th
                        key={col}
                        className="p-3 border-b border-slate-200 text-sm font-extrabold text-center text-slate-900"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.questions.map((q) => {
                    const isCurrentActive = activeQuestionNum === q.number;
                    const userAnswer = answers[q.number] || '';
                    const isCorrect = userAnswer.toUpperCase() === q.correctAnswer.toUpperCase();

                    return (
                      <tr
                        key={q.id}
                        ref={(el) => (questionRefs.current[q.number] = el)}
                        className={`transition-colors border-b border-slate-100 ${
                          isCurrentActive
                            ? 'bg-sky-50/80'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3.5 text-sm text-slate-800 leading-relaxed">
                          <div className="flex items-start gap-3">
                            <span className="font-bold text-xs text-white bg-[#005581] px-2 py-0.5 rounded shrink-0">
                              {q.number}
                            </span>
                            <div className="w-full">
                              <span>{q.text}</span>
                              {/* Solution mode box */}
                              {isSolutionMode && renderSolutionBox(q)}
                            </div>
                          </div>
                        </td>

                        {group.columns?.map((col) => {
                          const isChecked = userAnswer === col;
                          const isRightChoice = col === q.correctAnswer;

                          let radioColorClass = 'text-[#005581] focus:ring-[#005581]';
                          if (isSolutionMode && isChecked) {
                            radioColorClass = isCorrect ? 'text-emerald-600' : 'text-red-600';
                          }

                          return (
                            <td
                              key={col}
                              className={`p-3 border-l border-slate-100 text-center ${
                                isSolutionMode && isRightChoice
                                  ? 'bg-emerald-50'
                                  : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question_${q.number}`}
                                value={col}
                                checked={isChecked}
                                disabled={isReadOnly}
                                onChange={() => !isReadOnly && onAnswerChange(q.number, col)}
                                className={`w-4 h-4 border-slate-300 ${
                                  isReadOnly ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                                } ${radioColorClass}`}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* QUESTION TYPE: Multiple Choice or True/False */}
          {(group.type === 'multiple_choice' || group.type === 'true_false') && (
            <div className="space-y-5">
              {group.questions.map((q) => {
                const isCurrentActive = activeQuestionNum === q.number;
                const userAnswer = answers[q.number] || '';
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    ref={(el) => (questionRefs.current[q.number] = el)}
                    className={`p-4 md:p-5 rounded-xl border transition-all ${
                      isCurrentActive
                        ? 'border-[#005581] bg-sky-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3.5">
                      <span className="font-bold text-xs text-white bg-[#005581] px-2.5 py-1 rounded-md shrink-0 shadow-2xs">
                        {q.number}
                      </span>
                      <h3 className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
                        {q.text}
                      </h3>
                    </div>

                    {/* Radio Options */}
                    <div className="space-y-2.5 pl-2 md:pl-8">
                      {q.options?.map((opt) => {
                        const isSelected = userAnswer === opt;
                        const isRightAnswer = opt === q.correctAnswer;

                        let styleClasses = 'border-slate-200 hover:bg-slate-50';
                        if (isSelected) {
                          styleClasses = 'border-[#005581] bg-sky-50/80 font-bold text-[#005581]';
                        }
                        if (isSolutionMode) {
                          if (isRightAnswer) {
                            styleClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isSelected && !isCorrect) {
                            styleClasses = 'border-rose-400 bg-rose-50 text-rose-900';
                          }
                        }

                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                              isReadOnly ? 'cursor-not-allowed' : 'cursor-pointer'
                            } ${styleClasses}`}
                          >
                            <input
                              type="radio"
                              name={`q_${q.number}`}
                              value={opt}
                              checked={isSelected}
                              disabled={isReadOnly}
                              onChange={() => !isReadOnly && onAnswerChange(q.number, opt)}
                              className="w-4 h-4 text-[#005581] border-slate-300 focus:ring-[#005581]"
                            />
                            <span className="text-xs md:text-sm text-slate-800 font-medium">
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Solution Mode Controls & Explanation */}
                    {isSolutionMode && renderSolutionBox(q)}
                  </div>
                );
              })}
            </div>
          )}

          {/* QUESTION TYPE: Fill-in-the-Blank Sentence Completion */}
          {group.type === 'text_input' && (
            <div className="space-y-4">
              {group.questions.map((q) => {
                const isCurrentActive = activeQuestionNum === q.number;
                const userAnswer = answers[q.number] || '';
                const isCorrect =
                  userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                return (
                  <div
                    key={q.id}
                    ref={(el) => (questionRefs.current[q.number] = el)}
                    className={`p-4 md:p-5 rounded-xl border transition-all ${
                      isCurrentActive
                        ? 'border-[#005581] bg-sky-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm md:text-base leading-relaxed flex items-center flex-wrap gap-2 text-slate-900 font-medium">
                      <span className="font-bold text-xs text-white bg-[#005581] px-2.5 py-1 rounded-md shrink-0 mr-1 shadow-2xs">
                        {q.number}
                      </span>

                      <span>{q.prefixText || ''}</span>

                      <input
                        type="text"
                        value={userAnswer}
                        disabled={isReadOnly}
                        onChange={(e) => !isReadOnly && onAnswerChange(q.number, e.target.value)}
                        placeholder={`${q.number}`}
                        className={`w-36 h-9 px-3 border rounded-lg bg-white text-center text-sm font-bold text-slate-900 transition-all focus:outline-none focus:border-[#005581] focus:ring-2 focus:ring-[#005581]/20 shadow-2xs ${
                          isReadOnly ? 'cursor-not-allowed opacity-90' : ''
                        } ${
                          isSolutionMode
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-300'
                        }`}
                      />

                      <span>{q.suffixText || ''}</span>
                    </div>

                    {/* Solution Mode Controls & Explanation */}
                    {isSolutionMode && renderSolutionBox(q)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

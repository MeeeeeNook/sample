import React, { useState } from 'react';
import { Passage, ListeningSection, TestMode } from '../types';
import { calculateIELTSBandScore } from '../data/ieltsData';
import { UserProfile } from './AuthModal';

interface ScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  testMode: TestMode;
  passages: Passage[];
  listeningSections: ListeningSection[];
  activePassageId: number;
  activeListeningPart: number;
  answers: Record<number, string>;
  onEnableSolutionMode: () => void;
  onRetakeTest: () => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
}

export const ScoreReportModal: React.FC<ScoreReportModalProps> = ({
  isOpen,
  onClose,
  testMode,
  passages,
  listeningSections,
  activePassageId,
  activeListeningPart,
  answers,
  onEnableSolutionMode,
  onRetakeTest,
  currentUser,
  onOpenAuthModal,
}) => {
  const [activeSectionTab, setActiveSectionTab] = useState<number>(
    testMode === 'reading' ? activePassageId : activeListeningPart
  );

  if (!isOpen) return null;

  // Calculate scores based on testMode
  let totalQuestions = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  interface FlattenedQuestion {
    number: number;
    text: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
    sectionTitle: string;
    sectionId: number;
  }

  const questionList: FlattenedQuestion[] = [];

  if (testMode === 'reading') {
    passages.forEach((p) => {
      p.questionGroups.forEach((g) => {
        g.questions.forEach((q) => {
          totalQuestions++;
          const userAns = (answers[q.number] || '').trim();
          const correctAns = q.correctAnswer.trim();

          const isCorrect =
            userAns.toLowerCase() === correctAns.toLowerCase() ||
            (q.type === 'multiple_choice' &&
              userAns.toLowerCase().startsWith(correctAns.toLowerCase().charAt(0)));

          if (!userAns) {
            skippedCount++;
          } else if (isCorrect) {
            correctCount++;
          } else {
            incorrectCount++;
          }

          questionList.push({
            number: q.number,
            text: q.text,
            userAnswer: userAns,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            sectionTitle: `Passage ${p.id}: ${p.title}`,
            sectionId: p.id,
          });
        });
      });
    });
  } else {
    listeningSections.forEach((s) => {
      s.questionGroups.forEach((g) => {
        g.questions.forEach((q) => {
          totalQuestions++;
          const userAns = (answers[q.number] || '').trim();
          const correctAns = q.correctAnswer.trim();

          const isCorrect =
            userAns.toLowerCase() === correctAns.toLowerCase() ||
            (q.type === 'multiple_choice' &&
              userAns.toLowerCase().startsWith(correctAns.toLowerCase().charAt(0)));

          if (!userAns) {
            skippedCount++;
          } else if (isCorrect) {
            correctCount++;
          } else {
            incorrectCount++;
          }

          questionList.push({
            number: q.number,
            text: q.text,
            userAnswer: userAns,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            sectionTitle: `Part ${s.partNumber}: ${s.title}`,
            sectionId: s.partNumber,
          });
        });
      });
    });
  }

  const bandScore = calculateIELTSBandScore(correctCount);

  // Motivational message
  let feedbackMessage = 'Keep practicing! Review the explanations below to learn from mistakes.';
  if (correctCount === totalQuestions && totalQuestions > 0) {
    feedbackMessage = 'Outstanding! You answered every single question correctly!';
  } else if (correctCount > totalQuestions * 0.7) {
    feedbackMessage = 'Great job! Excellent performance on this practice test!';
  } else if (correctCount > 0) {
    feedbackMessage = 'Good effort! Review the explanations below to improve your score.';
  }

  // Filter questions for the active section tab
  const filteredQuestions = questionList.filter((q) => q.sectionId === activeSectionTab);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#F8FAFC] dark:bg-[#12141c] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Top Header Bar */}
        <div className="bg-white dark:bg-[#181a22] px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-[#E11D48] dark:text-rose-400 flex items-center justify-center font-black text-lg">
              🍔
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                IeltsBurger - Result & Feedback
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                {testMode === 'reading' ? 'Academic Reading Practice' : 'Academic Listening Practice'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Modal Content Body */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          {/* NON-INTRUSIVE LOGIN PROMPT (if user not logged in) */}
          {!currentUser && (
            <div className="p-4 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-800 dark:text-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#005581] text-white flex items-center justify-center font-bold text-lg shrink-0">
                  💡
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm">Save your results & track your band score progress!</div>
                  <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                    Log in or create a free account to automatically save your test history, sync vocabulary notes, and track your Band Score over time.
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onOpenAuthModal) onOpenAuthModal();
                }}
                className="px-4 py-2 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
              >
                Log In / Sign Up
              </button>
            </div>
          )}

          {/* TOP ROW: Feedback Banner + Summary Counts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Card: Score circle + Mascot + Explanation button */}
            <div className="md:col-span-7 bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between relative overflow-hidden">
              <div className="space-y-3 z-10 max-w-[280px]">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">
                  {feedbackMessage}
                </p>

                <div className="flex items-center gap-3">
                  {/* Score Donut Circle */}
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-white dark:bg-slate-800 shadow-2xs shrink-0">
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {correctCount}/{totalQuestions}
                    </span>
                  </div>

                  {/* Red CTA Button "View Explanations" */}
                  <button
                    onClick={() => {
                      onEnableSolutionMode();
                      onClose();
                    }}
                    className="bg-[#E11D48] hover:bg-rose-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">search</span>
                    View Explanations
                  </button>
                </div>
              </div>

              {/* Mascot Graphic */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-800 flex flex-col items-center justify-center p-2 shadow-2xs text-center">
                  <span className="text-4xl">🐥</span>
                  <span className="text-[9px] font-black uppercase text-amber-800 dark:text-amber-300 tracking-tighter mt-1 bg-amber-300/80 dark:bg-amber-900/80 px-1.5 py-0.5 rounded">
                    IELTS BURGER
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: Correct, Incorrect, Skipped Circular Badges */}
            <div className="md:col-span-5 bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-around">
              {/* Correct */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md font-black text-xl">
                  ✓
                </div>
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">Correct</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{correctCount}</span>
              </div>

              {/* Incorrect */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md font-black text-xl">
                  ✕
                </div>
                <span className="text-xs font-extrabold text-rose-700 dark:text-rose-400">Incorrect</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{incorrectCount}</span>
              </div>

              {/* Skipped */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md font-black text-xl">
                  ⏩
                </div>
                <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">Skipped</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{skippedCount}</span>
              </div>
            </div>
          </div>

          {/* MIDDLE ROW: Skill, Result, Time Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Kĩ năng */}
            <div className="bg-white dark:bg-[#181a22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Kĩ năng</h3>
              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-2xl">
                    {testMode === 'listening' ? 'headphones' : 'menu_book'}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {testMode === 'listening' ? 'Nghe' : 'Đọc'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {correctCount}/{totalQuestions}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Kết quả */}
            <div className="bg-white dark:bg-[#181a22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Kết quả</h3>
              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-2xl text-emerald-600 dark:text-emerald-400">check_circle</span>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">Câu đúng</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {correctCount}/{totalQuestions} (Band {bandScore.toFixed(1)})
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Thời gian */}
            <div className="bg-white dark:bg-[#181a22] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Thời gian</h3>
              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-2xl text-slate-800 dark:text-slate-200">timer</span>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">12:34</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">(60:00)</div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM CONTAINER: Answer Keys Section */}
          <div className="bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="material-symbols-outlined text-amber-500 text-2xl">lightbulb</span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">Answer Keys:</h3>
            </div>

            {/* Section Tabs (e.g. Passage 1, Passage 2... or Part 1, Part 2...) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(testMode === 'reading' ? passages : listeningSections).map((sec) => {
                const secId = testMode === 'reading' ? (sec as Passage).id : (sec as ListeningSection).partNumber;
                const secLabel = testMode === 'reading' ? `Passage ${secId}` : `Part ${secId}`;
                return (
                  <button
                    key={secId}
                    onClick={() => setActiveSectionTab(secId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSectionTab === secId
                        ? 'bg-[#005581] text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {secLabel}
                  </button>
                );
              })}
            </div>

            {/* Answer Key Grid Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {filteredQuestions.map((q) => {
                const userAns = q.userAnswer;
                const correctAns = q.correctAnswer;
                const isCorrect =
                  userAns.toLowerCase() === correctAns.toLowerCase() ||
                  userAns.toLowerCase().startsWith(correctAns.toLowerCase().charAt(0));

                let statusText = 'Missed';
                let statusColor = 'text-amber-600 dark:text-amber-400 font-bold';
                if (userAns) {
                  if (isCorrect) {
                    statusText = 'Correct';
                    statusColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
                  } else {
                    statusText = 'Incorrect';
                    statusColor = 'text-rose-600 dark:text-rose-400 font-bold';
                  }
                }

                return (
                  <div
                    key={q.number}
                    className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 dark:bg-slate-600 text-white flex items-center justify-center text-[11px] font-black shrink-0">
                      {q.number}
                    </span>
                    <span className={statusColor}>{statusText}</span>
                    <span className="text-slate-400 dark:text-slate-600">|</span>
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-400 truncate">{correctAns}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-white dark:bg-[#181a22] px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onRetakeTest}
            className="px-5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-extrabold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Làm lại bài
          </button>

          <button
            onClick={() => {
              onEnableSolutionMode();
              onClose();
            }}
            className="px-6 py-2 bg-[#E11D48] hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            Xem chi tiết bài làm
          </button>
        </div>
      </div>
    </div>
  );
};

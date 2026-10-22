import React from 'react';
import { TestMode, Passage, ListeningSection, TestScoreResult } from '../types';

interface SolutionScoreBannerProps {
  testMode: TestMode;
  passages?: Passage[];
  listeningSections?: ListeningSection[];
  answers: Record<number, string>;
  timeSpentSeconds: number;
  onRetake: () => void;
  onGoHome: () => void;
  onGoLibrary: () => void;
}

export const SolutionScoreBanner: React.FC<SolutionScoreBannerProps> = ({
  testMode,
  passages = [],
  listeningSections = [],
  answers,
  timeSpentSeconds,
  onRetake,
  onGoHome,
  onGoLibrary,
}) => {
  // Collect all questions
  const allQuestions = testMode === 'reading'
    ? passages.flatMap((p) => p.questionGroups.flatMap((qg) => qg.questions))
    : listeningSections.flatMap((s) => s.questionGroups.flatMap((qg) => qg.questions));

  const totalQuestions = allQuestions.length || 13;

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  allQuestions.forEach((q) => {
    const userAnswer = (answers[q.number] || '').trim().toLowerCase();
    const correctAnswer = (q.correctAnswer || '').trim().toLowerCase();

    if (!userAnswer) {
      unansweredCount++;
    } else if (userAnswer === correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Approximate IELTS Reading/Listening Band Score lookup
  let bandScore = 5.0;
  const ratio = correctCount / totalQuestions;
  if (ratio >= 0.9) bandScore = 9.0;
  else if (ratio >= 0.85) bandScore = 8.5;
  else if (ratio >= 0.77) bandScore = 8.0;
  else if (ratio >= 0.68) bandScore = 7.5;
  else if (ratio >= 0.60) bandScore = 7.0;
  else if (ratio >= 0.52) bandScore = 6.5;
  else if (ratio >= 0.42) bandScore = 6.0;
  else if (ratio >= 0.32) bandScore = 5.5;
  else bandScore = 5.0;

  const mins = Math.floor(timeSpentSeconds / 60);
  const secs = timeSpentSeconds % 60;
  const formattedTime = `${mins}m ${secs}s`;

  return (
    <div className="bg-white dark:bg-[#181a22] border-b border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-6 shrink-0 z-20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        {/* Left: Score Badge & Title */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#005581] to-[#003855] text-white flex flex-col items-center justify-center shadow-lg border-2 border-sky-300/40">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-200">
                BAND
              </span>
              <span className="text-3xl font-black tracking-tight leading-none text-amber-300">
                {bandScore.toFixed(1)}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                Kết quả bài thi
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {testMode === 'reading' ? 'IELTS Academic Reading' : 'IELTS Academic Listening'}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Lời Giải Chi Tiết & Báo Cáo Điểm
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Xem vị trí đáp án đúng trong bài đọc/nghe kèm giải thích chi tiết Tiếng Việt
            </p>
          </div>
        </div>

        {/* Middle: Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 lg:max-w-xl">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-base shrink-0">
              ✓
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Đúng
              </p>
              <p className="text-sm font-black text-emerald-900 dark:text-emerald-100">
                {correctCount} / {totalQuestions}
              </p>
            </div>
          </div>

          <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/40 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-base shrink-0">
              ✕
            </div>
            <div>
              <p className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                Sai
              </p>
              <p className="text-sm font-black text-rose-900 dark:text-rose-100">
                {incorrectCount} / {totalQuestions}
              </p>
            </div>
          </div>

          <div className="p-3 bg-sky-50 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/40 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#005581] text-white flex items-center justify-center font-bold text-sm shrink-0">
              <span className="material-symbols-outlined text-base">timer</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                Thời gian
              </p>
              <p className="text-sm font-black text-sky-900 dark:text-sky-100">
                {formattedTime}
              </p>
            </div>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/40 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              %
            </div>
            <div>
              <p className="text-[10px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                Chính xác
              </p>
              <p className="text-sm font-black text-purple-900 dark:text-purple-100">
                {percentage}%
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

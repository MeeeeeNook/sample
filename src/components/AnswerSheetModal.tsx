import React, { useState } from 'react';
import { Passage, ListeningSection, TestMode } from '../types';

interface AnswerSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  testMode: TestMode;
  passages?: Passage[];
  listeningSections?: ListeningSection[];
  answers: Record<number, string>;
  onNavigateToQuestion: (passageOrPartId: number, questionNum: number) => void;
}

export const AnswerSheetModal: React.FC<AnswerSheetModalProps> = ({
  isOpen,
  onClose,
  testMode,
  passages = [],
  listeningSections = [],
  answers,
  onNavigateToQuestion,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');

  if (!isOpen) return null;

  // Gather all questions with metadata
  interface QuestionRow {
    partId: number;
    partTitle: string;
    number: number;
    userAns: string;
    correctAns: string;
    isCorrect: boolean;
    isUnanswered: boolean;
    explanation?: string;
    keywords?: string;
  }

  const rows: QuestionRow[] = [];

  if (testMode === 'reading') {
    passages.forEach((p) => {
      p.questionGroups.forEach((qg) => {
        qg.questions.forEach((q) => {
          const userAns = (answers[q.number] || '').trim();
          const correctAns = (q.correctAnswer || '').trim();
          const isUnanswered = !userAns;
          const isCorrect = !isUnanswered && userAns.toLowerCase() === correctAns.toLowerCase();

          rows.push({
            partId: p.id,
            partTitle: `Passage ${p.id}`,
            number: q.number,
            userAns: userAns || '—',
            correctAns: correctAns || '—',
            isCorrect,
            isUnanswered,
            explanation: q.explanation,
            keywords: q.keywordTranslation,
          });
        });
      });
    });
  } else {
    listeningSections.forEach((s) => {
      s.questionGroups.forEach((qg) => {
        qg.questions.forEach((q) => {
          const userAns = (answers[q.number] || '').trim();
          const correctAns = (q.correctAnswer || '').trim();
          const isUnanswered = !userAns;
          const isCorrect = !isUnanswered && userAns.toLowerCase() === correctAns.toLowerCase();

          rows.push({
            partId: s.partNumber,
            partTitle: `Part ${s.partNumber}`,
            number: q.number,
            userAns: userAns || '—',
            correctAns: correctAns || '—',
            isCorrect,
            isUnanswered,
            explanation: q.explanation,
            keywords: q.keywordTranslation,
          });
        });
      });
    });
  }

  const totalCount = rows.length;
  const correctCount = rows.filter((r) => r.isCorrect).length;
  const incorrectCount = rows.filter((r) => !r.isCorrect && !r.isUnanswered).length;
  const unansweredCount = rows.filter((r) => r.isUnanswered).length;

  const filteredRows = rows.filter((r) => {
    if (filter === 'correct') return r.isCorrect;
    if (filter === 'incorrect') return !r.isCorrect && !r.isUnanswered;
    if (filter === 'unanswered') return r.isUnanswered;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#181a22] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#12141c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#005581] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-xl">fact_check</span>
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Bảng Đáp Án Chi Tiết (Answer Sheet)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                So sánh đáp án của bạn và đáp án chuẩn kèm lời giải chi tiết
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Filter Bar & Summary */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#181a22] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                filter === 'all'
                  ? 'bg-[#005581] text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Tất cả ({totalCount})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
              }`}
            >
              <span>✓ Đúng</span> ({correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                filter === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100'
              }`}
            >
              <span>✕ Sai</span> ({incorrectCount})
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                filter === 'unanswered'
                  ? 'bg-slate-700 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Chưa làm ({unansweredCount})
            </button>
          </div>

          <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
            Tỉ lệ chính xác: <span className="text-[#005581] dark:text-sky-400">{Math.round((correctCount / (totalCount || 1)) * 100)}%</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-5">
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/90 text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4 w-16 text-center">Câu</th>
                  <th className="py-3 px-4 w-28">Đáp án bạn chọn</th>
                  <th className="py-3 px-4 w-28">Đáp án đúng</th>
                  <th className="py-3 px-4 w-24 text-center">Trạng thái</th>
                  <th className="py-3 px-4">Giải thích & Từ khóa</th>
                  <th className="py-3 px-4 w-24 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs text-slate-800 dark:text-slate-200">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                      Không có câu hỏi nào trong mục này.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((r) => (
                    <tr
                      key={r.number}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Question Number */}
                      <td className="py-3 px-4 font-black text-center text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/20">
                        Q{r.number}
                      </td>

                      {/* User Answer */}
                      <td className="py-3 px-4 font-bold font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-xs inline-block ${
                            r.isCorrect
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                              : r.isUnanswered
                              ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                          }`}
                        >
                          {r.userAns}
                        </span>
                      </td>

                      {/* Correct Answer */}
                      <td className="py-3 px-4 font-black font-mono text-emerald-700 dark:text-emerald-400">
                        {r.correctAns}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        {r.isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-black uppercase">
                            ✓ Đúng
                          </span>
                        ) : r.isUnanswered ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-[10px] font-bold uppercase">
                            — Bỏ qua
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[10px] font-black uppercase">
                            ✕ Sai
                          </span>
                        )}
                      </td>

                      {/* Explanation & Keywords */}
                      <td className="py-3 px-4">
                        {r.explanation ? (
                          <div className="space-y-1">
                            <p className="text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {r.explanation}
                            </p>
                            {r.keywords && (
                              <p className="text-[11px] font-extrabold text-[#005581] dark:text-sky-400">
                                🔑 {r.keywords}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Có sẵn trong bài</span>
                        )}
                      </td>

                      {/* Jump to Question */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            onNavigateToQuestion(r.partId, r.number);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-sky-100 dark:bg-sky-950/80 hover:bg-[#005581] hover:text-white text-[#005581] dark:text-sky-300 text-[11px] font-black rounded-lg transition-colors border border-sky-300/60 dark:border-sky-800"
                        >
                          Đi tới câu
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#12141c] flex justify-between items-center">
          <p className="text-xs text-slate-500 font-medium">
            Nhấp "Đi tới câu" để nhảy trực tiếp tới vị trí đoạn văn / audio tương ứng
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl transition-all shadow-2xs"
          >
            Đóng bảng đáp án
          </button>
        </div>

      </div>
    </div>
  );
};

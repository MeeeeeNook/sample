import React from 'react';
import { Passage, ListeningSection, TestMode } from '../types';

interface SubmitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  testMode: TestMode;
  passages: Passage[];
  listeningSections: ListeningSection[];
  activePassageId: number;
  activeListeningPart: number;
  answers: Record<number, string>;
  flagged: Record<number, boolean>;
}

export const SubmitConfirmationModal: React.FC<SubmitConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  testMode,
  passages,
  listeningSections,
  activePassageId,
  activeListeningPart,
  answers,
  flagged,
}) => {
  if (!isOpen) return null;

  // Calculate question metrics
  let totalQuestions = 0;
  let answeredCount = 0;
  let flaggedCount = 0;

  if (testMode === 'reading') {
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
  } else {
    listeningSections.forEach((s) => {
      s.questionGroups.forEach((g) => {
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
  }

  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl shadow-2xs">
              ⚠️
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 leading-tight">
                Xác nhận nộp bài thi
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                IELTS {testMode === 'reading' ? 'Academic Reading' : 'Academic Listening'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Progress Bar & Stat Badges */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold text-slate-700">
              <span>Đã hoàn thành</span>
              <span>{answeredCount} / {totalQuestions} câu ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-center">
              <span className="block text-xs font-bold text-emerald-700">Đã làm</span>
              <span className="text-xl font-black text-emerald-800">{answeredCount}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-center">
              <span className="block text-xs font-bold text-amber-700">Chưa làm</span>
              <span className="text-xl font-black text-amber-800">{unansweredCount}</span>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl text-center">
              <span className="block text-xs font-bold text-rose-700">Đánh dấu</span>
              <span className="text-xl font-black text-rose-800">{flaggedCount}</span>
            </div>
          </div>

          {/* Warning Message */}
          {unansweredCount > 0 ? (
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed font-medium flex items-start gap-2">
              <span className="material-symbols-outlined text-amber-600 text-base shrink-0 mt-0.5">info</span>
              <span>
                Bạn vẫn còn <strong className="font-bold text-amber-900">{unansweredCount} câu chưa trả lời</strong>. Bạn có chắc chắn muốn kết thúc bài thi bây giờ không?
              </span>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed font-medium flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
              <span>
                Tuyệt vời! Bạn đã trả lời đầy đủ <strong className="font-bold">{totalQuestions}/{totalQuestions} câu hỏi</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 font-extrabold text-xs text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Tiếp tục làm bài
          </button>
          <button
            onClick={() => {
              onConfirmSubmit();
              onClose();
            }}
            className="px-5 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            Xác nhận nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

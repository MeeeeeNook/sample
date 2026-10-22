import React, { useState } from 'react';

export interface BugReport {
  id: string;
  testTitle: string;
  testMode: 'reading' | 'listening';
  passageOrPartTitle: string;
  questionNumber?: number;
  reporterName: string;
  category: 'typo' | 'wrong_answer' | 'audio_issue' | 'ui_bug' | 'other';
  description: string;
  createdAt: string;
  status: 'pending' | 'resolved';
}

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  testTitle: string;
  testMode: 'reading' | 'listening';
  passageOrPartTitle: string;
  activeQuestionNum?: number;
  userName?: string;
  onReportSubmitted?: () => void;
}

export const BugReportModal: React.FC<BugReportModalProps> = ({
  isOpen,
  onClose,
  testTitle,
  testMode,
  passageOrPartTitle,
  activeQuestionNum,
  userName = 'Học viên',
  onReportSubmitted,
}) => {
  const [category, setCategory] = useState<BugReport['category']>('typo');
  const [description, setDescription] = useState('');
  const [questionNum, setQuestionNum] = useState<string>(
    activeQuestionNum ? activeQuestionNum.toString() : ''
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newReport: BugReport = {
      id: Date.now().toString(),
      testTitle,
      testMode,
      passageOrPartTitle,
      questionNumber: questionNum ? parseInt(questionNum, 10) : undefined,
      reporterName: userName,
      category,
      description: description.trim(),
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'pending',
    };

    try {
      const existing: BugReport[] = JSON.parse(
        localStorage.getItem('ielts_bug_reports') || '[]'
      );
      localStorage.setItem(
        'ielts_bug_reports',
        JSON.stringify([newReport, ...existing])
      );
    } catch (e) {
      // fallback
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setDescription('');
      if (onReportSubmitted) onReportSubmitted();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 dark:bg-[#161822]/95 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 text-center relative border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <div className="w-12 h-12 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-2xl">bug_report</span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Báo Lỗi Nội Dung & Bài Thi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Đóng góp ý kiến để giúp nội dung IELTS ngày càng chuẩn xác hơn
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">check</span>
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Đã gửi báo cáo lỗi thành công!
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Cảm ơn bạn. Ban quản trị sẽ sớm kiểm tra và cập nhật.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Test Context Info */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                {testTitle}
              </div>
              <div className="text-slate-500 font-medium text-[11px] mt-0.5">
                {passageOrPartTitle}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Loại sự cố
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as BugReport['category'])
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white outline-none"
                >
                  <option value="typo">Lỗi chính tả / Lỗi dịch</option>
                  <option value="wrong_answer">Đáp án chưa đúng</option>
                  <option value="audio_issue">Lỗi âm thanh audio</option>
                  <option value="ui_bug">Lỗi giao diện / Nút bấm</option>
                  <option value="other">Lỗi khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Câu số (Không bắt buộc)
                </label>
                <input
                  type="number"
                  placeholder="Ví dụ: 14"
                  value={questionNum}
                  onChange={(e) => setQuestionNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mô tả chi tiết lỗi *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Nhập mô tả chi tiết bài thi hoặc câu hỏi bị lỗi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-[#005581] outline-none transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold text-xs shadow-md transition-colors cursor-pointer"
              >
                Gửi Báo Lỗi
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TestMode, ExamExecutionMode } from '../types';
import { mockLibraryCards } from '../data/libraryData';

interface PreTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  testTitle: string;
  testMode: TestMode;
  isFullTest: boolean;
  passageOrPartNumber: number;
  sourceBook?: string;
  difficulty?: string;
  totalQuestions?: number;
  onConfirmStart: (settings: {
    timeMinutes: number;
    enableDictionary: boolean;
    examExecutionMode: ExamExecutionMode;
    selectedSkill?: 'reading' | 'listening' | 'both';
    selectedPassageIds?: number[];
  }) => void;
}

export const PreTestModal: React.FC<PreTestModalProps> = ({
  isOpen,
  onClose,
  testTitle,
  testMode,
  isFullTest,
  passageOrPartNumber,
  sourceBook = "Cambridge IELTS 18 Academic",
  difficulty = "Trung bình - Khá (Band 6.0 - 7.5)",
  totalQuestions = 13,
  onConfirmStart,
}) => {
  // Mode selection: 'test' (Thi thật) vs 'practice' (Luyện tập)
  const [examExecutionMode, setExamExecutionMode] = useState<ExamExecutionMode>('practice');

  // Skill tab selection for Full Test
  const [selectedSkill, setSelectedSkill] = useState<'reading' | 'listening' | 'both'>(
    testMode === 'reading' ? 'reading' : 'listening'
  );

  // Passage/Section Selection
  const [selectedPassages, setSelectedPassages] = useState<number[]>([1, 2, 3]);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Time & Dictionary
  const defaultTime = isFullTest ? 60 : 20;
  const [selectedTime, setSelectedTime] = useState<number>(defaultTime);
  const [enableDictionary, setEnableDictionary] = useState<boolean>(true);

  if (!isOpen) return null;

  // Filter available test cards for selection
  const availableCards = mockLibraryCards.filter((card) => {
    if (selectedSkill === 'reading' && card.testMode !== 'reading') return false;
    if (selectedSkill === 'listening' && card.testMode !== 'listening') return false;
    if (searchFilter.trim()) {
      return card.title.toLowerCase().includes(searchFilter.toLowerCase());
    }
    return true;
  });

  // Randomize button logic
  const handleRandomize = () => {
    if (selectedSkill === 'reading') {
      const readingIds = mockLibraryCards
        .filter((c) => c.testMode === 'reading')
        .map((c) => c.targetId);
      // Pick 3 random
      const shuffled = [...readingIds].sort(() => 0.5 - Math.random());
      setSelectedPassages(shuffled.slice(0, 3));
    } else if (selectedSkill === 'listening') {
      const listeningIds = [1, 2, 3, 4];
      setSelectedPassages(listeningIds);
    } else {
      setSelectedPassages([1, 2, 3]);
    }
  };

  const togglePassageSelect = (id: number) => {
    if (selectedPassages.includes(id)) {
      if (selectedPassages.length === 1) return; // keep at least 1
      setSelectedPassages(selectedPassages.filter((p) => p !== id));
    } else {
      const maxLimit = selectedSkill === 'listening' ? 4 : 3;
      if (selectedPassages.length >= maxLimit) return;
      setSelectedPassages([...selectedPassages, id]);
    }
  };

  const timeOptions = [
    { label: '15 phút', value: 15 },
    { label: '20 phút (Mỗi passage)', value: 20 },
    { label: '60 phút (Full Test)', value: 60 },
    { label: 'Không giới hạn', value: 0 },
  ];

  const handleStart = () => {
    const isTest = examExecutionMode === 'test';
    onConfirmStart({
      timeMinutes: isTest ? (isFullTest ? 60 : 20) : selectedTime,
      enableDictionary: isTest ? false : enableDictionary,
      examExecutionMode,
      selectedSkill,
      selectedPassageIds: selectedPassages,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50">
      <div className="bg-white dark:bg-[#181a22] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#005581] dark:bg-slate-900 text-white p-6 relative shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                {testMode === 'reading' ? 'menu_book' : 'headphones'}
              </span>
              <span>
                {isFullTest
                  ? `Full Test Setup • ${selectedSkill.toUpperCase()}`
                  : `${testMode === 'reading' ? 'Passage' : 'Part'} ${passageOrPartNumber}`}
              </span>
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight leading-snug">
            {testTitle}
          </h2>
          <p className="text-sky-200 text-xs font-medium mt-1">
            Chọn chế độ thi (Thi thật vs Luyện tập), chọn đề bài hoặc ngẫu nhiên hóa
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* STEP 1: CHỌN CHẾ ĐỘ THI (TEST MODE VS PRACTICE MODE) */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#005581] dark:text-sky-400">
                tune
              </span>
              <span>1. Chọn Chế Độ Thi (Test Mode)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Practice Mode */}
              <div
                onClick={() => {
                  setExamExecutionMode('practice');
                  setEnableDictionary(true);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  examExecutionMode === 'practice'
                    ? 'border-[#005581] bg-sky-50/70 dark:bg-sky-950/40 text-[#005581] dark:text-sky-300 ring-2 ring-[#005581]/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-600">fitness_center</span>
                      <span>Chế Độ Luyện Tập</span>
                    </span>
                    {examExecutionMode === 'practice' && (
                      <span className="material-symbols-outlined text-base text-[#005581] dark:text-sky-400">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Tùy chỉnh thời gian, điều khiển audio tự do (Phát / Tạm dừng / Tua), sử dụng Từ điển AI tra từ trực tiếp.
                  </p>
                </div>
              </div>

              {/* Real Test Mode */}
              <div
                onClick={() => {
                  setExamExecutionMode('test');
                  setEnableDictionary(false);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  examExecutionMode === 'test'
                    ? 'border-rose-600 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-rose-600">timer</span>
                      <span>Chế Độ Thi Thật (Exam)</span>
                    </span>
                    {examExecutionMode === 'test' && (
                      <span className="material-symbols-outlined text-base text-rose-600">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Mô phỏng thi máy chuẩn IELTS! Cố định thời gian, audio bài nghe chỉ phát 1 lần (Không dừng/tua), KHÔNG có từ điển.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: FULL TEST SELECTION & RANDOMIZE (If Full Test) */}
          {isFullTest && (
            <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#005581] dark:text-sky-400">
                    checklist
                  </span>
                  <span>2. Chọn Đề Thi / Ngẫu Nhiên Hóa</span>
                </label>

                {/* Randomize Button */}
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">casino</span>
                  <span>Ngẫu nhiên đề thi</span>
                </button>
              </div>

              {/* Skill Tabs */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSkill('reading')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    selectedSkill === 'reading'
                      ? 'bg-[#005581] text-white border-[#005581]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  <span>Reading (3 Passages)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSkill('listening')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    selectedSkill === 'listening'
                      ? 'bg-[#E11D48] text-white border-[#E11D48]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">headphones</span>
                  <span>Listening (4 Parts)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSkill('both')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    selectedSkill === 'both'
                      ? 'bg-purple-700 text-white border-purple-700'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">stars</span>
                  <span>Cả hai (Academic Combo)</span>
                </button>
              </div>

              {/* Search Filter Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài thi theo tiêu đề..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-3.5 py-2 pl-9 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-[#005581]"
                />
                <span className="material-symbols-outlined text-base text-slate-400 absolute left-2.5 top-2.5">
                  search
                </span>
              </div>

              {/* List of Passages to Select */}
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
                {availableCards.map((card) => {
                  const isChecked = selectedPassages.includes(card.targetId);
                  return (
                    <div
                      key={card.id}
                      onClick={() => togglePassageSelect(card.targetId)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#005581] bg-sky-50/60 dark:bg-sky-950/40 text-[#005581] dark:text-sky-300 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-xs border ${
                          isChecked ? 'bg-[#005581] border-[#005581] text-white' : 'border-slate-300'
                        }`}>
                          {isChecked && '✓'}
                        </span>
                        <span className="text-xs line-clamp-1">{card.title}</span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {card.badgeText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: PRACTICE MODE CONFIGURATIONS (Timer & Dictionary) */}
          {examExecutionMode === 'practice' && (
            <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#005581] dark:text-sky-400">
                  settings
                </span>
                <span>3. Tùy Chỉnh Luyện Tập</span>
              </label>

              {/* Timer Selection */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-2">Thời gian bấm giờ (phút):</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedTime(opt.value)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        selectedTime === opt.value
                          ? 'border-[#005581] bg-sky-50 dark:bg-sky-950/50 text-[#005581] dark:text-sky-300 ring-1 ring-[#005581]'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dictionary Toggle */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">auto_stories</span>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      Bật Từ điển AI & Tra từ Tiếng Việt
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Bôi đen từ hoặc đoạn văn để tra từ ngữ cảnh tức thì
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEnableDictionary(!enableDictionary)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                    enableDictionary ? 'bg-[#005581]' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      enableDictionary ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Test Mode Note Banner */}
          {examExecutionMode === 'test' && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-start gap-3 animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-rose-600 text-xl shrink-0">
                security
              </span>
              <p className="text-xs font-bold text-rose-900 dark:text-rose-300 leading-relaxed">
                Chế độ Thi thật sẽ tự động đếm ngược 20 phút / passage, âm thanh bài nghe chỉ phát 1 lần duy nhất và tắt hỗ trợ từ điển để đảm bảo phản ánh chính xác Band score của bạn.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleStart}
            className={`px-6 py-2.5 rounded-2xl text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              examExecutionMode === 'test'
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#005581] hover:bg-[#004466]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            <span>
              {examExecutionMode === 'test' ? 'Bắt đầu Thi Thật' : 'Bắt đầu Luyện Tập'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

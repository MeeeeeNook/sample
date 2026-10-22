import React, { useState } from 'react';
import { TestMode, ExamExecutionMode, Language } from '../types';
import { getT } from '../utils/i18n';
import { mockLibraryCards } from '../data/libraryData';
import { SiteHeader } from './SiteHeader';

interface FullTestPickerViewProps {
  onStartFullTest: (
    mode: TestMode,
    executionMode: ExamExecutionMode,
    isCombo?: boolean,
    selectedPassageIds?: number[],
    settings?: { timeMinutes?: number; enableDictionary?: boolean }
  ) => void;
  onNavigateHome: () => void;
  onNavigateLibrary: () => void;
  language: Language;
  userName?: string;
  onOpenUserDashboard?: () => void;
  onOpenAdminPortal?: () => void;
  onChangeLanguage?: (lang: Language) => void;
  theme?: string;
  onChangeTheme?: (theme: string) => void;
  onOpenSettings?: () => void;
}

export const FullTestPickerView: React.FC<FullTestPickerViewProps> = ({
  onStartFullTest,
  onNavigateHome,
  onNavigateLibrary,
  language,
  userName = 'Vũ Ngọc Mạnh Cường',
  onOpenUserDashboard,
  onOpenAdminPortal,
  onChangeLanguage,
  theme = 'light',
  onChangeTheme,
  onOpenSettings,
}) => {
  const t = getT(language);

  // Execution Mode selection: 'practice' (Luyện tập) vs 'test' (Thi thật)
  const [examExecutionMode, setExamExecutionMode] = useState<ExamExecutionMode>('practice');

  // Skill tab selection: 'reading' | 'listening' | 'both'
  const [selectedSkill, setSelectedSkill] = useState<'reading' | 'listening' | 'both'>('reading');

  // Passage/Section Selection
  const [selectedPassages, setSelectedPassages] = useState<number[]>([1, 2, 3]);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Practice settings: Time & Dictionary
  const [selectedTime, setSelectedTime] = useState<number>(60);
  const [enableDictionary, setEnableDictionary] = useState<boolean>(true);

  // Filter available test cards based on selectedSkill and searchFilter
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
      if (selectedPassages.length === 1) return; // Keep at least 1 selected
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
    const mode: TestMode = selectedSkill === 'listening' ? 'listening' : 'reading';
    const isCombo = selectedSkill === 'both';

    onStartFullTest(
      mode,
      examExecutionMode,
      isCombo,
      selectedPassages,
      {
        timeMinutes: isTest ? (isCombo ? 90 : 60) : selectedTime,
        enableDictionary: isTest ? false : enableDictionary,
      }
    );
  };

  const getTestTitle = () => {
    if (selectedSkill === 'reading') return 'IELTS Academic Reading Full Test';
    if (selectedSkill === 'listening') return 'IELTS Academic Listening Full Test';
    return 'IELTS Academic Combo (Reading & Listening) Full Test';
  };

  return (
    <div className={`min-h-screen w-full bg-[#F8FAFC] dark:bg-[#12141c] text-slate-900 dark:text-slate-100 font-sans flex flex-col overflow-y-auto ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Universal Site Header */}
      <SiteHeader
        activeTab="fulltest"
        onNavigateHome={onNavigateHome}
        onNavigateLibrary={onNavigateLibrary}
        onNavigateFullTest={() => {}}
        onOpenUserDashboard={onOpenUserDashboard}
        onOpenAdminPortal={onOpenAdminPortal}
        userName={userName}
        language={language}
        onChangeLanguage={onChangeLanguage}
        theme={theme}
        onChangeTheme={onChangeTheme}
        onOpenSettings={onOpenSettings}
      />

      {/* Main Full Page Setup Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Banner Card */}
        <div className="bg-[#005581] dark:bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-base">
                {selectedSkill === 'reading' ? 'menu_book' : selectedSkill === 'listening' ? 'headphones' : 'stars'}
              </span>
              <span>FULL TEST SETUP • {selectedSkill.toUpperCase()}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            {getTestTitle()}
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm font-medium">
            Chọn chế độ thi (Thi thật vs Luyện tập), chọn đề bài hoặc ngẫu nhiên hóa
          </p>
        </div>

        {/* Main Setup Card */}
        <div className="bg-white dark:bg-[#181a22] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-md p-6 sm:p-8 space-y-8">
          
          {/* STEP 1: CHỌN CHẾ ĐỘ THI (TEST MODE VS PRACTICE MODE) */}
          <div className="space-y-4">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#005581] dark:text-sky-400">
                tune
              </span>
              <span>1. CHỌN CHẾ ĐỘ THI (TEST MODE)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Practice Mode */}
              <div
                onClick={() => {
                  setExamExecutionMode('practice');
                  setEnableDictionary(true);
                }}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  examExecutionMode === 'practice'
                    ? 'border-[#005581] bg-sky-50/70 dark:bg-sky-950/40 text-[#005581] dark:text-sky-300 ring-2 ring-[#005581]/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-lg">fitness_center</span>
                      <span>Chế Độ Luyện Tập</span>
                    </span>
                    {examExecutionMode === 'practice' && (
                      <span className="material-symbols-outlined text-lg text-[#005581] dark:text-sky-400 font-bold">
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
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  examExecutionMode === 'test'
                    ? 'border-rose-600 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-rose-600 text-lg">timer</span>
                      <span>Chế Độ Thi Thật (Exam)</span>
                    </span>
                    {examExecutionMode === 'test' && (
                      <span className="material-symbols-outlined text-lg text-rose-600 font-bold">
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

          {/* STEP 2: FULL TEST SELECTION & RANDOMIZE */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-[#005581] dark:text-sky-400">
                  checklist
                </span>
                <span>2. CHỌN ĐỀ THI / NGẪU NHIÊN HÓA</span>
              </label>

              {/* Randomize Button */}
              <button
                type="button"
                onClick={handleRandomize}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">casino</span>
                <span>Ngẫu nhiên đề thi</span>
              </button>
            </div>

            {/* Skill Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSkill('reading')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border cursor-pointer ${
                  selectedSkill === 'reading'
                    ? 'bg-[#005581] text-white border-[#005581] shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>Reading (3 Passages)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSkill('listening')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border cursor-pointer ${
                  selectedSkill === 'listening'
                    ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-base">headphones</span>
                <span>Listening (4 Parts)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSkill('both')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border cursor-pointer ${
                  selectedSkill === 'both'
                    ? 'bg-purple-700 text-white border-purple-700 shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-base">stars</span>
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
                className="w-full px-4 py-2.5 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-[#005581]"
              />
              <span className="material-symbols-outlined text-lg text-slate-400 absolute left-3 top-2.5">
                search
              </span>
            </div>

            {/* Selectable Passages List */}
            <div className="space-y-2.5 max-h-80 sm:max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
              {availableCards.map((card) => {
                const isChecked = selectedPassages.includes(card.targetId);
                return (
                  <div
                    key={card.id}
                    onClick={() => togglePassageSelect(card.targetId)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked
                        ? 'border-[#005581] bg-sky-50/70 dark:bg-sky-950/40 text-[#005581] dark:text-sky-300 font-bold shadow-2xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold border ${
                        isChecked ? 'bg-[#005581] border-[#005581] text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                      <span className="text-xs sm:text-sm line-clamp-1">{card.title}</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {card.badgeText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: PRACTICE MODE CONFIGURATIONS (Timer & Dictionary) */}
          {examExecutionMode === 'practice' && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-[#005581] dark:text-sky-400">
                  settings
                </span>
                <span>3. TÙY CHỈNH LUYỆN TẬP</span>
              </label>

              {/* Timer Selection */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2">Thời gian bấm giờ (phút):</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedTime(opt.value)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        selectedTime === opt.value
                          ? 'border-[#005581] bg-sky-50 dark:bg-sky-950/50 text-[#005581] dark:text-sky-300 ring-2 ring-[#005581]/30 font-black'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dictionary Toggle */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">auto_stories</span>
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
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer shrink-0 ${
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
                Chế độ Thi thật sẽ tự động đếm ngược 60 phút (Reading) / 30 phút (Listening), âm thanh bài nghe chỉ phát 1 lần duy nhất và tắt hỗ trợ từ điển để đảm bảo phản ánh chính xác Band score của bạn.
              </p>
            </div>
          )}

          {/* Footer Actions Bar */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleStart}
              className={`px-8 py-3.5 rounded-2xl text-white font-extrabold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                examExecutionMode === 'test'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-[#005581] hover:bg-[#004466]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">play_arrow</span>
              <span>
                {examExecutionMode === 'test' ? 'Bắt đầu Thi Thật' : 'Bắt đầu Luyện Tập'}
              </span>
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};

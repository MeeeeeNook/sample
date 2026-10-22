import React, { useState, useEffect } from 'react';
import { DictionaryEntry, lookupWordOrPhrase, speakEnglishWord } from '../utils/dictionary';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText?: string;
  position?: { x: number; y: number } | null;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
  selectedText = '',
  position
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [currentEntry, setCurrentEntry] = useState<DictionaryEntry | null>(null);

  useEffect(() => {
    if (selectedText && selectedText.trim()) {
      setSearchInput(selectedText.trim());
      const entry = lookupWordOrPhrase(selectedText);
      setCurrentEntry(entry);
    }
  }, [selectedText]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const entry = lookupWordOrPhrase(searchInput);
    setCurrentEntry(entry);
  };

  const handleSpeak = () => {
    if (currentEntry) {
      speakEnglishWord(currentEntry.word);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="bg-white dark:bg-[#181a22] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#005581] dark:bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-300 text-lg">auto_stories</span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight text-white">
                Từ điển IELTS Tra Cứu AI
              </h3>
              <p className="text-[10px] text-sky-200 font-medium">
                Tra từ vựng & dịch nghĩa Tiếng Việt tức thì
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Nhập từ vựng hoặc đoạn văn cần dịch..."
              className="w-full pl-9 pr-20 py-2.5 text-xs font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#005581] focus:ring-1 focus:ring-[#005581]"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 bg-[#005581] hover:bg-[#004466] text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
            >
              Tra từ
            </button>
          </form>
        </div>

        {/* Word Content Body */}
        <div className="p-5 overflow-y-auto max-h-[380px] space-y-4">
          {currentEntry ? (
            <div>
              {/* Word Title & Pronunciation */}
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {currentEntry.word}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-extrabold text-[10px] uppercase">
                      {currentEntry.partOfSpeech}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentEntry.phonetic}
                  </p>
                </div>

                <button
                  onClick={handleSpeak}
                  className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 text-[#005581] dark:text-sky-400 flex items-center justify-center transition-all shadow-2xs"
                  title="Nghe phát âm chuẩn (US)"
                >
                  <span className="material-symbols-outlined text-xl">volume_up</span>
                </button>
              </div>

              {/* Vietnamese Meaning Box */}
              <div className="mt-4 p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl">
                <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-extrabold text-xs mb-1">
                  <span className="material-symbols-outlined text-sm">translate</span>
                  <span>Nghĩa Tiếng Việt:</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-amber-100 capitalize">
                  {currentEntry.vietnameseMeaning}
                </p>
              </div>

              {/* English Definition */}
              <div className="mt-3">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Định nghĩa tiếng Anh
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {currentEntry.definitionEn}
                </p>
              </div>

              {/* Example Sentences */}
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Ví dụ câu & Ngữ cảnh
                </h4>
                <p className="text-xs italic text-slate-800 dark:text-slate-200 font-serif">
                  "{currentEntry.exampleEn}"
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans">
                  👉 {currentEntry.exampleVi}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">
                search_off
              </span>
              <p className="text-xs font-semibold">Chưa chọn từ vựng. Vui lòng nhập từ để tra cứu.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-medium px-5">
          <span>💡 Bôi đen bất kỳ từ/cụm từ nào trong bài để xem nghĩa tức thì</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-lg font-bold"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};

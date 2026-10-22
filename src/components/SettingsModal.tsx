import React, { useState } from 'react';
import { FontSize, ThemeMode, Language } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: FontSize;
  onChangeFontSize: (size: FontSize) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  onRedoTest: () => void;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
}

const FONT_OPTIONS: { size: FontSize; label: string; isDefault?: boolean }[] = [
  { size: 'xs', label: 'Rất nhỏ' },
  { size: 'sm', label: 'Nhỏ' },
  { size: 'md', label: 'Vừa', isDefault: true },
  { size: 'lg', label: 'Lớn' },
  { size: 'xl', label: 'Rất lớn' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  onChangeFontSize,
  theme,
  onChangeTheme,
  onRedoTest,
  language = 'vi',
  onChangeLanguage,
}) => {
  const [showConfirmRedo, setShowConfirmRedo] = useState(false);

  if (!isOpen) return null;

  const currentFontIndex = FONT_OPTIONS.findIndex((f) => f.size === fontSize);
  const safeFontIndex = currentFontIndex === -1 ? 2 : currentFontIndex;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    if (FONT_OPTIONS[idx]) {
      onChangeFontSize(FONT_OPTIONS[idx].size);
    }
  };

  const handleConfirmRedo = () => {
    setShowConfirmRedo(false);
    onRedoTest();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1f2128] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#085ac0] dark:text-sky-400 text-2xl">
              settings
            </span>
            <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white">
              Cài Đặt Cỡ Chữ & Giao Diện
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
          {/* Reading Font Size Slider (5 Options) */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Kích Thước Cỡ Chữ (Font Size)
              </label>
              <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                FONT_OPTIONS[safeFontIndex].isDefault
                  ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800'
                  : 'bg-[#005581]/10 text-[#005581] dark:text-sky-300'
              }`}>
                {FONT_OPTIONS[safeFontIndex].label} {FONT_OPTIONS[safeFontIndex].isDefault ? '(Mặc định)' : ''}
              </span>
            </div>

            {/* Slider Input */}
            <div className="px-1 py-2">
              <input
                type="range"
                min="0"
                max="4"
                step="1"
                value={safeFontIndex}
                onChange={handleSliderChange}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#005581] dark:accent-sky-400"
              />
            </div>

            {/* Step Labels */}
            <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-500 mt-1">
              {FONT_OPTIONS.map((opt, idx) => {
                const isActive = idx === safeFontIndex;
                const isMid = opt.isDefault;
                return (
                  <button
                    key={opt.size}
                    onClick={() => onChangeFontSize(opt.size)}
                    className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                      isActive
                        ? isMid
                          ? 'text-red-600 dark:text-red-400 font-black scale-110'
                          : 'text-[#005581] dark:text-sky-400 font-black scale-105'
                        : isMid
                        ? 'text-red-500 font-bold'
                        : 'hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isMid
                          ? 'bg-red-500 ring-2 ring-red-300 dark:ring-red-900'
                          : isActive
                          ? 'bg-[#005581] dark:bg-sky-400'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                    <span className={isMid ? 'text-red-600 dark:text-red-400 font-extrabold' : ''}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Switcher */}
          {onChangeLanguage && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Ngôn Ngữ Giao Diện (Language)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onChangeLanguage('vi')}
                  className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                    language === 'vi'
                      ? 'bg-[#005581] text-white border-[#005581] shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-base">🇻🇳</span>
                  <span>Tiếng Việt</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLanguage('en')}
                  className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#005581] text-white border-[#005581] shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-base">🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            </div>
          )}

          {/* Theme Switcher */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              Chế Độ Giao Diện (Theme)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onChangeTheme('light')}
                className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-[#005581] text-white border-[#005581] shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-lg">light_mode</span>
                Giao diện Sáng (Light)
              </button>
              <button
                onClick={() => onChangeTheme('dark')}
                className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#005581] text-white border-[#005581] shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-lg">dark_mode</span>
                Giao diện Tối (Dark)
              </button>
            </div>
          </div>

          {/* Redo Test Action */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            {!showConfirmRedo ? (
              <button
                onClick={() => setShowConfirmRedo(true)}
                className="w-full py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">replay</span>
                <span>Làm Lại Bài Thi Từ Đầu (Redo Test)</span>
              </button>
            ) : (
              <div className="bg-rose-50 dark:bg-rose-950/50 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/80 space-y-3 animate-in fade-in duration-200">
                <p className="text-xs font-bold text-rose-800 dark:text-rose-300 text-center">
                  ⚠️ Xác nhận: Toàn bộ đáp án sẽ bị xóa và bài thi sẽ được khởi động lại từ đầu.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirmRedo(false)}
                    className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleConfirmRedo}
                    className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer"
                  >
                    Xác nhận làm lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Lưu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

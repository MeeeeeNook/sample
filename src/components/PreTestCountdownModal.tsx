import React, { useState, useEffect } from 'react';

interface PreTestCountdownModalProps {
  isOpen: boolean;
  onFinished: () => void;
  testTitle: string;
  testMode: 'reading' | 'listening';
}

export const PreTestCountdownModal: React.FC<PreTestCountdownModalProps> = ({
  isOpen,
  onFinished,
  testTitle,
  testMode,
}) => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(5);
      return;
    }

    setSeconds(5);
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 400);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 dark:bg-[#161822]/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center space-y-6 backdrop-blur-2xl animate-in zoom-in-95 duration-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#005581]/10 text-[#005581] dark:text-sky-300 text-xs font-black tracking-wider uppercase rounded-full">
            <span className="material-symbols-outlined text-sm">
              {testMode === 'reading' ? 'menu_book' : 'headphones'}
            </span>
            <span>GET READY!</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight px-2">
            Get Ready!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
            {testTitle}
          </p>
        </div>

        {/* Countdown Ring Display */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#005581] dark:border-sky-400 animate-pulse"></div>
          
          <div className="text-6xl font-black text-[#005581] dark:text-sky-400 tracking-tighter">
            {seconds > 0 ? seconds : '🚀'}
          </div>
        </div>

        <div>
          <button
            onClick={onFinished}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Vào bài thi ngay (Bỏ qua đếm ngược)
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Passage, TestMode, ListeningSection, ExamExecutionMode } from '../types';

interface TopHeaderProps {
  testMode: TestMode;
  onSelectTestMode: (mode: TestMode) => void;
  currentPassage: Passage;
  passages: Passage[];
  onSelectPassage: (passageId: number) => void;
  currentListeningSection: ListeningSection;
  listeningSections: ListeningSection[];
  onSelectListeningPart: (partNum: number) => void;
  timerSeconds: number;
  showTimer: boolean;
  onToggleSettings: () => void;
  onToggleNotes: () => void;
  isNotesOpen: boolean;
  onOpenLibrary?: () => void;
  onOpenHome?: () => void;
  onOpenFullTest?: () => void;
  userName?: string;
  isFullTest?: boolean;
  isDictionaryOpen?: boolean;
  onToggleDictionary?: () => void;
  onOpenUserDashboard?: () => void;
  onOpenAdminPortal?: () => void;
  onOpenBugReport?: () => void;
  onOpenDownloadPdf?: () => void;
  examExecutionMode?: ExamExecutionMode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  testMode,
  onSelectTestMode,
  currentPassage,
  passages,
  onSelectPassage,
  currentListeningSection,
  listeningSections,
  onSelectListeningPart,
  timerSeconds,
  showTimer,
  onToggleSettings,
  onToggleNotes,
  isNotesOpen,
  onOpenLibrary,
  onOpenHome,
  onOpenFullTest,
  userName = "Vũ Ngọc Mạnh Cường",
  isFullTest = false,
  isDictionaryOpen = false,
  onToggleDictionary,
  onOpenUserDashboard,
  onOpenAdminPortal,
  onOpenBugReport,
  onOpenDownloadPdf,
  examExecutionMode = 'practice',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isMultiSection =
    isFullTest && (testMode === 'reading' ? passages.length > 1 : listeningSections.length > 1);

  const handlePrev = () => {
    if (testMode === 'reading') {
      if (currentPassage.id > 1) {
        onSelectPassage(currentPassage.id - 1);
      }
    } else {
      if (currentListeningSection.partNumber > 1) {
        onSelectListeningPart(currentListeningSection.partNumber - 1);
      }
    }
  };

  const handleNext = () => {
    if (testMode === 'reading') {
      if (currentPassage.id < passages.length) {
        onSelectPassage(currentPassage.id + 1);
      }
    } else {
      if (currentListeningSection.partNumber < listeningSections.length) {
        onSelectListeningPart(currentListeningSection.partNumber + 1);
      }
    }
  };

  const canPrev =
    testMode === 'reading' ? currentPassage.id > 1 : currentListeningSection.partNumber > 1;
  const canNext =
    testMode === 'reading'
      ? currentPassage.id < passages.length
      : currentListeningSection.partNumber < listeningSections.length;

  return (
    <header className="h-[60px] bg-[#FBC02D] dark:bg-[#181a22] text-gray-900 dark:text-white border-b border-amber-300 dark:border-slate-800 flex items-center justify-between px-3 md:px-5 shrink-0 z-40 shadow-xs relative">
      {/* Brand & Mode Switcher */}
      <div className="flex items-center gap-3 relative">
        {/* Brand Logo / Badge: IeltsBurger */}
        <button
          onClick={onOpenHome || onOpenLibrary}
          className="bg-[#005581] hover:bg-[#004466] text-white font-black px-2.5 py-1 rounded-lg text-xs md:text-sm tracking-wider shrink-0 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Return to Home Screen"
        >
          <span className="text-base">🍔</span>
          <span>IeltsBurger</span>
        </button>

        <div className="h-5 w-px bg-amber-400/80 dark:bg-slate-700 hidden md:block"></div>

        {/* Section Navigation: Stepper if Full Test, Fixed Badge if Individual Test */}
        {isMultiSection ? (
          <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 p-0.5 rounded-lg border border-black/10 dark:border-slate-700 shadow-2xs">
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                canPrev
                  ? 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white active:scale-95'
                  : 'text-gray-400 dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
              title="Previous Section"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1 px-2 py-0.5 text-left hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors group"
              title="Click to select specific passage or part"
            >
              <h1 className="text-xs md:text-sm font-extrabold text-gray-900 dark:text-white tracking-tight">
                {testMode === 'reading'
                  ? `Passage ${currentPassage.id}: ${currentPassage.title}`
                  : `Part ${currentListeningSection.partNumber}: ${currentListeningSection.title}`}
              </h1>
              <span className="material-symbols-outlined text-gray-600 dark:text-slate-300 text-base">
                arrow_drop_down
              </span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canNext}
              className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                canNext
                  ? 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white active:scale-95'
                  : 'text-gray-400 dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
              title="Next Section"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-lg border border-black/10 dark:border-slate-700 shadow-2xs font-extrabold text-xs text-gray-900 dark:text-white">
            <span>
              {testMode === 'reading'
                ? `Passage ${currentPassage.id}: ${currentPassage.title}`
                : `Part ${currentListeningSection.partNumber}: ${currentListeningSection.title}`}
            </span>
          </div>
        )}

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-12 left-28 w-80 bg-white border border-gray-200 shadow-xl rounded-lg p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-gray-900">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1 mb-1">
              Select {testMode === 'reading' ? 'Reading Passage' : 'Listening Part'}
            </div>
            {testMode === 'reading'
              ? passages.map((p) => {
                  const isSelected = p.id === currentPassage.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPassage(p.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded flex items-center justify-between transition-all mb-1 ${
                        isSelected
                          ? 'bg-[#005581] text-white font-semibold shadow-xs'
                          : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] opacity-80 font-medium uppercase tracking-wider">
                          Passage {p.id}
                        </div>
                        <div className="text-sm font-semibold truncate max-w-[210px]">
                          {p.title}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                      )}
                    </button>
                  );
                })
              : listeningSections.map((sec) => {
                  const isSelected = sec.partNumber === currentListeningSection.partNumber;
                  return (
                    <button
                      key={sec.partNumber}
                      onClick={() => {
                        onSelectListeningPart(sec.partNumber);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded flex items-center justify-between transition-all mb-1 ${
                        isSelected
                          ? 'bg-[#005581] text-white font-semibold shadow-xs'
                          : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] opacity-80 font-medium uppercase tracking-wider">
                          Part {sec.partNumber}
                        </div>
                        <div className="text-sm font-semibold truncate max-w-[210px]">
                          {sec.title}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                      )}
                    </button>
                  );
                })}
          </div>
        )}
      </div>

      {/* Timer & Header Tools */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Timer Badge */}
        {showTimer && (
          <div className="flex items-center gap-1.5 bg-[#E11D48] text-white font-mono font-bold px-3 py-1 rounded-md text-sm shadow-2xs">
            <span className="material-symbols-outlined text-base">alarm</span>
            <span>{formatTime(timerSeconds)}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 border-l border-amber-400/80 dark:border-slate-700 pl-3">
          {onOpenDownloadPdf && (
            <button
              onClick={onOpenDownloadPdf}
              className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 text-gray-900 dark:text-white border border-amber-300 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center justify-center"
              title="Print / Download PDF"
            >
              <span className="material-symbols-outlined text-lg">print</span>
            </button>
          )}

          {onOpenBugReport && (
            <button
              onClick={onOpenBugReport}
              className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center justify-center"
              title="Report Question Bug"
            >
              <span className="material-symbols-outlined text-lg">bug_report</span>
            </button>
          )}

          {onToggleDictionary && (
            <button
              onClick={() => {
                if (examExecutionMode === 'test') {
                  alert('🔒 AI Dictionary is disabled during Real Exam Mode.');
                  return;
                }
                onToggleDictionary();
              }}
              className={`p-1.5 rounded-lg transition-all border cursor-pointer flex items-center justify-center ${
                examExecutionMode === 'test'
                  ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border-gray-300 dark:border-slate-700 cursor-not-allowed'
                  : isDictionaryOpen
                  ? 'bg-[#005581] text-white border-[#004466] shadow-2xs'
                  : 'bg-white/90 dark:bg-slate-800/90 text-gray-900 dark:text-white border-amber-300 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700'
              }`}
              title={examExecutionMode === 'test' ? 'Dictionary disabled in Real Exam Mode' : 'AI Dictionary'}
            >
              <span className="material-symbols-outlined text-lg">menu_book</span>
            </button>
          )}

          <button
            onClick={onToggleSettings}
            aria-label="Settings"
            className="p-1.5 text-gray-900 dark:text-gray-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded"
            title="Display & Test Settings"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>

          {testMode === 'reading' && (
            <button
              onClick={onToggleNotes}
              aria-label="Notes"
              className={`p-1.5 rounded transition-all duration-200 ${
                isNotesOpen
                  ? 'bg-[#005581] text-white'
                  : 'bg-black/10 text-gray-900 hover:bg-black/15'
              }`}
              title="Toggle Notes & Highlights"
            >
              <span className="material-symbols-outlined text-xl">edit_note</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


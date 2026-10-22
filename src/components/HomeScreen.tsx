import React from 'react';
import { TestMode, Language } from '../types';
import { getT } from '../utils/i18n';
import { mockLibraryCards } from '../data/libraryData';
import { SiteHeader } from './SiteHeader';

interface HomeScreenProps {
  onNavigateToLibrary: (initialTab?: string) => void;
  onNavigateToFullTest?: () => void;
  onSelectTest: (mode: TestMode, targetId: number, isFullTest?: boolean) => void;
  userName?: string;
  onOpenUserDashboard?: () => void;
  onOpenAdminPortal?: () => void;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
  theme?: string;
  onChangeTheme?: (theme: string) => void;
  onOpenSettings?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToLibrary,
  onNavigateToFullTest,
  onSelectTest,
  userName = 'Vũ Ngọc Mạnh Cường',
  onOpenUserDashboard,
  onOpenAdminPortal,
  language = 'en',
  onChangeLanguage,
  theme = 'light',
  onChangeTheme,
  onOpenSettings,
}) => {
  const t = getT(language as Language);
  const featuredReading = mockLibraryCards.filter((c) => c.testMode === 'reading').slice(0, 3);
  const featuredListening = mockLibraryCards.filter((c) => c.testMode === 'listening').slice(0, 3);

  const handleGoFullMockTest = () => {
    if (onNavigateToFullTest) {
      onNavigateToFullTest();
    } else {
      onSelectTest('reading', 1, true);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-[#12141c] text-slate-900 dark:text-slate-100 font-sans flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Universal Site Header */}
      <SiteHeader
        activeTab="home"
        onNavigateHome={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateLibrary={(tab) => onNavigateToLibrary(tab || 'Reading Practices')}
        onNavigateFullTest={handleGoFullMockTest}
        onOpenUserDashboard={onOpenUserDashboard}
        onOpenAdminPortal={onOpenAdminPortal}
        userName={userName}
        language={language}
        onChangeLanguage={onChangeLanguage}
        theme={theme}
        onChangeTheme={onChangeTheme}
        onOpenSettings={onOpenSettings}
      />

      {/* Main Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/70 dark:from-[#181a22] dark:via-[#14161f] dark:to-[#12141c] border-b border-slate-200 dark:border-slate-800 py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-2xs">
                <span>⚡</span>
                <span>IELTS Computer-Based Exam Simulator</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Master IELTS Preparation <br className="hidden sm:inline" />
                <span className="text-[#005581] dark:text-sky-400">Computer Delivered Format</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Practice real IELTS Reading & Listening test papers with built-in text highlight tools, notes, vocabulary lookup, and instant detailed explanations.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigateToLibrary('Reading Practices')}
                  className="bg-[#E11D48] hover:bg-rose-700 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                  <span>Explore Test Library</span>
                </button>

                <button
                  onClick={handleGoFullMockTest}
                  className="bg-[#005581] hover:bg-[#004466] text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">stars</span>
                  <span>Start Full Exam Simulator</span>
                </button>
              </div>

              {/* Statistics Pill */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">10+</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Real Exam Papers</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#005581] dark:text-sky-400">100%</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Detailed Explanations</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#E11D48] dark:text-rose-400">9.0</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Band Score Estimator</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Mock Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white dark:bg-[#181a22] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍔</span>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">IeltsBurger Exam View</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                    Live Demo
                  </span>
                </div>

                {/* Simulated Reading Passage Preview Card */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Passage 1: The Development of Modern Telegraphy
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    The electric telegraph revolutionized global communications in the 19th century. By transmitting electrical pulses along insulated wire networks, messages that previously took weeks...
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-bold text-[#005581] dark:text-sky-400">13 Questions • Academic Reading</span>
                    <button
                      onClick={() => onSelectTest('reading', 1, false)}
                      className="bg-[#005581] hover:bg-[#004466] text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Start Practice ›
                    </button>
                  </div>
                </div>

                {/* Simulated Listening Section Preview Card */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Part 1: Travel Agency Consultation & Mountain Tours
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-[#E11D48] text-xl">play_circle</span>
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-[#E11D48]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">02:15 / 05:04</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-[#E11D48] dark:text-rose-400">10 Questions • Academic Listening</span>
                    <button
                      onClick={() => onSelectTest('listening', 1, false)}
                      className="bg-[#E11D48] hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Start Listening ›
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Essential Features for IELTS Test Takers
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Designed to mirror authentic computer-delivered test software with split-pane layout, highlighting, annotation, and answer quote locators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-2xl">
                📖
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Authentic Reading Passages</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Split screen layout with live text highlighter, notes drawer, and question quote locators.
              </p>
            </div>

            <div className="bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-[#E11D48] dark:text-rose-400 flex items-center justify-center font-black text-2xl">
                🎧
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">HD Listening Audio</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                High fidelity audio with radio matching tables, blank completion, and audio playback speed control.
              </p>
            </div>

            <div className="bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-[#005581] dark:text-sky-400 flex items-center justify-center font-black text-2xl">
                💡
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Detailed Solution Mode</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Comprehensive answer review with reference quotes, line references, and clear explanations.
              </p>
            </div>

            <div className="bg-white dark:bg-[#181a22] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-2xl">
                🏆
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Full Exam Simulator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Build 60-minute timed full tests to test your endurance and time management under exam pressure.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Practice Tests Section */}
        <section className="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Recently Updated Tests</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Select individual passages or test your endurance with full exams</p>
              </div>
              <button
                onClick={() => onNavigateToLibrary('Reading Practices')}
                className="text-xs font-black text-[#005581] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Browse All Tests</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Reading Practices Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005581] dark:text-sky-400">menu_book</span>
                Reading Practices
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredReading.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white dark:bg-[#181a22] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group"
                  >
                    <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-amber-400 text-slate-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-md shadow-2xs">
                        {card.badgeText}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {card.topic && (
                          <span className="inline-block bg-sky-100 dark:bg-sky-950 text-[#005581] dark:text-sky-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md mb-2">
                            🏷️ {card.topic}
                          </span>
                        )}
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-[#005581] dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                          {card.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                          {card.attemptsCount} test attempts
                        </p>
                      </div>
                      <button
                        onClick={() => onSelectTest(card.testMode, card.targetId, false)}
                        className="w-full py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#005581] hover:bg-[#005581] dark:hover:bg-sky-600 dark:hover:border-sky-600 text-slate-800 dark:text-slate-200 hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">edit_document</span>
                        <span>Take Test</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Listening Practices Section */}
            <div className="space-y-4 pt-6">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E11D48] dark:text-rose-400">headphones</span>
                Listening Practices
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredListening.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white dark:bg-[#181a22] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group"
                  >
                    <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-rose-500 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-md shadow-2xs">
                        {card.badgeText}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {card.topic && (
                          <span className="inline-block bg-rose-100 dark:bg-rose-950 text-[#E11D48] dark:text-rose-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md mb-2">
                            🏷️ {card.topic}
                          </span>
                        )}
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-[#E11D48] dark:group-hover:text-rose-400 transition-colors leading-snug line-clamp-2">
                          {card.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                          {card.attemptsCount} test attempts
                        </p>
                      </div>
                      <button
                        onClick={() => onSelectTest(card.testMode, card.targetId, false)}
                        className="w-full py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#E11D48] hover:bg-[#E11D48] text-slate-800 dark:text-slate-200 hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">headphones</span>
                        <span>Take Test</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-[#0c0e14] text-slate-400 border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <span className="font-extrabold text-white text-base">IeltsBurger</span>
            <span className="text-slate-500">| Standard IELTS Test Suite</span>
          </div>
          <div className="flex items-center gap-6 font-bold text-slate-300">
            <span onClick={() => onNavigateToLibrary()} className="hover:text-white cursor-pointer">
              Test Library
            </span>
            <span onClick={() => handleGoFullMockTest()} className="hover:text-white cursor-pointer">
              Full Exam Simulator
            </span>
          </div>
          <div className="text-slate-500 font-medium">
            © 2026 IeltsBurger. Built for IELTS exam success.
          </div>
        </div>
      </footer>
    </div>
  );
};

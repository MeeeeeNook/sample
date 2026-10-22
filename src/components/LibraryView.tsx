import React, { useState } from 'react';
import { LibraryTestCard, TestMode, Language } from '../types';
import { mockLibraryCards } from '../data/libraryData';
import { SiteHeader } from './SiteHeader';

interface LibraryViewProps {
  onSelectTest: (mode: TestMode, targetId: number, isFullTest?: boolean) => void;
  onNavigateHome: () => void;
  onNavigateFullTest?: () => void;
  userName?: string;
  initialTab?: string;
  onOpenUserDashboard?: () => void;
  onOpenAdminPortal?: () => void;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
  theme?: string;
  onChangeTheme?: (theme: string) => void;
  onOpenSettings?: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  onSelectTest,
  onNavigateHome,
  onNavigateFullTest,
  userName = 'Vũ Ngọc Mạnh Cường',
  initialTab = 'Reading Practices',
  onOpenUserDashboard,
  onOpenAdminPortal,
  language = 'en',
  onChangeLanguage,
  theme = 'light',
  onChangeTheme,
  onOpenSettings,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    initialTab === 'Listening Practices' ? 'Listening Practices' : 'Reading Practices'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [selectedSources, setSelectedSources] = useState<{ free: boolean; premium: boolean }>({
    free: false,
    premium: false,
  });

  // Unique list of topics from mockLibraryCards
  const availableTopics = [
    'All Topics',
    ...Array.from(new Set(mockLibraryCards.map((c) => c.topic).filter(Boolean))),
  ];

  // Filter logic
  const filteredCards = mockLibraryCards.filter((card) => {
    // Filter by skill tab
    if (activeTab === 'Reading Practices' && card.testMode !== 'reading') return false;
    if (activeTab === 'Listening Practices' && card.testMode !== 'listening') return false;

    // Filter by Topic
    if (selectedTopic !== 'All Topics' && card.topic !== selectedTopic) return false;

    // Filter by search query (Title or Topic)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const titleMatch = card.title.toLowerCase().includes(q);
      const topicMatch = card.topic ? card.topic.toLowerCase().includes(q) : false;
      if (!titleMatch && !topicMatch) return false;
    }

    // Filter by Free / Premium
    if (selectedSources.free && !selectedSources.premium && card.isPro) return false;
    if (selectedSources.premium && !selectedSources.free && !card.isPro) return false;

    return true;
  });

  const toggleSource = (key: 'free' | 'premium') => {
    setSelectedSources((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`min-h-screen overflow-y-auto bg-[#F8FAFC] dark:bg-[#12141c] text-slate-900 dark:text-slate-100 font-sans flex flex-col w-full ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Universal Site Header */}
      <SiteHeader
        activeTab="library"
        onNavigateHome={onNavigateHome}
        onNavigateLibrary={(tab) => setActiveTab(tab === 'Listening Practices' ? 'Listening Practices' : 'Reading Practices')}
        onNavigateFullTest={onNavigateFullTest || (() => onSelectTest('reading', 1, true))}
        onOpenUserDashboard={onOpenUserDashboard}
        onOpenAdminPortal={onOpenAdminPortal}
        userName={userName}
        language={language}
        onChangeLanguage={onChangeLanguage}
        theme={theme}
        onChangeTheme={onChangeTheme}
        onOpenSettings={onOpenSettings}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">IELTS Test Library</h1>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
              Browse exam passages by skill & topic, or launch a full exam simulator
            </p>
          </div>
          <button
            onClick={() => onNavigateFullTest ? onNavigateFullTest() : onSelectTest('reading', 1, true)}
            className="bg-[#005581] hover:bg-[#004466] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>Start Full Exam Simulator</span>
          </button>
        </div>

        {/* Practice Category Tabs & Topic Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Reading Practices */}
            <button
              onClick={() => setActiveTab('Reading Practices')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === 'Reading Practices'
                  ? 'bg-[#005581] text-white border-[#005581] shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              Reading Practices
            </button>

            {/* Listening Practices */}
            <button
              onClick={() => setActiveTab('Listening Practices')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === 'Listening Practices'
                  ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-base">headphones</span>
              Listening Practices
            </button>
          </div>

          {/* Topic Dropdown Filter */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#181a22] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold shadow-2xs">
            <span className="material-symbols-outlined text-base text-[#005581] dark:text-sky-400">category</span>
            <span className="text-slate-500 dark:text-slate-400">Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-transparent font-extrabold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
            >
              {availableTopics.map((topic) => (
                <option key={topic} value={topic} className="dark:bg-[#181a22] dark:text-white">
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STANDARD PRACTICE TESTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar Filters */}
          <div className="md:col-span-1 space-y-6">
            {/* Topic & Title Search Box */}
            <div className="bg-white dark:bg-[#181a22] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                Search by Topic / Title
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="e.g. Technology, AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border border-r-0 border-slate-300 dark:border-slate-700 rounded-l-xl text-xs outline-none bg-slate-50 dark:bg-slate-900 dark:text-white focus:border-[#E11D48]"
                />
                <button className="bg-[#E11D48] hover:bg-rose-700 text-white px-3 py-2 rounded-r-xl flex items-center justify-center transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-base">search</span>
                </button>
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="bg-white dark:bg-[#181a22] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                      selectedTopic === topic
                        ? 'bg-[#005581] text-white border-[#005581]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Filter */}
            <div className="bg-white dark:bg-[#181a22] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Access Tier
              </h3>
              <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSources.free}
                    onChange={() => toggleSource('free')}
                    className="w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                  />
                  <span>Free Tests</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSources.premium}
                    onChange={() => toggleSource('premium')}
                    className="w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                  />
                  <span>Pro Member Tests</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Test Cards Grid */}
          <div className="md:col-span-3">
            {filteredCards.length === 0 ? (
              <div className="bg-white dark:bg-[#181a22] p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No tests found matching your selected topic or search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTopic('All Topics');
                    setSelectedSources({ free: false, premium: false });
                  }}
                  className="text-xs text-[#E11D48] font-extrabold hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white dark:bg-[#181a22] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group"
                  >
                    {/* Image Banner */}
                    <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-amber-400 text-slate-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-md shadow-2xs">
                        {card.badgeText}
                      </span>
                      <span
                        className={`absolute top-3 right-3 font-black text-[10px] px-2 py-0.5 rounded text-white shadow-2xs ${
                          card.isPro ? 'bg-red-500' : 'bg-emerald-600'
                        }`}
                      >
                        {card.isPro ? 'PRO' : 'FREE'}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Topic Tag */}
                        {card.topic && (
                          <span className="inline-block bg-sky-100 dark:bg-sky-950/80 text-[#005581] dark:text-sky-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-sky-200 dark:border-sky-800">
                            🏷️ {card.topic}
                          </span>
                        )}
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-[#E11D48] transition-colors leading-snug line-clamp-2">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {card.attemptsCount} test attempts
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => onSelectTest(card.testMode, card.targetId, false)}
                        className="w-full py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#E11D48] hover:bg-[#E11D48] text-slate-800 dark:text-slate-200 hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 group/btn shadow-2xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {card.testMode === 'listening' ? 'headphones' : 'edit_document'}
                        </span>
                        <span>Take Test</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

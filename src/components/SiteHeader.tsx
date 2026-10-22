import React from 'react';
import { Language } from '../types';
import { getT } from '../utils/i18n';

interface SiteHeaderProps {
  activeTab?: 'home' | 'library' | 'fulltest' | 'dashboard' | 'solution';
  onNavigateHome: () => void;
  onNavigateLibrary: (tab?: string) => void;
  onNavigateFullTest: () => void;
  onOpenUserDashboard?: () => void;
  onOpenAdminPortal?: () => void;
  userName?: string;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
  theme?: string;
  onChangeTheme?: (theme: string) => void;
  onOpenSettings?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  activeTab = 'home',
  onNavigateHome,
  onNavigateLibrary,
  onNavigateFullTest,
  onOpenUserDashboard,
  onOpenAdminPortal,
  userName = 'Vũ Ngọc Mạnh Cường',
  language = 'vi' as Language,
  onChangeLanguage,
  theme = 'light',
  onChangeTheme,
  onOpenSettings,
}) => {
  const t = getT(language);

  return (
    <header className="bg-white dark:bg-[#181a22] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo: Clean IeltsBurger without subtitle */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={onNavigateHome}
            title="IeltsBurger Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md font-black text-xl group-hover:scale-105 transition-transform">
              🍔
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Ielts<span className="text-[#E11D48]">Burger</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-bold">
            <span
              onClick={onNavigateHome}
              className={`cursor-pointer transition-colors ${
                activeTab === 'home'
                  ? 'text-[#005581] dark:text-sky-400 border-b-2 border-[#005581] dark:border-sky-400 pb-1'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#005581] dark:hover:text-white'
              }`}
            >
              {t.home}
            </span>

            <span
              onClick={() => onNavigateLibrary('Reading Practices')}
              className={`cursor-pointer transition-colors ${
                activeTab === 'library'
                  ? 'text-[#005581] dark:text-sky-400 border-b-2 border-[#005581] dark:border-sky-400 pb-1'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#005581] dark:hover:text-white'
              }`}
            >
              {t.testLibrary}
            </span>

            <span
              onClick={onNavigateFullTest}
              className={`cursor-pointer transition-colors ${
                activeTab === 'fulltest'
                  ? 'text-[#E11D48] dark:text-rose-400 border-b-2 border-[#E11D48] dark:border-rose-400 pb-1'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#E11D48] dark:hover:text-rose-400'
              }`}
            >
              {t.fullTest}
            </span>

            {/* New Pages requested by user */}
            <span
              onClick={() => alert("Coming soon! AI Tutor features are currently under development.")}
              className="text-slate-600 dark:text-slate-300 hover:text-[#005581] dark:hover:text-white cursor-pointer transition-colors flex items-center gap-1"
              title="AI Tutor (Coming Soon)"
            >
              <span>AI Tutor</span>
              <span className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black px-1.5 py-0.2 rounded-full uppercase border border-amber-300 dark:border-amber-800">Soon</span>
            </span>

            <span
              onClick={() => alert("Coming soon! Competition & Live Leaderboards are currently under development.")}
              className="text-slate-600 dark:text-slate-300 hover:text-[#005581] dark:hover:text-white cursor-pointer transition-colors flex items-center gap-1"
              title="Competition (Coming Soon)"
            >
              <span>Competition</span>
              <span className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black px-1.5 py-0.2 rounded-full uppercase border border-amber-300 dark:border-amber-800">Soon</span>
            </span>

            {onOpenAdminPortal && (
              <span
                onClick={onOpenAdminPortal}
                className="text-[#005581] dark:text-sky-400 hover:text-[#003855] font-extrabold cursor-pointer transition-colors bg-sky-50 dark:bg-sky-950/50 px-2 py-1 rounded-lg border border-sky-200 dark:border-sky-800"
              >
                {t.adminPortal}
              </span>
            )}
          </nav>
        </div>

        {/* User Badge & Theme Tools */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher */}
          {onChangeTheme && (
            <button
              onClick={() => onChangeTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              <span className="material-symbols-outlined text-base">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}

          {/* Settings Modal Toggle */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer hidden sm:block"
              title="Settings"
            >
              <span className="material-symbols-outlined text-base">settings</span>
            </button>
          )}

          {/* User Profile / Dashboard Button */}
          {onOpenUserDashboard && (
            <button
              onClick={onOpenUserDashboard}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'dashboard'
                  ? 'bg-[#005581] text-white border-[#004466] shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title="Dashboard cá nhân"
            >
              <span className="material-symbols-outlined text-base text-[#005581] dark:text-sky-400">account_circle</span>
              <span className="hidden sm:inline">{userName}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

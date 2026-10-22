import React from 'react';
import { UserProfile } from './AuthModal';
import { UserDashboardView } from './UserDashboardView';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogout: () => void;
  onSelectTestFromDashboard?: (mode: 'reading' | 'listening', targetId: number) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onSelectTestFromDashboard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white/95 dark:bg-[#161822]/95 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden backdrop-blur-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex-1 overflow-y-auto">
          <UserDashboardView
            user={user}
            onUpdateUser={() => {}}
            onLogout={() => {
              onLogout();
              onClose();
            }}
            onSelectTestFromDashboard={(mode, id) => {
              if (onSelectTestFromDashboard) {
                onSelectTestFromDashboard(mode, id);
                onClose();
              }
            }}
            onNavigateHome={onClose}
            onNavigateLibrary={onClose}
            language="en"
            onChangeLanguage={() => {}}
            theme="light"
            onChangeTheme={() => {}}
            fontSize="normal"
            onChangeFontSize={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

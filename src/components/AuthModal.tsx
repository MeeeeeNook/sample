import React, { useState } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  targetBand: number;
  joinedDate: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [targetBand, setTargetBand] = useState<number>(7.5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const user: UserProfile = {
      name: fullName.trim() || email.split('@')[0] || 'Học viên IELTS',
      email,
      targetBand,
      joinedDate: new Date().toLocaleDateString('vi-VN'),
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        email
      )}`,
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleGoogleSignIn = () => {
    const user: UserProfile = {
      name: 'Vũ Ngọc Mạnh Cường',
      email: 'manhcuong2006ht@gmail.com',
      targetBand: 8.0,
      joinedDate: new Date().toLocaleDateString('vi-VN'),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 dark:bg-[#161822]/95 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200">
        
        {/* Header - Apple Minimal Style */}
        <div className="p-6 text-center relative border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <div className="w-12 h-12 bg-[#005581]/10 text-[#005581] dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-2xl">account_circle</span>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isSignUp ? 'Tạo Tài Khoản IELTS' : 'Đăng Nhập Tài Khoản'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Lưu tiến độ bài thi, từ vựng cá nhân & đồng bộ dữ liệu
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-2xl font-bold text-xs border border-slate-200/80 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Tiếp tục nhanh với Google</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Hoặc sử dụng Email</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                  Họ & Tên
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ và tên..."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-[#005581] outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-[#005581] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-[#005581] outline-none transition-all"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                  Mục tiêu Band Score IELTS
                </label>
                <select
                  value={targetBand}
                  onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#005581] outline-none transition-all"
                >
                  <option value={6.0}>Target Band 6.0</option>
                  <option value={6.5}>Target Band 6.5</option>
                  <option value={7.0}>Target Band 7.0</option>
                  <option value={7.5}>Target Band 7.5</option>
                  <option value={8.0}>Target Band 8.0</option>
                  <option value={8.5}>Target Band 8.5</option>
                  <option value={9.0}>Target Band 9.0</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#005581] hover:bg-[#004466] text-white rounded-xl font-extrabold text-xs shadow-md transition-all mt-2 cursor-pointer"
            >
              {isSignUp ? 'Tạo Tài Khoản' : 'Đăng Nhập'}
            </button>
          </form>

          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#005581] dark:text-sky-400 font-extrabold hover:underline"
            >
              {isSignUp ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors mt-1"
            >
              Tiếp tục làm bài tự do (Khách)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


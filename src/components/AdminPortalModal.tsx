import React, { useState, useEffect } from 'react';
import { UserProfile } from './AuthModal';
import { BugReport } from './BugReportModal';

interface ManagedUser extends UserProfile {
  id: string;
  status: 'active' | 'suspended';
  testsCompletedCount: number;
}

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'bugs' | 'tests_info'>('users');

  // Users state
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTargetBand, setNewTargetBand] = useState(7.0);

  // Bug Reports state
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [bugFilter, setBugFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  useEffect(() => {
    if (!isOpen) return;

    // Load users
    const savedUsers = localStorage.getItem('ielts_admin_users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        // fallback
      }
    } else {
      const defaultUsers: ManagedUser[] = [
        {
          id: 'u1',
          name: 'Vũ Ngọc Mạnh Cường',
          email: 'manhcuong2006ht@gmail.com',
          targetBand: 8.0,
          joinedDate: '15/05/2026',
          status: 'active',
          testsCompletedCount: 14,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          id: 'u2',
          name: 'Trần Nguyễn Phương Anh',
          email: 'phuonganh.ielts@gmail.com',
          targetBand: 7.5,
          joinedDate: '10/06/2026',
          status: 'active',
          testsCompletedCount: 8,
        },
        {
          id: 'u3',
          name: 'Lê Hoàng Minh',
          email: 'hoangminh99@outlook.com',
          targetBand: 6.5,
          joinedDate: '01/07/2026',
          status: 'active',
          testsCompletedCount: 5,
        },
      ];
      setUsers(defaultUsers);
      localStorage.setItem('ielts_admin_users', JSON.stringify(defaultUsers));
    }

    // Load bug reports
    const savedBugs = localStorage.getItem('ielts_bug_reports');
    if (savedBugs) {
      try {
        setBugReports(JSON.parse(savedBugs));
      } catch (e) {
        // fallback
      }
    } else {
      const sampleBugs: BugReport[] = [
        {
          id: 'b1',
          testTitle: 'Cam 18 Reading Passage 1: Urban Farming',
          testMode: 'reading',
          passageOrPartTitle: 'Passage 1',
          questionNumber: 4,
          reporterName: 'Trần Nguyễn Phương Anh',
          category: 'typo',
          description: 'Câu 4 thiếu dấu ngoặc đơn ở phần câu hỏi điền từ.',
          createdAt: '28/07/2026 14:20',
          status: 'pending',
        },
      ];
      setBugReports(sampleBugs);
      localStorage.setItem('ielts_bug_reports', JSON.stringify(sampleBugs));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveUsersToStorage = (updatedUsers: ManagedUser[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('ielts_admin_users', JSON.stringify(updatedUsers));
  };

  const saveBugsToStorage = (updatedBugs: BugReport[]) => {
    setBugReports(updatedBugs);
    localStorage.setItem('ielts_bug_reports', JSON.stringify(updatedBugs));
  };

  const handleToggleUserStatus = (id: string) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'active' ? ('suspended' as const) : ('active' as const),
        };
      }
      return u;
    });
    saveUsersToStorage(updated);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản người dùng này khỏi hệ thống?')) {
      const updated = users.filter((u) => u.id !== id);
      saveUsersToStorage(updated);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser: ManagedUser = {
      id: Date.now().toString(),
      name: newName.trim(),
      email: newEmail.trim(),
      targetBand: newTargetBand,
      joinedDate: new Date().toLocaleDateString('vi-VN'),
      status: 'active',
      testsCompletedCount: 0,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newEmail)}`,
    };

    saveUsersToStorage([newUser, ...users]);
    setNewName('');
    setNewEmail('');
    setIsAddUserOpen(false);
  };

  const handleResolveBug = (id: string) => {
    const updated = bugReports.map((b) => {
      if (b.id === id) {
        return { ...b, status: 'resolved' as const };
      }
      return b;
    });
    saveBugsToStorage(updated);
  };

  const handleDeleteBug = (id: string) => {
    const updated = bugReports.filter((b) => b.id !== id);
    saveBugsToStorage(updated);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredBugs = bugReports.filter((b) => {
    if (bugFilter === 'pending') return b.status === 'pending';
    if (bugFilter === 'resolved') return b.status === 'resolved';
    return true;
  });

  const pendingBugsCount = bugReports.filter((b) => b.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white/95 dark:bg-[#161822]/95 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200">
        
        {/* Header - Apple Style */}
        <div className="p-5 bg-slate-50/80 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/80 relative shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#005581] text-white rounded-2xl flex items-center justify-center font-black shadow-sm">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>IELTS Burger Admin Portal</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-black rounded-md">
                  ADMIN ACTIVE
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Quản lý tài khoản học viên & Báo cáo sự cố hệ thống
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-[#12141c]/50 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">group</span>
            <span>Quản lý Tài Khoản ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bugs')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'bugs'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">bug_report</span>
            <span>Báo Lỗi Nội Dung</span>
            {pendingBugsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white font-black text-[10px] rounded-full">
                {pendingBugsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tests_info')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'tests_info'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">folder_managed</span>
            <span>Quản lý Bài thi (Chờ định dạng)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* Controls Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-base">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm theo tên hoặc email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <button
                  onClick={() => setIsAddUserOpen(!isAddUserOpen)}
                  className="w-full sm:w-auto px-4 py-2 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  <span>Thêm tài khoản mới</span>
                </button>
              </div>

              {/* Add User Modal / Inline Form */}
              {isAddUserOpen && (
                <form
                  onSubmit={handleAddUser}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3 animate-in fade-in duration-150"
                >
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Tạo tài khoản học viên mới
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Họ và tên..."
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Địa chỉ Email..."
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white outline-none"
                    />
                    <select
                      value={newTargetBand}
                      onChange={(e) => setNewTargetBand(parseFloat(e.target.value))}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white outline-none"
                    >
                      <option value={6.0}>Target Band 6.0</option>
                      <option value={6.5}>Target Band 6.5</option>
                      <option value={7.0}>Target Band 7.0</option>
                      <option value={7.5}>Target Band 7.5</option>
                      <option value={8.0}>Target Band 8.0</option>
                      <option value={8.5}>Target Band 8.5</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddUserOpen(false)}
                      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#005581] text-white font-extrabold text-xs rounded-xl shadow-2xs"
                    >
                      Xác nhận tạo
                    </button>
                  </div>
                </form>
              )}

              {/* Users Table */}
              <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 font-bold border-b border-slate-200/80 dark:border-slate-800">
                      <th className="p-3.5">Học viên</th>
                      <th className="p-3.5">Target Band</th>
                      <th className="p-3.5">Ngày tham gia</th>
                      <th className="p-3.5">Trạng thái</th>
                      <th className="p-3.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredUsers.map((u) => (
                      <tr
                        key={u.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                u.avatarUrl ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                                  u.email
                                )}`
                              }
                              alt={u.name}
                              className="w-8 h-8 rounded-xl object-cover bg-slate-100 dark:bg-slate-800"
                            />
                            <div>
                              <div className="font-extrabold text-slate-900 dark:text-white">
                                {u.name}
                              </div>
                              <div className="text-[11px] text-slate-500 font-medium">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-bold text-[#005581] dark:text-sky-400">
                          Band {u.targetBand}
                        </td>
                        <td className="p-3.5 text-slate-500 font-medium">{u.joinedDate}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] ${
                              u.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            }`}
                          >
                            {u.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                          >
                            {u.status === 'active' ? 'Tạm khóa' : 'Mở khóa'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bugs' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Lọc theo trạng thái:</span>
                <button
                  onClick={() => setBugFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                    bugFilter === 'all'
                      ? 'bg-[#005581] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Tất cả ({bugReports.length})
                </button>
                <button
                  onClick={() => setBugFilter('pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                    bugFilter === 'pending'
                      ? 'bg-[#005581] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Chờ xử lý ({pendingBugsCount})
                </button>
                <button
                  onClick={() => setBugFilter('resolved')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                    bugFilter === 'resolved'
                      ? 'bg-[#005581] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Đã giải quyết ({bugReports.length - pendingBugsCount})
                </button>
              </div>

              {/* Bug List */}
              {filteredBugs.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-medium">
                  Chưa có báo cáo sự cố nào theo bộ lọc này.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredBugs.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md font-black text-[10px] uppercase ${
                              b.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            }`}
                          >
                            {b.status === 'pending' ? 'Chờ xử lý' : 'Đã xong'}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded-md">
                            {b.category.toUpperCase()}
                          </span>
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            {b.testTitle}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                          "{b.description}"
                        </p>

                        <div className="text-[11px] text-slate-400 font-medium">
                          Người báo: <strong>{b.reporterName}</strong> • {b.createdAt}{' '}
                          {b.questionNumber ? `• Câu số ${b.questionNumber}` : ''}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        {b.status === 'pending' && (
                          <button
                            onClick={() => handleResolveBug(b.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                          >
                            Đánh dấu Đã xử lý
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBug(b.id)}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'tests_info' && (
            <div className="py-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-[#005581]/10 text-[#005581] dark:text-sky-400 rounded-3xl flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">topic</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Quản lý Đề thi (Sẵn sàng cho chuẩn định dạng)
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Hệ thống quản lý đề thi đang trong trạng thái chờ. Khi bạn có cấu trúc file đề chuẩn (JSON/Word), tính năng tải lên và quản lý toàn bộ kho đề thi sẽ được kết nối tại đây.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#12141c]/50 flex justify-between items-center shrink-0">
          <p className="text-xs text-slate-500 font-medium">
            IELTS Burger Admin Panel v1.0
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl cursor-pointer"
          >
            Đóng Portal
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import BottomNav from './BottomNav';
import NotificationBell from './NotificationBell';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-soft border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-600 flex items-center gap-2">
                <span className="text-2xl">🍱</span>
                <span className="hidden sm:inline">捐飯盒平台</span>
                <span className="sm:hidden">捐飯盒</span>
              </Link>
            </div>
            
            {/* 桌面端導航 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/food-boxes" className="text-gray-700 hover:text-primary-600 text-sm lg:text-base min-h-[44px] flex items-center">
                瀏覽飯盒
              </Link>
              {isAuthenticated() ? (
                <>
                  <Link to="/create-food-box" className="btn-primary text-sm lg:text-base px-3 lg:px-4 py-2 min-h-[44px] flex items-center">
                    發布飯盒
                  </Link>
                  <Link to="/my-applications" className="text-gray-700 hover:text-primary-600 text-sm lg:text-base min-h-[44px] flex items-center">
                    我的申請
                  </Link>
                  <NotificationBell />
                  <Link to="/profile" className="text-gray-700 hover:text-primary-600 text-sm lg:text-base min-h-[44px] flex items-center">
                    {user?.name}
                  </Link>
                  <button onClick={handleLogout} className="btn-secondary text-sm lg:text-base px-3 lg:px-4 py-2 min-h-[44px]">
                    登出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 text-sm lg:text-base min-h-[44px] flex items-center">
                    登入
                  </Link>
                  <Link to="/register" className="btn-primary text-sm lg:text-base px-3 lg:px-4 py-2 min-h-[44px] flex items-center">
                    註冊
                  </Link>
                </>
              )}
            </div>

            {/* 移動端導航 - 精簡版 */}
            <div className="md:hidden flex items-center gap-1">
              <Link
                to="/food-boxes"
                className="btn-primary text-sm px-4 py-2 min-h-[44px] flex items-center active:scale-[0.98]"
                aria-label="瀏覽飯盒"
              >
                瀏覽
              </Link>
              <NotificationBell />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center active:bg-gray-100 rounded-lg"
                aria-label="菜單"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* 移動端菜單 */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
              <Link
                to="/food-boxes"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
              >
                瀏覽飯盒
              </Link>
              {isAuthenticated() ? (
                <>
                  <Link
                    to="/create-food-box"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
                  >
                    發布飯盒
                  </Link>
                  <Link
                    to="/my-applications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
                  >
                    我的申請
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
                  >
                    通知
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
                  >
                    個人資料
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
                  >
                    登出
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg"
                  >
                    登入
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center"
                  >
                    註冊
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      <main className="flex-grow pb-20" style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>{children}</main>
      {/* 底部導覽 - 所有設備都顯示 */}
      <BottomNav />
    </div>
  );
}

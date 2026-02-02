import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function BottomNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    {
      path: '/',
      label: '首頁',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      path: '/food-boxes',
      label: '瀏覽',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      path: '/create-food-box',
      label: '發布',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      requireAuth: true,
      fallbackPath: '/register',
    },
    {
      path: isAuthenticated() ? '/my-applications' : '/login',
      label: '我的',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  // 所有設備都顯示底部導覽
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-16 sm:h-20 max-w-7xl mx-auto" style={{ minHeight: 'calc(64px + env(safe-area-inset-bottom))' }}>
        {navItems.map((item) => {
          const targetPath = item.requireAuth && !isAuthenticated() 
            ? (item.fallbackPath || '/login')
            : item.path;
          const isActive = location.pathname === item.path || 
            (location.pathname === '/my-applications' && item.path === '/my-applications');
          
          return (
            <Link
              key={item.path}
              to={targetPath}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all min-h-[44px] min-w-[44px] ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-600 active:text-primary-500 active:bg-gray-50'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform active:scale-95`}>
                {item.icon}
              </div>
              <span className={`text-sm sm:text-base mt-1 ${isActive ? 'font-bold' : 'font-semibold'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-1 bg-primary-600 rounded-t-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

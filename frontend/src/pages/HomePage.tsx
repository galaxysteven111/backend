import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section - 更專業的設計 */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-warm mb-6">
            <span className="text-4xl sm:text-5xl">🍱</span>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-2 leading-tight">
          捐飯盒平台
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-2 px-4 font-medium">
          連接愛心，分享溫暖
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-8 px-4 max-w-2xl mx-auto leading-relaxed">
          一個專業的社區食物分享平台，讓多餘的食物找到需要的人，<br className="hidden sm:block" />
          減少浪費，傳遞關愛，共建和諧社區
        </p>
        
        {/* 統計數據 - 響應式布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-soft border border-gray-100">
            <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">已分享飯盒</div>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-soft border border-gray-100">
            <div className="text-3xl sm:text-4xl font-bold text-success-600 mb-2">200+</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">活躍用戶</div>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-soft border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">18</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">服務地區</div>
          </div>
        </div>
      </div>

      {/* 主要行動按鈕 - 專業設計 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16 max-w-3xl mx-auto">
        {/* 我要捐飯盒 */}
        <Link
          to={isAuthenticated() ? '/create-food-box' : '/register'}
          className="group relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-8 sm:p-10 text-white shadow-warm hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-primary-400"
          aria-label="我要捐飯盒，立即發布"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl sm:text-6xl">💝</div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">我要捐飯盒</h2>
            <p className="text-base sm:text-lg text-primary-50 mb-4 sm:mb-6 leading-relaxed">
              分享多餘的食物<br />幫助有需要的人<br />
              <span className="text-base opacity-90">減少浪費，傳遞關愛</span>
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-25 rounded-xl font-semibold text-base sm:text-lg min-h-[44px] active:bg-opacity-35 active:scale-[0.98] transition-all">
              立即發布
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
        </Link>

        {/* 我要取飯盒 */}
        <Link
          to="/food-boxes"
          className="group relative overflow-hidden bg-gradient-to-br from-success-500 via-success-600 to-success-700 rounded-2xl p-8 sm:p-10 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-success-400"
          aria-label="我要取飯盒，立即瀏覽"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl sm:text-6xl">🤲</div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">我要取飯盒</h2>
            <p className="text-base sm:text-lg text-success-50 mb-4 sm:mb-6 leading-relaxed">
              瀏覽可用飯盒<br />找到附近的愛心<br />
              <span className="text-base opacity-90">安全可靠，方便快捷</span>
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-25 rounded-xl font-semibold text-base sm:text-lg min-h-[44px] active:bg-opacity-35 active:scale-[0.98] transition-all">
              立即瀏覽
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
        </Link>
      </div>

      {/* 平台特色 - 更專業的展示 */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">為什麼選擇我們</h2>
          <p className="text-gray-600 text-sm sm:text-base">專業、安全、便捷的食物分享平台</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft text-center border-2 border-gray-100 hover:border-primary-200 hover:shadow-warm transition-all group">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl sm:text-3xl">📍</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">精準定位</h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              基於香港18區的精確位置匹配系統，快速找到附近的飯盒，節省時間
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft text-center border-2 border-gray-100 hover:border-primary-200 hover:shadow-warm transition-all group">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl sm:text-3xl">⏰</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">時間管理</h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              清晰的取餐時間安排與提醒系統，讓愛心傳遞更有序高效
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft text-center border-2 border-gray-100 hover:border-primary-200 hover:shadow-warm transition-all group">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-warm-100 to-warm-200 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl sm:text-3xl">🔒</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">安全可靠</h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              實名認證與評價系統，建立信任的社區環境，保障雙方權益
            </p>
          </div>
        </div>
      </div>

      {/* 使用流程 - 專業流程圖 */}
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">使用流程</h2>
          <p className="text-gray-600 text-sm sm:text-base">簡單四步，開始您的愛心之旅</p>
        </div>

        {/* 捐贈流程 */}
        <div className="bg-gradient-to-br from-primary-50 via-warm-50 to-primary-50 rounded-2xl p-8 sm:p-10 border-2 border-primary-100 shadow-soft">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-warm">
              💝
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">捐贈流程</h2>
              <p className="text-sm text-gray-600 mt-1">分享您的愛心</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: 1, title: '註冊登錄', desc: '創建帳號' },
              { step: 2, title: '發布飯盒', desc: '填寫信息' },
              { step: 3, title: '審核申請', desc: '選擇接收者' },
              { step: 4, title: '完成交接', desc: '傳遞愛心' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-3 shadow-warm">
                  {item.step}
                </div>
                <h4 className="font-bold mb-1 text-base sm:text-lg text-gray-900">{item.title}</h4>
                <p className="text-sm sm:text-base text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 接收流程 */}
        <div className="bg-gradient-to-br from-success-50 via-green-50 to-success-50 rounded-2xl p-8 sm:p-10 border-2 border-success-100 shadow-soft">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              🤲
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">接收流程</h2>
              <p className="text-sm text-gray-600 mt-1">找到您需要的幫助</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: 1, title: '註冊登錄', desc: '創建帳號' },
              { step: 2, title: '瀏覽飯盒', desc: '尋找附近' },
              { step: 3, title: '提交申請', desc: '等待審核' },
              { step: 4, title: '取餐交接', desc: '接收愛心' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 text-white rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-3 shadow-lg">
                  {item.step}
                </div>
                <h4 className="font-bold mb-1 text-base sm:text-lg text-gray-900">{item.title}</h4>
                <p className="text-sm sm:text-base text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

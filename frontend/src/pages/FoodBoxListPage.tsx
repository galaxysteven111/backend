import { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { format } from 'date-fns';
import { zhHK } from 'date-fns/locale';
import { HONG_KONG_DISTRICTS } from '../lib/constants';
import { resolveImageUrl, parseImages } from '../lib/utils';
import { FoodBoxMap } from '../components/Map';
import { FoodBoxListSkeleton } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import type { FoodBox, MapMarker } from '../types';

/** Debounce hook for search input */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

type ViewMode = 'list' | 'map';

/** Memoized food box card to prevent re-renders when other cards change */
const FoodBoxCard = memo(function FoodBoxCard({ foodBox }: { foodBox: FoodBox }) {
  const images = parseImages(foodBox.images);
  const thumbnailUrl = images.length > 0 ? resolveImageUrl(images[0]) : null;

  return (
    <Link
      to={`/food-boxes/${foodBox.id}`}
      className="card hover:shadow-warm transition-all active:scale-[0.98] border-2 border-transparent hover:border-primary-200 overflow-hidden !p-0"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={foodBox.title}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">{foodBox.title}</h2>
          <span className="ml-2 px-2 py-1 bg-success-100 text-success-700 text-xs font-semibold rounded-lg">
            {foodBox.quantity}盒
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">{foodBox.description || '無描述'}</p>
        <div className="space-y-2 text-sm pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-primary-500" aria-hidden="true">📍</span>
            <span className="text-gray-600 font-medium">{foodBox.district}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-500" aria-hidden="true">⏰</span>
            <span className="text-gray-600">
              {format(new Date(foodBox.pickup_time_start), 'MM/dd HH:mm', { locale: zhHK })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-500" aria-hidden="true">👤</span>
            <span className="text-gray-600">{foodBox.donor_name}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">點擊查看詳情</span>
            <span className="text-primary-600 font-medium text-sm">查看 &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function FoodBoxListPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['foodBoxes', selectedDistrict, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedDistrict) params.set('district', selectedDistrict);
      if (debouncedSearch.trim()) params.set('search', debouncedSearch.trim());
      const response = await api.get(`/food-boxes?${params.toString()}`);
      return response.data;
    },
    staleTime: 30_000,
  });

  const filteredBoxes: FoodBox[] = data?.foodBoxes || [];

  const mapMarkers: MapMarker[] = useMemo(
    () =>
      filteredBoxes
        .filter((fb) => fb.latitude && fb.longitude)
        .map((fb) => ({
          id: fb.id,
          lat: fb.latitude,
          lng: fb.longitude,
          title: fb.title,
          district: fb.district,
          quantity: fb.quantity,
        })),
    [filteredBoxes]
  );

  const handleMarkerClick = useCallback(
    (id: string) => navigate(`/food-boxes/${id}`),
    [navigate]
  );

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedDistrict('');
  }, []);

  const hasActiveFilters = searchQuery || selectedDistrict;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">🤲</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">可用飯盒</h1>
          </div>
        </div>
        <FoodBoxListSkeleton />
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">🤲</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">可用飯盒</h1>
          </div>
          {/* View toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1" role="tablist" aria-label="檢視模式">
            <button
              onClick={() => setViewMode('list')}
              role="tab"
              aria-selected={viewMode === 'list'}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all min-h-[44px] ${
                viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'
              }`}
            >
              列表
            </button>
            <button
              onClick={() => setViewMode('map')}
              role="tab"
              aria-selected={viewMode === 'map'}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all min-h-[44px] ${
                viewMode === 'map' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'
              }`}
            >
              地圖
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索飯盒標題、描述..."
              className="input-field pl-10 !py-2.5"
              aria-label="搜索飯盒"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-label="篩選"
            aria-expanded={showFilters}
            className={`px-3 py-2.5 rounded-xl border-2 transition-all min-h-[44px] ${
              showFilters || selectedDistrict
                ? 'border-primary-400 bg-primary-50 text-primary-700'
                : 'border-gray-200 text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="input-field !w-auto !py-2 text-sm"
              aria-label="按地區篩選"
            >
              <option value="">所有地區</option>
              {HONG_KONG_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-primary-600 hover:underline min-h-[44px]">
                清除篩選
              </button>
            )}
          </div>
        )}

        <div className="text-sm text-gray-500" aria-live="polite">
          共 {filteredBoxes.length} 個可用飯盒
          {hasActiveFilters && ` (已篩選)`}
        </div>
      </div>

      {/* Content */}
      {filteredBoxes.length === 0 ? (
        <EmptyState
          icon="📦"
          title={hasActiveFilters ? '沒有符合條件的飯盒' : '目前沒有可用的飯盒'}
          description={hasActiveFilters ? '嘗試調整篩選條件' : '請稍後再來查看，或成為第一個發布飯盒的人！'}
          action={hasActiveFilters ? (
            <button onClick={clearFilters} className="btn-secondary text-sm">清除篩選</button>
          ) : undefined}
        />
      ) : viewMode === 'map' ? (
        <FoodBoxMap
          markers={mapMarkers}
          onMarkerClick={handleMarkerClick}
          height="calc(100vh - 320px)"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBoxes.map((foodBox) => (
            <FoodBoxCard key={foodBox.id} foodBox={foodBox} />
          ))}
        </div>
      )}
    </div>
  );
}

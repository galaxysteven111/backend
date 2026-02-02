import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { zhHK } from 'date-fns/locale';
import { StaticMap } from '../components/Map';
import { FoodBoxDetailSkeleton } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import { getErrorMessage, resolveImageUrl, parseImages } from '../lib/utils';
import type { FoodBox } from '../types';

export default function FoodBoxDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [message, setMessage] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['foodBox', id],
    queryFn: async () => {
      const response = await api.get(`/food-boxes/${id}`);
      return response.data.foodBox as FoodBox;
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (applyData: { food_box_id: string; message: string }) => {
      const response = await api.post('/applications', applyData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('申請成功！');
      navigate('/my-applications');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, '申請失敗'));
    },
  });

  const handleApply = () => {
    if (!id) return;
    applyMutation.mutate({ food_box_id: id, message });
  };

  if (isLoading) return <FoodBoxDetailSkeleton />;

  if (isError || !data) {
    return (
      <ErrorState
        message="找不到此飯盒"
        onRetry={() => navigate('/food-boxes')}
        retryLabel="返回飯盒列表"
      />
    );
  }

  const images = parseImages(data.images);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 pb-20">
      <div className="card">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-success-100 text-success-700 text-sm font-semibold rounded-lg">
                  {data.quantity} 盒可用
                </span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-lg">
                  {data.district}
                </span>
              </div>
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((url, i) => (
                <img
                  key={i}
                  src={resolveImageUrl(url)}
                  alt={`飯盒圖片 ${i + 1}`}
                  className="w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-xl border-2 border-gray-200 flex-shrink-0"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        {data.description && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold mb-2 text-gray-900">📝 描述</h3>
            <p className="text-gray-700 text-sm sm:text-base">{data.description}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-white border-2 border-gray-100 rounded-xl">
            <span className="text-2xl" aria-hidden="true">📍</span>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">取餐地址</div>
              <div className="font-semibold text-gray-900">{data.pickup_address}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white border-2 border-gray-100 rounded-xl">
            <span className="text-2xl" aria-hidden="true">⏰</span>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">取餐時間</div>
              <div className="font-semibold text-gray-900">
                {format(new Date(data.pickup_time_start), 'yyyy年MM月dd日 HH:mm', { locale: zhHK })} -{' '}
                {format(new Date(data.pickup_time_end), 'HH:mm', { locale: zhHK })}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white border-2 border-gray-100 rounded-xl">
            <span className="text-2xl" aria-hidden="true">👤</span>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">捐贈者</div>
              <div className="font-semibold text-gray-900">{data.donor_name}</div>
            </div>
          </div>

          {data.latitude && data.longitude && (
            <div>
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <span aria-hidden="true">🗺️</span> 取餐位置
              </div>
              <StaticMap
                lat={data.latitude}
                lng={data.longitude}
                title={data.pickup_address}
                height="200px"
              />
            </div>
          )}
        </div>

        {isAuthenticated() && !data.user_application && (
          <div className="border-t-2 border-gray-100 pt-6 mt-6">
            <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
              <span aria-hidden="true">🤲</span>
              申請此飯盒
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="給捐贈者的留言（可選）例如：感謝您的愛心分享！"
              className="input-field mb-4"
              rows={4}
              aria-label="給捐贈者的留言"
            />
            <button
              onClick={handleApply}
              className="btn-primary w-full text-lg py-4"
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  申請中...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span aria-hidden="true">✓</span>
                  提交申請
                </span>
              )}
            </button>
          </div>
        )}
        {data.user_application && (
          <div className="border-t-2 border-gray-100 pt-6 mt-6">
            <div className="p-4 bg-primary-50 border-2 border-primary-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl" aria-hidden="true">📋</span>
                <span className="font-semibold text-gray-900">申請狀態</span>
              </div>
              <div className="text-sm text-gray-700">
                您的申請狀態：<span className="font-bold text-primary-700">{data.user_application.status === 'pending' ? '待審核' : data.user_application.status === 'approved' ? '已批准' : '已拒絕'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

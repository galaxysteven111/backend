import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { HONG_KONG_DISTRICTS } from '../lib/constants';
import { getErrorMessage } from '../lib/utils';
import { LocationPicker } from '../components/Map';
import ImageUpload from '../components/ImageUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import type { LatLng } from '../types';

export default function CreateFoodBoxPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: 1,
    district: '',
    pickup_address: '',
    pickup_time_start: '',
    pickup_time_end: '',
    contact_method: 'message',
  });
  const [location, setLocation] = useState<LatLng | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData & { latitude: number; longitude: number; images: string[] }) => {
      const response = await api.post('/food-boxes', {
        ...data,
        quantity: Number(data.quantity),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('飯盒發布成功！');
      navigate('/food-boxes');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, '發布失敗'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error('請先登入');
      navigate('/login');
      return;
    }
    if (!location) {
      toast.error('請在地圖上選擇取餐位置');
      return;
    }
    createMutation.mutate({
      ...formData,
      latitude: location.lat,
      longitude: location.lng,
      images,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8 pb-20">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">💝</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">發布飯盒</h1>
            <p className="text-sm text-gray-600 mt-1">分享您的愛心，幫助有需要的人</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              標題 <span className="text-primary-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="例如：今日多餘的午餐便當"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">描述</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              rows={3}
              placeholder="描述飯盒的內容、保存狀態等（可選）"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">圖片</label>
            <ImageUpload images={images} onChange={setImages} maxImages={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">數量 *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="input-field"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">地區 *</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">請選擇地區</option>
                {HONG_KONG_DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Map Location Picker */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              取餐位置 <span className="text-primary-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">點擊地圖選擇取餐地點</p>
            <LocationPicker
              value={location}
              onChange={(lat, lng) => setLocation({ lat, lng })}
              height="280px"
            />
            {location && (
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <span>📍</span>
                <span>已選擇: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">取餐地址 *</label>
            <input
              type="text"
              name="pickup_address"
              value={formData.pickup_address}
              onChange={handleChange}
              className="input-field"
              placeholder="例如：中環皇后大道中 123 號"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">取餐開始時間 *</label>
              <input
                type="datetime-local"
                name="pickup_time_start"
                value={formData.pickup_time_start}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">取餐結束時間 *</label>
              <input
                type="datetime-local"
                name="pickup_time_end"
                value={formData.pickup_time_end}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full text-lg py-4 mt-6"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                發布中...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span aria-hidden="true">💝</span>
                發布飯盒，分享愛心
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

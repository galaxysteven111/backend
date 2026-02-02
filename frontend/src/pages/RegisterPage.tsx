import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { HONG_KONG_DISTRICTS } from '../lib/constants';
import { getErrorMessage } from '../lib/utils';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'both',
    district: '',
  });
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('註冊成功！');
      navigate('/');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, '註冊失敗'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:py-12 pb-20">
      <div className="card">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">💝</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">註冊</h1>
          <p className="text-sm text-gray-600">加入我們，一起傳遞愛心</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">姓名 *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">電子郵件 *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">密碼 *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">電話</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">地區</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">請選擇地區</option>
              {HONG_KONG_DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">角色</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="donor">僅捐贈</option>
              <option value="recipient">僅接收</option>
              <option value="both">兩者皆可</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? '註冊中...' : '註冊'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          已有帳號？{' '}
          <Link to="/login" className="text-primary-600 hover:underline">
            立即登入
          </Link>
        </p>
      </div>
    </div>
  );
}

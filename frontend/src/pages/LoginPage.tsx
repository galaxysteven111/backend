import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('登入成功！');
      navigate('/');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, '登入失敗'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:py-12 pb-20">
      <div className="card">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🍱</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">登入</h1>
          <p className="text-sm text-gray-600">歡迎回來！</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">電子郵件</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '登入中...' : '登入'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          還沒有帳號？{' '}
          <Link to="/register" className="text-primary-600 hover:underline">
            立即註冊
          </Link>
        </p>
      </div>
    </div>
  );
}

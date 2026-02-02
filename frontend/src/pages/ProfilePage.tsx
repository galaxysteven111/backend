import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { PageLoading } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import type { User } from '../types';

export default function ProfilePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data.user as User;
    },
  });

  if (isLoading) return <PageLoading message="載入個人資料..." />;
  if (isError || !data) return <ErrorState message="載入個人資料失敗" onRetry={() => window.location.reload()} />;

  const user = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-12 pb-20">
      <div className="card">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">個人資料</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">姓名</label>
            <p className="text-lg font-medium">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">電子郵件</label>
            <p className="text-lg">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-500">電話</label>
              <p className="text-lg">{user.phone}</p>
            </div>
          )}
          {user.district && (
            <div>
              <label className="block text-sm font-medium text-gray-500">地區</label>
              <p className="text-lg">{user.district}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-500">角色</label>
            <p className="text-lg">
              {user.role === 'donor' ? '捐贈者' : user.role === 'recipient' ? '接收者' : '兩者皆可'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

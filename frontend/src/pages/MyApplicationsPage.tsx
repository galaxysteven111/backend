import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { format } from 'date-fns';
import { zhHK } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { PageLoading } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import type { Application, ApplicationStatus } from '../types';

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  approved: 'text-green-600 bg-green-100',
  rejected: 'text-red-600 bg-red-100',
  completed: 'text-blue-600 bg-blue-100',
  cancelled: 'text-gray-600 bg-gray-100',
  pending: 'text-yellow-600 bg-yellow-100',
};

const STATUS_TEXT: Record<ApplicationStatus, string> = {
  approved: '已批准',
  rejected: '已拒絕',
  completed: '已完成',
  cancelled: '已取消',
  pending: '待審核',
};

export default function MyApplicationsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['myApplications'],
    queryFn: async () => {
      const response = await api.get('/applications/my-applications');
      return response.data;
    },
  });

  if (isLoading) return <PageLoading message="載入申請列表..." />;
  if (isError) return <ErrorState onRetry={() => window.location.reload()} />;

  const applications: Application[] = data?.applications || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">📋</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">我的申請</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 ml-11">查看您的飯盒申請狀態</p>
      </div>
      {applications.length === 0 ? (
        <EmptyState
          icon="📭"
          title="您還沒有申請任何飯盒"
          description="開始瀏覽可用的飯盒吧！"
          action={
            <Link to="/food-boxes" className="btn-primary inline-flex items-center gap-2">
              <span aria-hidden="true">🤲</span>
              瀏覽可用飯盒
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {applications.map((application) => {
            const status = (application.status as ApplicationStatus) || 'pending';
            return (
              <div key={application.id} className="card hover:shadow-warm transition-all border-2 border-transparent hover:border-primary-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link
                      to={`/food-boxes/${application.food_box_id || ''}`}
                      className="text-xl font-semibold hover:text-primary-600"
                    >
                      {application.title}
                    </Link>
                    <p className="text-gray-600 mt-1">捐贈者：{application.donor_name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLES[status]}`}>
                    {STATUS_TEXT[status]}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>申請數量：{application.quantity_requested} 盒</div>
                  <div>取餐地址：{application.pickup_address}</div>
                  {application.pickup_time_start && application.pickup_time_end && (
                    <div>
                      取餐時間：{format(new Date(application.pickup_time_start), 'yyyy年MM月dd日 HH:mm', { locale: zhHK })} -{' '}
                      {format(new Date(application.pickup_time_end), 'HH:mm', { locale: zhHK })}
                    </div>
                  )}
                  {application.message && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <span className="font-medium">留言：</span> {application.message}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  申請時間：{format(new Date(application.created_at), 'yyyy年MM月dd日 HH:mm', { locale: zhHK })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

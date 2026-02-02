import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { formatDistanceToNow } from 'date-fns';
import { zhHK } from 'date-fns/locale';
import { NotificationSkeleton } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import type { Notification, NotificationType } from '../types';

const TYPE_ICONS: Record<NotificationType, string> = {
  application_received: '📬',
  application_approved: '✅',
  application_rejected: '❌',
  food_box_reserved: '📦',
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/notifications?limit=50');
      return response.data;
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      await api.patch('/notifications/read-all');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
    },
  });

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.is_read) {
      markReadMutation.mutate(notification.id);
    }
    if (notification.related_food_box_id) {
      navigate(`/food-boxes/${notification.related_food_box_id}`);
    }
  }, [markReadMutation, navigate]);

  const notifications: Notification[] = data?.notifications || [];
  const hasUnread = notifications.some((n) => !n.is_read);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">🔔</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">通知</h1>
        </div>
        <NotificationSkeleton />
      </div>
    );
  }

  if (isError) return <ErrorState message="載入通知失敗" onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">🔔</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">通知</h1>
        </div>
        {hasUnread && (
          <button
            onClick={() => markAllReadMutation.mutate()}
            className="text-sm text-primary-600 hover:underline font-medium min-h-[44px] flex items-center"
            disabled={markAllReadMutation.isPending}
          >
            全部標為已讀
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon="🔕"
          title="暫無通知"
          description="有新動態時會通知您"
        />
      ) : (
        <div className="space-y-2" role="list" aria-label="通知列表">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              role="listitem"
              className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[44px] ${
                notification.is_read
                  ? 'bg-white border-gray-100 hover:border-gray-200'
                  : 'bg-primary-50 border-primary-200 hover:border-primary-300'
              }`}
            >
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">
                  {TYPE_ICONS[notification.type] || '🔔'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm sm:text-base ${notification.is_read ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
                      {notification.title}
                    </p>
                    {!notification.is_read && (
                      <span className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" aria-label="未讀"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: zhHK })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
};

function LoadingSpinner({ size = 'md', message, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`text-center ${className}`} role="status" aria-label={message || '載入中'}>
      <div className={`inline-block animate-spin rounded-full border-primary-200 border-t-primary-600 ${sizeClasses[size]}${message ? ' mb-4' : ''}`}></div>
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
}

export default memo(LoadingSpinner);

/** Full-page centered loading state */
export const PageLoading = memo(function PageLoading({ message = '載入中...' }: { message?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <LoadingSpinner message={message} />
    </div>
  );
});

import { memo } from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

function ErrorState({
  message = '載入失敗，請稍後再試',
  onRetry,
  retryLabel = '重新載入',
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 ${className}`}>
      <div className="card text-center py-12">
        <div className="text-4xl mb-4" aria-hidden="true">😢</div>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary min-h-[44px]">
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(ErrorState);

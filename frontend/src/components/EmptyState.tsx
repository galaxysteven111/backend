import { memo, type ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`card text-center py-12 sm:py-16 ${className}`}>
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-600 mb-2 text-base sm:text-lg font-medium">{title}</p>
      {description && <p className="text-gray-500 text-sm mb-6">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default memo(EmptyState);

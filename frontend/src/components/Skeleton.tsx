import { memo } from 'react';

interface SkeletonProps {
  className?: string;
}

/** Base skeleton pulse element */
export const Skeleton = memo(function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
});

/** Skeleton for a food box card in the list */
export const FoodBoxCardSkeleton = memo(function FoodBoxCardSkeleton() {
  return (
    <div className="card !p-0 overflow-hidden">
      <Skeleton className="w-full h-40 !rounded-none" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
    </div>
  );
});

/** Skeleton for the food box list page */
export const FoodBoxListSkeleton = memo(function FoodBoxListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <FoodBoxCardSkeleton key={i} />
      ))}
    </div>
  );
});

/** Skeleton for the food box detail page */
export const FoodBoxDetailSkeleton = memo(function FoodBoxDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 pb-20">
      <div className="card space-y-6">
        <div>
          <Skeleton className="h-8 w-3/4 mb-3" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20 !rounded-lg" />
            <Skeleton className="h-7 w-16 !rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-24 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
});

/** Skeleton for notification items */
export const NotificationSkeleton = memo(function NotificationSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl border-2 border-gray-100">
          <div className="flex gap-3">
            <Skeleton className="w-8 h-8 !rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

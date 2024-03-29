import Skeleton from './skeleton';
import SkeletonAvatar from './skeleton-avatar';

export default function SkeletonPost() {
  return (
    <div className="flex gap-4 py-8">
      <SkeletonAvatar />
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-[200px] h-6" />

          <Skeleton className="w-[100px] h-4" />
        </div>

        <Skeleton className="w-[200px]" />
      </div>
    </div>
  );
}

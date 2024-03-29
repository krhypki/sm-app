import Skeleton from './skeleton';
import SkeletonAvatar from './skeleton-avatar';

export default function SkeletonUser() {
  return (
    <div className="flex gap-4 py-6">
      <SkeletonAvatar />
      <Skeleton className="flex-1 h-6" />
    </div>
  );
}

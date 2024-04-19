import Skeleton from './skeleton';
import SkeletonAvatar from './SkeletonAvatar';

export default function SkeletonAddPost() {
  return (
    <div>
      <div className="flex justify-between items-center gap-x-6 mb-8">
        <Skeleton className="h-6" />
        <SkeletonAvatar />
      </div>

      <Skeleton className="w-40 h-6 ml-auto" />
    </div>
  );
}

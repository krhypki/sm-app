import SkeletonPost from './skeleton-post';

export default function SkeletonFeed() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </div>
  );
}

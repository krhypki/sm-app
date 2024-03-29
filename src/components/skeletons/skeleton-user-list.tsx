import SkeletonUser from './skeleton-user';

export default function SkeletonUserList() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonUser key={i} />
      ))}
    </div>
  );
}

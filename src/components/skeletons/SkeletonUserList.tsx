import SkeletonUser from './SkeletonUser';

export default function SkeletonUserList() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonUser key={i} />
      ))}
    </div>
  );
}

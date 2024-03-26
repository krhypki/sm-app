import Collapse from '@/components/ui/collapse';
import PostComment from './PostComment';

type PostCommentListProps = {
  isOpen: boolean;
};

export default function PostCommentList({ isOpen }: PostCommentListProps) {
  return (
    <Collapse isOpen={isOpen}>
      <ul
        className="mt-8
      "
      >
        {[1, 2, 3, 4, 5].map((comment) => (
          <PostComment key={comment} />
        ))}
      </ul>
    </Collapse>
  );
}

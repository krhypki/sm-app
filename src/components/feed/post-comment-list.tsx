import Collapse from '@/components/ui/collapse';
import { CommentWithRelations } from '@/lib/types';
import PostCommentItem from './post-comment-item';

type PostCommentListProps = {
  isOpen: boolean;
  comments: CommentWithRelations[];
};

export default function PostCommentList({
  isOpen,
  comments,
}: PostCommentListProps) {
  return (
    <Collapse isOpen={isOpen}>
      <ul
        className="mt-8
      "
      >
        {comments.map((comment) => (
          <PostCommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </Collapse>
  );
}

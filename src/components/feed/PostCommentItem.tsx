import Avatar from '@/components/ui/Avatar';
import { CommentWithRelations } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatDate';
import { getUserFullname } from '@/lib/utils/getUserFullname';

type PostCommentItemProps = {
  comment: CommentWithRelations;
};

export default function PostCommentItem({ comment }: PostCommentItemProps) {
  return (
    <li className="py-4">
      <div className="flex gap-x-3">
        <Avatar isSmall src={comment.author.avatar || ''} alt="/" />
        <div className="space-y-2">
          <span className="font-bold">{getUserFullname(comment.author)}</span>
          <time className="block text-xs">{formatDate(comment.createdAt)}</time>

          <p>{comment.content}</p>
        </div>
      </div>
    </li>
  );
}

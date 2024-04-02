import { togglePostLike } from '@/actions/post';
import { Post } from '@prisma/client';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';

type FeedItemLikesProps = {
  postId: Post['id'];
  isLiked: boolean;
  totalLikes: number;
};

export default function FeedItemLikes({
  postId,
  isLiked,
  totalLikes,
}: FeedItemLikesProps) {
  return (
    <>
      <button
        className="flex gap-x-1 items-center"
        onClick={async () => {
          await togglePostLike(postId);
        }}
      >
        {isLiked ? <HeartFilledIcon className="text-accent" /> : <HeartIcon />}
        <span>{totalLikes}</span>
      </button>
    </>
  );
}

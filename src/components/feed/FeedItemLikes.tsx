import { togglePostLike } from '@/actions/post';
import { Post } from '@prisma/client';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useOptimistic } from 'react';
import { toast } from 'react-toastify';

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
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLiked);
  const [optimisticTotalLikes, setOptimisticTotalLikes] =
    useOptimistic(totalLikes);

  return (
    <>
      <button
        className="flex gap-x-1 items-center"
        onClick={async () => {
          setOptimisticLiked((prev) => !prev);
          setOptimisticTotalLikes(() =>
            optimisticLiked
              ? optimisticTotalLikes - 1
              : optimisticTotalLikes + 1,
          );
          const response = await togglePostLike(postId);

          if (response?.error) {
            toast.error(response.error);
          }
        }}
      >
        {optimisticLiked ? (
          <HeartFilledIcon className="text-accent" />
        ) : (
          <HeartIcon />
        )}
        <span>{optimisticTotalLikes}</span>
      </button>
    </>
  );
}

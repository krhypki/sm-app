import EmptyListText from '@/components/general/EmptyListText';
import { PostWithRelations } from '@/lib/types';
import { getUserFromSession } from '@/lib/utils/get-user-from-session';
import FeedItem from './FeedItem';

type FeedListProps = {
  posts: PostWithRelations[];
};

export default async function FeedList({ posts }: FeedListProps) {
  const currentUser = await getUserFromSession();

  return (
    <>
      {!posts.length && <EmptyListText>No posts to show</EmptyListText>}
      {!!posts.length && (
        <ul>
          {posts.map((post) => (
            <FeedItem
              currentUserId={currentUser.id}
              post={post}
              key={post.id}
            />
          ))}
        </ul>
      )}
    </>
  );
}

import { PostWithRelations } from '@/lib/types';
import FeedItem from './FeedItem';

type FeedListProps = {
  posts: PostWithRelations[];
};

export default function FeedList({ posts }: FeedListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <FeedItem post={post} key={post.id} />
      ))}
    </ul>
  );
}

import { getFollowedUsersPosts } from '@/actions/post';
import { POSTS_PER_PAGE } from '@/lib/constants';
import FeedList from '../feed/FeedList';
import FeedListControls from '../feed/feed-list-controls';

type DashboardFeedListProps = {
  currentPage: number;
};

export default async function DashboardFeedList({
  currentPage,
}: DashboardFeedListProps) {
  const [followedPosts, totalPages] = await getFollowedUsersPosts(
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div>
      <FeedList posts={followedPosts} />

      <FeedListControls
        baseUrl="/app/dashboard"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

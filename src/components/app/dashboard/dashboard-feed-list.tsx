import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { PostWithRelations } from '@/lib/types';
import FeedList from '../feed/FeedList';
import FeedListControls from '../feed/feed-list-controls';

type DashboardFeedListProps = {
  posts: PostWithRelations[];
  totalPages: number;
  currentPage: number;
};

export default function DashboardFeedList({
  posts,
  totalPages,
  currentPage,
}: DashboardFeedListProps) {
  return (
    <div>
      <ContentBlock>
        <Heading className="text-center mb-10" tag="h2">
          Recent posts from people you follow
        </Heading>

        <FeedList posts={posts} />
      </ContentBlock>

      <FeedListControls
        baseUrl="/app/dashboard"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

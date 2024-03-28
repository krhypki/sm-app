import { getFollowedUsersPosts } from '@/actions/post';
import DashboardAddPost from '@/components/app/dashboard/dashboard-add-post';
import DashboardFollowedUsers from '@/components/app/dashboard/dashboard-followed-users';
import FeedList from '@/components/app/feed/FeedList';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { getCurrentUser } from '@/lib/db/user';

export default async function AppDashboardPage() {
  const user = await getCurrentUser();
  const followedPosts = await getFollowedUsersPosts();

  return (
    <main className="py-8">
      <Container className="grid grid-cols-5 grid-rows-[200px_1fr] gap-8">
        <section className="row-span-2 col-span-2">
          <DashboardFollowedUsers initialUsers={user.followedUsers} />
        </section>

        <section className=" col-span-3">
          <DashboardAddPost />
        </section>

        <ContentBlock className="col-span-3">
          <Heading className="text-center mb-10" tag="h2">
            Recent posts from people you follow
          </Heading>

          <FeedList posts={followedPosts} />
        </ContentBlock>
      </Container>
    </main>
  );
}

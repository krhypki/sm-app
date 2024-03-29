import { getFollowedUsersPosts } from '@/actions/post';
import DashboardAddPost from '@/components/app/dashboard/dashboard-add-post';
import DashboardFeedList from '@/components/app/dashboard/dashboard-feed-list';
import DashboardFollowedUsers from '@/components/app/dashboard/dashboard-followed-users';
import Container from '@/components/ui/container';
import { POSTS_PER_PAGE } from '@/lib/constants';
import { getCurrentUser } from '@/lib/db/user';

type DashboardPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AppDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const user = await getCurrentUser();
  const page = Number(searchParams.page) || 1;
  const [followedPosts, totalPages] = await getFollowedUsersPosts(
    page * POSTS_PER_PAGE,
  );

  return (
    <main className="py-8">
      <Container className="grid grid-cols-5 grid-rows-[200px_1fr] gap-8">
        <section className="row-span-2 col-span-2">
          <DashboardFollowedUsers initialUsers={user.followedUsers} />
        </section>

        <section className="col-span-3">
          <DashboardAddPost />
        </section>

        <section className="col-span-3">
          <DashboardFeedList
            currentPage={page}
            posts={followedPosts}
            totalPages={totalPages}
          />
        </section>
      </Container>
    </main>
  );
}

import AddPostWrapper from '@/components/app/dashboard/add-post-wrapper';
import DashboardFeedList from '@/components/app/dashboard/dashboard-feed-list';
import FollowedUsersWrapper from '@/components/app/dashboard/followed-users-wrapper';
import SkeletonFeed from '@/components/skeletons/skeleton-feed';
import SkeletonUserList from '@/components/skeletons/skeleton-user-list';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { Suspense } from 'react';

type DashboardPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AppDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const page = Number(searchParams.page) || 1;

  return (
    <main className="py-8">
      <Container className="grid grid-cols-5 grid-rows-[200px_1fr] gap-8">
        <section className="row-span-2 col-span-2">
          <ContentBlock className="h-auto">
            <Heading className="text-center mb-10" tag="h2">
              Followed users
            </Heading>

            <Suspense fallback={<SkeletonUserList />}>
              <FollowedUsersWrapper />
            </Suspense>
          </ContentBlock>
        </section>

        <section className="col-span-3">
          <Suspense>
            <AddPostWrapper />
          </Suspense>
        </section>

        <section className="col-span-3">
          <ContentBlock>
            <Heading className="text-center mb-10" tag="h2">
              Recent posts from people you follow
            </Heading>

            <Suspense fallback={<SkeletonFeed />}>
              <DashboardFeedList currentPage={page} />
            </Suspense>
          </ContentBlock>
        </section>
      </Container>
    </main>
  );
}

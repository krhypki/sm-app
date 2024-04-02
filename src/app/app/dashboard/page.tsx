import AddPostWrapper from '@/components/app/dashboard/add-post-wrapper';
import DashboardFeedList from '@/components/app/dashboard/dashboard-feed-list';
import FollowedUsersWrapper from '@/components/app/dashboard/followed-users-wrapper';
import SkeletonAddPost from '@/components/skeletons/skeleton-add-post';
import SkeletonFeed from '@/components/skeletons/skeleton-feed';
import SkeletonUserList from '@/components/skeletons/skeleton-user-list';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';

type DashboardPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: `${APP_NAME} - Dashboard`,
};

export default async function AppDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const page = Number(searchParams.page) || 1;

  return (
    <main className="py-8">
      <Container className="grid lg:grid-cols-5 grid-rows-[200px_1fr] gap-8">
        <section className="row-span-2 col-span-3 lg:col-span-2 order-1 lg:order-0">
          <ContentBlock className="h-auto">
            <Heading className="text-center mb-10" tag="h2">
              Followed users
            </Heading>

            <Suspense fallback={<SkeletonUserList />}>
              <FollowedUsersWrapper />
            </Suspense>
          </ContentBlock>
        </section>

        <section className="col-span-3 order-0 lg:order-1">
          <ContentBlock className="flex flex-col">
            <Suspense fallback={<SkeletonAddPost />}>
              <AddPostWrapper />
            </Suspense>
          </ContentBlock>
        </section>

        <section className="col-span-3 order-2 lg:order-1">
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

import { getUserProfile } from '@/actions/user';
import FeedList from '@/components/feed/FeedList';
import Avatar from '@/components/ui/Avatar';
import Container from '@/components/ui/Container';
import ContentBlock from '@/components/ui/ContentBlock';
import Heading from '@/components/ui/Heading';
import FollowToggler from '@/components/users/FollowToggler';
import UsersList from '@/components/users/UsersList';
import { getCurrentUser } from '@/lib/db/user';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import { isFollowingUser } from '@/lib/utils/is-following-user';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type UserPageProps = {
  params: {
    id: string;
  };
};
export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const [user] = await getUserProfile(params.id);

  return {
    title: `${user ? getUserFullname(user) : ''} profile`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const [user, posts, followers] = await getUserProfile(params.id);
  const currentUser = await getCurrentUser();
  const isFollowing = isFollowingUser(currentUser, user?.id);
  const isCurrentUserProfile = currentUser.id === user?.id;

  if (!user) {
    redirect('/404');
  }

  const fullName = getUserFullname(user);

  return (
    <main>
      <Container className="relative">
        <section className="flex justify-center mb-10">
          <div className="flex flex-col items-center gap-y-6">
            {!isCurrentUserProfile && (
              <FollowToggler
                className="mx-auto"
                user={user.id}
                isFollowing={isFollowing}
              />
            )}

            <Heading tag="h1" className="capitalize mb-0">
              {fullName} profile
            </Heading>
            <Avatar src={user.avatar || ''} alt={fullName} />
          </div>
        </section>

        <div className="grid lg:grid-cols-3 grid-rows-[200px_1fr] gap-8">
          <ContentBlock className="max-lg:text-center">
            <Heading tag="h2">About</Heading>
            <p>
              {user.description ||
                `${fullName} doesn't want to say anything about themselves.`}
            </p>
          </ContentBlock>

          <ContentBlock>
            <Heading tag="h2" className="max-lg:text-center">
              Followers
            </Heading>
            <UsersList users={followers} currentUser={currentUser} />
          </ContentBlock>

          <ContentBlock className="lg:col-start-2 lg:col-span-2 lg:row-start-1 row-span-2">
            <Heading tag="h2" className="max-lg:text-center">
              Recent posts
            </Heading>
            <FeedList posts={posts} />
          </ContentBlock>
        </div>
      </Container>
    </main>
  );
}

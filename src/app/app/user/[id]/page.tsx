import { getUserProfile } from '@/actions/user';
import FeedList from '@/components/app/feed/FeedList';
import FollowToggler from '@/components/app/users/follow-toggler';
import Avatar from '@/components/ui/avatar';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { getCurrentUser } from '@/lib/db/user';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import { isFollowingUser } from '@/lib/utils/is-following-user';
import { redirect } from 'next/navigation';

type UserPageProps = {
  params: {
    id: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const [user, posts, followers] = await getUserProfile(params.id);
  const currentUser = await getCurrentUser();
  const isFollowing = isFollowingUser(currentUser, user?.id);

  if (!user) {
    redirect('/404');
  }

  const fullName = getUserFullname(user);

  return (
    <main>
      <Container className="relative">
        <section className="flex justify-center mb-10">
          <div className="flex flex-col items-center gap-y-6">
            <FollowToggler
              className="ml-0"
              user={user.id}
              isFollowing={isFollowing}
            />
            <Heading tag="h1" className="capitalize mb-0">
              {fullName} profile
            </Heading>
            <Avatar src={user.avatar || ''} alt={fullName} />
          </div>
        </section>

        <div className="grid grid-cols-3 grid-rows-[200px_1fr] gap-8">
          <ContentBlock>
            <Heading tag="h2">About</Heading>
            <p>
              {user.description ||
                `${fullName} don't want to say anything about themselves.`}
            </p>
          </ContentBlock>

          <ContentBlock>
            <Heading tag="h2">Followers</Heading>
            {/* <UsersList users={followers} /> */}
          </ContentBlock>

          <ContentBlock className="col-start-2 col-span-2 row-start-1 row-span-2">
            <Heading tag="h2">Recent posts</Heading>
            <FeedList posts={posts} />
          </ContentBlock>
        </div>
      </Container>
    </main>
  );
}

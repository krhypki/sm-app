import Avatar from '@/components/ui/avatar';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { findOneById } from '@/lib/db/user';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import { redirect } from 'next/navigation';

type UserPageProps = {
  params: {
    id: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const user = await findOneById(params.id);

  if (!user) {
    redirect('/404');
  }

  const fullName = getUserFullname(user);

  return (
    <main>
      <Container>
        <section className="flex flex-col items-center mb-10">
          <Heading tag="h1" className="capitalize">
            {fullName} profile
          </Heading>
          <Avatar src={user.avatar || ''} alt={fullName} />
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
            {/* <UsersList /> */}
          </ContentBlock>

          <ContentBlock className="col-start-2 col-span-2 row-start-1 row-span-2">
            <Heading tag="h2">Posts</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptas, voluptates, nemo, quidem quae dolorum autem quos
              molestias doloremque magni quibusdam.
            </p>
          </ContentBlock>
        </div>
      </Container>
    </main>
  );
}

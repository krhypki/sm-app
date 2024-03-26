import UsersList from '@/components/app/users/UsersList';
import Avatar from '@/components/ui/avatar';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';

export default function UserPage() {
  return (
    <main>
      <Container>
        <section className="flex flex-col items-center mb-10">
          <Heading tag="h1" className="capitalize">
            john doe profile
          </Heading>
          <Avatar src="/" alt="/" />
        </section>

        <div className="grid grid-cols-3 grid-rows-[200px_1fr] gap-8">
          <ContentBlock>
            <Heading tag="h2">About</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptas, voluptates, nemo, quidem quae dolorum autem quos
              molestias doloremque magni quibusdam.
            </p>
          </ContentBlock>

          <ContentBlock>
            <Heading tag="h2">Followers</Heading>
            <UsersList />
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

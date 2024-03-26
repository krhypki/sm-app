import UsersList from '@/components/app/users/UsersList';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import Input from '@/components/ui/input';

export default function FindPeoplePage() {
  return (
    <main>
      <Container>
        <Heading tag="h1" className="text-center">
          Find people
        </Heading>

        <section>
          <form className="max-w-lg mx-auto mb-10">
            <Input placeholder="Search for people" />
          </form>

          <ContentBlock>
            <UsersList />
          </ContentBlock>
        </section>
      </Container>
    </main>
  );
}

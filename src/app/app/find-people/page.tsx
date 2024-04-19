import FindPeopleFilterForm from '@/components/find-people/FindPeopleFilterForm';
import FindPeopleList from '@/components/find-people/FindPeopleList';
import Container from '@/components/ui/Container';
import ContentBlock from '@/components/ui/ContentBlock';
import Heading from '@/components/ui/Heading';
import { FindPeopleContextProvider } from '@/contexts/FIndPplContextProvider';
import { APP_NAME } from '@/lib/constants';
import { getCurrentUser } from '@/lib/db/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} - find people`,
};

export default async function FindPeoplePage() {
  const currentUser = await getCurrentUser();
  return (
    <FindPeopleContextProvider currentUser={currentUser}>
      <main>
        <Container>
          <Heading tag="h1" className="text-center">
            Find people
          </Heading>

          <section>
            <FindPeopleFilterForm />

            <ContentBlock className="min-h-[300px]">
              <FindPeopleList />
            </ContentBlock>
          </section>
        </Container>
      </main>
    </FindPeopleContextProvider>
  );
}

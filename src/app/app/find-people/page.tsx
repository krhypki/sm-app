import FindPeopleFilterForm from '@/components/app/find-people/find-people-filter-form';
import FindPeopleList from '@/components/app/find-people/find-people-list';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { FindPeopleContextProvider } from '@/contexts/find-ppl-context-provider';
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

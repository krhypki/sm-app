import FindPeopleFilterForm from '@/components/app/find-people/find-people-filter-form';
import FindPeopleList from '@/components/app/find-people/find-people-list';
import Container from '@/components/ui/container';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import { FindPeopleContextProvider } from '@/contexts/find-ppl-context-provider';

export default async function FindPeoplePage() {
  return (
    <FindPeopleContextProvider>
      <main>
        <Container>
          <Heading tag="h1" className="text-center">
            Find people
          </Heading>

          <section>
            <FindPeopleFilterForm />

            <ContentBlock>
              <FindPeopleList />
            </ContentBlock>
          </section>
        </Container>
      </main>
    </FindPeopleContextProvider>
  );
}

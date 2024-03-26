import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';

import Input from '@/components/ui/input';
import UsersList from '../users/UsersList';

export default function DashboardFollowedUsers() {
  return (
    <ContentBlock className="h-auto">
      <Heading className="capitalize mb-10" tag="h2">
        followed users
      </Heading>

      <form className="mb-4">
        <Input placeholder="Search users" />
      </form>
      <UsersList />
    </ContentBlock>
  );
}

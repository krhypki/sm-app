import EmptyListText from '@/components/general/EmptyListText';
import { UserEssentials, UserWithRelations } from '@/lib/types';
import { isFollowingUser } from '@/lib/utils/isFollowingUser';
import UsersListItem from './UsersListItem';

type UsersListProps = {
  users: UserEssentials[];
  currentUser: UserWithRelations;
};

export default function UsersList({ users, currentUser }: UsersListProps) {
  return (
    <>
      {!users.length && <EmptyListText>No followers yet</EmptyListText>}
      {!!users.length && (
        <ul>
          {users.map((user) => (
            <UsersListItem
              showFollowBtn={currentUser.id !== user.id}
              isFollowing={isFollowingUser(currentUser, user.id)}
              key={user.id}
              user={user}
            />
          ))}
        </ul>
      )}
    </>
  );
}

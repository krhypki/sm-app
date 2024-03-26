import UsersListItem from './UsersListItem';

export default function UsersList() {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, i) => (
        <UsersListItem key={i} />
      ))}
    </ul>
  );
}

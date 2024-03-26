import Avatar from '@/components/ui/avatar';
import Link from 'next/link';

const user = {
  id: 1,
  name: 'John Doe',
  email: '',
  avatar: '',
};

export default function UsersListItem() {
  return (
    <li className="border-b last-of-type:border-none border-slate-300 hover:bg-slate-400 hover:text-slate-100">
      <Link
        href={`/app/user/${user.id}`}
        className="flex items-center gap-x-6 p-3"
      >
        <Avatar src={user.avatar} alt={user.name} />
        <p>{user.name}</p>
      </Link>
    </li>
  );
}

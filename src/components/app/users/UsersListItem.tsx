import Avatar from '@/components/ui/avatar';
import { UserEssentials } from '@/lib/types';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import Link from 'next/link';
import FollowToggler from './follow-toggler';

type UserListitemProps = {
  user: UserEssentials;
  isFollowing: boolean;
  showFollowBtn: boolean;
};

export default function UsersListItem({
  user,
  isFollowing,
  showFollowBtn,
}: UserListitemProps) {
  const fullName = getUserFullname(user);

  return (
    <li className="border-b last-of-type:border-none border-slate-300 hover:bg-slate-200 ">
      <Link
        href={`/app/user/${user.id}`}
        className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4 p-3"
      >
        <Avatar src={user.avatar || ''} alt={fullName} />
        <p>{fullName}</p>

        {showFollowBtn && (
          <FollowToggler isFollowing={isFollowing} user={user.id} />
        )}
      </Link>
    </li>
  );
}

import Avatar from '@/components/ui/avatar';

export default function PostComment() {
  return (
    <li className="py-3">
      <div className="flex gap-x-3">
        <Avatar isSmall src="/" alt="/" />
        <div className="space-y-2">
          <span className="font-bold">John Doe</span>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, aut.
          </p>
        </div>
      </div>
    </li>
  );
}

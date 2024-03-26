'use client';

import Avatar from '@/components/ui/avatar';
import { HeartIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import PostCommentList from './PostCommentList';

const feed = {
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nobis tenetur maxime eum consequuntur saepe aliquam odio est tempora quidem!',
  user: {
    id: 1,
    name: 'John Doe',
    avatar: '',
  },
};

export default function FeedItem() {
  const [showComments, setShowcomments] = useState(false);

  return (
    <li className="border-b border-slate-300 last-of-type:border-none py-6 flex flex-col">
      <div className="flex gap-x-5">
        <Avatar src="/" alt="test" />

        <div className="flex flex-col">
          <div className="mb-10">
            <p className="text-base font-bold mb-4">{feed.user.name}</p>
            <p>{feed.content}</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button>
              <HeartIcon />
            </button>

            <button
              className="text-xs"
              onClick={() => setShowcomments(!showComments)}
            >
              Show comments
            </button>
          </div>

          <PostCommentList isOpen={showComments} />
        </div>
      </div>
    </li>
  );
}

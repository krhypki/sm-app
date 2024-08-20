'use client';

import { addNewComment } from '@/actions/post';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { PostWithRelations } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatDate';
import { getUserFullname } from '@/lib/utils/getUserFullname';
import { User } from '@prisma/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import FeedItemLikes from './FeedItemLikes';
import PostCommentList from './PostCommentList';

type FeedItemProps = {
  post: PostWithRelations;
  currentUserId: User['id'];
};

export default function FeedItem({ post, currentUserId }: FeedItemProps) {
  const [showComments, setShowcomments] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const addCommentForm = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!formData.get('content')) {
      setIsFormInvalid(true);
      return;
    }

    setIsFormInvalid(false);
    const response = await addNewComment(post.id, formData);

    if (response?.error) {
      setIsFormInvalid(true);
    } else {
      addCommentForm.current?.reset();
      setShowcomments(true);
    }
  };

  return (
    <li className="border-b border-slate-300 last-of-type:border-none py-6 flex flex-col">
      <div className="flex flex-col md:flex-row gap-x-5 gap-y-3">
        <Avatar src={post.author.avatar || ''} alt="test" />

        <div className="flex flex-col flex-1">
          <div className=" mb-10">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold mb-8">
                {getUserFullname(post.author)}
              </p>
              <time className="text-xs text-right">
                {formatDate(post.createdAt)}
              </time>
            </div>

            <Heading tag="h4" variant="h6">
              {post.title}
            </Heading>
            <p className="mb-6">{post.content}</p>

            {post.image && (
              <Image
                width={300}
                height={200}
                src={post.image}
                alt={`${post.title} post image`}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-x-3 gap-y-5 pt-4 border-t border-slate-200">
            <form
              ref={addCommentForm}
              className="flex items-center gap-3"
              action={handleSubmit}
            >
              <Input
                placeholder="Add new comment"
                name="content"
                invalid={isFormInvalid}
              />
              <Button type="submit">Add</Button>
            </form>
            <div className="flex w-full sm:w-auto justify-end items-center gap-3">
              <FeedItemLikes
                postId={post.id}
                totalLikes={post.likes?.length || 0}
                isLiked={post.likes?.includes(currentUserId) || false}
              />

              {!!post.comments.length && (
                <button
                  className="text-xs font-bold"
                  onClick={() => setShowcomments(!showComments)}
                >
                  {showComments ? 'Hide comments' : 'Show comments'}
                </button>
              )}
            </div>
          </div>

          <PostCommentList comments={post.comments} isOpen={showComments} />
        </div>
      </div>
    </li>
  );
}

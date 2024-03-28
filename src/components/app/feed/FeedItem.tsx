'use client';

import { addNewComment } from '@/actions/post';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useCurrentUserContext } from '@/hooks/contexts';
import { PostWithRelations } from '@/lib/types';
import { formatDate } from '@/lib/utils/format-date';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import { useRef, useState } from 'react';
import FeedItemLikes from './FeedItemLikes';
import PostCommentList from './PostCommentList';

type FeedItemProps = {
  post: PostWithRelations;
};

export default function FeedItem({ post }: FeedItemProps) {
  const currentUser = useCurrentUserContext();
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
      <div className="flex gap-x-5">
        <Avatar src={post.author.avatar || ''} alt="test" />

        <div className="flex flex-col flex-1">
          <div className=" mb-10">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold mb-4">
                {getUserFullname(post.author)}
              </p>
              <time className="text-xs">{formatDate(post.createdAt)}</time>
            </div>

            <p>{post.content}</p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
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
            <div className="flex items-center gap-3">
              <FeedItemLikes
                postId={post.id}
                totalLikes={post.likes?.length || 0}
                isLiked={post.likes?.includes(currentUser.id) || false}
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

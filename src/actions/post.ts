'use server';

import { INVALID_FORM_DATA_RESPONSE, POSTS_PER_PAGE } from '@/lib/constants';
import {
  createPost,
  createPostComment,
  findPosts,
  updatePostLikes,
} from '@/lib/db/post';
import { getCurrentUser } from '@/lib/db/user';
import { uploadImage } from '@/lib/utils/upload-image';
import {
  addPostSchema,
  postCommentSchema,
} from '@/lib/validators/post-schemas';
import { imageSchema } from '@/lib/validators/user-schemas';
import { Post, User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function addPost(formData: unknown, userId: User['id']) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const img = formData.get('file') as Blob;
  const postData = Object.fromEntries(formData.entries());

  if (img && img.size > 0) {
    const validatedImg = imageSchema.safeParse(img);

    if (!validatedImg.success) {
      return INVALID_FORM_DATA_RESPONSE;
    }

    const imageFormData = new FormData();
    imageFormData.append('file', validatedImg.data);
    const imageUrl = await uploadImage(imageFormData);
    postData.image = imageUrl.url;
  }

  const validatedPostData = addPostSchema.safeParse(postData);

  if (!validatedPostData.success) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  try {
    await createPost(validatedPostData.data, userId);
  } catch (error) {
    console.log(error);
    return {
      error: 'Something went wrong. Please try again.',
    };
  }
}

export async function getFollowedUsersPosts(count = POSTS_PER_PAGE) {
  const user = await getCurrentUser();

  try {
    const followedUsersIds = {
      in: [...user.followedUsers.map((followedUsers) => followedUsers.id)],
    };
    const [posts, postsCount] = await findPosts(followedUsersIds, count);
    const totalPages = Math.ceil(postsCount / POSTS_PER_PAGE);

    return [posts, totalPages] as const;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addNewComment(postId: Post['id'], formData: unknown) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const validatedContent = postCommentSchema.safeParse(formData.get('content'));

  if (!validatedContent.success) {
    return {
      error: 'Comment cannot be empty.',
    };
  }

  try {
    await createPostComment(postId, validatedContent.data);
    revalidatePath('/app/dashboard');
  } catch (error) {
    return {
      error: 'Something went wrong. Please try again.',
    };
  }
}

export async function togglePostLike(postId: Post['id']) {
  await updatePostLikes(postId);
  revalidatePath('/app', 'layout');
}

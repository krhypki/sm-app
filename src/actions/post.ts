'use server';

import { INVALID_FORM_DATA_RESPONSE } from '@/lib/constants';
import {
  createPostComment,
  findFollowedUsersPosts,
  updatePostLikes,
} from '@/lib/db/post';
import prisma from '@/lib/db/prisma';
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

  await prisma.post.create({
    data: {
      ...validatedPostData.data,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function getFollowedUsersPosts() {
  const user = await getCurrentUser();

  try {
    const posts = await findFollowedUsersPosts(user);
    return posts;
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

  revalidatePath('/app/dashboard');
}

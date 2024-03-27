'use server';

import { INVALID_FORM_DATA_RESPONSE } from '@/lib/constants';
import prisma from '@/lib/db/prisma';
import { uploadImage } from '@/lib/utils/upload-image';
import { addPostSchema } from '@/lib/validators/post-schemas';
import { imageSchema } from '@/lib/validators/user-schemas';
import { User } from '@prisma/client';

export async function addPost(formData: unknown, userId: User['id']) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const img = formData.get('file');
  const validatedImg = imageSchema.safeParse(img);

  if (!validatedImg.success) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const imageFormData = new FormData();
  imageFormData.append('file', validatedImg.data);
  const imageUrl = await uploadImage(imageFormData);

  const postData = Object.fromEntries(formData.entries());
  postData.image = imageUrl.url;

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

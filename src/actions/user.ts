'use server';

import { auth, signIn, signOut } from '@/lib/auth';
import { INVALID_FORM_DATA_RESPONSE } from '@/lib/constants';
import { findPosts } from '@/lib/db/post';
import {
  createUser,
  findFollowers,
  findOneByEmail,
  findOneById,
  updateFollowedUsers,
  updateUser,
} from '@/lib/db/user';
import { RelationActionType } from '@/lib/types';
import { getUserFromSession } from '@/lib/utils/get-user-from-session';
import { uploadImage } from '@/lib/utils/upload-image';
import {
  userSignupSchema,
  userUpdateSchenma,
} from '@/lib/validators/user-schemas';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export async function signup(formData: unknown) {
  const validatedUser = userSignupSchema.safeParse(formData);

  if (!validatedUser.success) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const { password, email } = validatedUser.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser({ ...validatedUser.data, password: hashedPassword });

    await signIn('credentials', {
      password,
      email,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    let errorMsg = 'Something went wrong, try again later.';
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        errorMsg = 'Email already exists';
      }
    }

    return {
      error: errorMsg,
    };
  }
}

export async function login(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      error: 'Invalid credentials',
    };
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}

export async function updateAvatar(formData: FormData) {
  if (!(formData instanceof FormData)) {
    return {
      error: 'Invalid form data',
    };
  }

  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Something went wrong, try again later.',
    };
  }

  const image = await uploadImage(formData);

  if (image.error) {
    return {
      error: image.error.message,
    };
  }

  try {
    await updateUser(session.user.email, { avatar: image.url });

    revalidatePath('/app/', 'layout');
  } catch (error) {
    return {
      error: 'Something went wrong, try again later.',
    };
  }
}

export async function updateUserData(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const userData = Object.fromEntries(formData.entries());
  const validatedData = userUpdateSchenma.safeParse(userData);

  if (!validatedData.success) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const sessionUser = await getUserFromSession();
  await updateUser(sessionUser.email, validatedData.data);

  revalidatePath('/app/', 'layout');
}

export async function updatePassword(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const sessionUser = await getUserFromSession();

  if (!sessionUser) {
    return {
      error: 'Something went wrong, try again later.',
    };
  }

  const userData = Object.fromEntries(formData.entries()) as Record<
    string,
    User['password']
  >;
  const { currentPassword, newPassword } = userData;

  const user = await findOneByEmail(sessionUser.email);

  if (!user) {
    return {
      error: 'User not found',
    };
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user?.password);

  if (!isPasswordValid) {
    return {
      error: 'Incorrect password',
    };
  }

  const newPasswordHashed = await bcrypt.hash(newPassword, 10);
  await updateUser(sessionUser.email, { password: newPasswordHashed });
}

export async function toggleFollow(
  followedId: User['id'],
  type: RelationActionType,
) {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Something went wrong, try again later.',
    };
  }

  await updateFollowedUsers(session.user.email, followedId, type);
  revalidatePath('/app/find-people');
}

export async function getUserProfile(id: User['id']) {
  if (!id) {
    redirect('/app/find-people');
  }

  try {
    const user = await findOneById(id);
    const [posts] = await findPosts(id);
    const followers = await findFollowers(id);

    return [user, posts, followers] as const;
  } catch (error) {
    redirect('/app/find-people');
  }
}

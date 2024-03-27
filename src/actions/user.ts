'use server';

import { auth, signIn } from '@/lib/auth';
import { INVALID_FORM_DATA_RESPONSE } from '@/lib/constants';
import prisma from '@/lib/db/prisma';
import { findOneByEmail, updateUser } from '@/lib/db/user';
import { uploadImage } from '@/lib/utils/upload-image';
import {
  userSignupSchema,
  userUpdateSchenma,
} from '@/lib/validators/user-schemas';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function createUser(formData: unknown) {
  const validatedUser = userSignupSchema.safeParse(formData);

  if (!validatedUser.success) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const { password, email } = validatedUser.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        ...validatedUser.data,
        password: hashedPassword,
      },
    });

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
    await prisma.user.update({
      where: {
        email: session?.user.email,
      },
      data: { avatar: image.url },
    });
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

  const session = await auth();
  await updateUser(session?.user.email, validatedData.data);
}

export async function updatePassword(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Something went wrong, try again later.',
    };
  }

  const userData = Object.fromEntries(formData.entries()) as Record<
    string,
    User['password']
  >;
  const { currentPassword, newPassword } = userData;

  const user = await findOneByEmail(session.user.email);

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
  await updateUser(session.user.email, { password: newPasswordHashed });
}

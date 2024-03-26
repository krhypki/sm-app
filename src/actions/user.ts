'use server';

import { signIn } from '@/lib/auth';
import { INVALID_FORM_DATA_RESPONSE } from '@/lib/constants';
import prisma from '@/lib/db/prisma';
import { userSignupSchema } from '@/lib/utils/validation-schemas';
import { Prisma } from '@prisma/client';
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

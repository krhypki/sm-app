import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import prisma from './prisma';

export async function findOneByEmail(email: User['email']) {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function updateUser(email: User['email'], data: Partial<User>) {
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = await findOneByEmail(session.user.email);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

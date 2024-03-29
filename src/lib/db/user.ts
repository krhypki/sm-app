'use server';

import { Prisma, User } from '@prisma/client';
import { POSTS_PER_PAGE, USERS_PER_PAGE } from '../constants';
import { RelationActionType } from '../types';
import { getUserFromSession } from '../utils/get-user-from-session';
import prisma from './prisma';

export async function findOneByEmail(email: User['email']) {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      posts: true,
      followedUsers: true,
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
  const sessionUser = await getUserFromSession();
  const user = await findOneByEmail(sessionUser.email);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function getUsersPerPage(page: number, query: string) {
  const currentUser = await getCurrentUser();
  const dbQuery = query
    ? {
        where: {
          OR: [
            {
              firstName: {
                contains: query,
              },
            },
            {
              lastName: {
                contains: query,
              },
            },
            {
              AND: [
                { firstName: { contains: query.split(' ')[0] } },
                { lastName: { contains: query.split(' ')[1] } },
              ],
            },
          ],
          NOT: [
            {
              id: currentUser.id,
            },
          ],
        },
      }
    : {
        where: {
          NOT: [
            {
              id: currentUser.id,
            },
          ],
        },
      };

  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: dbQuery.where,
      take: USERS_PER_PAGE,
      skip: (page - 1) * USERS_PER_PAGE,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    }),
    prisma.user.count({
      where: dbQuery.where,
    }),
  ]);

  const totalPages = Math.round(count / USERS_PER_PAGE);

  return { totalPages, users };
}

export async function getUsers(
  query: Prisma.UserFindManyArgs = {},
  select = {},
) {
  const users = await prisma.user.findMany({
    where: query?.where || {},
    select,
  });

  return users;
}

export async function findOneById(id: User['id']) {
  if (!id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function findOneByIdWithPosts(id: User['id']) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: {
        take: POSTS_PER_PAGE,
        include: {
          author: true,
          likes: {
            select: {
              id: true,
            },
          },
          comments: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  const currentUser = await getCurrentUser();
  return user;
}

export async function updateFollowedUsers(
  email: User['email'],
  followedId: User['email'],
  type: RelationActionType,
) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      followedUsers: {
        [type]: {
          id: followedId,
        },
      },
    },
  });
}

export async function findFollowers(id: User['id']) {
  const followers = await prisma.user.findMany({
    where: {
      followedUsers: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    },
  });

  return followers;
}

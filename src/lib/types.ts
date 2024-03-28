import { Prisma, User } from '@prisma/client';
import { ButtonHTMLAttributes } from 'react';

export type PaginationDirection = 'previous' | 'next';
export type AuthActionType = 'login' | 'signup';
export type AccountView = 'profile' | 'settings';
export type ImageUploadVariant = 'avatar' | 'image';
export type RelationActionType = 'connect' | 'disconnect';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
};

export type UserEssentials = Pick<
  User,
  'firstName' | 'lastName' | 'id' | 'avatar'
>;

const user = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { posts: true, followedUsers: true },
});

const userBaseData = {
  id: true,
  avatar: true,
  lastName: true,
  firstName: true,
};
const post = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    comments: {
      include: {
        author: {
          select: userBaseData,
        },
      },
    },
    author: {
      select: userBaseData,
    },
  },
});

const comment = Prisma.validator<Prisma.PostCommentDefaultArgs>()({
  include: {
    author: {
      select: userBaseData,
    },
  },
});

export type UserWithRelations = Prisma.UserGetPayload<typeof user>;
export type PostWithRelations = Prisma.PostGetPayload<typeof post> & {
  likes?: string[];
};
export type CommentWithRelations = Prisma.PostCommentGetPayload<typeof comment>;

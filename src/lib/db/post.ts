import { Post } from '@prisma/client';
import { UserWithRelations } from '../types';
import prisma from './prisma';
import { getCurrentUser } from './user';

export async function createPostComment(postId: Post['id'], content: string) {
  const user = await getCurrentUser();

  const comments = await prisma.postComment.create({
    data: {
      content,
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return comments;
}

export async function findFollowedUsersPosts(
  users: UserWithRelations,
  amount = 10,
) {
  let [posts, count] = await prisma.$transaction([
    prisma.post.findMany({
      where: {
        authorId: {
          in: [...users.followedUsers.map((user) => user.id)],
        },
      },
      take: amount,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            id: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        comments: {
          take: 10,
          include: {
            author: {
              select: {
                avatar: true,
                createdAt: true,
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count({
      where: {
        authorId: {
          in: [...users.followedUsers.map((user) => user.id)],
        },
      },
    }),
  ]);

  let postsWithMapLikes = posts.map((post) => {
    return { ...post, likes: post.likes.map((like) => like.id) };
  });

  return [postsWithMapLikes, count] as const;
}

export async function updatePostLikes(postId: Post['id']) {
  const user = await getCurrentUser();
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      likes: true,
    },
  });

  if (!post) {
    return {
      error: 'Post not found',
    };
  }

  const isLiked = post.likes.some((like) => like.id === user.id);
  const actionType = isLiked ? 'disconnect' : 'connect';

  await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        [actionType]: [{ id: user.id }],
      },
    },
    include: {
      likes: {
        select: {
          id: true,
        },
      },
    },
  });
}

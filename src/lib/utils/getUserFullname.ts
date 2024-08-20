import { User } from '@prisma/client';
import { UserEssentials } from '../types';

export function getUserFullname(user: User | UserEssentials) {
  return `${user.firstName} ${user.lastName}`;
}

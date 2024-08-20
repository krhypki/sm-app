import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../constants';

export const userUpdateSchenma = z.object({
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .optional(),
  firstName: z
    .string()
    .min(1, { message: 'First name must cannot be empty' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must cannot be empty' })
    .optional(),
  avatar: z.string().nullable().optional(),
  description: z.string().max(200).nullable().optional(),
});

export const userSignupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  firstName: z.string().min(1, { message: 'First name must cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name must cannot be empty' }),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const imageSchema = z
  .any()
  .refine((files) => files?.size <= MAX_FILE_SIZE, 'Max image size is 300kb')
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
    'Invalid image type',
  );

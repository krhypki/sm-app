import { z } from 'zod';

export const userSignupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  firstName: z.string().min(1, { message: 'First name must cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name must cannot be empty' }),
  avatar: z
    .union([
      z.literal(''),
      z.string().trim().url({ message: 'Image url must be a valid url' }),
    ])
    .optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

import { z } from 'zod';

export const addPostSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(300),
  image: z.string().optional(),
});

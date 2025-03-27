import { z } from 'zod';
import { userSchema } from '../../../entities/user/model/schema';

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupFormSchema = loginFormSchema.extend({
  name: z.string(),
});


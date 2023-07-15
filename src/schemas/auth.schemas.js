import { z } from 'zod';

export const registerSchema = z.object({
   username: z
      .string({
         required_error: 'Username is require.',
      })
      .nonempty(),
   email: z
      .string({
         required_error: 'Email is require.',
      })
      .email({
         message: 'Invalid email.',
      })
      .nonempty(),
   password: z
      .string({ required_error: 'Password is require.' })
      .min(6, {
         message: 'Password must be at least 6 characters.',
      })
      .nonempty(),
});

export const loginSchema = z.object({
   email: z
      .string({
         required_error: 'Email is require.',
      })
      .email({
         message: 'Email invalid.',
      }),
   password: z
      .string({
         required_error: 'Password is require',
      })
      .min(6, {
         message: 'Password must be at least 6 characters.',
      }),
});

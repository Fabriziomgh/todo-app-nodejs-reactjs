import { z } from 'zod';

export const tasksSchema = z.object({
   title: z
      .string({
         required_error: 'Title is require.',
      })
      .nonempty({ message: 'Title is require.' }),
   description: z.string({
      required_error: 'Description must be a string.',
   }),
   date: z.string().datetime().optional(),
});

import { z } from 'zod';

export const CreateTaskForm = z.object({
  title: z.string().min(5, { message: 'Title is required' }),
  description: z.string(),
});

export type CreateTaskFormSchema = z.infer<typeof CreateTaskForm>;

export const createTaskFormDefaultValues: CreateTaskFormSchema = {
  title: '',
  description: '',
};

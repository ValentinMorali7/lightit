import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  avatar: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  description: z.string().max(1000).optional(),
  website: z
    .string()
    .url('Please enter a valid URL')
    .or(z.string().length(0))
    .optional(),
});

export type PatientFormSchema = z.infer<typeof patientSchema>;
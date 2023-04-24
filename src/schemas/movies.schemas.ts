import { z } from "zod";

export const movieSchema = z.object({
  id: z.number().int(),
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number().int(),
});

export const movieCreateSchema = movieSchema.omit({
  id: true,
});

export const movieUpdateSchema = movieCreateSchema.partial();

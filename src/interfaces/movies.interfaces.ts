import { z } from "zod";
import {
  movieCreateSchema,
  movieSchema,
  movieUpdateSchema,
} from "../schemas/movies.schemas";

export type TMovie = z.infer<typeof movieSchema>;

export type TMovieCreate = z.infer<typeof movieCreateSchema>;

export type TMovieUpdate = z.infer<typeof movieUpdateSchema>;

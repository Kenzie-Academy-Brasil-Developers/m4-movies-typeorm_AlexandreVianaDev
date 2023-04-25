import { z } from "zod";
import {
  movieCreateSchema,
  movieSchema,
  movieUpdateSchema,
} from "../schemas/movies.schemas";

export type TMovie = z.infer<typeof movieSchema>;

export type TMovieCreate = z.infer<typeof movieCreateSchema>;

export type TMovieUpdate = z.infer<typeof movieUpdateSchema>;

export type TMovieListResponse = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMovie[];
};

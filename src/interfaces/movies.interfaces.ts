import { z } from "zod";
import { movieCreateSchema, movieSchema } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

export type TMovie = z.infer<typeof movieSchema>;

export type TMovieCreate = z.infer<typeof movieCreateSchema>;

export type TMovieUpdate = DeepPartial<TMovieCreate>;

export type TMovieListResponse = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMovie[];
};

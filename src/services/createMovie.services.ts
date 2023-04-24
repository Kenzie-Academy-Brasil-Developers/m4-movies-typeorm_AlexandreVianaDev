import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { TMovieCreate } from "../interfaces/movies.interfaces";

export const createMovieService = async (
  payload: TMovieCreate
): Promise<Movie> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepo.create(payload);

  await movieRepo.save(movie);

  return movie;
};

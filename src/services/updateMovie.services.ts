import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { TMovieUpdate } from "../interfaces/movies.interfaces";

export const updateMovieService = async (
  payload: TMovieUpdate,
  idParams: number
): Promise<Movie> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieFind: Movie | null = await movieRepo.findOne({
    where: {
      id: idParams,
    },
  });

  const movieUpdated: Movie = movieRepo.create({
    ...movieFind!,
    ...payload,
  });

  await movieRepo.save(movieUpdated);

  return movieUpdated;
};

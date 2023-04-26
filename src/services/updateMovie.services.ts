import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { TMovie, TMovieUpdate } from "../interfaces/movies.interfaces";
import { AppError } from "../error";

export const updateMovieService = async (
  payload: TMovie,
  idParams: number
): Promise<TMovie> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieFind: TMovie | null = await movieRepo.findOne({
    where: {
      id: idParams,
    },
  });

  const movieUpdated: TMovie = {
    ...movieFind!,
    ...payload,
  };
  await movieRepo.save(movieUpdated);

  //   await movieRepo.save({
  //     id: idParams,
  //     ...payload,
  //   });

  return movieUpdated;
};

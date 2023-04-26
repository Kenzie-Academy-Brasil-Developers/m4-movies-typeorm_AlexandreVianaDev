import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";

export const deleteMovieService = async (idParams: number): Promise<void> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepo.findOne({
    where: {
      id: idParams,
    },
  });

  await movieRepo.remove(movie!);
};

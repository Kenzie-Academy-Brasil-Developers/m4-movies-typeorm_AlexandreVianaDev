import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

export const listMoviesService = async (): Promise<Movie[]> => {
  const userRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  return await userRepo.find();
};

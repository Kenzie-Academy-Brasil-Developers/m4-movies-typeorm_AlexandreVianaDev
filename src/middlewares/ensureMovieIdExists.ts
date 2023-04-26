import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

export const ensureMovieIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idParams: number = parseInt(req.params.id);

  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movies: Movie | null = await moviesRepo.findOne({
    where: {
      id: idParams,
    },
  });

  if (!movies) {
    throw new AppError("Movie not found", 404);
  }

  res.locals.id = idParams;

  return next();
};

import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

export const ensureNameNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const nameBody: string = req.body.name;

  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await moviesRepo.findOne({
    where: {
      name: nameBody,
    },
  });

  if (movie && nameBody) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

import { Request, Response } from "express";
import { Movie } from "../entities";
import { listMoviesService } from "../services/listMovies.services";

export const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies: Movie[] = await listMoviesService();
  return res.status(200).json(movies);
};

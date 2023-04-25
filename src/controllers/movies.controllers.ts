import { Request, Response } from "express";
import { createMovieService } from "../services/createMovie.services";
import { Movie } from "../entities";
import { listMoviesService } from "../services/listMovies.services";

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie: Movie = await createMovieService(req.body);
  return res.status(201).json(movie);
};

export const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies: Movie[] = await listMoviesService();
  return res.status(200).json(movies);
};

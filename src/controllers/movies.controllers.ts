import { Request, Response } from "express";
import { createMovieService } from "../services/createMovie.services";
import { Movie } from "../entities";
import { listMoviesService } from "../services/listMovies.services";
import { TMovie, TMovieListResponse } from "../interfaces/movies.interfaces";
import { updateMovieService } from "../services/updateMovie.services";
import { deleteMovieService } from "../services/deleteMovie.services";

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
  const pageQuery: any = Number(req.query.page) || 1;
  const perPageQuery: any = Number(req.query.perPage) || 5;
  const sortQuery: any = req.query.sort || "id";
  const orderQuery: any = req.query.order || "asc";
  const url = `${req.protocol}://${req.hostname}${req.originalUrl}`;

  console.log(url)

  const movies: TMovieListResponse = await listMoviesService(
    pageQuery,
    perPageQuery,
    sortQuery,
    orderQuery,
    url
  );

  return res.status(200).json(movies);
};

export const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id
  const movie: TMovie = await updateMovieService(req.body, id);
  return res.status(200).json(movie);
};

export const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id
  await deleteMovieService(id);
  return res.status(204).send();
};
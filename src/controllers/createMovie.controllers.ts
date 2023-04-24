import { Request, Response } from "express";
import { createMovieService } from "../services/createMovie.services";
import { Movie } from "../entities";

export const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movie: Movie = await createMovieService(req.body);
    return res.status(201).json(movie);
  };
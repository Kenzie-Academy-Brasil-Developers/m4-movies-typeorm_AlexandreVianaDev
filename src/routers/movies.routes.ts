import { Router } from "express";
import { movieCreateSchema } from "../schemas/movies.schemas";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  createMovieController,
  listMoviesController,
} from "../controllers/movies.controllers";

export const moviesRoutes: Router = Router();

moviesRoutes.post("", validateBody(movieCreateSchema), createMovieController);
moviesRoutes.get("", listMoviesController);
moviesRoutes.patch("/:id");
moviesRoutes.delete("/:id");

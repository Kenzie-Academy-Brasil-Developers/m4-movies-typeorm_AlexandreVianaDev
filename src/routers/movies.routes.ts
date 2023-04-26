import { Router } from "express";
import {
  movieCreateSchema,
  movieUpdateSchema,
} from "../schemas/movies.schemas";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import { ensureNameNotExists } from "../middlewares/ensureNameNotExists.middleware";
import { ensureMovieIdExists } from "../middlewares/ensureMovieIdExists";

export const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  validateBody(movieCreateSchema),
  ensureNameNotExists,
  createMovieController
);
moviesRoutes.get("", listMoviesController);
moviesRoutes.patch(
  "/:id",
  validateBody(movieUpdateSchema),
  ensureNameNotExists,
  ensureMovieIdExists,
  updateMovieController
);
moviesRoutes.delete("/:id", ensureMovieIdExists, deleteMovieController);

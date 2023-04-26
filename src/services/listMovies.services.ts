import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieListResponse } from "../interfaces/movies.interfaces";
import "dotenv/config";

export const listMoviesService = async (
  pageQuery: number,
  perPageQuery: number,
  sortQuery: string,
  orderQuery: string
): Promise<TMovieListResponse> => {
  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const PORT = process.env.PORT || 3000;

  let movies: Movie[] = [];

  const allMovies: Movie[] = await moviesRepo.find();

  if (perPageQuery < 0 || perPageQuery > 5) {
    perPageQuery = 5;
  }

  if (pageQuery <= 0) {
    pageQuery = 1;
  }

  let urlPrevPage = null;
  let urlNextPage = null;

  if (pageQuery !== 1) {
    urlPrevPage = `http://localhost:${PORT}/movies?page=${
      pageQuery - 1
    }&perPage=${perPageQuery}`;
  }

  if (allMovies.length / perPageQuery > pageQuery) {
    urlNextPage = `http://localhost:${PORT}/movies?page=${
      pageQuery + 1
    }&perPage=${perPageQuery}`;
  }

  let orderObj = {};

  if (sortQuery === "id") {
    orderObj = {
      id: orderQuery,
    };
  }

  if (sortQuery === "price") {
    orderObj = {
      price: orderQuery,
    };
  }

  if (sortQuery === "duration") {
    orderObj = {
      duration: orderQuery,
    };
  }

  if (pageQuery || perPageQuery) {
    movies = await moviesRepo.find({
      skip: (pageQuery - 1) * perPageQuery,
      take: perPageQuery,
      order: orderObj,
    });
  }

  if (!pageQuery || !perPageQuery) {
    movies = allMovies;
  }

  const response = {
    prevPage: urlPrevPage,
    nextPage: urlNextPage,
    count: allMovies.length,
    data: movies,
  };

  return response;
};

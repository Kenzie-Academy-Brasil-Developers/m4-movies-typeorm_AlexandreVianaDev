import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieListResponse } from "../interfaces/movies.interfaces";
import "dotenv/config";
import { PORT } from "../server";

export const listMoviesService = async (
  pageQuery: any,
  perPageQuery: any,
  sortQuery: any,
  orderQuery: any,
  url: string
): Promise<TMovieListResponse> => {
  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  // console.log(pageQuery, perPageQuery, sortQuery, orderQuery);

  if (perPageQuery < 0 || perPageQuery > 5) {
    perPageQuery = 5;
  }

  if (pageQuery <= 0) {
    pageQuery = 1;
  }

  let movies: Movie[] = [];

  const allMovies: Movie[] = await moviesRepo.find();

  if (sortQuery === "id") {
    movies = await moviesRepo.find({
      order: { id: orderQuery },
      skip: (pageQuery - 1) * perPageQuery,
      take: perPageQuery,
    });
  }

  if (sortQuery === "price") {
    movies = await moviesRepo.find({
      order: { price: orderQuery },
      skip: (pageQuery - 1) * perPageQuery,
      take: perPageQuery,
    });
  }

  if (sortQuery === "duration") {
    movies = await moviesRepo.find({
      order: { duration: orderQuery },
      skip: (pageQuery - 1) * perPageQuery,
      take: perPageQuery,
    });
  }

  let urlPrevPage = null;
  let urlNextPage = null;

  // console.log("PAGINATION", pageQuery, perPageQuery);
  // console.log("cALCULO", movies.length / perPageQuery);

  if (pageQuery !== 1) {
    urlPrevPage = `https://localhost:${PORT}/movies/?page=${
      pageQuery - 1
    }&perPage=${perPageQuery}&sort=${sortQuery}&order=${orderQuery}`;
  }

  if (allMovies.length / perPageQuery > pageQuery) {
    urlNextPage = `https://localhost:${PORT}/movies/?page=${
      pageQuery + 1
    }&perPage=${perPageQuery}&sort=${sortQuery}&order=${orderQuery}`;
  }

  const response = {
    prevPage: urlPrevPage,
    nextPage: urlNextPage,
    count: allMovies.length,
    data: movies,
  };

  return response;
};

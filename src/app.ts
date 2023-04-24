import express, { Application } from "express";
import { moviesRoutes } from "./routers/movies.routes";

export const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes);
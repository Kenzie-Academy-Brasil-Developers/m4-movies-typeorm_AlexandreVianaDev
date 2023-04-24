import express, { Application } from "express";
import { moviesRoutes } from "./routers/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes);

export default app;

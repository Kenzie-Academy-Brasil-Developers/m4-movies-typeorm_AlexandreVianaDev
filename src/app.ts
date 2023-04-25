import express, { Application } from "express";
import { moviesRoutes } from "./routers/movies.routes";
import { errorHandler } from "./middlewares/errorHandle.middleware";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes);

app.use(errorHandler);

export default app;

import { AppDataSource } from "./data-source";
import app from "./app";
import "dotenv/config";

export const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected.");

    app.listen(PORT, () => {
      console.log(`App is running on https://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));

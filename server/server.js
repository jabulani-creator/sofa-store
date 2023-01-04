import express from "express";
import "express-async-errors";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";

import morgan from "morgan";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

import productRoute from "./routes/ProductRoute.js";
import authRoute from "./routes/userRoute.js";
//ROUTES
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="api/v1/products>product route</a>`);
});

app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();

import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, MongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

//Declare a variable
const app = express();

app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Azlan Tutorials");
});

// Import the book route model

app.use("/books", booksRoute);

// Connecting to MongoDB
mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:  ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

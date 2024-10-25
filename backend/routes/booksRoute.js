import express from "express";
const router = express.Router();
import { Book } from "../models/bookModel.js";

// Route for save a new Book
router.post("/", async (request, response) => {
  try {
    // Check if all required fields (title, author, publishYear) are present in the request
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // If any field is missing, send a 400 (Bad Request) response with an error message
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Create a new book object using the data from the request
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Save the new book to the database (using the Book model)
    const book = await Book.create(newBook);

    // Send back the created book as a response with a 201 (Created) status
    return response.status(201).send(book);
  } catch (error) {
    // If there's an error, log it and send a 500 (Server Error) response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (request, response) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find({});

    // Send back a response with the list of books and the total count of books
    return response.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    // If there's an error, log it and send a 500 (Server Error) response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id

router.get("/:id", async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Find the book by its ID in the database
    const book = await Book.findById(id);

    // If no book is found, send a 404 (Not Found) response
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Send back the found book with a 200 (OK) status
    return response.status(200).json(book);
  } catch (error) {
    // If there's an error, log it and send a 500 (Server Error) response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (request, response) => {
  try {
    // Check if all required fields (title, author, publishYear) are present in the request
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Create an object with the updated data
    const updatedBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Find the book by ID and update it with the new data
    const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    // If the book isn't found, return a 404 (Not Found) error
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Send back the updated book
    return response.status(200).json(result);
  } catch (error) {
    // If there's an error, log it and send a 500 (Server Error) response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a book

router.delete("/:id", async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Find the book by its ID and delete it
    const result = await Book.findByIdAndDelete(id);

    // If no book is found, send a 404 (Not Found) response
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    // If the book is successfully deleted, send a success message
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    // If there's an error, log it and send a 500 (Server Error) response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

const express = require("express");
const bookModel = require("./models/userBookModel");
const app = express();

// Get all books in the database
app.get("/myBooks", async (req, res) => {
  const books = await bookModel.find({});

  try {
    // console.log(books.length);
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;

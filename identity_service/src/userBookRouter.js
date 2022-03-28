const express = require("express");
const {UserBook} = require("./models/userModel");
const bookModel = {UserBook};
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

// Mark a book as read, find by book id
app.patch("/read", async (req, res) => {
  var query = { b_id: req.body.b_id };

  bookModel.findOneAndUpdate(
    query,
    {
      read: true,
    },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Read status updated");
      res.send("Successfully updated");
    }
  );
});

module.exports = app;

const express = require("express");
const userBookModel = require("./models/userBookModel");
const app = express();

// Get all books in the database
app.get("/getUserBooks", async (req, res) => {
  const books = await userBookModel.find({});

  try {
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Mark a book as read, find by book id
app.patch("/markasread", async (req, res) => {
  var query = { bookid: req.body.b_id };

  userBookModel.findOneAndUpdate(
    query,
    {
      read: true,
    },
    { upsert: false },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Read status updated");
      res.send("Read status updated");
    }
  );
});

module.exports = app;

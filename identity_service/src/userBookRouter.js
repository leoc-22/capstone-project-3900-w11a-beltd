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
  let query = { bookid: req.body.b_id };

  userBookModel.findOneAndUpdate(
    query,
    {
      read: true,
    },
    { upsert: false },
    (err) => {
      if (err) return res.sendStatus(500);
      console.log("Read status updated");
      res.send("Read status updated");
    }
  );
});

app.get("/numofpeoplehasread/:bookid", async (req, res) => {
  console.log(req.params.bookid);
  await userBookModel
    .find({ bookid: req.params.bookid, read: true })
    .then((books) => {
      console.log(`${books.length} people have read this book`);
      // have to send it as string otherwise http treats numbers as status code
      res.send(books.length.toString());
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = app;

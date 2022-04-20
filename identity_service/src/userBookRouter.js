const express = require("express");
const userBookModel = require("./models/userBookModel");
const collectionModel = require("./models/collectionModel");
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
  let collections = await collectionModel.find({
    creator: req.body.username,
    books: req.body.b_id,
  });

  if (!collections.length) return;

  for (let i = 0; i < collections.length; i++) {
    let query = { bookid: req.body.b_id, userCollection: collections[i]._id };
    await userBookModel
      .updateMany(
        query,
        {
          read: true,
        },
        { upsert: false }
      )
      .clone()
      .catch((err) => {
        if (err) return res.sendStatus(500);
        console.log("Read status updated");
        res.sendStatus(200);
      });
  }
});

app.get("/numoftimesread/:bookid", async (req, res) => {
  await userBookModel
    .find({ bookid: req.params.bookid, read: true })
    .then((books) => {
      // have to send it as string otherwise http treats numbers as status code
      res.send(books.length.toString());
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = app;

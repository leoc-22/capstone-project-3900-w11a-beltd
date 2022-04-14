const express = require("express");
const collectionModel = require("./models/collectionModel");
const userModel = require("./models/userModel");
const userBookModel = require("./models/userBookModel");

const app = express();

// 1. Get all PUBLIC collections for user homepage
app.get("/collections", async (req, res) => {
  const collection = await collectionModel.find({ public: true });

  try {
    res.send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 2. Get all USER OWNED collections by user id
app.get("/myCollections", async (req) => {
  await collectionModel
    .find({ user: req.body.user }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

// 3. Create a new collection
app.post("/collection", async (req, res) => {
  // Create collection
  const collection = new collectionModel({
    user: req.body.user,
    name: req.body.name,
    public: req.body.public,
  });

  try {
    await collection.save();
    res.send(collection);
    console.log("Collection created");
  } catch (error) {
    res.status(500).send(error);
  }

  // Link up with users model
  const _id = req.body.user;
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id },
    { $push: { collections: collection._id } },
    { new: true }
  );
  console.log(updatedUser);
});

// TODO Can probably combine two endpoints below??
// 4. Mark a collection as PRIVATE post creation
app.patch("/collectionPriv", async (req, res) => {
  var query = { _id: req.body._id }; // collection id

  collectionModel.findOneAndUpdate(
    query,
    {
      public: false,
    },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Collection now private");
      res.send("Successfully updated.");
    }
  );
});

// 5. Mark a collection as PUBLIC post creation
app.patch("/collectionPub", async (req, res) => {
  var query = { _id: req.body._id }; // collection id

  collectionModel.findOneAndUpdate(
    query,
    {
      public: true,
    },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Collection now public");
      res.send("Successfully updated.");
    }
  );
});

// Get all books in a collection
app.get("/collectionBooks", async (req) => {
  await collectionModel
    .find({ _id: req.body._id }, { books: 1 }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

// Add a book to a collection
app.post("/addBook", async (req, res) => {
  // 1. Create new userbook
  const userBook = new userBookModel({
    bookid: req.body.bookid,
    read: false,
  });
  try {
    await userBook.save();
    res.send(userBook);
    console.log("Userbook created");
  } catch (error) {
    res.status(500).send(error);
  }

  // Save collection id from request body
  let _id = req.body._id;

  // 2. Add book to user collection
  const updatedCollection = await collectionModel.findByIdAndUpdate(
    { _id },
    { $push: { books: userBook._id } },
    { new: true }
  );
  console.log(updatedCollection);
  console.log("Added book to collection");
});

// Remove a book from a collection
app.delete("/removeBook", async (req, res) => {
  // Remove from user books model
  const updatedUserBooks = await userBookModel.remove({ _id: req.body.b_id });
  try {
    res.send(updatedUserBooks);
  } catch (error) {
    res.status(500).send(error);
  }

  // Remove from collections
  let _id = req.body.c_id; // collection id
  const collection = await collectionModel.findByIdAndUpdate(
    { _id },
    { $pull: { books: req.body.b_id } },
    { new: true }
  );
  console.log(collection);
});

// TODO Move book to "Read" collection
app.patch("/readBook", async (req) => {
  const readCollection = await collectionModel
    .find({ user: req.body.user }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    })
    .find({ name: "Read" });

  const _id = readCollection._id;
  const updatedReadCollection = await collectionModel.findByIdAndUpdate(
    { _id },
    { $push: { books: req.body.book } },
    { new: true }
  );

  console.log(updatedReadCollection);
});

// Remove a collection
app.delete("/collection", async (req, res) => {
  var query = { _id: req.body.c_id };

  collectionModel.findOneAndRemove(query, (err) => {
    if (err) return res.send(500, { error: err });
    console.log("Collection deleted");
    res.send("Successfully deleted");
  });
});

module.exports = app;

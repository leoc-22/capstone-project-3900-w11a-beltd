const express = require("express");
const collectionModel = require("./models/collectionModel");
const userModel = require("./models/userModel");
const bookModel = require("./models/userBookModel");

const app = express();

// 1. Get all PUBLIC collections for user homepage TODO TEST
app.get("/collections", async (req, res) => {
  const collections = await collectionModel.find({ public: true }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
});
 

// 2. Get all USER OWNED collections by user id TODO TEST
app.get("/myCollections", async (req, res) => {
  const collections = await collectionModel.find({ user: req.body.user }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  }).clone().catch(function(err){ console.log(err)});
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
    {_id},
    { $push: { "collections": collection._id } },
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
      public: false
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
      public: true
    },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Collection now public");
      res.send("Successfully updated.");
    }
  );
});

// TODO Get all books in a collection

// TODO Add a book to a collection (take in b_id + c_id) NOT SURE THSI WORKS
app.patch("/addBook", async (req, res) => {
  let _id = req.body._id;

  // Add book to collection
  const updatedCollection = await collectionModel.findByIdAndUpdate(
    {_id},
    { $push: { "books": req.body.book } },
    { new: true }
  );
  console.log(updatedCollection);

  // Add collection to book
  _id = req.body.book;
  const updatedBook = bookModel.findByIdAndUpdate(
    {_id},
    { $push: { "collections": req.body.id } },
    { new: true }
  );
  console.log(updatedBook);
});

// TODO Remove a book from a collection (take in b_id + c_id)

// TODO Move book to "Read" collection

// TODO Remove a collection??

module.exports = app;

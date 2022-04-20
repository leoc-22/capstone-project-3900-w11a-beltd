const express = require("express");
const collectionModel = require("./models/collectionModel");
const userModel = require("./models/userModel");
const userBookModel = require("./models/userBookModel");
const app = express();
const axios = require("axios");

// 1. Get all PUBLIC collections for user homepage
app.get("/collections", async (req, res) => {
  const collection = await collectionModel.find({ public: true });

  try {
    res.send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 2. Get all collections
app.get("/myCollections", async (req, res) => {
  const collection = await collectionModel
    .find({ user: req.body.user }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    })
    .clone();
  res.send(collection);
});

// 3. Create a new collection
app.post("/collection", async (req, res) => {
  // Create collection
  const collection = new collectionModel({
    name: req.body.name,
    public: req.body.public,
    creator: req.body.creator,
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
  await userModel.findByIdAndUpdate(
    { _id },
    { $push: { collections: collection._id } },
    { new: true }
  );
});

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

// Get book details in a collection
app.get("/collectionBooks", async (req, res) => {
  let bookList = [];
  let collections = await collectionModel.find({ _id: req.body.c_id });

  for (let i = 0; i < collections[0].books.length; i++) {
    await axios
      .get(`http://localhost:8002/book/${collections[0].books[i].toString()}`)
      .then((res) => {
        bookList.push(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  res.send(bookList);
});

// Get recommendation based on the authors in a collection
app.get("/recommendbyauthors/:creatorName", async (req, res) => {
  let bookList = [];
  let collections = await collectionModel.find({
    creator: req.params.creatorName,
  });

  for (let j = 0; j < collections.length; j++) {
    for (let i = 0; i < collections[j].books.length; i++) {
      await axios
        .get(`http://localhost:8002/book/${collections[j].books[i].toString()}`)
        .then((res) => {
          bookList.push(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  let recommendations = [];
  for (let i = 0; i < bookList.length; i++) {
    await axios
      .get("http://localhost:8002/getbooksbyauthor", {
        params: { author: bookList[i].authors },
      })
      .then((res) => {
        recommendations = recommendations.concat(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  res.send(recommendations);
});

// Get recommendation based on the genres in a collection
app.get("/recommendbygenres/:creatorName", async (req, res) => {
  let bookList = [];
  let collections = await collectionModel.find({
    creator: req.params.creatorName,
  });
  for (let j = 0; j < collections.length; j++) {
    for (let i = 0; i < collections[j].books.length; i++) {
      await axios
        .get(`http://localhost:8002/book/${collections[j].books[i].toString()}`)
        .then((res) => {
          bookList.push(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  let recommendations = [];
  for (let i = 0; i < bookList.length; i++) {
    await axios
      .get(`http://localhost:8002/similar/${bookList[i].categories[0].id}`)
      .then((res) => {
        recommendations = recommendations.concat(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  res.send(recommendations);
});

// Add a book to a collection
app.post("/addBook", async (req, res) => {
  // Save collection id from request body
  let _id = req.body._id;

  // Create new userbook
  await new userBookModel({
    bookid: req.body.bookid,
    read: false,
    userCollection: _id,
  }).save();

  // Add book to user collection
  await collectionModel.findByIdAndUpdate(
    { _id },
    { $push: { books: req.body.bookid } },
    { new: true }
  );
  res.send("Successfully added a book to collection");
  console.log("added a book to collection");
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

app.patch("/readBook", async (req, res) => {
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

  res.send(updatedReadCollection);
});

// get number of collections a book is in
app.get("/numofcolle/:bookid", async (req, res) => {
  console.log(req.params.bookid);
  await collectionModel
    .find({ books: req.params.bookid })
    .then((collections) => {
      // have to send it as string otherwise http treats numbers as status code
      res.send(collections.length.toString());
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
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

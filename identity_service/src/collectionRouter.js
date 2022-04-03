const express = require("express");
const collectionModel = require("./models/collectionModel");
const userModel = require("./models/userModel");

const app = express();

// Get all collections for user
app.get("/myCollections", async (req, res) => {
  const collections = await collectionModel.find({});

  try {
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new collection
app.post("/collection", async (req, res) => {
  // Create collection
  const collection = new collectionModel({
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


// Add book to collection (add by id)

// Remove book from collection


// TODO Can probably combine two endpoints below??
// Mark a collection as private post creation
app.patch("/collectionPriv", async (req, res) => {
  var query = { _id: req.body._id } // collection id

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

// Mark a collection as public post creation
app.patch("/collectionPub", async (req, res) => {
  var query = { _id: req.body._id } // collection id

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

module.exports = app;

const express = require("express");
const reviewModel = require("./models/reviewModel");
const userModel = require("./models/userModel");
//const bookModel = require("./models/userBookModel");

const app = express();

// 1. Get all USER OWNED reviews by user id 
app.get("/myReviews", async (req, res) => {
  const reviews = await reviewModel.find({ user: req.body.user }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  }).clone().catch(function(err){ console.log(err)});
});

// 2. Get all book reviews by book id TODO TEST
app.get("/reviews", async (req, res) => {
  const reviews = await reviewModel.find({ book: req.body._id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  }).clone().catch(function(err){ console.log(err)});
});

// 3. Create a new review
app.post("/review", async (req, res) => {
  // Create review
  var review = new reviewModel({
    user: req.body.user,
    name: req.body.name,
    date: req.body.date,
    rating: req.body.rating,
    title: req.body.title,
    review: req.body.review,
  });

  try {
    await review.save();
    res.send(review);
    console.log("Review created");
  } catch (error) {
    res.status(500).send(error);
  }

  // Link up with users model
  const _id = req.body.user;
  const updatedUser = await userModel.findByIdAndUpdate(
    {_id},
    { $push: { "reviews": review._id } },
    { new: true }
  );
  console.log(updatedUser);

  // // Link up with book model
  // const b_id = req.body.book;
  // const updatedBook = await bookModel.findByIdAndUpdate(
  //   {b_id},
  //   { $push: { "reviews": review._id } },
  //   { new: true }
  // );
  // console.log(updatedBook);
});


app.get("/review", async (req, res) => {
  const review = await reviewModel.find({});

  try {
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = app;

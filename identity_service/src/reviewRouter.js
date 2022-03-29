const express = require("express");
const reviewModel = require("./models/reviewModel");

const app = express();

// Create a new review

app.post("/review", async (req, res) => {
  const review = new reviewModel({
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
});

module.exports = app;
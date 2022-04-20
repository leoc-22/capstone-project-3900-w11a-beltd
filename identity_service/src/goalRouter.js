const express = require("express");
//const mongoose = require("mongoose");
const goalModel = require("./models/goalModel");
const userModel = require("./models/userModel");

const app = express();

// Get all goals
app.get("/myGoals", async (req, res) => {
  const goals = await goalModel.find({});

  try {
    res.send(goals);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create goal
// Create goal
app.post("/goal", async (req, res) => {
  // Find user
  const _id = req.body.user;
  // Create new goal
  var goal = new goalModel({
    user: req.body.user,
    endDate: req.body.endDate,
    target: req.body.target,
    current: 0,
    completed: false,
  });

  try {
    await goal.save();
    res.send(goal);
    console.log("Goal created");
  } catch (error) {
    res.status(500).send(error);
  }

  // Link up with users model (push to array)
  await userModel.findByIdAndUpdate(
    { _id },
    { $push: { goals: goal._id } },
    { new: true }
  );
});

// UPDATE current read books /advance goal forward when user marks a book as read
app.patch("/goal", async (req, res) => {
  var query = { _id: req.body._id }; // goal id

  goalModel.updateOne(
    query,
    { $inc: { current: 1 } },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Goal progress updated");
      res.send("Successfully updated");
    }
  );
});

// Update goal as completed when user has read target no.
app.patch("/goalComplete", async (req, res) => {
  var query = { _id: req.body._id };

  goalModel.findOneAndUpdate(
    query,
    {
      completed: true,
    },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Goal completed");
      res.send("Succesfully updated.");
    }
  );
});

// Delete goal by querying goal id
app.delete("/goal", async (req, res) => {
  var query = { _id: req.body._id };

  goalModel.findOneAndRemove(query, (err) => {
    if (err) return res.send(500, { error: err });
    console.log("Goal deleted");
    res.send("Successfully deleted");
  });
});

module.exports = app;

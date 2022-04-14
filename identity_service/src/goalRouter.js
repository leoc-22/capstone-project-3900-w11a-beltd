const express = require("express");
//const mongoose = require("mongoose");
const goalModel = require("./models/goalModel");
const userModel = require("./models/userModel");
const collectionModel = require("./models/collectionModel");

const app = express();

// Get all USER OWNED goals by user id
app.get("/myGoals", async (req, res) => {
  await collectionModel.find({ user: req.body.user }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  }).clone().catch(function(err){ 
    console.log(err);
  });
});


// Create goal
// Create goal
app.post("/goal", async (req, res) => {

  // Find user
  const _id = req.body.user;
  // const currentUser = userModel.findById({_id}, function(err,doc) {
  //   console.log(doc)
  // });

  // Create new goal
  var goal = new goalModel({
    user: req.body.user,
    endDate: req.body.endDate,
    target: req.body.target,
    current: 0,
    completed: false,
  });
  console.log(req.body.endDate);
  console.log(req.body.target);
  console.log(req.body.user);

  try {
    await goal.save();
    res.send(goal);
    console.log("Goal created");
  } catch (error) {
    res.status(500).send(error);
  }
  
  // Link up with users model (push to array)
  const updatedUser = await userModel.findByIdAndUpdate(
    {_id},
    { $push: { "goals": goal._id } },
    { new: true }
  );

  console.log(updatedUser);

  // // TODO might need populate later on/// or just query
  // const populated = userModel.findById({_id}).populate("goals").exec((err, user) => {
  //   console.log("goals populated");
  // });

  // console.log(populated)

});


// UPDATE current read books /advance goal forward when user marks a book as read
app.patch("/goal", async (req, res) => {
  var query = { _id: req.body._id }; // goal id

  goalModel.updateOne(
    query,
    { $inc: { current : 1}},
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

// TODO UPDATE GOAL

module.exports = app;

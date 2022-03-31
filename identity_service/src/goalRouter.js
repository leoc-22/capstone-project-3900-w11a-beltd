const express = require("express");
const mongoose = require("mongoose");
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
app.post("/goal", async (req, res) => {

  // Find user
  //var query = mongoose.Types.ObjectId(req.body.user); // user id
  const _id = req.body.user;
  const currentUser = userModel.findById({_id}, function(err,doc) {
    console.log(doc)
  });

  var goal = new goalModel({
    user: req.body.user,
    //endDate: req.body.endDate,
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


  // Populate
  //var query2 = { user: req.body.user }; // user id
  // const foundGoal = goalModel.findById({_id}).populate('user').exec(function(err,goal) {
  //   if (err) return handleError(err);
  //   console.log("goal populated with user id");
  // })
  // Link up with users model (push to array)
  const updatedUser = await userModel.findByIdAndUpdate(
    {_id},
    { $push: { 'goals': goal._id } },
    { new: true }
    );

  console.log(updatedUser);

  // currentUser.goals.push(foundGoal);
  // await currentUser.save(function(err) {
  //   if (err) return handleError(err);
  // });
  // currentUser.save(callback);



  // push onto goals array in users
  //const goals = await goalModel.
  

  

  // console.log(userModel.findOne(query));

  // userModel.findOne(query).
  // populate('goals').
  // exec(function(err, user) {
  //   if (err) return handleError(err);
  //   console.log("goals" + goals);
  // });
  
  

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

const express = require("express");
const goalModel = require("./models/goalModel");
const app = express();

// Create goalG
app.post("/goal", async (req, res) => {
  const goal = new goalModel({
      user: req.body.name, // ID OR NAME SENT FROM FRONTEND?
      endDate: req.body.endDate,
      target: req.body.target,
      completed: false,
  });

  try {
    await goal.save();
    res.send(goal);
    console.log("Goal created");
  } catch (error) {
      res.status(500).send(error);
  }

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

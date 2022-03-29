const express = require("express");
const goalModel = require("./models/goalModel");

const app = express();

// Create goal
app.post("/goal", async (req, res) => {
  const goal = new goalModel({
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

// UPDATE current read books /advance goal forward
app.patch("/goal", async (req, res) => {
  var query = { g_id: req.body.g_id };
  const update = goalModel.findOne().current + 1;

  goalModel.findOneAndUpdate(
    query,
    {
      current: update,
    },
    { upsert: true },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("Goal progress updated");
      res.send("Successfully updated");
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

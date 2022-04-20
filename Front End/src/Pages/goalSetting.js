import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import { Grid, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  subGoals: {
    marginLeft: "20px",
    marginTop: "-20px",
  },
  inline: {
    position: "absolute",
    marginLeft: "40%",
    marginTop: "-75px",
  },
  curGoals: {
    marginTop: "50px",
  },
});

const GoalSettingPage = () => {
  const classes = useStyles();
  const [goalsArr, setGoalsArr] = useState([]);
  const [goalsCreated, setGoalsCreated] = useState(0);

  //const location = useLocation();

  useEffect(() => {
    document.title = "Reading goal | Booklab";
    getData();
  }, [goalsCreated]);

  // get all goals of a user
  async function getData() {
    let userEmail = sessionStorage.getItem("email");
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/oneuser/" + userEmail,
    });
    let myGoals = res.data.goals;

    let allGoals = await axios({
      method: "get",
      url: "http://localhost:8001/myGoals",
    });
    let allMygoals = [];

    for (let i = 0; i < allGoals.data.length; i++) {
      let curGoal = allGoals.data[i]["_id"];
      for (let j = 0; j < myGoals.length; j++) {
        if (myGoals[j] == curGoal) {
          allMygoals.push(allGoals.data[i]);
        }
      }
    }
    setGoalsArr(allMygoals);
  }

  // save a new goal
  async function saveGoal() {
    let newEndDate = document.getElementById("endDate").value;
    let newTarget = document.getElementById("target").value;

    if (newEndDate == "" || newTarget == "") {
      document.getElementById("goalSuccess").hidden = true;
      document.getElementById("goalError").hidden = false;
      return;
    }
    //let date = parseInt(document.getElementById("target").value);
    await axios({
      method: "post",
      url: "http://localhost:8001/goal",
      data: {
        user: sessionStorage.getItem("id"),
        endDate: document.getElementById("endDate").value,
        target: document.getElementById("target").value,
      },
    });
    document.getElementById("target").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("goalSuccess").hidden = false;
    document.getElementById("goalError").hidden = true;
    let tmp = goalsCreated;
    tmp += 1;
    setGoalsCreated(tmp);
    return;
  }

  // delete a goal
  async function deleteGoal(targetGoal) {
    let goalId = targetGoal.goal._id;
    await axios({
      method: "delete",
      url: "http://localhost:8001/goal",
      data: {
        _id: goalId,
      },
    });
    let tmp = goalsCreated;
    tmp += 1;
    setGoalsCreated(tmp);
    return;
  }

  // increment a goal
  async function advanceGoal(targetGoal) {
    let goalId = targetGoal.goal._id;

    let allGoals = await axios({
      method: "get",
      url: "http://localhost:8001/myGoals",
    });
    let curGoal;
    for (let i = 0; i < allGoals.data.length; i++) {
      if (allGoals.data[i]["_id"] == goalId) {
        curGoal = allGoals.data[i];
        break;
      }
    }
    if (curGoal.current + 1 >= curGoal.target) {
      await axios({
        method: "patch",
        url: "http://localhost:8001/goalComplete",
        data: {
          _id: goalId,
        },
      });
      let tmp = goalsCreated;
      tmp += 1;
      setGoalsCreated(tmp);
      if (curGoal.current + 1 == curGoal.target) {
        await axios({
          method: "patch",
          url: "http://localhost:8001/goal",
          data: {
            _id: goalId,
          },
        });
      }
      return;
    } else {
      await axios({
        method: "patch",
        url: "http://localhost:8001/goal",
        data: {
          _id: goalId,
        },
      });
    }
    let tmp = goalsCreated;
    tmp += 1;
    setGoalsCreated(tmp);
    return;
  }

  // mark a goal as complete
  async function markComplete(targetGoal) {
    let goalId = targetGoal.goal._id;
    await axios({
      method: "patch",
      url: "http://localhost:8001/goalComplete",
      data: {
        _id: goalId,
      },
    });
    let tmp = goalsCreated;
    tmp += 1;
    setGoalsCreated(tmp);
    return;
  }

  return (
    <div>
      <AuthenticatedNavbar></AuthenticatedNavbar>
      <div className={classes.main}>
        <h1>Set your reading goal for this month!</h1>
        <div hidden id="goalSuccess" className={classes.success}>
          <Alert severity="success">Goal created</Alert>
        </div>
        <div hidden id="goalError" className={classes.error}>
          <Alert severity="error">Fields cannot be empty</Alert>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <h2>
              I want to read{" "}
              <TextField id="target" variant="standard" placeholder="10" />{" "}
              books by{" "}
              <TextField
                type="date"
                id="endDate"
                variant="standard"
                placeholder="dd/mm/yyyy"
              />
            </h2>
            <br />
            <Button onClick={() => saveGoal()} variant="contained">
              Add reading goal
            </Button>
          </Grid>
        </Grid>
        <h2 className={classes.curGoals}>Current Goals</h2>
        {goalsArr.map((goal, index) => (
          <div key={index}>
            <Card style={{ width: "80%", marginBottom: "20px" }}>
              <CardHeader
                action={
                  <IconButton>
                    <ClearIcon onClick={() => deleteGoal({ goal })} />
                  </IconButton>
                }
                title={"Read " + goal.target + " books by " + goal.endDate}
              />
              {
                <div className={classes.inline}>
                  <IconButton>
                    <PlayCircleOutlineIcon
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      onClick={() => advanceGoal({ goal })}
                    ></PlayCircleOutlineIcon>
                  </IconButton>
                  <div></div>
                  <IconButton>
                    <CheckCircleOutlineIcon
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      onClick={() => markComplete({ goal })}
                    ></CheckCircleOutlineIcon>
                  </IconButton>
                </div>
              }
              <div className={classes.subGoals}>
                <p>Progress: {goal.current}</p>
                <p id="completed">Completed: {String(goal.completed)}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalSettingPage;

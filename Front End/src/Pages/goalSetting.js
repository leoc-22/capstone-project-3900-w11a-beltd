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
    marginTop: "-20px"
  },
  inline: {
    position: "absolute",
    marginLeft: "40%",
    marginTop: "-75px"
  },
  curGoals: {
    marginTop: "50px",
  },
});

const goalSettingPage = () => {
  const classes = useStyles();
  const [goalsArr, setGoalsArr] = useState([]);
  const [goalsCreated, setGoalsCreated] = useState(0);

  //const location = useLocation();

  useEffect(() => {
    document.title = "Reading goal | Booklab";
    getData();
  }, [goalsCreated]);


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
      }
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

  async function deleteGoal(targetGoal) {
    let goalId = targetGoal.goal._id;
    await axios({
      method: "delete",
      url: "http://localhost:8001/goal",
      data: {
        _id: goalId
      }
    });
    let tmp = goalsCreated;
    tmp += 1;
    setGoalsCreated(tmp);
    return;
  }

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <h1>Set your reading goal for this month!</h1>
        <div hidden id="goalSuccess" className={classes.success}><Alert severity="success">Goal created</Alert></div>
        <div hidden id="goalError" className={classes.error}><Alert severity="error">Fields cannot be empty</Alert></div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <h2>
              I want to read <TextField id="target" variant="standard" placeholder="10" />{" "}
              books by <TextField type="date" id="endDate" variant="standard" placeholder="dd/mm/yyyy" />
            </h2>
            <br />
            <Button
              onClick={() => saveGoal()}
              variant="contained">Add reading goal</Button>
          </Grid>
        </Grid>
        <h2 className={classes.curGoals}>Current Goals</h2>
        {goalsArr.map((goal, index) => (
          <div key={index}>
            <Card style={{ width: "80%", marginBottom: "20px" }} >
              <CardHeader
                action={
                  <IconButton onClick={() => deleteGoal({ goal })}>
                    <ClearIcon />
                  </IconButton>
                }
                title={"Read " + goal.target + " books by " + goal.endDate}
              />
              <div className={classes.subGoals}>
                <p>Progress: {goal.current}/{goal.target}</p>
                <p id="completed">Completed: {String(goal.completed)}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default goalSettingPage;

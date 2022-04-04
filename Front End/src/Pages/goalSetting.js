/* eslint-disable */ 
import React, { useEffect, useState } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import axios from "axios";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  goalSection : {
    marginTop : "50px"
  },
  subGoals : {
    marginLeft : "20px",
    marginTop: "-20px"
  },
  inline : {
    position:"absolute",
    marginLeft : "60%",
    marginTop: "-75px"
  }
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


  async function getData(){
    let userEmail = sessionStorage.getItem("email");
    let res = await axios({
      method : "get",
      url : "http://localhost:8001/oneuser/" + userEmail,
    })
    let myGoals = res.data.goals;
    //console.log(myGoals);

    let allGoals = await axios({
      method : "get",
      url : "http://localhost:8001/myGoals",
    })
    //console.log(allGoals.data);
    let allMygoals = []

    for (let i =0 ;i < allGoals.data.length ; i++){
      let curGoal = allGoals.data[i]["_id"];
      for (let j = 0; j<myGoals.length ; j ++ ){
        if (myGoals[j] == curGoal){
          allMygoals.push(allGoals.data[i]);
        }
      }
    }
    setGoalsArr(allMygoals)
    console.log(allMygoals);
  }

  async function saveGoal(){
    console.log("save");

    //let date = parseInt(document.getElementById("target").value);
    //console.log(date);
    let res = await  axios({
      method : "post",
      url : "http://localhost:8001/goal",
      data: {
        user: sessionStorage.getItem("id"),
        endDate: document.getElementById("endDate").value,
        target : document.getElementById("target").value,
      }
    })
    document.getElementById("target").value ="";
    document.getElementById("endDate").value = ""
    let tmp = goalsCreated;
    tmp +=1;
    setGoalsCreated(tmp);
    return; 
  }

  async function deleteGoal(targetGoal){
    let goalId = targetGoal.goal._id;
    await axios({
      method : "delete",
      url : "http://localhost:8001/goal",
      data:{
        _id : goalId
      }
    })
    let tmp = goalsCreated;
    tmp +=1;
    setGoalsCreated(tmp);
    return;
  }
  
  async function advanceGoal(targetGoal){
    let goalId = targetGoal.goal._id;
    await axios({
      method : "patch",
      url : "http://localhost:8001/goal",
      data:{
        _id : goalId
      }
    })
    let tmp = goalsCreated;
    tmp +=1;
    setGoalsCreated(tmp);
    return;
  }

  async function markComplete(targetGoal){
    let goalId = targetGoal.goal._id;
    await axios({
      method : "patch",
      url : "http://localhost:8001/goalComplete",
      data:{
        _id : goalId
      }
    })
    let tmp = goalsCreated;
    tmp +=1;
    setGoalsCreated(tmp);
    return;
  }

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>
        <Alert severity="info">
          Reading goal updated. Progress 8/10 books completed!
        </Alert>
        <h1>Set your reading goal for this month!</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <h2>
              I want to read <TextField id = "target" variant="standard" placeholder="10" />{" "}
              books by <TextField id = "endDate" variant="standard" placeholder="date" />
            </h2>
            <br />
            <br />
            <br />
            <Button 
            onClick = {()=>saveGoal()}
            variant="contained">Save reading goal</Button>
          </Grid>
        </Grid>
      
        {goalsArr.map((goal) => (
        <div className={classes.goalSection}>
          <Card> 
        

            {/* template for books added to reading goal */}
            <CardHeader
              action={
                <IconButton>
                  <ClearIcon
                  onClick = {()=>deleteGoal({goal})}
                  />
                </IconButton> 
              }
              
              
              title = {goal.target + " Books"}
              subheader={"By: " + goal.endDate}
            />
              <div className={classes.inline}>
              <IconButton>
                <PlayCircleOutlineIcon
                  onClick = {()=>advanceGoal({goal})}
                ></PlayCircleOutlineIcon>
              </IconButton> 

              <IconButton>
                <CheckCircleOutlineIcon
                  onClick = {()=>markComplete({goal})}
                ></CheckCircleOutlineIcon>
              </IconButton> 
              </div>
          <div className={classes.subGoals}>
            <p>Progress: {goal.current}</p>
            <p id = "completed">Completed: {String(goal.completed)}</p>
          </div>
          </Card>
        </div>
        ))}




      </div>
    </div>
  );
};

export default goalSettingPage;

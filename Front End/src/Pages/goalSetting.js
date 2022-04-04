/* eslint-disable */ 
import React, { useEffect } from "react";
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
  }
});

const goalSettingPage = () => {
  const classes = useStyles();
  //const location = useLocation();

  useEffect(() => {
    document.title = "Reading goal | Booklab";
  }, []);

  async function saveGoal(){
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
            <TextField
              label="Search for books to add to your goal"
              variant="standard"
              sx={{ width: "80%", marginBottom: "50px" }}
            />
            <br />
            <br />
            <Button 
            onClick = {()=>saveGoal()}
            variant="contained">Save reading goal</Button>
          </Grid>
        </Grid>

        <div className={classes.goalSection}>
        <Card>
              {/* template for books added to reading goal */}
              <CardHeader
                action={
                  <IconButton>
                    <ClearIcon />
                  </IconButton>
                }
                title="Book title"
                subheader="Book author"
              />
            </Card>
          </div>


      </div>
    </div>
  );
};

export default goalSettingPage;

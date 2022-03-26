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

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
});

const goalSettingPage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Reading goal | Booklab";
  }, []);

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>
        <Alert severity="info">Reading goal updated. Progress 8/10 books completed!</Alert>
        <h1>Set your reading goal for this month!</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <h2>I want to read <TextField variant="standard" placeholder="10"/> books by  <TextField variant="standard" placeholder="date"/></h2>
            <br/>
            <TextField label="Search for books to add to your goal" variant="standard" sx={{ width: "80%", marginBottom: "50px"}} />
            <br/>
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
            <br />
            <h3>
              Read x of x books. Completed on date.
            </h3>
            <Button variant="contained">Save reading goal</Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <h2>Previous reading goals</h2>
            <div hidden>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 16 }} color="text.primary">
                    No goals to display
                  </Typography>
                </CardContent>
              </Card>
              <br />
            </div>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  February goal 
                </Typography>
                <Typography sx={{ fontSize: 14, textTransform: "uppercase", marginBottom: "20px" }} color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="body2">
                  You completed 5/5 books on 28/02/2021.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View goal</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default goalSettingPage;

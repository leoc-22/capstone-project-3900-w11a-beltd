import React, { useEffect } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import reset from "../Images/reset.svg";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
});

const userProfilePage = () => {
  const classes = useStyles();
  const location = useLocation();

  const userDetails = location.state.user;

  useEffect(() => {
    document.title = "User Profile | Booklab";
  }, []);

  // var userName = localStorage.getItem("name");

  return (
    <div>
      <AuthenicatedTopBar user={location.state.user}></AuthenicatedTopBar>
      <div className={classes.main}>
        <Avatar sx={{ width: 80, height: 80 }}>{userDetails.name}</Avatar>
        <h1>Welcome back, {userDetails.name}</h1>
        {/* update grid with user info */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <h2>Currently reading</h2>
            {/* add details for most recent book in currently reading */}
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Book title
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                  color="text.secondary"
                >
                  Book author
                </Typography>
                <Typography variant="body2">Book description</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go to book profile</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <h2>Reading goal</h2>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Goal status
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                  color="text.secondary"
                >
                  On track
                  {/* Could also include x books behind */}
                </Typography>
                <Typography variant="body2">
                  You have read x books
                  {/* update with progress */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Update your goal</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <h2>Leader board</h2>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  See how you compare with global readers
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                  color="text.secondary"
                >
                  Top x% of readers
                  {/* show top percentage e.g. 10% of readers */}
                </Typography>
                <Typography variant="body2">
                  Read more books to move up the rankings.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go to leader board</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <h2 style={{ marginTop: "80px" }}>My collections</h2>
        <Button variant="outlined">View all my collections</Button>
        {/* map the first 4 collections for user */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Collection title</Button>
            <br />
            <Chip label="Public" size="small" />
          </Grid>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Collection title</Button>
            <br />
            <Chip label="Private" size="small" />
          </Grid>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Collection title</Button>
            <br />
            <Chip label="Public" size="small" />
          </Grid>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Collection title</Button>
            <br />
            <Chip label="Public" size="small" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default userProfilePage;

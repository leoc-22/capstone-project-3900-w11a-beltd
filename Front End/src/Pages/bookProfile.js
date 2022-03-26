import React, { useEffect } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import login from "../Images/login.svg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "100px auto",
  },
  image: {
    width: "100%",
  }
});

const bookProfilePage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Book profile | Booklab";
  }, []);

  const [value, setValue] = React.useState(2);

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <img
              src={login}
              alt="two people standing"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <h1>Book title</h1>
            <h2>Author</h2>
            <Button variant="outlined" sx={{ marginRight: "16px", marginBottom: "20px" }} >Add to collection</Button>
            <Button variant="contained" sx={{ marginBottom: "20px" }} >Mark as read</Button>
            <br />
            <Chip label="Category 1" sx={{ marginRight: "16px" }} />
            <Chip label="Category 2" />
            <br />
            <Stack direction="row" alignItems="center" spacing={2}>
              <p>Publisher</p>
              <p>Publication date</p>
              <p>Average rating</p>
              <p>Total number of readers</p>
              <p>Number of collections</p>
            </Stack>
            <p>Book description</p>
          </Grid>
        </Grid>
        <h2>Compare pricing</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Source
                </Typography>
                <Typography sx={{ fontSize: 14, textTransform: "uppercase" }} color="text.secondary">
                  $0.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">purchase this book</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Source
                </Typography>
                <Typography sx={{ fontSize: 14, textTransform: "uppercase" }} color="text.secondary">
                  $0.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">purchase this book</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Source
                </Typography>
                <Typography sx={{ fontSize: 14, textTransform: "uppercase" }} color="text.secondary">
                  $0.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">purchase this book</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <br />
        <h2>Recommendations</h2>
        <Button variant="outlined" >View more</Button>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
        </Grid>
        <br />
        <h2>Write a review</h2>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Comment"
          multiline
          style={{ width: "40%", marginBottom: "20px" }}
          rows={4}
          variant="standard"
        />
        <br />
        <Button variant="contained">submit review</Button>
        <br />
        <h2>Community reviews</h2>
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Review author
            </Typography>
            <Rating name="read-only" value={value} readOnly />
            <Typography variant="body2">
              well meaning and kindly.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default bookProfilePage;


import React, { useEffect, useState } from "react";
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
import axios from "axios";
// import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "100px auto",
  },
  image: {
    width: "100%",
  },
  bookImage: {
    width: "100%",
  },
  reviewBar: {
    padding : "10px",
    marginBottom : "20px"
  },
  h2: {
    color: "rgb(51, 153, 255)"
  }
});

const bookProfilePage = () => {
  // const location = useLocation();
  window.scrollTo(0, 0);

  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [bookImg, setImg] = useState(null);
  const [amzLink, setAmzLink] = useState(null);
  const [rating, setRating] = useState(null);
  
  const classes = useStyles();
  const queryString = window.location.search.slice(1);
  
  useEffect(() => {
    getData();
    document.title = "Book profile | Booklab";
  }, []);

  async function getData() {
    await axios
      .get("http://localhost:8002/books")
      .then((res) => {
        getTargetBook(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }

  function getTargetBook(res) {
    for (let i = 0; i < res.length; i++) {
      if (res[i]["_id"] == queryString) {
        setTitle(res[i]["title"]);
        setAuthor(res[i]["authors"]);
        setImg(res[i]["image"]);
        setAmzLink(res[i]["link"]);
        setRating(res[i]["rating"]);
        console.log(res[i]);
        return;
      }
    }
  }

  function amzPage() {
    window.open(amzLink, "_blank").focus();
  }

  async function submitReview(){
    await axios({
      method: "post",
      url : "http://localhost:8001/review",
      data : {
        title : title,
        review : document.getElementById("myReview").value
      }

    });
    document.getElementById("myReview").value = "";
    return;
  }

  const [value, setValue] = React.useState(2);

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <img
              src={bookImg}
              alt="two people standing"
              className={classes.bookImage}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <h1>{title}</h1>
            <h2>by {author}</h2>
            <Button
              variant="outlined"
              sx={{ marginRight: "16px", marginBottom: "20px" }}
            >
              Add to collection
            </Button>
            <Button
              variant="contained"
              sx={{ marginRight: "16px", marginBottom: "20px" }}
            >
              Mark as read
            </Button>
            <br />
            <Chip label="Category 1" sx={{ marginRight: "16px" }} />
            <Chip label="Category 2" />
            <br />
            <Stack direction="row" alignItems="center" spacing={2}>
              <p>Publisher</p>
              <p>Publication date</p>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <p>Average rating: {rating}</p>
              <p>Number of readers</p>
              <p>Number of collections</p>
            </Stack>
            <p>Book description</p>
          </Grid>
        </Grid>
        <h2 className={classes.h2}>Compare pricing</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Amazon
                </Typography>
                {/* <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  $0.00
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => amzPage()}>View on Amazon</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Source
                </Typography>
                {/* <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  $0.00
                </Typography> */}
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
                {/* <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  $0.00
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small">purchase this book</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <br />
        <h2 className={classes.h2}>Recommendations</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
            <p>Title</p>
            <p>Author</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
            <p>Title</p>
            <p>Author</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
            <p>Title</p>
            <p>Author</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
            <p>Title</p>
            <p>Author</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
            <p>Title</p>
            <p>Author</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
            <p>Title</p>
            <p>Author</p>
          </Grid>
        </Grid>
        <br />

        <h2 className={classes.h2}>Write a review</h2>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <br />
        <TextField
          className={classes.reviewBar}
          id="myReview"
          label="Review"
          variant="standard"
          style={{
            width: "50%",
            marginTop: 20,
            marginBottom :20,
            marginLeft: "0%",
          }}
        />
        <br />
        <Button 
          variant="contained"
          onClick={() => submitReview()}
        >submit review</Button>
        <br />
        <h2 className={classes.h2}>Community reviews</h2>
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Review author
            </Typography>
            <Rating name="read-only" value="2" readOnly />
            <Typography variant="body2">well meaning and kindly.</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default bookProfilePage;

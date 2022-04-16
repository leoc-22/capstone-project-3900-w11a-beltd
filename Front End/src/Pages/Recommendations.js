/* eslint-disable */
import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import recs from "../Images/recommendations.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    minHeight: "80vh",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
});

export default function RecommendationsPage() {
  const history = useHistory();
  const classes = useStyles();
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [bookImg, setBookImg] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = React.useState("Random");
  // const [firstLoad, setFirstLoad] = useState(0);

  useEffect(() => {
    document.title = "Recommended for you | Booklab";
  }, [books]);


  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  async function getBook() {
    if (filter === "Random") {
      let res = await axios({
        url: "http://localhost:8002/books"
      });
      let randNum = Math.floor((Math.random() * res.data.length));
      const targetBook = res.data[randNum];
      setBooks(targetBook);
      setBookTitle(targetBook.title);
      setCategory(targetBook.categories[0].name);
      setAuthor(targetBook.authors);
      setRating("Rating: " + targetBook.rating);
      setBookImg(targetBook.image);
      document.getElementById("bookResult").hidden = false;
    }
    return;
  }

  function routeUser() {
    history.push("/book-profile" + "?" + books._id);
  }



  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <Grid container spacing={10}>
          <Grid item xs={8} className={classes.header}>
            <h1>Recommended books for you</h1>
            <p>Find the perfect book for a reader just like you</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter by"
                onChange={handleChange}
              >
                <MenuItem value="Popular">Popular books</MenuItem>
                <MenuItem value="Authors">Authors in my collection</MenuItem>
                <MenuItem value="Genres">Genres in my collection</MenuItem>
                <MenuItem value="Random">Random Book</MenuItem>
                <MenuItem value="5stars">5 star rating</MenuItem>
                <MenuItem value="4stars">4 star rating</MenuItem>
                <MenuItem value="3stars">3 star rating</MenuItem>
                <MenuItem value="2stars">2 star rating</MenuItem>
                <MenuItem value="1stars">1 star rating</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={() => getBook()}>
              Get Book
            </Button>
          </Grid>

          <Grid item xs={4}>
            <img
              className={classes.headerImg}
              src={recs}
              alt={"two people sitting together"}
            />
          </Grid>

        </Grid>
        <br />
        <div id="bookResult" hidden>
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: "30%" }}
                image={bookImg}
                alt={bookTitle}
              />
              <Box sx={{ padding: "20px" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" onClick={routeUser}>
                    {bookTitle} by {author}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {rating}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Add to collection</Button>
                </CardActions> */}
              </Box>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  );
}

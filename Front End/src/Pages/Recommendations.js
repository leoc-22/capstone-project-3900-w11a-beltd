import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import recs from "../Images/recommendations.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
import BookSearchResults from "../Components/BookSearchResults";

const useStyles = makeStyles({
  main: {
    minHeight: "80vh",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  media: {
    "&:hover": {
      cursor: "pointer",
    },
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
  const [bookList, setBookList] = useState([]);
  // const [firstLoad, setFirstLoad] = useState(0);

  useEffect(() => {
    document.title = "Recommended for you | Booklab";
  }, [books]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  // get book data
  async function getBook() {
    let n = sessionStorage.getItem("name");

    if (filter === "Random") {
      let res = await axios({
        url: "http://localhost:8002/books",
      });
      let randNum = Math.floor(Math.random() * res.data.length);
      const targetBook = res.data[randNum];
      setBooks(targetBook);
      setBookTitle(targetBook.title);
      setCategory(targetBook.categories[0].name);
      setAuthor(targetBook.authors);
      setRating("Rating: " + targetBook.rating);
      setBookImg(targetBook.image);
      document.getElementById("randomBook").hidden = false;
      document.getElementById("booksByAuthors").hidden = true;
      document.getElementById("booksByGenres").hidden = true;
      document.getElementById("booksByRatings").hidden = true;
    } else if (filter === "Authors") {
      await axios
        .get(`http://localhost:8001/recommendbyauthors/${n}`)
        .then((res) => {
          setBookList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      document.getElementById("booksByAuthors").hidden = false;
      document.getElementById("randomBook").hidden = true;
      document.getElementById("booksByGenres").hidden = true;
      document.getElementById("booksByRatings").hidden = true;
    } else if (filter === "Genres") {
      await axios
        .get(`http://localhost:8001/recommendbygenres/${n}`)
        .then((res) => {
          setBookList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      document.getElementById("booksByGenres").hidden = false;
      document.getElementById("randomBook").hidden = true;
      document.getElementById("booksByAuthors").hidden = true;
      document.getElementById("booksByRatings").hidden = true;
    } else if (filter === "4stars") {
      getBooksByRatings(4);
      document.getElementById("booksByRatings").hidden = false;
      document.getElementById("randomBook").hidden = true;
    } else if (filter === "3stars") {
      getBooksByRatings(3);
      document.getElementById("booksByRatings").hidden = false;
      document.getElementById("randomBook").hidden = true;
      document.getElementById("booksByAuthors").hidden = true;
      document.getElementById("booksByGenres").hidden = true;
    } else if (filter === "2stars") {
      getBooksByRatings(2);
      document.getElementById("booksByRatings").hidden = false;
      document.getElementById("randomBook").hidden = true;
      document.getElementById("booksByAuthors").hidden = true;
      document.getElementById("booksByGenres").hidden = true;
    } else if (filter === "1stars") {
      getBooksByRatings(1);
      document.getElementById("booksByRatings").hidden = false;
      document.getElementById("randomBook").hidden = true;
      document.getElementById("booksByAuthors").hidden = true;
      document.getElementById("booksByGenres").hidden = true;
    }
    return;
  }

  // filter by rating
  async function getBooksByRatings(rating) {
    await axios
      .get(`http://localhost:8002/books/${rating}`)
      .then((res) => {
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
                {/* <MenuItem value="Popular">Popular books</MenuItem> */}
                <MenuItem value="Random">Random Book</MenuItem>
                <MenuItem value="Authors">Authors in my collection</MenuItem>
                <MenuItem value="Genres">Genres in my collection</MenuItem>
                <MenuItem value="4stars">4+ star rating</MenuItem>
                <MenuItem value="3stars">3+ star rating</MenuItem>
                <MenuItem value="2stars">2+ star rating</MenuItem>
                <MenuItem value="1stars">1+ star rating</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={() => getBook()}
            >
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
        <div id="randomBook" hidden>
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                onClick={() => routeUser()}
                component="img"
                sx={{ width: "30%" }}
                image={bookImg}
                className={classes.media}
                alt={bookTitle}
              />
              <Box sx={{ padding: "20px" }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    className={classes.media}
                    component="div"
                    onClick={routeUser}
                  >
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

        <div id="booksByAuthors" hidden>
          {bookList ? <BookSearchResults books={bookList} /> : null}
        </div>
        <div id="booksByGenres" hidden>
          {bookList ? <BookSearchResults books={bookList} /> : null}
        </div>
        <div id="booksByRatings" hidden>
          {bookList ? <BookSearchResults books={bookList} /> : null}
        </div>
      </div>
    </div>
  );
}

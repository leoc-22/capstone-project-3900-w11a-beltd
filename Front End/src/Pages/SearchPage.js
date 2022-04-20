import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import TextField from "@mui/material/TextField";
import Typewriter from "typewriter-effect";
import { makeStyles } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import search from "../Images/search.svg";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import BookSearchResults from "../Components/BookSearchResults";
import { useHistory } from "react-router-dom";
import Loading from "../Components/Loading";

const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  header: {
    marginTop: "100px",
  },
  searchType: {
    color: "#1976d2",
    padding: 0,
    margin: 0,
  },
  searchFor: {
    padding: 0,
    margin: 0,
  },
  headerImg: {
    width: "100%",
  },
  bestTitle: {
    position: "absolute",
    marginTop: "-400px",
    fontSize: "25px",
    marginLeft: "400px",
    minWidth: "350px",
    fontWeight: "500",
  },
  bestAuthor: {
    position: "absolute",
    marginTop: "-15%",
    marginLeft: "400px",
    fontSize: "16pt",
  },
  bestResImg: {
    height: "400px",
    width: "300px",
    borderRadius: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  bestResrating: {
    position: "absolute",
    marginTop: "-10%",
    marginLeft: "400px",
  },
});

export default function SearchPage() {
  const classes = useStyles();
  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState("");
  const [searchResImg, setSearchResImg] = useState("");
  const [barRes, setBarRes] = useState(0);
  const [bestResult, setBestResult] = useState("");
  const [rating, setRating] = useState("Undefined");

  const [allRatings, setAllRatings] = useState(true);
  const [ratingsAbove4_5, setRatingsAbove4_5] = useState(false);
  const [ratingsAbove4, setRatingsAbove4] = useState(false);

  useEffect(() => {
    getBookData();
    searchUrl();
    document.title = "Explore | Booklab";
  }, [barRes]);

  // get url param
  const searchUrl = async () => {
    const newQuery = window.location.search.slice(13);
    if (newQuery != null) {
      getResults(newQuery);
    }
  };

  // search by param
  const getResults = (data) => {
    axios.get(`http://localhost:8002/books/search/${data}`).then((res) => {
      setSearchRes(res.data);
      setBestResult(res.data[0]);
      setSearchResImg(res.data[0].image);
      setRating(res.data[0].rating);
      if (barRes == 0) {
        setBarRes(barRes + 1);
        document.getElementById("Results").hidden = false;
      }
    });
  };

  // get search results
  const getBookData = async () => {
    axios
      .get("http://localhost:8002/books/autocomplete")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setError(error);
      })
      .finally(() => {
        setLoadingBooks(false);
      });
  };

  // Filter by rating
  function getBooksAboveRating(data) {
    let bookArr = [];
    let targetRating;
    if (ratingsAbove4_5 == true) {
      targetRating = 4.5;
    } else if (ratingsAbove4 == true) {
      targetRating = 4;
    }

    for (let i = 0; i < data.length; i++) {
      if (parseFloat(data[i].rating) >= targetRating) {
        bookArr.push(data[i]);
      }
    }
    return bookArr;
  }

  // search by url param
  const handleSearch = () => {
    const newQuery = window.location.search.slice(13);
    if (newQuery != null) {
      history.push({
        pathname: "/search",
        //state: { user: props.user },
      });
    }
    // search by title or authors or genres
    axios.get(`http://localhost:8002/books/search/${query}`).then((res) => {
      document.getElementById("Results").hidden = false;

      if (allRatings === true) {
        setSearchRes(res.data);
        setBestResult(res.data[0]);
        setSearchResImg(res.data[0].image);
        setBarRes(barRes + 1);
        setRating(res.data[0].rating);
      } else {
        setSearchRes(getBooksAboveRating(res.data));
        let bestResFiltered = getBooksAboveRating(res.data)[0];
        setBestResult(bestResFiltered);
        setSearchResImg(bestResFiltered.image);
        setRating(bestResFiltered.rating);
        setBarRes(barRes + 1);
      }
    });
  };

  const handleOptions = () => {
    // faster performance and unique values using set
    let optionList = new Set();

    // adding titles first, then authors, then genres
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].title);
    }
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].authors);
    }
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].categories[0].name);
    }
    return [...optionList];
  };

  const gotoBook = () => {
    const bookId = bestResult._id;
    history.push("/book-profile?" + bookId);
  };

  // filter by rating
  const handleRating = (val) => {
    if (val == 5) {
      setAllRatings(true);
      setRatingsAbove4_5(false);
      setRatingsAbove4(false);
    } else if (val == 4.5) {
      setAllRatings(false);
      setRatingsAbove4_5(true);
      setRatingsAbove4(false);
    } else if (val == 4) {
      setAllRatings(false);
      setRatingsAbove4_5(false);
      setRatingsAbove4(true);
    }
  };

  if (loadingBooks) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <Grid container spacing={10}>
          <Grid item xs={8} className={classes.header}>
            <h1 className={classes.searchFor}>Search for...</h1>
            <h1 className={classes.searchType}>
              <Typewriter
                options={{
                  strings: ["Titles", "Authors", "Genres"],
                  autoStart: true,
                  loop: true,
                  pauseFor: 3000,
                }}
              />
            </h1>
            <Autocomplete
              disablePortal
              autoHighlight
              clearOnEscape
              freeSolo
              clearOnBlur={false}
              options={handleOptions()}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Find your next favourite book"
                  variant="standard"
                  style={{
                    width: "100%",
                    margin: "20px 0",
                  }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              )}
              onChange={(e, value) => {
                setQuery(value);
              }}
            />
            <FormControl>
              <FormLabel>Filter by</FormLabel>
              <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel
                  checked={allRatings}
                  value="5 stars"
                  control={<Radio />}
                  label="All ratings"
                  onClick={() => handleRating(5)}
                />
                <FormControlLabel
                  value="4+ stars"
                  control={<Radio />}
                  checked={ratingsAbove4_5}
                  onClick={() => handleRating(4.5)}
                  label="4.5+ stars"
                />
                <FormControlLabel
                  value="3+ stars"
                  onClick={() => handleRating(4)}
                  control={<Radio />}
                  checked={ratingsAbove4}
                  label="4+ stars"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <Button
              variant="contained"
              style={{
                marginTop: 20,
              }}
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={4}>
            <img
              className={classes.headerImg}
              src={search}
              alt={"group of people together"}
            />
          </Grid>
        </Grid>
        <br />
        <div hidden id="Results">
          <h2>Best Result</h2>
          <img
            src={searchResImg}
            className={classes.bestResImg}
            onClick={() => gotoBook()}
          ></img>
          <div className={classes.bestTitle}>
            {bestResult != undefined ? bestResult.title : ""}
          </div>
          <br />
          <div className={classes.bestAuthor}>
            {bestResult != undefined ? bestResult.authors : ""}
            <br />
            {"Rating: " + rating}
          </div>
          <br />

          <h2>All Results</h2>
        </div>
        {searchRes ? <BookSearchResults books={searchRes} /> : null}
        {/* Format results with TopBookItem component */}
      </div>
    </div>
  );
}

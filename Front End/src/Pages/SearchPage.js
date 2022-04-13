/* eslint-disable */

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AuthenticatedTopBar from "../Components/AuthenticatedTopBar";
import TextField from "@mui/material/TextField";
import Typewriter from "typewriter-effect";
import { makeStyles } from "@material-ui/core";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import search from "../Images/search.svg";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import BookSearchResults from "../Components/BookSearchResults";

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
    color: "#FB8C00",
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
});

export default function SearchPage() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState(null);

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = () => {
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

  const handleSearch = () => {
    // search by title or authors or genres
    axios.get(`http://localhost:8002/books/search/${query}`).then((res) => {
      setSearchRes(res.data);
    });
    // .catch((error) => {
    //   console.error(`Error: ${error}`);
    //   setError(error);
    // });
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

  if (loadingBooks) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AuthenticatedTopBar></AuthenticatedTopBar>
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
                    marginTop: 20,
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
            <p style={{ fontSize: "16pt" }}>Filter by:</p>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="5 stars" />
              <FormControlLabel control={<Checkbox />} label="4+ stars" />
              <FormControlLabel control={<Checkbox />} label="3+ stars" />
              <FormControlLabel control={<Checkbox />} label="2+ stars" />
              <FormControlLabel control={<Checkbox />} label="1+ stars" />
            </FormGroup>
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
        <h2>Results</h2>
        {searchRes ? (
          <BookSearchResults books={searchRes}></BookSearchResults>
        ) : null}
        {/* Format results with TopBookItem component */}
      </div>
    </div>
  );
}

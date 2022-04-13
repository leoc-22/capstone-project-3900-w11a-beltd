/* eslint-disable */
import React, { useEffect, useState } from "react";
import AuthenticatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import recs from "../Images/recommendations.svg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
    width: "20%",
    marginTop : "-50px",
    position : "absolute"
  },

  getBooksDiv : {
    marginTop : "50px"
  },
  bookResult : {
    alignItems : "center",
    textAlign : "center",
    borderRadius : "10px",
    minWidth : "200px",
    minHeight : "200px",
    marginTop : "50px"
  },
  bookImg : {
    minWidth : "30%",
    borderRadius : "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  footer : {
    minHeight : "100px"
  }
});

export default function RecommendationsPage() {
  const history = useHistory();
  const classes = useStyles();
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [bookImg, setBookImg] = useState("");
  const [categroy, setCategory] = useState("");
  const [filter, setFilter] = React.useState("Random");
  const [firstLoad, setFirstLoad] = useState(0);

  useEffect(() => {
  }, [books]);


  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  async function getBook(){
    if (filter === "Random"){
      let res = await axios({
        url : "http://localhost:8002/books"
      })
      let randNum = Math.floor((Math.random() * res.data.length));
      const targetBook = res.data[randNum];
      setBooks(targetBook);    
      setBookTitle(targetBook.title);
      setCategory(targetBook.categories[0].name);
      setAuthor(targetBook.authors);
      setRating("Rating: " + targetBook.rating);
      setBookImg(targetBook.image);

    }
    return;
  }

  function routeUser(){
    history.push("/book-profile" + "?" + books._id);
  }

  

  return (
    <div>
      <AuthenticatedTopBar></AuthenticatedTopBar>
      <div className={classes.main}>
        <Grid container spacing={10}>
          <Grid item xs={8} className={classes.header}>
            <h1>Recommended books for you</h1>
            <p>A curated list of books for a reader just like you</p>
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
          </Grid>
          
          <Grid item xs={4}>
            <img
              className={classes.headerImg}
              src={recs}
              alt={"two people sitting together"}
            />
          </Grid>
          
        </Grid>
        <div className={classes.getBooksDiv}>
          <Button 
          variant="outlined" 
          size="large" 
          onClick={() => getBook()}>
              Get Book
          </Button>
        </div>
        <br/>
        <div className={classes.bookResult}>
            <h2>{bookTitle}</h2>
            <p>{author}, {categroy}</p>
            <p>{rating}</p>

            <img 
            onClick = {()=>routeUser()}
            className={classes.bookImg} 
            src = {bookImg}></img>
        <div>
        </div>
        </div>
      </div>
      <div className={classes.footer}/>

    </div>
  );
}

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import headerLanding from "../Images/headerLanding.svg";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";


const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  header: {
    marginLeft: "100px",
  },
  headerImg: {
    height: "500px",
    borderRadius: "8px",
    width: "100%",
  },
  title: {
    fontSize: "44pt",
    marginBottom: "10px",
    marginTop: "80px"
  },
});

export default function LandingPage() {
  const classes = useStyles();
  const history = useHistory();

  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collectionArr, setCollectionArr] = useState([]);

  useEffect(() => {
    getData();
    getCollectionData();
    document.title = "Welcome to Booklab";
  }, []);

  async function getCollectionData() {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections"
    });
    setCollectionArr(res.data);
  }


  async function getData() {
    await axios
      .get("http://localhost:8002/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // wait for axios to get book data, then render book shelves
  // TODO Beautify this
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.main}>
        <Grid container spacing={10}>
          <Grid item xs={6} className={classes.header}>
            <h1 className={classes.title}>Welcome to BookLab</h1>
            <h3>Collect and share your favourite books</h3>
            <Button variant="contained"
              onClick={() => history.push("/login")}
            >Start Reading</Button>
          </Grid>
          <Grid item xs={6}>
            <img
              className={classes.headerImg}
              src={headerLanding}
              alt={"booklab: collect and share your favourite books"}
            />
          </Grid>
        </Grid>
        <h2 className={classes.popularCollections}>Popular Collections</h2>
        <CollectionsCarousel collections={collectionArr}></CollectionsCarousel>
        <h2 className={classes.TopBooks}>Top Books</h2>
        <TopBookGrid books={books}></TopBookGrid>
      </div>
    </div>
  );
}

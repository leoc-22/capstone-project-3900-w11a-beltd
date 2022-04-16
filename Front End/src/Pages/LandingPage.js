import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import headerLanding from "../Images/headerLanding.svg";
import Navbar from "../Components/Navbar";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import axios from "axios";

const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  header: {
    marginLeft: "100px",
  },
  headerImg: {
    height: "500px",
    width: "100%",
  },
  title: {
    fontSize: "44pt",
    marginBottom: "10px",
    marginTop: "80px",
  },
  subtitle: {
    marginTop: "50px",
  },
});

export default function LandingPage() {
  const classes = useStyles();
  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collectionArr, setCollectionArr] = useState([]);

  useEffect(() => {
    getData();
    getCollectionData();
    document.title = "Welcome to Booklab";
    console.log(books);
  }, []);

  async function getCollectionData() {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/collections",
    });
    let tmp = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].public == true) {
        tmp.push(res.data[i]);
      }
    }
    setCollectionArr(tmp);
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
            <Button variant="contained" onClick={() => history.push("/login")}>
              Start Reading
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img
              className={classes.headerImg}
              src={headerLanding}
              alt={"group of people"}
            />
          </Grid>
        </Grid>
        <h2 className={classes.subtitle}>Popular collections</h2>
        <CollectionsCarousel collections={collectionArr}></CollectionsCarousel>
        <h2 className={classes.subtitle}>Top books</h2>
        <TopBookGrid books={books}></TopBookGrid>
      </div>
    </div>
  );
}

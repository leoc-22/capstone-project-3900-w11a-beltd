import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import headerLanding from "../Images/headerLanding.svg";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  headerImg: {
    minHeight: "300px",
    borderRadius: "8px",
    width: "100%",
  },
  test: {},
});

export default function LandingPage() {
  const classes = useStyles();

  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collectionArr, setCollectionArr] = useState([]);

  useEffect(() => {
    getData();
    getCollectionData();
    document.title = "Welcome to Booklab";
  }, []);

  async function getCollectionData(){
    let res = await axios({
      method : "get",
      url : "http://localhost:8001/myCollections"
    });
    //console.log(res.data);
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
        <img
          className={classes.headerImg}
          src={headerLanding}
          alt={"booklab: collect and share your favourite books"}
        />
        <h2 className={classes.popularCollections}>Popular Collections</h2>
        <CollectionsCarousel collections = {collectionArr}></CollectionsCarousel>
        <h2 className={classes.TopBooks}>Top Books</h2>
        <TopBookGrid books={books}></TopBookGrid>
      </div>
    </div>
  );
}

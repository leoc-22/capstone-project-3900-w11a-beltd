import React, { useEffect, useState } from "react";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import headerHome from "../Images/headerHome.svg";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
  },
  popularCollections: {
    marginLeft: "7%",
    marginTop: "5%",
  },
  TopBooks: {
    marginLeft: "7%",
    marginTop: "5%",
  },

  headerImg: {
    minHeight: "300px",
    marginTop: "100px",
    marginLeft: "10%",
    borderRadius: "8px",
    width: "80%",
  },
});

const HomePage = () => {
  const classes = useStyles();

  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
    document.title = "Home Page | Booklab";
  }, []);

  async function getData() {
    await axios
      .get("http://localhost:8001/books")
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
      <AuthenicatedTopBar></AuthenicatedTopBar>

      <div className={classes.main}>
        <img
          className={classes.headerImg}
          src={headerHome}
          alt={"booklab: collect and share your favourite books"}
        />
        <h2 className={classes.popularCollections}>Popular Collections</h2>

        <CollectionsCarousel books={books}></CollectionsCarousel>
        <h2 className={classes.TopBooks}>Top Books</h2>
        <TopBookGrid books={books}></TopBookGrid>
      </div>
    </div>
  );
};

export default HomePage;

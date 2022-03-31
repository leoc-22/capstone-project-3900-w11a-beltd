import React, { useEffect, useState } from "react";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import headerHome from "../Images/headerHome.svg";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const [books, setBooks] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(location.state.email);
    getBookData();
    getUserData();
    document.title = "Home Page | Booklab";
  }, []);

  async function getBookData() {
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
        setLoadingBooks(false);
      });
  }

  async function getUserData() {
    await axios
      .get(`http://localhost:8001/oneuser/${location.state.email}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setError(error);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }
  // wait for axios to get book data, then render book shelves
  // TODO Beautify this
  if (loadingBooks || loadingUser) return <p>Loading...</p>;
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
        <TopBookGrid books={books} user={user}></TopBookGrid>
      </div>
    </div>
  );
};

export default HomePage;

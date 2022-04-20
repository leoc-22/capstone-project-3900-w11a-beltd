import React, { useEffect, useState } from "react";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Loading from "../Components/Loading";

const useStyles = makeStyles({
  main: {
    minHeight: "80vh",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  subtitle: {
    marginTop: "50px",
  },
});

const HomePage = () => {
  const classes = useStyles();
  //const location = useLocation();

  const [books, setBooks] = useState(null);
  //const [user, setUser] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  const [collectionArr, setCollectionArr] = useState([]);

  useEffect(() => {
    getBookData();
    getUserData();
    getCollectionData();
    document.title = "Home | Booklab";
  }, []);

  //get public collections
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

  // get book data
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

  // get user data
  async function getUserData() {
    let userEmail = sessionStorage.getItem("email");
    await axios
      .get("http://localhost:8001/oneuser/" + userEmail)
      .then(() => {
        //setUser(res.data);
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
  if (loadingBooks || loadingUser) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AuthenticatedNavbar />

      <div className={classes.main}>
        <h1>Explore your new favourite books</h1>
        <h2 className={classes.subtitle}>Popular Collections</h2>
        <CollectionsCarousel collections={collectionArr}></CollectionsCarousel>
        <h2 className={classes.subtitle}>Top Books</h2>
        <TopBookGrid books={books}></TopBookGrid>
      </div>
    </div>
  );
};

export default HomePage;

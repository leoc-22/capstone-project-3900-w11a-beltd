import React from "react";
import LandingPageTopBar from "../Components/LandingPageTopBar";
import Header from "../Components/Header";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

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
  test: {},
});

export default function LandingPage() {
  const classes = useStyles();

  // const [popular, setPopular] = React.useState();

  const handleclick = () => {
    // call db to get the books
  };

  return (
    <div>
      <LandingPageTopBar></LandingPageTopBar>

      <div className={classes.main}>
        <Header></Header>
        <h2 className={classes.popularCollections}>Popular Collections</h2>
        <button onClick={() => handleclick()}>Load</button>
        <CollectionsCarousel popular={popular}></CollectionsCarousel>
        <h2 className={classes.TopBooks}>Top Books</h2>
        <TopBookGrid></TopBookGrid>
      </div>
    </div>
  );
}

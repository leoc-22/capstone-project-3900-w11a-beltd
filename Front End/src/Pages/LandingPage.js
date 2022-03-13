import React, { useEffect, useState } from "react";
import LandingPageTopBar from "../Components/LandingPageTopBar";
import Header from "../Components/Header";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";

import { useHistory } from "react-router-dom";
import {
  makeStyles,
  List,
  ListItemIcon,
  ListItemText,
  Grid,
  ListItem,
  IconButton,
} from "@material-ui/core";

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
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <LandingPageTopBar></LandingPageTopBar>

      <div className={classes.main}>
        <Header></Header>
        <h2 className={classes.popularCollections}>Popular Collections</h2>

        <CollectionsCarousel></CollectionsCarousel>
        <h2 className={classes.TopBooks}>Top Books</h2>
        <TopBookGrid></TopBookGrid>
      </div>
    </div>
  );
}

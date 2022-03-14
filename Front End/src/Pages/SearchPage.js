import React, { useEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import CollectionsCarousel from "../Components/CollectionsCarousel";
import TopBookGrid from "../Components/TopBookGrid";
import AuthenicatedTopBar from "../Components/AuthenicatedTopBar";
import TextField from "@mui/material/TextField";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typewriter from "typewriter-effect";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
  serachBarBox: {
    marginLeft: "20%",
    marginTop: "5%",
  },
  serachBar: {
    width: "50%",
  },
  categoryBtn: {
    paddingLeft: "9%",
  },
  Categorybtn: {
    border: "none",
    color: "#404040",
    textTransform: "none",
  },
  searchText: {
    position: "absolute",
    marginTop: "48px",
    marginLeft: "0px",
    fontWeight: "bold",
    fontSize: "26px",
    color: "#404040",
  },
  typer: {
    marginLeft: "135px",
    marginTop: "50px",
    color: "#0097a7",
  },
  reviewFilter: {
    marginLeft: "25px",
    height: "55px",
    marginTop: "20px",
    fontWeight: "bold",
    width: "150px",
    borderColor: "#C1C1C1",
    borderRadius: "3px",
  },
});

const HomePage = (props) => {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0097a7",
      },
    },
  });

  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <AuthenicatedTopBar></AuthenicatedTopBar>

      <div className={classes.serachBarBox}>
        <ButtonGroup color="secondary" theme={theme} variant="text">
          <Button>
            <span class={classes.Categorybtn}>All Categories</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category1</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category2</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category3</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category4</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category5</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category6</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category7</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category8</span>
          </Button>
          <Button>
            <span class={classes.Categorybtn}>Category9</span>
          </Button>
        </ButtonGroup>
        <br></br>
        <div className={classes.searchText}>Search for</div>

        <h2 className={classes.typer}>
          <Typewriter
            options={{
              strings: ["Titles", "Authors", "Topics"],
              autoStart: true,
              loop: true,
              pauseFor: 3000,
            }}
          />
        </h2>
        <TextField
          className={classes.serachBar}
          id="outlined-basic"
          label="Search Books"
          variant="outlined"
          style={{
            width: "50%",
            marginTop: 20,
            marginLeft: "0%",
          }}
        />
        <select className={classes.reviewFilter}>
          <option value="1">All Ratings</option>
          <option value="2">4 - 5 Stars</option>
          <option value="3">3 - 4 Stars</option>
          <option value="4">2 - 3 Stars</option>
          <option value="4">1 - 2 Stars</option>
        </select>
      </div>
      <h2 className={classes.TopBooks}>Top Books</h2>
      <TopBookGrid></TopBookGrid>

      <h2 className={classes.popularCollections}>Top Authors</h2>
      <CollectionsCarousel></CollectionsCarousel>
    </div>
  );
};

export default HomePage;
import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import TextField from "@mui/material/TextField";
import { createTheme } from "@material-ui/core/styles";
import Typewriter from "typewriter-effect";
import { makeStyles } from "@material-ui/core";
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
  serachBarBox: {
    marginLeft: "20%",
    marginTop: "100px",
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
  btnGroup: {
    height: "25px",
    marginTop: "2%",
  },
});

export default function SearchPage() {
  const location = useLocation();

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0097a7",
      },
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.main}>
      <AuthenicatedTopBar user={location.state.user}></AuthenicatedTopBar>

      <div className={classes.serachBarBox}>
        <ButtonGroup
          className={classes.btnGroup}
          color="secondary"
          theme={theme}
          variant="text"
        >
          <Button>
            <span className={classes.Categorybtn}>All Categories</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category1</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category2</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category3</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category4</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category5</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category6</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category7</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category8</span>
          </Button>
          <Button>
            <span className={classes.Categorybtn}>Category9</span>
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
      <h2 className={classes.TopBooks}>search results....</h2>
    </div>
  );
}

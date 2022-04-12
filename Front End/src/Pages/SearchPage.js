import React from "react";
import Button from "@mui/material/Button";
import AuthenticatedTopBar from "../Components/AuthenticatedTopBar";
import TextField from "@mui/material/TextField";
import Typewriter from "typewriter-effect";
import { makeStyles } from "@material-ui/core";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import search from "../Images/search.svg";
import Grid from "@mui/material/Grid";
// import TopBookItem from "../Components/TopBookItem";


const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  header: {
    marginTop: "100px",
  },
  searchType: {
    color: "#FB8C00",
    padding: 0,
    margin: 0,
  },
  searchFor: {
    padding: 0,
    margin: 0,
  },
  headerImg: {
    width: "100%",
  },
});

export default function SearchPage() {
  const classes = useStyles();

  return (
    <div>
      <AuthenticatedTopBar></AuthenticatedTopBar>
      <div className={classes.main}>
        <Grid container spacing={10}>
          <Grid item xs={8} className={classes.header}>
            <h1 className={classes.searchFor}>Search for...</h1>
            <h1 className={classes.searchType}>
              <Typewriter
                options={{
                  strings: ["Titles", "Authors", "Topics"],
                  autoStart: true,
                  loop: true,
                  pauseFor: 3000,
                }}
              />
            </h1>
            <TextField
              id="standard-basic"
              label="Find your next favourite book"
              variant="standard"
              style={{
                width: "100%",
                marginTop: 20,
              }}
            />
            <p style={{ fontSize: "16pt" }}>Filter by:</p>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="5 stars" />
              <FormControlLabel control={<Checkbox />} label="4+ stars" />
              <FormControlLabel control={<Checkbox />} label="3+ stars" />
              <FormControlLabel control={<Checkbox />} label="2+ stars" />
              <FormControlLabel control={<Checkbox />} label="1+ stars" />
            </FormGroup>
            <Button variant="contained" style={{
              marginTop: 20,
            }}>Search</Button>
          </Grid>
          <Grid item xs={4}>
            <img
              className={classes.headerImg}
              src={search}
              alt={"group of people together"}
            />
          </Grid>
        </Grid>
        <br />
        <h2>Results</h2>
        {/* Format results with TopBookItem component */}
      </div>
    </div>
  );
}

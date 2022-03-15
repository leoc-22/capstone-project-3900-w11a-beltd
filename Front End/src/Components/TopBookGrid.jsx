import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import TopBookItem from "./TopBookItem";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  main: {
    marginLeft: "6%",
    marginRight: "7%",
  },
  gridClass: {
    marginTop: "0px",
    minWidth: "15%",
    minHeight: "275px",
  },
});

export default function TopBooksGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem image={props.books[0].image}></TopBookItem>
        </Grid>
        <br></br>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem image={props.books[1].image}></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem image={props.books[2].image}></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem image={props.books[3].image}></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem image={props.books[4].image}></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem image={props.books[5].image}></TopBookItem>
        </Grid>
      </Grid>
    </div>
  );
}
TopBooksGrid.propTypes = {
  books: PropTypes.array,
};

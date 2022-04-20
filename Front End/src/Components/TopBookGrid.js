import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import TopBookItem from "./TopBookItem";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  gridClass: {
    marginTop: "0px",
    minWidth: "15%",
    minHeight: "275px",
  },
});

// main book grid component
export default function TopBooksGrid(props) {
  const classes = useStyles();
  const numBooks = props.books.length;
  return (
    <div className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem
            book={props.books[Math.floor(Math.random() * numBooks)]}
            user={props.user}
          ></TopBookItem>
        </Grid>
        <br></br>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem
            book={props.books[Math.floor(Math.random() * numBooks)]}
            user={props.user}
          ></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem
            book={props.books[Math.floor(Math.random() * numBooks)]}
            user={props.user}
          ></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem
            book={props.books[Math.floor(Math.random() * numBooks)]}
            user={props.user}
          ></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem
            book={props.books[Math.floor(Math.random() * numBooks)]}
            user={props.user}
          ></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem
            book={props.books[Math.floor(Math.random() * numBooks)]}
            user={props.user}
          ></TopBookItem>
        </Grid>
      </Grid>
    </div>
  );
}

TopBooksGrid.propTypes = {
  books: PropTypes.array,
  user: PropTypes.object,
};

import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import TopBookItem from "./TopBookItem";

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

export default function TopBooksGrid() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem></TopBookItem>
        </Grid>
        <br></br>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem></TopBookItem>
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.gridClass}>
          <TopBookItem></TopBookItem>
        </Grid>
      </Grid>
    </div>
  );
}

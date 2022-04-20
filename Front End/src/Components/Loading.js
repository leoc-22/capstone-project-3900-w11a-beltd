import React from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles({
  main: {
    marginTop: "10%",
    marginLeft: "47%",
  },
});

// loading spinner
export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <CircularProgress />
    </div>
  );
}

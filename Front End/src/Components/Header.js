import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  main: {},
  cenralImg: {
    background: "red",
    backgroundColor: "rgb(214, 214, 214)",
    minHeight: "300px",
    marginTop: "100px",
    marginLeft: "10%",
    borderRadius: "10px",
    width: "80%",
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.cenralImg}></div>
    </div>
  );
}

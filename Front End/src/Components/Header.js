import React, { useEffect, useState } from "react";
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
import { height } from "@mui/system";
import Button from "@mui/material/Button";

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
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.cenralImg}></div>
    </div>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const useStyles = makeStyles({ 
  appBar: {
    background: "#F3F3F3",
    height: 50,
    verticalAlign: "baseline",
    borderBottom: "0.7px solid #00B3AB",
  },
  Name: {
    marginLeft: "5%",
    marginTop: "0%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  appBarBtn: {
    marginTop: "-0.5%",
    color: "black",
    marginLeft: 5,
    width: 150,
    height: 30,
    borderRadius: 10,
    fontSize: "meidum",
    //background:"white",
    background: "transparent",
    border: "none",
    "&:hover": {
      color: "#E97400",
      cursor: "pointer",
    },
  },

  loginBtn: {
    width: 150,
    height: 40,
    borderRadius: 10,
    fontSize: "large",
    marginTop: "5%",
    background: "transparent",
    fontWeight: "bold",
    borderWidth: "thin",
    borderColor: "#00C9D8",
    "&:hover": {
      //color: "#00C9D8",
      cursor: "pointer",
    },
  },
});

export default function LoginTopBar() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiAppBar class={classes.appBar} position="sticky">
        <Toolbar>
          <h3 className={classes.Name} onClick={() => history.push("/")}>
            BookLab
          </h3>
          <Button
            disableRipple
            class={classes.appBarBtn}
            onClick={() => history.push("/search")}
          >
            Explore
          </Button>

          <Button
            disableRipple
            class={classes.appBarBtn}
            onClick={() => history.push("/")}
          >
            Recommended for you
          </Button>

          <Button
            disableRipple
            class={classes.appBarBtn}
            onClick={() => history.push("/")}
          >
            Book Store
          </Button>

          <Button
            disableRipple
            class={classes.appBarBtn}
            onClick={() => history.push("/")}
          >
            LeaderBoard
          </Button>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
}

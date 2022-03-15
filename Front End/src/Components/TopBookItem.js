import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  main: {
    height: "160px",
  },
  img: {
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  bookTitle: {
    marginTop: "0%",
  },
  addCollectionBtn: {
    marginLeft: "0px",
    width: "100%",
    height: 40,
    borderRadius: 10,
    fontSize: "small",
    marginTop: "5%",
    background: "transparent",
    borderWidth: "thin",
    borderColor: "#00C9D8",
    "&:hover": {
      //color: "#00C9D8",
      cursor: "pointer",
    },
  },
});

export default function TopBookItem(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.main}>
      <img
        onClick={() => history.push("")}
        className={classes.img}
        src={
          props.book.image == undefined ? "PlaceHolder.png" : props.book.image
        }
      />
      <div>
        <span className="bookTitle">
          <b>{props.book.title}</b>
        </span>
        <br></br>
        <span className="bookTitle">{props.book.authors}</span>
      </div>
      <Button
        disableRipple
        class={classes.addCollectionBtn}
        onClick={() => history.push("/")}
      >
        Add to Collection
      </Button>

      <br></br>
    </div>
  );
}
TopBookItem.propTypes = {
  book: PropTypes.object,
};

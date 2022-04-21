import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  main: {
    minHeight: "500px",
    height: "510px",
  },
  img: {
    borderRadius: "8px",
    width: "100%",
    height: "275px",
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
    borderRadius: "8px",
    fontSize: "small",
    marginTop: "5%",
    background: "transparent",
    borderWidth: "thin",
    borderColor: "#00C9D8",
    "&:hover": {
      cursor: "pointer",
    },
  },
  bookData: {
    minHeight: "70px",
  },
});

// small book component
export default function TopBookItem(props) {
  const classes = useStyles();
  const history = useHistory();

  function routeUser() {
    if (sessionStorage.getItem("email") == null) {
      history.push("/login");
    } else {
      history.push("/book-profile" + "?" + props["book"]["_id"]);
    }
  }

  return (
    <div className={classes.main}>
      <img
        onClick={() => routeUser()}
        className={classes.img}
        src={
          props.book.image === undefined ? "PlaceHolder.png" : props.book.image
        }
      />
      <div className={classes.bookData}>
        <span className="bookTitle">
          <b>{props.book.title}</b>
        </span>
        <br />
        <div className="bookTitle">{props.book.authors}</div>
        <div className="bookTitle">{"Rating: " + props.book.rating}</div>
      </div>
    </div>
  );
}
TopBookItem.propTypes = {
  book: PropTypes.object,
};

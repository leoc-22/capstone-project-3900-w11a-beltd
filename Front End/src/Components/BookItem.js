/* eslint-disable */ 

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";
import { minHeight } from "@mui/system";

const useStyles = makeStyles({
  main: {
    height: "500px",
    marginLeft : "20px",
    Width : "200px",

  },
  bookImg : {
    borderRadius: "8px",
    height: "275px",
    width: "200px",
    minWidth : "180px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  Titletext : {
    maxWidth : "200px",
    fontWeight : "700"
  },
  text : {
    maxWidth : "200px",

  }
});


const BookItem = (props) => {
  const classes = useStyles();
  const history = useHistory();


  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [bookImg, setImg] = useState(null);

  let bookId = props.data;

  useEffect(() => {
    getBook();
  }, []);

  async function getBook(){
    let res = await axios({
      url : "http://localhost:8002/books"
    }) 
    for (let i =0; i < res.data.length; i++){
      if (res.data[i]._id == bookId){
        setTitle(res.data[i].title);
        setAuthor(res.data[i].authors);
        setImg(res.data[i].image);
        return;
      }
    }
  }

  function routeUser() {
    if (sessionStorage.getItem("id") != null){
      history.push("/book-profile" + "?" + bookId);
    } else {
      history.push("/Public-book-profile" + "?" + bookId);
    }
  }

  return (
    <div className={classes.main}>
      <img className={classes.bookImg} 
      src = {bookImg} 
      onClick={() => routeUser()}
      alt = "book Image"></img>
      <div className={classes.Titletext}>{title}</div>
      <div className={classes.text}>{author}</div>
    </div>

  );
}

export default BookItem;

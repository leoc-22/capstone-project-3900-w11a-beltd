import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BookItem from "../Components/BookItem";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Chip from "@mui/material/Chip";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "10px",
  },
  modalBox: {
    marginLeft: "25%",
    marginTop: "10%",
    minHeight: "250px",
    width: "50%",
    backgroundColor: "white",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "20px",
  },
  modalContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  closeIcon: {
    marginLeft: "90%",
    marginTop: "5px",
    border: "transparent",
    background: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
  },
  alert: {
    marginLeft: "20%",
    width: "60%",
    marginTop: "20px",
  },
  bookListItem: {
    marginTop: "30px",
  },
  divider: {
    minWidth: "40px",
  },
});

const UnAthuedCollectionDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [books, setBooks] = useState([]);

  const [collectionName, setCollectionName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    getData();
    document.title = "Collection details | Booklab";
  }, [isPublic]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const collectionId = urlParams.get("id");

  // get collection data
  async function getData() {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections",
    });

    let targetCollection;
    for (let i = 0; i < res.data.length; i++) {
      if (collectionId == res.data[i]._id) {
        targetCollection = res.data[i];
        break;
      }
    }
    setIsPublic(targetCollection.public);
    setCollectionName(targetCollection.name);
    setBooks(targetCollection.books);

    let bookIds = targetCollection.books;
    let bookTtl = [];
    let res2 = await axios({
      method: "get",
      url: "http://localhost:8002/books",
    });

    for (let i = 0; i < bookIds.length; i++) {
      for (let j = 0; j < res2.data.length; j++) {
        if (bookIds[i] == res2.data[j]._id) {
          bookTtl.push({ title: res2.data[j].title, id: res2.data[j]._id });
        }
      }
    }
    await getCreator();
    setLoading(false);
  }

  // get the collection creator
  async function getCreator() {
    let res = await axios({
      url: "http://localhost:8001/users",
    });
    let userCol;

    for (let i = 0; i < res.data.length; i++) {
      userCol = res.data[i].collections;
      for (let j = 0; j < userCol.length; j++) {
        if (collectionId == userCol[j]) {
          setOwner(res.data[i].name);
          setOwnerId(res.data[i]._id);
          return;
        }
      }
    }
    return 0;
  }

  function routeUser() {
    if (sessionStorage.getItem("id") == null) {
      history.push("/login");
    } else {
      history.push("PublicProfiles?id=" + ownerId);
    }
  }

  if (loading) return <></>;

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.main}>
        <h2>{collectionName} collection</h2>
        <div className={classes.divider}>
          {"Created By "}
          <Chip
            label={" " + owner}
            variant="outlined"
            onClick={() => routeUser()}
          />
        </div>
        <br />
        <Grid container spacing={6}>
          {books.map((book, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className={classes.gridClass}
              key={index}
            >
              <BookItem data={book}>ef</BookItem>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default UnAthuedCollectionDetailPage;

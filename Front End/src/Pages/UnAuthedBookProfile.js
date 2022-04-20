import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "100px auto",
  },
  image: {
    width: "100%",
  },
  bookImage: {
    width: "100%",
    borderRadius: "5px",
  },
  reviewBar: {
    padding: "10px",
    marginBottom: "20px",
  },
  reviewDiv: {
    marginTop: "20px",
  },
  gridClass: {
    marginTop: "0px",
    minWidth: "15%",
    minHeight: "275px",
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
  reviewUser: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  modalBox: {
    marginLeft: "25%",
    marginTop: "10%",
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
  collectionsDiv: {
    alignItems: "center",
    textAlign: "center",
  },
  alert: {
    marginLeft: "20%",
    width: "60%",
  },
});

const UnAuthedBookProfile = () => {
  // const location = useLocation();

  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [bookImg, setImg] = useState(null);
  const [amzLink, setAmzLink] = useState(null);
  const [bookRating, setBookRating] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [bookReviews, setBookReviews] = useState([]);
  const [changed, setChanged] = useState(0);
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const queryString = window.location.search.slice(1);
  //console.log(queryString);

  useEffect(() => {
    document.title = "Book profile | Booklab";
    getData();
  }, [changed]);

  async function getData() {
    let userEmail = sessionStorage.getItem("email");

    await axios
      .get("http://localhost:8002/books")
      .then((res) => {
        getTargetBook(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

    let res = await axios.get("http://localhost:8001/oneuser/" + userEmail);

    let myCol = res.data.collections;

    let res1 = await axios({
      url: "http://localhost:8001/myCollections",
      data: {
        user: sessionStorage.getItem("id"),
      },
    });

    let tmp = [];
    for (let i = 0; i < myCol.length; i++) {
      for (let j = 0; j < res1.data.length; j++) {
        if (myCol[i] == res1.data[j]._id) {
          tmp.push({ id: myCol[i], name: res1.data[j].name });
          break;
        }
      }
    }
    console.log(tmp);
  }

  function getTargetBook(res) {
    for (let i = 0; i < res.length; i++) {
      if (res[i]["_id"] == queryString) {
        setTitle(res[i]["title"]);
        setAuthor(res[i]["authors"]);
        setImg(res[i]["image"]);
        setAmzLink(res[i]["link"]);
        setBookRating("Rating: " + res[i]["rating"]);
        getReviews(res[i]["title"]);
        setCategory(res[i].categories[0].name);
        if (changed == 0) {
          getSimilarBooks(res[i].categories[0].id);
        }
        return;
      }
    }
  }

  function amzPage() {
    window.open(amzLink, "_blank").focus();
  }

  async function getReviews(bookTitle) {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/review",
    });
    //console.log(res.data);
    let curBookReviews = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].title == bookTitle) {
        curBookReviews.push(res.data[i]);
      }
    }
    setBookReviews(curBookReviews);
  }

  async function markRead() {
    let userEmail = sessionStorage.getItem("email");
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/oneuser/" + userEmail,
    });
    let myGoals = res.data.goals;

    let allGoals = await axios({
      method: "get",
      url: "http://localhost:8001/myGoals",
    });
    let allMygoals = [];

    for (let i = 0; i < allGoals.data.length; i++) {
      let curGoal = allGoals.data[i]["_id"];
      for (let j = 0; j < myGoals.length; j++) {
        if (myGoals[j] == curGoal) {
          allMygoals.push(allGoals.data[i]);
        }
      }
    }
    for (let i = 0; i < allMygoals.length; i++) {
      advanceGoal(allMygoals[i]);
    }

    let tmp = changed;
    tmp += 1;
    setChanged(tmp);
  }

  async function advanceGoal(goalId) {
    await axios({
      method: "patch",
      url: "http://localhost:8001/goal",
      data: {
        _id: goalId,
      },
    });
    return;
  }

  async function getSimilarBooks(categoryId) {
    let res = await axios({
      method: "get",
      url: "http://localhost:8002/similar/" + categoryId,
    });

    let tmp = [];
    let start = Math.floor(Math.random() * (res.data.length - 6 + 1) + 0);
    let maxsize = res.data.length;
    for (let i = 0; i < res.data.length; i++) {
      if (i == 6 || i == maxsize) {
        break;
      }
      tmp.push(res.data[start + i]);
    }
    setBooks(tmp);
    return;
  }

  function routeUser(targetBook) {
    const bookId = targetBook.item._id;
    history.push("/Public-book-profile" + "?" + bookId);
    location.reload();
  }

  function goToProfile() {
    history.push("/login");
  }

  function handleModal() {
    if (openModal == false) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }

  if (changed == 0) {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <img
              src={bookImg}
              alt="two people standing"
              className={classes.bookImage}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <h1>{title}</h1>
            <h2>by {author}</h2>
            <Button
              disabled
              onClick={() => handleModal()}
              variant="outlined"
              sx={{ marginRight: "16px", marginBottom: "20px" }}
            >
              Add to collection
            </Button>
            <Button
              disabled
              variant="contained"
              sx={{ marginRight: "16px", marginBottom: "20px" }}
              onClick={() => markRead()}
            >
              Mark as read
            </Button>
            <br />
            <Chip label={category} sx={{ marginRight: "16px" }} />
            <br />
            <Stack direction="row" alignItems="center" spacing={2}>
              <p>Publisher</p>
              <p>Publication date</p>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <p>{bookRating}</p>
            </Stack>
          </Grid>
        </Grid>
        <h2 className={classes.h2}>Compare pricing</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Amazon
                </Typography>
                {/* <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  $0.00
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => amzPage()}>
                  View on Amazon
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Source
                </Typography>
                {/* <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  $0.00
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small">purchase this book</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Source
                </Typography>
                {/* <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  $0.00
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small">purchase this book</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <br />
        <h2 className={classes.h2}>{"Other " + category + " books"}</h2>
        <Grid container spacing={2}>
          {books.map((item, index) => (
            <Grid
              key={index}
              item
              xs={4}
              sm={3}
              md={2}
              className={classes.gridClass}
            >
              <img
                key={item._id}
                onClick={() => routeUser({ item })}
                className={classes.img}
                src={item.image}
              />
              <div className={classes.bookData}>
                <span className="bookTitle">
                  <b>{item.title}</b>
                </span>
                <br></br>
                <span className="bookTitle">{item.authors}</span>
              </div>
              <br></br>
            </Grid>
          ))}
        </Grid>

        <h2>Login to write a review</h2>

        <br />
        <h2>Community reviews</h2>
        {bookReviews.map((rev, index) => (
          <div key={index} className={classes.reviewDiv}>
            <Card sx={{ width: "60%" }}>
              <CardContent>
                {/* Add user, date, rating */}
                <Rating name="read-only" value={rev.rating} readOnly />
                <Typography variant="body2">{rev.review}</Typography>
                <br />

                <Typography
                  className={classes.reviewUser}
                  variant="body2"
                  onClick={() => goToProfile()}
                >
                  <b>{rev.name}</b> {rev.date}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnAuthedBookProfile;

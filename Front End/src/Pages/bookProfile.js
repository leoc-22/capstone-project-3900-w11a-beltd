import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

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

const CollectionsBtn = styled(Button)(() => ({
  textTransform: "none",
  maxHeight: "50px",
  "&:hover": {
    cursor: "pointer",
  },
}));

const bookProfilePage = () => {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [bookImg, setImg] = useState(null);
  const [rating, setRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [bookRating, setBookRating] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [bookReviews, setBookReviews] = useState([]);
  const [changed, setChanged] = useState(0);
  const [category, setCategory] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [amzPrice, setAmzPrice] = useState(null);
  const [amzLink, setAmzLink] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [categoryId, setCategoryId] = useState(null);
  const [books, setBooks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [goalsArr, setGoalsArr] = useState([]);
  const [hideSuccessAlert, setHideSuccessAlert] = useState(true);
  const [targetCollection, setTargetCollection] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [numTimesRead, setNumTimesRead] = useState(0);
  const [numColleThisIn, setNumColleThisIn] = useState(0);
  const [ebayPrice, setEbayPrice] = useState(0);
  const [ebayLink, setEbayLink] = useState(null);

  const classes = useStyles();
  const history = useHistory();

  const queryString = window.location.search.slice(1);

  const eBayToken =
    "v^1.1#i^1#f^0#p^1#I^3#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTudttqxQIKIhBi1gEjqc7sPHZ2dwZ247aldqG0y24p0IA4jzvt2Hkxd5ZSfKT2BwQMJiovi0B5GDVKECMYjRH9YwgmYiAkvIwYooIPHgrBqIne2V3KthJe3cQm7p/NnHvuud/33XPui+wqK69cVrfscoXnjuLeLrKr2OOhhpHlZaWPDPcWjy8tIvMcPL1dk7pKur2np0JB1yw+CaBlGhD4luiaAfmMMYKlbYM3BahC3hB0AHlH4lOxmfU8TZC8ZZuOKZka5ovXRLAwyypA4kIhkQ5SkhxEVuNKzCYzgoVkRRFpTuEkTuQAS6F2CNMgbkBHMJwIRpM0jZMBnOKaKJoPsDwTIFgq2IL5moENVdNALgSJRTNw+UxfOw/r9aEKEALbQUGwaDxWm2qMxWumNTRN9efFiuZ0SDmCk4b9v6pNGfiaBS0Nrj8MzHjzqbQkAQgxfzQ7Qv+gfOwKmNuAn5VaIeUQQwlhiSEDFEMXRMpa09YF5/o4XIsq40rGlQeGozqdN1IUqSE+BSQn99WAQsRrfO7frLSgqYoK7Ag2rSo2L5ZIYNF6YFYLJl5lmu2aIOKJZA0eojmaFbkgicuhIKOIVCg3SjZUTuMBw1Sbhqy6ikFfg+lUAQQZDBSGyRMGOTUajXZMcVw4+X6BnICBENfizmh2CtNOm+FOKtCRCr7M543l7+vtOLYqph3QF2FgQ0afCCZYlipjAxsziZjLnSUwgrU5jsX7/R0dHUQHQ5h2q58mSco/d2Z9SmoDuoBlfd1aR/7qjTvgaoaKBFBPqPJOp4WwLEGJigAYrVg0wIZJhs3p3h9WdKD1X4Y8zv7+5VCo8hACqD7ClBIMUQIjhNhClEc0l6F+FwcQhU5cF+x24FiaIAFcQnmW1oGtyiipFJoJKwCXg5yCBzhFwUVWDuKUAgAJgChKXPh/UyU3m+cpINnAKVSiFybJk/Wz1do5tfVUCIZMLhlf3M7Om5tIteqBpGgH5TBTZZKLppm1ghWO3GwpXJN8taYiZZrQ+IUTwK31QohQZ0IHyIOil5JMCyRMTZU6h9YEM7acEGynMwU0DRkGRTJmWfGCLdSFoXcra8TtkS7o7vRf7EzXZAXdfB1arNz+EAUQLJVw9x5CMnW/KaBDh2tya31hBvWgeKvowDqkWCOSWbaqnD1pEhnKBFwsETaAZtpGh2yi0T17NZntwECbmWObmgbsZmrQxazraUcQNTDUqroACa4KQ2ynpYIsyYRohgkMipeU2UcXDrUlqaDrcMmUWzhN+/tf7KNFmR/V7dlNdnt2FXs8pJ98iJpIPljmnV3ivXs8VB1AqIJCQLXVQPdVGxDtoNMSVLu4zPPcTH7W4bynhN4F5Ni+x4RyLzUs72WBnHC1pZQacX8FTaN7KkfRAZYJtJATr7aWUGNKRm882jPptRl3rkgtvW/v6z1/rZgAH9tHVvQ5eTylRSXdnqInVh48ov8x8ui9w2v2nRHfOLxpsnRy9ysLlq9/yf7mg1963m85VOv3bx91z6X937c0rj6XwN48f2L/w4+//PayDytXbYv3PHoivXKyvmdR6s+fT6/YeuH4yOSeH5/B09WrnlQXnyj/7cCatb1lB+bM//Ww1Xzq+BFyke/kVtE6twlsOzZ5byVXN33333aQTU0fu/TpS2Fy/urf79p5OXXx4+ZjiV0vnLn83vKNTPKThlGfhz9auyc27osFL1I1myeWT/3h1BrrYPUDoz9dN87bs+Hsjikj2yZVPHvhyIZDn9V/1/LliEPt75a+ev58o7Gu8h1i+7quGVvK1zd8u/Gnr8du2Xxgx84ddW9dvPhVj/f5MfBsdvr+Ad3TpD3kEQAA";

  const handleClose = () => setOpenModal(false);

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
    setCollections(tmp);
  }

  function getTargetBook(res) {
    for (let i = 0; i < res.length; i++) {
      if (res[i]["_id"] == queryString) {
        setTitle(res[i]["title"]);
        setAuthor(res[i]["authors"]);
        setImg(res[i]["image"]);
        setBookRating("Rating: " + res[i]["rating"]);
        getReviews(res[i]["title"]);
        setCategory(res[i].categories[0].name);
        setCategoryId(res[i].categories[0].id);
        setBookId(res[i]["_id"]);
        setAmzPrice(res[i]["price"]["value"]);
        setAmzLink(res[i]["price"]["link"]);
        if (changed == 0) {
          getSimilarBooks(res[i].categories[0].id);
        }
        handleStats(res[i]["_id"]);
        handleEBay(res[i]["title"]);
        return;
      }
    }
  }

  async function handleStats(bookId) {
    await axios
      .get(`http://localhost:8001/numoftimesread/${bookId}`)
      .then((res) => {
        setNumTimesRead(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:8001/numofcolle/${bookId}`)
      .then((res) => {
        setNumColleThisIn(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleEBay(title) {
    await axios({
      method: "get",
      url: `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${title}&limit=1`,
      headers: {
        Authorization: "Bearer " + eBayToken,
        "Content-Type": "application / json",
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_AU",
        "X-EBAY-C-ENDUSERCTX":
          "affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>",
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.itemSummaries.length != 0) {
          setEbayPrice(res.data.itemSummaries[0].price.value);
          setEbayLink(res.data.itemSummaries[0].itemWebUrl);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function submitReview() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let dateString = dd + "/" + mm + "/" + yyyy;
    let newRating = rating;
    if (newRating == null) {
      newRating = 0;
    }
    await axios({
      method: "post",
      url: "http://localhost:8001/review",
      data: {
        user: sessionStorage.getItem("id"),
        name: sessionStorage.getItem("name"),
        date: dateString,
        rating: newRating,
        title: title,
        review: document.getElementById("myReview").value,
      },
    });
    document.getElementById("myReview").value = "";
    let tmp = changed;
    tmp += 1;
    setChanged(tmp);
    return;
  }

  async function getReviews(bookTitle) {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/review",
    });
    let curBookReviews = [];
    let averageRating = 0;

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].title == bookTitle) {
        curBookReviews.push(res.data[i]);
        averageRating += res.data[i].rating;
      }
    }
    if (curBookReviews.length == 0) {
      averageRating = "No reviews Yet";
    } else {
      averageRating = averageRating / curBookReviews.length;
      averageRating = averageRating.toFixed(1);
    }
    setAverageRating(averageRating);
    setBookReviews(curBookReviews);
  }

  async function markRead(bookId) {
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
    setGoalsArr(allMygoals);

    for (let i = 0; i < allMygoals.length; i++) {
      advanceGoal(allMygoals[i]._id);
    }

    let tmp = changed;
    tmp += 1;
    setChanged(tmp);

    await axios({
      method: "patch",
      url: "http://localhost:8001/markasread",
      data: {
        b_id: bookId,
        username: sessionStorage.getItem("name"),
      },
    })
      .then((res) => {
        if (res) {
          setIsRead(true);
        }
      })
      .catch((error) => {
        setIsRead(false);
        console.log(error);
      });
  }

  async function advanceGoal(goalId) {
    let allGoals = await axios({
      method: "get",
      url: "http://localhost:8001/myGoals",
    });
    let curGoal;
    for (let i = 0; i < allGoals.data.length; i++) {
      if (allGoals.data[i]["_id"] == goalId) {
        curGoal = allGoals.data[i];
        break;
      }
    }
    if (curGoal.current + 1 >= curGoal.target) {
      await axios({
        method: "patch",
        url: "http://localhost:8001/goalComplete",
        data: {
          _id: goalId,
        },
      });

      if (curGoal.current + 1 == curGoal.target) {
        await axios({
          method: "patch",
          url: "http://localhost:8001/goal",
          data: {
            _id: goalId,
          },
        });
      }
      return;
    } else {
      await axios({
        method: "patch",
        url: "http://localhost:8001/goal",
        data: {
          _id: goalId,
        },
      });
    }
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
    history.push("/book-profile" + "?" + bookId);
    location.reload();
  }

  function goToProfile(userId) {
    history.push("PublicProfiles?id=" + userId);
  }

  function handleModal() {
    if (openModal == false) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }

  async function addToCollection(id) {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections",
      data: {
        _id: id,
      },
    });

    let targetCollection;
    for (let i = 0; i < res.data.length; i++) {
      let colId = res.data[i]["_id"];
      if (colId == id) {
        targetCollection = res.data[i];
      }
    }
    setTargetCollection(targetCollection.name);
    setHideSuccessAlert(false);
    for (let j = 0; j <= targetCollection.books.length; j++) {
      if (queryString == targetCollection.books[j]) {
        return;
      }
    }

    await axios({
      method: "post",
      url: "http://localhost:8001/addBook",
      data: {
        bookid: queryString,
        _id: id,
      },
    });
    console.log("added to collection");
  }

  if (changed == 0) {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <AuthenticatedNavbar />
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
              onClick={() => handleModal()}
              variant="outlined"
              sx={{ marginRight: "16px", marginBottom: "20px" }}
            >
              Add to collection
            </Button>
            <Button
              variant="contained"
              sx={{ marginRight: "16px", marginBottom: "20px" }}
              onClick={() => markRead(bookId)}
            >
              {isRead ? "Read" : "Mark as Read"}
            </Button>
            <br />
            <Chip
              label={category}
              sx={{ marginRight: "16px", marginBottom: "20px" }}
            />
            <br />
            <Chip label={bookRating} sx={{ marginRight: "16px" }} />
            <Chip
              label={
                "Number of times this book is read by people: " + numTimesRead
              }
              sx={{ marginRight: "16px" }}
            />
            <Chip
              label={"Number of collections this book is in: " + numColleThisIn}
              sx={{ marginRight: "16px" }}
            />
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
                <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  Price: ${amzPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    window.open(amzLink, "_blank").focus();
                  }}
                >
                  View on Amazon
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  eBay
                </Typography>
                <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                >
                  Price: ${ebayPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    ebayLink != null
                      ? window.open(ebayLink, "_blank").focus()
                      : null;
                  }}
                >
                  View on eBay
                </Button>
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

        <h2>Write a review</h2>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
            setChanged(1);
          }}
        />
        <br />
        <TextField
          className={classes.reviewBar}
          id="myReview"
          label="Review"
          variant="standard"
          style={{
            width: "60%",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: "0%",
          }}
        />
        <br />
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class={classes.modalBox}>
            <Button
              class={classes.closeIcon}
              onClick={() => handleClose()}
              disableRipple
            >
              <CloseIcon></CloseIcon>
            </Button>
            <h1 className={classes.newGameTitle}>Add To Your Collection</h1>
            <div hidden={hideSuccessAlert}>
              <Alert className={classes.alert} severity="success">
                {"Added to " + targetCollection}
              </Alert>
            </div>
            <div className={classes.collectionsDiv}>
              {collections.map((item, index) => (
                <div key={index}>
                  <CollectionsBtn onClick={() => addToCollection(item.id)}>
                    <h3>{item.name}</h3>
                  </CollectionsBtn>
                </div>
              ))}
            </div>
            <br></br>
          </Box>
        </Modal>

        <Button variant="contained" onClick={() => submitReview()}>
          submit review
        </Button>
        <br />
        <br />
        <h2>Community reviews</h2>
        <div>{"Average Community Rating: " + averageRating}</div>
        {bookReviews.map((rev, index) => (
          <div key={index} className={classes.reviewDiv}>
            <Card sx={{ width: "60%" }}>
              <CardContent>
                <Rating name="read-only" value={rev.rating} readOnly />
                <Typography variant="body2">{rev.review}</Typography>
                <br />
                <Typography className={classes.reviewUser} variant="body2">
                  <Chip
                    label={rev.name}
                    sx={{ marginRight: "16px" }}
                    variant="outlined"
                    onClick={() => goToProfile(rev.user)}
                  />
                  {rev.date}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default bookProfilePage;

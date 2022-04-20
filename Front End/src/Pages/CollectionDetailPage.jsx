import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import Loading from "../Components/Loading";

import BookItem from "../Components/BookItem";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";

const WarningBtn = styled(Button)(() => ({
  marginLeft: "50px",
  color: "#ff8000",
  background: "transparent",
  borderRadius: "0px",
  "&:hover": {
    background: "transparent",
    cursor: "pointer",
    borderBottom: "1px solid #ff8000",
  },
}));

const CollectionsBtn = styled(Button)(() => ({
  textTransform: "none",
  maxHeight: "50px",
  "&:hover": {
    cursor: "pointer",
  },
}));

const DeleteBtn = styled(Button)(() => ({
  marginLeft: "50px",
  color: "#ff0000",
  background: "transparent",
  borderRadius: "0px",
  "&:hover": {
    background: "transparent",
    cursor: "pointer",
    borderBottom: "1px solid #ff0000",
  },
}));

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

const CollectionDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [bookTitles, setBookTitles] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPublicOpposite, setIsPublicOpposite] = useState("");
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [owner, setOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [ShowBookModal, setShowBookModal] = useState(false);
  const [removedBook, setRemovedBook] = useState(0);

  useEffect(() => {
    getData();
    document.title = "Collection details | Booklab";
  }, [isPublic, removedBook]);

  const handleClose = () => setShowPublicModal(false);
  const handleCloseDelModal = () => setShowDelModal(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const collectionId = urlParams.get("id");

  // get collection detail
  async function getData() {
    let userEmail = sessionStorage.getItem("email");
    let myCols = await axios({
      method: "get",
      url: "http://localhost:8001/oneuser/" + userEmail,
    });
    setShowEditOptions(false);
    for (let i = 0; i < myCols.data.collections.length; i++) {
      if (collectionId == myCols.data.collections[i]) {
        setShowEditOptions(true);
        break;
      }
    }
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
    if (targetCollection.public == true) {
      setIsPublicOpposite("Private");
    } else {
      setIsPublicOpposite("Public");
    }
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
    setBookTitles(bookTtl);
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

  function handleCheck() {
    setShowPublicModal(true);
  }

  // set collection to public or private
  async function makePublicOrPrivate() {
    if (isPublic == true) {
      await axios({
        method: "patch",
        url: "http://localhost:8001/collectionPriv",
        data: {
          _id: collectionId,
        },
      });
      setIsPublic(false);
      setIsPublicOpposite(true);
    } else {
      await axios({
        method: "patch",
        url: "http://localhost:8001/collectionPub",
        data: {
          _id: collectionId,
        },
      });
      setIsPublic(true);
      setIsPublicOpposite(false);
    }
    handleClose();
  }

  // delete a collection
  async function deleteCollection() {
    await axios({
      method: "delete",
      url: "http://localhost:8001/collection",
      data: {
        c_id: collectionId,
      },
    });
    history.push("/collections");
  }

  //remove a book from a collection
  async function removebook(val) {
    await axios({
      method: "delete",
      url: "http://localhost:8001/removeBook",
      data: {
        c_id: collectionId,
        b_id: val,
      },
    });
    setRemovedBook(removedBook + 1);
    setShowBookModal(false);
    setLoading(true);
  }

  function routeUser() {
    history.push("PublicProfiles?id=" + ownerId);
  }

  if (loading) return <Loading />;

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <div hidden={!showEditOptions}>
          Public
          <Checkbox
            checked={isPublic}
            onClick={() => handleCheck()}
            style={{
              margin: "10px 0",
            }}
          />
          <WarningBtn onClick={() => setShowBookModal(true)}>
            Remove Book
          </WarningBtn>
          <DeleteBtn onClick={() => setShowDelModal(true)}>
            Delete Collection
          </DeleteBtn>
        </div>
        <Modal
          open={showPublicModal}
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
            <div>
              <h2>Make this Collection {isPublicOpposite}?</h2>
              <Button variant="outlined" onClick={() => makePublicOrPrivate()}>
                Yes
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() => handleClose()}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={showDelModal}
          onClose={handleCloseDelModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class={classes.modalBox}>
            <Button
              class={classes.closeIcon}
              onClick={() => handleCloseDelModal()}
              disableRipple
            >
              <CloseIcon></CloseIcon>
            </Button>
            <div>
              <h2>Delete this Collection</h2>
              <Button variant="outlined" onClick={() => deleteCollection()}>
                Yes
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() => handleCloseDelModal()}
              >
                No
              </Button>
              <Alert className={classes.alert} severity="warning">
                This procedure cannot be un-done
              </Alert>
            </div>
          </Box>
        </Modal>

        <Modal
          open={ShowBookModal}
          //onClose={handleCloseDelModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class={classes.modalBox}>
            <Button
              class={classes.closeIcon}
              onClick={() => setShowBookModal(false)}
              disableRipple
            >
              <CloseIcon></CloseIcon>
            </Button>
            <div>
              <h2>Remove Book from this Collection</h2>
              {bookTitles.map((book, index) => (
                <div className={classes.bookListItem} key={index}>
                  <CollectionsBtn onClick={() => removebook(book.id)}>
                    <h3>{book.title}</h3>
                  </CollectionsBtn>
                </div>
              ))}
            </div>
          </Box>
        </Modal>

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
              <BookItem data={book} index={index + 1}>
                ef
              </BookItem>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CollectionDetailPage;

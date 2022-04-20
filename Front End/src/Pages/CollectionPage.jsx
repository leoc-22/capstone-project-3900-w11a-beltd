import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AdjustedCollections from "../Components/AdjustedCollections";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles({
  main: {
    minHeight: "80vh",
    minWidth: "500px",
    width: "80%",
    marginLeft: "10%",
    marginTop: "60px",
    margin: "0 auto",
  },
  subtitle: {
    marginTop: "50px",
  },
  success: {
    marginBottom: "20px",
  },
  error: {
    marginBottom: "20px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "400px",
    boxShadow: 24,
    p: 4,
    padding: 40,
  },

  searchCollectionBtn: {
    marginLeft: "20px",
    display: "inline",
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
  centerDiv: {
    alignItems: "center",
  },
  collectionResults: {
    marginLeft: "10%",
    width: "80%",
    marginTop: "20px",
    borderRadius: "10px",
    minHeight: "80px",
    backgroundColor: "rgb(229, 229, 229)",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default function CollectionPage() {
  const classes = useStyles();
  const history = useHistory();
  const [collectionArr, setCollectionArr] = useState([]);
  const [myCollections, setMyCollections] = useState([]);
  const [newCollection, setNewCollection] = useState(0);
  const [collectionPublic, setPublic] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [publicCollectionRes, setPublicCollectionRes] = useState([]);

  const [openPublicSearch, setOpenPublicSearch] = useState(false);
  const [openUserSearch, setOpenUserSearch] = useState(false);

  useEffect(() => {
    getCollectionData();
    document.title = "Collections | Booklab";
  }, [newCollection]);

  function handleUserSearchOpen() {
    setOpenUserSearch(true);
    setPublicCollectionRes([]);
  }

  function handlePublicSearchOpen() {
    setOpenPublicSearch(true);
    setPublicCollectionRes([]);
  }

  // get collection data
  async function getCollectionData() {
    let userEmail = sessionStorage.getItem("email");
    let userData = await axios({
      method: "get",
      url: "http://localhost:8001/oneuser/" + userEmail,
    });
    let myCollectionsIds = userData.data.collections;

    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections",
    });

    let allCollections = res.data;
    let allMycollection = [];
    let publicCollections = [];

    for (let i = 0; i < myCollectionsIds.length; i++) {
      let curId = myCollectionsIds[i];
      for (let j = 0; j < allCollections.length; j++) {
        if (
          curId == allCollections[j]._id &&
          allCollections[j].public == false
        ) {
          allCollections[j].public = "Private";
          allMycollection.push(allCollections[j]);
        } else if (curId == allCollections[j]._id) {
          allCollections[j].public = "Public";
          allMycollection.push(allCollections[j]);
        } else if (allCollections[j].public == true) {
          allCollections[j].public = "Public";
          publicCollections.push(allCollections[j]);
        }
      }
    }
    setMyCollections(allMycollection);
    setCollectionArr(publicCollections);
  }

  function handlePublic() {
    if (collectionPublic == false) {
      setPublic(true);
    } else {
      setPublic(false);
    }
  }

  function handlePublicOptions() {
    let tmp = [];
    for (let i = 0; i < collectionArr.length; i++) {
      tmp.push(collectionArr[i].name);
    }
    return tmp;
  }

  function handleUserOptions() {
    let tmp = [];
    for (let i = 0; i < myCollections.length; i++) {
      tmp.push(myCollections[i].name);
    }

    return tmp;
  }

  // create a new collection
  async function addCollection() {
    let newName = document.getElementById("newCollection").value;
    if (newName == "") {
      document.getElementById("collectionError").hidden = false;
      document.getElementById("collectionSuccess").hidden = true;
      handleClose();
      return;
    }

    let res = await axios({
      method: "post",
      url: "http://localhost:8001/collection",
      data: {
        user: sessionStorage.getItem("id"),
        name: newName,
        public: collectionPublic,
        creator: sessionStorage.getItem("name"),
      },
    });
    let tmp = collectionArr;
    tmp.unshift(res.data);
    setCollectionArr(tmp);
    let tmp2 = newCollection;
    tmp2 += 1;
    setNewCollection(tmp2);

    document.getElementById("collectionSuccess").hidden = false;
    document.getElementById("collectionError").hidden = true;
    document.getElementById("newCollection").value = "";
    history.push("/collection-detail?id=" + res.data._id);
    location.reload();
  }

  // search for a collection
  async function search(val) {
    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections",
    });
    let tmp = [];

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].name === val) {
        tmp.push({
          name: res.data[i].name,
          id: res.data[i]._id,
          creator: res.data[i].creator,
        });
      }
    }
    setPublicCollectionRes(tmp);
  }

  function routeUser(id) {
    history.push({
      pathname: "/collection-detail?id=" + id,
      //state: { user: props.user },
    });
    location.reload();
  }

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <h1>Create collections and share your favourite books</h1>
        <div hidden id="collectionSuccess" className={classes.success}>
          <Alert severity="success">Collection created</Alert>
        </div>
        <div hidden id="collectionError" className={classes.error}>
          <Alert severity="error">Collection name cannot be empty</Alert>
        </div>
        <Button variant="contained" onClick={handleOpen}>
          Create a new collection
        </Button>

        <div className={classes.searchCollectionBtn}>
          <Button variant="outlined" onClick={handlePublicSearchOpen}>
            Find a Public Collection
          </Button>
        </div>
        <div className={classes.searchCollectionBtn}>
          <Button variant="outlined" onClick={handleUserSearchOpen}>
            Find Your collection
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a new collection
            </Typography>
            <TextField
              id="newCollection"
              label="Collection name"
              variant="standard"
              style={{
                width: "100%",
              }}
            />
            Public?
            <Checkbox
              checked={collectionPublic}
              onClick={() => handlePublic()}
              style={{
                margin: "10px 0",
              }}
            />
            <br />
            <Button variant="contained" onClick={() => addCollection()}>
              Create Collection
            </Button>
          </Card>
        </Modal>

        <Modal
          open={openPublicSearch}
          //onClose={handleCloseDelModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class={classes.modalBox}>
            <Button
              class={classes.closeIcon}
              onClick={() => setOpenPublicSearch(false)}
              disableRipple
            >
              <CloseIcon></CloseIcon>
            </Button>
            <div className={classes.centerDiv}>
              <h2>Find a public collection</h2>
              <Autocomplete
                disablePortal
                autoSelect={false}
                clearOnEscape
                freeSolo
                clearOnBlur={false}
                options={handlePublicOptions()}
                sx={{ width: "60%", marginLeft: "20%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Find Collection"
                    variant="standard"
                    style={{
                      width: "100%",
                      margin: "20px 0",
                    }}
                  />
                )}
                onChange={(e, value) => {
                  search(value);
                }}
              />
            </div>
            {publicCollectionRes.map((Item, index) => (
              <div
                key={index}
                onClick={() => routeUser(Item.id)}
                className={classes.collectionResults}
              >
                <h3>{Item.name}</h3>
                <div>by: {Item.creator}</div>
              </div>
            ))}
            <br />
          </Box>
        </Modal>

        <Modal
          open={openUserSearch}
          //onClose={handleCloseDelModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box class={classes.modalBox}>
            <Button
              class={classes.closeIcon}
              onClick={() => setOpenUserSearch(false)}
              disableRipple
            >
              <CloseIcon></CloseIcon>
            </Button>
            <div className={classes.centerDiv}>
              <h2>Find Your Collection</h2>
              <Autocomplete
                disablePortal
                autoSelect={false}
                clearOnEscape
                freeSolo
                clearOnBlur={false}
                options={handleUserOptions()}
                sx={{ width: "60%", marginLeft: "20%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Find Collection"
                    variant="standard"
                    style={{
                      width: "100%",
                      margin: "20px 0",
                    }}
                  />
                )}
                onChange={(e, value) => {
                  search(value);
                }}
              />
            </div>
            {publicCollectionRes.map((Item, index) => (
              <div
                key={index}
                onClick={() => routeUser(Item.id)}
                className={classes.collectionResults}
              >
                <h3>{Item.name}</h3>
                <div>by: {Item.creator}</div>
              </div>
            ))}
            <br />
          </Box>
        </Modal>

        <h2 className={classes.subtitle}>My Collections</h2>
        <AdjustedCollections collections={myCollections}></AdjustedCollections>

        <h2 className={classes.subtitle}>Popular Collections</h2>
        <AdjustedCollections collections={collectionArr}></AdjustedCollections>
      </div>
      <br />
      <br />
    </div>
  );
}

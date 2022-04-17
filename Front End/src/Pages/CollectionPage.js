/* eslint-disable */

import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles, List, ListItemIcon, ListItemText,   Grid, ListItem, IconButton} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import AdjustedCollections from "../Components/AdjustedCollections";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Alert} from "@mui/material";



const useStyles = makeStyles({
  main: {
    minHeight: "100vh",
    minWidth: "500px",
    width: "80%",
    marginLeft : "10%",
    marginTop: "50px",
    margin: "0 auto",

    
  },
  subtitle: {
    marginTop: "50px",
  },
  success: {
    marginBottom: "20px"
  },
  error: {
    marginBottom: "20px"
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
    padding: 40, 
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

  useEffect(() => {
    getCollectionData();
    document.title = "Collections | Booklab";
  }, [newCollection]);


  async function getCollectionData() {
    let userEmail = sessionStorage.getItem("email");
    let userData = await axios({
      method: "get",
      url: "http://localhost:8001/oneuser/" + userEmail,
    });
    let myCollectionsIds = userData.data.collections;

    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections"
    });

    let allCollections = res.data;
    let allMycollection = [];
    let publicCollections = [];

    for (let i = 0; i < myCollectionsIds.length; i++) {
      let curId = myCollectionsIds[i];
      for (let j = 0; j < allCollections.length; j++) {
        if (curId == allCollections[j]._id && allCollections[j].public == false) {
          allCollections[j].public = "Private";
          allMycollection.push(allCollections[j]);
          
        } else if (curId == allCollections[j]._id){
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
        creatorName : sessionStorage.getItem("name")
      }
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
    history.push("/collection-detail?id=" +res.data._id);
    location.reload();

  }
  
  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>

        <h1>Create collections and share your favourite books</h1>
        <div hidden id="collectionSuccess" className={classes.success}><Alert severity="success">Collection created</Alert></div>
        <div hidden id="collectionError" className={classes.error}><Alert severity="error">Collection name cannot be empty</Alert></div>
        <Button variant="contained" onClick={handleOpen}>Create a new collection</Button>
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
            Public?<Checkbox
              checked={collectionPublic}
              onClick={() => handlePublic()}
              style={{
                margin: "10px 0",
              }}
            />
            <br />
            <Button
              variant="contained"
              onClick={() => addCollection()}
            >Create Collection</Button>
          </Card>
        </Modal>

        <h2 className={classes.subtitle}>My Collections</h2>
        <AdjustedCollections collections={myCollections}></AdjustedCollections>

        <h2 className={classes.subtitle}>Popular Collections</h2>
        <AdjustedCollections collections={collectionArr}></AdjustedCollections>

      </div>
    </div>

  );
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import AdjustedCollections from "../Components/AdjustedCollections";
import { makeStyles } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
//import Grid from "@mui/material/Grid";
//import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  inputImage: {
    marginLeft: "0px",
    width: "15%",
  },
  profileSection: {
    marginTop: "30px",
    marginBottom: "30px",
  },
});

const PublicProfiles = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [myCollections, setMyCollections] = useState([]);
  const [img, setImg] = useState(null);
  const [imgHidden, setImgHidden] = useState(true);
  const [avatarHidden, setAvatarHidden] = useState(true);

  useEffect(() => {
    getUserData();
    //getCollectionData();
    document.title = "User Profile | Booklab";
  }, []);

  // get data of a particular user
  async function getUserData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("id");

    let res = await axios({
      method: "get",
      url: "http://localhost:8001/users",
    });
    let user;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i]._id == userId) {
        user = res.data[i];
        break;
      }
    }
    setName(user.name);
    setEmail(user.email);
    if (user.image == null) {
      setImgHidden(true);
      setAvatarHidden(false);
    } else {
      setImg(user.image);
      setImgHidden(false);
      setAvatarHidden(true);
    }
    getCollectionData(user.collections);
  }

  // get a collection data
  async function getCollectionData(collectionIds) {
    let myCollectionsIds = collectionIds;

    let res = await axios({
      method: "get",
      url: "http://localhost:8001/myCollections",
    });

    let allCollections = res.data;
    let allMycollection = [];

    for (let i = 0; i < myCollectionsIds.length; i++) {
      let curId = myCollectionsIds[i];
      for (let j = 0; j < allCollections.length; j++) {
        if (
          curId == allCollections[j]._id &&
          allCollections[j].public == true
        ) {
          allCollections[j].public = "Public";
          allMycollection.push(allCollections[j]);
        }
      }
    }
    setMyCollections(allMycollection);
  }
  window.scrollTo(0, 0);

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <div id="avatar" hidden={avatarHidden}>
          <Avatar sx={{ width: 80, height: 80 }}></Avatar>
        </div>

        <div id="img" hidden={imgHidden}>
          <img className={classes.inputImage} src={img} alt="user Img" />
        </div>
        <h1>{name}</h1>
        <p>{email}</p>
        <h2 style={{ marginTop: "80px" }}>{name + "'s"} public collections</h2>
        <AdjustedCollections collections={myCollections}></AdjustedCollections>
      </div>
    </div>
  );
};

export default PublicProfiles;

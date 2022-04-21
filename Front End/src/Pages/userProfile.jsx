import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import AdjustedCollections from "../Components/AdjustedCollections";
import { makeStyles } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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

const userProfilePage = () => {
  const classes = useStyles();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [img, setImg] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(null);
  const [myCollections, setMyCollections] = useState([]);

  useEffect(() => {
    getUserData();
    getCollectionData();
    document.title = name + " Profile | Booklab";
  }, [img]);

  // get all the collections made by user
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
        }
      }
    }
    setMyCollections(allMycollection);
  }

  // get user profile data
  async function getUserData() {
    setName(sessionStorage.getItem("name"));
    setEmail(sessionStorage.getItem("email"));
    // setImg(sessionStorage.setItem("image"));
    let userEmail = sessionStorage.getItem("email");

    await axios
      .get("http://localhost:8001/oneuser/" + userEmail)
      .then((res) => {
        if (res.data.image !== null) {
          setImg(res.data.image);
          document.getElementById("avatar").hidden = true;
          document.getElementById("img").hidden = false;
        }
      });
  }

  const handleImg = (e) => {
    setUploadingImg(e.target.files[0]);
  };

  // upload a new image
  async function upload() {
    var formData = new FormData();
    formData.append("email", sessionStorage.getItem("email"));
    formData.append("image", uploadingImg);

    let res = await axios({
      method: "patch",
      url: "http://localhost:8001/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setImg(uploadingImg);
    sessionStorage.setItem("image", res.data);
    // document.getElementById("inputImage").value = "";
  }

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <div id="avatar">
          <Avatar sx={{ width: 80, height: 80 }}></Avatar>
        </div>

        <div id="img" hidden>
          <img className={classes.inputImage} src={img} />
        </div>

        <h1>Welcome back, {name}</h1>
        <p>{email}</p>

        <div className={classes.profileSection}>
          <h2 style={{ marginTop: 50 }}>Upload a new profile picture</h2>
          <Button component="label">
            Upload your image
            <input
              type="file"
              hidden
              id="inputImage"
              onChange={(e) => handleImg(e)}
            />
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: "20px" }}
            size="small"
            onClick={() => upload()}
          >
            Submit
          </Button>
        </div>

        <h2 style={{ marginTop: "80px" }}>My collections</h2>
        <AdjustedCollections collections={myCollections}></AdjustedCollections>
      </div>
    </div>
  );
};

export default userProfilePage;

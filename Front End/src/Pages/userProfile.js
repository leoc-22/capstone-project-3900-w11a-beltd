import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import reset from "../Images/reset.svg";
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

  useEffect(() => {
    getUserData();
    document.title = "User Profile | Booklab";
  }, [img]);

  async function getUserData() {
    setName(sessionStorage.getItem("name"));
    setEmail(sessionStorage.getItem("email"));
    // setImg(sessionStorage.setItem("image"));
    let userEmail = sessionStorage.getItem("email");

    await axios
      .get("http://localhost:8001/oneuser/" + userEmail)
      .then((res) => {
        console.log(`user info: ${JSON.stringify(res.data)}`);
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
      <AuthenicatedTopBar></AuthenicatedTopBar>
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
          <Button variant="outlined" component="label">
            Upload your image
            <input
              type="file"
              hidden
              id="inputImage"
              onChange={(e) => handleImg(e)}
            />
          </Button>
          <Button size="small" onClick={() => upload()}>
            Submit
          </Button>
        </div>

        {/* update grid with user info */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <h2>Currently reading</h2>
            {/* add details for most recent book in currently reading */}
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Book title
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                  color="text.secondary"
                >
                  Book author
                </Typography>
                <Typography variant="body2">Book description</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go to book profile</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <h2>Reading goal</h2>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  Goal status
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                  color="text.secondary"
                >
                  On track
                  {/* Could also include x books behind */}
                </Typography>
                <Typography variant="body2">
                  You have read x books
                  {/* update with progress */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Update your goal</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <h2>Leader board</h2>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.primary">
                  See how you compare with global readers
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                  color="text.secondary"
                >
                  Top x% of readers
                  {/* show top percentage e.g. 10% of readers */}
                </Typography>
                <Typography variant="body2">
                  Read more books to move up the rankings.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go to leader board</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <h2 style={{ marginTop: "80px" }}>My collections</h2>
        <Button variant="outlined">View all my collections</Button>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Main collection</Button>
            <br />
            <Chip label="Public" size="small" />
          </Grid>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Read collection</Button>
            <br />
            <Chip label="Private" size="small" />
          </Grid>
          {/* map the first 2 collections for user */}
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Collection title</Button>
            <br />
            <Chip label="Public" size="small" />
          </Grid>
          <Grid item xs={3}>
            <img src={reset} alt="one person sitting, one person standing" />
            <Button variant="text">Collection title</Button>
            <br />
            <Chip label="Public" size="small" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default userProfilePage;

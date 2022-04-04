import React, { useEffect } from "react";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";


const useStyles = makeStyles({
  main: {
    minHeight: "1100px",
    minWidth: "500px",
    width: "80%",
    margin: "0 auto",
    marginTop: "100px",
  },
  h2: {
    color: "rgb(51, 153, 255)"
  }
});

const collectionDetailPage = () => {
  const classes = useStyles();
  //const location = useLocation();

  useEffect(() => {
    document.title = "Collection details | Booklab";
  }, []);

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.main}>
        <h1>Collection name</h1> {/* Change to Update collection when in edit mode */}
        <TextField
          label="Name your collection"
          variant="standard"
          sx={{ width: "80%", marginBottom: "15px" }}
        />
        <TextField
          label="Search for books to add to your goal"
          variant="standard"
          sx={{ width: "80%", marginBottom: "15px" }}
        />
        <br />
        <Button variant="text" sx={{ marginBottom: "30px" }} >Add book to reading goal</Button>
        <h2 style={{ color: "rgb(51, 153, 255)" }}>Books in this collection</h2>
        <Card sx={{ width: "80%", marginBottom: "20px" }}>
          {/* template for books added to reading goal */}
          <CardHeader
            action={
              <IconButton>
                <ClearIcon />
              </IconButton>
            }
            title="Book title"
            subheader="Book author"
          />
          <CardActions>
            <Button size="small">Mark as read</Button>
          </CardActions>
        </Card>
        <Card sx={{ width: "80%", marginBottom: "20px" }}>
          {/* template for books added to reading goal */}
          <CardHeader
            action={
              <IconButton>
                <ClearIcon />
              </IconButton>
            }
            title="Book title"
            subheader="Book author"
          />
          <CardActions>
            <Button size="small">Mark as read</Button>
          </CardActions>
        </Card>
        <br />
        <FormGroup sx={{ marginBottom: "20px" }}>
          <FormControlLabel control={<Switch defaultChecked color="warning" />} label="Private collection?" />
        </FormGroup>
        <Button variant="contained">Save collection details</Button>
      </div>
    </div>
  );
};

export default collectionDetailPage;

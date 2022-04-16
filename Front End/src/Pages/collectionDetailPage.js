import React, { useEffect } from "react";
import AuthenticatedNavbar from "../Components/AuthenticatedNavbar";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

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
});

const collectionDetailPage = () => {
  const classes = useStyles();
  //const location = useLocation();

  useEffect(() => {
    document.title = "Collection details | Booklab";
  }, []);

  return (
    <div>
      <AuthenticatedNavbar />
      <div className={classes.main}>
        <h1>Update collection details</h1>
        Public?<Checkbox
          // checked={collectionPublic}
          // onClick={() => handlePublic()}
          style={{
            margin: "10px 0",
          }}
        />
        <br />
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
        <Button variant="text">Add book to reading goal</Button>
        <br />
        <Button variant="contained" sx={{ marginTop: "10px", marginBottom: "30px" }} >Save collection details</Button>
        {/* Everything above this comment is only seen when editing */}
        <h2>Books in this collection</h2>
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
      </div>
    </div>
  );
};

export default collectionDetailPage;

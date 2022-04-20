import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import reset from "../Images/reset.svg";
import { Grid, TextField, Button, Alert } from "@mui/material";
import validator from "validator";
import axios from "axios";

const useStyles = makeStyles({
  body: {
    margin: "15vh 22vw",
  },
  link: {
    color: "#00C9D8",
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    marginLeft: "10%",
  },
});

export default function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();

  // email validation from: https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var emailCheck = e.target.value;

    if (validator.isEmail(emailCheck)) {
      setEmailError("Valid email :)");
    } else {
      setEmailError("Please enter a valid email!");
    }
  };

  // function to reset user password
  async function handleForgetPassword(e) {
    e.preventDefault();
    var newEmail = document.getElementById("emailInput").value;
    axios({
      method: "post",
      url: "http://localhost:8001/forgetpassword",
      headers: {},
      data: {
        email: newEmail,
      },
    }).then((document.getElementById("successUpdate").hidden = false));
    return;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h1>Forgotten your password?</h1>
            <p>No worries, let's reset it!</p>
            <div id="successUpdate" hidden={true}>
              <Alert severity="success">Email sent!</Alert>
            </div>
            <div>
              <form>
                <TextField
                  id="emailInput"
                  required
                  label="Email"
                  variant="standard"
                  style={{
                    width: 300,
                    marginTop: 20,
                  }}
                  onChange={(e) => validateEmail(e)}
                  helperText={emailError}
                ></TextField>
                <br></br>
                <Button
                  disableRipple
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  variant="contained"
                  onClick={(e) => {
                    handleForgetPassword(e);
                  }}
                  id="submit"
                  value="Submit"
                  type="submit"
                >
                  Reset password
                </Button>
              </form>
              <a onClick={() => history.push("/")} className={classes.link}>
                Back to home
              </a>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img
              className={classes.image}
              src={reset}
              alt="one person sitting, one person standing"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import validator from "validator";
import login from "../Images/login.svg";
import axios from "axios";

const useStyles = makeStyles({
  body: {
    height: "80vh",
    width: "50%",
    margin: "0 auto",
    marginTop: "100px",
  },
  link: {
    color: "#1976d2",
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    width: "100%",
    marginTop: "-10%",
  },
});

export default function LogInPage() {
  const history = useHistory();
  const classes = useStyles();

  // email validation from: https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("Valid email :)");
    } else {
      setEmailError("Please enter a valid email!");
    }
  };

  // login a new user
  function loginUser() {
    var enteredEmail = document.getElementById("emailInput").value;
    var enteredPassword = document.getElementById("passwordInput").value;

    axios({
      method: "post",
      url: "http://localhost:8001/login",
      headers: {},
      data: {
        email: enteredEmail,
        password: enteredPassword,
      },
    })
      .then((response) => handleResponse(response))
      .catch(function () {
        document.getElementById("loginFailed").hidden = false;
      });
  }

  function handleResponse(res) {
    if (res.data === "") {
      document.getElementById("loginFailed").hidden = false;
    } else {
      sessionStorage.setItem("email", res["data"]["email"]);
      sessionStorage.setItem("name", res["data"]["name"]);
      sessionStorage.setItem("id", res["data"]["_id"]);
      sessionStorage.setItem("image", res["data"]["image"]);

      history.push({
        pathname: "/home",
        state: { email: sessionStorage.getItem("email") },
      });
    }
  }

  return (
    <div>
      <Navbar />
      <div className={classes.body}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <h1>Log In</h1>
            <div id="loginFailed" hidden>
              <Alert severity="error" id="userError">
                ERROR: Log in failed
              </Alert>
            </div>
            <form>
              <TextField
                required
                id="emailInput"
                label="Email"
                variant="standard"
                style={{
                  width: "100%",
                  marginTop: 10,
                }}
                onChange={(e) => validateEmail(e)}
                helperText={emailError}
              ></TextField>
              <TextField
                required
                id="passwordInput"
                label="Password"
                variant="standard"
                type="password"
                style={{
                  width: "100%",
                  marginTop: 15,
                }}
              ></TextField>
              <Button
                disableRipple
                style={{
                  marginTop: 20,
                }}
                variant="contained"
                onClick={() => loginUser()}
                id="submit"
                value="Submit"
              >
                Log In
              </Button>
            </form>
            <p>
              Don't have an account?{" "}
              <a
                onClick={() => history.push("/signup")}
                className={classes.link}
              >
                Sign Up
              </a>
            </p>
            <p>
              <a
                onClick={() => history.push("/reset")}
                className={classes.link}
              >
                Forgot password?
              </a>
            </p>
          </Grid>
          <Grid item xs={6}>
            <img
              className={classes.image}
              src={login}
              alt="two people standing"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

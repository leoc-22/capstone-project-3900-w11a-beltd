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
        console.log("login failed");
        document.getElementById("loginFailed").hidden = false;
      });
  }

  function handleResponse(res) {
    if (res.data === "") {
      console.log("login failed");
      document.getElementById("loginFailed").hidden = false;
    } else {
      sessionStorage.setItem("email", res["data"]["email"]);
      sessionStorage.setItem("name", res["data"]["name"]);
      sessionStorage.setItem("id", res["data"]["_id"]);

      //console.log("login success, redirecting to home");
      // history.push("/home");
      // console.log(res.data);
      
      history.push({
        pathname: "/home",
        state: { email: sessionStorage.getItem("email") },
      });
      
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h1>Log In</h1>
            <div id="loginFailed" hidden>
              <Alert severity="error" id="userError">
                ERROR: Log in failed
              </Alert>
            </div>
            <div>
              <form>
                <TextField
                  required
                  id="emailInput"
                  label="Email"
                  variant="standard"
                  style={{
                    width: 300,
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
                    width: 300,
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
            </div>
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

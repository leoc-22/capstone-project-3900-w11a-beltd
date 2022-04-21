import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import signup from "../Images/signup.svg";
import { Grid, TextField, Button, Alert } from "@mui/material";
import validator from "validator";
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
});

export default function SignUpPage() {
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

  // regex check for valid password
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (p) => {
    var reg = new RegExp("^(?=.*\\d).{6,}$");
    var password = p.target.value;
    if (reg.test(password)) {
      setPasswordError("Strong password");
    } else {
      setPasswordError(
        "Password should be at least 6 characters and include 1 number!"
      );
    }
  };

  const [matchError, setMatchError] = useState("");
  const passwordMatch = (p) => {
    var password = document.getElementById("passwordInput").value;
    var retype = p.target.value;
    if (retype !== password) {
      setMatchError("Passwords don't match");
    } else {
      setMatchError("Passwords match!");
    }
  };

  // register a new user
  function registerUser() {
    var newEmail = document.getElementById("emailInput").value;
    var newUserName = document.getElementById("userNameInput").value;
    var newPassword = document.getElementById("passwordInput").value;
    if (
      emailError === "Valid email :)" &&
      passwordError === "Strong password" &&
      matchError === "Passwords match!" &&
      newUserName.length >= 1
    ) {
      axios({
        method: "post",
        url: "http://localhost:8001/user",
        headers: {},
        data: {
          email: newEmail,
          name: newUserName,
          password: newPassword,
        },
      }).then((res) => {
        if (res.status === 200) {
          makeDefaultCollections(res["data"]["_id"], res["data"]["name"]);
          sessionStorage.setItem("email", res["data"]["email"]);
          sessionStorage.setItem("name", res["data"]["name"]);
          sessionStorage.setItem("id", res["data"]["_id"]);

          history.push("/home");
        } else {
          document.getElementById("userError").innerText =
            "ERROR: " + res.status;
          document.getElementById("signUpFailed").hidden = false;
        }
      });
    } else {
      console.log("Unable to create user");
      document.getElementById("signUpFailed").hidden = false;
    }
  }

  // crete a default collection for a new user
  async function makeDefaultCollections(userId, userName) {
    await axios({
      method: "post",
      url: "http://localhost:8001/collection",
      data: {
        user: userId,
        name: userName + "'s  Main",
        public: false,
        creator: userName,
      },
    });

    return;
  }

  return (
    <div>
      <Navbar />
      <div className={classes.body}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <h1>Sign Up</h1>
            <div id="signUpFailed" hidden>
              <Alert severity="error" id="userError">
                ERROR: Unable to create user
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
                    width: "100%",
                    marginTop: 10,
                  }}
                  onChange={(e) => validateEmail(e)}
                  helperText={emailError}
                ></TextField>
                <TextField
                  required
                  id="userNameInput"
                  label="Username"
                  variant="standard"
                  style={{
                    width: "100%",
                    marginTop: 15,
                  }}
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
                  onChange={(p) => validatePassword(p)}
                  helperText={passwordError}
                ></TextField>
                <TextField
                  required
                  id="retypePassword"
                  label="Re-enter Password"
                  variant="standard"
                  type="password"
                  style={{
                    width: "100%",
                    marginTop: 15,
                  }}
                  onChange={(p) => passwordMatch(p)}
                  helperText={matchError}
                ></TextField>
                <Button
                  disableRipple
                  style={{
                    marginTop: 20,
                  }}
                  variant="contained"
                  onClick={() => registerUser()}
                  id="submit"
                  value="Submit"
                >
                  Sign Up
                </Button>
              </form>
              <p>
                Already have an account?{" "}
                <a
                  onClick={() => history.push("/login")}
                  className={classes.link}
                >
                  Log In
                </a>
              </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img
              className={classes.image}
              src={signup}
              alt="two people standing"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import LoginTopBar from "../Components/LoginTopBar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import update from "../Images/update.svg";
import { Grid, TextField, Button } from "@mui/material";
// import validator from "validator";

const useStyles = makeStyles({
  body: {
    margin: "15vh 22vw",
  },
  primaryButton: {
    height: 40,
    borderRadius: 8,
    fontSize: "large",
    margin: "10% 0",
    padding: "0 20px",
    background: "transparent",
    fontWeight: "bold",
    borderColor: "#00C9D8",
    "&:hover": {
      backgroundColor: "#00C9D8",
      color: "#fff",
      cursor: "pointer",
    },
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

export default function UserSettingsPage() {
  const history = useHistory();
  const classes = useStyles();

  // email validation from: https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
  // const [emailError, setEmailError] = useState("");
  // const validateEmail = (e) => {
  //   var emailCheck = e.target.value;

  //   if (validator.isEmail(emailCheck)) {
  //     setEmailError("Valid email :)");
  //   } else {
  //     setEmailError("Please enter a valid email!");
  //   }
  // };

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

  return (
    <div>
      <LoginTopBar></LoginTopBar>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h1>Update account details</h1>
            <div>
              <form>
                {/* <TextField
                  required
                  label="Email"
                  variant="standard"
                  style={{
                    width: 300,
                    marginTop: 20,
                  }}
                  onChange={(e) => validateEmail(e)}
                  helperText={emailError}
                ></TextField> */}
                <TextField
                  required
                  id="passwordInput"
                  label="New Password"
                  variant="standard"
                  type="password"
                  style={{
                    width: 300,
                    marginTop: 15,
                  }}
                  onChange={(p) => validatePassword(p)}
                  helperText={passwordError}
                ></TextField>
                <TextField
                  required
                  id="retypePassword"
                  label="Confirm New Password"
                  variant="standard"
                  type="password"
                  style={{
                    width: 300,
                    marginTop: 15,
                  }}
                  onChange={(p) => passwordMatch(p)}
                  helperText={matchError}
                ></TextField>
                <br></br>
                <Button
                  disableRipple
                  class={classes.primaryButton}
                  onClick={() => history.push("/home")}
                  id="submit"
                  value="Submit"
                  type="submit"
                >
                  Save changes
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img
              className={classes.image}
              src={update}
              alt="two people standing"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
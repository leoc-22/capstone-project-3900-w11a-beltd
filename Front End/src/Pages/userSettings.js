import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import update from "../Images/update.svg";
import { Grid, TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import AuthenicatedTopBar from "../Components/AuthenticatedTopBar";

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

export default function UserSettingsPage() {
  const classes = useStyles();

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

  function updatePassword() {
    var newPassword = document.getElementById("passwordInput").value;
    if (matchError == "Passwords match!") {
      axios({
        method: "patch",
        url: "http://localhost:8001/user",
        headers: {},
        data: {
          email: localStorage.getItem("email"),
          name: localStorage.getItem("name"),
          password: newPassword,
        },
      })
        .then((res) => handleReset(res));
    }
    return;
  }

  function handleReset(data) {
    console.log(data);
    document.getElementById("successUpdate").hidden = false;
  }

  return (
    <div>
      <AuthenicatedTopBar></AuthenicatedTopBar>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <h1>Update account details</h1>
            <div id="successUpdate" hidden>
              <Alert severity="success">
                  Password updated
              </Alert>
            </div>
            <div>
              <form>
                <h2>Change your password</h2>
                <TextField
                  required
                  id="passwordInput"
                  label="New Password"
                  variant="standard"
                  type="password"
                  style={{
                    width: 300,
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
                <h2 style={{ marginTop: 50 }}>Upload a new profile picture</h2>
                <Button
                  variant="outlined"
                  component="label"
                >
                  Upload a file
                  <input
                    type="file"
                    hidden
                  />
                </Button>
                <br />
                <br />
                <Button
                  disableRipple
                  variant="contained"
                  onClick={() => updatePassword()}
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

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { makeStyles } from "@material-ui/core";
import update from "../Images/update.svg";
import { Grid, TextField, Button, Alert } from "@mui/material";
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

export default function ForgetPasswordPage() {
  const classes = useStyles();
  const { id } = useParams();
  const { token } = useParams();

  // regex chrck for valid password
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

  // update user password
  function updatePassword(e) {
    e.preventDefault();
    var newPassword = document.getElementById("passwordInput").value;
    if (matchError == "Passwords match!") {
      axios({
        method: "patch",
        url: "http://localhost:8001/verifyandreset",
        headers: {},
        data: {
          id: id,
          token: token,
          password: newPassword,
        },
      }).then((document.getElementById("successUpdate").hidden = false));
    }
    return;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h1>Forget your password?</h1>
            <div id="successUpdate" hidden>
              <Alert severity="success">Password updated</Alert>
            </div>
            <div>
              <form>
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
                  label="Re-enter New Password"
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
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  variant="contained"
                  onClick={(e) => {
                    updatePassword(e);
                  }}
                  id="submit"
                  value="Submit"
                  type="submit"
                >
                  Update password
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

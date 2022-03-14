import React, { useState } from 'react';
import LoginTopBar from '../Components/LoginTopBar';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import reset from "../Images/reset.svg";
import { Grid, TextField, Button } from '@mui/material';
import validator from 'validator';


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
    '&:hover': {
      backgroundColor: "#00C9D8",
      color: "#fff",
      cursor: "pointer"
    }
  },
  link: {
    color: "#00C9D8",
    '&:hover': {
      cursor: "pointer"
    }
  },
  image: {
    marginLeft: "10%",
  },
})

export default function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();

  // email validation from: https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var emailCheck = e.target.value;

    if (validator.isEmail(emailCheck)) {
      setEmailError('Valid email :)');
    } else {
      setEmailError('Please enter a valid email!')
    }
  }

  return (
    <div>
      <LoginTopBar>
      </LoginTopBar>
      <div class={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h1>Forgotten your password?</h1>
            <p>No worries, let's reset it!</p>
            <div>
              <form>
                <TextField required
                  label="Email"
                  variant="standard"
                  style={{
                    width: 300,
                    marginTop: 20
                  }}
                  onChange={(e) => validateEmail(e)}
                  helperText={emailError}
                >
                </TextField>
                <br></br>
                <Button disableRipple
                  class={classes.primaryButton}
                  onClick={() => history.push("/login")}
                  id="submit"
                  value="Submit"
                  type="submit"
                >Reset password
                </Button>
              </form>
              <a onClick={() => history.push("/")}
                class={classes.link}
              >Back to home</a>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img class={classes.image} src={reset} alt="one person sitting, one person standing" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
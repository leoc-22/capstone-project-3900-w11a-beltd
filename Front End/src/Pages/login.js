import React, {useState} from 'react';
import LoginTopBar from '../Components/LoginTopBar';
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';
import { grid } from '@mui/system';
import { Grid, TextField, Button } from '@mui/material';
import validator from 'validator';
import login from "../Images/login.svg";


const useStyles = makeStyles({
    body: {
        margin: "22vh 22vw",
        display: grid,
        gridTemplateColumns: "1fr 2fr",
    },
    primaryButton: {
        width: 130,
        height: 40,
        borderRadius: 8,
        fontSize: "large",
        margin: "10% 0",
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
        marginLeft: "5%",
    },
})



export default function LogInPage() {
    const history = useHistory();
    const classes = useStyles();
    // email validation from: https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('Valid email :)')
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
                            <h1>Log In</h1>
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
                                <TextField required
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    style={{
                                        width: 300,
                                        marginTop: 20
                                    }}
                                    >
                                </TextField>
                                <br></br>

                                <Button disableRipple 
                                    class={classes.primaryButton}
                                    onClick={() => history.push("/login")} 
                                    id="submit"
                                    value="Submit"
                                    type="submit"
                                >Log In
                                </Button>
                                </form>
                                <p>Don't have an account? <a
                                    onClick={() => history.push("/signup")}
                                    class={classes.link}
                                >Sign Up</a></p>
                                <p>Forgot your password? <a
                                    onClick={() => history.push("/reset")}
                                    class={classes.link}
                                >Reset password</a></p>
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                            <img class={classes.image} src={login} alt="two people standing" />
                    </Grid>
                </Grid>
            </div>

        </div>
    );
}
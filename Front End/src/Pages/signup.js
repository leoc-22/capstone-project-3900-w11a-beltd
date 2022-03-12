import React, {useState} from 'react';
import LoginTopBar from '../Components/LoginTopBar';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import signup from "../Images/signup.svg";
import { grid } from '@mui/system';
import { Grid, TextField, Button } from '@mui/material';
import validator from 'validator';
import axios from 'axios';


const useStyles = makeStyles({
    body: {
        margin: "25vh 22vw",
        display: grid,
        gridTemplateColumns: "1fr 2fr",
    },
    primaryButton: {
        width: 130,
        height: 40,
        borderRadius: 8,
        fontSize: "large",
        marginTop: "10%",
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

})

export default function LandingPage() {
    const history = useHistory();
    const classes = useStyles();
    // connect to backend
    const [name, setName] = useState('')
    const handleChange = (u) => {
        setName(u.target.value);
    }

    // email validation from: https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
    const [emailError, setEmailError] = useState('')
    const [email, setEmail] = useState('')
    const validateEmail = (e) => {
      var emailCheck = e.target.value;
    
      if (validator.isEmail(emailCheck)) {
        setEmailError('Valid email :)');
        setEmail(emailCheck);
      } else {
        setEmailError('Please enter a valid email!')
      }
    }
    
    // password validation
    const [passwordError, setPasswordError] = useState('')
    const [password, setPassword] = useState('')
    const validatePassword = (p) =>  {
        var reg = new RegExp('^(?=.*\\d).{6,}$');
        var passwordCheck = p.target.value;
        if (reg.test(passwordCheck)) {
            setPasswordError('Strong password');
            setPassword(passwordCheck); 
        } else {
            setPasswordError('Password should be at least 6 characters and include 1 number!');
        }        
    }

    const handleSubmit = (f) => {
        const user = {
            name,
            password,
            email
        }

        axios.post(`http://localhost:8001/user`, { user })
            .then(res => {
            console.log(res);
            console.log(res.data);
        })

    }

    return (
        <div>
            <LoginTopBar>
            </LoginTopBar>

            <div class={classes.body}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                            <h1>Sign Up</h1>
                            <div>
                                <form onSubmit={(f) => handleSubmit(f)}>
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
                                    label="Username"
                                    variant="standard"
                                    style={{
                                        width: 300,
                                        marginTop: 20
                                    }}
                                    onChange={(u) => handleChange(u)}
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
                                    onChange={(p) => validatePassword(p)}
                                    helperText={passwordError}
                                    >
                                </TextField>
                                <br></br>

                                <Button disableRipple 
                                    class={classes.primaryButton}
                                    onClick={() => history.push("/login")} 
                                    id="submit"
                                    value="Submit"
                                    type="submit"
                                >Sign Up
                                </Button>
                                </form>
                                <p>Already have an account? <a
                                    onClick={() => history.push("/login")}
                                    class={classes.link}
                                >Log In</a></p>
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                            <img class={classes.image} src={signup} alt="experiment with booklab + two people" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
import React, {useState} from 'react';
import LoginTopBar from '../Components/LoginTopBar';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import signup from "../Images/signup.svg";
import { grid } from '@mui/system';
import { Grid, TextField, Button } from '@mui/material';
import validator from 'validator';
const axios = require('axios');


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
            cursor: "pointer"
        }
    },
    link: {
        color: "#00C9D8",
        '&:hover': {
            cursor: "pointer"
        }
    },
    image : {
        position: 'absolute',
        marginLeft : "180px"
    },
    errorMsg : {
        color:"red",
    }

})




export default function LandingPage() {
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

    const [passwordError, setPasswordError] = useState('')
    const validatePassword = (p) =>  {
        var reg = new RegExp('^(?=.*\\d).{6,}$');
        var password = p.target.value;
        if (reg.test(password)) {
            setPasswordError('Strong password');
        }else{
            setPasswordError('Password should be at least 6 characters and include 1 number!');
        }        
    }

    function registerUser(){
        var newEmail = document.getElementById("emailInput").value;
        var newUserName = document.getElementById("userNameInput").value;
        var newPassword = document.getElementById("passwordInput").value;
        var reTypedPassword = document.getElementById("retypePassword").value;

        if (newPassword !== reTypedPassword){    
            document.getElementById("passwordErr").hidden = false;
            return;
        }
        
        if (emailError === 'Valid email :)' && passwordError === 'Strong password' && newUserName.length >= 1){
            const user = {
                email : newEmail,
                name : newUserName,
                password : newPassword
            }
            axios({
                method : 'post',
                url : 'http://localhost:8001/user',
                headers : {},
                data: {
                    email : newEmail,
                    name : newUserName,
                    password : newPassword
                }
            }).then(response => handelResponse(response))
        } else {    
            console.log("unable to create user");
        }
    }

    function handelResponse(res){
        console.log(res);
        localStorage.setItem("name", res["data"]["name"]);
        history.push("/homePage");
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
                                <form>
                                <TextField required
                                    id="emailInput"
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
                                    id="userNameInput"
                                    label="Username"
                                    variant="standard"
                                    style={{
                                        width: 300,
                                        marginTop: 20
                                    }}>
                                </TextField>
                                <br></br>
                                <TextField required
                                    id="passwordInput"
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
                                <TextField required
                                    id="retypePassword"
                                    label="Re Type Password"
                                    variant="standard"
                                    type="password"
                                    style={{
                                        width: 300,
                                        marginTop :10
                                    }}
                                >
                                </TextField>

                                <br></br>

                                <Button disableRipple 
                                    class={classes.primaryButton}
                                    onClick={() => registerUser()} 
                                    id="submit"
                                    value="Submit"
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
                <h3 id = "passwordErr" hidden class = {classes.errorMsg}>Passwords Don't Match</h3>

            </div>
        </div>
    );
}
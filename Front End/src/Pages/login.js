import React, {useState} from 'react';
import LoginTopBar from '../Components/LoginTopBar'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';
import validator from 'validator';
const axios = require('axios');


const useStyles = makeStyles({
    loginBtn : {
        width:150,
        height:40,
        borderRadius: 10,
        fontSize: "large",
        marginTop : "5%",
        background:"transparent",
        fontWeight: "bold",
        borderWidth: "thin",
        borderColor: "#00C9D8",
        '&:hover': {
            //color: "#00C9D8",
            cursor:"pointer"
          }

    },

    mainSection : {
        display:"inline",

    },
    loginText : {
        marginLeft : "20%",
        marginTop : "10%",

    },
    loginInput : {
        marginLeft : "20%",

    },
    textInput: {
        width:150,

    },
    signUp :{
        color:"#00C9D8",
    '&:hover': {
        cursor:"pointer"
    }
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


    function loginUser(){
        var enteredEmail = document.getElementById("emailInput").value;
        var ennteredPassword = document.getElementById("passwordInput").value;
        //console.log(ennteredPassword);
        //console.log(enteredEmail);

        axios({
            method : 'get',
            url : 'http://localhost:8001/login',
            headers : {},
            params : {
                email : enteredEmail,
                password : ennteredPassword
            }
        }).then(response => handleResponse(response))
        .catch(function() {
            console.log("login failed");
            document.getElementById("loginFailed").hidden = false;
        });
    }

    function handleResponse(res){

        if (res["data"] == ''){
            console.log("login failed");
            document.getElementById("loginFailed").hidden = false;
        } else {
            localStorage.setItem("name", res["data"]["name"]);
            history.push("/homePage");

        }
    }

    return (
        <div>
            <LoginTopBar>  
            </LoginTopBar>
            <h1 class = {classes.loginText}>Login</h1>
            <div  class = {classes.loginInput}>
                <TextField  
                    id="emailInput" 
                    label="Email" 
                    variant="standard"
                    style={{
                        width: 300,
                        marginTop : 40
                    }}
                    onChange={(e) => validateEmail(e)}
                    helperText={emailError}>
                </TextField>
                <br></br>
                <TextField  
                    id="passwordInput" 
                    label="Password" 
                    variant="standard"
                    type="password"
                    style={{
                        width: 300,
                        marginTop : 20
                    }}>
                </TextField>
                <br></br>

                <Button disableRipple class = {classes.loginBtn}
                        onClick = {() => loginUser()}
                    >Login
                </Button>
                <p>Don't have an account? <a 
                onClick = {() => history.push("/signup")}
                class = {classes.signUp}
                >Sign Up</a></p>

                <h3 id = "loginFailed" hidden class = {classes.errorMsg}>login Failed</h3>
            </div>

        </div>
    );
}
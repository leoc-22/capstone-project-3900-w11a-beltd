import React from 'react';
import LoginTopBar from '../Components/LoginTopBar'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';


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
    }

})



export default function LandingPage() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <LoginTopBar>  
            </LoginTopBar>
            <h1 class = {classes.loginText}>Login</h1>
            <div  class = {classes.loginInput}>

                <TextField  
                    id="standard-basic" 
                    label="Email" 
                    variant="standard"
                    style={{
                        width: 300,
                        marginTop : 40
                    }}>
                </TextField>
                <br></br>
                <TextField  
                    id="standard-basic" 
                    label="Password" 
                    variant="standard"
                    style={{
                        width: 300,
                        marginTop : 20
                    }}>
                </TextField>
                <br></br>

                <Button disableRipple class = {classes.loginBtn}
                        onClick = {() => history.push("/")}
                    >Login
                </Button>
                    <p>Don't have an account? <a 
                    onClick = {() => history.push("/")}
                    class = {classes.signUp}
                    >sign up</a></p>
            </div>

        </div>
    );
}
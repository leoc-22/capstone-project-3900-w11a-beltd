import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, List, ListItemIcon, ListItemText,   Grid, ListItem, IconButton} from '@material-ui/core';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { InfoOutlined } from '@mui/icons-material';


const useStyles = makeStyles({

    appBar:{
        background: '#00C9D8',
        height:50,
        verticalAlign: "baseline"
    },
    Name: {
        marginLeft: "5%",
        marginTop: "0%",
        '&:hover': {
            cursor:"pointer",
          },
    },
    appBarBtn: {
        marginTop: "-0.5%",
        color: "black",
        marginLeft: 5,
        width:150,
        height:30,
        borderRadius: 10,
        fontSize: "meidum",
        //background:"white",
        background:"transparent",
        border:"none",
        '&:hover': {
            color: "#E97400",
            cursor:"pointer"
          }
    },

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

    }

})



export default function LoginTopBar() {
    const history = useHistory();
    const classes = useStyles();
    
    

    return (
        <div className={classes.root}>
        <MuiAppBar class = {classes.appBar} position="sticky">
            <Toolbar>
                <h3 
                class = {classes.Name}
                onClick = {() => history.push("/")}

                >BookLyst</h3>
                <Button disableRipple class = {classes.appBarBtn}
                    onClick = {() => history.push("/")}
                >Explore
                </Button>
            
                <Button disableRipple class = {classes.appBarBtn}
                    onClick = {() => history.push("/")}
                >Recommended for you
                </Button>

                <Button disableRipple class = {classes.appBarBtn}
                    onClick = {() => history.push("/")}
                >Book Store
                </Button>

                <Button disableRipple class = {classes.appBarBtn}
                    onClick = {() => history.push("/")}
                >LeaderBoard
                </Button>
            </Toolbar>
        </MuiAppBar>


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

        </div>


        </div>
    );
}
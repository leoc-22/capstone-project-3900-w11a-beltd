import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const useStyles = makeStyles({

    appBar:{
        background: '#f1f1f1',
        height:50,
        verticalAlign: "baseline",

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
    divider1:{
        paddingTop:0,
        width: "100%",
        minWidth: "1000px",
        position:"absolute",
        height : -10,
        background: "#00C9D8",
    },




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
            <Divider className={classes.divider1}
               style={{ 
                marginTop: "-15px"
            }} />
        </MuiAppBar>
        </div>
    );
}
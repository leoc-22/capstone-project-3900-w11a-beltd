import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, List, ListItemIcon, ListItemText,   Grid, ListItem, IconButton} from '@material-ui/core';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


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
    iconBtn : {
        marginLeft: "25%",
        marginTop: "-10px",
        border:"none",
        background:"transparent",
        '&:hover': {
            cursor:"pointer"
        }
    },
    loginBtn : {
        marginLeft:20,
        color: "black",
        width:150,
        height:35,
        borderRadius: 10,
        fontSize: "meidum",
        background:"#FFAB58",
        border:"none",
        marginTop: "-0.8%",
        '&:hover': {
            background: "#FF8913",
            cursor:"pointer",
            color: "black",

          }

    },
    navSearch : {
        marginLeft: "0%",

    },

    textItem:{
        marginTop: "-10px",
        marginRight: "0%",
        minWidth : "100px",
        maxWidth : "175px"
    }

})



export default function LandingPageTopBar() {
    const history = useHistory();
    const classes = useStyles();
    const [seachOpen, setSeachOpen] = useState(false);

    function handleSeachOpen(){
        if (seachOpen == false){
            document.getElementById("searchText").hidden = false;
            setSeachOpen(true);
        } else {
            document.getElementById("searchText").hidden = true;
            setSeachOpen(false);

        }
    }
    

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


                <IconButton
                    onClick={handleSeachOpen}
                    class = {classes.iconBtn}
                    disableRipple
                >
                    <SearchIcon
                        className={classes.navSearch}
                    ></SearchIcon>
                </IconButton>   
                <div class = {classes.textItem} 
                    id = "searchText" hidden>
                    <TextField id="standard-basic" placeholder="Search Books" variant="standard">
                    </TextField>
                </div>


                
                <Button disableRipple class = {classes.loginBtn}
                    onClick = {() => history.push("/login")}
                ><b>Login</b>
                </Button>

            </Toolbar>

        </MuiAppBar>

        </div>
    );
}
/* eslint-disable */

import React, {useState, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {styled } from '@mui/material/styles';


const useStyles = makeStyles({
  logoutBtn: {
    marginLeft : "65%"
  },
  BookLabTitle: {
    color : "#444444",
    paddingLeft : "50px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  BtnText : {
    color : "#444444"
  },
  BtnTextActive : {
    color : "#1976d2",
    fontWeight : "bold"
  }


});

const AppBar1 = styled(AppBar)(() => ({
  backgroundColor: "#F3F3F3",
  color : "black",
  minHeight: "65px",
  maxHeight : "65px",
  minWidth : "100%",
  boxShadow : "none",
  borderBottom: "0.5px solid #2196f3",

}));

const ButtonTest = styled(Button)(() => ({
  borderRadius : "0px",
  marginTop : "5px",
  minHeight: "60px",
  maxHeight: "60px",
  marginLeft : "20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor : "transparent",
    cursor: "pointer",
    borderBottom: "3px solid #2196f3",
  }  
}));



const Navbar = () => {

  const classes = useStyles();
  const history = useHistory();
  const [loginBtn, setLoginBtn] = useState(null);
  const [registerBtn, setregisterBtn] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation(){
    const urlString = String(window.location.pathname);
      if(urlString.includes("login")){
        setLoginBtn(classes.BtnTextActive);
        setregisterBtn(classes.BtnText)
      } else if(urlString.includes("signup")){
        setLoginBtn(classes.BtnText);
        setregisterBtn(classes.BtnTextActive)
      }
  }

  return (
    <AppBar1 position="static"
      sx={{ minWidth : "750px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, "&:hover": {
              cursor: "pointer"} }}
            onClick={() => history.push("/")}
            className={classes.BookLabTitle}

          >
            BOOKLAB
          </Typography>
          <div className = {classes.logoutBtn}>
            <ButtonTest color="inherit"
              sx={{ marginRight: "20px" }}
              onClick={() => history.push("/login")}
            >
            <div className={loginBtn}>Log in</div>
            </ButtonTest>
            <ButtonTest color="inherit"
              onClick={() => history.push("/signup")}
            >
            <div className={registerBtn}>Sign up</div>
            </ButtonTest>
          </div>
        </Toolbar>
      </Container>
    </AppBar1>
  );
};
export default Navbar;

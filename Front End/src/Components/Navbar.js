import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles({
  activeButton: {
    color: "#1976d2",
    fontWeight: "bold"
  }
});

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#F3F3F3",
  width: "100%",
  boxShadow: "none",
  borderBottom: "1px solid #1976d2",
  height: "62px",
}));

const ButtonLink = styled(Button)(() => ({
  color: "#000",
  borderRadius: "0px",
  border: "none",
  height: "60px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
    borderBottom: "3px solid #1976d2",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loginBtn, setLoginBtn] = useState(null);
  const [registerBtn, setregisterBtn] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    const urlString = String(window.location.pathname);
    if (urlString.includes("login")) {
      setLoginBtn(classes.activeButton);
    } else if (urlString.includes("signup")) {
      setregisterBtn(classes.activeButton);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2, display: "flex", "&:hover": {
                  cursor: "pointer"
                }, flexGrow: 1, color: "#1976d2"
              }}
              onClick={() => history.push("/")}
            >
              BookLab
            </Typography>
            <ButtonLink color="inherit"
              sx={{ marginRight: "20px" }}
              onClick={() => history.push("/login")}
            >
              <div className={loginBtn}>Log in</div>
            </ButtonLink>
            <ButtonLink color="inherit"
              onClick={() => history.push("/signup")}
            >
              <div className={registerBtn}>Sign up</div>
            </ButtonLink>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </Box >
  );
};
export default Navbar;

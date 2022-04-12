import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  logoutBtn: {
    marginLeft : "70%"
  },
});


const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  /*
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  */


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, "&:hover": {
              cursor: "pointer"} }}
            onClick={() => history.push("/")}
          >
            BOOKLAB
          </Typography>
          <div className = {classes.logoutBtn}>
            <Button color="inherit"
              sx={{ marginRight: "20px" }}
              onClick={() => history.push("/login")}
            >Log in</Button>
            <Button color="inherit" variant="outlined"
              onClick={() => history.push("/signup")}
            >Sign up</Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

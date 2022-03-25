// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { makeStyles, AppBar, IconButton } from "@material-ui/core";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import SearchIcon from "@mui/icons-material/Search";
// import TextField from "@mui/material/TextField";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";

// const useStyles = makeStyles({
//   appBar: {
//     background: "#F3F3F3",
//     height: 50,
//     top: 0,
//     width: "100%",
//     position: "fixed",
//     zIndex: 99,
//     borderBottom: "0.7px solid #00B3AB",
//   },
//   Name: {
//     marginLeft: "5%",
//     marginTop: "0%",
//     "&:hover": {
//       cursor: "pointer",
//     },
//   },
//   appBarBtn: {
//     marginTop: "-0.5%",
//     color: "black",
//     marginLeft: 5,
//     width: 150,
//     height: 30,
//     borderRadius: 10,
//     fontSize: "meidum",
//     //background:"white",
//     background: "transparent",
//     border: "none",
//     "&:hover": {
//       color: "#E97400",
//       cursor: "pointer",
//     },
//   },
//   iconBtn: {
//     marginLeft: "20%",
//     marginTop: "-10px",
//     border: "none",
//     background: "transparent",
//     "&:hover": {
//       cursor: "pointer",
//     },
//   },

//   navSearch: {
//     marginLeft: "0%",
//   },

//   textItem: {
//     marginTop: "-10px",
//     marginRight: "0%",
//     minWidth: "100px",
//     maxWidth: "175px",
//   },
//   root: {},
//   divider1: {
//     paddingTop: 0,
//     width: "100%",
//     minWidth: "1000px",
//     position: "absolute",
//     height: -10,
//     background: "#00C9D8",
//   },

//   loggedInUser: {
//     marginTop: 15,
//     marginLeft: "3%",
//   },
//   profileIcon: {
//     marginTop: -10,
//     marginLeft: "1%",
//     maxWidth: "25px",
//     "&:hover": {
//       cursor: "pointer",
//     },
//   },
// });

// export default function LandingPageTopBar() {
//   const history = useHistory();
//   const classes = useStyles();
//   const [seachOpen, setSeachOpen] = useState(false);

//   function handleSeachOpen() {
//     if (seachOpen == false) {
//       document.getElementById("searchText").hidden = false;
//       setSeachOpen(true);
//     } else {
//       document.getElementById("searchText").hidden = true;
//       setSeachOpen(false);
//     }
//   }
//   var userName = localStorage.getItem("name");

//   return (
//     <div className={classes.root}>
//       <AppBar class={classes.appBar}>
//         <Toolbar>
//           <h3
//             className={classes.Name}
//             onClick={() => history.push("/home")}
//           >
//             BookLab
//           </h3>
//           <Button
//             disableRipple
//             class={classes.appBarBtn}
//             onClick={() => history.push("/search")}
//           >
//             Explore
//           </Button>

//           <Button
//             disableRipple
//             class={classes.appBarBtn}
//             //onClick={() => history.push("/")}
//           >
//             Recommended for {userName}
//           </Button>

//           <Button
//             disableRipple
//             class={classes.appBarBtn}
//             //onClick={() => history.push("/")}
//           >
//             Book Store
//           </Button>

//           <Button
//             disableRipple
//             class={classes.appBarBtn}
//             //onClick={() => history.push("/")}
//           >
//             Leaderboard
//           </Button>

//           <IconButton
//             onClick={handleSeachOpen}
//             class={classes.iconBtn}
//             disableRipple
//           >
//             <SearchIcon className={classes.navSearch}></SearchIcon>
//           </IconButton>
//           <div className={classes.textItem} id="searchText" hidden>
//             <TextField
//               id="standard-basic"
//               placeholder="Search Books"
//               variant="standard"
//             ></TextField>
//           </div>
//           <h5 className={classes.loggedInUser}>{userName}</h5>
//           <PermIdentityIcon
//             class={classes.profileIcon}
//             onClick = {() => history.push("/user-settings")}
//           ></PermIdentityIcon>
//           <Button
//             disableRipple
//             class={classes.appBarBtn}
//             onClick={() => history.push("/")}
//           >
//             Log out
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Explore", "Recommended for you", "Book store", "Leader board"];
const settings = ["Profile", "Settings", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  var userName = localStorage.getItem("name");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            BOOKLAB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            BOOKLAB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

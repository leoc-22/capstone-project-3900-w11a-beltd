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
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles({
  appBar: {
    background: "#F3F3F3",
    height: 50,
    top: 0,
    width: "100%",
    position: "fixed",
    zIndex: 99,
    borderBottom: "0.7px solid #00B3AB",
  },
  Name: {
    marginLeft: "5%",
    marginTop: "0%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  appBarBtn: {
    marginTop: "-0.5%",
    color: "black",
    marginLeft: 5,
    width: 150,
    height: 30,
    borderRadius: 10,
    fontSize: "meidum",
    //background:"white",
    background: "transparent",
    border: "none",
    "&:hover": {
      color: "#E97400",
      cursor: "pointer",
    },
  },
  iconBtn: {
    marginLeft: "20%",
    marginTop: "-10px",
    border: "none",
    background: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
  },

  navSearch: {
    marginLeft: "0%",
  },

  textItem: {
    marginTop: "-10px",
    marginRight: "0%",
    minWidth: "100px",
    maxWidth: "175px",
  },
  root: {},
  divider1: {
    paddingTop: 0,
    width: "100%",
    minWidth: "1000px",
    position: "absolute",
    height: -10,
    background: "#00C9D8",
  },

  loggedInUser: {
    marginTop: 15,
    marginLeft: "3%",
  },
  profileIcon: {
    marginTop: -10,
    marginLeft: "1%",
    maxWidth: "25px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  logout : {
    marginTop: -10,
    marginLeft: "2%",
    maxWidth: "25px",
    "&:hover": {
      cursor: "pointer",
    },

  }
});

export default function LandingPageTopBar() {
  const history = useHistory();
  const classes = useStyles();
  const [seachOpen, setSeachOpen] = useState(false);

  function handleSeachOpen() {
    if (seachOpen == false) {
      document.getElementById("searchText").hidden = false;
      setSeachOpen(true);
    } else {
      document.getElementById("searchText").hidden = true;
      setSeachOpen(false);
    }
  }

  function logout(){
    sessionStorage.clear();
    history.push("/");
  }

  var userName = sessionStorage.getItem("name");

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
            <SearchIcon className={classes.navSearch}></SearchIcon>
          </Typography>
          <div className={classes.textItem} id="searchText" hidden>
            <TextField
              id="standard-basic"
              placeholder="Search Books"
              variant="standard"
            ></TextField>
          </div>
          <h5 className={classes.loggedInUser}>{userName}</h5>
          <PermIdentityIcon
            class={classes.profileIcon}
            onClick = {() => history.push("/user-settings")}
          ></PermIdentityIcon>

          <LogoutIcon
            class={classes.logout}
            onClick = {() => logout()}
          ></LogoutIcon>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

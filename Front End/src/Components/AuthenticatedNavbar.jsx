import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const useStyles = makeStyles({
  BtnTextActive: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  iconBtn: {
    marginLeft: "10%",
    marginTop: "10px",
    border: "none",
    background: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIcon: {
    marginLeft: "-140px",
  },
  textItem: {
    marginTop: "-25px",
    marginRight: "20px",
    minWidth: "100px",
    maxWidth: "175px",
    marginLeft: "5px",
  },
  divider: {
    minWidth: "50px",
  },
  goBtn: {
    marginLeft: "90%",
    position: "absolute",
  },
});

const ButtonLink = styled(Button)(() => ({
  color: "#000",
  borderRadius: "0px",
  marginLeft: "20px",
  textTransform: "none",
  height: "60px",
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
    borderBottom: "2.5px solid #1976d2",
  },
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#F3F3F3",
  width: "100%",
  height: "62px",
  boxShadow: "none",
  borderBottom: "0.5px solid #2196f3",
}));

const pages = ["Explore", "Collections", "Recommendations", "Leaderboard"];
const settings = ["Profile", "Change password", "Goals", "Logout"];

export default function AuthenicatedTopBar() {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [ExploreBtn, setExploreBtn] = useState(null);
  const [CollectionsBtn, setCollectionsBtn] = useState(null);
  const [RecommendationsBtn, setRecommendationsBtn] = useState(null);
  const [LeaderBoardBtn, setLeaderBoardBtn] = useState(null);
  const [books, setBooks] = useState([]);
  const [seachOpen, setSeachOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getLocation();
    getBookData();
  }, []);

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

  // get book data
  const getBookData = () => {
    axios
      .get("http://localhost:8002/books/autocomplete")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        //setError(error);
      });
  };

  const handleOptions = () => {
    // faster performance and unique values using set
    let optionList = new Set();

    // adding titles first, then authors, then genres
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].title);
    }
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].authors);
    }
    for (let i = 0; i < books.length; i++) {
      optionList.add(books[i].categories[0].name);
    }
    return [...optionList];
  };

  // show search bar
  function handleSeachOpen() {
    if (seachOpen == false) {
      document.getElementById("searchText").hidden = false;
      setSeachOpen(true);
    } else {
      document.getElementById("searchText").hidden = true;
      setSeachOpen(false);
    }
  }

  // route user to another page
  function routePage(page) {
    let sideBarPage = "";

    if (page.page != null) {
      sideBarPage = page.page;
    }

    if (page === "Explore" || sideBarPage === "Explore") {
      history.push({
        pathname: "/search",
      });
    } else if (page === "Collections" || sideBarPage === "Collections") {
      history.push({
        pathname: "/collections",
      });
    } else if (
      page === "Recommendations" ||
      sideBarPage === "Recommendations"
    ) {
      history.push({
        pathname: "/recommendations",
      });
    } else if (page === "Leaderboard" || sideBarPage === "Leaderboard") {
      history.push({
        pathname: "/LeaderBoard",
      });
    } else {
      return;
    }
  }

  // route user to another page
  function routeSettingPage(page) {
    let targetPage = page;
    if (targetPage === "Profile") {
      history.push({
        pathname: "/user-profile",
        //state: { user: props.user },
      });
    } else if (targetPage === "Change password") {
      history.push({
        pathname: "/user-settings",
        //state: { user: props.user },
      });
    } else if (targetPage === "Goals") {
      history.push({
        pathname: "/reading-goal",
        //state: { user: props.user },
      });
    } else if (targetPage === "Logout") {
      sessionStorage.clear();
      history.push("/");
    } else {
      return;
    }
  }

  // search on the navbar
  function search(val) {
    const urlString = String(window.location.pathname);
    history.push("/search?searchQuery=" + val);
    if (urlString.includes("search")) {
      location.reload();
    }
  }

  // get cur location
  function getLocation() {
    const urlString = String(window.location.pathname);
    if (urlString.includes("search")) {
      setExploreBtn(classes.BtnTextActive);
    } else if (
      urlString.includes("collections") ||
      urlString.includes("collection-detail")
    ) {
      setCollectionsBtn(classes.BtnTextActive);
    } else if (urlString.includes("recommendations")) {
      setRecommendationsBtn(classes.BtnTextActive);
    } else if (urlString.includes("LeaderBoard")) {
      setLeaderBoardBtn(classes.BtnTextActive);
    }
  }

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              "&:hover": {
                cursor: "pointer",
              },
              flexGrow: 0,
              color: "#1976d2",
            }}
            onClick={() =>
              history.push({
                pathname: "/home",
                //state: { email: sessionStorage.getItem("email") },
              })
            }
          >
            BookLab
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#1976d2" }}
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
                <MenuItem key={page} onClick={() => routePage({ page })}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "#1976d2",
            }}
            onClick={() =>
              history.push({
                pathname: "/home",
                state: { email: sessionStorage.getItem("email") },
              })
            }
          >
            BookLab
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ButtonLink
              disableRipple
              onClick={() => routePage("Explore")}
              sx={{ display: "block" }}
            >
              <div className={ExploreBtn}>Explore</div>
            </ButtonLink>
            <ButtonLink
              disableRipple
              onClick={() => routePage("Collections")}
              sx={{ display: "block" }}
            >
              <div className={CollectionsBtn}>Collections</div>
            </ButtonLink>

            <ButtonLink
              disableRipple
              onClick={() => routePage("Recommendations")}
              sx={{ display: "block" }}
            >
              <div className={RecommendationsBtn}>Recommendations</div>
            </ButtonLink>

            <ButtonLink
              disableRipple
              onClick={() => routePage("Leaderboard")}
              sx={{ display: "block" }}
            >
              <div className={LeaderBoardBtn}>Leaderboard</div>
            </ButtonLink>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <IconButton
              onClick={handleSeachOpen}
              className={classes.iconBtn}
              disableRipple
            >
              <SearchIcon />
            </IconButton>
            <div className={classes.textItem} id="searchText" hidden>
              <Autocomplete
                disablePortal
                autoSelect={false}
                freeSolo
                clearOnBlur={false}
                options={handleOptions()}
                sx={{ width: 230 }}
                renderInput={(params) => (
                  <TextField
                    label="Search Books, Authors, Genres"
                    InputProps={{ style: { fontSize: 5 } }}
                    {...params}
                    placeholder="Search"
                    variant="standard"
                  />
                )}
                onChange={(e, value) => {
                  //setQuery1(value);
                  search(value);
                }}
              />
            </div>
            <div className={classes.divider} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ marginLeft: "20px" }}
              >
                <Avatar
                  //alt={props.user.name}
                  src={sessionStorage.getItem("image")}
                />
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
                <MenuItem
                  key={setting}
                  onClick={() => routeSettingPage(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
